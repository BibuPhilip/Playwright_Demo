import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('SlowTextEntry', async()=>{
const browser:Browser = await webkit.launch({headless:false});
const page: Page = await browser.newPage();
await page.goto('https://www.flipkart.com/');

await page.getByPlaceholder('Search for Products, Brands and More').pressSequentially('oneplus 9',{delay:500});
//oneplus 9 rt 5g
await page.getByText('oneplus 9 rt 5g').click();


await new Promise(f => setTimeout(f, 5000));
await browser.close();

})
