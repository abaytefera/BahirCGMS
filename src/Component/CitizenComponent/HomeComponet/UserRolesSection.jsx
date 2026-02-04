import React from 'react';
import { useSelector } from 'react-redux';

const UserSelection = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "Who Uses CGMS",
      heading: "CGMS supports multiple users each playing a key role in ensuring effective complaint handling and oversight.",
      desc: "The platform provides specific tools for citizens, management, and administrators to ensure environmental grievances are resolved transparently.",
      citizen: "Citizens / Public Users",
      supervisor: "Department Supervisors",
      admin: "System Administrators",
      officer: "Complaint Handling Officers"
    },
    AMH: {
      tag: "CGMSን ማን ይጠቀማል",
      heading: "CGMS ውጤታማ የቅሬታ አያያዝን እና ቁጥጥርን ለማረጋገጥ እያንዳንዳቸው ቁልፍ ሚና የሚጫወቱ በርካታ ተጠቃሚዎችን ይደግፋል።",
      desc: "መድረኩ የአካባቢ ቅሬታዎች ግልጽ በሆነ መንገድ መፈታታቸውን ለማረጋገጥ ለዜጎች፣ ለሥራ አመራር እና ለአስተዳዳሪዎች የተለዩ መሣሪያዎችን ይሰጣል።",
      citizen: "ዜጎች / የህዝብ ተጠቃሚዎች",
      supervisor: "የክፍል ኃላፊዎች",
      admin: "የሲስተም አስተዳዳሪዎች",
      officer: "የቅሬታ አያያዝ መኮንኖች"
    },
    ORM: {
      tag: "Eenyutu CGMS Fayyadama",
      heading: "CGMS fayyadamtoota hedduu deeggarsa kennu, tokkoon tokkoon isaanii adeemsa koomii hiikuu keessatti gahee qabu.",
      desc: "Sirni kun koomiiwwan naannoo karaa iftoomina qabuun furmaata akka argataniif lammiilee, hoggantootaa fi bulchitootaaf meeshaalee addaa ni dhiyeessa.",
      citizen: "Lammiilee / Fayyadamtoota",
      supervisor: "To'attoota Damee",
      admin: "Bulchitoota Sirnaa",
      officer: "Abbootii Adeemsa Koomii"
    },
    TIG: {
      tag: "CGMS መን ይጥቀም",
      heading: "CGMS ውፅኢታዊ ኣተሓሕዛ ጥርዓንን ቁፅፅርን ንምርግጋፅ ነፍሲ ወከፎም ቁልፊ ግደ ዘለዎም ብዙሓት ተጠቀምቲ ይድግፍ።",
      desc: "እቲ መድረኽ ጥርዓናት ከባቢ ብግልፂ ንክፍተሑ ንዜጋታት፣ ንመሪሕነትን ንኣመሓደርትን ዝተፈላለዩ መሳርሒታት የቕርብ።",
      citizen: "ዜጋታት / ተጠቀምቲ ህዝቢ",
      supervisor: "ሓለፍቲ ክፍሊ",
      admin: "ኣመሓደርቲ ስርዓት",
      officer: "መኮንናት ኣተሓሕዛ ጥርዓን"
    }
  };

  const t = translations[Language] || translations.ENG;

  return (
    <div id="service" className="flex flex-col lg:flex-row min-h-[600px] w-full font-sans">
      
      {/* Left Side: Images with Labels */}
      <div className="w-full lg:w-1/2 bg-white p-12 grid grid-cols-2 gap-x-8">
        
        {/* Citizen Group */}
        <div className="flex flex-col items-center">
          <img src="/c815de3a74919c5e2a5cd1a40393858e16ddaf41 (1).png" alt="Citizens" className="h-40 object-contain mb-4" />
          <p className="text-white bg-[#00A751D9] py-4 px-4 relative bottom-10 font-bold uppercase tracking-widest text-center text-xs md:text-sm">
            {t.citizen}
          </p>
        </div>

        {/* System Administrator */}
        <div className="flex flex-col items-center">
          <img src="67411c74967caa3f1740ad024e272bdc82f92012.png" alt="System Admin" className="h-40 object-contain mb-4" />
          <p className="text-white bg-[#00A751D9] py-4 px-4 relative bottom-10 font-bold uppercase tracking-widest text-center text-xs md:text-sm">
            {t.supervisor}
          </p>
        </div>

        {/* Technical User */}
        <div className="flex flex-col items-center">
          <img src="/c7409228032a506024eb8c403d8bdd779dfa13f3.png" alt="Tech" className="h-40 object-contain mb-4" />
          <p className="text-white bg-[#00A751D9] py-4 px-4 relative bottom-10 font-bold uppercase tracking-widest text-center text-xs md:text-sm">
            {t.admin}
          </p>
        </div>

        {/* Complaint Officer */}
        <div className="flex flex-col items-center">
          <img src="/8e339501f86f8574325e0a0cc070eeaf621770ae.png" alt="Officer" className="h-40 object-contain mb-4" />
          <p className="text-white bg-[#00A751D9] py-4 px-4 relative bottom-10 font-bold uppercase tracking-widest text-center text-xs md:text-sm">
            {t.officer}
          </p>
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 space-y-4">
          <h3 className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
            {t.tag}
          </h3>
          
          <h2 className="text-[32px] md:text-[42px] leading-[1.1] font-black text-[#828282] capitalize">
            {t.heading}
          </h2>
          
          <p className="text-gray-400 text-base max-w-md leading-relaxed">
            {t.desc}
          </p>
      </div>

    </div>
  );
};

export default UserSelection;