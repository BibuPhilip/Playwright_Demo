import {test, expect} from '@playwright/test';
import Register from '../Mytests/Pages/Register.js';
import Login from '../Mytests/Pages/Login.js';
import DashboardAndHome from '../Mytests/Pages/DashboardAndHome.js';
import Desktop from '../Mytests/Pages/Desktops.js'

const emailAddress: string ='AAbPPp@gmail.com';
const password: string = 'AAbPPp123';
test('Register new user', async ({ page }) => {

    const register = new Register(page);
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');

    await register.FillFirstName('AAb');
    await register.FillLastName('PPp');
    await register.FillEmail(emailAddress);
    await register.FillTelephone('1234567890');
    await register.FillPassword(password);
    await register.FillConfirmPassword(password);
    await expect(register.IsNotSubscribed).toBeTruthy();
    await register.CheckPrivacyPolicy();
    await register.ClickContinue();
    //await register.Register('AAb','PPp',emailAddress,'1234567890',password,password);
    await page.waitForTimeout(5000);
})

test.describe('Login and other features', () => {
    test.beforeEach(async ({ page }) => {
        const login = new Login(page);
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
        await login.LoginMe(emailAddress,password);
    })

    test('Login with new user', async ({ page }) => {
        const dashboardAndhome = new DashboardAndHome(page);
        await dashboardAndhome.Logout();
    })

    test('Dashboard and Home pages', async ({ page }) => {
        const dashboardAndhome = new DashboardAndHome(page);
        const desktops = new Desktop(page);

        await dashboardAndhome.clickOnHome();
        await dashboardAndhome.clickOnDesktops();

        const desktopPrice = await desktops.addFirstDeviceToCart();
        console.log("Price of selected Desktop is: " + desktopPrice);
        //await page.waitForLoadState('networkidle');
        await dashboardAndhome.Logout();
    })

})


