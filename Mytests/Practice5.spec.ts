import { test, expect } from '@playwright/test';

test('Verify Solutions link on QualitestGroup using Playwright locators', async ({ page }) => {
    // Step 1: Navigate to qualitestgroup.com
    await page.goto('https://qualitestgroup.com');
    // Step 2: Locate the "Solutions" button in main navigation using accessible name
    //const solutionsButton = page.getByRole('button', { name: 'Solutions' });
    const solutionsText = await page.getByRole('button', { name: 'Solutions' }).first().textContent();
    // Step 3: Get the text of the button
    //const solutionsText = await solutionsButton.first().textContent();
    // Step 4: Assert that the variable reads "Solutions"
    expect(solutionsText?.trim()).toBe('Solutions');
    // Step 5: Close the page
    await page.close();
});

test('Verify Solutions link on QualitestGroup using Xpath locator', async ({ page }) => {
    await page.goto('https://qualitestgroup.com');

    // Using XPath - stable, no first() needed
    const solutionsLink = page.locator('//nav[@aria-label="Main Navigation"]//a[@aria-controls="submenu-1"]');

    const solutionsText = await solutionsLink.textContent();
    expect(solutionsText?.trim()).toBe('Solutions');

    await page.close();
});

test('Verify Solutions link on QualitestGroup using CSS locator', async ({ page }) => {
    await page.goto('https://qualitestgroup.com');

    // Using CSS - stable, no first() needed (swap above line for this)
    const solutionsLink = page.locator('nav[aria-label="Main Navigation"] a[aria-controls="submenu-1"]');

    const solutionsText = await solutionsLink.textContent();
    expect(solutionsText?.trim()).toBe('Solutions');

    await page.close();
});