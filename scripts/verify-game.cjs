const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting Autonomous Visual QA test for Minh Sát Web Game...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--no-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 15000 });

    // 1. Verify Title Screen
    console.log('Verifying Title Screen DOM...');
    await page.waitForSelector('h1', { timeout: 5000 });
    const titleText = await page.$eval('h1', el => el.textContent);
    console.log(`Found Title: ${titleText}`);

    // Take Title screenshot
    await page.screenshot({ path: 'scripts/title-screenshot.png' });
    console.log('📸 Captured title screen screenshot.');

    // 2. Click "Khởi Động Vụ Án Mới"
    console.log('Clicking Start New Case...');
    await page.click('button:has-text("Khởi Động Vụ Án Mới")');

    // 3. Verify Briefing Screen
    await page.waitForSelector('button:has-text("Bắt Đầu Khám Nghiệm Hiện Trường")', { timeout: 5000 });
    console.log('Briefing screen displayed.');
    await page.screenshot({ path: 'scripts/briefing-screenshot.png' });

    // 4. Click "Bắt Đầu Khám Nghiệm Hiện Trường" to enter 2.5D Crime Scene
    console.log('Entering Location View...');
    await page.click('button:has-text("Bắt Đầu Khám Nghiệm Hiện Trường")');

    // 5. Verify Three.js Canvas mounts
    await page.waitForSelector('canvas', { timeout: 5000 });
    console.log('Crime scene canvas mounted successfully.');
    await page.screenshot({ path: 'scripts/crime-scene-screenshot.png' });

    // 6. Test Notebook Drawer
    console.log('Opening Notebook Drawer...');
    await page.click('button:has-text("Sổ Tay")');
    await page.waitForSelector('h2:has-text("Sổ Tay Điều Tra")', { timeout: 5000 });
    console.log('Notebook Drawer opened.');
    await page.screenshot({ path: 'scripts/notebook-screenshot.png' });

    console.log('\n--- VERIFICATION REPORT ---');
    console.log(`Console Errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Console errors logged during session:', consoleErrors);
    } else {
      console.log('✅ ZERO console errors detected! WebGL, Three.js, React & Hybrid UI passed.');
    }

  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    await browser.close();
  }
})();
