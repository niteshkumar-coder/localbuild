import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firestore';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (status: boolean) => void;
}

const AdminAccessModal: React.FC<AdminAccessModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Localbuild45090@' || password === 'Nitesh45090@') {
      db.adminLogin();
      onSuccess(true);
      onClose();
      navigate('/admin');
    } else {
      setError('ACCESS_DENIED: INVALID_CREDENTIALS');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-cyan-500 to-blue-500 animate-pulse"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="text-cyan-500 text-[10px] font-black tracking-[0.5em] uppercase mb-2">Security_Auth</div>
          <h2 className="text-xl font-black text-white uppercase tracking-tighter">Terminal Access</h2>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <input 
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER_MASTER_PASSWORD"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-center text-white font-mono text-sm tracking-widest focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-800"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest animate-pulse">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-slate-950 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Decrypt_Access
          </button>
        </form>
        
        <div className="mt-8 text-[8px] text-slate-700 font-mono text-center uppercase tracking-widest">
          Unauthorized access is logged and traced.
        </div>
      </div>
    </div>
  );
};

export default AdminAccessModal;
