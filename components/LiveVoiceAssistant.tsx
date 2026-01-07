
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, X, Loader2, Volume2, Waves } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { EXCHANGE_RATES } from '../constants';

// --- Manual Encoding/Decoding for Live PCM ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const LiveVoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);

  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setIsModelSpeaking(false);
    setTranscription("");
  }, []);

  const startSession = async () => {
    setIsConnecting(true);
    setTranscription("Connecting to SureVoice...");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            setTranscription("Ready. How can I help you?");
            
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && outputAudioContextRef.current) {
              setIsModelSpeaking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                outputAudioContextRef.current,
                24000,
                1,
              );
              
              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContextRef.current.destination);
              
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsModelSpeaking(false);
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => `[SureBot]: ${message.serverContent!.outputTranscription!.text}`);
            } else if (message.serverContent?.inputTranscription) {
              setTranscription(prev => `[You]: ${message.serverContent!.inputTranscription!.text}`);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsModelSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            stopSession();
          },
          onclose: () => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
          systemInstruction: `You are SureXchange Voice, a real-time concierge. Personality: Friendly, swift, helpful. Services: Currency exchange (USD, GBP, EUR to NGN), Bill payments. Rates: USD=${EXCHANGE_RATES.USD}, GBP=${EXCHANGE_RATES.GBP}. Always remind users rates are estimates. Keep turns extremely brief for fluid conversation.`,
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Voice session failed:', err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100]">
      {!isActive && !isConnecting && (
        <button
          onClick={startSession}
          className="bg-[#0B132B] text-white p-3 xs:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-blue-500/50"
          title="Voice Conversation"
        >
          <Mic className="w-6 h-6 xs:w-8 xs:h-8" />
          <div className="absolute -top-1 xs:-top-2 -right-1 xs:-right-2 bg-blue-500 text-[6px] xs:text-[8px] font-bold px-1 xs:px-1.5 py-0.5 rounded-full animate-pulse shadow-lg uppercase tracking-wider">LIVE</div>
        </button>
      )}

      {(isActive || isConnecting) && (
        <div className="bg-white dark:bg-[#0B132B] w-[280px] xs:w-[350px] max-w-[calc(100vw-3rem)] rounded-[1.5rem] xs:rounded-[2.5rem] shadow-2xl border border-blue-500/30 overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0B132B] p-4 xs:p-6 text-white flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-2 xs:space-x-3">
              <div className={`w-2 h-2 xs:w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              <div>
                <h3 className="font-bold text-xs xs:text-sm">SureVoice</h3>
                <p className="text-[8px] xs:text-[10px] text-blue-400 font-bold tracking-widest uppercase">Real-time Audio</p>
              </div>
            </div>
            <button onClick={stopSession} className="hover:bg-white/10 p-1.5 xs:p-2 rounded-full transition-colors"><X className="w-4 h-4 xs:w-5 xs:h-5" /></button>
          </div>

          <div className="p-6 xs:p-10 flex flex-col items-center justify-center space-y-6 xs:space-y-8 bg-gradient-to-b from-blue-500/5 to-transparent">
            {isConnecting ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-12 h-12 xs:w-16 xs:h-16 text-blue-500 animate-spin" />
                <p className="text-gray-500 text-xs xs:text-sm font-medium animate-pulse">Establishing link...</p>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className={`w-24 h-24 xs:w-32 xs:h-32 rounded-full flex items-center justify-center transition-all duration-700 ${isModelSpeaking ? 'bg-blue-600 scale-105 xs:scale-110 shadow-[0_0_50px_rgba(37,99,235,0.6)]' : 'bg-gray-100 dark:bg-white/10'}`}>
                    {isModelSpeaking ? (
                      <Waves className="w-10 h-10 xs:w-12 xs:h-12 text-white animate-pulse" />
                    ) : (
                      <Mic className="w-10 h-10 xs:w-12 xs:h-12 text-blue-500" />
                    )}
                  </div>
                  {isActive && !isModelSpeaking && (
                    <div className="absolute -inset-3 xs:-inset-4 border-2 border-blue-500/20 rounded-full animate-ping"></div>
                  )}
                </div>

                <div className="text-center space-y-2 xs:space-y-3 px-2">
                  <p className="text-base xs:text-lg font-black text-[#0B132B] dark:text-white transition-all">
                    {isModelSpeaking ? "SureBot is responding..." : "Listening to you..."}
                  </p>
                  <div className="h-12 xs:h-16 flex items-center justify-center overflow-hidden">
                    <p className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed line-clamp-2 xs:line-clamp-3">
                      {transcription || "Ask me about USD to Naira rates or global payments..."}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-4 xs:p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 flex justify-center">
            <button
              onClick={stopSession}
              className="flex items-center space-x-2 px-4 xs:px-6 py-2 xs:py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl xs:rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg"
            >
              <MicOff className="w-3 h-3 xs:w-4 xs:h-4" />
              <span className="text-xs xs:text-sm">End Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveVoiceAssistant;
