import React, { useState } from 'react';
import { db } from '../services/firestore';

interface AdminLoginProps {
  onLogin: (status: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Correct Master Password
    if (pass === 'Nitesh45090@' || pass === 'Localbuild45090@') {
      db.adminLogin();
      onLogin(true);
    } else {
      setError('Invalid master password. Access denied.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 digital-grid">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
        
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={LOGO_URL} alt="Logo" className="h-16 w-auto brightness-0 invert" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">Admin Command</h1>
            <p className="text-slate-400 text-sm font-medium">Secure access for agency managers only.</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Master Password</label>
            <input 
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white placeholder:text-slate-700 font-bold"
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-900/20 py-2 rounded-lg">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-white text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;