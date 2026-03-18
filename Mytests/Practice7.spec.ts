import {test, expect} from '@playwright/test'

test('Uber test', async({page}) => {
    await page.goto('https://www.uber.com/');
    const text1 = await page.locator('ul[data-testid="navigation-left-list-desktop"]>li:nth-of-type(1)>a').innerText();
    console.log('Ride: ' + text1);
    await expect(text1).toContain('Ride');

    
});

test('Uber test 2', async({page}) =>{
    await page.goto('https://www.uber.com/');
    /* const cityButton = page.locator('button[data-baseweb="button"][aria-label="Chicago"]').innerText();
    console.log('City button aria-label: ' + cityButton);
    await expect(cityButton).toContain('Chicago');
 */
    const cityButton = page.locator('button[data-baseweb="button"][aria-label*="city"]');
    const ariaLabel = await cityButton.getAttribute('aria-label');
    console.log('City button aria-label: ' + ariaLabel);
    await expect(ariaLabel).toContain('Chicago');
})


test('Uber test 3', async({page}) => {
    await page.goto('https://www.uber.com/');
    const text3 = await page.locator('div[data-uweb-guide-key="MAP_HERO_SIDE_MEDIA_WRAPPER"]>div>div>div>div>div:nth-of-type(2)>a:nth-of-type(1)').innerText();
    console.log('Schedule Ahead: ' + text3);
    await expect (text3).toContain('Schedule ahead');
})

//div[data-testid="responsive-desktop-nav"]>nav>div>div>ul:nth-of-type(2)>div:nth-of-type(1)>li>a
test('Uber test 4', async({page}) => {
    await page.goto('https://www.uber.com/');
    const text4 = await page.locator('div[data-testid="responsive-desktop-nav"]>nav>div>div>ul:nth-of-type(2)>div:nth-of-type(1)>li>a').innerText();
    console.log('Login is: ' + text4);
    await expect(text4).toContain('Log in');
})