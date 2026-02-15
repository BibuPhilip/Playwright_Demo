import { test } from '../PageFixture.js'

test.describe('Testing Checkboxes', () => {
    test('Check status of checkboxes', async ({ checkboxesPage }) => {
        await checkboxesPage.openCheckboxesPage();
        await checkboxesPage.checkFirstCheckbox();
        await checkboxesPage.uncheckSecondCheckbox();
        await checkboxesPage.assertFirstCheckboxState(true);
        await checkboxesPage.assertSecondCheckboxState(false);
    })

    test('Uncheck both checkboxes test', async ({ checkboxesPage }) => {
        await checkboxesPage.openCheckboxesPage();
        await checkboxesPage.uncheckFirstCheckbox();
        await checkboxesPage.uncheckSecondCheckbox();
        await checkboxesPage.assertFirstCheckboxState(false);
        await checkboxesPage.assertSecondCheckboxState(false);
    })
})