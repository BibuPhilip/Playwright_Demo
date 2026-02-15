import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('MouseClick_Specials', async()=>{
    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://demo.guru99.com/test/simple_context_menu.html');
    //right click/context click
    await page.getByText('right click me').click({button:'right'}); //.getByText('Copy').click();
    await new Promise(f => setTimeout(f, 5000));
    await page.locator('.context-menu-list.context-menu-root>li:nth-of-type(3)').click(); //Copy
    await new Promise(f => setTimeout(f, 5000));
    //double-click
    await page.getByText('Double-Click Me To See Alert').dblclick();
    await new Promise(f => setTimeout(f, 5000));
    await page.goto('https://the-internet.herokuapp.com/shifting_content');
    //Shift-click
    await page.getByText('Example 1: Menu Element').click({modifiers: ['Shift']});
    await page.getByText('Example 2: An image').click({modifiers: ['Shift']});
    await page.getByText('Example 3: List').click({modifiers: ['Shift']});


    await new Promise(f => setTimeout(f, 5000));

    await browser.close();
})
