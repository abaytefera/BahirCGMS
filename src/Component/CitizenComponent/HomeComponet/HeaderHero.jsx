import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderHero() {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      title: "Your Voice Matters.",
      desc: "Submit complaints easily, track their progress transparently, and help us build a cleaner, safer, and more accountable for everyone.",
      features: "Secure • Transparent • Citizen-Centered • Multilingual",
      button: "SUBMIT A COMPLAINT →"
    },
    AMH: {
      title: "ድምፅዎ ዋጋ አለው።",
      desc: "ጥበቃ አቤቱታዎችን በቀላሉ ያቅርቡ፣ ሂደታቸውንም በግልፅ ይከታተሉ፣ እና ለሁሉም ንፁህ፣ ደህንነቱ የተጠበቀ እና ተጠያቂነት ያለው እንድንገነባ ይርዱን።",
      features: "ደህንነቱ የተጠበቀ • ግልፅ • ዜጋ-ተኮር • ብዙ ቋንቋ ተናጋሪ",
      button: "አቤቱታዎን ያቅርቡ →"
    },
    ORM: {
      title: "Sagaleen Keessan Murteessadha.",
      desc: "Koomiiwwan naannoo salphaatti galchaa, adeemsa isaanii iftoominaan hordofaa, hunda keenyaaf naannoo qulqulluu, amansiisaa fi itti gaafatamummaa qabu ijaaruuf nu gargaaraa.",
      features: "Amansiisaa • Ifa • Kan Lammii irratti xiyyeeffate • Afaan Baay'ee",
      button: "KOOMII GALCHAA →"
    },
    TIG: {
      title: "ድምፅኹም ዋጋ ኣለዎ።",
      desc: "ጥርዓናት ከባቢ ብቐሊሉ የእትዉ፣ ከይዶም ብግልፂ ይከታተሉ፣ ንኹሉ ሰብ ድማ ፅሩይ፣ ውሑስን ተሓታቲነት ዘለዎ ከባብን ንምህናፅ ሓግዙና።",
      features: "ውሑስ • ግልፂ • ዜጋ-ተኮር • ብዙሕ ቋንቋታት",
      button: "ጥርዓን የእትዉ →"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <header
      id="hero"
      className="
        relative 
        min-h-screen 
        w-full 
        bg-[url('/heroJpg.jpg')] 
        bg-cover 
        bg-center 
        bg-no-repeat
        -top-10
      "
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 top-40 flex items-center flex-1">
        <div
          className="
            px-6
            sm:px-10
            md:px-20
            max-w-3xl
            text-white
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-extrabold
              leading-tight
              mb-6
            "
          >
            {t.title}
          </h1>

          <p
            className="
              text-base
              sm:text-lg
              md:text-xl
              text-gray-200
              mb-6
            "
          >
            {t.desc}
          </p>

          <p className="text-sm text-gray-300 mb-8">
            {t.features}
          </p>

          <Link
            to="/submit-complaint"
            className="
              inline-flex
              items-center
              bg-blue-600
              hover:bg-blue-700
              transition
              px-6
              py-3
              rounded
              font-semibold
              text-sm
              sm:text-base
            "
          >
            {t.button}
          </Link>
        </div>
      </div>
    </header>
  );
}