---
name: puppeteer-visual-qa
description: "Use this skill when testing web games autonomously using headless browser automation (Puppeteer/Playwright). Verifies canvas rendering, detects WebGL/Canvas console errors, captures visual screenshots, and simulates player input."
---

# Autonomous Web Game Testing via Puppeteer

This skill enables the AI agent to visually verify web games, detect WebGL crash loops, and test interactive mechanics.

## 1. Automated Test Script Template
```javascript
// scripts/test-game.js
const puppeteer = require('puppeteer');

async function testWebGame() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Verify Canvas exists
  const canvas = await page.$('canvas');
  if (!canvas) {
    throw new Error('FAIL: No canvas element mounted in the DOM!');
  }

  // 2. Wait for loading screen to complete
  await page.waitForTimeout(2000);

  // 3. Take verification screenshot
  await page.screenshot({ path: './test_artifacts/gameplay_screenshot.png' });

  // 4. Assert zero console errors
  if (consoleErrors.length > 0) {
    console.error('FAIL: Console errors detected during gameplay:', consoleErrors);
    process.exit(1);
  }

  console.log('SUCCESS: Game canvas initialized cleanly with zero errors.');
  await browser.close();
}

testWebGame();
```
