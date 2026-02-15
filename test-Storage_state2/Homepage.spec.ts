import { expect, test} from '@playwright/test';

test('Testing storage state in Home Page1', async({page})=>{
    await page.goto('https://demoblaze.com/');

    await expect(page.getByRole('link',{name: 'Welcome test'})).toBeVisible();
    await page.getByRole('link', { name: 'Log out' }).click();
})