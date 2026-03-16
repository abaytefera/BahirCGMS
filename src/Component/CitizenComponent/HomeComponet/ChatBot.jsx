import { Bot, Send, X, RotateCcw, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetChatHistoryQuery, useSendMessageMutation } from "../../../Redux/Conversation";


const COMPANY_ID = import.meta.env.VITE_COMPANY_ID || "f7e9efb6-7e73-4fea-bcd7-c1096f77abee";

export const ChatBot = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [input, setInput] = useState("");
  const scrollBottomRef = useRef(null);

  // --- 1. SESSION MANAGEMENT ---
  const [sessionId] = useState(() => {
    const savedId = localStorage.getItem("chat_session_id");
    if (savedId) return savedId;
    const newId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", newId);
    return newId;
  });

  // --- 2. RTK QUERY HOOKS ---
 const { data: history = [], isLoading: isHistoryLoading } = useGetChatHistoryQuery(sessionId);
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Combine initial welcome with history if history is empty
  const messages = history.length > 0 ? history : [{ role: "assistant", text: content.aiWelcome }];

  // --- 3. AUTO-SCROLL ---
  useEffect(() => {
    if (isOpen) {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isSending]);

  // --- 4. ACTIONS ---
  const handleResetSession = () => {
    localStorage.removeItem("chat_session_id");
    window.location.reload(); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const currentInput = input.trim();
    setInput(""); // Clear input immediately

    await sendMessage({
      session_id: sessionId,
      message: currentInput,
      company_id: COMPANY_ID,
      type: "text",
    });
  };

  return (
    <div className="fixed bottom-3 right-8 z-[1000] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="relative mb-4 w-[350px] md:w-[400px] h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in duration-300">
          
          {showConfirm && (
            <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Clear Conversation?</h4>
                <p className="text-sm text-slate-500 mb-6">This will delete your current history.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowConfirm(false)} className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600">Cancel</button>
                  <button onClick={handleResetSession} className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold">Reset</button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot size={22} />
              <div>
                <h3 className="font-bold text-sm leading-tight">{content.aiTitle}</h3>
                <span className="text-[10px] text-blue-100 flex items-center gap-1">Online</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setShowConfirm(true)} className="p-2 hover:bg-white/10 rounded-full"><RotateCcw size={18} /></button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {isHistoryLoading ? (
              <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "visitor" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === "visitor" ? "bg-blue-600 text-white" : "bg-white border text-slate-800"}`}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            
            {isSending && (
               <div className="flex justify-start">
                 <div className="bg-white border px-4 py-3 rounded-2xl flex gap-1">
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                   <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                 </div>
               </div>
            )}
            <div ref={scrollBottomRef} />
          </div>

          <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="flex-1 text-sm bg-slate-100 rounded-xl px-4 py-3 outline-none" 
              placeholder="Type a message..."
            />
            <button disabled={isSending || !input.trim()} className="bg-blue-600 text-white p-3 rounded-xl">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl text-white">
        {isOpen ? <X size={30} /> : <Bot size={32} />}
      </button>
    </div>
  );
};