import React from 'react';
import { Plus, User } from 'lucide-react';

export default function Navbar({ onBookClick, onAuthClick, user, currentView, setView }) {
  const handleNavClick = (sectionId) => {
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#EDF3F8]/90 backdrop-blur-lg border-b border-slate-200/60 py-3 px-4 transition-all">
      <nav className="max-w-6xl mx-auto bg-white/95 rounded-full px-6 py-2.5 border border-slate-200/80 shadow-md flex items-center justify-between">
        {/* BRAND LOGO */}
        <div 
          onClick={() => setView('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/25 group-hover:scale-105 transition">
            <Plus className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">
            MediCare<span className="text-blue-600">+</span>
          </span>
        </div>

        {/* NAVIGATION LINKS WITH HOVER EFFECTS */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-semibold text-slate-600">
          <button 
            onClick={() => setView('home')} 
            className={`px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95 ${
              currentView === 'home' ? 'text-blue-600 font-bold bg-blue-50/50' : ''
            }`}
          >
            Home
          </button>
          
          <button 
            onClick={() => handleNavClick('about')} 
            className="px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95"
          >
            About
          </button>

          <button 
            onClick={() => handleNavClick('services')} 
            className="px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95"
          >
            Services
          </button>

          <button 
            onClick={() => handleNavClick('doctors')} 
            className="px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95"
          >
            Doctors
          </button>

          <button 
            onClick={() => handleNavClick('booking')} 
            className="px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95"
          >
            Schedule
          </button>

          {/* SINGLE DASHBOARD LINK WITH HOVER EFFECT */}
          <button 
            onClick={() => setView('dashboard')} 
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm active:scale-95 font-bold ${
              currentView === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-slate-800'
            }`}
          >
            Dashboard
          </button>

          <button 
            onClick={() => handleNavClick('contact')} 
            className="px-3 py-1.5 rounded-full transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/70 active:scale-95"
          >
            Contact
          </button>
        </div>

        {/* RIGHT ACTIONS: NO DUPLICATE DASHBOARD BUTTON */}
        <div className="flex items-center gap-3">
          {!user && (
            <button
              onClick={onAuthClick}
              className="text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition duration-200"
            >
              Sign In
            </button>
          )}

          {user && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>{user.name || user.email?.split('@')[0]}</span>
            </div>
          )}

          <button
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition duration-200 hover:scale-105"
          >
            Appointment
          </button>
        </div>
      </nav>
    </header>
  );
}
