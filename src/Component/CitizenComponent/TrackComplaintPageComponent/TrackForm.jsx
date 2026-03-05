import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const TrackForm = ({ onTrack }) => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const [ref, setRef] = useState("");

  const translations = {
    ENG: {
      title: "Track Your Complaint",
      subtitle: "Enter your reference number or phone number to view complaint details.",
      label: "Reference Number or Phone Number",
      placeholder: "e.g. CGMS-00125",
      button: "Track Complaint"
    },
    AMH: {
      title: "አቤቱታዎን ይከታተሉ",
      subtitle: "የአቤቱታዎን ዝርዝር ለማየት የመለያ ቁጥርዎን ያስገቡ።",
      label: "የመለያ ቁጥር",
      placeholder: "ምሳሌ፦ CGMS-00125 or 091234558",
      button: "አቤቱታውን ፈልግ"
    },
    ORM: {
      title: "Koomii Keessan Hordofaa",
      subtitle: "Bal'ina koomii keessanii arguuf lakk. eenyummaa galchaa.",
      label: "Lakk. Eenyummaa",
      placeholder: "fkn. CGMS-00125",
      button: "Koomii Barbaadi"
    },
    TIG: {
      title: "ጥርዓንኩም ይከታተሉ",
      subtitle: "ዝርዝር ጥርዓንኩም ን ምርኣይ መለለዪ ቁፅሪ የእትዉ።",
      label: "መለለዪ ቁፅሪ",
      placeholder: "ምሳሌ፦ CGMS-00125",
      button: "ጥርዓን ድለ"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <div className="rounded-[2.5rem] shadow-2xl p-10 border border-gray-50 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto rounded-[2rem] bg-primBtn flex items-center justify-center mb-6 shadow-inner group transition-all duration-500 hover:bg-primBtn ">
          <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            className="text-white text-4xl group-hover:text-white transition-colors duration-500" 
          />
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">{t.title}</h1>
        <p className="text-slate-500 mt-3 font-medium text-lg italic">"{t.subtitle}"</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[11px] font-black text-slate-400 capitalize  tracking-widest mb-3 ml-1">
            {t.label}
          </label>
          <input
            type="text"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 focus:border-primBtn  focus:ring-1 focus:ring-primBtn /5 focus:bg-white focus:outline-none transition-all font-mono text-xl text-slate-800 placeholder:text-slate-300"
          />
        </div>

        <button
          onClick={() => onTrack(ref)}
          className="w-full bg-primBtn  hover:bg-primBtn  text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primBtn  transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
          {t.button}
        </button>
      </div>
    </div>
  );
};

export default TrackForm;