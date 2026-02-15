import { test, expect } from '@playwright/test';

test('API Monitoring test', async ({ page }) => {

    page.on('request', async (request) =>{
        console.log(`Request URL is: ${request.url()}`);
        console.log(`Request Method is: ${request.method()}`);
        console.log(`Request Header is: ${JSON.stringify(request.headers(), null, 2)}`);
    });

    page.on('response', (response) =>{
        console.log(`Response status code: ${response.status()}`);

    });

    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');
  
});