const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to Dashboard...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/arinfidan/.gemini/antigravity/scratch/dashboard.png' });
  
  console.log('Navigating to Water Page...');
  await page.goto('http://localhost:3001/water', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/arinfidan/.gemini/antigravity/scratch/water.png' });

  console.log('Navigating to Forecast Page...');
  await page.goto('http://localhost:3001/forecast', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/arinfidan/.gemini/antigravity/scratch/forecast.png' });

  await browser.close();
  console.log('Done!');
})();
