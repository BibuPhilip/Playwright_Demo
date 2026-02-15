import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.spicejet.com/');
  await page.getByTestId('round-trip-radio-button').locator('circle').click();
  await page.getByTestId('to-testID-origin').getByRole('textbox').fill('hyd');
  await page.getByTestId('to-testID-origin').getByRole('textbox').click();
  await page.getByTestId('to-testID-destination').getByRole('textbox').fill('koc');
  await page.getByTestId('to-testID-destination').getByRole('textbox').click();
  await page.getByTestId('departure-date-dropdown-label-test-id').getByTestId('svg-img').click();
  await page.getByTestId('undefined-month-November-2025').getByText('26').click();
  await page.getByTestId('return-date-dropdown-label-test-id').getByTestId('svg-img').click();
  await page.getByTestId('undefined-month-December-2025').getByTestId('undefined-calendar-day-23').getByText('23').click();
  await page.getByTestId('home-page-flight-cta').click();
});

//function to add two numbers