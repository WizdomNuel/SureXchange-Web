
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Volume2, VolumeX, Mic, Square, Trash2, Headphones, Radio } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { EXCHANGE_RATES } from '../constants';

// Manual Base64 decoding for browsers as per guidelines
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Custom decoding for raw PCM 16-bit audio as required by Gemini API (24kHz)
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

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; isAudio?: boolean }[]>([
    { role: 'assistant', text: "Hi there! I'm your SureXchange assistant. How can I help you today? You can even say 'Hey SureBot' to wake me up!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(false);
  const [isWakeEnabled, setIsWakeEnabled] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isRecording]);

  const stopSpeaking = useCallback(() => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {}
      currentSourceRef.current = null;
    }
    setSpeakingIndex(null);
  }, []);

  const handleDeleteMessage = (index: number) => {
    if (speakingIndex === index) stopSpeaking();
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSpeak = async (text: string, index: number) => {
    // If clicking the one currently playing, stop it.
    if (speakingIndex === index) {
      stopSpeaking();
      return;
    }

    // Stop any current playback before starting new one
    stopSpeaking();
    setSpeakingIndex(index);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        const audioBuffer = await decodeAudioData(
          decodeBase64(base64Audio),
          audioContextRef.current,
          24000,
          1
        );

        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        
        // Use a ref check inside onended to ensure we don't clear the index if another sound started
        source.onended = () => {
          setSpeakingIndex(prev => prev === index ? null : prev);
        };
        
        currentSourceRef.current = source;
        source.start();
      } else {
        setSpeakingIndex(null);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setSpeakingIndex(null);
    }
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && isWakeEnabled && !isOpen) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (transcript.includes('hey sure bot') || transcript.includes('hey surebot')) {
          setIsOpen(true);
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
          audio.volume = 0.2;
          audio.play().catch(() => {});
        }
      };

      recognition.onend = () => {
        if (isWakeEnabled && !isOpen) {
          try { recognition.start(); } catch(e) {}
        }
      };

      try { recognition.start(); } catch(e) {}
      recognitionRef.current = recognition;
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    }
    return () => { if (recognitionRef.current) recognitionRef.current.stop(); };
  }, [isWakeEnabled, isOpen]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const base64Audio = await blobToBase64(audioBlob);
        handleSend(undefined, { data: base64Audio, mimeType: mediaRecorder.mimeType });
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      timerRef.current = window.setInterval(() => {}, 1000);
    } catch (err) {
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSend = async (textOverride?: string, audioData?: { data: string, mimeType: string }) => {
    const userMsg = textOverride || input.trim();
    if (!userMsg && !audioData) return;
    if (isLoading) return;

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: audioData ? "🎤 Sent a voice note" : userMsg,
      isAudio: !!audioData 
    }]);
    
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [];
      if (userMsg && !audioData) {
        parts.push({ text: userMsg });
      } else if (audioData) {
        parts.push({ inlineData: { mimeType: audioData.mimeType, data: audioData.data } });
        parts.push({ text: "Respond to this audio input professionally." });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: `You are SureBot, a customer support agent for SureXchange. Keep responses professional and concise. Use bullet points for services. Rates: USD=${EXCHANGE_RATES.USD}, GBP=${EXCHANGE_RATES.GBP}, EUR=${EXCHANGE_RATES.EUR}.`
        }
      });

      const aiText = response.text || "I'm sorry, I'm having trouble connecting right now.";
      
      // Fix: Explicitly type the new message to satisfy the state type constraints
      setMessages(prev => {
        const newMessage: { role: 'user' | 'assistant'; text: string; isAudio?: boolean } = {
          role: 'assistant',
          text: aiText
        };
        const nextMessages = [...prev, newMessage];
        if (isAutoSpeak) {
          // Speak the newly added message
          handleSpeak(aiText, nextMessages.length - 1);
        }
        return nextMessages;
      });
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error connecting to AI assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-4">
      {!isOpen && (
        <button
          onClick={() => setIsWakeEnabled(!isWakeEnabled)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all shadow-lg ${isWakeEnabled ? 'bg-blue-600 text-white animate-pulse' : 'bg-white dark:bg-[#0B132B] text-gray-400 border border-gray-100 dark:border-white/10'}`}
        >
          <Radio className={`w-3 h-3 ${isWakeEnabled ? 'animate-ping' : ''}`} />
          <span>{isWakeEnabled ? 'Wake Word On' : 'Hey SureBot'}</span>
        </button>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#007BFF] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative"
        >
          <MessageSquare className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-[#0B132B] w-[320px] xs:w-[380px] h-[500px] xs:h-[550px] rounded-[2rem] xs:rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-[#0B132B] dark:bg-[#007BFF] p-5 xs:p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 xs:w-10 xs:h-10 bg-blue-500 rounded-xl flex items-center justify-center font-black text-xs text-white">SX</div>
              <div><h3 className="font-bold text-sm xs:text-base">SureBot</h3><p className="text-[9px] xs:text-[10px] opacity-60 font-bold uppercase tracking-widest">Assistant</p></div>
            </div>
            <div className="flex items-center space-x-1 xs:space-x-2">
              <button onClick={() => setIsAutoSpeak(!isAutoSpeak)} className={`p-1.5 xs:p-2 rounded-full transition-all ${isAutoSpeak ? 'bg-blue-500/20 text-blue-400' : 'text-white/40 hover:text-white'}`}>
                {isAutoSpeak ? <Headphones className="w-4 h-4 xs:w-5 xs:h-5 animate-pulse" /> : <VolumeX className="w-4 h-4 xs:w-5 xs:h-5" />}
              </button>
              <button onClick={() => { stopSpeaking(); setIsOpen(false); }} className="hover:bg-white/10 p-1.5 xs:p-2 rounded-full transition-colors"><X className="w-5 h-5 xs:w-6 xs:h-6" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 xs:p-6 space-y-4 bg-gray-50/50 dark:bg-white/5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group/msg`}>
                <div className={`relative max-w-[85%] p-3 xs:p-4 rounded-2xl xs:rounded-3xl text-sm ${m.role === 'user' ? 'bg-[#007BFF] text-white rounded-tr-none' : 'bg-white dark:bg-[#1C2541] border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-200 rounded-tl-none'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="opacity-50 text-[10px] font-bold uppercase tracking-wider">{m.role === 'user' ? 'You' : 'SureBot'}</div>
                      <button 
                        onClick={() => handleDeleteMessage(i)}
                        className="opacity-0 group-hover/msg:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500 rounded-full"
                        title="Delete Message"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    {m.role === 'assistant' && (
                      <button 
                        onClick={() => handleSpeak(m.text, i)} 
                        className={`p-1 rounded-full transition-all transform active:scale-90 ${speakingIndex === i ? 'text-blue-500 bg-blue-100/50' : 'text-gray-400 hover:text-blue-500 hover:bg-gray-100/50'}`}
                      >
                        {speakingIndex === i ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap text-xs xs:text-sm">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white dark:bg-[#1C2541] p-3 xs:p-4 rounded-2xl xs:rounded-3xl rounded-tl-none border border-gray-100 dark:border-white/5 shadow-sm flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-[10px] xs:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Thinking</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 xs:p-4 bg-white dark:bg-[#0B132B] border-t border-gray-100 dark:border-white/10">
            {isRecording ? (
              <div className="flex items-center space-x-3 bg-red-50 dark:bg-red-900/10 p-3 xs:p-4 rounded-xl xs:rounded-2xl border border-red-100 dark:border-red-900/20">
                <button onClick={cancelRecording} className="text-gray-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                <div className="flex-grow h-1 bg-red-200 dark:bg-red-900/40 rounded-full overflow-hidden"><div className="h-full bg-red-500 animate-[shimmer_2s_infinite]" style={{width:'100%'}}></div></div>
                <button onClick={stopRecording} className="bg-red-600 text-white p-2 rounded-xl"><Square className="w-5 h-5" /></button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 xs:space-x-2 bg-gray-50 dark:bg-white/5 p-1.5 xs:p-2 rounded-xl xs:rounded-2xl border border-gray-100 dark:border-white/10 focus-within:ring-2 focus-within:ring-blue-100">
                <button onClick={startRecording} className="p-2 text-gray-400 hover:text-blue-500"><Mic className="w-4 h-4 xs:w-5 xs:h-5" /></button>
                <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&handleSend()} placeholder="Ask SureBot..." className="flex-grow bg-transparent border-none focus:ring-0 text-xs xs:text-sm px-2 outline-none dark:text-white" />
                <button onClick={()=>handleSend()} disabled={!input.trim()||isLoading} className="bg-[#007BFF] text-white p-1.5 xs:p-2 rounded-xl hover:bg-[#0B132B] disabled:opacity-50 transition-colors"><Send className="w-4 h-4 xs:w-5 xs:h-5" /></button>
              </div>
            )}
            <p className="text-[8px] xs:text-[9px] text-gray-400 mt-2 xs:mt-3 text-center uppercase font-medium tracking-wider">Eazify Innovation Assistant</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
