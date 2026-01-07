// Added missing React import to resolve 'Cannot find namespace React' error
import React from 'react';

export type Currency = 'USD' | 'GBP' | 'EUR' | 'CNY' | 'NGN';

export interface ExchangeRate {
  from: Currency;
  to: Currency;
  rate: number;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}