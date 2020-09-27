const puppeteer = require('puppeteer');

let page;
let browser;

const [width, height] = [640, 480];

const cases = [
	{
		name: 'Vasya',
		email: 'vasya@gmail.com',
		phone: '+79998887766',
		message: 'Short message for the test'
	},
	{
		name: 'Petya',
		email: 'petr@google.com',
		phone: '89342431232',
		message: 'Hello, i am Vasya'
	},
];

describe('Contact form', async () => {
	let URL = 'https://kodaktor.ru/g/puppetform';
	before(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 30,
			devtools: false,
			args: [`--window-size=${width},${height}`, `--window-position=30,160`]
		});
		page = await browser.newPage();
		await page.setViewport({ width, height });
	});

	cases.forEach(lead => {
		it(lead.name + ' lead can submit a contact request', async () => {
			await page.goto(URL);
			await page.waitForSelector('[data-test=contact-form]');
			await page.click('input[name=name]');
			await page.type('input[name=name]', lead.name);
			await page.click('input[name=email]');
			await page.type('input[name=email]', lead.email);
			await page.click('input[name=tel]');
			await page.type('input[name=tel]', lead.phone);
			await page.click('textarea[name=message]');
			await page.type('textarea[name=message]', lead.message);
			await page.click('input[type=checkbox]');
			await page.click('button[type=submit]');
			await page.waitForSelector('.modal');
		}).timeout(16000);

		after(async () => {
			await browser.close();
		});
	});
});

