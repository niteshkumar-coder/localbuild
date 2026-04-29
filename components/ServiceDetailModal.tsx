import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8 md:p-12">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-4xl md:text-5xl border border-slate-700 shadow-inner">
                {service.icon}
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-cyan-500 block mb-1">{service.category}</span>
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{service.title}</h2>
              </div>
            </div>

            <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-10 pb-10 border-b border-slate-800">
              {service.description}
            </p>

            <div className="space-y-6">
              <h3 className="text-cyan-500 text-xs font-black uppercase tracking-widest">Key_Deliverables</h3>
              <ul className="grid md:grid-cols-2 gap-4 md:gap-6">
                {service.features?.map((feature, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-start group"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm font-medium leading-tight">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-10 border-t border-slate-800 flex flex-col md:flex-row gap-4">
              <a 
                href="/#/contact"
                onClick={onClose}
                className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest text-center hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
              >
                Inquiry_Now
              </a>
              <button 
                onClick={onClose}
                className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-black uppercase tracking-widest border border-slate-700 hover:bg-slate-700 transition-all"
              >
                Back_to_Modules
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] text-slate-600 font-mono font-bold uppercase tracking-widest">Secured_Line</span>
            </div>
            <div className="text-[8px] text-slate-600 font-mono font-bold uppercase tracking-widest leading-none">v4.5.0-STABLE</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
