import React from 'react';
import { useSelector } from 'react-redux';
import { 
  MessageSquare, 
  Headset,       
  ClipboardCheck,
  PieChart,      
  MoveRight     
} from 'lucide-react';

const ProcessSection = () => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  const translations = {
    ENG: {
      tag: "How the system works",
      title: "A Simple, Transparent Process From Start To Finish",
      step: "Step",
      contact: "Contact Us",
      steps: [
        { title: "Submit a Complaint", desc: "Fill out a simple online form with your complaint details. Attach photos or documents if available." },
        { title: "Get a Reference Number", desc: "Once submitted, you will receive a unique complaint reference number via SMS or email." },
        { title: "Complaint Review & Action", desc: "Your complaint is reviewed, assigned to the responsible department, and handled according to service standards." },
        { title: "Track Progress", desc: "Use your reference number or phone number to check the status of your complaint at any time." }
      ]
    },
    AMH: {
      tag: "ስርዓቱ እንዴት እንደሚሰራ",
      title: "ከመጀመሪያ እስከ መጨረሻ ቀላል እና ግልጽ ሂደት",
      step: "ደረጃ",
      contact: "ያግኙን",
      steps: [
        { title: "አቤቱታዎን ያቅርቡ", desc: "ቀላል የሆነውን የቅሬታ ማቅረቢያ ቅጽ ይሙሉ፤ ካሉዎት ፎቶዎችን ወይም ሰነዶችን ያያይዙ።" },
        { title: "የማጣቀሻ ቁጥር ያግኙ", desc: "አቤቱታው እንደገባ ልዩ የሆነ የማጣቀሻ ቁጥር በኤስኤምኤስ ወይም በኢሜል ይደርስዎታል።" },
        { title: "የቅሬታ ግምገማ እና እርምጃ", desc: "ቅሬታዎ ተገምግሞ ለሚመለከተው ክፍል ይመደባል፤ እንዲሁም በአገልግሎት ደረጃዎች መሠረት ምላሽ ይሰጠዋል።" },
        { title: "ሂደቱን ይከታተሉ", desc: "የማጣቀሻ ቁጥርዎን ወይም ስልክዎን በመጠቀም በማንኛውም ጊዜ የቅሬታዎን ሁኔታ መከታተል ይችላሉ።" }
      ]
    },
    ORM: {
      tag: "Sirnichas akkamitti akka hojjetu",
      title: "Jalqabaa hanga xumuraatti adeemsa salphaa fi ifa ta'e",
      step: "Tarkaanfii",
      contact: "Nu Quunnamaa",
      steps: [
        { title: "Koomii Galchaa", desc: "Guca salphaa odeeffannoo koomii keessaniin guutaa. Suuraa ykn ragaalee qabdan itti fannisaa." },
        { title: "Lakkoofsa Eenyummeessaa Argadhaa", desc: "Erga galchitani dhumanii booda, lakkoofsa addaa SMS ykn Imeeliin isiniif ergama." },
        { title: "Koomii Gamaggamuu fi Tarkaanfii", desc: "Koomiin keessan gamaggamee, kutaa dhimmi ilaallatuuf qoodama, sadarkaa tajaajilaa eeggatee irratti hojjetama." },
        { title: "Adeemsa Hordofaa", desc: "Yeroo barbaaddanitti lakkoofsa eenyummeessaa fayyadamuun haala koomii keessanii hordofuu dandeessu." }
      ]
    },
    TIG: {
      tag: "እቲ ስርዓት ከመይ ይሰርሕ",
      title: "ካብ መጀመርታ ክሳብ መወዳእታ ቅሉዕን ቀሊልን ኣገባብ",
      step: "ደረጃ",
      contact: "ርኸቡና",
      steps: [
        { title: "ጥርዓን የእትዉ", desc: "ቀሊል ናይ ጥርዓን መእተዊ ፎርም ይምልኡ፤ ዘለዉኹም ስእልታት ወይ ሰነዳት ድማ የተሓሕዙ።" },
        { title: "መወከሲ ቑፅሪ ይውሰዱ", desc: "ጥርዓን ምስ ኣእተዉ ፍሉይ መወከሲ ቑፅሪ ብኤስኤምኤስ ወይ ኢሜይል ይለኣኸልኩም።" },
        { title: "ገምጋም ጥርዓንን ስጉምትን", desc: "ጥርዓንኩም ተገምጊሙ ንዝምልከቶ ክፍሊ ይምደብ፤ ብመሰረት ደረጃ ኣገልግሎት ድማ ይስራሕ።" },
        { title: "ከይዲ ይከታተሉ", desc: "መወከሲ ቑፅሪ ወይ ስልኪ ብምጥቃም ኩነታት ጥርዓንኩም ዝኾነ እዋን ክትከታተሉ ትኽእሉ ኢኹም።" }
      ]
    }
  };

  const t = translations[Language] || translations.ENG;

  const steps = [
    {
      id: 1,
      title: t.steps[0].title,
      description: t.steps[0].desc,
      icon: <MessageSquare size={44} strokeWidth={2.5} />,
    },
    {
      id: 2,
      title: t.steps[1].title,
      description: t.steps[1].desc,
      icon: <Headset size={44} strokeWidth={2.5} />,
    },
    {
      id: 3,
      title: t.steps[2].title,
      description: t.steps[2].desc,
      icon: <ClipboardCheck size={44} strokeWidth={2.5} />,
    },
    {
      id: 4,
      title: t.steps[3].title,
      description: t.steps[3].desc,
      icon: <PieChart size={44} strokeWidth={2.5} />,
    },
  ];

  return (
    <div id='price' className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-[url(/e1f76a060d4463ad6083ab102b3e27e6117263d9.jpg)] bg-no-repeat bg-center bg-cover opacity-30 grayscale"
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="text-white/70 uppercase tracking-[0.4em] text-xs font-bold mb-4">{t.tag}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {t.title.split('Process')[0]}Process {t.title.split('Process')[1]}
            {/* Note: In non-ENG, the title displays as one string */}
            {Language === 'ENG' ? <>A Simple, Transparent Process From<br />Start To Finish</> : t.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-10 flex flex-col items-start shadow-2xl group transition-transform hover:-translate-y-1">
              <div className="text-blue-800 mb-6">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#828282] mb-4">
                {t.step} {step.id}: {step.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                {step.description}
              </p>
              
              <a href="#" className="flex items-center gap-3 text-blue-900 font-black text-sm uppercase tracking-wider hover:gap-5 transition-all">
                {t.contact} <MoveRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;