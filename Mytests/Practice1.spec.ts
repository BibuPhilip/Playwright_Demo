import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('Practice1', async()=>{
    const browser:Browser = await chromium.launch({headless:false});
    const page:Page = await browser.newPage();
    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');

    //I do not wish to receive FREE copies of HR Magazine regularly.
    //await page.getByText('I do not wish to receive FREE copies of HR Magazine regularly.').click();
    await page.getByRole('radio',{name: 'I do not wish to receive FREE copies of HR Magazine regularly.'}).click();
    await page.getByRole('textbox',{name: 'Title'}).first().fill('Mr');
    await page.getByRole('textbox',{name:'Initials'}).fill('BP');
    await page.getByRole('textbox',{name:'Surname'}).fill('Philip');
    await page.getByRole('textbox',{name:'Direct Email'}).fill('abcd@gmail.com');
    await page.getByRole('textbox',{name: 'Job Title'}).fill('QA Automation Architect');

    await page.selectOption('#Contact_CountryCode',{value:'IN'});
    await page.getByRole('textbox',{name:'Postcode / Zipcode'}).fill('65123');
    await page.selectOption('#Question-100034',{label:'Digital'});
    await page.selectOption('#Question-758',{value:'HRJF-I'});
    await page.selectOption('#Question-759',{value:'HRIND-L'});
    await page.getByRole('checkbox',{name:'HR Technology (Software and Systems)'}).check();
    await page.getByRole('checkbox',{name:'Learning & Development'}).check();

    await new Promise(f => setTimeout(f, 15000));
    await browser.close();
})