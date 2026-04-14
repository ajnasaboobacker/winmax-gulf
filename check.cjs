
const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR STACK:', error.stack));
    await page.goto('http://localhost:8080');
    await new Promise(r => setTimeout(r, 2000));
    const title = await page.title();
    console.log('PAGE TITLE:', title);
    
    const rootHtml = await page.$eval('#root', el => el.innerHTML);
    if(rootHtml.length > 0) {
      console.log('ROOT IS POPULATED! Length:', rootHtml.length);
    } else {
      console.log('ROOT IS EMPTY!');
    }
    
    await browser.close();
  } catch(e) {
    console.error('SCRIPT ERROR:', e);
  }
})();

