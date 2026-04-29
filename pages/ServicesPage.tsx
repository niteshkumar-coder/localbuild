
import React, { useEffect, useState } from 'react';
import { db } from '../services/firestore';
import { Service } from '../types';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    db.getServices().then(setServices);
  }, []);

  return (
    <div className="pb-20 bg-slate-950 min-h-screen text-slate-100">
      <header className="bg-slate-900/50 border-b border-slate-800 py-24 text-center digital-grid">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">Our Capabilities</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            We bridge the gap between traditional local marketing and high-tech AI implementation.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-slate-800 hover:shadow-2xl hover:border-cyan-500/50 transition-all group">
              <div className="w-16 h-16 bg-slate-800 text-3xl flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform border border-slate-700">
                {service.icon}
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-cyan-500 block mb-2">{service.category}</span>
              <h2 className="text-2xl font-bold mb-4 text-white">{service.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8">
                {['Real-time optimization', 'Advanced monitoring', 'Monthly reports'].map((item, i) => (
                  <li key={i} className="flex items-center text-xs text-slate-500">
                    <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-cyan-600 transition-all border border-slate-700">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
