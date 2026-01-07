
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 pb-24">
      {/* Header */}
      <section className="bg-[#0B132B] py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-xl">We are here to help you 24/7, anywhere in the world.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-[#007BFF] rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-500 text-sm">Mon - Sun (24/7)</p>
                  </div>
               </div>
               <a href={`tel:${PHONE_NUMBER}`} className="text-xl font-bold text-[#0B132B] hover:text-[#007BFF]">+234 {PHONE_NUMBER}</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">WhatsApp</h4>
                    <p className="text-gray-500 text-sm">Quick Chat</p>
                  </div>
               </div>
               <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-[#0B132B] hover:text-green-500">SureXchange Support</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100">
               <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Location</h4>
                    <p className="text-gray-500 text-sm">Global Operations</p>
                  </div>
               </div>
               <p className="text-lg font-bold text-[#0B132B]">We Operate Globally</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 lg:p-16 rounded-[3rem] shadow-2xl shadow-blue-100 border border-gray-100">
              <h2 className="text-3xl font-extrabold text-[#0B132B] mb-8">Send us a message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#007BFF] outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#007BFF] outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input type="text" className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#007BFF] outline-none" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#007BFF] outline-none" placeholder="Write your message here..."></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#007BFF] text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center space-x-2 shadow-xl shadow-blue-200 hover:bg-[#0B132B] transition-all"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
