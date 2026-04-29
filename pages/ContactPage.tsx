
import React, { useState } from 'react';
import { db } from '../services/firestore';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceInterested: 'General Inquiry'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await db.addLead(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', serviceInterested: 'General Inquiry' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.8em]">NODE_INITIALIZATION</div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Let's build <br /> <span className="text-slate-500">extraordinary.</span></h1>
              <p className="text-xl text-slate-400 max-w-md font-medium leading-relaxed">Secure your position in the upcoming digital landscape. Audit your business for AI readiness today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-3xl text-2xl transition-all group-hover:bg-cyan-950 group-hover:border-cyan-500 shadow-sm">📍</div>
                <div>
                   <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-2">Main Office</h3>
                   <p className="text-white font-bold leading-tight">Block A, Mukharjee Market,<br />Karol Bagh, Delhi</p>
                </div>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-3xl text-2xl transition-all group-hover:bg-cyan-950 group-hover:border-cyan-500 shadow-sm">📞</div>
                <div>
                   <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-2">Phone</h3>
                   <p className="text-white font-bold leading-tight">+91 9472028969</p>
                </div>
              </div>
              <div className="space-y-4 group">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-3xl text-2xl transition-all group-hover:bg-cyan-950 group-hover:border-cyan-500 shadow-sm">✉️</div>
                <div>
                   <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-2">Email</h3>
                   <p className="text-white font-bold leading-tight">localbuildhelp@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[3rem] overflow-hidden h-80 bg-slate-900 relative group grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair border border-slate-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="bg-slate-950/80 backdrop-blur-md px-8 py-3 rounded-full shadow-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white border border-slate-800">Open_Visual_Map</span>
              </div>
              <img src="https://picsum.photos/seed/map/1200/800" className="w-full h-full object-cover opacity-30 scale-105 group-hover:scale-100 transition-transform duration-1000" alt="map" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>
            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] shadow-2xl p-12 md:p-16 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
              
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Deploy Node Inquiry</h2>
              <p className="text-slate-400 text-sm mb-12 font-medium">Standard submission protocol. Response within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity_Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all font-bold text-white placeholder:text-slate-700"
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Network_Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all font-bold text-white placeholder:text-slate-700"
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure_Phone_Link</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all font-bold text-white placeholder:text-slate-700"
                      placeholder="+91 000-000-0000"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Service_Classification</label>
                    <select 
                      value={formData.serviceInterested}
                      onChange={(e) => setFormData({...formData, serviceInterested: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all font-bold text-white appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900">Network Marketing Optimization</option>
                      <option className="bg-slate-900">Google AI Digital Profile</option>
                      <option className="bg-slate-900">AI Chatbots</option>
                      <option className="bg-slate-900">Local SEO</option>
                      <option className="bg-slate-900">Predictive Analytics</option>
                      <option className="bg-slate-900">Web Design</option>
                      <option className="bg-slate-900">General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Data_Payload_Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/50 outline-none transition-all font-bold text-white placeholder:text-slate-700 resize-none"
                    placeholder="Brief objective summary..."
                  />
                </div>
                
                {status === 'success' ? (
                  <div className="bg-green-900/30 border border-green-800 text-green-400 p-6 rounded-3xl font-black text-sm text-center animate-bounce uppercase tracking-widest">
                    ✅ Inquiry_Transmission_Success
                  </div>
                ) : (
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-white text-slate-950 rounded-2xl py-6 font-black text-sm uppercase tracking-[0.3em] hover:bg-cyan-500 hover:text-white transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Transmitting...' : 'Initialize_Submission'}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
