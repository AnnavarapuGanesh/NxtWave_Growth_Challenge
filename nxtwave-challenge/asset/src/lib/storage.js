import { generateSeedRegistrations } from '../data/seedData';
import { generateReferralCode } from './analytics';

const STORAGE_KEY_REGISTRATIONS = 'nxtwave_registrations_v1';
const STORAGE_KEY_DEMO_FLAG = 'nxtwave_is_demo_mode_v1';
const STORAGE_KEY_CURRENT_USER = 'nxtwave_current_user_v1';

// Initialize storage
export function initStorage() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
  if (!existing) {
    // By default, start clean or provide seed option
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify([]));
  }
}

export function isDemoMode() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY_DEMO_FLAG) === 'true';
}

export function setDemoMode(enabled) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_DEMO_FLAG, enabled ? 'true' : 'false');
  if (enabled) {
    const seed = generateSeedRegistrations();
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(seed));
  } else {
    // Remove only demo records
    const all = getRegistrations(true);
    const realOnly = all.filter(r => !r.isDemo);
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(realOnly));
  }
  window.dispatchEvent(new CustomEvent('nxtwave_storage_updated'));
}

export function getRegistrations(includeDemo = true) {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    const list = raw ? JSON.parse(raw) : [];
    if (!includeDemo) {
      return list.filter(r => !r.isDemo);
    }
    return list;
  } catch (err) {
    console.error('Error reading registrations from localStorage', err);
    return [];
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent('nxtwave_user_updated'));
}

export function getReferralStats(referralCode) {
  if (!referralCode) return { count: 0, referredStudents: [] };
  const all = getRegistrations(true);
  const referred = all.filter(r => r.referredBy === referralCode);
  return {
    count: referred.length,
    referredStudents: referred
  };
}

export async function registerStudent(formData) {
  const all = getRegistrations(true);
  
  const cleanEmail = formData.email.trim().toLowerCase();
  const cleanPhone = formData.whatsapp.replace(/\D/g, '');

  // Check for duplicate registration
  const duplicate = all.find(r => 
    r.email.trim().toLowerCase() === cleanEmail || 
    r.whatsapp.replace(/\D/g, '') === cleanPhone
  );

  if (duplicate) {
    return {
      success: false,
      isDuplicate: true,
      error: duplicate.email.trim().toLowerCase() === cleanEmail 
        ? 'This email address is already registered for the workshop!'
        : 'This WhatsApp number is already registered for the workshop!',
      existingRecord: duplicate
    };
  }

  const referralCode = generateReferralCode(formData.name);
  const now = new Date().toISOString();

  const newRecord = {
    id: `reg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: formData.name.trim(),
    email: cleanEmail,
    whatsapp: cleanPhone,
    college: formData.college,
    branch: formData.branch,
    gradYear: formData.gradYear,
    referralCode,
    referredBy: formData.referredBy || null,
    referralCount: 0,
    utmSource: formData.utmSource || 'direct',
    createdAt: now,
    isDemo: false
  };

  // If referred by someone, increment that person's referralCount
  if (newRecord.referredBy) {
    const referrer = all.find(r => r.referralCode === newRecord.referredBy);
    if (referrer) {
      referrer.referralCount = (referrer.referralCount || 0) + 1;
    }
  }

  all.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(all));
  setCurrentUser(newRecord);

  // Background Webhook sync (Google Sheets Apps Script or Supabase if configured)
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(err => console.warn('Background webhook sync failed (non-blocking):', err));
  }

  window.dispatchEvent(new CustomEvent('nxtwave_storage_updated'));

  return {
    success: true,
    record: newRecord
  };
}
