const puppeteer = require('puppeteer');

(async function main() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
        await page.goto('https://www.youtube.com/feed/trending');
        await page.waitForSelector('.ytd-video-renderer');
        const sections = await page.$$('div#dismissable.ytd-video-renderer');
        for (let i = 0; i < 2; i++) {
            const section = sections[i];
            const title = await section.$eval('a#video-title', item => item.innerText);
            console.log(title);
            await section.$eval('a#video-title', item => item.click());
            await page.waitForSelector('.ytd-compact-video-renderer');
            const description = await page.$eval('#description .ytd-video-secondary-info-renderer', item => item.innerText);
            console.log(description);
        }
        console.log(sections.length);
    } catch (e) {
        console.log('our error', e);
    }
})();