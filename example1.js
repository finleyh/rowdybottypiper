const puppeteer = require('puppeteer-extra');
const StealthPlutin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

require('dotenv').config()

const start = Date.now();

puppeteer.use(StealthPlutin());

function getRandomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min) + min);
}


function randomMouseSquiggle(x,y){
	return 'TODO';	
}




async function main(){

	console.log('started main');

	const browser = await puppeteer.launch({
		headless:false,
		defaultViewport: null,
		args: ['--start-maximized', '--disable-infobars','--disable-extensions','--no-sandbox'],
		ignoreDefaultArgs: ['--enable-automation'],
		executablePath: '/usr/bin/chromium-browser'
	});
	console.log('browser started');
	try{
    	const page = await browser.newPage();
    
    	await page.setViewport({
    		width: 1920,
    		height:1080,
    	});
    
    	await page.goto(process.env.ROWDY_URL, {waitUntil: 'networkidle0'});
    
    	await page.waitForTimeout(getRandomInt(1,12000));
   	
	console.log(`entering username ${process.env.ROWDY_USERNAME}  and password Pizza123!`);	
    	await page.type('#userid', process.env.ROWDY_USERNAME, {delay:getRandomInt(2,10)});
		await page.keyboard.press('Tab');
    	await page.type('#password', process.env.ROWDY_PASSWORD,{delay:getRandomInt(2,11)});
    	await page.keyboard.press('Enter');

	console.log('creating output folder');
	fs.mkdir('output', {recursive:true}, (err) => {
		if (err){
			console.error(`Error creating folder: ${err.message}`);
			return;
		}
	}
	
	console.log('screenshot pre-login');
    	await page.screenshot({path: `output/wf_login_${start}.png`});
    	
    	await page.waitForNavigation();
    	await page.waitForTimeout(getRandomInt(30000,56000));
    
    	await page.screenshot({path: `output/wf_postlogin_${start}.png`});
	console.log('screenshot post-login');
	}
	catch (e) {
		console.log(e);
	}
	finally{
		await browser.close();
		console.log('closing browser');
	}
}
main();
