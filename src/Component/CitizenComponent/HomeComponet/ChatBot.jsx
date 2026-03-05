import { Bot, Send, X, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_AI;
const COMPANY_ID = import.meta.env.VITE_COMPANY_ID || "f7e9efb6-7e73-4fea-bcd7-c1096f77abee";

export const ChatBot = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: content.aiWelcome }]);
  const [playingAudio, setPlayingAudio] = useState(null);

  const scrollBottomRef = useRef(null);
  const audioRef = useRef(new Audio());

  // Professional Scroll Management
  const scrollToBottom = useCallback(() => {
    if(!scrollBottomRef?.current) return
    scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Audio Cleanup on Unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleAudio = (url) => {
    if (playingAudio === url) {
      audioRef.current.pause();
      setPlayingAudio(null);
    } else {
      audioRef.current.src = url;
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
      setPlayingAudio(url);
      audioRef.current.onended = () => setPlayingAudio(null);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmedInput }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: trimmedInput, 
          top_k: 5, 
          company_id: COMPANY_ID, 
          type: "text" 
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: data.answer || "I'm sorry, I couldn't process that.", 
        audio: data.audio_url 
      }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: "I'm having trouble connecting. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-[1000] flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-80 md:w-[400px] h-[400px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{content.aiTitle}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  {!isLoading && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                  <span className="text-[10px] text-blue-100 font-medium  tracking-wider">
                    {isLoading ? 
                   
                    <div className="  px-4 py-3 items-center rounded-2xl flex gap-1 shadow-sm">
                       AI is thinking
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                </div>
                    
                    
                    : "Online"}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}>
                  {msg.text}
                  {msg.audio && (
                    <button 
                      onClick={() => toggleAudio(msg.audio)}
                      className="mt-3 flex items-center gap-2 text-[10px] font-bold py-1.5 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      {playingAudio === msg.audio ? <Pause size={12} /> : <Play size={12} />}
                      {playingAudio === msg.audio ? "PAUSE" : "LISTEN"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={scrollBottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={content.aiPlaceholder}
              className="flex-1 text-sm bg-slate-100 border-none rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-slate-900 rotate-90" : "bg-blue-600 hover:scale-110"
        }`}
      >
        {isOpen ? <X size={30} className="text-white" /> : <Bot size={32} className="text-white" />}
      </button>
    </div>
  );
};