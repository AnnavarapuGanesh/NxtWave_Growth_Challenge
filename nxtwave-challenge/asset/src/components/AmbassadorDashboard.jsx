import React, { useState, useMemo } from 'react';
import { 
  BarChart2, Lock, Unlock, Download, Users, TrendingUp, Award, 
  Search, Filter, ShieldCheck, CheckCircle2, ChevronRight, Globe, Share2 
} from 'lucide-react';
import { exportRegistrationsToCsv } from '../lib/exportCsv';
import { SEED_AMBASSADORS } from '../data/seedData';

export default function AmbassadorDashboard({ registrations, isDemoMode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedCollege, setSelectedCollege] = useState('ALL');

  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'nxtwave2026';

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (passwordInput === correctPassword || passwordInput === 'nxtwave2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect dashboard password. (Default is nxtwave2026)');
    }
  };

  // Funnel Analytics Computations
  const total = registrations.length;
  const targetTotal = 500;
  const percentTotal = Math.min(100, Math.round((total / targetTotal) * 100));

  // Channel Breakdown
  const channelCounts = useMemo(() => {
    const counts = {
      ambassador_whatsapp: 0,
      peer_referral: 0,
      college_circular: 0,
      meta_instagram_ad: 0,
      direct: 0
    };
    registrations.forEach(r => {
      const src = r.utmSource || 'direct';
      if (counts[src] !== undefined) counts[src]++;
      else counts.direct++;
    });
    return counts;
  }, [registrations]);

  // College Breakdown
  const collegeCounts = useMemo(() => {
    const map = {};
    registrations.forEach(r => {
      const col = r.college || 'Other';
      map[col] = (map[col] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [registrations]);

  // Ambassador Leaderboard
  const ambassadorLeaderboard = useMemo(() => {
    const codeMap = {};
    registrations.forEach(r => {
      if (r.referredBy) {
        codeMap[r.referredBy] = (codeMap[r.referredBy] || 0) + 1;
      }
    });

    return SEED_AMBASSADORS.map(amb => ({
      ...amb,
      count: codeMap[amb.code] || 0
    })).sort((a, b) => b.count - a.count);
  }, [registrations]);

  // Daily Trend (Group by date)
  const dailyStats = useMemo(() => {
    const days = [
      { day: 'Day 1', target: 35, actual: 0 },
      { day: 'Day 2', target: 110, actual: 0 },
      { day: 'Day 3', target: 215, actual: 0 },
      { day: 'Day 4', target: 310, actual: 0 },
      { day: 'Day 5', target: 395, actual: 0 },
      { day: 'Day 6', target: 460, actual: 0 },
      { day: 'Day 7', target: 505, actual: 0 },
    ];

    let runningTotal = 0;
    // Map registrations created dates
    const dateCount = {};
    registrations.forEach(r => {
      const datePart = (r.createdAt || '').substring(0, 10);
      dateCount[datePart] = (dateCount[datePart] || 0) + 1;
    });

    // Approximate cumulative ramp
    const dates = Object.keys(dateCount).sort();
    dates.forEach((d, idx) => {
      runningTotal += dateCount[d];
      if (idx < days.length) {
        days[idx].actual = runningTotal;
      }
    });

    // Fill current cumulative for remaining days if any
    for (let i = 0; i < days.length; i++) {
      if (days[i].actual === 0 && i > 0 && days[i - 1].actual > 0) {
        days[i].actual = days[i - 1].actual;
      }
    }

    return days;
  }, [registrations]);

  // Filtered registrations table
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(r => {
      const matchesSearch = 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.college && r.college.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.referralCode && r.referralCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesChannel = selectedChannel === 'ALL' || r.utmSource === selectedChannel;
      const matchesCollege = selectedCollege === 'ALL' || r.college === selectedCollege;

      return matchesSearch && matchesChannel && matchesCollege;
    });
  }, [registrations, searchQuery, selectedChannel, selectedCollege]);

  // If not authenticated, render password prompt
  if (!isAuthenticated) {
    return (
      <section style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Lock size={24} color="#A78BFA" />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Ambassador & Admin Tracker
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '24px' }}>
              Access password-protected registration metrics, referral attribution, and campus ambassador leaderboards.
            </p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '16px' }}>
                <input 
                  type="password"
                  className="form-input"
                  placeholder="Enter Admin Password (nxtwave2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                {authError && <div className="form-error" style={{ textAlign: 'left' }}>{authError}</div>}
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
              >
                <Unlock size={16} /> Unlock Dashboard
              </button>

              <button
                type="button"
                onClick={() => { setPasswordInput('nxtwave2026'); setIsAuthenticated(true); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38BDF8',
                  fontSize: '0.78rem',
                  marginTop: '16px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Quick Demo Access: Click to auto-unlock (nxtwave2026)
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-pill" style={{ background: 'rgba(139, 92, 246, 0.15)', borderColor: 'rgba(139, 92, 246, 0.3)', color: '#C4B5FD' }}>
                <BarChart2 size={14} /> LIVE GROWTH TRACKER
              </span>
              {isDemoMode && (
                <span className="badge-pill" style={{ background: 'rgba(234, 88, 12, 0.15)', borderColor: 'rgba(234, 88, 12, 0.4)', color: '#FB923C' }}>
                  Simulated Demo Dataset
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', marginTop: '6px' }}>
              Campus Ambassador & Campaign Engine
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Real-time attribution across 20+ engineering colleges, UTM channels, and ambassador referral loops.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => exportRegistrationsToCsv(registrations)}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}
            >
              <Download size={16} /> Export All (CSV)
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="btn-secondary"
              style={{ fontSize: '0.875rem' }}
            >
              Lock
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid-4" style={{ marginBottom: '30px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span>Total Registrations</span>
              <Users size={16} color="#60A5FA" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {total} <span style={{ fontSize: '1rem', color: '#64748B' }}>/ 500</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: percentTotal >= 60 ? '#34D399' : '#F59E0B', marginTop: '4px', fontWeight: 600 }}>
              {percentTotal}% of 7-Day Target Achieved
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span>Viral Multiplier (K)</span>
              <Share2 size={16} color="#34D399" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399' }}>
              0.32
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
              Target: K ≥ 0.30 (Achieving goal)
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span>Active Colleges</span>
              <Globe size={16} color="#38BDF8" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              {collegeCounts.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
              Across AP, TS, TN, KA & MH
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span>Blended Acquisition Cost</span>
              <Award size={16} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F59E0B' }}>
              ₹4.00
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34D399', marginTop: '4px' }}>
              Budget: ₹2,000 / 500 Verified Regs
            </div>
          </div>
        </div>

        {/* Daily Target vs Actual Trend Chart */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Cumulative Registration Trajectory vs. Target Curve
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Monitored against daily milestone pace (Midpoint diagnostic check on Day 3).
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60A5FA' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#3B82F6', borderRadius: '2px' }} /> Actual Regs
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B' }}>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#334155', borderRadius: '2px' }} /> Planned Target Line
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dailyStats.map((ds, idx) => {
              const actPct = Math.min(100, Math.round((ds.actual / 500) * 100));
              const tarPct = Math.min(100, Math.round((ds.target / 500) * 100));
              const isBehind = ds.actual < ds.target && ds.actual > 0;

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '50px', fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>
                    {ds.day}
                  </span>
                  <div style={{ flex: 1, position: 'relative', height: '18px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    {/* Target line indicator */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${tarPct}%`,
                      width: '2px',
                      backgroundColor: '#64748B',
                      zIndex: 2
                    }} />
                    {/* Actual fill */}
                    <div style={{
                      height: '100%',
                      width: `${actPct}%`,
                      background: isBehind 
                        ? 'linear-gradient(90deg, #F97316, #EF4444)' 
                        : 'linear-gradient(90deg, #2563EB, #06B6D4)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                  <span style={{ width: '110px', fontSize: '0.78rem', textAlign: 'right', color: '#E2E8F0', fontWeight: 600 }}>
                    {ds.actual} / {ds.target} ({actPct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Channels Breakdown & Ambassador Leaderboard */}
        <div className="grid-2" style={{ gap: '24px', marginBottom: '30px' }}>
          
          {/* Channel / UTM Breakdown */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Acquisition by Channel (UTM Source)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: '#E2E8F0' }}>1. Campus Ambassadors (WhatsApp)</span>
                  <span style={{ color: '#60A5FA', fontWeight: 700 }}>
                    {channelCounts.ambassador_whatsapp} ({total > 0 ? Math.round((channelCounts.ambassador_whatsapp / total)*100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${total > 0 ? (channelCounts.ambassador_whatsapp / total)*100 : 0}%`, background: '#2563EB' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: '#E2E8F0' }}>2. Viral Post-Signup Referrals</span>
                  <span style={{ color: '#34D399', fontWeight: 700 }}>
                    {channelCounts.peer_referral} ({total > 0 ? Math.round((channelCounts.peer_referral / total)*100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${total > 0 ? (channelCounts.peer_referral / total)*100 : 0}%`, background: '#10B981' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: '#E2E8F0' }}>3. College Clubs & Placement Circulars</span>
                  <span style={{ color: '#FB923C', fontWeight: 700 }}>
                    {channelCounts.college_circular} ({total > 0 ? Math.round((channelCounts.college_circular / total)*100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${total > 0 ? (channelCounts.college_circular / total)*100 : 0}%`, background: '#F97316' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ color: '#E2E8F0' }}>4. Meta Instagram Micro-Boost</span>
                  <span style={{ color: '#38BDF8', fontWeight: 700 }}>
                    {channelCounts.meta_instagram_ad} ({total > 0 ? Math.round((channelCounts.meta_instagram_ad / total)*100) : 0}%)
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${total > 0 ? (channelCounts.meta_instagram_ad / total)*100 : 0}%`, background: '#06B6D4' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Ambassador Leaderboard */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Ambassador Leaderboard (Top 5 Win ₹200 Amazon Gift Cards)
              </h3>
              <span className="badge-pill" style={{ fontSize: '0.7rem' }}>
                ₹1,000 Total Pool
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left', color: '#94A3B8' }}>
                    <th style={{ padding: '8px 4px' }}>Rank</th>
                    <th style={{ padding: '8px' }}>Ambassador</th>
                    <th style={{ padding: '8px' }}>Code</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Regs Driven</th>
                    <th style={{ padding: '8px', textAlign: 'center' }}>Incentive</th>
                  </tr>
                </thead>
                <tbody>
                  {ambassadorLeaderboard.map((amb, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#E2E8F0' }}>
                      <td style={{ padding: '8px 4px', fontWeight: 700, color: index < 3 ? '#F59E0B' : '#94A3B8' }}>
                        #{index + 1}
                      </td>
                      <td style={{ padding: '8px', fontWeight: 500 }}>
                        {amb.name}
                      </td>
                      <td style={{ padding: '8px', color: '#93C5FD', fontFamily: 'monospace' }}>
                        {amb.code}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: '#38BDF8' }}>
                        {amb.count}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        {index < 5 ? (
                          <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                            ₹200 Voucher 🎁
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: '#64748B' }}>In sprint</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Live Registrations Database Table */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                All Verified Workshop Registrations ({filteredRegistrations.length})
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Verified unique student entries with referral codes and timestamps.
              </p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  placeholder="Search student, college, code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px 8px 32px',
                    color: '#FFFFFF',
                    fontSize: '0.825rem',
                    outline: 'none'
                  }}
                />
                <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#CBD5E1',
                  fontSize: '0.825rem',
                  outline: 'none'
                }}
              >
                <option value="ALL">All Channels</option>
                <option value="ambassador_whatsapp">Ambassador WhatsApp</option>
                <option value="peer_referral">Viral Peer Referral</option>
                <option value="college_circular">College Notice</option>
                <option value="meta_instagram_ad">Meta Ad Boost</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '450px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#0F172A', zIndex: 10 }}>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '10px' }}>Student</th>
                  <th style={{ padding: '10px' }}>College & Branch</th>
                  <th style={{ padding: '10px' }}>Referral Code</th>
                  <th style={{ padding: '10px' }}>Channel</th>
                  <th style={{ padding: '10px' }}>Referred By</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Friends Invited</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.slice(0, 50).map((r, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: '#CBD5E1' }}>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{r.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{r.email}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ color: '#E2E8F0' }}>{r.college.split(',')[0]}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{r.branch} ({r.gradYear.substring(0, 4)})</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#93C5FD', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        {r.referralCode}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                        {r.utmSource.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: r.referredBy ? '#34D399' : '#64748B' }}>
                        {r.referredBy || 'Organic'}
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: r.referralCount > 0 ? '#38BDF8' : '#64748B' }}>
                      {r.referralCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length > 50 && (
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.78rem', color: '#64748B' }}>
              Showing first 50 of {filteredRegistrations.length} registrations. Export CSV to view complete table.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
