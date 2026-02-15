import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('BasicAuth', async()=>{
    const browser: Browser = await webkit.launch({ headless: false});

/*     const browserContext1: BrowserContext = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    }); */
    //const browserContext1: BrowserContext = await browser.newContext();
    //const page1: Page = await browserContext1.newPage();
    const page1: Page = await browser.newPage();
    const username:string = 'admin';
    const password:string = 'admin';
    const authHeader:string = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    //const authHeader:string = 'Basic ' + btoa(username + ':' + password);
    await page1.setExtraHTTPHeaders({ 'Authorization': authHeader });

    await page1.goto('https://the-internet.herokuapp.com/basic_auth');
    const message1:Locator = page1.locator('h3+p');
    await expect(message1).toContainText('Congratulations! You must have the proper credentials.');

    await new Promise(f => setTimeout(f, 15000));
    //await new Promise(() => {});  //to keep the browser open
    //await browserContext1.close();
    await browser.close();
})  