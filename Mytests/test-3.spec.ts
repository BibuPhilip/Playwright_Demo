import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');
  await page.getByRole('textbox', { name: 'Search store' }).fill('iphone');
  await page.getByRole('button', { name: 'Search' }).click();
});