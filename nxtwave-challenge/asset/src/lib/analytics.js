// Analytics and referral link helpers

export function getUrlParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    ref: params.get('ref') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || 'ai_60min_workshop',
    ambassador: params.get('amb') || ''
  };
}

export function generateReferralCode(name) {
  const cleanName = (name || 'STU').replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 3);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `NXT-${cleanName || 'STU'}${randomSuffix}`;
}

export function getShareUrl(referralCode) {
  if (typeof window === 'undefined') return `https://nxtwave-ai-workshop.vercel.app?ref=${referralCode}`;
  const origin = window.location.origin;
  return `${origin}?ref=${encodeURIComponent(referralCode)}&utm_source=peer_referral`;
}

export function getAmbassadorUrl(ambassadorCode) {
  if (typeof window === 'undefined') return `https://nxtwave-ai-workshop.vercel.app?ref=${ambassadorCode}`;
  const origin = window.location.origin;
  return `${origin}?ref=${encodeURIComponent(ambassadorCode)}&utm_source=ambassador_whatsapp`;
}
