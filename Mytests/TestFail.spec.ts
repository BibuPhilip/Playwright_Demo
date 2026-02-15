import {test, Page, Browser} from '@playwright/test';
import{ webkit } from 'playwright';
test('ChainingLocators', async()=>{
    const browser: Browser = await webkit.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com');
    ////////page.locator('.oxd-form >> .oxd-input.oxd-input--focus').fill('Admin');
    page.locator('.oxd-form').locator('input[name="username"]').fill('Admin');
    page.locator('.oxd-form').locator('input[type="password"]').fill('admin12345');
    page.locator('.oxd-form').getByRole('button', { name: 'Login' }).click();
    await new Promise(f => setTimeout(f, 5000));
    page.locator('.oxd-form').getByText('Forgot your password? ').click();
    await new Promise(f => setTimeout(f, 5000));
    await browser.close();
    test.fail();
})