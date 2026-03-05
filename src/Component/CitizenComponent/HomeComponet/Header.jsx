import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
// Ensure this path matches your file structure
import { ChangeLanguage } from "../../../Redux/WebState"; 

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
    langLabel: "Language" 
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
    langLabel: "ቋንቋ" 
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
    langLabel: "Afaan" 
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
    langLabel: "ቋንቋ" 
  }
};

const Header = ({ page }) => {
  const [open, setOpen] = useState(false);
  const [windowOffset, setWindowOffset] = useState(0);
  const dispatch = useDispatch();

  // Get Language from Redux state
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const content = translations[Language] || translations.ENG;

  useEffect(() => {
    const handleScroll = () => setWindowOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(ChangeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-100 transition-all duration-500 ease-in-out ${
        windowOffset > 500 ? "bg-black shadow-lg" : "bg-transparent"
      } ${
        page ? "bg-[url('/heroJpg.jpg')] bg-cover bg-center bg-no-repeat" : ""
      }`}
    >
       <div className={`${page && ("absolute inset-0 bg-black/60")}`}/>
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-10 py-5 text-white">
        
        {/* LOGO */}
        <div className="flex items-center gap-2 text-xl font-bold">
         <img
  src="/logo3.png"
  className="absolute h-20 w-40 top-0  left-10 object-contain" 
  alt="Logo"
/>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm tracking-wide font-medium">
          <li><a href="/#hero" className="hover:text-blue-400">{content.home}</a></li>
          <li><a href="/#about" className="hover:text-blue-400">{content.about}</a></li>
          <li><a href="/#service" className="hover:text-blue-400">{content.services}</a></li>
          <li><a href="/#new" className="hover:text-blue-400">{content.news}</a></li>
        </ul>

        {/* DESKTOP BUTTONS & SELECTOR */}
        <div className="hidden md:flex items-center gap-4">
          <select 
            onChange={handleLanguageChange} 
            value={Language} 
            className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white outline-none cursor-pointer"
          >
            <option className="text-black" value="ENG">English</option>
            <option className="text-black" value="AMH">አማርኛ</option>

          </select>

          <Link to="/submit-complaint" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold transition">
            {content.submit}
          </Link>
          
          <Link to="/TrackComplaintPage" className="border border-white hover:bg-white hover:text-black px-4 py-2 rounded text-sm font-semibold transition">
            {content.track}
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white relative z-100 text-gray-800 shadow-2xl p-6 flex flex-col mt-3 gap-4 animate-in slide-in-from-top duration-300">
          <a  href="/#hero" onClick={() => setOpen(false)} to="/">{content.home}</a>
          <a href="/#about" onClick={() => setOpen(false)} to="/about">{content.about}</a>
          <a  href="/#service" onClick={() => setOpen(false)} to="/services">{content.services}</a>
           <a  href="/#new" onClick={() => setOpen(false)} to="/services">{content.news}</a>
          
          <div className="flex items-center justify-between border-y py-4">
            <span className="font-semibold text-slate-700">{content.langLabel}</span>
            <select
              onChange={(e) => { handleLanguageChange(e); setOpen(false); }}
              value={Language}
              className="text-slate-700 border rounded-lg p-2 bg-slate-50 outline-none"
            >
              <option value="ENG">English</option>
              <option value="AMH">አማርኛ</option>
    
            </select>
          </div>

          <Link onClick={() => setOpen(false)} to="/submit-complaint" className="bg-blue-600 text-white text-center py-3 rounded-lg font-bold">
            {content.submit}
          </Link>
          
          <Link onClick={() => setOpen(false)} to="/TrackComplaintPage" className="border border-blue-600 text-blue-600 text-center py-3 rounded-lg font-bold">
            {content.track}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;