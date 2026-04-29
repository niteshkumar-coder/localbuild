
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';
  const [showPolicy, setShowPolicy] = useState(false);

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/localbuild1',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/localbuild1?igsh=YzljYTk1ODg3Zg==',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@localbuild?si=n9_3FntuX7pfD5Oy',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/NiteshK7765796',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nitesh-kumar-27428a397?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg'
    }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-slate-800 p-1">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-white">
                Local <span className="text-cyan-500">build</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
              Empowering local businesses with high-tier artificial intelligence and lethal growth marketing strategies.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-slate-900 p-2 flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all border border-slate-800 hover:border-cyan-400 shadow-sm"
                >
                  <img 
                    src={social.logoUrl} 
                    alt={social.name} 
                    className="w-full h-full object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.2em] border-l-2 border-cyan-500 pl-3">Growth Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Google Ads Masterclass</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Meta Ads Engine</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">E-com Management</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">GMB Profile Building</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.2em] border-l-2 border-cyan-500 pl-3">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Our Insights</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Partner With Us</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Portal</Link></li>
              <li>
                <button 
                  onClick={() => setShowPolicy(true)} 
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Privacy & Data Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h4 className="font-black text-white mb-4 text-sm tracking-tight">Growth Newsletter</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">Get AI & marketing updates for local scaling.</p>
            <div className="flex space-x-2">
              <input type="email" placeholder="Email" className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-xs flex-grow outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder:text-slate-500" />
              <button className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-black hover:bg-cyan-600 transition-all active:scale-95">Sync</button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 font-bold text-center md:text-left">
          <p className="tracking-wide">© 2024 LOCAL BUILD MARKETING AGENCY. BUILT FOR THE ELITE.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-slate-500">Powered by Gemini 3.0</span>
            <span className="hidden sm:inline tracking-[0.3em] uppercase text-[9px] font-black text-cyan-600">LETHAL INTELLIGENCE</span>
          </div>
        </div>
      </div>

      {/* Simple Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar relative shadow-2xl">
            <button 
              onClick={() => setShowPolicy(false)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-black text-white mb-8">Privacy & Data Policy</h2>
            <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
              <p>At <strong>Local build</strong>, your privacy is integral to our system architecture. We handle data with the same precision we apply to our marketing algorithms.</p>
              <h3 className="text-white font-black uppercase tracking-widest text-xs mt-8">1. Data Collection</h3>
              <p>We only collect data that is essential for delivering growth results: name, contact info, and business goals. We do not sell or trade your data to 3rd party brokers.</p>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">2. AI Optimization</h3>
              <p>Anonymized campaign data is used to train our internal Local build intelligence models to ensure your business stays ahead of the competition.</p>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">3. Security</h3>
              <p>Our infrastructure is protected by multi-layered encryption protocols. Your data is housed within secure Firebase environments.</p>
              <h3 className="text-white font-black uppercase tracking-widest text-xs">4. Contact</h3>
              <p>For any queries regarding your data footprint, contact us at localbuildhelp@gmail.com.</p>
            </div>
            <button 
              onClick={() => setShowPolicy(false)}
              className="mt-12 w-full py-4 bg-slate-800 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-cyan-600 transition-all"
            >
              Close Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
