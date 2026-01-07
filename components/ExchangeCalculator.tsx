
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';
import { Currency } from '../types';
import { EXCHANGE_RATES, WHATSAPP_LINK } from '../constants';

const ExchangeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
  const [toCurrency, setToCurrency] = useState<Currency>('NGN');
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (amount <= 0 || isNaN(amount)) {
      setResult(0);
      return;
    }

    if (fromCurrency === 'NGN') {
      if (toCurrency !== 'NGN') {
        setResult(amount / EXCHANGE_RATES[toCurrency as Exclude<Currency, 'NGN'>]);
      } else {
        setResult(amount);
      }
    } else {
      if (toCurrency === 'NGN') {
        setResult(amount * EXCHANGE_RATES[fromCurrency as Exclude<Currency, 'NGN'>]);
      } else {
        // Converting between two foreign currencies via NGN base
        const toNaira = amount * EXCHANGE_RATES[fromCurrency as Exclude<Currency, 'NGN'>];
        setResult(toNaira / EXCHANGE_RATES[toCurrency as Exclude<Currency, 'NGN'>]);
      }
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      setAmount(0);
      setError("Please enter a valid number");
    } else if (val < 0) {
      setAmount(val);
      setError("Amount cannot be negative");
    } else {
      setAmount(val);
      setError(null);
    }
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleWhatsAppQuote = () => {
    if (error || amount <= 0) return;
    const formattedResult = toCurrency === 'NGN' 
      ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(result)
      : `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`;
      
    const message = `I'd like to exchange ${amount} ${fromCurrency} to ${toCurrency}, with an estimated result of ${formattedResult}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatResult = (val: number) => {
    if (toCurrency === 'NGN') {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(val);
    }
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] p-6 rounded-3xl shadow-2xl shadow-blue-100 dark:shadow-none border border-gray-100 dark:border-white/10 w-full max-w-md mx-auto transition-colors duration-300">
      <h3 className="text-xl font-bold text-[#0B132B] dark:text-white mb-6 flex items-center justify-between">
        Exchange Calculator
        <span className="text-xs font-medium text-[#007BFF] bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">Live Estimates</span>
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">You Send</label>
          <div className="relative">
            <input
              type="number"
              value={amount === 0 ? "" : amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className={`w-full bg-gray-50 dark:bg-white/5 border-2 ${error ? 'border-red-500' : 'border-transparent'} rounded-2xl p-4 text-xl font-bold dark:text-white focus:ring-2 focus:ring-[#007BFF] transition-all outline-none`}
            />
            <select
              value={fromCurrency}
              onChange={(e) => {
                const val = e.target.value as Currency;
                setFromCurrency(val);
                if (val !== 'NGN' && toCurrency !== 'NGN') setToCurrency('NGN');
                if (val === 'NGN' && toCurrency === 'NGN') setToCurrency('USD');
              }}
              className="absolute right-2 top-2 bottom-2 bg-white dark:bg-[#1C2541] border border-gray-200 dark:border-white/10 rounded-xl px-4 font-bold text-gray-700 dark:text-white outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="EUR">EUR (€)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="NGN">NGN (₦)</option>
            </select>
          </div>
          {error && (
            <div className="flex items-center mt-2 text-red-500 text-xs font-medium">
              <AlertCircle className="w-3 h-3 mr-1" />
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={handleSwap}
            className="bg-[#007BFF] p-3 rounded-full shadow-lg shadow-blue-200 dark:shadow-none text-white hover:bg-[#0B132B] dark:hover:bg-blue-600 transition-colors transform active:rotate-180 duration-500"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">You Receive (Est.)</label>
          <div className="relative">
            <div className="w-full bg-blue-50/50 dark:bg-blue-900/10 border-0 rounded-2xl p-4 text-xl font-bold text-[#007BFF] flex justify-between items-center">
              <span className="truncate">{formatResult(result)}</span>
              <select
                value={toCurrency}
                onChange={(e) => {
                  const val = e.target.value as Currency;
                  setToCurrency(val);
                  if (val !== 'NGN' && fromCurrency !== 'NGN') setFromCurrency('NGN');
                  if (val === 'NGN' && fromCurrency === 'NGN') setFromCurrency('USD');
                }}
                className="bg-white dark:bg-[#1C2541] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-1 text-sm font-bold text-gray-700 dark:text-white outline-none cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="CNY">CNY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-[10px] text-gray-400 mb-4 text-center leading-tight">
            *Rates are illustrative and change frequently. Contact us via WhatsApp for a confirmed quote.
          </p>
          <button
            onClick={handleWhatsAppQuote}
            disabled={!!error || amount <= 0}
            className="w-full bg-[#007BFF] hover:bg-[#0B132B] dark:hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-100 dark:shadow-none transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lock This Rate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCalculator;
