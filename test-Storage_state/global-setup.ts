import {chromium, test, Browser, Page, expect} from '@playwright/test'

async function globalSetup(){
    const browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();
      await page.goto('https://demoblaze.com/');
      await page.getByRole('link', { name: 'Log in' }).click();
      await page.locator('#loginusername').fill('test');
      await page.locator('#loginpassword').fill('test');
      await page.getByRole('button', { name: 'Log in' }).click();
      await expect(page.locator('#logout2')).toBeVisible({timeout: 30000});

      //save the state of the page - means we are logged in
      await page.context().storageState({path: './test-Storage_state/LoginAuth.json'});
      await browser.close();
}

export default globalSetup;