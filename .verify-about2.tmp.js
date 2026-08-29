const { chromium } = require('playwright');
const OUT = '/private/tmp/claude-501/-Users-amitkumar-Projects-Amit-serversqr/a5aabcf0-22ba-4b86-8d2d-09b08de041b8/scratchpad';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/about', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/about-new-1.png` });

  // click Mission tab
  await page.click('button:has-text("Our Mission")');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/about-new-1b-mission-tab.png` });

  await page.evaluate(() => window.scrollBy(0, 950));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/about-new-2.png` });

  await page.evaluate(() => window.scrollBy(0, 950));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/about-new-3.png` });

  await page.evaluate(() => window.scrollBy(0, 950));
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/about-new-4.png` });

  await browser.close();
  console.log('DONE');
})();
