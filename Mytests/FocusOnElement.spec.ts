import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('FocusOnElement', async()=>{
    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://www.orangehrm.com/orangehrm-30-day-trial/');

    //focus on "Allow all" cookies button
    await page.getByRole('button',{name: 'Allow all'}).focus();
    //await new Promise(f => setTimeout(f, 5000));
    await page.getByRole('button',{name: 'Allow all'}).click();
    await new Promise(f => setTimeout(f, 5000));

    const fullName: Locator = page.getByRole('textbox', { name: 'Full Name' });
    await fullName.focus();
    await new Promise(f => setTimeout(f, 5000));
    await fullName.fill('Test User');

    await new Promise(f => setTimeout(f, 5000));
    await browser.close();
})