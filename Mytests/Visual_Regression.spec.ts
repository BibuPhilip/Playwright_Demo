import {test,expect} from '@playwright/test';

test('Full-Page visual regression', async({page}) => {
    await page.goto('https://www.spicejet.com/');
    //await page.goto('https://www.qualitestgroup.com/');
    await page.waitForLoadState('networkidle');
    await expect (page).toHaveScreenshot('homepage-full.png',{
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
        animations: 'disabled',
        caret: 'hide',
    });
});