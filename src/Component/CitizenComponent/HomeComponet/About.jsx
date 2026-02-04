import React from "react";
import { useSelector } from "react-redux";

const AboutSection = () => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      actionTitle: "Take Action Today",
      actionDesc: "Your report can make a real difference. Speak up, stay informed, and help protect our environment.",
      tag: "About Us",
      title: "We Are Customer Support Services For Seamless Interactions",
      desc1: "We are committed to protecting the environment by listening to citizens, responding responsibly, and ensuring environmental laws are upheld through transparent and efficient service delivery.",
      desc2: "The Complaint & Grievance Management System (CGMS) is an official digital service of the Environmental Protection Authority, developed to improve public access, accountability, and participation in environmental governance.",
      infoBox: "is accessible through web and mobile devices, ensuring inclusive access for all citizens.",
      f1: "Easy online complaint submission",
      f2: "Transparent case tracking",
      f3: "SMS & email notifications",
      f4: "Secure and confidential system",
      btn: "Learn More"
    },
    AMH: {
      actionTitle: "ዛሬውኑ እርምጃ ይውሰዱ",
      actionDesc: "የእርስዎ ሪፖርት እውነተኛ ለውጥ ሊያመጣ ይችላል። ድምፅዎን ያሰሙ፣ መረጃ ያግኙ እና አካባቢያችንን ለመጠበቅ ይርዱ።",
      tag: "ስለ እኛ",
      title: "ለተሳለጠ ግንኙነት የደንበኞች ድጋፍ አገልግሎት ነን",
      desc1: "የዜጎችን ድምፅ በመስማት፣ በኃላፊነት ስሜት ምላሽ በመስጠት እና የአካባቢ ጥበቃ ህጎች ግልፅ እና ቀልጣፋ በሆነ የአገልግሎት አሰጣጥ መከበራቸውን በማረጋገጥ አካባቢያችንን ለመጠበቅ ቆርጠን ተነስተናል።",
      desc2: "የቅሬታ እና አቤቱታ ማስተዳደሪያ ስርዓት (CGMS) የህዝብ ተደራሽነትን፣ ተጠያቂነትን እና በአካባቢ አስተዳደር ላይ ተሳትፎን ለማሻሻል በኢትዮጵያ የአካባቢ ጥበቃ ባለስልጣን የተዘጋጀ ይፋዊ የዲጂታል አገልግሎት ነው።",
      infoBox: "በድረ-ገጽ እና በሞባይል መሳሪያዎች የሚገኝ ሲሆን ለሁሉም ዜጎች አካታች ተደራሽነትን ያረጋግጣል።",
      f1: "ቀላል የመስመር ላይ አቤቱታ ማቅረቢያ",
      f2: "ግልጽ የጉዳይ ክትትል",
      f3: "የኤስኤምኤስ እና የኢሜል ማሳወቂያዎች",
      f4: "ደህንነቱ የተጠበቀ እና ሚስጥራዊ ስርዓት",
      btn: "ተጨማሪ ይወቁ"
    },
    ORM: {
      actionTitle: "Har'uma Tarkaanfii fudhadha",
      actionDesc: "Gabaasni keessan garaagarummaa guddaa fiduu danda'a. Sagalee keessan dhageessisaa, odeeffannoo qabadhaa, naannoo keenya eeguuf gargaaraa.",
      tag: "Waa'ee Keenya",
      title: "Tajaajila Deeggarsa Maamiltootaa Walitti Bu'iinsa Hin qabneef",
      desc1: "Sagalee lammiilee dhaggeeffachuun, itti gaafatamummaan deebii kennuu fi sirna iftoomina qabuun seera eegumsa naannoo kabachiisuuf kutannoo qabna.",
      desc2: "Sirni Bulchiinsa Koomii fi Guungummii (CGMS) tajaajila dijiitaalaa ragaa dhaabbata eegumsa naannooti. Kunis uummanni akka salphaatti akka fayyadamuu fi hirmaannaa isaanii akka guddisuuf kan qophaaye dha.",
      infoBox: "Websaayitii fi moobaayilaan kan argamu yoo ta'u, lammiilee hundaaf qaqqabummaa ni mirkaneessa.",
      f1: "Koomii toora interneetiin salphaatti galchuu",
      f2: "Hordoffii dhimmaa ifa ta'e",
      f3: "Beeksisa SMS fi Imeelii",
      f4: "Sirna amansiisaa fi iccitii qabu",
      btn: "Dabalata Bari"
    },
    TIG: {
      actionTitle: "ሎሚ ስጉምቲ ይውሰዱ",
      actionDesc: "ፀብፃብኩም ናይ ሓቂ ለውጢ ከምፅእ ይኽእል እዩ። ድምፅኹም የስምዑ፣ ሓበሬታ ይሃልኹም፣ ከባቢና ንምክልኻል ድማ ሓግዙ።",
      tag: "ብዛዕባና",
      title: "ንዝበለፀ ርክብ ናይ ዓማዊል ደገፍ ኣገልግሎት ኢና",
      desc1: "ድምፂ ዜጋታት ብምስማዕ፣ ብሓላፍነት ምላሽ ብምሃብን ሕጊ ምክልኻል ከባቢ ብግልፅን ቀልጣፋን ኣገባብ ንክኽበር ብምግባር ከባቢና ንምክልኻል ንሰርሕ ኣለና።",
      desc2: "ስርዓት ምሕደራ ጥርዓንን ቅሬታን (CGMS) ናይ ከባቢ ጥበቃ በዓል መዚ ወግዓዊ ዲጂታል ኣገልግሎት ኮይኑ፣ ህዝባዊ ተበፃሕነትን ተሓታቲነትን ንምምሕያሽ ዝተዳለወ እዩ።",
      infoBox: "ብመሰነታታን ሞባይልን ዝርከብ ኮይኑ ንኹሎም ዜጋታት ማዕረ ተበፃሕነት የረጋግፅ።",
      f1: "ቀሊል ናይ ኢንተርኔት ጥርዓን መእተዊ",
      f2: "ግልፂ ናይ ጉዳይ ክትትል",
      f3: "ናይ SMSን ኢሜይልን መልእኽትታት",
      f4: "ውሑስን ምስጢራዊን ስርዓት",
      btn: "ተወሳኺ ርኣዩ"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <section id="about" className="w-full max:pl-50 bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE SECTION */}
          <div className="relative md:pl-30 ">
            <img
              src="/1ee1c8fc15ab4aa9252696be466a6aea3826d652.jpg"
              alt="Customer Support"
              className="w-full h-[1000px] object-cover rounded-md"
            />

            {/* Overlay Card */}
            <div className="absolute bottom-80 left-6 bg-green-500/80 text-white px-10 py-20 max-w-sm rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                {t.actionTitle}
              </h3>
              <p className="text-sm leading-relaxed">
                {t.actionDesc}
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              {t.tag}
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-[#828282] mt-3 leading-tight">
              {t.title}
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              {t.desc1}
            </p>

            <p className="text-gray-500 mt-3 leading-relaxed">
              {t.desc2}
            </p>

            {/* Blue Info Box */}
            <div className="bg-[#0E4C98] text-white p-5 rounded-md mt-6">
              <h4 className="font-semibold mb-1">CGMS</h4>
              <p className="text-sm">
                {t.infoBox}
              </p>
            </div>

            {/* Feature List */}
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                {t.f1}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                {t.f2}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                {t.f3}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                {t.f4}
              </li>
            </ul>

            {/* Button */}
            <button className="mt-8 bg-[#0E4C98] hover:bg-blue-900 text-white px-6 py-3 rounded-md flex items-center gap-2 transition">
              {t.btn}
              <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;