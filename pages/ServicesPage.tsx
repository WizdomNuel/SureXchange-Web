
import React from 'react';
import { CreditCard, Globe, Zap, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

const ServicesPage: React.FC = () => {
  const regions = [
    {
      name: 'United States',
      icon: <Globe className="w-6 h-6" />,
      services: ['Zelle/CashApp Payments', 'Bank Transfers', 'Tuition Fees', 'Property Taxes']
    },
    {
      name: 'Europe',
      icon: <CreditCard className="w-6 h-6" />,
      services: ['SEPA Transfers', 'Utility Bills', 'Business Invoices', 'Holiday Bookings']
    },
    {
      name: 'Asia',
      icon: <Zap className="w-6 h-6" />,
      services: ['Alipay/WeChat Pay', 'Supplier Payments', 'E-commerce Payments', 'Import/Export Duties']
    }
  ];

  return (
    <div className="bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-[#0B132B] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Our Services</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            We offer comprehensive financial solutions tailored for individuals and businesses operating internationally.
          </p>
        </div>
      </section>

      {/* Regional Focus */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0B132B] mb-4">Global Reach</h2>
            <p className="text-gray-500">Fast and reliable payments across key global regions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regions.map((region, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-lg shadow-gray-200/50 hover:-translate-y-2 transition-transform">
                <div className="w-14 h-14 bg-blue-50 text-[#007BFF] rounded-2xl flex items-center justify-center mb-8">
                  {region.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0B132B] mb-6">{region.name}</h3>
                <ul className="space-y-4">
                  {region.services.map((svc, sIdx) => (
                    <li key={sIdx} className="flex items-center text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                      <span>{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-12 rounded-[3rem] border-2 border-[#007BFF] text-center shadow-2xl shadow-blue-100">
            <HelpCircle className="w-16 h-16 text-[#007BFF] mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-[#0B132B] mb-6">Need a custom service?</h2>
            <p className="text-gray-500 mb-10 text-lg">
              If you have a unique payment request or require bulk exchange for your business, we are ready to assist.
            </p>
            <a
              href={WHATSAPP_LINK}
              className="bg-[#007BFF] text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-200 hover:bg-[#0B132B] transition-colors block sm:inline-block"
            >
              Speak with an Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
