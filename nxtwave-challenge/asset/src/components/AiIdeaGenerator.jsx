import React, { useState } from 'react';
import { Sparkles, RefreshCw, ArrowRight, Lightbulb, Shield, Code, Cpu } from 'lucide-react';
import { generateAiProjectIdea } from '../lib/gemini';

export default function AiIdeaGenerator({ onOpenRegister }) {
  const [branch, setBranch] = useState('CSE / IT');
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const quickPills = [
    "ATS Resume Checker",
    "Smart Mock Interviewer",
    "IoT Device Rule Engine",
    "EV Battery Telemetry",
    "Tool Vibration Diagnostic",
    "Natural Language to SQL"
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const idea = await generateAiProjectIdea(branch, interest);
      setResult(idea);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to generate project idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-idea-generator" style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge-pill" style={{ marginBottom: '12px', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#A5B4FC' }}>
            <Sparkles size={14} /> THE DIFFERENTIATOR HOOK
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Get Your <span className="gradient-text">Personalized AI Project</span> Blueprint
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
            Not sure what AI project to build for your specific engineering branch? Pick your discipline and discover a high-impact, placement-ready project you could build in this 60-minute workshop.
          </p>
        </div>

        {/* Generator Card */}
        <div className="glass-panel-glow" style={{ padding: '28px', marginBottom: '32px' }}>
          <form onSubmit={handleGenerate}>
            <div className="grid-2" style={{ gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Select Your Engineering Branch</label>
                <select 
                  className="form-select"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="CSE / IT">Computer Science / IT (CSE / IT / AI-DS)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="All Branches">Cross-Branch / Placement & Career Tools</option>
                </select>
              </div>

              <div>
                <label className="form-label">Specific Domain / Interest (Optional)</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. Web Apps, IoT, Placements, Clean Energy"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  maxLength={60}
                />
              </div>
            </div>

            {/* Quick suggested chips */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', marginRight: '8px' }}>Popular topics:</span>
              <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {quickPills.map((pill, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setInterest(pill); }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#94A3B8',
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      cursor: 'pointer'
                    }}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {errorMsg}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Synthesizing Project Blueprint...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate AI Project Blueprint
                </>
              )}
            </button>
          </form>
        </div>

        {/* Blueprint Output Display */}
        {result && (
          <div className="glass-panel" style={{
            padding: '28px',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
            animation: 'fadeIn 0.4s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                🎯 Recommended for {branch}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Source: {result.source === 'gemini-live' ? '✨ Live Gemini 1.5 Flash' : '⚡ Curated Industry Database'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              {result.title}
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#38BDF8', fontWeight: 500, marginBottom: '20px' }}>
              "{result.tagline}"
            </p>

            <div className="grid-2" style={{ gap: '18px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lightbulb size={14} /> Why Recruiters Care
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                  {result.problemStatement}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.78rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Code size={14} /> 3-Part Technical Architecture
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                  {result.architecture}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} /> Technical Interview Talking Point
              </div>
              <div style={{ fontSize: '0.85rem', color: '#E2E8F0', fontStyle: 'italic' }}>
                "{result.interviewTalkingPoint}"
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <button 
                type="button" 
                onClick={handleGenerate}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#94A3B8',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={14} /> Generate Another Idea
              </button>

              <button 
                onClick={onOpenRegister}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.95rem' }}
              >
                Build This In The Workshop <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
