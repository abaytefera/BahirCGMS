import React from "react";
import { useSelector } from "react-redux";
import { faCheckDouble, faUserClock, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ComplaintDetails = ({ complaint }) => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  // Use the database return or the fallback
  const data = complaint || {
    ref_number: "CMP-20260125-3919",
    status: "ASSIGNED",
    createdAt: "2026-01-25T09:37:04.832Z",
    Category: { name: "Water" },
  };

  const translations = {
    ENG: {
      header: "Complaint Status",
      found: "Complaint Found",
      refNum: "Reference Number",
      category: "Category",
      date: "Submitted On",
      status: "Status",
      resolved: "Resolved",
      pending: "Pending",
      assigned: "Assigned to Officer",
      feedback: "Give Feedback",
      resolvedNote: "The issue has been resolved and the affected area has been cleaned."
    },
    AMH: {
      header: "የአቤቱታው ሁኔታ",
      found: "አቤቱታው ተገኝቷል",
      refNum: "የመለያ ቁጥር",
      category: "ዘርፍ",
      date: "የቀረበበት ቀን",
      status: "ሁኔታ",
      resolved: "ተፈትቷል",
      pending: "በሂደት ላይ",
      assigned: "ለባለሙያ ተመድቧል",
      feedback: "አስተያየት ይስጡ",
      resolvedNote: "ጉዳዩ ተፈትቷል፤ እንዲሁም የተበከለው አካባቢ እንዲጸዳ ተደርጓል።"
    },
    // ... ORM and TIG translations omitted for brevity, add 'assigned' key to them
  };

  const t = translations[Language] || translations.ENG;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    try {
      if (Language === "AMH") return date.toLocaleDateString('am-ET');
      return date.toLocaleDateString('en-US', options);
    } catch {
      return date.toLocaleDateString();
    }
  };

  // Helper to get status styles and text
  const getStatusDisplay = (status) => {
    switch (status) {
      case "RESOLVED":
        return { label: t.resolved, color: "bg-emerald-100 text-emerald-600" };
      case "ASSIGNED":
        return { label: t.assigned || "Assigned", color: "bg-amber-100 text-amber-600" };
      case "PENDING":
        return { label: t.pending, color: "bg-blue-100 text-blue-600" };
      default:
        return { label: status, color: "bg-slate-100 text-slate-600" };
    }
  };

  const statusInfo = getStatusDisplay(data.status);
  const categoryName = Language === "AMH" ? (data.Category?.nameAm || data.Category?.name) : data.Category?.name;

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm p-8 mt-6 text-slate-800 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 tracking-tight">
        {t.header}
      </h2>

      {/* Reference Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="font-bold text-blue-700 text-lg flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">✓</span>
            {t.found}
          </p>
          <p className="text-sm text-slate-500 font-bold mt-1 tracking-wide uppercase">
            {t.refNum}: <span className="text-slate-900 font-mono">{data.ref_number}</span>
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.category}:</strong>
          <span className="font-bold text-slate-900 text-base">{categoryName}</span>
        </div>
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.date}:</strong>
          <span className="font-bold text-slate-900 text-base">{formatDate(data.createdAt)}</span>
        </div>
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.status}:</strong>
          <span className={`inline-block font-bold px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Dynamic Progress/Note Section */}
      {data.status === "RESOLVED" ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
          <FontAwesomeIcon icon={faCheckDouble} className="absolute -right-6 -bottom-6 text-white opacity-5 text-7xl rotate-12" />
          <h4 className="font-bold mb-2 text-lg flex items-center gap-3">
            <div className="bg-emerald-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckDouble} className="text-white text-sm" />
            </div>
            <span>{t.resolved}</span>
          </h4>
          <p className="text-sm opacity-80 leading-relaxed pl-14">{t.resolvedNote}</p>
        </motion.div>
      ) : data.status === "ASSIGNED" && (
        <div className="mt-4 p-6 border-2 border-dashed border-amber-100 rounded-[2rem] flex items-start gap-4">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl flex-shrink-0">
             <FontAwesomeIcon icon={faUserClock} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{t.assigned}</h4>
            <p className="text-sm text-slate-500 mt-1">Your complaint is currently being reviewed by a dedicated EPA officer. You will be notified once an action is taken.</p>
          </div>
        </div>
      )}

      <Link 
        to='/FeedbackPage'
        className="mt-8 w-full py-5 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2"
      >
        {t.feedback}
      </Link>
    </div>
  );
};

export default ComplaintDetails;