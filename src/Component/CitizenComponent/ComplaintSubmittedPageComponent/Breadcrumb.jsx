import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  // Access dynamic language state from Redux
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: { home: "Home", success: "Complaint Submitted" },
    AMH: { home: "መነሻ", success: "አቤቱታው ተልኳል" },
    ORM: { home: "Mana", success: "Koomiin Ergameera" },
    TIG: { home: "መበገሲ", success: "ጥርዓን ተላኢኹ" }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <nav className="bg-white/50 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center text-[11px] font-black uppercase tracking-widest">
        <Link 
          to="/" 
          className="text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {t.home}
        </Link>
        
        <span className="mx-3 text-gray-300 font-normal">›</span> 
        
        <span className="text-gray-400">
          {t.success}
        </span>
      </div>
    </nav>
  );
};

export default Breadcrumb;