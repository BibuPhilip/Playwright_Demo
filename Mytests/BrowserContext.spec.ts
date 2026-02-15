import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('BrowserContext', async()=>{
    const browser: Browser = await chromium.launch({ headless: false});

    const browserContext1: BrowserContext = await browser.newContext();
    const page1: Page = await browserContext1.newPage();

    await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const email1:Locator = page1.locator('#input-email');
    const password1:Locator = page1.locator('#input-password');
    const Login1:Locator = page1.locator('[value="Login"]');
    await email1.fill('BP@yahoo.com');
    await password1.fill('ThisisTest@123');
    await Login1.click();
    
    const browserContext2: BrowserContext = await browser.newContext();
    const page2: Page = await browserContext2.newPage();
    await page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await page2.locator('#input-email').fill('BeePee@yahoo.com');
    await page2.locator('#input-password').fill('ThisisTest@123');
    await page2.locator('[value="Login"]').click();

    //await new Promise(f => setTimeout(f, 5000));
    //await new Promise(() => {});  //to keep the browser open
    await browserContext1.close();
    await browserContext2.close();
    await browser.close();
})