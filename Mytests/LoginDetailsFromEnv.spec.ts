import { test, expect } from '@playwright/test';

    let baseURL = process.env.APP_BASE_URL || 'https://wrongURL.com';
test.describe('Login Tests', () => {
  test('should attempt login with credentials from environment', async ({ page }) => {
    // Get credentials from environment variables
    let username = process.env.APP_USERNAME || 'invalid@example.com';
    let password = process.env.APP_PASSWORD || 'wrongpassword';

    console.log('System env variables: ' + process.env.USERNAME + ', ' + process.env.PASSWORD + ', ' + process.env.BASE_URL);
    console.log('Project env variables: ' + process.env.APP_USERNAME + ', ' + process.env.APP_PASSWORD + ', ' + process.env.APP_BASE_URL + ', ' + process.env.MY_FREAKING_NAME + ', ' + process.env.MY_FREAKING_PWD);

    // Navigate to login page
    await page.goto(baseURL);

    // Verify login form is displayed
    expect(await page.locator('#input-email').isVisible()).toBe(true);
    expect(await page.locator('#input-password').isVisible()).toBe(true);

    // Fill in credentials using ID selectors (more reliable for this form)
    await page.locator('#input-email').fill(username);
    await page.locator('#input-password').fill(password);

    // Verify credentials are filled correctly
    expect(await page.locator('#input-email').inputValue()).toBe(username);
    expect(await page.locator('#input-password').inputValue()).toBe(password);

    // Click login button
    await page.locator('[value="Login"]').click();

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we're on either the login page or account page
    const pageTitle = await page.title();
    const isLoginPage = pageTitle === 'Account Login';
    const isAccountPage = pageTitle === 'My Account';
    
    await expect(isLoginPage || isAccountPage).toBe(true);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto(baseURL);

    await page.locator('#input-email').fill('invalid@example.com');
    await page.locator('#input-password').fill('wrongpassword');
    await page.locator('[value="Login"]').click();

    // Verify error message appears
    await expect(page).toHaveTitle('Account Login');
  });
});