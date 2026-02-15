import {test, expect, Page, Browser, Locator} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('Practice4', async()=>{
    const browser:Browser = await chromium.launch({headless:false});
    const page:Page = await browser.newPage();
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
})