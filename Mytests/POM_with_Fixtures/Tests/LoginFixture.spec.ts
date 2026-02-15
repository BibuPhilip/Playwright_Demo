import { test } from '../PageFixture.js'

test.describe('Testing Login features', () => {
    test('should login with valid credentials', async ({ workerFixture1, loginPage, securePage }) => {

        console.log(workerFixture1);
        await loginPage.goToLoginPage();
        await loginPage.userLogin('tomsmith', 'SuperSecretPassword!')
        await securePage.assertSuccess();
    })

    test('with bad credentials, it should give error message', async ({ loginPage }) => {
        await loginPage.goToLoginPage();
        await loginPage.userLogin('badUsername', 'badPassword');
        await loginPage.assertFailedAuthentication();
    })
})