import { test, expect } from '@playwright/test';

test('enter test description here', async ({ page }) => {
await page.goto('enter page URL here');
  
await page.waitForTimeout(5000);
});
