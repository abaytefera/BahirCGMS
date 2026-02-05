import React from 'react';
import { useSelector } from 'react-redux';
import { Mail, Phone, Facebook, Twitter, Instagram, PinIcon as Pinterest } from 'lucide-react';

const Footer = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      official: "This is an official government service platform.",
      quick: "Quick Links",
      useful: "Useful Links",
      follow: "Follow Us",
      followDesc: "This is an official government service platform designed to enhance transparency, accountability, and public participation.",
      home: "Home",
      about: "About Us",
      service: "Our Service",
      pricing: "Our Pricing",
      privacy: "Privacy Policy",
      disclaimer: "Disclaimer",
      terms: "Terms & Condition",
      gdpr: "GDPR",
      authority: "Powered by Pixel Addis Solutions"
    },
    AMH: {
      official: "ይህ ይፋዊ የመንግስት የአገልግሎት መስጫ ፕላትፎርም ነው።",
      quick: "ፈጣን ሊንኮች",
      useful: "ጠቃሚ ሊንኮች",
      follow: "ይከተሉን",
      followDesc: "ይህ ግልፅነትን፣ ተጠያቂነትን እና የህዝብ ተሳትፎን ለማጎልበት የተነደፈ ይፋዊ የመንግስት አገልግሎት መስጫ ፕላትፎርም ነው።",
      home: "መነሻ",
      about: "ስለ እኛ",
      service: "የእኛ አገልግሎት",
      pricing: "ዋጋዎች",
      privacy: "የግላዊነት ፖሊሲ",
      disclaimer: "ማስተባበያ",
      terms: "ውሎች እና ሁኔታዎች",
      gdpr: "GDPR",
      authority: "በፒክሰል አዲስ ሶሉሽንስ የበለፀገ"
    },
    ORM: {
      official: "Kun waltajjii tajaajila mootummaa seera qabeessa dha.",
      quick: "Liinkiiwwan Ariifachiisoo",
      useful: "Liinkiiwwan Fayyadoo",
      follow: "Nu Hordofaa",
      followDesc: "Kun waltajjii tajaajila mootummaa iftoomina, itti gaafatamummaa fi hirmaannaa uummataa guddisuuf qophaa'e dha.",
      home: "Mana",
      about: "Waa'ee Keenya",
      service: "Tajaajila Keenya",
      pricing: "Gatiilee",
      privacy: "Imaammata Iccitii",
      disclaimer: "Haala ragaa",
      terms: "Waliigaltee fi Haalawwan",
      gdpr: "GDPR",
      authority: "ABBOOMMII EEGUMSA NAANNOO"
    },
    TIG: {
      official: "እዚ ወግዓዊ ናይ መንግስቲ ኣገልግሎት መድረኽ እዩ።",
      quick: "ቅልጡፍ ሊንክታት",
      useful: "ጠቐምቲ ሊንክታት",
      follow: "ይከተሉና",
      followDesc: "እዚ ግልፅነት፣ ተሓታቲነትን ህዝባዊ ተሳትፎን ንምዕባይ ዝተዳለወ ወግዓዊ ናይ መንግስቲ ኣገልግሎት መድረኽ እዩ።",
      home: "መበገሲ",
      about: "ብዛዕባና",
      service: "ኣገልግሎትና",
      pricing: "ዋጋታት",
      privacy: "ፖሊሲ ውሕስነት ምስጢር",
      disclaimer: "መተሓሳሰቢ",
      terms: "ውዕላትን ኩነታትን",
      gdpr: "GDPR",
      authority: "በዓል መዚ ዕቀባ ከባቢ"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <footer className="bg-[#0E4C98] text-white pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand & Contact */}
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter">CGMS</h2>
          <p className="text-sm opacity-90 leading-relaxed max-w-xs">
            {t.official}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span className="text-sm opacity-90"> info@bahirdar.gov.et</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span className="text-sm opacity-90">+251 (0)11-170-4038/4150 </span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">{t.quick}</h3>
          <ul className="space-y-4 text-sm opacity-90">
            {[
              {link: t.home, url:"/#hero"}, 
              {link: t.about, url:"/#about"}, 
              {link: t.service, url:"/#service"}, 
              {link: t.pricing, url:"/#price"}
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 cursor-pointer hover:underline">
                <a href={item.url} className="text-[10px]">▶ {item.link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">{t.useful}</h3>
          <ul className="space-y-4 text-sm opacity-90">
            {[
              {link: t.privacy, url:"/#hero"}, 
              {link: t.disclaimer, url:"/#about"}, 
              {link: t.terms, url:"/#service"}, 
              {link: t.gdpr, url:"/#price"}
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 cursor-pointer hover:underline">
                <a href={item.url} className="text-[10px]">▶ {item.link}</a> 
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">{t.follow}</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {t.followDesc}
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/epaethio/"><Facebook size={20} className="cursor-pointer hover:opacity-70" /></a>
            <a href="https://twitter.com/epaethiopia"><Twitter size={20} className="cursor-pointer hover:opacity-70" /></a>
            <a href="#"><Instagram size={20} className="cursor-pointer hover:opacity-70" /></a>
            <a href="#"> <Pinterest size={20} className="cursor-pointer hover:opacity-70" /> </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-white/20 pt-8 text-center">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-90">
          © {t.authority}
        </p>
      </div>
    </footer>
  );
};

export default Footer;