import{test, expect, Page, Browser, Locator, BrowserContext} from "@playwright/test";
import{chromium, firefox, webkit} from "playwright";

test('Practice2', async() => {  
const browser:Browser = await firefox.launch({headless:false});
const page:Page = await browser.newPage();
await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');

await page.getByText('Shop by Category').click();
await page.getByText(' Components').first().click();
await page.locator('figcaption.figure-caption.mb-2').first().click();

await page.getByTitle('Add to Cart').first().click();
await page.getByText('View Cart').first().click();

await page.pause();
//await new Promise(f => setTimeout(f, 15000));
await browser.close();

})