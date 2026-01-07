
import React from 'react';
import { NavItem, Currency } from './types';
import { DollarSign, Globe, Repeat, CreditCard, ShieldCheck, Zap } from 'lucide-react';

export const COLORS = {
  primary: '#007BFF', // Vibrant Blue
  secondary: '#0B132B', // Dark Navy
  accent: '#3A506B',
  light: '#F8F9FA',
  success: '#28A745'
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Rates', path: '/rates' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export const EXCHANGE_RATES: Record<Exclude<Currency, 'NGN'>, number> = {
  USD: 1650,
  GBP: 2050,
  EUR: 1780,
  CNY: 230
};

export const WHATSAPP_LINK = "https://wa.me/2347049728416";
export const PHONE_NUMBER = "07049728416";

export const SERVICES_LIST = [
  {
    title: 'Instant Exchange',
    description: 'Exchange your USD, GBP, EUR, or CNY to Naira within minutes at the best market rates.',
    icon: <Repeat className="w-8 h-8 text-[#007BFF]" />
  },
  {
    title: 'Bill Payments',
    description: 'Pay for bills, tuition, and utilities in the United States, Europe, and Asia directly from your local currency.',
    icon: <CreditCard className="w-8 h-8 text-[#007BFF]" />
  },
  {
    title: 'Global Transfers',
    description: 'Securely send money to friends, family, or business partners anywhere in the world.',
    icon: <Globe className="w-8 h-8 text-[#007BFF]" />
  }
];

export const TRUST_FEATURES = [
  {
    title: '24/7 Availability',
    description: 'We operate around the clock to ensure you can exchange money whenever you need it.',
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Secure & Reliable',
    description: 'Trusted locally and respected globally with a proven track record of safe transactions.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: 'Best Rates',
    description: 'We pride ourselves on providing the most competitive exchange rates in the market.',
    icon: <DollarSign className="w-6 h-6" />
  }
];
