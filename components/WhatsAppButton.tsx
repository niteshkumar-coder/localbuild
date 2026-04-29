
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+91 9472028969';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[\s+]/g, '')}`;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      className="fixed bottom-6 left-6 z-[100]"
    >
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all hover:scale-110 active:scale-95 border border-white/20"
        aria-label="Contact via WhatsApp"
      >
        {/* Pulsing Glow */}
        <span className="absolute inset-0 rounded-2xl bg-[#25D366]/40 animate-ping group-hover:animate-none"></span>
        
        <MessageCircle className="w-8 h-8 relative z-10" fill="currentColor" />

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
          <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-4 px-4 py-3 bg-slate-900 border border-slate-800 text-white text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap rounded-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Direct_WhatsApp_Link
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-6 -mt-1 border-8 border-transparent border-t-slate-900"></div>
        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
