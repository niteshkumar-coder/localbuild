import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db } from '../services/firestore';
import { Service } from '../types';
import AdminAccessModal from '../components/AdminAccessModal';
import ServiceDetailModal from '../components/ServiceDetailModal';

interface HomeProps {
  onAdminLogin: (status: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onAdminLogin }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';
  const FOUNDER_IMAGE_URL = 'https://i.ibb.co/4ntzNcw5/me.png';
  const AI_OFFICE_BG = 'https://i.ibb.co/7NRTPMfD/5db7b729-d71d-45e1-86c8-f95552246475.png'; // Target image requested by user for background

  const reviews = [
    { name: "Rahul Sharma", role: "E-com Owner", text: "Local build changed my business. 300% growth in 3 months!", rating: 5, avatar: "https://i.pravatar.cc/150?u=1" },
    { name: "Ananya Iyer", role: "Content Creator", text: "The AI automation for YouTube is lethal. Best investment ever.", rating: 5, avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Vikram Singh", role: "Tech Founder", text: "Finally an agency that understands data-driven growth.", rating: 5, avatar: "https://i.pravatar.cc/150?u=3" },
    { name: "Sneha Kapoor", role: "Restaurant Chain", text: "Local SEO results were instant. My walk-ins doubled.", rating: 5, avatar: "https://i.pravatar.cc/150?u=4" },
    { name: "Arjun Mehta", role: "B2B SaaS", text: "The Lead Gen system is purely autonomous. Incredible.", rating: 5, avatar: "https://i.pravatar.cc/150?u=5" },
    { name: "Priya Das", role: "Fitness Coach", text: "AI Chatbots handle 90% of my queries now. Love it!", rating: 5, avatar: "https://i.pravatar.cc/150?u=6" },
  ];

  useEffect(() => {
    db.getServices().then(setServices);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30 font-inter overflow-x-hidden">
      {/* HERO SECTION - Full Screen Branding Wallpaper */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Full Screen Image Branding - Full brightness with subtle dark vignette */}
        <div className="absolute inset-0 z-0">
           <img 
             src={AI_OFFICE_BG} 
             alt="Local Build Digital Branding" 
             className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between pb-32 md:pb-52 gap-12 text-left">
           {/* Left Side: Digital Text */}
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="space-y-6 max-w-2xl"
           >
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center space-x-3 text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase"
              >
                <span className="w-8 h-[1px] bg-cyan-500/50"></span>
                <span>System_Status: Operational</span>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="space-y-4 border-l-2 border-cyan-500/60 pl-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] font-mono">
                  WE BUILD, SCALE <br />
                  <span className="text-cyan-400 flex items-center gap-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                    <span className="text-sm font-bold text-cyan-300 animate-pulse">[01]</span> & AUTOMATE
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">YOUR BUSINESS.</span>
                </h1>
                <p className="text-cyan-300/80 text-xs md:text-sm font-mono max-w-md mt-6 font-bold uppercase tracking-[0.2em] leading-relaxed">
                  <span className="text-cyan-500 opacity-60">//</span> High-performance AI implementations <br /> 
                  <span className="text-cyan-500 opacity-60">//</span> for the next generation of local elites.
                </p>
              </motion.div>
           </motion.div>

           {/* Right Side: Responsive Buttons */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="flex flex-col gap-4 min-w-[260px]"
           >
                <Link 
                  to="/contact" 
                  className="group relative px-8 py-5 bg-white text-slate-950 rounded-md font-mono font-black uppercase tracking-[0.2em] text-[12px] hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.4)] active:scale-95 flex items-center justify-between border-2 border-white hover:border-cyan-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-cyan-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10"></div>
                  <span className="relative z-10">Initialize_System</span>
                  <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-5 bg-slate-950/80 backdrop-blur-2xl border-2 border-slate-700 text-cyan-400 rounded-md font-mono font-black uppercase tracking-[0.2em] text-[12px] hover:bg-slate-900 hover:border-cyan-500 hover:text-cyan-300 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-95 text-center flex items-center justify-center gap-3"
                >
                  <span>Our_Modules</span>
                  <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-[10px] border border-cyan-500/30">[v3.0]</span>
                </Link>
           </motion.div>
        </div>

        {/* Extreme Peripheral Glows for Digital Depth */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-[180px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[180px]"></div>
      </section>

      {/* SERVICES DISPLAY SECTION */}
      <section className="relative py-20 md:py-40 px-4 border-t border-slate-800 bg-slate-950 digital-grid">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-28 gap-4 md:gap-8">
            <div className="space-y-2 md:space-y-4">
              <div className="text-cyan-500 text-[8px] md:text-xs font-black uppercase tracking-[0.6em] animate-pulse">SYSTEM_MODULARITY</div>
              <h2 className="text-3xl md:text-7xl font-black tracking-tighter text-white">Full Service <br className="hidden md:block" /> <span className="text-slate-500">Intelligence.</span></h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {services.map((service, idx) => (
              <div key={service.id} className="group relative p-8 md:p-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl md:rounded-[3.5rem] hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-3xl flex items-center justify-center text-2xl md:text-5xl mb-6 md:mb-12 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-6 group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-tight">{service.title}</h3>
                <p className="text-slate-500 text-[10px] md:text-base leading-snug md:leading-relaxed mb-6 md:mb-12 opacity-80">{service.description}</p>
                
                <div className="mt-auto space-y-6">
                  <ul className="space-y-2 hidden md:block">
                    {service.features?.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                        <svg className="w-4 h-4 mr-2 text-cyan-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="text-[10px] md:text-xs font-black text-cyan-400 uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                    >
                      Learn_More_
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <Link to="/contact" className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest hover:text-cyan-500 transition-all">
                      Deploy_
                    </Link>
                  </div>
                </div>

                {/* Digital accent */}
                <div className="absolute top-0 right-0 p-2 opacity-10 font-mono text-[10px] text-cyan-500 hidden md:block">
                  MOD_0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ServiceDetailModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      </section>


      {/* 1000+ REVIEWS INFINITE WALL SECTION */}
      <section className="relative py-20 md:py-40 px-4 border-t border-slate-800 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-10 md:mb-20">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-950/20 border border-green-800/50 rounded-full">
              <span className="text-green-500 text-[8px] md:text-[10px] font-black tracking-widest uppercase">Verified System Trust</span>
            </div>
            <h2 className="text-3xl md:text-8xl font-black tracking-tighter text-white">
              1000+ <span className="text-cyan-500">Elite Reviews.</span>
            </h2>
          </div>
        </div>

        {/* Infinite Marquee - Single Line for All Screens */}
        <div className="relative flex overflow-x-hidden group mt-10">
          <div className="flex py-6 md:py-12 animate-marquee whitespace-nowrap gap-4 md:gap-8 group-hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews, ...reviews].map((rev, i) => (
              <div key={i} className="inline-block w-[260px] md:w-[350px] p-5 md:p-8 bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-2xl md:rounded-[2.5rem] hover:border-cyan-500 hover:bg-slate-900/60 transition-all duration-300">
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-slate-700">
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-bold text-sm md:text-lg truncate">{rev.name}</span>
                    <span className="text-cyan-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none mt-1">{rev.role}</span>
                  </div>
                </div>
                <div className="flex space-x-1 mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-500 text-[10px] md:text-sm">★</span>
                  ))}
                </div>
                <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed italic whitespace-normal line-clamp-3 md:line-clamp-none">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-32 border-t border-slate-800 pt-10 md:pt-20">
          {[
            { label: "HAPPY CLIENTS", val: "1000+" },
            { label: "AI AUTOMATIONS", val: "2.4K" },
            { label: "LEADS GENERATED", val: "850K" },
            { label: "ROI INCREASE", val: "310%" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-slate-900/20 border border-slate-800/30 rounded-lg md:bg-transparent md:border-0 md:p-0">
              <div className="text-2xl md:text-6xl font-black text-white font-mono">{stat.val}</div>
              <div className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA - UPDATED COLOR AND SIZE */}
      <section className="relative py-40 bg-slate-900 overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at:50%_0%,_rgba(34,211,238,0.15)_0%,_transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]">
            READY TO DEPLOY <br /> <span className="text-cyan-500">YOUR GROWTH OS?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-10">
            <Link to="/contact" className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95">
              Initialize Now
            </Link>
          </div>
        </div>
        
        {/* Terminal Access Button - Visible at bottom right */}
        <div className="absolute bottom-6 right-6 z-50">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[10px] font-mono text-slate-400 hover:text-cyan-400 transition-all uppercase tracking-[0.4em] bg-slate-900/50 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:border-cyan-500/50"
          >
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></span>
            Terminal_Access_v4.5
          </button>
        </div>

        <AdminAccessModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={onAdminLogin}
        />
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow { animation: spin 25s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse 30s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
        
        .scanner-line { animation: scan 4s linear infinite; }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
        
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.95); } }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;