import {test, expect} from '@playwright/test';

test('Test with multiple windows', async({page}) =>{
    await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');

    await console.log(page.url());

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByText('Follow On Twitter').click()
    ]);
    console.log(newWindow.url());

})

test('Test with both X and Facebook', async({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');

    const [TwoWindows] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByText('Follow Twitter & Facebook').click()
    ]);

    await TwoWindows.waitForLoadState();

    const pages = TwoWindows.context().pages();
    console.log('No of tabs: ' + pages.length);
    
    pages.forEach(tab =>{
        console.log(tab.url());
    })

/*     let facebookPage: Page | undefined;
    for(let index =0;index<pages.length;index++){
        const URL = await pages[index]?.url();
        if (URL === 'https://www.facebook.com/lambdatest/'){
            facebookPage = pages[index];
            if(!facebookPage){
                throw new Error('Facebook page was not found');
            }
            await expect(facebookPage.locator('h1:has-text("LambdaTest")')).toBeVisible();
        }
    } */

    const facebookPage = pages.find(p => p.url() === 'https://www.facebook.com/lambdatest/');

    if (!facebookPage) {
        throw new Error('Facebook page was not found');
    }

    await expect(facebookPage.locator('h1:has-text("LambdaTest")')).toBeVisible(); //web-first assertion
}) 