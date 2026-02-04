import React from 'react';
import { useSelector } from 'react-redux';

const ApproachSection = () => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "Our Approach & Strategies",
      title: "How We Deliver Effective Results",
      desc: "We deliver effective results through structured workflows, clear accountability, and timely action. Each complaint is carefully reviewed, prioritized, assigned, and monitored to ensure fair handling, compliance with service standards, and meaningful resolution.",
      card1Title: "Priority-based complaint handling",
      card1Desc: "Systematically identifying and addressing urgent issues to minimize impact and ensure safety.",
      card2Title: "SLA-driven response and resolution timelines",
      card2Desc: "Adhering to strict Service Level Agreements to ensure every citizen receives a timely and professional response.",
      card3Title: "Continuous service improvement using feedback",
      card3Desc: "Using citizen feedback and data analytics to refine our processes and enhance governance.",
    },
    AMH: {
      tag: "የእኛ አቀራረብ እና ስልቶች",
      title: "እንዴት ውጤታማ ውጤቶችን እናስመዘግባለን",
      desc: "በተቀናጀ የሥራ ፍሰት፣ ግልጽ ተጠያቂነት እና ወቅታዊ እርምጃ ውጤታማ ውጤቶችን እናስመዘግባለን። እያንዳንዱ አቤቱታ ፍትሃዊ አያያዝን፣ ከአገልግሎት ደረጃዎች ጋር መጣጣምን እና ትርጉም ያለው መፍትሄን ለማረጋገጥ በጥንቃቄ ይታያል፣ ቅድሚያ ይሰጣል እንዲሁም ክትትል ይደረግበታል።",
      card1Title: "በቅድሚያ ቅደም ተከተል ላይ የተመሰረተ አቤቱታ አያያዝ",
      card1Desc: "ተፅዕኖን ለመቀነስ እና ደህንነትን ለማረጋገጥ አስቸኳይ ጥበቃ ጉዳዮችን በስርዓት መለየት እና ምላሽ መስጠት።",
      card2Title: "በSLA የሚመራ የምላሽ እና የመፍትሄ ጊዜያት",
      card2Desc: "እያንዳንዱ ዜጋ ወቅታዊ እና ሙያዊ ምላሽ ማግኘቱን ለማረጋገጥ ጥብቅ የአገልግሎት ደረጃ ስምምነቶችን (SLA) ማክበር።",
      card3Title: "በግብረመልስ በመታገዝ ቀጣይነት ያለው የአገልግሎት ማሻሻያ",
      card3Desc: "ሂደቶቻችንን ለማሻሻል እና ጥበቃ አስተዳደርን ለማጎልበት የዜጎችን ግብረመልስ እና የዳታ ትንታኔን መጠቀም።",
    },
    ORM: {
      tag: "Akkaataa fi Tooftaalee Keenya",
      title: "Akkaataa Nutti Bu'aa Gaarii Galmeessisnu",
      desc: "Hojii qindaa'aa, itti gaafatamummaa ifa ta'ee fi tarkaanfii yeroo dhaan fudhatamuun bu'aa qabatamaa fidina. Koomiin hundi loogii tokko malee, sadarkaa tajaajilaa eeggatee furmaata akka argatuuf xiyyeeffannoon ilaalama.",
      card1Title: "Koomii dursa kennuu irratti hundaa'e",
      card1Desc: "Dhiibbaa hir'isuu fi nageenya mirkaneessuuf dhimmoota naannoo ariifachiisoo ta'an sirnaan adda baasuu fi furmaata kennuu.",
      card2Title: "Yeroo deebii fi furmaataa SLA irratti hundaa'e",
      card2Desc: "Lammiin hundi deebii yeroo isaa eeggate fi ogummaa irratti hundaa'e akka argatuuf waadaa sadarkaa tajaajilaa (SLA) kabajuu.",
      card3Title: "Yaada namootaa fayyadamuun tajaajila fooyyessuu",
      card3Desc: "Adeemsa hojii keenya fooyyessuuf yaada lammiilee fi xiinxala ragaalee fayyadamuu.",
    },
    TIG: {
      tag: "ኣገባብን ስትራቴጂንና",
      title: "ከመይ ጌርና ውፅኢታዊ ስራሕ ንሰርሕ",
      desc: "ብተወደበ ኣሰራርሓ፣ ግልፂ ተሓታቲነትን እዋናዊ ስጉምትን ውፅኢታዊ ስራሕ ንሰርሕ። ነፍሲ ወከፍ ጥርዓን ፍትሓዊ ኣተሓሕዛ፣ ምስ ደረጃ ኣገልግሎት ዝተዛመደን ትርጉም ዘለዎ ፍታሕ ንክረክብን ብጥንቃቐ ይርአን ይከታተልን።",
      card1Title: "ኣብ ቀዳምነት ዝተመርኮሰ ኣተሓሕዛ ጥርዓን",
      card1Desc: "ፅልዋ ንምንካይን ደሕንነት ንምርግጋፅን ህፁፅ ጉዳያት ከባቢ ብዝተወደበ መገዲ ምልላይን ምላሽ ምሃብን።",
      card2Title: "ብSLA ዝምራሕ ናይ ምላሽ ሰዓት",
      card2Desc: "ነፍሲ ወከፍ ዜጋ እዋናዊን ሞያዊን ምላሽ ንክረክብ ውዕላት ደረጃ ኣገልግሎት (SLA) ብጥንቃቐ ምክባር።",
      card3Title: "ብግብረ-መልሲ ዝተሓገዘ ቀፃሊ ምምሕያሽ ኣገልግሎት",
      card3Desc: "ኣሰራርሓና ንምምሕያሽን ምሕደራ ከባቢ ንምጥንኻርን ግብረ-መልሲ ዜጋታትን ትንተና ዳታን ምጥቃም።",
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <div className="lg:w-1/2">
          <h2 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-4">
            {t.tag}
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#828282] leading-tight">
            {t.title}
          </h1>
        </div>
        <div className="lg:w-1/2">
          <p className="text-gray-500 text-lg leading-relaxed">
            {t.desc}
          </p>
        </div>
      </div>

      {/* Cards Section with Background Image */}
      <div className="max-w-7xl mx-auto relative rounded-sm overflow-hidden min-h-[257px]">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 bg-[url(/2a7bc81b7764aee587c4a37803d59c02568946da.jpg)] bg-no-repeat bg-center bg-cover opacity-40"
        />

        {/* Cards Overlay */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 h-full items-end md:pl-30 md:py-12 gap-0 md:gap-4">
          
          {/* Card 1 */}
          <div className="bg-green-600/60 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start border-b md:border-b-0 md:border-r border-emerald-500/30">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              {t.card1Title}
            </h3>
            <p className="text-sm opacity-90">
              {t.card1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-600/60 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start border-b md:border-b-0 md:border-r border-emerald-500/30">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              {t.card2Title}
            </h3>
            <p className="text-sm opacity-90">
              {t.card2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-green-600/60 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              {t.card3Title}
            </h3>
            <p className="text-sm opacity-90">
              {t.card3Desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ApproachSection;