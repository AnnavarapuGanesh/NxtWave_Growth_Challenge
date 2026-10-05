import React from 'react';
import { Clock, Code2, Globe, Award, Laptop, Check } from 'lucide-react';

export default function Agenda({ onOpenRegister }) {
  const steps = [
    {
      minute: "Min 00 – 15",
      title: "Architecture & Demystifying AI APIs",
      icon: <Clock size={20} color="#38BDF8" />,
      color: "#38BDF8",
      points: [
        "Why recruiters reject 90% of boilerplate projects (ToDo/Weather apps).",
        "Understanding how modern AI applications work (Client -> API -> Prompt -> Parser).",
        "Zero-math approach: We use production APIs, avoiding complex ML calculus."
      ]
    },
    {
      minute: "Min 15 – 40",
      title: "Live Hands-On Code Build",
      icon: <Code2 size={20} color="#60A5FA" />,
      color: "#60A5FA",
      points: [
        "Clone the starter repository with pre-configured UI components.",
        "Integrate Gemini API / LLM endpoints with structured JSON schemas.",
        "Add real-time parsing, rate limiting, and client-side error handling."
      ]
    },
    {
      minute: "Min 40 – 50",
      title: "Production Deployment & Live URL",
      icon: <Globe size={20} color="#10B981" />,
      color: "#10B981",
      points: [
        "Push code directly to your personal GitHub repository.",
        "Deploy to Vercel in 1 click with a live, shareable public HTTPS link.",
        "Add a professional README with architectural diagram to your GitHub."
      ]
    },
    {
      minute: "Min 50 – 60",
      title: "Placement Interview Strategy & Hackathon Prize",
      icon: <Award size={20} color="#F59E0B" />,
      color: "#F59E0B",
      points: [
        "Exact 3-minute script to explain this project to technical interviewers.",
        "Live Deployment Lucky Draw: Award ₹400 voucher to 1 student who deploys live.",
        "Instant release of official NxtWave Certificate of Participation."
      ]
    }
  ];

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-pill" style={{ marginBottom: '12px' }}>
            <Clock size={14} /> 60-MINUTE BREAKDOWN
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            What You Will Build in 60 Minutes
          </h2>
          <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
            No boring slides. 100% hands-on screen-sharing session designed to take you from empty folder to live deployed AI project.
          </p>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid-2" style={{ gap: '20px', marginBottom: '40px' }}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: `rgba(255, 255, 255, 0.05)`,
                border: `1px solid ${step.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {step.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {step.minute}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {step.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '6px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: step.color, marginTop: '2px' }}>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Software Prerequisites Banner */}
        <div className="glass-panel" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px' }}>
              <Laptop size={20} color="#38BDF8" /> Pre-workshop Setup (Takes 2 Minutes)
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
              All you need is a laptop with Google Chrome and a free GitHub account. No GPU or complex software required.
            </div>
          </div>

          <button onClick={onOpenRegister} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
            Join Workshop Free
          </button>
        </div>

      </div>
    </section>
  );
}
