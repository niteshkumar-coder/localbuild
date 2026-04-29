
import React, { useEffect, useState } from 'react';
import { db } from '../services/firestore';
import { Lead } from '../types';

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const LOGO_URL = 'https://i.ibb.co/B5xk939r/logo-modified-removebg-preview-removebg-preview.png';

  const fetchLeads = async () => {
    setLoading(true);
    await db.ensureAuth();
    const data = await db.getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleMarkResponded = async (id: string) => {
    await db.markLeadResponded(id);
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await db.deleteLead(id);
      fetchLeads();
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-100 digital-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <img src={LOGO_URL} alt="Logo" className="h-10 w-auto brightness-0 invert" />
            <h1 className="text-2xl font-black text-white">Command Center</h1>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('isAdmin'); window.location.reload(); }}
            className="px-6 py-2 bg-red-900/20 text-red-400 rounded-xl text-sm font-bold hover:bg-red-900/40 transition-all border border-red-800/50"
          >
            Terminal Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Leads</h3>
            <p className="text-3xl font-black text-white">{leads.length}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Pending Response</h3>
            <p className="text-3xl font-black text-orange-500">{leads.filter(l => !l.responded).length}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Latest Inquiry</h3>
            <p className="text-sm font-medium text-slate-400 truncate">{leads[0]?.name || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-sm border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
            <h2 className="font-bold text-white">Recent Inquiries</h2>
            <button onClick={fetchLeads} className="text-cyan-400 text-sm hover:underline font-bold uppercase tracking-widest text-[10px]">Refresh_List</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Identity_Name</th>
                  <th className="px-6 py-4">Network_Email</th>
                  <th className="px-6 py-4">Service_Classification</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-20 text-slate-600 font-mono tracking-widest">_LOADING_SYSTEM_DATA...</td></tr>
                ) : leads.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-20 text-slate-600 font-mono tracking-widest">_NO_PAYLOADS_FOUND</td></tr>
                ) : leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      {lead.responded ? (
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-md text-[10px] font-bold border border-green-800/50">RESPONDED</span>
                      ) : (
                        <span className="px-2 py-1 bg-orange-900/30 text-orange-400 rounded-md text-[10px] font-bold border border-orange-800/50">PENDING</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-sm uppercase font-mono">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-cyan-500 font-mono italic">{lead.email}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black px-3 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all uppercase tracking-tighter">{lead.serviceInterested}</span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-slate-500 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button 
                        onClick={() => handleMarkResponded(lead.id)}
                        disabled={lead.responded}
                        className="text-[10px] font-black text-white hover:text-cyan-400 disabled:opacity-20 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded border border-slate-700"
                      >
                        Log_Resolve
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)}
                        className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest px-3 py-1 border border-transparent hover:border-red-900/50 rounded"
                      >
                        PURGE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
