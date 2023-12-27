const puppeteer = require('puppeteer-extra');
const StealthPlutin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const start = Date.now();
const WAIT_MAX=12000;
const WAIT_MIN=9;
const TYPE_WAIT_MAX=10;
const TYPE_WAIT_MIN=2;
const VIEWPORT_Y=1920;
const VIEWPORT_X=1080;

puppeteer.use(StealthPlutin());

function getRandomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min) + min);
}


async function screen_shot(name,page){
	console.log('creating output folder');
	if (!fs.existsSync('output')){
    		fs.mkdirSync('output', {recursive:true}, (err) => {
    			if (err){
    				console.error(`Error creating folder: ${err.message}`);
    			}
    		});
	}
	console.log(`making screenshot ${process.env.ROWDY_TARGET}_${name}_${start}.png`);
    	await page.screenshot({path: `output/${process.env.ROWDY_TARGET}_${name}_${start}.png`});
}


async function main(){

	console.log('started main');
	console.log('starting browser');

	const browser = await puppeteer.launch({
		headless:false,
		defaultViewport: null,
		args: ['--start-maximized', '--disable-infobars','--disable-extensions','--no-sandbox'],
		ignoreDefaultArgs: ['--enable-automation'],
		executablePath: '/usr/bin/chromium-browser'
	});
    	const page = await browser.newPage();

    	console.log('Load_page() started');
	try{
    		await page.setViewport({
    			width: VIEWPORT_Y,
    			height: VIEWPORT_X,
    		});
    		await page.goto(process.env.ROWDY_URL, {waitUntil: 'networkidle0'});
	}
	catch (e) {
		console.log(e);
	}
    	await page.waitForTimeout(getRandomInt(WAIT_MIN,WAIT_MAX));


	console.log(`Filling in form data with username ${process.env.ROWDY_USERNAME} and affiliated password!`);	
	
	await screen_shot('preform',page);
	//await page.type(process.env.ROWDY_USERNAME_FIELD, process.env.ROWDY_USERNAME_VALUE, {delay:getRandomInt(TYPE_WAIT_MIN,TYPE_WAIT_MAX)});
	await page.type('#userid', process.env.ROWDY_USERNAME_VALUE, {delay:getRandomInt(TYPE_WAIT_MIN,TYPE_WAIT_MAX)});
	await page.keyboard.press('Tab');
    	//await page.type(process.env.ROWDY_PASSWORD_FIELD, process.env.ROWDY_PASSWORD_VALUE,{delay:getRandomInt(TYPE_WAIT_MIN,TYPE_WAIT_MAX)});
    	await page.type('#password', process.env.ROWDY_PASSWORD_VALUE,{delay:getRandomInt(TYPE_WAIT_MIN,TYPE_WAIT_MAX)});
    	await page.keyboard.press('Enter');

    	await page.waitForNavigation();
    	await page.waitForTimeout(getRandomInt(WAIT_MIN,WAIT_MAX));
	await screen_shot('postform',page);
	await browser.close();

   	console.log('end main');	
}

main();
