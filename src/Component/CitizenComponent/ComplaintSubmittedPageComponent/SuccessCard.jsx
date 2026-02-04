import { useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SuccessCard = () => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const location = useLocation();
  const [isCopied, setIsCopied] = useState(false);

  const referenceNumber = location.state?.referenceNumber || "CGMS-PENDING";

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const translations = {
    ENG: {
      title: "Complaint Submitted",
      refLabel: "Your Reference Number:",
      copy: "Copy",
      copied: "Copied!",
      mainMessage: "Your complaint has been successfully submitted. We’ll notify you about updates by SMS. You can track the status of your complaint anytime using your reference number.",
      howToTrack: "How to Track Your Complaint:",
      step1: "Go to the Track Complaint page.",
      step2: "Enter your Reference Number:",
      step3: "View the current status of your complaint.",
      smsNote: "An SMS has been sent to your phone with your reference number. Please keep it safe for your records.",
      trackBtn: "Track Your Complaint"
    },
    AMH: {
      title: "አቤቱታዎ በተሳካ ሁኔታ ተልኳል",
      refLabel: "የመለያ ቁጥርዎ፦",
      copy: "ቅዳ",
      copied: "ተቀድቷል!",
      mainMessage: "አቤቱታዎ በትክክል ደርሶናል። ስለ ቅሬታው ሂደት በኤስኤምኤስ (SMS) የምናሳውቅዎ ይሆናል። የመለያ ቁጥርዎን በመጠቀም በማንኛውም ጊዜ ሁኔታውን መከታተል ይችላሉ።",
      howToTrack: "ቅሬታዎን እንዴት መከታተል ይችላሉ?",
      step1: "ወደ 'ቅሬታ መከታተያ' ገጽ ይሂዱ።",
      step2: "የመለያ ቁጥርዎን ያስገቡ፦",
      step3: "የአቤቱታዎን ወቅታዊ ሁኔታ ይመልከቱ።",
      smsNote: "የመለያ ቁጥርዎን የያዘ አጭር የጽሁፍ መልዕክት (SMS) ወደ ስልክዎ ተልኳል። እባክዎ ለምዝገባዎ ደህንነቱን ይጠብቁ።",
      trackBtn: "ቅሬታዎን ይከታተሉ"
    },
    ORM: {
      title: "Koomiin Keessan Ergameera",
      refLabel: "Lakk. Eenyummaa Keessan:",
      copy: "Waraabi",
      copied: "Waraabameera!",
      mainMessage: "Koomiin keessan milkaa'inaan nu gaheera. Odeeffannoo dabalataa SMS'n isiniif ergina. Lakk. eenyummaa keessan fayyadamuun yeroo hunda hordofuu dandeessu.",
      howToTrack: "Koomii Keessan Akkamitti Hordofutu Danda'ama?",
      step1: "Fuula 'Koomii Hordofuu' jedhu deemaa.",
      step2: "Lakk. Eenyummaa keessan galchaa:",
      step3: "Haala koomii keessanii yeroo ammaa ilaalaa.",
      smsNote: "Lakk. eenyummaa keessan of keessaa kan qabu ergaan gabaabaan (SMS) isiniif ergameera. Nageummaa isaaf of-eeggannoon qabadhaa.",
      trackBtn: "Koomii Keessan Hordofaa"
    },
    TIG: {
      title: "ጥርዓንኩም ብትኽክል ተላኢኹ",
      refLabel: "መለለዪ ቁፅሪኹም፦",
      copy: "ቅዳሕ",
      copied: "ተቀዲሑ!",
      mainMessage: "ጥርዓንኩም ብትኽክል በፂሑና ኣሎ። ብዛዕባ ከይዲ ጥርዓንኩም ብኤስኤምኤስ (SMS) ከነፍልጠኩም ኢና። መለለዪ ቁፅሪኹም ብምጥቃም ኩነታት ጥርዓንኩም ምክትታል ትኽእሉ ኢኹም።",
      howToTrack: "ጥርዓንኩም ከመይ ክትከታተሉ ትኽእሉ?",
      step1: "ናብ ገፅ 'ምክትታል ጥርዓን' ኪዱ።",
      step2: "መለለዪ ቁፅሪኹም የእትዉ፦",
      step3: "እዋናዊ ኩነታት ጥርዓንኩም ርኣዩ።",
      smsNote: "መለለዪ ቁፅሪኹም ዝሓዘ ሓጺር ፅሑፍ መልእኽቲ (SMS) ናብ ስልኩም ተላኢኹ ኣሎ። በጃኹም ንደሕንነትኩም ይሓዝዎ።",
      trackBtn: "ጥርዓንኩም ተኸታተሉ"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in duration-500 border border-slate-50">
      {/* Icon Section */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-emerald-50 text-emerald-500 shadow-inner">
          <FaCheckCircle className="text-6xl animate-bounce" />
        </div>
      </div>

      <h1 className="text-3xl font-black text-center mb-4 text-slate-800 tracking-tight">{t.title}</h1>
      
      {/* Reference Section */}
      <div className="flex justify-center my-10">
        <div className="relative flex items-center gap-6 border-4 border-emerald-50 rounded-[2rem] px-8 py-6 bg-slate-50/50 group transition-all hover:bg-white hover:border-emerald-100">
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                {Language === "AMH" ? "የመለያ ቁጥር" : "Reference ID"}
             </span>
             <span className="font-mono font-black text-3xl text-slate-900 tracking-tighter">{referenceNumber}</span>
          </div>
          
          <button 
            onClick={handleCopy}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              isCopied ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white"
            }`}
          >
            {isCopied ? t.copied : t.copy}
          </button>
        </div>
      </div>

      <p className="text-center text-slate-500 mb-10 leading-relaxed text-lg font-medium max-w-2xl mx-auto italic">
        "{t.mainMessage}"
      </p>

      {/* Guide Section */}
      <div className="mb-10 bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <FontAwesomeIcon icon={faLocationDot} size="5x" />
        </div>
        <h2 className="font-black text-slate-800 mb-6 flex items-center gap-3 uppercase text-xs tracking-widest">
            <FontAwesomeIcon icon={faLocationDot} className="text-rose-500" /> {t.howToTrack}
        </h2>
        <ul className="space-y-5 text-slate-600 font-bold text-sm">
          <li className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-emerald-200">1</div> 
            {t.step1}
          </li>
          <li className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-emerald-200">2</div> 
            <span>{t.step2} <code className="bg-white px-3 py-1 rounded-xl border-2 border-emerald-50 font-mono text-emerald-600 ml-2">{referenceNumber}</code></span>
          </li>
          <li className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-emerald-200">3</div> 
            {t.step3}
          </li>
        </ul>
      </div>

      {/* SMS Note */}
      <div className="bg-amber-50 rounded-2xl p-6 flex items-start gap-5 mb-10 border-2 border-amber-100/50">
        <div className="bg-amber-100 p-3 rounded-xl">
            <FontAwesomeIcon icon={faBullhorn} className="text-amber-600" />
        </div>
        <p className="text-xs text-amber-900 leading-relaxed font-bold uppercase tracking-wide">
          {t.smsNote}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Link to="/TrackComplaintPage" className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-100 transition-all hover:-translate-y-1 active:scale-95">
          {t.trackBtn}
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;