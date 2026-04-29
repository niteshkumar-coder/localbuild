
import React, { useState, useRef, useEffect } from 'react';
import { generateMarketingAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am your Local build AI. How can I help you scale your business today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Using a representative robot icon URL that matches the user's reference
  const BOT_ICON_URL = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png';
  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateMarketingAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "System link interrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-inter">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[320px] md:w-[380px] h-[500px] bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-full bg-slate-900 p-1 border border-slate-800 shadow-sm">
                <img src={BOT_ICON_URL} alt="AI" className="w-full h-full object-contain brightness-110" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-black text-xs tracking-tight uppercase">LOCAL_AI_v3</h3>
                <p className="text-[9px] text-cyan-500 font-bold tracking-widest uppercase">Connected</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 text-cyan-400 rounded-2xl rounded-tl-none px-4 py-2 text-[10px] flex space-x-1 shadow-sm">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950">
            <div className="flex space-x-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask growth question..."
                className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:ring-1 focus:ring-cyan-500 focus:bg-slate-900 outline-none placeholder:text-slate-600 transition-all font-bold"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-cyan-600 text-white p-2 rounded-xl hover:bg-cyan-500 transition-all active:scale-95 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button (Smaller Size) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-12 h-12 rounded-full bg-slate-900 border-2 ${isOpen ? 'border-slate-800' : 'border-cyan-500'} shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {!isOpen ? (
          <div className="relative w-7 h-7">
            <img src={BOT_ICON_URL} alt="Bot" className="w-full h-full object-contain brightness-110" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-sm border border-slate-900">
              <span className="text-[6px] font-black text-white">AI</span>
            </div>
          </div>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FloatingChat;
