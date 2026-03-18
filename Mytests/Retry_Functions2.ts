// =============================================================================
// REUSABLE RETRY HELPER FUNCTION
// =============================================================================
// This function allows you to retry any assertion or operation that might be
// flaky (e.g., checking if an element appears, verifying API response, etc.)
// It will attempt the operation up to N times with a delay between attempts.
// =============================================================================

/**
 * Retries an operation until it succeeds or max attempts are reached.
 * 
 * @param operation - A function that performs the assertion/check. Should throw if it fails.
 * @param maxAttempts - Maximum number of times to try (default: 3)
 * @param delayMs - Milliseconds to wait between retries (default: 1000)
 * @param operationName - Optional name for better error messages (default: 'Operation')
 * 
 * @throws Error if all attempts fail
 * 
 * @example
 * await retryAssertion(
 *   async () => {
 *     const status = await page.locator('.status').textContent();
 *     if (status !== 'Ready') throw new Error('Not ready yet');
 *   },
 *   5,    // try 5 times
 *   2000, // wait 2 seconds between tries
 *   'Check status is Ready'
 * );
 */
async function retryAssertion(
  operation: () => Promise<void>,
  maxAttempts: number = 3,
  delayMs: number = 1000,
  operationName: string = 'Operation'
): Promise<void> {
  
  // Variable to store the last error that occurred
  // We'll throw this if all attempts fail
  let lastError: Error | unknown;

  // Loop through each attempt (1, 2, 3, ... maxAttempts)
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    
    try {
      // Try to execute the operation
      console.log(`[${operationName}] Attempt ${attempt} of ${maxAttempts}`);
      
      await operation();
      
      // If we reach this line, the operation succeeded!
      // Log success and exit the function
      console.log(`[${operationName}] ✅ Succeeded on attempt ${attempt}`);
      return; // Exit the function - no need to retry
      
    } catch (error) {
      // The operation failed (threw an error)
      // Store the error in case this is the last attempt
      lastError = error;
      
      // Check if we have more attempts left
      if (attempt < maxAttempts) {
        // We have more attempts - log the failure and wait before retrying
        console.log(`[${operationName}] ❌ Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        console.log(`   Error: ${error instanceof Error ? error.message : String(error)}`);
        
        // Wait for the specified delay before the next attempt
        await sleep(delayMs);
        
      } else {
        // This was the last attempt and it failed
        // We'll throw the error after the loop
        console.log(`[${operationName}] ❌ All ${maxAttempts} attempts failed.`);
      }
    }
  }
  
  // If we reach this point, all attempts failed
  // Throw a detailed error message
  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `${operationName} failed after ${maxAttempts} attempts. Last error: ${errorMessage}`
  );
}


// =============================================================================
// HELPER: Sleep function
// =============================================================================
// Simple utility to pause execution for a specified number of milliseconds.
// This is used to add delays between retry attempts.
// =============================================================================

/**
 * Pauses execution for the specified number of milliseconds.
 * 
 * @param ms - Number of milliseconds to sleep
 * 
 * @example
 * await sleep(2000); // Wait 2 seconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// =============================================================================
// USAGE EXAMPLES
// =============================================================================

import { test, expect } from '@playwright/test';

test('Example 1: Retry checking if element contains expected text', async ({ page }) => {
  await page.goto('https://example.com');
  
  // This assertion might be flaky if the page loads slowly
  // So we retry it up to 5 times with 2-second delays
  await retryAssertion(
    async () => {
      // Get the text content of the element
      const text = await page.locator('.status').textContent();
      
      // Check if it matches what we expect
      // If not, throw an error to trigger a retry
      if (text !== 'Processing complete') {
        throw new Error(`Expected 'Processing complete' but got '${text}'`);
      }
    },
    5,     // max 5 attempts
    2000,  // wait 2 seconds between attempts
    'Check processing status'
  );
  
  console.log('Status is correct!');
});


test('Example 2: Retry checking if element is visible', async ({ page }) => {
  await page.goto('https://example.com');
  
  await retryAssertion(
    async () => {
      // Check if the success message is visible
      const isVisible = await page.locator('.success-message').isVisible();
      
      // If not visible, throw an error to retry
      if (!isVisible) {
        throw new Error('Success message is not visible yet');
      }
    },
    3,    // max 3 attempts
    1000, // wait 1 second between attempts
    'Wait for success message'
  );
  
  console.log('Success message appeared!');
});


test('Example 3: Retry checking element count', async ({ page }) => {
  await page.goto('https://example.com/items');
  
  await retryAssertion(
    async () => {
      // Count how many items are on the page
      const count = await page.locator('.item').count();
      
      // We expect exactly 5 items
      if (count !== 5) {
        throw new Error(`Expected 5 items but found ${count}`);
      }
    },
    4,    // max 4 attempts
    1500, // wait 1.5 seconds between attempts
    'Verify item count'
  );
  
  console.log('Correct number of items loaded!');
});


test('Example 4: Retry with Playwright expect (wrapped)', async ({ page }) => {
  await page.goto('https://example.com');
  
  await retryAssertion(
    async () => {
      // Use Playwright's expect inside the retry
      // If the assertion fails, it will throw an error automatically
      await expect(page.locator('.counter')).toHaveText('42');
    },
    3,
    1000,
    'Check counter equals 42'
  );
});


test('Example 5: Retry API call verification', async ({ request }) => {
  await retryAssertion(
    async () => {
      // Make an API call
      const response = await request.get('https://api.example.com/status');
      const data = await response.json();
      
      // Check if the status is what we expect
      if (data.status !== 'ready') {
        throw new Error(`API status is '${data.status}', expected 'ready'`);
      }
    },
    10,   // API might take a while, so try 10 times
    3000, // wait 3 seconds between attempts
    'Wait for API to be ready'
  );
});


test('Example 6: Using default parameters', async ({ page }) => {
  await page.goto('https://example.com');
  
  // If you omit parameters, it uses defaults:
  // maxAttempts = 3
  // delayMs = 1000
  // operationName = 'Operation'
  await retryAssertion(
    async () => {
      const color = await page.locator('.box').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      if (color !== 'rgb(0, 128, 0)') {
        throw new Error(`Box is ${color}, expected green`);
      }
    }
  );
});


// =============================================================================
// BONUS: Variant that returns a value instead of just checking
// =============================================================================
// Sometimes you want to retry getting a value, not just checking a condition.
// This variant returns the result when successful.
// =============================================================================

/**
 * Retries an operation that returns a value until it succeeds.
 * 
 * @param operation - Function that returns a value. Should throw if it fails.
 * @param maxAttempts - Maximum number of times to try (default: 3)
 * @param delayMs - Milliseconds to wait between retries (default: 1000)
 * @param operationName - Optional name for better error messages
 * 
 * @returns The value returned by the operation when it succeeds
 * @throws Error if all attempts fail
 */
async function retryUntilSuccess<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000,
  operationName: string = 'Operation'
): Promise<T> {
  
  let lastError: Error | unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`[${operationName}] Attempt ${attempt} of ${maxAttempts}`);
      
      // Try to get the value
      const result = await operation();
      
      // Success! Return the value
      console.log(`[${operationName}] ✅ Succeeded on attempt ${attempt}`);
      return result;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < maxAttempts) {
        console.log(`[${operationName}] ❌ Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await sleep(delayMs);
      } else {
        console.log(`[${operationName}] ❌ All ${maxAttempts} attempts failed.`);
      }
    }
  }
  
  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `${operationName} failed after ${maxAttempts} attempts. Last error: ${errorMessage}`
  );
}


test('Example 7: Retry getting a value', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Retry until we get a valid price value
  const price = await retryUntilSuccess(
    async () => {
      const priceText = await page.locator('.price').textContent();
      
      // If price is null or empty, retry
      if (!priceText || priceText.trim() === '') {
        throw new Error('Price is not loaded yet');
      }
      
      // Return the price when successfully loaded
      return priceText;
    },
    5,
    1000,
    'Get product price'
  );
  
  console.log(`Got price: ${price}`);
});