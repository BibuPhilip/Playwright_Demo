import { test, expect } from '@playwright/test';

// Find the Solutions button
test.describe('Tests to assert the text on locator', async () => {

  test('Identify button using XPath position', async ({ page }) => {
    await page.goto('https://www.qualitestgroup.com/');
    // Using XPath with index to find first direct button child of first list item
    await expect(page.locator('//*[@aria-label="Main Navigation"]/ul/li[1]/a')).toContainText('Solutions');
  });

  test('Identify button using CSS selector with position', async ({ page }) => {
    await page.goto('https://www.qualitestgroup.com/');
    // Using CSS selector with position to target the first button in the first list item
    await expect(page.locator('nav[aria-label="Main Navigation"]>ul>li:nth-of-type(1)>a')).toContainText('Solutions');
    //await expect(page.locator('nav[aria-label="Main Navigation"]>ul>li:first-of-type>a')).toContainText('Solutions');
    //.article-body>section:nth-of-type(4)>div:nth-of-type(2)>div>div>div>div>ul>li:nth-of-type(1)>a>div
    const QAtext = await page.locator('.article-body>section:nth-of-type(4)>div:nth-of-type(2)>div>div>div>div>ul>li:nth-of-type(1)>a>div').innerText();
    console.log('The text is: ' + QAtext);
    await expect (QAtext).toContain('Quality Assurance');
    const Careertext = await page.locator('.career-path__flex>div:nth-of-type(1)>h3').innerText();
    console.log('Career text is: ' + Careertext);
    await expect (Careertext).toContain('Students & Graduates');

    const Partnerstext = await page.locator('.custom-menu>li:nth-of-type(5)>a').innerText();
    console.log('Partner text is: ' + Partnerstext);
    await expect(Partnerstext).toContain('Partners');
  });

})