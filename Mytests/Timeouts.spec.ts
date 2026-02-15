import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';

test.use({actionTimeout:25000}); //if there are any locator-level timeouts, they will get the preference
//test.setTimeout(25000); // test level timeout gets the preference
test('Timeouts1', async()=>{
const browser: Browser = await chromium.launch({headless:false});
const page:Page = await browser.newPage();
await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');


await page.getByRole('textbox',{name:'Title1234'}).first().fill('Mrs',{timeout:22000});

//await new Promise(f =>setTimeout(f,5000));
await browser.close();
})

test('Timeouts2', async()=>{
const browser: Browser = await firefox.launch({headless:false});
const page:Page = await browser.newPage();
await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');

await page.getByRole('textbox',{name:'Title1234'}).first().fill('Mrs',{timeout:10000});

//await new Promise(f =>setTimeout(f,5000));
await browser.close();
})

test('Timeouts3', async()=>{
const browser: Browser = await webkit.launch({headless:false});
const page:Page = await browser.newPage();
page.setDefaultTimeout(15000);
await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');

await page.getByRole('textbox',{name:'Title'}).first().fill('Mrs',{timeout:5000});

//await new Promise(f =>setTimeout(f,5000));
await browser.close();
})