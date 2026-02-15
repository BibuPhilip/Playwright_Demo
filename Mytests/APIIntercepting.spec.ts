import{test} from '@playwright/test'

test('API Intercepting feature', async ({ page }) => {

    // Intercept all requests
    await page.route('https://www.magupdate.co.uk/magazine-subscription/phrr', async (route) => {
        // Clone the original headers
        const headers = {
            ...route.request().headers(), // spread existing headers
            'X-Custom-header': 'Intercept-check' // add your new one
        };

        console.log('Inside adding step: ' + JSON.stringify(headers, null, 2));

        // Continue the request with modified headers
        await route.continue({ headers });
    });

    // Listen for all outgoing requests
    page.on('request', request => {
        console.log(`Request headers are: ${JSON.stringify(request.headers(), null, 2)}`);
        console.log(`Request type is: ${request.method()}`);
    });

    // Navigate to target site
    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');
    await page.waitForLoadState('networkidle');
});