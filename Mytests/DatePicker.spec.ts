import {test, expect} from '@playwright/test';

test('Datepicker test', async({page})=>{
await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

await page.getByRole("textbox",{name: 'birthday'}).fill('2025-09-30');
//await page.getByRole("textbox",{name: 'birthday'}).fill('09/16/2025');

await page.waitForTimeout(5000);

})

//.table-condensed>thead>tr:nth-of-type(2)>th:nth-of-type(2)

test('Datepicker 2 test', async ({ page }) => {
await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo');

await page.getByRole("textbox",{name:'Start date'}).click();
  
let dateToSelect: string = "June 2022";
const MonthYearSelector = page.locator('.table-condensed>thead>tr:nth-of-type(2)>th.datepicker-switch').first(); //month-year picker
const Prev = page.locator('.table-condensed>thead>tr:nth-of-type(2)>th.prev').first(); //prev
const Next = page.locator('.table-condensed>thead>tr:nth-of-type(2)>th.next').first(); //next

while(await MonthYearSelector.textContent() != dateToSelect){
    await Prev.click();
}

//await expect(await MonthYearSelector.textContent()).toEqual(dateToSelect); // normal assertion, hence not preferred
await expect(MonthYearSelector).toHaveText(dateToSelect); // web-first assertion, hence preferred

await page.waitForTimeout(5000);
});
