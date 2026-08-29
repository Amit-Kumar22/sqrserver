const { chromium } = require('playwright');
const OUT = '/private/tmp/claude-501/-Users-amitkumar-Projects-Amit-serversqr/a5aabcf0-22ba-4b86-8d2d-09b08de041b8/scratchpad';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));
  await page.goto('http://localhost:3000/work', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(600);

  for (let i = 0; i < 6; i++) {
    await page.screenshot({ path: `${OUT}/work-${i}.png` });
    await page.evaluate(() => window.scrollBy(0, 850));
    await page.waitForTimeout(200);
  }

  await browser.close();
  console.log('DONE');
})();
