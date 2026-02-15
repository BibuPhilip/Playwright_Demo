import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import{ chromium, firefox, webkit } from 'playwright';
test('Dropdown', async()=>{


    const browser: Browser = await chromium.launch({ headless: false});
    const page: Page = await browser.newPage();
    await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');

    await page.getByText('I do not wish to receive FREE copies of HR Magazine regularly.').click();
    await page.getByRole('textbox',{name:'Title'}).first().fill('Mr');
    await page.getByRole('textbox',{name:'Initials'}).fill('BP');
    await page.getByRole('textbox',{name:'Surname'}).fill('Philip');
    await page.getByPlaceholder('Direct Email').fill('abcd@gmail.com');
    await page.getByPlaceholder('Job Title').fill('QA Automation Architect');
    await page.getByRole('checkbox',{name:'CSR (Corporate Social Responsibility)'}).check();
    await page.getByRole('checkbox',{name: 'Learning & Development'}).check();


    await new Promise(f => setTimeout(f, 15000));
    await browser.close();
})