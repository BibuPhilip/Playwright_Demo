import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('MouseHover', async()=>{
    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    //await page.goto('https://www.bigbasket.com/');
    await page.goto('https://www.spicejet.com/');
    
    //page.getByText('Add-ons').first().hover();
    //page.getByText('Taxi').first().click();
    //page.getByText('SpiceClub').first().hover();
    //page.getByText('Credit Cards').first().click();
    page.getByText('Travel Policies').first().hover();
    page.getByText('Passenger Rights').first().click();




    await new Promise(f => setTimeout(f, 10000));

    await browser.close();


})
