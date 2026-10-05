import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('🚀 Starting browser automation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  const screenshotsDir = path.join(__dirname, 'screenshots');

  // 1. Landing Hero
  console.log('📸 1. Capturing Landing Hero...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('h1');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '01_landing_hero.png'), fullPage: false });

  // 2. AI Idea Generator
  console.log('📸 2. Capturing AI Project Idea Hook...');
  // Click on "AI Idea Generator" nav button
  const aiNavBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('AI Idea Generator'));
  });
  if (aiNavBtn) await aiNavBtn.click();
  await new Promise(r => setTimeout(r, 600));

  // Click "Generate AI Project Blueprint"
  const genBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Generate AI Project Blueprint'));
  });
  if (genBtn) await genBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '02_ai_project_hook.png'), fullPage: false });

  // 3. Registration Modal
  console.log('📸 3. Capturing Registration Modal...');
  const regBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Register Free') || b.textContent.includes('Claim Your Free Seat'));
  });
  if (regBtn) await regBtn.click();
  await new Promise(r => setTimeout(r, 800));

  // Fill in form inputs
  await page.type('input[placeholder*="Ganesh"]', 'Ganesh Annavarapu');
  await page.type('input[placeholder*="name@"]', 'ganesh.cse@cbit.ac.in');
  await page.type('input[placeholder="9876543210"]', '9876543210');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, '03_registration_modal.png'), fullPage: false });

  // 4. Confirm Registration & Viral Referral Loop
  console.log('📸 4. Capturing Referral Engine & Progress Bar...');
  const submitBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Confirm Registration'));
  });
  if (submitBtn) await submitBtn.click();
  await new Promise(r => setTimeout(r, 1200));

  // Click "Simulate Friend Signup" 3 times
  for (let i = 0; i < 3; i++) {
    const simBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(b => b.textContent.includes('Simulate Friend Signup'));
    });
    if (simBtn) {
      await simBtn.click();
      await new Promise(r => setTimeout(r, 700));
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '04_referral_loop_progress.png'), fullPage: false });

  // 5. Ambassador & Admin Dashboard
  console.log('📸 5. Capturing Ambassador & Admin Dashboard...');
  // Close referral modal
  const closeRefBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Back to Workshop Details'));
  });
  if (closeRefBtn) await closeRefBtn.click();
  await new Promise(r => setTimeout(r, 500));

  // Click Ambassador & Admin in nav
  const dashNavBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Ambassador & Admin'));
  });
  if (dashNavBtn) await dashNavBtn.click();
  await new Promise(r => setTimeout(r, 600));

  // Click auto-unlock demo access
  const unlockBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('auto-unlock'));
  });
  if (unlockBtn) await unlockBtn.click();
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, '05_ambassador_dashboard.png'), fullPage: false });

  // 6. WhatsApp Message Kit
  console.log('📸 6. Capturing WhatsApp Message Kit...');
  const waNavBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('WhatsApp Kit'));
  });
  if (waNavBtn) await waNavBtn.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotsDir, '06_whatsapp_message_kit.png'), fullPage: false });

  await browser.close();
  console.log('🎉 ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Automation error:', err);
  process.exit(1);
});
