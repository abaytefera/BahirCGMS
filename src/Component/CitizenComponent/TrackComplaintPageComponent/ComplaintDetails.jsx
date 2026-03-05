import React from "react";
import { useSelector } from "react-redux";
import { faCheckDouble, faUserClock, faCalendarAlt, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ComplaintDetails = ({ complaint }) => {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });

  // Use the database return or the fallback
  const data = complaint || {
    ref_number: "CMP-20260125-3919",
    status: "SUBMITTED",
    createdAt: "2026-01-25T09:37:04.832Z",
    category: "Sanitation",
    meeting: { status: "PENDING", scheduledDate: null, scheduledTime: null, location: null }
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
      meetingHeader: "Meeting Request",
      meetingPending: "Meeting request is being reviewed",
      meetingScheduled: "Meeting Scheduled",
      location: "Location",
      time: "Time"
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
      meetingHeader: "የስብሰባ ጥያቄ",
      meetingPending: "የስብሰባ ጥያቄው በግምገማ ላይ ነው",
      meetingScheduled: "ስብሰባ ተይዟል",
      location: "ቦታ",
      time: "ሰዓት"
    }
  };

  const t = translations[Language] || translations.ENG;

const formatDate = (dateStr) => {
  if (!dateStr) return "---";
  const date = new Date(dateStr);

  if (Language === "AMH") {
    // 'am-ET-u-ca-ethiopian' forces the Ethiopian Calendar logic
    return new Intl.DateTimeFormat('am-ET-u-ca-ethiopian', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  // Fallback for English (Gregorian)
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
  const getStatusDisplay = (status) => {
    switch (status) {
      case "RESOLVED": return { label: t.resolved, color: "bg-green-100 text-green-600" };
      case "ASSIGNED": return { label: t.assigned, color: "bg-amber-100 text-amber-600" };
      case "SUBMITTED":
      case "PENDING": return { label: t.pending, color: "bg-blue-100 text-blue-600" };
      default: return { label: status, color: "bg-slate-100 text-slate-600" };
    }
  };

  const statusInfo = getStatusDisplay(data.status);

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm p-8 mt-6 text-slate-800 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 tracking-tight">{t.header}</h2>

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
          <span className="font-bold text-slate-900 text-base">{data.category || data.Category?.name}</span>
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

      {/* NEW: Meeting Section */}
      {data.meeting && (
        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
          <h4 className="font-black text-indigo-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
             <FontAwesomeIcon icon={faCalendarAlt} /> {t.meetingHeader}
          </h4>
          
          {data.meeting.status === "PENDING" ? (
            <div className="flex items-center gap-3 text-indigo-600">
              <div className="animate-pulse bg-indigo-200 p-2 rounded-lg">
                <FontAwesomeIcon icon={faUserClock} />
              </div>
              <p className="text-sm font-bold">{t.meetingPending}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100">
                <FontAwesomeIcon icon={faClock} className="text-indigo-400" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">{t.time}</p>
                  <p className="text-sm font-bold text-slate-800">{data.meeting.scheduledDate} @ {data.meeting.scheduledTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-indigo-100">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-400" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">{t.location}</p>
                  <p className="text-sm font-bold text-slate-800">{data.meeting.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Buttons and other details... */}
      <Link to='/FeedbackPage' className="mt-8 w-full py-5 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-xl transition-all flex items-center justify-center gap-2">
        {t.feedback}
      </Link>
    </div>
  );
};

export default ComplaintDetails;