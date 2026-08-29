const { chromium } = require('playwright');
const OUT = '/private/tmp/claude-501/-Users-amitkumar-Projects-Amit-serversqr/a5aabcf0-22ba-4b86-8d2d-09b08de041b8/scratchpad';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const missionBtn = page.locator('button:has-text("Our Mission")');
  await missionBtn.waitFor({ state: 'visible', timeout: 10000 });
  await missionBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/about-new-tab-check.png` });

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Contains "Quality Services" (Mission content):', bodyText.includes('Quality Services'));
  console.log('Contains "Global Impact" (Vision content):', bodyText.includes('Global Impact'));

  await browser.close();
  console.log('DONE');
})();
