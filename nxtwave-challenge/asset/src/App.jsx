import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SeedDemoBanner from './components/SeedDemoBanner';
import Hero from './components/Hero';
import Agenda from './components/Agenda';
import AiIdeaGenerator from './components/AiIdeaGenerator';
import RegistrationModal from './components/RegistrationModal';
import ThankYouReferral from './components/ThankYouReferral';
import AmbassadorDashboard from './components/AmbassadorDashboard';
import WhatsAppMessageKit from './components/WhatsAppMessageKit';
import FaqSection from './components/FaqSection';
import { getRegistrations, isDemoMode, setDemoMode, getCurrentUser } from './lib/storage';
import { getUrlParams } from './lib/analytics';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [demoActive, setDemoActive] = useState(true);

  // Initialize data
  useEffect(() => {
    // If first time opening, initialize demo data so the app looks alive for reviewer
    const raw = localStorage.getItem('nxtwave_registrations_v1');
    if (!raw || JSON.parse(raw).length === 0) {
      setDemoMode(true);
      setDemoActive(true);
    } else {
      setDemoActive(isDemoMode());
    }

    const current = getCurrentUser();
    if (current) {
      setActiveStudent(current);
    }

    const loadData = () => {
      const data = getRegistrations(true);
      setRegistrations(data);
      setDemoActive(isDemoMode());
    };

    loadData();
    window.addEventListener('nxtwave_storage_updated', loadData);
    return () => window.removeEventListener('nxtwave_storage_updated', loadData);
  }, []);

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleRegistrationSuccess = (student) => {
    setIsRegisterOpen(false);
    setActiveStudent(student);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Simulation Demo Banner (Top) */}
      <SeedDemoBanner 
        demoActive={demoActive} 
        setDemoActive={setDemoActive} 
        totalCount={registrations.length} 
      />

      {/* Navigation Header */}
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenRegister={handleOpenRegister}
        totalRegistrations={registrations.length}
      />

      {/* Main Content Views */}
      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <>
            <Hero 
              onOpenRegister={handleOpenRegister} 
              onOpenAiHook={() => setCurrentView('ai-hook')}
              totalRegistrations={registrations.length}
            />
            <Agenda onOpenRegister={handleOpenRegister} />
            <AiIdeaGenerator onOpenRegister={handleOpenRegister} />
            <FaqSection onOpenRegister={handleOpenRegister} />
          </>
        )}

        {currentView === 'ai-hook' && (
          <div style={{ padding: '20px 0' }}>
            <AiIdeaGenerator onOpenRegister={handleOpenRegister} />
          </div>
        )}

        {currentView === 'whatsapp-kit' && (
          <WhatsAppMessageKit />
        )}

        {currentView === 'dashboard' && (
          <AmbassadorDashboard 
            registrations={registrations} 
            isDemoMode={demoActive}
          />
        )}
      </main>

      {/* Registration Modal Form */}
      <RegistrationModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Thank You & Viral Referral Modal */}
      {activeStudent && (
        <ThankYouReferral 
          student={activeStudent}
          onClose={() => setActiveStudent(null)}
        />
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: '#070B16',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '36px 0',
        color: '#64748B',
        fontSize: '0.825rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '4px' }}>
              NxtWave Growth Intern – Growth Challenge (Round 1)
            </div>
            <div>
              Built by <strong style={{ color: '#93C5FD' }}>Ganesh</strong> (B.Tech CSE, Graduating 2027) • Referral-Powered Registration Engine
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentView('dashboard')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              Ambassador Tracker (nxtwave2026)
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentView('whatsapp-kit')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              WhatsApp Kit
            </button>
            <span>•</span>
            <a 
              href="https://forms.gle/xEtJSgJfeqvnxv8q6" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#38BDF8', textDecoration: 'none' }}
            >
              Submission Form
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
