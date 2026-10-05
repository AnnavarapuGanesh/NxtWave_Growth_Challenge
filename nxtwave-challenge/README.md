# NxtWave Growth Intern Challenge — Submission Repository
**Candidate:** Ganesh (B.Tech CSE, Graduating 2027)  
**Role:** Growth Intern — NxtWave  
**Challenge Mission:** Acquire 500 final-year engineering students for "Build Your First AI Project in 60 Minutes" (Budget: ₹2,000 | Duration: 7 Days)  
**Submission Form:** [https://forms.gle/xEtJSgJfeqvnxv8q6](https://forms.gle/xEtJSgJfeqvnxv8q6)  

---

## 📁 Repository Structure & Deliverables

```
nxtwave-challenge/
├── growth-plan/
│   ├── NxtWave_Growth_Plan_500_Registrations.pptx   # 5-Slide Executive Pitch Deck (16:9 Widescreen)
│   ├── NxtWave_Growth_Plan_Summary.pdf             # 2-Page High-Density Executive PDF Brief
│   ├── growth-plan.md                              # Complete text & markdown reference
│   ├── generate_deck.py                            # Python script to regenerate PPTX
│   └── generate_pdf.py                             # ReportLab script to regenerate PDF
├── asset/                                          # Working Growth Asset (Referral-Powered Registration Engine)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   ├── src/
│   │   ├── components/                             # UI Components (Hero, Agenda, AI Generator, Dashboard, etc.)
│   │   ├── data/                                   # Curated AI ideas, college lists, and seed demo dataset
│   │   ├── lib/                                    # Storage, Gemini API hook, analytics, CSV exporter
│   │   ├── App.jsx
│   │   ├── index.css                               # Modern glassmorphism & dark mode design system
│   │   └── main.jsx
│   ├── screenshots/                                # High-res verification screenshots
│   ├── tests/                                      # Unit tests for validation, duplicates, and referral counts
│   └── workflows/                                  # n8n & Google Apps Script backend automation endpoints
├── learning-notes/
│   └── ai-notes.md                                 # What I asked -> What AI suggested -> What I changed / rejected
├── reflection.md                                   # Thought process & strategic reflection answers
├── video-script.md                                 # Timestamped 3-minute video walkthrough script & shot list
└── README.md                                       # This complete documentation & submission guide
```

---

## ⚡ How to Run the Working Asset Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Start the Application
Open your terminal inside the `nxtwave-challenge/asset/` directory:

```bash
cd nxtwave-challenge/asset
npm install
npm run dev
```

The application will start on: **`http://localhost:3000/`**

### 3. Run Automated Tests
To run unit tests verifying referral code generation, form input validation, and duplicate detection:

```bash
npm test
```

---

## 🌐 Deploy to Vercel or Netlify (1-Click Free Hosting)

This asset is built with Vite + React and compiles to pure optimized static assets (`dist/`), making it deployable on any free hosting platform without cold-start timeouts.

### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run inside `nxtwave-challenge/asset/`:
   ```bash
   vercel
   ```
3. Follow the prompts. Your project will be live on `https://your-project.vercel.app` in under 60 seconds.

### Option B: Netlify
1. Run `npm run build`
2. Drag and drop the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop).

---

## 🔑 Key Features & Demo Credentials

| Feature | Description | Access / Demo Notes |
| :--- | :--- | :--- |
| **Mobile-First Landing Page** | High-conversion hero, live countdown timer, 60-min agenda breakdown, objection-handling FAQ. | Accessible at root URL (`/`). |
| **AI Project Idea Hook** | Custom project synthesizer matching branch (CSE, ECE, EEE, Mech, Civil) to a feasible 60-min AI project. | Click **"AI Idea Generator"** tab or on landing page. Uses Gemini API if key is in `.env`, or 30+ curated ideas. |
| **Registration Form & Duplicate Shield** | Captures Name, Email, WhatsApp (10-digit check), College, Branch, Grad Year. Prevents duplicate signups by email and phone. | Click **"Register Free"**. |
| **Viral Referral Loop** | Instant referral code + unique URL, 1-tap WhatsApp share, live "X of 3 friends joined" progress bar. | Opens on signup. Includes **"Simulate Friend Signup"** button for easy video demonstration! |
| **Ambassador & Admin Tracker** | Real-time analytics, daily pace vs 500 line, channel breakdown, ambassador leaderboard, and CSV download. | Click **"Ambassador & Admin"** tab.<br/>**Password:** `nxtwave2026` *(or click quick auto-unlock)*. |
| **WhatsApp Message Kit** | 5 pre-written, tested outreach templates with dynamic URL personalization and 1-click copy. | Click **"WhatsApp Kit"** tab. |
| **Simulation Demo Mode** | Allows toggling between clean state and a realistic multi-college dataset (~340 signups) for demo video review. | Toggle button on the top banner. |

---

## 📋 Final Submission Checklist for Ganesh

Before submitting to the official Google Form ([https://forms.gle/xEtJSgJfeqvnxv8q6](https://forms.gle/xEtJSgJfeqvnxv8q6)):

- [ ] **1. Review & Personalize Reflection:** Open `nxtwave-challenge/reflection.md` and `nxtwave-challenge/learning-notes/ai-notes.md`. Verify the drafted points match your authentic voice and make any personal adjustments.
- [ ] **2. Deploy the Asset:** Run `vercel` or upload `dist/` to Netlify so you have a live public HTTPS URL to submit.
- [ ] **3. Record Your 3-Minute Video:**
  - Follow the shot list and talking points in `nxtwave-challenge/video-script.md`.
  - Use OBS or Loom.
  - Keep duration strictly between **2:45 and 3:05 minutes**.
  - Upload to Google Drive / YouTube (unlisted) and ensure link sharing is set to *"Anyone with the link can view"*.
- [ ] **4. Check Deliverables in Google Drive / Folder:**
  - `NxtWave_Growth_Plan_500_Registrations.pptx` (Deck)
  - `NxtWave_Growth_Plan_Summary.pdf` (2-Page PDF)
  - Live Asset URL
  - GitHub Repository Link
  - Video Recording Link
- [ ] **5. Submit the Form:** Fill and submit [https://forms.gle/xEtJSgJfeqvnxv8q6](https://forms.gle/xEtJSgJfeqvnxv8q6) before the 48-hour deadline.
