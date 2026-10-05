import React from 'react';
import { Database, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { isDemoMode, setDemoMode } from '../lib/storage';

export default function SeedDemoBanner({ demoActive, setDemoActive, totalCount }) {
  const handleToggle = () => {
    const nextState = !demoActive;
    setDemoMode(nextState);
    setDemoActive(nextState);
  };

  return (
    <div style={{
      backgroundColor: demoActive ? 'rgba(234, 88, 12, 0.12)' : 'rgba(30, 41, 59, 0.6)',
      borderBottom: demoActive ? '1px solid rgba(234, 88, 12, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
      padding: '8px 16px',
      fontSize: '0.8rem',
      color: '#E2E8F0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {demoActive ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#FB923C',
              fontWeight: 600,
              background: 'rgba(234, 88, 12, 0.2)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              <AlertCircle size={14} /> DEMO SIMULATION MODE
            </span>
          ) : (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              color: '#34D399',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              <CheckCircle2 size={14} /> CLEAN PRODUCTION MODE
            </span>
          )}
          
          <span style={{ color: '#94A3B8' }}>
            {demoActive 
              ? `Loaded realistic multi-college campaign simulation (${totalCount} registrations across 5 days) for video review.`
              : 'Zero demo records. Ready to accept live student signups.'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleToggle}
            style={{
              background: demoActive ? 'rgba(234, 88, 12, 0.25)' : 'rgba(59, 130, 246, 0.2)',
              border: demoActive ? '1px solid rgba(234, 88, 12, 0.5)' : '1px solid rgba(59, 130, 246, 0.4)',
              color: demoActive ? '#FFEDD5' : '#93C5FD',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <RefreshCw size={12} />
            {demoActive ? 'Reset to Clean State' : 'Load Demo Simulation Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
