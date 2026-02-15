import {test,expect} from '@playwright/test';

test('Add to Cart', async({page})=>{
    await page.goto('https://demoblaze.com/');

    await expect(page.getByRole('link',{name: 'Welcome test'})).toBeVisible();

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'Nokia lumia' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.getByRole('link', { name: 'Log out' }).click();

})