
import React from 'react';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExchangeCalculator from '../components/ExchangeCalculator';
import { SERVICES_LIST, TRUST_FEATURES, WHATSAPP_LINK } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white dark:bg-[#0B132B] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-50 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-[#007BFF] px-4 py-2 rounded-full text-xs font-bold mb-8 animate-bounce">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007BFF]"></span>
                </span>
                <span>Operating 24/7 Globally</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0B132B] dark:text-white leading-[1.1] mb-8">
                Reliable <span className="text-[#007BFF]">Money Exchange</span> Services
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Exchange your currency quickly and send money or pay for bills in the United States, Europe, and Asia with ease. 
                <span className="block mt-2 font-semibold">A subsidiary of Eazify Innovation.</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#0B132B] dark:bg-[#007BFF] text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-[#007BFF] dark:hover:bg-blue-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-gray-200 dark:shadow-none"
                >
                  <span>Chat With Us</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
                >
                  <Play className="w-4 h-4 text-[#007BFF] fill-current" />
                  <span>Our Services</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#0B132B] dark:text-white">24/7</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0B132B] dark:text-white">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Secure</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0B132B] dark:text-white">Fast</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Transfers</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] rotate-3 scale-105 -z-10"></div>
              <div className="absolute inset-0 bg-indigo-600/5 rounded-[3rem] -rotate-2 scale-105 -z-10"></div>
              <ExchangeCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Banner */}
      <section className="bg-[#0B132B] dark:bg-[#050914] py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">Recognized Currencies</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20">
                {['$ USD', '£ GBP', '€ EUR', '¥ CNY', '₦ NGN'].map(curr => (
                    <span key={curr} className="text-white text-2xl md:text-3xl font-extrabold opacity-40 hover:opacity-100 transition-opacity cursor-default">
                        {curr}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-[#0B132B] dark:text-white mb-6">What We Do</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              We provide a seamless financial bridge between Nigeria and the rest of the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0B132B] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-200/30 dark:hover:bg-[#1C2541] transition-all group">
                <div className="w-16 h-16 bg-blue-50 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#007BFF] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0B132B] dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">{service.description}</p>
                <Link to="/services" className="inline-flex items-center text-[#007BFF] font-bold hover:underline">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
