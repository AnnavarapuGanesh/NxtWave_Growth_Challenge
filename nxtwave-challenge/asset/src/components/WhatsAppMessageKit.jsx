import React, { useState } from 'react';
import { MessageSquare, Copy, Check, Share2, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { getAmbassadorUrl } from '../lib/analytics';

export default function WhatsAppMessageKit() {
  const [ambassadorName, setAmbassadorName] = useState('Ganesh');
  const [ambassadorCode, setAmbassadorCode] = useState('AMB-CBIT-GAN');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const customUrl = getAmbassadorUrl(ambassadorCode);

  const templates = [
    {
      id: 1,
      target: "Ambassador to College Batch WhatsApp Groups",
      context: "Peer-to-peer recommendation for official department & unofficial batch groups.",
      timing: "Day 1 & Day 2 (Campaign Launch)",
      message: `Hey guys! 👋 If you're stressed about campus placements and still have generic projects (like ToDo apps or Weather API) on your resume, check this out.

NxtWave is conducting a FREE live hands-on workshop:
🚀 *"Build Your First AI Project in 60 Minutes"*

What we're doing:
• Live building & deploying a real AI application to GitHub + Vercel
• No heavy AI/ML math needed (step-by-step guidance)
• Verifiable Certificate of Participation for our placement cell records
• Live ₹400 voucher lucky draw for students who deploy live

📅 When: This Saturday @ 7:00 PM IST
⚡ Seats are capped at 500 for the live build.

Register your free seat here before slots fill up:
👉 ${customUrl}

(Let's join together so we can add it to our placement resumes!)`
    },
    {
      id: 2,
      target: "Technical Club / CR Formal Announcement",
      context: "Higher-credibility formal circular for college notice boards & official club channels.",
      timing: "Day 2 & Day 4 (Institutional Push)",
      message: `📢 *NOTICE: AI Skill Enrichment Workshop for Final-Year Students*

Dear Students,

To enhance technical placement readiness and practical project exposure, NxtWave is hosting an exclusive practical session:

Topic: *"Build Your First AI Project in 60 Minutes"*
Target Audience: Final-year CSE, IT, ECE, EEE and allied engineering branches.

Key Takeaways:
1. Architectural understanding of modern Generative AI APIs.
2. Complete full-stack live deployment with public HTTPS URL.
3. Cryptographically verifiable digital certificate issued by NxtWave.

Cost: 100% Free (Zero fees or credit card required)
Mode: Online Live Interactive Session

🔗 Verified College Registration Link:
${customUrl}

All interested students are advised to reserve their seats promptly.`
    },
    {
      id: 3,
      target: "T-24h Scarcity Countdown",
      context: "High urgency trigger to capture procrastinating students.",
      timing: "Day 6 (24 Hours Before Workshop)",
      message: `🚨 *FINAL 40 SEATS: Workshop Starts Tomorrow @ 7:00 PM!*

Quick reminder! The free hands-on session *"Build Your First AI Project in 60 Minutes"* is happening tomorrow evening.

Over 460+ engineering students from CBIT, VNR, GVPCE, BMSCE & 25+ colleges have already registered.

What to bring:
💻 Laptop with Google Chrome
⚡ Free GitHub account (takes 2 mins)
❌ Zero coding setup or GPU needed

Claim one of the final remaining seats now:
👉 ${customUrl}

See you live on the build call tomorrow!`
    },
    {
      id: 4,
      target: "T-1h Workshop Starting Notice",
      context: "Direct attendance driver to maximize live show rate (55%+ target).",
      timing: "Day 7 @ 6:00 PM (1 Hour Before Call)",
      message: `🔴 *STARTING IN 60 MINUTES: Build Your First AI Project Live!*

Hey everyone! The live coding room for *"Build Your First AI Project in 60 Minutes"* is opening now.

⏰ Time: 7:00 PM IST sharp
🔗 Live Session Link: https://nxtwave.tech/live-ai-build
🎁 Reminder: ₹400 live deployment voucher announced at minute 50!

Grab your laptop, open the link, and let's ship a real AI project together today. Let's go! 🚀`
    },
    {
      id: 5,
      target: "Post-Workshop GitHub Repo & Certificate Access",
      context: "Referral re-engagement and LinkedIn social proof amplifier.",
      timing: "Day 7 @ 8:15 PM (Immediately Post-Workshop)",
      message: `🎉 *Huge congratulations to everyone who deployed their AI project live tonight!*

Here is your post-workshop resource toolkit:
📁 Full Source Code & Starter Scaffolding: https://github.com/nxtwave-workshops/ai-project-starter
📜 Download & Verify Your Official Certificate: https://nxtwave.tech/verify-certificate
💼 Resume Bullet Point Template: Add *"Engineered & deployed responsive AI Web App with Gemini API & Vercel CI/CD"*

Share your deployed project on LinkedIn and tag @NxtWave! 🔥`
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section style={{ padding: '60px 0 80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="badge-pill" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#4ADE80', marginBottom: '12px' }}>
            <MessageSquare size={14} /> AUTOMATION & OUTREACH TOOLKIT
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
            Campus Ambassador <span className="gradient-text">WhatsApp Message Kit</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
            Pre-written, high-converting copy tailored for Tier-2/3 college WhatsApp groups. Enter your ambassador details below to automatically personalize every tracking link.
          </p>
        </div>

        {/* Dynamic Customizer Bar */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#38BDF8" /> Personalize Outreach Links in 1 Click:
          </div>

          <div className="grid-2" style={{ gap: '16px' }}>
            <div>
              <label className="form-label">Ambassador Name</label>
              <input 
                type="text"
                className="form-input"
                value={ambassadorName}
                onChange={(e) => setAmbassadorName(e.target.value)}
                placeholder="e.g. Ganesh"
              />
            </div>

            <div>
              <label className="form-label">Ambassador Tracking Code</label>
              <input 
                type="text"
                className="form-input"
                value={ambassadorCode}
                onChange={(e) => setAmbassadorCode(e.target.value)}
                placeholder="e.g. AMB-CBIT-GAN"
              />
            </div>
          </div>

          <div style={{ marginTop: '12px', fontSize: '0.78rem', color: '#94A3B8' }}>
            Active Tracking Link: <code style={{ color: '#60A5FA' }}>{customUrl}</code>
          </div>
        </div>

        {/* Message Templates List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {templates.map((tpl, idx) => (
            <div key={tpl.id} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                      TEMPLATE #{tpl.id}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {tpl.timing}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
                    {tpl.target}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    {tpl.context}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleCopy(tpl.message, idx)}
                    className="btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check size={14} color="#34D399" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Text
                      </>
                    )}
                  </button>

                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(tpl.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                  >
                    <Share2 size={14} /> Open WhatsApp
                  </a>
                </div>
              </div>

              {/* Message Box */}
              <div style={{
                background: 'rgba(10, 15, 29, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '0.825rem',
                color: '#E2E8F0',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
                maxHeight: '260px',
                overflowY: 'auto'
              }}>
                {tpl.message}
              </div>
            </div>
          ))}
        </div>

        {/* Automation Note */}
        <div className="glass-panel" style={{ marginTop: '32px', padding: '20px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#93C5FD', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
            <AlertCircle size={16} /> Backend Automation Architecture Included
          </div>
          <p style={{ fontSize: '0.825rem', color: '#CBD5E1', lineHeight: 1.5 }}>
            Production n8n webhook workflow definitions (<code>n8n-workflow-registration-confirmation.json</code>) and Google Apps Script CRM synchronization endpoints (<code>google-apps-script-sheet-sync.js</code>) are located in <code>asset/workflows/</code> to automate email ticket issuance, calendar invites, and WhatsApp Cloud API confirmation sequences.
          </p>
        </div>

      </div>
    </section>
  );
}
