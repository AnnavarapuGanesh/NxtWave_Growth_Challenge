import React from 'react';
import { Sparkles, Users, MessageSquare, BarChart2 } from 'lucide-react';

export default function Header({ currentView, setCurrentView, onOpenRegister, totalRegistrations }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)'
          }}>
            <Sparkles size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Nxt<span style={{ color: '#38BDF8' }}>Wave</span>
              </span>
              <span className="badge-live" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                <span className="badge-live-pulse" /> FREE WORKSHOP
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>AI Project in 60 Minutes</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setCurrentView('landing')}
            className={currentView === 'landing' ? 'btn-secondary' : ''}
            style={{
              background: currentView === 'landing' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              borderColor: currentView === 'landing' ? 'rgba(59, 130, 246, 0.4)' : 'transparent',
              color: currentView === 'landing' ? '#60A5FA' : '#94A3B8',
              fontSize: '0.875rem',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Overview
          </button>

          <button 
            onClick={() => setCurrentView('ai-hook')}
            style={{
              background: currentView === 'ai-hook' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              borderColor: currentView === 'ai-hook' ? 'rgba(59, 130, 246, 0.4)' : 'transparent',
              color: currentView === 'ai-hook' ? '#60A5FA' : '#94A3B8',
              fontSize: '0.875rem',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} color="#38BDF8" /> AI Idea Generator
          </button>

          <button 
            onClick={() => setCurrentView('whatsapp-kit')}
            style={{
              background: currentView === 'whatsapp-kit' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
              borderColor: currentView === 'whatsapp-kit' ? 'rgba(34, 197, 94, 0.4)' : 'transparent',
              color: currentView === 'whatsapp-kit' ? '#4ADE80' : '#94A3B8',
              fontSize: '0.875rem',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MessageSquare size={14} color="#4ADE80" /> WhatsApp Kit
          </button>

          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{
              background: currentView === 'dashboard' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              borderColor: currentView === 'dashboard' ? 'rgba(139, 92, 246, 0.4)' : 'transparent',
              color: currentView === 'dashboard' ? '#A78BFA' : '#94A3B8',
              fontSize: '0.875rem',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BarChart2 size={14} color="#A78BFA" /> Ambassador & Admin
          </button>
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={onOpenRegister}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.9rem' }}
          >
            Register Free
          </button>
        </div>
      </div>
    </header>
  );
}
