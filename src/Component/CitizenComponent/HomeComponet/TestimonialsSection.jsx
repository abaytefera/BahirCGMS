import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react'; 

const TestimonialsSection = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "Our Testimonials",
      title: "Our Users Reviews",
      btn: "See More",
      role: "CLIENTS",
      text: "This system has made it incredibly easy to report environmental issues and track the progress of my complaints in real-time."
    },
    AMH: {
      tag: "ምስክርነቶች",
      title: "የተጠቃሚዎቻችን አስተያየት",
      btn: "ተጨማሪ ይመልከቱ",
      role: "ደንበኞች",
      text: "ይህ ሲስተም የአካባቢ ጥበቃ ጉዳዮችን ሪፖርት ለማድረግ እና የቅሬታዬን ሂደት በቅጽበት ለመከታተል በጣም ቀላል አድርጎልኛል።"
    },
    ORM: {
      tag: "Dhugaa Ba'umsa Keenya",
      title: "Yaada Fayyadamtoota Keenyaa",
      btn: "Dabalata Argadhu",
      role: "MAAMMILTOOTA",
      text: "Sirni kun dhimmoota naannoo gabaasuufi adeemsa koomii koo yeroodhaan hordofuuf baay'ee salphaa naaf taasiseera."
    },
    TIG: {
      tag: "ምስክርነትና",
      title: "ርእይቶ ተጠቀምትና",
      btn: "ተወሳኺ ይርኣዩ",
      role: "ዓማዊል",
      text: "እዚ ስርዓት እዚ ጉዳያት ከባቢ ሪፖርት ንምግባርን ከይዲ ጥርዓነይ ብቐሊሉ ንምክትታልን ኣዝዩ ሓጊዙኒ እዩ።"
    }
  };

  const t = translations[Language] || translations.ENG;

  const testimonials = [
    {
      id: 1,
      name: "Abebe Kebede",
      role: t.role,
      image: "/92b888c99066ed9b3b89a0e59a014dcd8ec8e9ac.jpg",
      text: t.text,
    },
    {
      id: 2,
      name: "Fatuma Ahmed",
      role: t.role,
      image: "/fb22525c65e639184f88417bdd86d83e1b3a40b4.jpg",
      text: t.text,
    }
  ];

  return (
    <section id="Testimonials" className="bg-slate-50 py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Side */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-gray-400 uppercase tracking-widest text-sm font-bold">
            {t.tag}
          </h2>
          <h1 className="text-5xl font-bold text-gray-600 leading-tight">
            {t.title}
          </h1>
          <button className="flex items-center gap-3 bg-[#13519c] text-white px-8 py-4 font-bold uppercase text-sm hover:bg-blue-800 transition-colors">
            {t.btn} <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Testimonials Slider Side */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white p-10 shadow-sm border border-gray-100 flex flex-col justify-between">
                <p className="italic text-gray-500 text-lg leading-relaxed mb-8">
                  “ {item.text} “
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover grayscale" 
                  />
                  <div>
                    <h4 className="font-bold text-gray-700">{item.name}</h4>
                    <p className="text-xs text-gray-400 tracking-widest font-bold">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-start md:justify-end md:mr-20 gap-2 pr-4">
            <span className="h-2 w-8 bg-[#2d9a63]"></span>
            <span className="h-2 w-3 bg-[#82cfac]"></span>
            <span className="h-2 w-3 bg-[#82cfac]"></span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;