import {test,expect} from '@playwright/test'

test('Network interception & mocking demo', async ({ page }) => {
  await page.route('**/*', async (route) => {
    const url = route.request().url();

    if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.gif')) {
      // Block all image requests
      console.log('Blocked: ' + url);
      await route.abort('aborted');
    } else if (url.includes('/api')) {
      // Mock the user API
      console.log('Mocked response: ' + url);
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 1, name: 'Mocked User' })
      });
    } else if (url.includes('/auth')) {
      // Modify headers for the auth call
      console.log('Modified the request header and added new token to it: ' + url);
      const headers = {
        ...route.request().headers(),
        Authorization: 'Bearer fake_token'
      };
      await route.continue({ headers });
    } else {
      // Let all other requests go as normal
      await route.continue();
    }
  });

  await page.goto('https://www.spicejet.com/');
  await page.waitForTimeout(6000);
});