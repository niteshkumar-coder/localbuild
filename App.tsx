import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AITools from './pages/AITools';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadPopup from './components/LeadPopup';
import FloatingChat from './components/FloatingChat';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleLogin = (status: boolean) => {
    setIsAdmin(status);
    localStorage.setItem('isAdmin', status.toString());
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
        <ScrollToTop />
        <Navbar isAdmin={isAdmin} />
        <LeadPopup />
        <FloatingChat />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home onAdminLogin={handleLogin} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default App;