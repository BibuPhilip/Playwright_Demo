import{test,expect} from '@playwright/test'

test('Generic vs Locator Assertions',async ({page}) =>{
    await page.goto('https://conduit.bondaracademy.com/');

    const banner = page.locator('div.banner h1');
    const txtbanner = await banner.textContent();
    expect (txtbanner).toEqual('conduit');

    //const articleTitle = await page.locator('app-article-list>app-article-preview');
    const articleTitle = await page.locator('app-article-list'); // this is locator
    //const text = await articleTitle.innerText(); // this is generic assertion, and it failed
    //expect (text).toContain('Bondar Academy');
    await expect (articleTitle).toContainText('Bondar Academy'); //this is locator assertion, and it passed
})