
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { NAV_ITEMS, PHONE_NUMBER, WHATSAPP_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] dark:bg-[#050914] text-white pt-16 pb-8 border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 32V20M20 32V12M32 32V8" stroke="#007BFF" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M4 28C10 28 15 22 15 12C15 8 18 5 22 5C28 5 32 10 32 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M30 14L34 18L38 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
               <span className="text-2xl font-bold tracking-tight">SureXchange</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A subsidiary of <strong>Eazify Innovation</strong>. Providing reliable and friendly money exchange services locally and globally. Your trust is our currency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#007BFF] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#007BFF] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#007BFF] transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#007BFF] transition-colors flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Currency Exchange</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">US Bill Payments</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Europe Bill Payments</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Asia Bill Payments</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-[#007BFF] shrink-0" />
                <span>+234 {PHONE_NUMBER}</span>
              </a>
              <a href={WHATSAPP_LINK} className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors">
                <div className="w-5 h-5 text-[#007BFF] shrink-0 font-bold">WA</div>
                <span>WhatsApp Support</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#007BFF] shrink-0" />
                <span>Global HQ: Eazify Innovation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SureXchange | A Subsidiary of Eazify Innovation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
