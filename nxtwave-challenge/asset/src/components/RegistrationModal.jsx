import React, { useState } from 'react';
import { X, Lock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { POPULAR_COLLEGES, BRANCHES, GRADUATION_YEARS } from '../data/colleges';
import { registerStudent } from '../lib/storage';
import { getUrlParams } from '../lib/analytics';

export default function RegistrationModal({ isOpen, onClose, onSuccess }) {
  const urlParams = getUrlParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    college: POPULAR_COLLEGES[0],
    customCollege: '',
    branch: BRANCHES[0],
    gradYear: GRADUATION_YEARS[0]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [duplicateNotice, setDuplicateNotice] = useState(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid personal or college email address';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      errs.whatsapp = 'Please enter a valid 10-digit Indian WhatsApp number (e.g., 9876543210)';
    }

    if (formData.college === 'Other College (Enter Manually)' && !formData.customCollege.trim()) {
      errs.customCollege = 'Please enter your college name';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setDuplicateNotice(null);

    const submissionPayload = {
      ...formData,
      college: formData.college === 'Other College (Enter Manually)' ? formData.customCollege.trim() : formData.college,
      referredBy: urlParams.ref || null,
      utmSource: urlParams.utm_source || (urlParams.ref ? 'peer_referral' : 'direct')
    };

    const result = await registerStudent(submissionPayload);
    setSubmitting(false);

    if (result.isDuplicate) {
      setDuplicateNotice(result.error);
      setTimeout(() => {
        onSuccess(result.existingRecord);
      }, 1500);
      return;
    }

    if (result.success) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if canvas unavailable
      }
      onSuccess(result.record);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '520px',
        backgroundColor: '#0F172A',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '16px',
        padding: '28px',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
        maxHeight: '92vh',
        overflowY: 'auto'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <span className="badge-live" style={{ marginBottom: '8px', fontSize: '0.7rem' }}>
            <span className="badge-live-pulse" /> 100% FREE ADMISSION
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF' }}>
            Reserve Your Free Seat
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
            Join the 60-minute live build. Free source code & digital certificate included.
          </p>

          {urlParams.ref && (
            <div style={{ marginTop: '10px', padding: '6px 10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '6px', fontSize: '0.75rem', color: '#93C5FD' }}>
              🎉 You were invited by classmate code: <strong>{urlParams.ref}</strong>
            </div>
          )}
        </div>

        {duplicateNotice && (
          <div style={{
            padding: '12px',
            background: 'rgba(234, 88, 12, 0.15)',
            border: '1px solid rgba(234, 88, 12, 0.4)',
            color: '#FB923C',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertTriangle size={18} />
            <div>
              <strong>Already Registered!</strong> {duplicateNotice} <br />
              <span style={{ fontSize: '0.75rem' }}>Opening your personal referral tracker...</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Full Name *</label>
            <input 
              type="text"
              className="form-input"
              placeholder="e.g. Ganesh Annavarapu"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Email Address (For Calendar Invite & Certificate) *</label>
            <input 
              type="email"
              className="form-input"
              placeholder="name@college.edu or name@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          {/* WhatsApp Number */}
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">WhatsApp Number (For Direct Meeting Link & Code Repo) *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '11px 12px',
                color: '#94A3B8',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                🇮🇳 +91
              </span>
              <input 
                type="tel"
                className="form-input"
                placeholder="9876543210"
                maxLength={10}
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            {errors.whatsapp && <div className="form-error">{errors.whatsapp}</div>}
          </div>

          {/* College */}
          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">Engineering College *</label>
            <select 
              className="form-select"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            >
              {POPULAR_COLLEGES.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>

            {formData.college === 'Other College (Enter Manually)' && (
              <input 
                type="text"
                className="form-input"
                style={{ marginTop: '8px' }}
                placeholder="Type your college name..."
                value={formData.customCollege}
                onChange={(e) => setFormData({ ...formData, customCollege: e.target.value })}
              />
            )}
            {errors.customCollege && <div className="form-error">{errors.customCollege}</div>}
          </div>

          {/* Branch & Graduation Year */}
          <div className="grid-2" style={{ gap: '12px', marginBottom: '18px' }}>
            <div>
              <label className="form-label">Branch *</label>
              <select 
                className="form-select"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              >
                {BRANCHES.map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Graduation Year *</label>
              <select 
                className="form-select"
                value={formData.gradYear}
                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
              >
                {GRADUATION_YEARS.map((y, idx) => (
                  <option key={idx} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Note */}
          <div style={{
            fontSize: '0.72rem',
            color: '#64748B',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            lineHeight: 1.4
          }}>
            <Lock size={13} style={{ flexShrink: 0, marginTop: '2px', color: '#38BDF8' }} />
            <span>
              <strong>Privacy Assurance:</strong> Your contact info is strictly used for workshop join links, software setup files, and verifiable certificate issuance. Zero spam.
            </span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={submitting}
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            {submitting ? 'Confirming Your Seat...' : (
              <>
                Confirm Registration & Get Link <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
