const puppeteer = require('puppeteer-extra');
const StealthPlutin = require('puppeteer-extra-plugin-stealth');

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

	const browser = await puppeteer.launch({
		headless:false,
		defaultViewport: null,
		args: ['--start-maximized', '--disable-infobars','--disable-extensions'],
		ignoreDefaultArgs: ['--enable-automation']
	});
	try{
    	const page = await browser.newPage();
    
    	await page.setViewport({
    		width: 1920,
    		height:1080,
    	});
    
    	await page.goto('https://wellsfargo.com', {waitUntil: 'networkidle0'});
    
    	await page.waitForTimeout(getRandomInt(1,12000));
    
    	await page.type('#userid', '', {delay:getRandomInt(2,10)});
		await page.keyboard.press('Tab');
    	await page.type('#password', '',{delay:getRandomInt(2,11)});
    	await page.keyboard.press('Enter');
    	await page.screenshot({path: `wf_login_${start}.png`});
    	
    	await page.waitForNavigation();
    	await page.waitForTimeout(getRandomInt(30000,56000));
    
    	await page.screenshot({path: `wf_postlogin_${start}.png`});
	}
	catch (e) {
		console.log(e);
	}
	finally{
		console.log('finished');
		//await browser.close();
	}


}

main();
