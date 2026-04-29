
import React, { useState, useEffect } from 'react';
import { db } from '../services/firestore';

const LeadPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenLeadPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenLeadPopup', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.addLead({
        ...formData,
        phone: 'N/A',
        message: 'Lead captured via 5-second auto-popup',
        serviceInterested: 'Free Consultation'
      });
      setIsSubmitted(true);
      setTimeout(() => setIsVisible(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-[fadeIn_0.5s_ease-out]">
      <div className="relative w-full max-w-md bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden transform animate-[scaleIn_0.4s_ease-out] border border-slate-800">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-950 rounded-full p-3 mb-6 shadow-sm border border-slate-800">
            <img src={LOGO_URL} alt="Local build" className="w-full h-full object-contain brightness-0 invert" />
          </div>

          {!isSubmitted ? (
            <>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Unlock Your <span className="text-cyan-500">Growth</span>
              </h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                Join 1,000+ local businesses scaling with Local build. Get a free AI strategy audit sent to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white font-bold placeholder:text-slate-700"
                />
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white font-bold placeholder:text-slate-700"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-cyan-500 transition-all shadow-xl mt-4 text-lg active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Submit_Request'}
                </button>
              </form>
            </>
          ) : (
            <div className="py-10 animate-bounce">
              <div className="w-16 h-16 bg-green-900/40 text-green-400 border border-green-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
              <h3 className="text-xl font-bold text-white uppercase tracking-widest">Expertise_Locked</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;
