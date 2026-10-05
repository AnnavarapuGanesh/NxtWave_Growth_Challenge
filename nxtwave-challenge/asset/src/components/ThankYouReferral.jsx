import React, { useState, useEffect } from 'react';
import { CheckCircle2, Share2, Copy, Download, Users, Gift, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getShareUrl } from '../lib/analytics';
import { getReferralStats, registerStudent } from '../lib/storage';

export default function ThankYouReferral({ student, onClose }) {
  if (!student) return null;

  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ count: 0, referredStudents: [] });
  const [simulating, setSimulating] = useState(false);

  const referralCode = student.referralCode || 'NXT-SAMPLE';
  const shareUrl = getShareUrl(referralCode);

  const updateStats = () => {
    const s = getReferralStats(referralCode);
    setStats(s);
  };

  useEffect(() => {
    updateStats();
    const handleUpdate = () => updateStats();
    window.addEventListener('nxtwave_storage_updated', handleUpdate);
    return () => window.removeEventListener('nxtwave_storage_updated', handleUpdate);
  }, [referralCode]);

  const count = stats.count;
  const target = 3;
  const progressPct = Math.min(100, Math.round((count / target) * 100));
  const isUnlocked = count >= target;

  const prefilledWhatsappText = encodeURIComponent(
    `Hey! 🚀 I just registered for NxtWave's free live workshop "Build Your First AI Project in 60 Minutes" to add a real AI project to my resume for campus placements.\n\nIt's 100% free and includes an official certificate. Grab your free seat using my invite link:\n${shareUrl}`
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper for demo video: allows Ganesh to click "Simulate Friend Signup" during video recording
  const handleSimulateFriend = async () => {
    setSimulating(true);
    const mockNames = ["Rohan Verma", "Ananya Reddy", "Karthik Iyer", "Sneha Rao", "Varun Sharma"];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const mockEmail = `friend.${Date.now()}@college.edu`;
    const mockPhone = `9${Math.floor(Math.random() * 900000000 + 100000000)}`;

    await registerStudent({
      name: randomName,
      email: mockEmail,
      whatsapp: mockPhone,
      college: student.college,
      branch: student.branch,
      gradYear: student.gradYear,
      referredBy: referralCode,
      utmSource: 'peer_referral'
    });

    setSimulating(false);
    updateStats();

    if (count + 1 >= 3) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#0F172A',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        borderRadius: '16px',
        padding: '30px',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9)',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        {/* Top Success Badge */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid #10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <CheckCircle2 size={32} color="#10B981" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
            You're Confirmed, {student.name.split(' ')[0]}! 🎉
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
            We've sent your entry ticket and calendar invite to <strong style={{ color: '#E2E8F0' }}>{student.email}</strong>
          </p>
        </div>

        {/* VIRAL REFERRAL ENGINE CARD */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Gift size={20} color="#38BDF8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
              Referral Reward: VIP AI Project Pack
            </h3>
          </div>

          <p style={{ fontSize: '0.825rem', color: '#CBD5E1', marginBottom: '16px', lineHeight: 1.5 }}>
            Invite 3 engineering batchmates to unlock the <strong>VIP AI Project Pack</strong> (50 Resume AI Project Ideas + Architecture Blueprints + Interview Talking Points).
          </p>

          {/* Progress Bar */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
              <span style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} color="#60A5FA" /> Your Referrals:
              </span>
              <span style={{ color: isUnlocked ? '#34D399' : '#38BDF8' }}>
                {count} of {target} Batchmates Joined ({progressPct}%)
              </span>
            </div>

            <div className="progress-bar-container" style={{ height: '12px' }}>
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${progressPct}%`,
                  background: isUnlocked 
                    ? 'linear-gradient(90deg, #10B981, #059669)' 
                    : 'linear-gradient(90deg, #3B82F6, #06B6D4)'
                }} 
              />
            </div>
          </div>

          {/* Reward Status */}
          {isUnlocked ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10B981',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ color: '#34D399', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                🌟 VIP PROJECT PACK UNLOCKED!
              </div>
              <p style={{ fontSize: '0.78rem', color: '#E2E8F0', marginBottom: '10px' }}>
                Thank you for inviting your batchmates! Download your complete pack now:
              </p>
              <a 
                href="#download-pack"
                onClick={(e) => { e.preventDefault(); alert('VIP AI Project Pack (50 Resume AI Ideas & Schematics) ready for download!'); }}
                className="btn-primary" 
                style={{ padding: '8px 18px', fontSize: '0.85rem', background: '#10B981' }}
              >
                <Download size={14} /> Download VIP Project Pack (PDF)
              </a>
            </div>
          ) : (
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#F59E0B' }}>⏳</span>
              <span>Only <strong>{target - count} more friends</strong> needed to unlock your VIP Project Pack!</span>
            </div>
          )}

          {/* One-Tap WhatsApp Share */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a 
              href={`https://api.whatsapp.com/send?text=${prefilledWhatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', fontSize: '0.95rem', padding: '12px' }}
            >
              <Share2 size={18} /> One-Tap Share on WhatsApp
            </a>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                readOnly
                value={shareUrl}
                style={{
                  flex: 1,
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#93C5FD',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleCopyLink}
                className="btn-secondary"
                style={{ flexShrink: 0, padding: '10px 16px', fontSize: '0.85rem' }}
              >
                <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Demo Simulation Helper for Ganesh's Video */}
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <button
              onClick={handleSimulateFriend}
              disabled={simulating}
              style={{
                background: 'transparent',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                color: '#94A3B8',
                fontSize: '0.75rem',
                padding: '5px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🧪 Demo Mode: {simulating ? 'Simulating...' : 'Click to Simulate Friend Signup (+1)'}
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={onClose}
            className="btn-secondary"
            style={{ width: '100%', padding: '10px' }}
          >
            Back to Workshop Details
          </button>
        </div>
      </div>
    </div>
  );
}
