import { test, expect } from '@playwright/test';

//test.use({storageState: './test-Storage_state/NoAuth.json'}) 
// If you use this, the entire test file will use NoAuth.json file for Storage State,
// which has no cookies, hence no authentication. So the entire test will fail
test('test once', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await expect(page.locator('#logout2')).toBeVisible();
});


test('test once again', async ({ page, context }) => {
  //await context.clearCookies();
  // If you want only a specific test to not use the storage state file, then use the above statement to clear the cookies
  await page.goto('https://demoblaze.com/');
  await expect(page.locator('#logout2')).toBeVisible();
});