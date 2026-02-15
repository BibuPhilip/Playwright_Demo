import{test, expect} from '@playwright/test';

test('Frames test', async({page}) =>{
    await page.goto('https://letcode.in/frame');
    const framesCount = await page.frames().length;
    console.log('Frames count: ' + framesCount);

    const myFrame = await page.frame('firstFr');

    await myFrame?.locator('input[placeholder="Enter name"]').fill('Bibu Philip');
    await myFrame?.locator('input[placeholder="Enter email"]').fill('abcd1234@gmail.com');

    const txtContent = await myFrame?.locator('.title.has-text-info').textContent();

    await expect(txtContent).toContain('You have entered');
    await new Promise(f => setTimeout(f, 3000));
    //using frameLocator
    const myframe = await page.frameLocator('#firstFr');
    await myframe.locator('input[placeholder="Enter name"]').fill('B P');
    await myframe.locator('input[placeholder="Enter email"]').fill('pqrs6789@gmail.com');

    const txtContent2 = await myframe.locator('.title.has-text-info').textContent();

    await expect(txtContent2).toContain('You have entered');

    const InnerFrame = await myframe.frameLocator('iframe[src="innerframe"]');
    await InnerFrame.getByPlaceholder('Enter email').fill('xyz4567@gmail.com');

    await new Promise(f => setTimeout(f, 3000));
})