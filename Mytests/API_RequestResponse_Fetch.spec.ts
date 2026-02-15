import { test, expect } from '@playwright/test'

test('API Intercept using fetch', async ({ page }) => {
    await page.route('**/*', async (route) => {
        const url = route.request().url();
        if (url.includes('/api')) {
            const newHeaders = {
                ...route.request().headers(),
                Authorization: 'Bearer my-token'
            };
            const response = await route.fetch({ headers: newHeaders }); 
            console.log('Response status:', response.status());
            
            try {
                const data = await response.json();
                console.log('Original data:', data);

                // Modify the data before fulfilling
                data.customField = 'Intercepted by Playwright';
                
                // Convert headers object to a plain object
                const headers: Record<string, string> = {};
                for (const [key, value] of Object.entries(response.headers())) {
                    headers[key] = value;
                }
                
                await route.fulfill({
                    status: response.status(),
                    headers: headers,
                    body: JSON.stringify(data)
                });
            } catch (error) {
                // If response is not JSON, just pass it through
                await route.continue();
            }
        }
        else {
      // Let all other requests go as normal
            await route.continue();
        }
    });
    await page.goto('https://www.spicejet.com/');
    await page.waitForTimeout(6000);
});