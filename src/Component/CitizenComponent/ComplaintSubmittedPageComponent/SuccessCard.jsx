import { useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { QRCodeSVG } from 'qrcode.react';

const SuccessCard = () => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const location = useLocation();
  const [isCopied, setIsCopied] = useState(false);

  const {referenceNumber,meetingToken} = location.state 
// const referenceNumber="dfjekjfkerjfkrjfgkrjgk"
// const meetingToken="ndkdjefjeeeeeeeeeeeeeeeeeeeeeeee"

  const handleCopy = async() => {
    await navigator.clipboard.writeText(referenceNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

const downloadQR = () => {
    const svg = document.getElementById("meeting-qr");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Meeting-${referenceNumber}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
    <div className="max-w-3xl  max-md:w-full mx-auto bg-white rounded-[2.5rem] shadow-2xl max-md:py-10 md:p-10 animate-in zoom-in duration-500 border border-slate-50">
      {/* Icon Section */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 flex items-center justify-center rounded-3xl text-green-500  shadow-inner">
          <FaCheckCircle className="text-6xl animate-bounce" />
        </div>
      </div>

      <h1 className="text-3xl font-black text-center mb-4 text-slate-800 tracking-tight">{t.title}</h1>
      
      {/* Reference Section */}
      <div className="flex  gap-3 flex-col items-center justify-center my-10">
        <div className="relative flex wrap items-center gap-6 border-4 border-textColor rounded-[2rem] max-md:p-2 px-8 py-6 bg-slate-50/50 group transition-all hover:bg-white hover:border-textColor ">
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-textColor  uppercase tracking-widest mb-1">
                {Language === "AMH" ? "የመለያ ቁጥር" : "Reference ID"}
             </span>
             <span className="font-mono font-black max-md:text-lg text-3xl text-slate-900 break-all tracking-tighter">{referenceNumber}</span>
          </div>
          
          <button 
            onClick={handleCopy}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              isCopied ? "bg-primBtn text-white shadow-textColor " : "bg-white text-textColor  border border-textColor  hover:bg-primBtn hover:text-white"
            }`}
          >
            {isCopied ? t.copied : t.copy}
          </button>
        </div>
   {meetingToken ? (
        <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-widest">Meeting Entry Pass</p>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm inline-block">
            <QRCodeSVG 
              id="meeting-qr"
              value={meetingToken} // The token from your API
              size={180}
              level={"H"} // High error correction
              includeMargin={true}
            />
          </div>
          
          <p className="mt-4 text-[10px] text-gray-400 max-w-[200px]">
            Please save this QR code. You will need to present it during your meeting.
          </p>
          
          <button 
            onClick={downloadQR}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-primBtn text-white cursor-pointer rounded-xl text-sm font-bold  transition-all"
          >
            <FaDownload size={12} /> Save QR Code
          </button>
        </div>
      ) : (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl text-sm">
          Your complaint has been logged. We will contact you via phone or email.
        </div>
      )}


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
            <div className="w-6 h-6 rounded-lg bg-primBtn text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-textColor ">1</div> 
            {t.step1}
          </li>
          <li className="flex  gap-4 items-center">
            <div className="w-6 h-6 rounded-lg bg-primBtn text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-textColor ">2</div> 
            <span className="flex items-center max-md:gap-3 max-md:flex-col">{t.step2} <code className="bg-white px-3 py-1 rounded-xl border-2 border-textColor font-mono text-textColor  break-all ml-2">{referenceNumber}</code></span>
          </li>
          <li className="flex gap-4 items-center">
            <div className="w-6 h-6 rounded-lg bg-primBtn text-white flex items-center justify-center text-[10px] flex-shrink-0 shadow-lg shadow-textColor ">3</div> 
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
        <Link to="/TrackComplaintPage" className="bg-primBtn hover:bg-primBtn text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-textColor  transition-all hover:-translate-y-1 active:scale-95">
          {t.trackBtn}
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;