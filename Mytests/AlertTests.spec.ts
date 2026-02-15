import {test, expect} from '@playwright/test'

test('Alert Test', async({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on('dialog', async(alert) =>{
        const alertMessage = alert.message();
        console.log(alertMessage);
        await alert.accept();
    })

    await page.getByRole('button',{name: 'Click Me'}).nth(0).click();

})

test('Confirm or Dismiss Test', async({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on('dialog', async(alert) =>{
        const alertMessage = alert.message();
        console.log(alertMessage);
        await alert.dismiss();
    })

    await page.getByRole('button',{name: 'Click Me'}).nth(1).click();
    await expect(page.locator('#confirm-demo')).toContainText('Cancel!');
})

test('Prompt Test', async({page}) => {
    await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');

    page.on('dialog', async(alert) =>{
        const DialogMessage = alert.message();
        console.log('Dialog Message: ' + DialogMessage);
        const PromptMessage = alert.defaultValue();
        console.log('Prompt Message: ' + PromptMessage);
        await alert.accept('Bibu');
    })

    await page.getByRole('button',{name: 'Click Me'}).nth(2).click();
    await expect(page.locator('#prompt-demo')).toContainText('Bibu');
})