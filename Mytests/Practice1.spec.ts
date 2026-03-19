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

    const text1 = await page.locator('form[id="SubscribeForm"]>div:nth-of-type(3)>h2').innerText();
    console.log('Company Details text verification: ' + text1);
    await expect(text1).toContain('COMPANY DETAILS');

    const text2 = await page.locator('.card-body>p:nth-of-type(1)').innerText();
    console.log('HR Details text is: ' + text2);
    await expect(text2).toContain('HR Magazine');

    const text3 = await page.locator('form>div:nth-of-type(2)>label').innerText();
    console.log('Text 3 is: ' + text3);
    await expect (text3).toContain('I do not wish to receive FREE copies of HR Magazine regularly');
    //I do not wish to receive FREE copies of HR Magazine regularly.

    //await new Promise(f => setTimeout(f, 15000));
    await browser.close();
})