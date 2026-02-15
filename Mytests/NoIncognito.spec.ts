import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';

test('NoIncognito', async()=>{
    const browser:BrowserContext = await chromium.launchPersistentContext('', { headless: false, channel: 'chrome' });
    //const browser:BrowserContext = await firefox.launchPersistentContext('', { headless: false});
    //const browser:BrowserContext = await webkit.launchPersistentContext('', { headless: false});

    const pages: Page[] = browser.pages();
    if(!pages[0]){
        throw new Error('No pages found in the browser context');
    }
    const page1: Page = pages[0];
    await page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    await new Promise(f => setTimeout(f, 10000));

    await browser.close();

})