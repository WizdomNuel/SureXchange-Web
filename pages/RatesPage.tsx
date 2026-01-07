
import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Clock, Info } from 'lucide-react';
import { EXCHANGE_RATES, WHATSAPP_LINK } from '../constants';

const RatesPage: React.FC = () => {
  return (
    <div className="pb-24 bg-gray-50 dark:bg-[#0B132B] transition-colors">
      <section className="bg-[#0B132B] dark:bg-[#050914] py-16 xs:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-[10px] xs:text-xs font-bold mb-6">
            <Clock className="w-3 h-3 xs:w-4 xs:h-4 text-[#007BFF]" />
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <h1 className="text-3xl xs:text-5xl font-extrabold mb-6">Market Rates</h1>
          <p className="text-gray-400 text-base xs:text-xl max-w-2xl mx-auto">
            Competitive market-reflective rates updated daily to ensure you get the best value for your currency.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white dark:bg-[#1C2541] rounded-[2rem] xs:rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[600px] xs:min-w-0">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                  <th className="px-6 xs:px-8 py-5 xs:py-6 text-left text-[10px] xs:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Currency</th>
                  <th className="px-6 xs:px-8 py-5 xs:py-6 text-left text-[10px] xs:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Buy Rate (₦)</th>
                  <th className="px-6 xs:px-8 py-5 xs:py-6 text-left text-[10px] xs:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Trend</th>
                  <th className="px-6 xs:px-8 py-5 xs:py-6 text-right text-[10px] xs:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {Object.entries(EXCHANGE_RATES).map(([currency, rate], idx) => (
                  <tr key={currency} className="hover:bg-blue-50/30 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 xs:px-8 py-6 xs:py-8">
                      <div className="flex items-center space-x-3 xs:space-x-4">
                        <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center font-bold text-[#0B132B] dark:text-white">
                          {currency === 'USD' ? '$' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '¥'}
                        </div>
                        <div>
                          <div className="font-black text-lg xs:text-xl text-[#0B132B] dark:text-white">{currency}</div>
                          <div className="text-[9px] xs:text-[10px] text-gray-400 font-bold uppercase">To Naira</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 xs:px-8 py-6 xs:py-8 font-black text-xl xs:text-2xl text-[#007BFF]">
                      {rate.toLocaleString()}
                    </td>
                    <td className="px-6 xs:px-8 py-6 xs:py-8">
                      {idx % 2 === 0 ? (
                        <span className="inline-flex items-center text-green-500 font-bold bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full text-[9px] xs:text-xs">
                          <ArrowUp className="w-3 h-3 mr-1" /> 1.2%
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-red-500 font-bold bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full text-[9px] xs:text-xs">
                          <ArrowDown className="w-3 h-3 mr-1" /> 0.5%
                        </span>
                      )}
                    </td>
                    <td className="px-6 xs:px-8 py-6 xs:py-8 text-right">
                      <a
                        href={`${WHATSAPP_LINK}?text=I want to exchange ${currency} at ${rate} rate.`}
                        className="bg-[#0B132B] dark:bg-[#007BFF] text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg xs:rounded-xl text-xs xs:text-sm font-bold hover:bg-[#007BFF] dark:hover:bg-blue-600 transition-all inline-block shadow-lg"
                      >
                        Exchange
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 xs:p-8 bg-blue-50 dark:bg-blue-900/10 flex items-start space-x-3 xs:space-x-4 border-t border-blue-100 dark:border-white/10">
            <Info className="w-5 h-5 xs:w-6 xs:h-6 text-[#007BFF] shrink-0" />
            <p className="text-[10px] xs:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              <strong>Notice:</strong> Rates in the parallel market fluctuate throughout the day. The rates displayed here are for informational purposes. The actual rate for your transaction will be confirmed at the point of exchange via WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-8 xs:mt-12 bg-white dark:bg-[#1C2541] p-8 xs:p-12 rounded-[2rem] xs:rounded-[3rem] border border-gray-100 dark:border-white/10 shadow-xl text-center">
            <TrendingUp className="w-12 h-12 xs:w-16 xs:h-16 text-[#007BFF] mx-auto mb-6 xs:mb-8" />
            <h2 className="text-2xl xs:text-3xl font-extrabold text-[#0B132B] dark:text-white mb-4">Want the VIP Rate?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto text-xs xs:text-base">
                We offer special rates for bulk exchanges and long-term business partners. If you're exchanging over $10,000, talk to our account managers.
            </p>
            <a href={WHATSAPP_LINK} className="text-[#007BFF] font-black text-lg xs:text-xl hover:underline">
                Contact Account Manager →
            </a>
        </div>
      </div>
    </div>
  );
};

export default RatesPage;
