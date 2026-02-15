// spec: Mytests/seed.test-plan.md
// seed: Mytests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Negative tests: invalid content and navigation', () => {
  test('Scenario 7 — Negative tests: invalid content and navigation', async ({ page }) => {
    // 1. Attempt to navigate to a non-existent page path and confirm the site handles 404 gracefully.
    await page.goto('https://demo.guru99.com/non-existent-page');
    // Assert that a user-friendly 404 message is visible
    await expect(page.getByRole('heading', { name: 'Not Found' })).toBeVisible();

    // 2. If there is a form on the landing page, attempt to submit invalid input and verify error messages.
    await page.goto('https://demo.guru99.com/');
    
    // Example: Try to find a newsletter or search form and submit invalid input
    const newsletterInput = page.getByRole('textbox').filter({ hasText: /email/i });
    const isFormPresent = await newsletterInput.isVisible();
    
    if (isFormPresent) {
      await newsletterInput.fill('invalid-email');
      await newsletterInput.press('Enter');
      
      // Wait for and assert error message using role-based locator
      await expect(page.getByText(/invalid|Please enter a valid email|required/i)).toBeVisible();
    } else {
      test.info().annotations.push({
        type: 'skip',
        description: 'No email form found on the page'
      });
    }
  });
});
