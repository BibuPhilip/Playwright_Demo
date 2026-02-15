import {test, Locator} from '@playwright/test';

test('BrowserContext', async({browser})=>{
    // Create first context
    const context1 = await browser.newContext();
    const some_Page1 = await context1.newPage();
    await some_Page1.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const email1:Locator = some_Page1.locator('#input-email');
    const password1:Locator = some_Page1.locator('#input-password');
    const Login1:Locator = some_Page1.locator('[value="Login"]');
    await email1.fill('BP@yahoo.com');
    await password1.fill('ThisisTest@123');
    await Login1.click();

    // Create second context (separate session)
    const context2 = await browser.newContext();
    const some_Page2 = await context2.newPage();
    await some_Page2.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await some_Page2.locator('#input-email').fill('BeePee@yahoo.com');
    await some_Page2.locator('#input-password').fill('ThisisTest@123');
    await some_Page2.locator('[value="Login"]').click();

    await context1.close();
    await context2.close();
})