import React from 'react';
import { useSelector } from 'react-redux';

const ImpactSection = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "Our Impact",
      mainTitle: "CGMS Transforms Citizen Concerns Into Actionable Outcomes Through Data-Driven Monitoring And Timely Response.",
      sideDesc: "CGMS transforms citizen concerns into actionable outcomes by enabling timely responses, structured workflows, and data-driven monitoring that ensures complaints are addressed transparently, efficiently, and in line with established service standards.",
      impact1: "Complaints received and processed digitally",
      impact1Desc: "Full automation of grievance workflows.",
      impact2: "Faster response and resolution timelines",
      impact2Desc: "Significant reduction in case turnaround time.",
      impact3: "Increased citizen participation and trust",
      impact3Desc: "Strengthening the bond between EPA and the public.",
    },
    AMH: {
      tag: "የእኛ ተፅእኖ",
      mainTitle: "CGMS በዳታ ላይ የተመሰረተ ክትትል እና ወቅታዊ ምላሽ በመስጠት የዜጎችን ስጋቶች ወደ ተግባራዊ ውጤቶች ይለውጣል።",
      sideDesc: "CGMS ወቅታዊ ምላሾችን፣ የተቀናጁ የስራ ሂደቶችን እና መረጃን መሰረት ያደረገ ክትትልን በማንቃት አቤቱታዎች ግልፅ በሆነ፣ ቀልጣፋ እና በተቀመጠው የአገልግሎት ደረጃ መሰረት መፈታታቸውን በማረጋገጥ የዜጎችን ስጋቶች ወደ ተግባራዊ ውጤት ይለውጣል።",
      impact1: "በዲጂታል መንገድ የተቀበሉ እና የተሰሩ አቤቱታዎች",
      impact1Desc: "ሙሉ በሙሉ በቴክኖሎጂ የተደገፈ ቅሬታ አያያዝ።",
      impact2: "ፈጣን ምላሽ እና የመፍትሄ ጊዜያት",
      impact2Desc: "በጉዳዮች አፈፃፀም ጊዜ ላይ የታየ ከፍተኛ ቅናሽ።",
      impact3: "የዜጎች ተሳትፎ እና እምነት መጨመር",
      impact3Desc: "በአካባቢ ጥበቃ ባለስልጣን እና በህዝብ መካከል ያለውን ግንኙነት ማጠናከር።",
    },
    ORM: {
      tag: "Dhiibbaa Keenya",
      mainTitle: "CGMS hordoffii ragaa irratti hundaa'e fi deebii yeroo dhaan kennuun yaaddoo lammiilee gara bu'aa qabatamaatti jijjiira.",
      sideDesc: "CGMS deebii saffisaa, hojii qindaa'aa fi hordoffii ragaa irratti hundaa'e dandeessisuun, koomiiwwan iftoominaa fi hirmaannaa uummataatiin akka hiikaman gochuun yaaddoo lammiilee gara hojiitti jijjiira.",
      impact1: "Koomiiwwan karaa dijiitaalaa fudhatamanii fi hojjetaman",
      impact1Desc: "Hojii koomii guutummaatti ammayyeessuu.",
      impact2: "Deebii fi furmaata saffisaa",
      impact2Desc: "Yeroo dhimmi tokko itti xumuramu baay'ee hir'isuu.",
      impact3: "Hirmaannaa fi amantaa lammiilee dabaluu",
      impact3Desc: "Hariiroo EPA fi uummata gidduu jiru jabeessuu.",
    },
    TIG: {
      tag: "ፅልዋና",
      mainTitle: "CGMS ብዳታ ዝተደገፈ ክትትልን እዋናዊ ምላሽን ብምሃብ ስግኣታት ዜጋታት ናብ ተግባራዊ ውፅኢት ይቕይር።",
      sideDesc: "CGMS እዋናዊ ምላሽ፣ ዝተወደበ ስራሕን ዳታ ዝሰረት ገበረ ክትትልን ብምጥቃም ጥርዓናት ብግልፂ፣ ብቕልጡፍን ብመሰረት ዝተቐመጠ ደረጃ ኣገልግሎትን ንክፍታሕ ብምግባር ስግኣታት ዜጋታት ናብ ውፅኢት ይቕይር።",
      impact1: "ብዲጂታል መገዲ ዝተቐበሉን ዝተሰርሑን ጥርዓናት",
      impact1Desc: "ምሉእ ብምሉእ ብቴክኖሎጂ ዝተደገፈ ኣተሓሕዛ ቅሬታ።",
      impact2: "ቅልጡፍ ምላሽን ግዘ ፍታሕን",
      impact2Desc: "ጉዳያት ንምፍታሕ ዝውሰድ ግዘ ብዓቢኡ ምንካይ።",
      impact3: "ዝተመሓየሸ ህዝባዊ ተሳትፎን እምነትን",
      impact3Desc: "ኣብ መንጎ በዓል መዚ ዕቀባ ከባቢን ህዝብን ዘሎ ርክብ ምርጋፅ።",
    }
  };

  const t = translations[Language] || translations.ENG;

  const impacts = [
    {
      title: t.impact1,
      description: t.impact1Desc,
      active: false
    },
    {
      title: t.impact2,
      description: t.impact2Desc,
      active: true
    },
    {
      title: t.impact3,
      description: t.impact3Desc,
      active: false
    }
  ];

  return (
    <section id="new" className="relative min-h-screen bg-slate-900 flex items-center justify-center p-8 md:p-20 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-[url(/2a7bc81b7764aee587c4a37803d59c02568946da.jpg)] bg-no-repeat bg-center bg-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="relative z-10 max-w-7xl w-full">
        {/* Header Section */}
        <div className="mb-12 rounded-md">
          <p className="text-gray-300 uppercase tracking-widest text-sm font-semibold mb-4">{t.tag}</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
            {t.mainTitle}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column: Green Content Box */}
          <div className="lg:w-1/3 bg-[#3DAE71] p-10 mt-10">
             <div className="w-16 h-1 bg-[#1E3A8A] mb-8"></div>
             <p className="text-white leading-relaxed text-lg font-light">
               {t.sideDesc}
             </p>
          </div>

          {/* Middle Column: Impact List */}
          <div className="lg:w-1/3 flex px-10 flex-col justify-center space-y-10 py-10">
            {impacts.map((item, index) => (
              <div key={index} className={`pl-6 ${item.active ? 'border-l-4 border-[#1E3A8A]' : ''}`}>
                <h4 className="text-white text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm italic">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Floating Image */}
          <div className="lg:w-1/3 relative group">
            <div className="absolute -inset-2 bg-white/10 blur-xl group-hover:bg-white/20 transition duration-500"></div>
            <img 
              src="/e1f76a060d4463ad6083ab102b3e27e6117263d9.jpg" 
              alt="Community impact" 
              className="relative shadow-2xl border-white border-[12px] object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;