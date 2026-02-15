import {test,expect} from '@playwright/test';
import ManagePage from '../Pages/ManagePage.js'
import {SecurePage} from '../Pages/SecurePage.js';

test.describe('Login flow',() =>{
    let mp: ManagePage;
    let sp: SecurePage;

    test.beforeEach(({page}) =>{
        mp = new ManagePage(page);
    });

    test('should login with valid credentials', async() =>{
        await mp.loginPage.goToLoginPage();
        sp = await mp.loginPage.userLogin('tomsmith','SuperSecretPassword!');
       //Check if the login is successful in the next page using Page Chaining concept
        await sp.assertSuccess();
    });

    test('with bad credentials, it should give error message', async() =>{
        await mp.loginPage.goToLoginPage();
        await mp.loginPage.userLogin('badUsername','badPassword');
        await mp.loginPage.assertFailedAuthentication();
    });


})