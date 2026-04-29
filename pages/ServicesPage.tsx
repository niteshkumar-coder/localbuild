
import React, { useEffect, useState } from 'react';
import { db } from '../services/firestore';
import { Service } from '../types';
import ServiceDetailModal from '../components/ServiceDetailModal';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    db.getServices().then(setServices);
  }, []);

  return (
    <div className="pb-20 bg-slate-950 min-h-screen text-slate-100 selection:bg-cyan-500/30">
      <header className="relative bg-slate-950 border-b border-slate-900 py-32 text-center digital-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-cyan-500 text-[10px] font-black tracking-[0.5em] uppercase mb-4 animate-pulse">Engineering_Growth</div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter uppercase leading-none">
            Our <span className="text-slate-700">Capabilities.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-mono uppercase tracking-widest leading-relaxed">
            Standard protocols for high-performance <br className="hidden md:block" /> digital dominance.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map(service => (
            <div 
              key={service.id} 
              className="bg-slate-900/60 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 group flex flex-col h-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 text-3xl md:text-4xl flex items-center justify-center rounded-[1.5rem] mb-8 group-hover:scale-110 transition-all border border-slate-700 shadow-inner group-hover:shadow-cyan-500/10">
                {service.icon}
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-500 block mb-3 animate-pulse opacity-60 group-hover:opacity-100">{service.category}</span>
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-none">{service.title}</h2>
              <p className="text-slate-500 leading-relaxed text-xs md:text-sm mb-10 font-medium">{service.description}</p>
              
              <div className="mt-auto space-y-8">
                <ul className="space-y-3">
                  {service.features?.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start text-[10px] md:text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                      <svg className="w-4 h-4 mr-3 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                  {service.features && service.features.length > 3 && (
                    <li className="text-[10px] md:text-xs text-slate-600 font-mono italic pl-7">+{service.features.length - 3} more modules...</li>
                  )}
                </ul>

                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full py-4 md:py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-slate-950 transition-all border border-slate-800 hover:border-white shadow-xl active:scale-95"
                >
                  Learn_More_
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </div>
  );
};

export default ServicesPage;
