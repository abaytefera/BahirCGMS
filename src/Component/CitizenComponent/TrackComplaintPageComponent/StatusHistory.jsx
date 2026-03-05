import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { 
  faPaperPlane, 
  faMagnifyingGlass, 
  faSpinner, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

const StatusHistory = ({ status = "Submitted" }) => {
  // Access dynamic language state from Redux
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  // Mapping string status to numerical steps
  const statusMap = { 
    "Submitted": 0, 
    "Under Review": 1, 
    "In Progress": 2, 
    "Resolved": 3 
  };
  
  const currentStep = statusMap[status] ?? 0;

  const translations = {
    ENG: {
      header: "Status & History",
      steps: ["Submitted", "Under Review", "In Progress", "Resolved"]
    },
    AMH: {
      header: "የሂደት ታሪክ",
      steps: ["ተልኳል", "በምርመራ ላይ", "በሂደት ላይ", "ተፈትቷል"]
    },
    ORM: {
      header: "Haala fi Seenaa",
      steps: ["Ergameera", "Qorannoorra", "Adeemsarra", "Furmaata"]
    },
    TIG: {
      header: "ኩነታትን ታሪክን",
      steps: ["ተላኢኹ", "ኣብ ምርመራ", "ኣብ ከይዲ", "ተፈቲሑ"]
    }
  };

  const t = translations[Language] || translations.ENG;

  const steps = [
    { label: t.steps[0], icon: faPaperPlane, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: t.steps[1], icon: faMagnifyingGlass, color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: t.steps[2], icon: faSpinner, color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: t.steps[3], icon: faCheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="mb-8 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-500 mb-12 flex items-center gap-3">
        <span className="w-1.5 h-4 bg-primBtn  rounded-full"></span>
        {t.header}
      </h3>

      <div className="relative flex justify-between px-2 md:px-10">
        {/* Background Track */}
        <div className="absolute top-5 left-10 right-10 h-1 bg-gray-100 -z-0 rounded-full" />
        
        {/* Animated Progress Track */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 20px)` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-5 left-10 h-1 bg-primBtn  z-0 rounded-full"
        />

        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative z-10 flex flex-col items-center group"
          >
            {/* Step Icon Circle */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`w-12 h-12 rounded-2xl ${index <= currentStep ? step.bg : 'bg-gray-50'} 
              flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500`}
            >
              <FontAwesomeIcon 
                icon={step.icon} 
                className={`${index <= currentStep ? step.color : 'text-gray-300'} text-sm 
                ${index === currentStep && index !== 3 && index !== 0 ? 'fa-spin' : ''}`} 
              />
            </motion.div>

            {/* Label */}
            <span className={`mt-4 text-[10px] md:text-[11px] font-black uppercase tracking-tighter
              ${index <= currentStep ? 'text-slate-800' : 'text-gray-300'}
              ${index === currentStep ? 'text-textColor' : ''}`}>
              {step.label}
            </span>
            
            {/* Active Pulse Indicator */}
            {index === currentStep && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primBtn  opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primBtn  border-2 border-white"></span>
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatusHistory;