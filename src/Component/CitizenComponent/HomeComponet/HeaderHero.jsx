import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bot, Send, Sparkles } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
// Ensure this path matches your file structure
import { ChangeLanguage } from "../../../Redux/WebState"; 
import { ChatBot } from "./ChatBot"; 
import Header from "./Header";
const translations = {
  ENG: { 
    home: "HOME", 
    about: "ABOUT US", 
    services: "SERVICES", 
    news: "NEWS", 
    testimonials: "TESTIMONIALS",
    submit: "SUBMIT A COMPLAINT", 
    track: "TRACK COMPLAINT", 
    contact: "CONTACT",
    langLabel: "Language",
    heroTitle: "Your Voice Matters.",
    heroDesc: "Submit complaints easily, track their progress transparently, and help us build a cleaner, safer, and more accountable for everyone.",
    heroFeatures: "Secure • Transparent • Citizen-Centered • Multilingual",
    heroBtn: "SUBMIT A COMPLAINT →",
    aiTitle: "AI Assistant",
    aiWelcome: "Hello! How can I help you today?",
    aiPlaceholder: "Ask a question..."
  },
  AMH: { 
    home: "መነሻ", 
    about: "ስለ እኛ", 
    services: "አገልግሎቶች", 
    news: "ዜና", 
    testimonials: "ምስክርነቶች",
    submit: "አቤቱታ ያስገቡ", 
    track: "አቤቱታ ይከታተሉ", 
    contact: "ያግኙን",
    langLabel: "ቋንቋ",
    heroTitle: "ድምፅዎ ዋጋ አለው።",
    heroDesc: "ጥበቃ አቤቱታዎችን በቀላሉ ያቅርቡ፣ ሂደታቸውንም በግልፅ ይከታተሉ፣ እና ለሁሉም ንፁህ፣ ደህንነቱ የተጠበቀ እና ተጠያቂነት ያለው እንድንገነባ ይርዱን።",
    heroFeatures: "ደህንነቱ የተጠበቀ • ግልፅ • ዜጋ-ተኮር • ብዙ ቋንቋ ተናጋሪ",
    heroBtn: "አቤቱታዎን ያቅርቡ →",
    aiTitle: "AI ረዳት",
    aiWelcome: "ሰላም! ዛሬ እንዴት ልረዳዎ እችላለሁ?",
    aiPlaceholder: "ጥያቄ ይጠይቁ..."
  },
  ORM: { 
    home: "FUULA DURA", 
    about: "WAA'EE KEENYA", 
    services: "TAJAAJJILA", 
    news: "ODUU", 
    testimonials: "RAGAALEE",
    submit: "OLYYANNAA GALCHAA", 
    track: "OLYYANNAA HORDOFAA", 
    contact: "NUN QUNNAMAA",
    langLabel: "Afaan",
    heroTitle: "Sagaleen Keessan Murteessadha.",
    heroDesc: "Koomiiwwan naannoo salphaatti galchaa, adeemsa isaanii iftoominaan hordofaa, hunda keenyaaf naannoo qulqulluu, amansiisaa fi itti gaafatamummaa qabu ijaaruuf nu gargaaraa.",
    heroFeatures: "Amansiisaa • Ifa • Kan Lammii irratti xiyyeeffate • Afaan Baay'ee",
    heroBtn: "KOOMII GALCHAA →",
    aiTitle: "Gargaara AI",
    aiWelcome: "Akkam! Akkamittin si gargaaruu danda'a?",
    aiPlaceholder: "Gaaffii gaafadhu..."
  },
  TIG: { 
    home: "መበገሲ", 
    about: "ብዛዕባና", 
    services: "ኣገልግሎታት", 
    news: "ዜና", 
    testimonials: "ምስክርነት",
    submit: "ጥርዓን የእትዉ", 
    track: "ጥርዓን ይከታተሉ", 
    contact: "ርኸቡና",
    langLabel: "ቋንቋ",
    heroTitle: "ድምፅኹም ዋጋ ኣለዎ።",
    heroDesc: "ጥርዓናት ከባቢ ብቐሊሉ የእትዉ፣ ከይዶም ብግልፂ ይከታተሉ፣ ንኹሉ ሰብ ድማ ፅሩይ፣ ውሑስን ተሓታቲነት ዘለዎ ከባብን ንምህናፅ ሓግዙና።",
    heroFeatures: "ውሑስ • ግልፂ • ዜጋ-ተኮር • ብዙሕ ቋንቋታት",
    heroBtn: "ጥርዓን የእትዉ →",
    aiTitle: "AI ረዳኢ",
    aiWelcome: "ሰላም! ሎሚ ከመይ ክሕግዘካ ይኽእል?",
    aiPlaceholder: "ሕቶ ሕተት..."
  }
};



export default function HeaderHero() {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const t = translations[Language] || translations.ENG;

  return (
    <div className="relative">
      <header
        id="hero"
        className="relative min-h-screen w-full bg-[url('/heroJpg.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-50">
          <Header />
        </div>

        <div className="relative z-20 pt-48 flex items-center flex-1">
          <div className="px-6 sm:px-10 md:px-20 max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
              {t.heroDesc}
            </p>

            <p className="text-sm text-gray-300 mb-8 uppercase tracking-widest">
              {t.heroFeatures}
            </p>

            <Link
              to="/submit-complaint"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-lg font-bold text-sm sm:text-base shadow-lg hover:shadow-blue-500/30"
            >
              {t.heroBtn}
            </Link>
          </div>
        </div>
      </header>

      {/* Floating AI Assistant */}
      <ChatBot content={t} />
    </div>
  );
}