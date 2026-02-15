import {test} from '@playwright/test'
import ManagePage from '../Pages/ManagePage.js'

test.describe('Testing Checkboxes', ()=>{
    let mp:ManagePage;

    test.beforeEach(({page})=>{
        mp = new ManagePage(page);
    });

    test('Check status of checkboxes', async()=>{
        await mp.checkboxesPage.openCheckboxesPage();
        await mp.checkboxesPage.checkFirstCheckbox();
        await mp.checkboxesPage.uncheckSecondCheckbox();
        await mp.checkboxesPage.assertFirstCheckboxState(true);
        await mp.checkboxesPage.assertSecondCheckboxState(false);
    })

    test('Uncheck both checkboxes test', async()=>{
        await mp.checkboxesPage.openCheckboxesPage();
        await mp.checkboxesPage.uncheckFirstCheckbox();
        await mp.checkboxesPage.uncheckSecondCheckbox();
        await mp.checkboxesPage.assertFirstCheckboxState(false);
        await mp.checkboxesPage.assertSecondCheckboxState(false);
    })

})