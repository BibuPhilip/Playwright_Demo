import {test, expect, Page, Browser, Locator} from '@playwright/test';
//import type { Page, Browser } from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';

test('Login test', async()=>{
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    //const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const email:Locator = page.locator('#input-email');
    const password:Locator = page.locator('#input-password');
    const Login:Locator = page.locator('[value="Login"]');
    await email.fill('BP@yahoo.com');
    await password.fill('ThisisTest@123');
    await Login.click();
    //const startTitle = process.hrtime.bigint();
    const pageTitle:string = await page.title();
    //const endTitle = process.hrtime.bigint();
    //console.log(`page.title() took: ${(Number(endTitle - startTitle) / 1_000_000).toFixed(3)}ms`);
    //const startExpect = process.hrtime.bigint();
    expect(pageTitle).toEqual('My Account');
    //expect(pageTitle).toEqual('Account Login');
    //const endExpect = process.hrtime.bigint();
    //console.log(`expect took: ${(Number(endExpect - startExpect) / 1_000_000).toFixed(3)}ms`);
    console.log(pageTitle);    
    await page.screenshot({path:'homepage.png'});
    //const DesktopMenu:Locator = page.locator('[title="My Account"].dropdown-toggle');
    //const ShowAllDesktops:Locator = page.locator('a[href="https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20"][class="see-all"]');
    //await DesktopMenu.click();
    const EditAccountInfo:Locator = page.locator('a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/edit"]:not(.list-group-item)');
    const Telephone:Locator = page.locator('#input-telephone');
    const ContinueButton:Locator = page.locator('input[value="Continue"]');
    const MessageText:Locator = page.locator('.alert.alert-success.alert-dismissible');
    await EditAccountInfo.click();
    await Telephone.fill('6302862696');
    await ContinueButton.click();
    expect (await MessageText.textContent()).toContain('Success: Your account has been successfully updated.');
    console.log("\u2705 User information updated successfully");
    console.log("\u{1F60D} User information updated successfully");
    console.log("\u{1F44D} User information updated successfully");
    console.log("\u{1F64C} User information updated successfully");
    //<a href="https://naveenautomationlabs.com/opencart/index.php?route=account/edit">Edit your account information</a>
    //await ShowAllDesktops.click();

    //await page.locator('span.hidden-xs.hidden-sm.hidden-md').nth(6);
    //await page.locator('button#button-cart').click();
    await browser.close();
})