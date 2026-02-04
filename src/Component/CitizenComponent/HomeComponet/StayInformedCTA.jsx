import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';

const StayInformedCTA = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      heading: "Stay Informed",
      button: "Get Started Now"
    },
    AMH: {
      heading: "መረጃ ያግኙ",
      button: "አሁኑኑ ይጀምሩ"
    },
    ORM: {
      heading: "Odeeffannoo Qabaadhaa",
      button: "Amma Jalqabaa"
    },
    TIG: {
      heading: "ሓበሬታ ይሃልኹም",
      button: "ሕዚ ይጀምሩ"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <section className="bg-[#3b3b3b] py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <h2 className="text-white text-6xl md:text-7xl font-bold mb-10 tracking-tight">
          {t.heading}
        </h2>

        {/* Action Button */}
        <button className="bg-[#0b53a3] hover:bg-[#094282] text-white flex items-center gap-3 px-8 py-3 font-bold uppercase tracking-widest text-sm transition-colors duration-200">
          {t.button}
          <ArrowRight size={20} strokeWidth={3} />
        </button>
        
      </div>
    </section>
  );
};

export default StayInformedCTA;