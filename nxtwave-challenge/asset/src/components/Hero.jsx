import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Award, ShieldCheck, CheckCircle2, Sparkles, Users } from 'lucide-react';

export default function Hero({ onOpenRegister, onOpenAiHook, totalRegistrations }) {
  // Countdown to Saturday 7:00 PM
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progressPct = Math.min(100, Math.round((totalRegistrations / 500) * 100));

  return (
    <section style={{ padding: '60px 0 40px 0', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '960px' }}>
        
        {/* Top Scarcity Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <span className="badge-pill">
            <span className="badge-live-pulse" />
            LIVE ONLINE WORKSHOP • SATURDAY @ 7:00 PM IST
          </span>
          <span style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 600 }}>
            ⚡ Only 500 Seats Available
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '20px',
          color: '#FFFFFF'
        }}>
          Build Your First <span className="gradient-text">AI Project</span> <br />
          in <span className="gradient-text-gold">60 Minutes</span>
        </h1>

        {/* Subheading Addressing Placement Anxiety */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#CBD5E1',
          maxWidth: '780px',
          margin: '0 auto 32px auto',
          lineHeight: 1.6
        }}>
          Recruiters are rejecting ToDo apps and generic Weather clones. Join 500+ final-year engineering students to build, test, and deploy a live, production AI project on GitHub & Vercel in one live session.
        </p>

        {/* Live Funnel Progress Bar */}
        <div className="glass-panel" style={{
          maxWidth: '560px',
          margin: '0 auto 32px auto',
          padding: '16px 20px',
          background: 'rgba(15, 23, 42, 0.75)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.85rem' }}>
            <span style={{ color: '#E2E8F0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="#38BDF8" /> Workshop Seat Allocation:
            </span>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>
              {totalRegistrations} / 500 Seats Claimed ({progressPct}%)
            </span>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
            <span>Target: 500 Final-Year Engineers</span>
            <span style={{ color: '#F87171', fontWeight: 600 }}>Closing soon</span>
          </div>
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          <button 
            onClick={onOpenRegister}
            className="btn-primary"
            style={{ fontSize: '1.05rem', padding: '15px 32px' }}
          >
            Claim Your Free Seat Now <ArrowRight size={18} />
          </button>

          <button 
            onClick={onOpenAiHook}
            className="btn-secondary"
            style={{ fontSize: '1rem', padding: '14px 24px' }}
          >
            <Sparkles size={16} color="#38BDF8" /> Get Personalized AI Idea
          </button>
        </div>

        {/* Countdown Timer */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '10px 20px',
          marginBottom: '48px'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} color="#60A5FA" /> Registration Closes In:
          </span>
          <div style={{ display: 'flex', gap: '10px', fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF' }}>
            <div><span style={{ color: '#60A5FA' }}>{timeLeft.days}</span>d</div>
            <div>:</div>
            <div><span style={{ color: '#60A5FA' }}>{timeLeft.hours}</span>h</div>
            <div>:</div>
            <div><span style={{ color: '#60A5FA' }}>{timeLeft.minutes}</span>m</div>
            <div>:</div>
            <div><span style={{ color: '#60A5FA' }}>{timeLeft.seconds}</span>s</div>
          </div>
        </div>

        {/* 3 Core Value Props Cards */}
        <div className="grid-3" style={{ textAlign: 'left' }}>
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <CheckCircle2 size={22} color="#3B82F6" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Live Deployed AI Project
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Walk away with a live Vercel URL and GitHub repository to demo live in technical interviews.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <ShieldCheck size={22} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Zero AI Pre-requisites
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
              No heavy machine learning math or GPU required. We use modern LLM APIs with starter scaffolding.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <Award size={22} color="#F97316" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Verifiable Certificate
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
              Official NxtWave digital certificate with verification QR code for LinkedIn & college placement records.
            </p>
          </div>
        </div>

        {/* Participating Colleges Ticker */}
        <div style={{ marginTop: '40px', padding: '16px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Engineering Students Joining From Top Campuses:
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 500 }}>
            <span>🏛️ CBIT Hyderabad</span>
            <span>•</span>
            <span>🏛️ VNR VJIET</span>
            <span>•</span>
            <span>🏛️ GVPCE Vizag</span>
            <span>•</span>
            <span>🏛️ BMSCE Bangalore</span>
            <span>•</span>
            <span>🏛️ VRSEC Vijayawada</span>
            <span>•</span>
            <span>🏛️ DSCE Bangalore</span>
            <span>•</span>
            <span>🏛️ VIT Pune</span>
            <span>•</span>
            <span>🏛️ PSG Tech</span>
          </div>
        </div>

      </div>
    </section>
  );
}
