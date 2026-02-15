
import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('DragAndDrop', async()=>{
const browser: Browser = await webkit.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');
//single step drag and drop
    await page.locator('#draggable').dragTo(page.locator('#droppable'));

//multiple manual steps drag and drop
/*  await page.locator('#draggable').hover();
    await page.mouse.down();
    await page.locator('#droppable').hover();
    await page.mouse.up(); */



    await new Promise(f => setTimeout(f, 5000));
    await browser.close();
})
