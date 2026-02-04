import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Star, Loader2, Hash, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'; 
import { useSubmiFeddBackMutation } from '../../../Redux/citizenApi';

const Feedback = () => {
  // Pull language from Redux store
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [submiFeddBack, { isLoading, isError, error, isSuccess, reset }] = useSubmiFeddBackMutation();

  const translations = {
    ENG: {
      title: "Share Your Feedback",
      subtitle: "Help us improve our environmental services",
      refLabel: "Reference Number (Optional)",
      refPlaceholder: "e.g. EPA-12345",
      ratingLabel: "How would you rate our service?",
      veryPoor: "Very Poor",
      excellent: "Excellent",
      optionalComments: "Optional Comments",
      placeholder: "Tell us about your experience...",
      submitBtn: "Submit Feedback",
      footerNote: "Your feedback is used to generate citizen satisfaction analytics for the Advisory Council.",
      successMsg: "Thank you for your feedback!",
      backBtn: "Go Back",
      errorTitle: "Submission Error"
    },
    AMH: {
      title: "አስተያየትዎን ያጋሩ",
      subtitle: "የአካባቢ ጥበቃ አገልግሎታችንን ለማሻሻል ይረዱን",
      refLabel: "የማጣቀሻ ቁጥር (ካለዎት)",
      refPlaceholder: "ለምሳሌ፦ EPA-12345",
      ratingLabel: "አገልግሎታችንን እንዴት ይገመግሙታል?",
      veryPoor: "በጣም ዝቅተኛ",
      excellent: "በጣም ምርጥ",
      optionalComments: "ተጨማሪ አስተያየት (ካለዎት)",
      placeholder: "ያጋጠመዎትን ነገር እዚህ ይግለጹ...",
      submitBtn: "አስተያየትን ላክ",
      footerNote: "አስተያየትዎ ለምክር ቤቱ የዜጎች እርካታ ትንታኔ ለማዘጋጀት ጥቅም ላይ ይውላል።",
      successMsg: "ስለ አስተያየትዎ እናመሰግናለን!",
      backBtn: "ተመለስ",
      errorTitle: "ስህተት ተከስቷል"
    },
    ORM: {
      title: "Yaada Keessan Qoodaa",
      subtitle: "Tajaajila naannoo keenyaa fooyyessuuf nu gargaaraa",
      refLabel: "Lakk. Eenyummaa (Yoo jiraate)",
      refPlaceholder: "fkn. EPA-12345",
      ratingLabel: "Tajaajila keenya akkamitti madaaltu?",
      veryPoor: "Baay'ee Gad-aanaa",
      excellent: "Baay'ee Gaarii",
      optionalComments: "Yaada dabalataa",
      placeholder: "Muuxannoo keessan asitti nuun gahaa...",
      submitBtn: "Yaada Ergi",
      footerNote: "Yaanni keessan gabaasa itti quufinsa lammiilee Mana Marii Gorsaaf qopheessuuf tajaajila.",
      successMsg: "Yaada keessaniif galatoomaa!",
      backBtn: "Deebi'i",
      errorTitle: "Dogoggora Ergaa"
    },
    TIG: {
      title: "ርእይቶኹም የካፍሉ",
      subtitle: "ኣገልግሎት ምክልኻል ከባቢና ንምምሕያሽ ሓግዙና",
      refLabel: "መለለዪ ቁፅሪ (እንተሃሊዩ)",
      refPlaceholder: "ምሳሌ፦ EPA-12345",
      ratingLabel: "ኣገልግሎትና ከመይ ትግምግምዎ?",
      veryPoor: "በጣዕሚ ትሑት",
      excellent: "በጣዕሚ ብሉፅ",
      optionalComments: "ተወሳኺ ርእይቶ",
      placeholder: "ዘጋጠመኩም ተመኩሮ ኣብዚ ግለፁ...",
      submitBtn: "ርእይቶ ስደዱ",
      footerNote: "ርእይቶኹም ንቤት ምኽሪ መማኸሪ ትንተና ዕግበት ዜጋታት ንምድላው ክንጥቀመሉ ኢና።",
      successMsg: "ብዛዕባ ርእይቶኹም ነመስግን!",
      backBtn: "ተመለስ",
      errorTitle: "ጌጋ ተፈጢሩ"
    }
  };

  const t = translations[Language] || translations.ENG;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submiFeddBack({
        ref_number: referenceNumber,
        rating, 
        comment, 
      }).unwrap();
      
      setRating(0);
      setComment("");
      setReferenceNumber("");
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">{t.successMsg}</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">{t.subtitle}</p>
          <button 
            onClick={() => reset()} 
            className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
          >
            <ArrowLeft size={16} /> {t.backBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
        
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-500 text-white p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 italic font-black text-xl shadow-lg">EPA</div>
          </div>
          <h2 className="text-2xl font-black tracking-tight">{t.title}</h2>
          <p className="text-emerald-50 text-sm mt-2 font-medium opacity-90">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isError && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-in fade-in duration-300">
              <AlertCircle size={20} className="shrink-0" />
              <div className="text-xs">
                <p className="font-bold">{t.errorTitle}</p>
                <p>{error?.data?.message || "Please check your connection and try again."}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
              {t.refLabel}
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Hash size={18} />
              </div>
              <input
                type="text"
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-700 font-bold placeholder:text-slate-300 disabled:opacity-50"
                placeholder={t.refPlaceholder}
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-slate-50" />

          <div className="text-center">
            <label className="block text-slate-700 font-black mb-5 text-lg tracking-tight">
              {t.ratingLabel}
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isLoading}
                  className="transition-all active:scale-90 hover:scale-125 disabled:opacity-50"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={42}
                    className={`transition-all duration-300 ${
                      star <= (hover || rating) 
                        ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <span>{t.veryPoor}</span>
              <span>{t.excellent}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1" htmlFor="comment">
              {t.optionalComments}
            </label>
            <textarea
              id="comment"
              rows="3"
              disabled={isLoading}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all resize-none text-slate-700 font-bold placeholder:text-slate-300 disabled:opacity-50"
              placeholder={t.placeholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!rating || isLoading}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              rating 
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100" 
                : "bg-slate-200 cursor-not-allowed text-slate-400"
            } ${isLoading ? "opacity-70" : ""}`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : t.submitBtn}
          </button>
        </form>

        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <p className="text-center text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-wider">
            {t.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;