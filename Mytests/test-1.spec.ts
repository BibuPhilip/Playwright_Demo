import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.spicejet.com/');
  await page.getByTestId('to-testID-origin').getByRole('textbox').click();
  await page.getByTestId('to-testID-origin').getByRole('textbox').fill('hyd');
  await page.getByTestId('to-testID-destination').getByRole('textbox').fill('koc');
  await page.getByTestId('to-testID-destination').getByRole('textbox').click();
  await page.getByTestId('to-testID-destination').getByRole('textbox').fill('koc');
  await page.getByTestId('undefined-month-October-2025').getByText('13').click();
  await page.getByTestId('return-date-dropdown-label-test-id').getByTestId('svg-img').click();
  await page.getByTestId('undefined-month-October-2025').getByTestId('undefined-calendar-day-20').getByText('20').click();
  await page.getByTestId('home-page-flight-cta').click();
  await page.locator('div').filter({ hasText: /^Search again$/ }).first().click();
  //await page.getByTestId('departure-date-dropdown-label-test-id').locator('path').click();
  await page.getByTestId('departure-date-dropdown-label-test-id').locator('div').nth(1).click();
  await page.getByTestId('undefined-month-October-2025').getByText('14').click();
  await page.getByTestId('return-date-dropdown-label-test-id').locator('div').nth(1).click();
  await page.getByTestId('return-date-dropdown-label-test-id').locator('div').nth(1).click();
  await page.getByTestId('undefined-month-October-2025').getByText('21').click();
  await page.getByTestId('home-page-flight-cta').click();
});