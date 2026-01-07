
import React from 'react';
import { Target, Users, ShieldCheck, Award, TrendingUp, BarChart3 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pb-24 bg-white dark:bg-[#0B132B] transition-colors duration-300">
      {/* Hero Banner */}
      <section className="relative h-[450px] lg:h-[550px] flex items-center overflow-hidden">
        {/* Professional Financial Trading Visual */}
        <img 
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]" 
          alt="Professional Financial Trading Chart" 
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 bg-blue-600 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            Established & Trusted
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">Our Mission</h1>
          <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            "To simplify global finance for Nigerians, providing a bridge that is reliable, friendly, and lightning fast."
          </p>
          <div className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl text-white/90 text-sm font-bold border border-white/20">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>A Subsidiary of Eazify Innovation</span>
          </div>
        </div>
      </section>

      {/* Content Section - Centered layout after removing terminal image */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B132B] dark:text-white leading-tight">
                Trusted Locally, <span className="text-blue-600">Respected Globally.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                SureXchange started with a simple observation: currency exchange was often a stressful, opaque, and slow process. As a proud subsidiary of <strong>Eazify Innovation</strong>, we leverage cutting-edge technology to make global payments seamless for every Nigerian.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-blue-50 dark:bg-white/5 p-10 rounded-[2.5rem] border border-transparent dark:border-white/10 transition-all hover:scale-105 shadow-sm">
                <div className="text-6xl font-black text-blue-600 mb-2">5+</div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Years Experience</div>
              </div>
              <div className="bg-blue-50 dark:bg-white/5 p-10 rounded-[2.5rem] border border-transparent dark:border-white/10 transition-all hover:scale-105 shadow-sm">
                <div className="text-6xl font-black text-blue-600 mb-2">10k+</div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Clients Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0B132B] dark:bg-[#050914] py-28 text-white transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The principles that drive every single transaction under the Eazify Innovation banner.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', icon: <ShieldCheck className="w-8 h-8" />, desc: 'Honesty and transparency in every transaction.' },
              { title: 'Speed', icon: <Target className="w-8 h-8" />, desc: 'Swift processing. Minutes, not days.' },
              { title: 'Customer First', icon: <Users className="w-8 h-8" />, desc: 'Dedicated friendly support available 24/7.' },
              { title: 'Innovation', icon: <BarChart3 className="w-8 h-8" />, desc: 'Leveraging tech for better financial bridges.' }
            ].map((v, i) => (
              <div key={i} className="group text-center p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 mb-8 inline-block bg-white/10 p-5 rounded-3xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {v.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{v.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
