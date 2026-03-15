import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Users, Bot } from "lucide-react";
import { ChatBot } from "./ChatBot"; // Ensure path is correct

export default function HeaderHero() {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      title: "Your Voice Matters.",
      desc: "Submit  complaints easily, track their progress transparently, and help us build a cleaner, safer, and more accountable environment for everyone.",
      features: "Secure • Transparent • Citizen-Centered • Multilingual",
      button: "SUBMIT A COMPLAINT →",
      cardSecureTitle: "Secure & Private",
      cardSecureDesc: "Your data is protected",
      cardTransparentTitle: "Transparent Tracking",
      cardTransparentDesc: "Real-time status updates",
      cardCitizenTitle: "Citizen Centered",
      cardCitizenDesc: "Built for community",
      // Chatbot translations
      aiTitle: "AI Assistant",
      aiWelcome: "Hello! How can I help you today?",
      aiPlaceholder: "Ask a question..."
    },
    AMH: {
      title: "ድምፅዎ ዋጋ አለው።",
      desc: " አቤቱታዎችን በቀላሉ ያቅርቡ፣ ሂደታቸውንም በግልፅ ይከታተሉ፣ እና ለሁሉም ንፁህ፣ ደህንነቱ የተጠበቀ እና ተጠያቂነት ያለው አካባቢን እንድንገነባ ይርዱን።",
      features: "ደህንነቱ የተጠበቀ • ግልፅ • ዜጋ-ተኮር • ብዙ ቋንቋ ተናጋሪ",
      button: "አቤቱታዎን ያቅርቡ →",
      cardSecureTitle: "ደህንነቱ የተጠበቀ እና የግል",
      cardSecureDesc: "መረጃዎ የተጠበቀ ነው",
      cardTransparentTitle: "ግልፅ ክትትል",
      cardTransparentDesc: "ወቅታዊ የሁኔታ መረጃ",
      cardCitizenTitle: "ዜጋ ተኮር",
      cardCitizenDesc: "ለህብረተሰቡ የተሰራ",
      aiTitle: "AI ረዳት",
      aiWelcome: "ሰላም! ዛሬ እንዴት ልረዳዎ እችላለሁ?",
      aiPlaceholder: "ጥያቄ ይጠይቁ..."
    },
    ORM: {
      title: "Sagaleen Keessan Murteessadha.",
      desc: "Koomiiwwan naannoo salphaatti galchaa, adeemsa isaanii iftoominaan hordofaa, hunda keenyaaf naannoo qulqulluu, amansiisaa fi itti gaafatamummaa qabu ijaaruuf nu gargaaraa.",
      features: "Amansiisaa • Ifa • Kan Lammii irratti xiyyeeffate • Afaan Baay'ee",
      button: "KOOMII GALCHAA →",
      cardSecureTitle: "Eegumsa & Dhuunfaa",
      cardSecureDesc: "Odeeffannoon kee eegamaadha",
      cardTransparentTitle: "Hordoffii Ifa Ta'e",
      cardTransparentDesc: "Odeeffannoo yeroo ammaa",
      cardCitizenTitle: "Lammii Giddu-galeessa Godhate",
      cardCitizenDesc: "Hawaasaaf Kan Ijaarame",
      aiTitle: "Gargaara AI",
      aiWelcome: "Akkam! Akkamittin si gargaaruu danda'a?",
      aiPlaceholder: "Gaaffii gaafadhu..."
    },
    TIG: {
      title: "ድምፅኹም ዋጋ ኣለዎ።",
      desc: "ጥርዓናት ከባቢ ብቐሊሉ የእትዉ፣ ከይዶም ብግልፂ ይከታተሉ፣ ንኹሉ ሰብ ድማ ፅሩይ፣ ውሑስን ተሓታቲነት ዘለዎ ከባብን ንምህናፅ ሓግዙና።",
      features: "ውሑስ • ግልፂ • ዜጋ-ተኮር • ብዙሕ ቋንቋታት",
      button: "ጥርዓን የእትዉ →",
      cardSecureTitle: "ውሑስን ብሕታዊን",
      cardSecureDesc: "ሓበሬታኹም ዝተሓለወ እዩ",
      cardTransparentTitle: "ግልፂ ምክትታል",
      cardTransparentDesc: "እዋናዊ ኩነታት ሓበሬታ",
      cardCitizenTitle: "ዜጋ ተኮር",
      cardCitizenDesc: "ንሕብረተሰብ ዝተሃነፀ",
      aiTitle: "AI ረዳኢ",
      aiWelcome: "ሰላም! ሎሚ ከመይ ክሕግዘካ ይኽእል?",
      aiPlaceholder: "ሕቶ ሕተት..."
    }
  };

  const t = translations[Language] || translations.ENG;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <header id="hero" className="relative w-full overflow-hidden">
      {/* Navbar Section */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Main Hero Background Section */}
      <div className="relative min-h-screen w-full bg-[url('/heroJpg.jpg')] bg-cover bg-center bg-no-repeat flex items-center">
        {/* Deep Green Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20 to-transparent z-10" />

        <div className="relative z-20 w-full px-6 sm:px-10 md:px-20 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-20">
          
          {/* Text Content (Left) */}
          <motion.div
            className="max-w-2xl text-white flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
              {t.title}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
              {t.desc}
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <span className="h-1 w-10 bg-yellow-400 rounded-full"></span>
              <p className="text-xs sm:text-sm font-bold text-yellow-100 uppercase tracking-widest">
                {t.features}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/submit-complaint">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0E4C98] text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all border-2 border-transparent hover:border-white/30"
                >
                  {t.button}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Feature Card (Right) */}
          <motion.div 
            className="hidden lg:flex flex-1 justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm w-full"
            >
              {[
                { icon: <ShieldCheck className="text-green-300" />, title: t.cardSecureTitle, desc: t.cardSecureDesc },
                { icon: <FileText className="text-blue-300" />, title: t.cardTransparentTitle, desc: t.cardTransparentDesc },
                { icon: <Users className="text-yellow-300" />, title: t.cardCitizenTitle, desc: t.cardCitizenDesc }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-6 last:mb-0">
                  <div className="bg-white/10 p-3 rounded-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-white font-bold">{item.title}</h3>
                    <p className="text-gray-300 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Glowing Orbs */}
            <div className="absolute -top-10 -right-10 bg-blue-500/20 w-40 h-40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 bg-green-500/20 w-40 h-40 rounded-full blur-3xl animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Floating AI Assistant Integration */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <ChatBot content={t} />
      </div>
    </header>
  );
}