
import React, { useState, useRef, useEffect } from 'react';
import { generateMarketingAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AITools() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am your AI Marketing assistant from Local build. How can I help you grow your business on YouTube, Instagram, or Facebook today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI core." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-32 space-y-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="text-center space-y-6 relative z-10">
          <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.8em]">MODULE_CHAT_INTERFACE</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">AI Marketing <br /> <span className="text-slate-600">Sandbox.</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium lowercase tracking-wide">Interact with our autonomous intelligence nodes. Experience the future of local business automation.</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden h-[700px] flex flex-col relative z-10">
          <div className="bg-black/40 p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl p-2 overflow-hidden flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <img src={LOGO_URL} alt="Local build Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                <span className="font-black text-xs uppercase tracking-widest text-white">Local Build OS_</span>
              </div>
              <p className="text-[10px] text-cyan-500/70 font-black uppercase tracking-widest mt-0.5">Core:_Gemini_Ultra_3.0</p>
            </div>
          </div>
          <button 
            onClick={() => setMessages([{ role: 'ai', text: 'Protocol Reset. How can I help?' }])}
            className="text-[10px] font-black text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em] bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700"
          >
            Reset_System
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-8 bg-black/20">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-[2rem] p-6 text-sm leading-relaxed shadow-xl border ${
                m.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-tr-none border-cyan-500 shadow-cyan-900/10' 
                : 'bg-slate-900/80 text-slate-100 rounded-tl-none border-slate-800'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 text-cyan-500 rounded-[2rem] rounded-tl-none p-6 text-sm flex space-x-2 border border-slate-800 shadow-xl">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-75">●</span>
                <span className="animate-bounce delay-150">●</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 border-t border-slate-800 bg-black/60 backdrop-blur-md">
          <div className="flex space-x-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inject command here..."
              className="flex-grow bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-700 font-medium"
            />
            <button type="submit" disabled={isLoading} className="bg-white text-black px-10 rounded-2xl hover:bg-cyan-500 hover:text-white disabled:opacity-50 transition-all font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 group relative overflow-hidden">
              <span className="relative z-10">{isLoading ? 'Thinking...' : 'Execute_'}</span>
              <div className="absolute inset-0 bg-cyan-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}
