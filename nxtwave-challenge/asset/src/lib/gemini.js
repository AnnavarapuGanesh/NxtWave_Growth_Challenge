import ideasLibrary from '../data/aiProjectIdeas.json';

// Rate limiting: 6 calls per minute
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_CALLS_PER_WINDOW = 6;
let callTimestamps = [];

function checkRateLimit() {
  const now = Date.now();
  callTimestamps = callTimestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (callTimestamps.length >= MAX_CALLS_PER_WINDOW) {
    return false;
  }
  callTimestamps.push(now);
  return true;
}

export function sanitizeText(text) {
  if (!text) return '';
  return String(text)
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 100);
}

export async function generateAiProjectIdea(branch, customInterest = '') {
  if (!checkRateLimit()) {
    throw new Error('Rate limit reached. Please wait a moment before generating another project idea.');
  }

  const cleanInterest = sanitizeText(customInterest);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If Gemini API Key is available, make a live API call
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `You are a Senior AI Curriculum Engineer at NxtWave designing a 60-minute beginner AI workshop for final-year engineering students.
Generate a high-impact, achievable AI project idea for a student in branch: "${branch}" with interest: "${cleanInterest || 'AI Web Apps'}".
The project must be feasible to build and deploy in 60 minutes using React and modern LLM APIs (e.g. Gemini API).
Return ONLY a valid JSON object with the following exact keys (no markdown formatting, no backticks):
{
  "title": "Clear catchy title",
  "tagline": "One punchy sentence describing what it does",
  "problemStatement": "Why this solves a real-world placement or engineering problem",
  "architecture": "Simple 3-part technical flow (e.g. UI -> API -> Parser)",
  "workshopFit": "How it is built in the 60-minute workshop",
  "interviewTalkingPoint": "What to tell a technical interviewer about this project"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedJson);
          return {
            ...parsed,
            source: 'gemini-live'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to curated library:', err);
    }
  }

  // Fallback: match from 30+ curated ideas library
  return getCuratedFallback(branch, cleanInterest);
}

function getCuratedFallback(branch, interest) {
  // Normalize branch search
  const lowerBranch = (branch || '').toLowerCase();
  
  let filtered = ideasLibrary.filter(idea => {
    if (lowerBranch.includes('cse') || lowerBranch.includes('it') || lowerBranch.includes('computer')) {
      return idea.branch.includes('CSE');
    }
    if (lowerBranch.includes('ece') || lowerBranch.includes('electronics')) {
      return idea.branch.includes('ECE');
    }
    if (lowerBranch.includes('eee') || lowerBranch.includes('electrical')) {
      return idea.branch.includes('EEE');
    }
    if (lowerBranch.includes('mech')) {
      return idea.branch.includes('Mechanical');
    }
    if (lowerBranch.includes('civil')) {
      return idea.branch.includes('Civil');
    }
    return idea.branch === 'All Branches' || idea.branch.includes('CSE');
  });

  if (filtered.length === 0) {
    filtered = ideasLibrary;
  }

  // Pick random idea from filtered list
  const randomChoice = filtered[Math.floor(Math.random() * filtered.length)];
  return {
    ...randomChoice,
    source: 'curated-database'
  };
}
