import { test, expect } from '@playwright/test';

test.describe('Seed smoke tests', () => {
  test('page loads and has title and links', async ({ page }) => {
    await page.goto('https://demo.guru99.com/', { waitUntil: 'domcontentloaded' });

    // Basic visibility check
    await expect(page.locator('body')).toBeVisible();

    // Title should be present and non-empty
    const title = await page.title();
    expect(title).toBeTruthy();

    // Page should contain at least one link
    const linkCount = await page.locator('a').count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('title contains expected brand fragment', async ({ page }) => {
    await page.goto('https://demo.guru99.com/', { waitUntil: 'networkidle' });
    const title = await page.title();
    // Check for a reasonable brand fragment; this is intentionally forgiving
    expect(title.toLowerCase()).toContain('guru');
  });
});
