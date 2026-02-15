import {test, expect, Page, Browser, Locator} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('Register test', async()=>{
    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await page.locator('.list-group>.list-group-item:nth-of-type(2)').click();

    const FirstName:Locator = page.locator('#input-firstname');
    const LastName:Locator = page.locator('#input-lastname');
    const Email:Locator = page.locator('#input-email');
    const Telephone:Locator = page.locator('#input-telephone');
    const Password:Locator = page.locator('#input-password');
    const ConfirmPassword:Locator = page.locator('#input-confirm');
    const PrivacyPolicy:Locator = page.locator('input[name="agree"]');
    const ContinueButton:Locator = page.locator('input[value="Continue"]');

    await FirstName.fill('B');
    await LastName.fill('P');
    await Email.fill("BeePee@yahoo.com");
    await Telephone.fill('1231231234');
    await Password.fill('ThisisTest@123');
    await ConfirmPassword.fill('ThisisTest@123');
    await PrivacyPolicy.check();
    await ContinueButton.click();
})