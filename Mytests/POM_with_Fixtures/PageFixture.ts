import { test as baseTest } from '@playwright/test';
import { CheckboxesPage } from '../POM/Pages/CheckboxesPage.js';
import { LoginPage } from '../POM/Pages/LoginPage.js';
import { SecurePage } from '../POM/Pages/SecurePage.js';

type PageTestFixtures = {
    checkboxesPage: CheckboxesPage;
    loginPage: LoginPage;
    securePage: SecurePage;
}

type PageWorkerFixtures = {
    workerFixture1: string;
}

export const test = baseTest.extend<PageTestFixtures, PageWorkerFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    securePage: async ({ page }, use) => {
        await use(new SecurePage(page));
    },
    checkboxesPage: async ({ page }, use) => {
        await use(new CheckboxesPage(page));
    },
    workerFixture1:
        [
            async ({ }, use) => {
                const workerfixture1 = 'I am Worker fixture 1';
                await use(workerfixture1);
            }, { scope: 'worker' }
        ]
})