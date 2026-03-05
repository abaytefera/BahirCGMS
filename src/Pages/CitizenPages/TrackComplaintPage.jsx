import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../Component/CitizenComponent/TrackComplaintPageComponent/Breadcrumb";
import TrackForm from "../../Component/CitizenComponent/TrackComplaintPageComponent/TrackForm";
import ComplaintDetails from "../../Component/CitizenComponent/TrackComplaintPageComponent/ComplaintDetails";
import { useLazyTrackComplaintQuery } from "../../Redux/citizenApi";
import { Loader2, AlertCircle, Search, CheckCircle2 } from "lucide-react";
import Header from "../../Component/CitizenComponent/HomeComponet/Header";
import Footer from "../../Component/CitizenComponent/HomeComponet/Footer";

export default function TrackComplaintPage() {
  const { Language } = useSelector((state) => state.webState || { Language: 'ENG' });
  const [trigger, { data, isFetching, isError, error, isSuccess }] = useLazyTrackComplaintQuery();
  const [hasSearched, setHasSearched] = useState(false);

  const translations = {
    ENG: {
      title: "Track Your Request",
      subtitle: "Enter your reference number to check real-time status",
      loading: "Accessing EPA Database...",
      errorTitle: "No Record Found",
      errorDesc: "We couldn't find a complaint matching that reference ID. Please check the number and try again.",
      success: "Complaint Records Located Successfully",
      initial: "Enter your ID above to view details"
    },
    AMH: {
      title: "አቤቱታዎን ይከታተሉ",
      subtitle: "ወቅታዊ ሁኔታውን ለማየት የማጣቀሻ ቁጥርዎን ያስገቡ",
      loading: "የኢ.አ.ጥ.ባ መረጃ ቋት በመፈለግ ላይ...",
      errorTitle: "ምንም መረጃ አልተገኘም",
      errorDesc: "ከዚህ የማጣቀሻ ቁጥር ጋር የሚዛመድ ቅሬታ ማግኘት አልቻልንም። እባክዎ ቁጥሩን ያረጋግጡና እንደገና ይሞክሩ።",
      success: "የቅሬታ መረጃው በተሳካ ሁኔታ ተገኝቷል",
      initial: "ዝርዝሩን ለማየት መታወቂያዎን ከላይ ያስገቡ"
    },

  };

  const t = translations[Language] || translations.ENG;

  const handleTrack = async(ref_number) => {
    if (ref_number) {
      try{
      await trigger(ref_number).unwrap();
      setHasSearched(true);}
      catch(err){
         
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header page={true} />
      <Breadcrumb />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-primBtn">{t.title}</h1>
          <p className="text-slate-500 mt-2">{t.subtitle}</p>
        </div>

        <div className="p-2 rounded-3xl border border-slate-100 mb-10">
           <TrackForm onTrack={handleTrack} isLoading={isFetching} />
        </div>

        {/* --- 1. LOADING STATE --- */}
        {isFetching && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="relative">
               <Loader2 className="animate-spin text-green-600" size={48} />
               <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400" size={18} />
            </div>
            <p className="text-slate-500 mt-6 font-bold tracking-wide uppercase text-xs">{t.loading}</p>
          </div>
        )}

        {/* --- 2. ERROR STATE --- */}
        {isError && !isFetching && (
          <div className="mt-4 p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-red-800">{t.errorTitle}</h3>
            <p className="text-red-600/70 text-sm max-w-xs mx-auto mt-2">
              {error?.data?.message || t.errorDesc}
            </p>
          </div>
        )}

        {/* --- 3. SUCCESS STATE (ARRAY HANDLING) --- */}
        {isSuccess && !isFetching && data && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 mb-4">
               <CheckCircle2 size={20} />
               <span className="font-bold text-sm">{t.success}</span>
            </div>

            {/* If data is an array, map it. If it's a single object, wrap it in an array to map it once. */}
            {(Array.isArray(data) ? data : [data]).map((item, index) => (
              <div key={item.id || index} className="mb-6 last:mb-0">
                 <ComplaintDetails complaint={item} />
              </div>
            ))}
          </div>
        )}

        {/* --- 4. INITIAL EMPTY STATE --- */}
        {!hasSearched && !isFetching && (
          <div className="py-20 text-center opacity-40">
             <div className="bg-slate-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-400" />
             </div>
             <p className="text-slate-500 font-medium italic">{t.initial}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}