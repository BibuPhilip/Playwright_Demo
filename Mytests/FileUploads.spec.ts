import {test, expect, Page, Browser, Locator, BrowserContext} from '@playwright/test';
import path from 'path';
import{ chromium, firefox, webkit } from 'playwright';
test('FileUploads', async()=>{
    const browser: Browser = await webkit.launch({ headless: false});
    const page: Page = await browser.newPage();
    //https://davidwalsh.name/demo/multiple-file-upload.php
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    //for all file upload buttons, the html tag <input type="file" should be there
    //multiple file uploads....for multiple file uploads, html should have "multiple" attribute in input tag
    //upload multiple files
    await page.locator('input[name="filesToUpload"]').setInputFiles([path.join('D:\\Playwright_Demo\\PW_Practice_FileUpload\\JUnit built-in version in Eclipse.docx'),
                        path.join('D:\\Playwright_Demo\\PW_Practice_FileUpload\\Alo vera.jpg') ,
                        path.join('D:\\Playwright_Demo\\PW_Practice_FileUpload\\Eligibility for Driving Lessons.pdf')
    ]);
    await new Promise(f => setTimeout(f, 5000));
    //de-select all the files uploaded
    await page.locator('input[name="filesToUpload"]').setInputFiles([]);
    await new Promise(f => setTimeout(f, 5000));
    //select only 1 file even though multiple files are allowed
    await page.locator('input[name="filesToUpload"]').setInputFiles('D:\\Playwright_Demo\\PW_Practice_FileUpload\\JUnit built-in version in Eclipse.docx');
    await new Promise(f => setTimeout(f, 5000));
    await page.locator('input[name="filesToUpload"]').setInputFiles([]);
    await new Promise(f => setTimeout(f, 5000));
    //create a file on the fly and upload
    await page.locator('input[name="filesToUpload"]').setInputFiles({
        name: 'Bibu.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from(`This is Bibu's file content created on the fly`)
    });
    await new Promise(f => setTimeout(f, 5000));
    await browser.close();
})