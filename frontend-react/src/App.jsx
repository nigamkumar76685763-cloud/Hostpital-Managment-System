import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import DoctorCatalog from './components/DoctorCatalog';
import BookingSection from './components/BookingSection';
import WhyChooseUs from './components/WhyChooseUs';
import NewsletterCta from './components/NewsletterCta';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SlotBookingModal from './components/SlotBookingModal';
import PatientDashboard from './components/PatientDashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { name: 'Rahul Sharma', email: 'rahul.sharma@medicare.com' };
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [view, setView] = useState(() => {
    return window.location.hash.toLowerCase().includes('dashboard') ? 'dashboard' : 'home';
  });

  const navigateTo = (newView) => {
    setView(newView);
    if (newView === 'dashboard') {
      window.location.hash = 'dashboard';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase().includes('dashboard')) {
        setView('dashboard');
      } else {
        setView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Master Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-101',
      doctorId: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      cabin: 'Suite 302, Heart Wing, 3rd Floor',
      appointmentTime: '2026-09-15T14:30:00',
      reason: 'Regular Preventive Cardiovascular Checkup',
      fee: 800,
      token: '#A-14',
      status: 'CONFIRMED',
    },
    {
      id: 'apt-102',
      doctorId: 'Dr. David Anderson',
      specialty: 'Neurology',
      cabin: 'Suite 410, Neuro Science Wing, 4th Floor',
      appointmentTime: '2026-09-22T10:00:00',
      reason: 'Post-Concussion Sleep Cycle Review',
      fee: 950,
      token: '#B-08',
      status: 'CONFIRMED',
    },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigateTo('home');
  };

  // Smart Appointment Handler:
  // If on Dashboard -> open modal directly ON dashboard
  // If on Home -> scroll to in-page booking form
  const handleAppointmentClick = () => {
    if (view === 'dashboard') {
      setSelectedDoctor(null);
      setIsBookingModalOpen(true);
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (newApt) => {
    if (newApt) {
      setAppointments(prev => [newApt, ...prev]);
    }
    // Always keep user on dashboard so they see the result!
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#EDF3F8] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* STICKY TOP NAVBAR (ONLY ON HOME LANDING PAGE) */}
      {view === 'home' && (
        <Navbar
          onBookClick={handleAppointmentClick}
          onAuthClick={() => setIsAuthOpen(true)}
          user={user}
          currentView={view}
          setView={navigateTo}
        />
      )}

      {/* MAIN VIEW */}
      <main>
        {view === 'home' ? (
          <div>
            {/* 1. HERO MESH SECTION */}
            <HeroSection onBookClick={handleAppointmentClick} />

            {/* 2. COMMITTED TO EXCELLENCE (ABOUT) */}
            <AboutSection onExploreClick={scrollToServices} />

            {/* 3. EXPLORE OUR RANGE OF HEALTHCARE SERVICES */}
            <ServicesSection onSelectService={(dept) => {
              handleAppointmentClick();
            }} />

            {/* 4. OUR KEY HEALTHCARE SPECIALISTS */}
            <DoctorCatalog onSelectDoctor={(doc) => {
              setSelectedDoctor(doc);
              setIsBookingModalOpen(true);
            }} />

            {/* 5. SCHEDULE YOUR APPOINTMENT IN MINUTES */}
            <BookingSection 
              onBookingComplete={(newApt) => {
                if (newApt) setAppointments(prev => [newApt, ...prev]);
                navigateTo('dashboard');
              }}
              user={user}
              onAuthRequired={() => setIsAuthOpen(true)}
            />

            {/* 6. WHY PATIENTS CHOOSE MEDICARE+ */}
            <WhyChooseUs />

            {/* 7. GET EXPERT HEALTH TIPS (NEWSLETTER MESH CARD) */}
            <NewsletterCta />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <PatientDashboard 
              user={user} 
              onLogout={handleLogout}
              onBackHome={() => navigateTo('home')}
              onBookNew={() => {
                setSelectedDoctor(null);
                setIsBookingModalOpen(true);
              }}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          </div>
        )}
      </main>

      {/* 8. LUXURY DARK FOOTER (ONLY ON HOME LANDING PAGE) */}
      {view === 'home' && <Footer />}

      {/* MODALS */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(data) => setUser(data)}
      />

      {/* SLOT BOOKING MODAL (OPENS DIRECTLY ON DASHBOARD OR HOME) */}
      <SlotBookingModal
        isOpen={isBookingModalOpen}
        doctor={selectedDoctor}
        user={user}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedDoctor(null);
        }}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
