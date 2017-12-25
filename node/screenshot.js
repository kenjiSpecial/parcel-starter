/**
 * screenshot page with puppeteer
 */

const argv = require('minimist')(process.argv.slice(2));
const dir = argv.dir;
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({ width: 640, height: 360 });
	await page.goto('http://localhost:1234/');
	await page.screenshot({ path: `docs/${dir}/thumbnail.png` });

	await browser.close();
})();
