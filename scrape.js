const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://forspanel.pro', { waitUntil: 'networkidle0' });

    const basliklar = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
      return elements.map(el => el.innerText.trim());
    });

    console.log(basliklar);

    await browser.close();
  } catch (err) {
    console.error('Hata oluştu:', err);
  }
})();
