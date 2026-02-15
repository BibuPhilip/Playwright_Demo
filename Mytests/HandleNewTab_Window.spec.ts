import { test, expect } from '@playwright/test';

test.describe('Tests that handle a new tab, and also a new window', () => {
    test('Handle new Tab', async ({ context }) => {
        const same_Page = await context.newPage();
        await same_Page.goto('https://demoqa.com/browser-windows');
        const pagePromise = context.waitForEvent('page');
        await same_Page.getByRole('button', { name: 'New Tab' }).click();
        const new_Tab = await pagePromise;
        await expect(new_Tab.getByRole('heading', { name: 'This is a sample page' })).toContainText('This is a sample page');
    })

    test('Handle new Window', async ({ context }) => {
        const same_Page = await context.newPage();
        await same_Page.goto('https://demoqa.com/browser-windows');
        const pagePromise = context.waitForEvent('page');
        await same_Page.getByRole('button', { name: 'New Window', exact: true }).click();
        const new_Window = await pagePromise;
        await expect(new_Window.getByRole('heading', { name: 'This is a sample page' })).toContainText('This is a sample page');
    })
})