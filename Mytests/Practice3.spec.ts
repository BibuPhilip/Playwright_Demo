import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/help/example-domains');

  await expect(page).toHaveTitle('Example Domains');
});