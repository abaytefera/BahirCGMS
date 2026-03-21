import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { useSubmitComplaintMutation } from "../../Redux/citizenApi";
import { Loader2 } from "lucide-react";

import Header from "../../Component/CitizenComponent/HomeComponet/Header";
import PageHero from "../../Component/CitizenComponent/SubmitComplaintComponent/PageHero";
import ComplaintForm from "../../Component/CitizenComponent/SubmitComplaintComponent/ComplaintForm";
import Footer from "../../Component/CitizenComponent/HomeComponet/Footer";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const [submitComplaint, { isLoading, error }] = useSubmitComplaintMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const translations = {
    ENG: { title: "Submit a Complaint", subtitle: "Report issues easily.", uploading: "Uploading Evidence..." },
    AMH: { title: "አቤቱታ ያቅርቡ", subtitle: "ጉዳዮችን በቀላሉ ያሳውቁ።", uploading: "መረጃው እየተጫነ ነው..." },
    // ... add other languages as needed
  };

  const t = translations[Language] || translations.ENG;

  const handleFormSubmit = async (finalFormData) => {
    try {
     
     for (let [key, value] of finalFormData.entries()) {
  console.log(`${key}:`, value);
}
     
      // 1. Submit the FormData object directly to the mutation
      const result = await submitComplaint(finalFormData).unwrap();
      
      navigate("/ComplaintSubmittedPage", { 
        state: { referenceNumber: result?.ref_number || "N/A",meetingToken:result?.meetingToken } 
      }); 
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-slate-50">
      <Header page={true} />
      <PageHero title={t.title} subtitle={t.subtitle} />
      
      <main className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          <ComplaintForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading} 
            serverError={error}
          />
        </div>

        {isLoading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-slate-900/10 backdrop-blur-[2px]">
            <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
              <Loader2 className="animate-spin text-textColor mb-4" size={40} />
              <p className="text-sm font-black text-slate-700 uppercase">{t.uploading}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}