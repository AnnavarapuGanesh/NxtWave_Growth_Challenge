import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqSection({ onOpenRegister }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Is this workshop really 100% free, or is there a hidden paywall?",
      a: "It is 100% free. You will receive the complete starter repository, live step-by-step coding instruction, and deploy your project live on Vercel without entering any credit card or payment information. We provide all API keys and code scaffolding."
    },
    {
      q: "Will I get an official, verifiable certificate of participation?",
      a: "Yes. Every student who completes the live build session receives an official digital Certificate of Participation issued by NxtWave, complete with a cryptographically verifiable QR code. You can link it on your LinkedIn profile and submit it to your college placement cell."
    },
    {
      q: "I only know basic programming. Can I still follow along?",
      a: "Absolutely! The workshop is intentionally structured for final-year engineering students from all branches (CSE, IT, ECE, EEE, Mechanical, Civil). You do not need machine learning calculus or advanced Python; we leverage modern LLM APIs and pre-configured starter UI templates."
    },
    {
      q: "What software or tools do I need to install beforehand?",
      a: "Zero complex setup! All you need is a laptop with Google Chrome (or any modern web browser) and a free GitHub account. You can code directly in browser-based environments like GitHub Codespaces or your local VS Code."
    },
    {
      q: "How will this specific project help me in campus placements?",
      a: "Most final-year resumes are crowded with tutorial clones (ToDo lists, Weather apps, basic calculators) that recruiters discard in seconds. Building a live AI application gives you a live URL to showcase on your resume, a working GitHub repo, and a compelling technical story to discuss with interviewers."
    }
  ];

  return (
    <section style={{ padding: '60px 0 80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge-pill" style={{ marginBottom: '12px' }}>
            <HelpCircle size={14} /> GOT QUESTIONS?
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
            Everything you need to know about the 60-minute live build.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  border: isOpen ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: isOpen ? '#60A5FA' : '#FFFFFF' }}>
                    {faq.q}
                  </h3>
                  {isOpen ? <ChevronUp size={18} color="#60A5FA" /> : <ChevronDown size={18} color="#94A3B8" />}
                </div>

                {isOpen && (
                  <div style={{ marginTop: '12px', fontSize: '0.875rem', color: '#CBD5E1', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div style={{ textAlign: 'center', marginTop: '48px', padding: '32px', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '16px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
            Ready to add a real AI project to your resume?
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
            Seats are strictly capped at 500 engineering students for the live build.
          </p>
          <button onClick={onOpenRegister} className="btn-primary" style={{ padding: '12px 28px' }}>
            Claim Your Free Seat Now
          </button>
        </div>

      </div>
    </section>
  );
}
