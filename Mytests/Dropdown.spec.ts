import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('Dropdown', async()=>{

    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');
    
    const countryDowndown = '#Contact_CountryCode';

    await page.selectOption(countryDowndown, { index: 10});
    //await page.selectOption(countryDowndown, { value: 'IN'});
    //await page.selectOption(countryDowndown, { label: 'Cyprus'});

    //#Contact_CountryCode>option
    const allOptions = await page.$$(countryDowndown + '>option');

    console.log('Total options: '+ allOptions.length);
    for(const e of allOptions)
    {
        console.log('Option: '+ await e.textContent());
        if(await e.textContent() === 'India')
        {
            await page.selectOption(countryDowndown, { label: 'India'});
            break;
        }
    }

    await new Promise(f => setTimeout(f, 10000));
    await browser.close();
})

test('Multi-select dropdown', async({page}) =>{
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    //await page.locator('#multi-select');
    await page.selectOption('#multi-select',[
        {label:'Florida'},
        {index:4},
        {value:'Texas'}
    ])
    await page.getByRole('button',{name:'Get Last Selected'}).click();
    //await expect(page.locator('.groupradiobutton block break-words')).toContainText('Florida,Ohio,Texas');
    await new Promise(f => setTimeout(f, 10000));
})

test('JQuery Dropdown Search', async({page}) =>{
    await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
    //let CountryName:string = "Netherlands";
    //CountryName = "Australia";

    await SelectDropdown("Netherlands");
    await SelectDropdown("Australia");
    await SelectDropdown("Japan");
    await SelectDropdown("South Africa");

    async function SelectDropdown(CountryName:string) {
        await page.locator('#country+span').click();

        await page.locator('#select2-country-results').locator(`li:has-text("${CountryName}")`).click();
        await new Promise(f => setTimeout(f, 4000));
    }
})