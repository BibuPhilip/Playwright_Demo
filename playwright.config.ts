import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env'), override: true });

export default defineConfig({
  //globalSetup: './test-Storage_state/global-setup', ////for running files in test-Storage_state
  //testDir: './tests',
  //testDir: './test-Storage_state', //for running files in test-Storage_state
  testDir: './Mytests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 3,
  /* Fail the build on CI if test.only is left in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Workers: use 1 worker on CI, default otherwise */
  ...(process.env.CI ? { workers: 1 } : {}),

  /* Reporter */
  //reporter: 'html',
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  //total time to be taken for any test should be 60 seconds; default is 30 seconds, so I am overriding the default value here
  timeout: 60000,
  //any expect assertion should take only max of 5 seconds
  expect: {
    timeout: 5000
  },

  /* Shared settings for all projects */
  use: {
    headless: false, // Run browsers in headed mode (visible)
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Record video only on test failure
    screenshot: 'only-on-failure', // Take screenshot only on failure
    trace: 'on-first-retry', // Collect trace on first retry
    //any navigation like goto(), back(), forward, clicking on link and navigating to some other page etc should take max of 50 seconds
    navigationTimeout: 50000,
    //any action like button click, dropdown click, checkbox click etc (actions on any locator) should take max of 30 seconds
    actionTimeout: 30000,
    //baseURL: process.env.BASE_URL,
    //baseURL: 'https://the-internet.herokuapp.com/', // Base URL for page.goto()
    //storageState: './test-Storage_state/LoginAuth.json', ////for running files in test-Storage_state folder
    //storageState: './test-Storage_state2/Authentication.json', ////for running files in test-Storage_state2 folder
    //launchOptions:{
    //  slowMo:1000
    //}
  },

  /* Configure projects for different browsers & devices */
  projects: [
    /* Desktop Browsers */
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    /* {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Mobile Emulation */
    //{
    //  name: 'Pixel 7 (Chrome)',
    //  use: { ...devices['Pixel 7'] },
    //},
    //{
    //  name: 'iPhone 13 (Safari)',
    //  use: { ...devices['iPhone 13'] },
    //},
  ],

  /* Start local dev server before running tests */
  //webServer: {
  //  command: 'npm run dev',      // Replace with your app start command
  //  url: 'http://localhost:3000', // Must match your app's dev server
  //  reuseExistingServer: !process.env.CI, // Reuse in local dev, restart in CI
  //  timeout: 60_000,              // Wait up to 60s for server to start
  //},
});
