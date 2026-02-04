import React from 'react';
import { useSelector } from 'react-redux';

const WhyChooseSection = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "Why Choose CGMS",
      title: "CGMS Is Designed To Make Reporting Simple For Citizens And Effective For Institutions.",
      desc: "Our platform bridges the gap between public concern and institutional action, ensuring every voice is heard and every issue is tracked to resolution.",
      features: [
        "Easy-to-use web and mobile access",
        "Transparent complaint tracking",
        "Automated SMS and email updates",
        "Secure and confidential data handling",
        "Supports anonymous reporting",
        "Multilingual access (Amharic & English)"
      ]
    },
    AMH: {
      tag: "ለምን CGMSን ይመርጣሉ",
      title: "CGMS የአካባቢ ጥበቃ ሪፖርቶችን ለዜጎች ቀላል እና ለተቋማት ውጤታማ ለማድረግ ታስቦ የተዘጋጀ ነው።",
      desc: "የእኛ ፕላትፎርም በህዝብ ስጋት እና በተቋማት እርምጃ መካከል ያለውን ልዩነት በማጥበብ፣ እያንዳንዱ ድምጽ እንዲሰማ እና እያንዳንዱ ጉዳይ መፍትሄ እስኪያገኝ ድረስ ክትትል እንዲደረግበት ያረጋግጣል።",
      features: [
        "ለመጠቀም ቀላል የሆነ የድረ-ገጽ እና የሞባይል ተደራሽነት",
        "ግልጽ የሆነ የቅሬታ ክትትል",
        "አውቶማቲክ የኤስኤምኤስ እና የኢሜል መረጃዎች",
        "ደህንነቱ የተጠበቀ እና ሚስጥራዊ የዳታ አያያዝ",
        "ስም ሳይጠቅሱ ሪፖርት የማድረግ አማራጭ",
        "ባለብዙ ቋንቋ ተደራሽነት (አማርኛ እና እንግሊዝኛ)"
      ]
    },
    ORM: {
      tag: "Maaliif CGMS Filatu",
      title: "CGMSn Gabaasa Naannoo Lammiilee Hundaaf Salphaa Fi Dhaabbataaf Bu'a-Qabeessa Taasisuuf Kan Qophaa'e Dha.",
      desc: "Waltajjiin keenya gidduu yaaddoo uummataa fi tarkaanfii dhaabbataa gidduu jiru hiikuun, sagaleen hunda akka dhaga'amu fi dhimmi hundi hanga furmaata argatutti akka hordofamu taasisa.",
      features: [
        "Tajaajila weebsaayitii fi mobaayilaa salphaa",
        "Hordoffii koomii ifa ta'e",
        "Beeksisa SMS fi Imeelii of-danda'e",
        "Eegumsa ragaa amansiisaa fi iccitii",
        "Eenyummaa malee gabaasuun ni danda'ama",
        "Afaanota hedduun tajaajila kennu"
      ]
    },
    TIG: {
      tag: "ንምንታይ CGMS ይመርፁ",
      title: "CGMS ሪፖርት ኣተሓሕዛ ከባቢ ንዜጋታት ቀሊል ንትካላት ድማ ውፅኢታዊ ንክኸውን ዝተዳለወ እዩ።",
      desc: "መድረኽና ኣብ መንጎ ስግኣት ህዝብን ስጉምቲ ትካላትን ዘሎ ጋግ ብምፅባብ፣ ነፍሲ ወከፍ ድምፂ ንክስማዕን ነፍሲ ወከፍ ጉዳይ ድማ ፍታሕ ክሳብ ዝረክብ ንክከታተልን ይገብር።",
      features: [
        "ንምጥቃም ቀሊል ዝኾነ መርበብ ሓበሬታን ሞባይልን",
        "ግልፂ ዝኾነ ናይ ጥርዓን ምክትታል",
        "ኣውቶማቲክ ናይ SMSን ኢሜይልን መልእኽትታት",
        "ውሑስን ምስጢራዊን ኣተሓሕዛ ሓበሬታ",
        "ሽም ከይጠቀስካ ሪፖርት ምግባር የኽእል",
        "ብብዙሓት ቋንቋታት ዝተዳለወ ኣገልግሎት"
      ]
    }
  };

  const t = translations[Language] || translations.ENG;

  const features = [
    { title: t.features[0], primary: true },
    { title: t.features[1], primary: false },
    { title: t.features[2], primary: true },
    { title: t.features[3], primary: false },
    { title: t.features[4], primary: true },
    { title: t.features[5], primary: false },
  ];

  return (
    <section className="bg-gray-50 md:px-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-gray-400 md:px-10 uppercase tracking-widest text-xs font-bold mb-4">
            {t.tag}
          </p>
          <h2 className="text-4xl md:text-5xl md:px-10 font-extrabold text-gray-700 leading-tight mb-6">
            {t.title}
          </h2>
          <p className="text-gray-400 md:px-10 max-w-4xl text-lg italic">
            {t.desc}
          </p>
        </div>

        {/* Alternating Feature List */}
        <div className="flex md:px-10 flex-col w-full">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`w-full py-6 flex justify-center items-center text-center transition-all duration-300 ${
                feature.primary 
                ? 'bg-[#4376B1] text-white font-bold' 
                : 'bg-transparent text-gray-600 font-semibold'
              }`}
            >
              <span className="text-xl md:text-2xl tracking-wide px-4">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;