import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/browser-windows');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  await expect(page1.locator('#sampleHeading')).toContainText('This is a sample page');
  //await page.goto('https://demoqa.com/browser-windows#google_vignette');
  //await page.locator('[id="google_ads_iframe_/21849154601,22343295815/Ad.Plus-300x250_0"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window', exact: true }).click();
  const page2 = await page2Promise;
  await expect(page2.locator('#sampleHeading')).toContainText('This is a sample page');
});