// =============================================================================
// GENERIC RETRY FUNCTION
// =============================================================================
// This function retries any async operation that might fail temporarily.
//
// The <T> is called a GENERIC TYPE PARAMETER.
// It means: "This function works with ANY return type."
// Whatever type the async function (fn) returns, retry() will return the same type.
//
// Examples:
//   fn returns Promise<string>  → retry() returns Promise<string>
//   fn returns Promise<number>  → retry() returns Promise<number>
//   fn returns Promise<User>    → retry() returns Promise<User>
//
// Parameters:
//   fn      - The async function to retry. It takes no arguments and returns a Promise<T>
//   retries - How many times to retry AFTER the first attempt
//   delay   - How many milliseconds to wait between retries
//
// Returns:
//   A Promise<T> - same type as whatever fn() returns
//
// Throws:
//   An Error if ALL attempts (1 initial + retries) fail
// =============================================================================

async function retry<T>(
  fn: () => Promise<T>,    // fn is any async function that returns a value of type T
  retries: number,         // number of EXTRA attempts after the first one fails
  delay: number            // milliseconds to wait between each attempt
): Promise<T> {            // the return type matches whatever fn() returns

  // ---------------------------------------------------------------------------
  // HOW IT WORKS:
  // We try the function once. If it succeeds, we return the result immediately.
  // If it fails, we wait 'delay' ms and try again, up to 'retries' more times.
  // If it fails every single time, we throw the last error we received.
  // ---------------------------------------------------------------------------

  // Store the last error so we can throw it if all attempts fail
  let lastError: unknown;

  // Total attempts = 1 (initial) + retries (extra attempts)
  // Example: retries = 3 means we try a total of 4 times (1 + 3)
  const totalAttempts = 1 + retries;

  // Loop through each attempt
  for (let attempt = 1; attempt <= totalAttempts; attempt++) {

    try {
      // -----------------------------------------------------------------------
      // TRY: Execute the async function
      // -----------------------------------------------------------------------
      // If fn() succeeds, we immediately return the result.
      // The <T> generic ensures the return type matches whatever fn() returns.
      console.log(`Attempt ${attempt} of ${totalAttempts}...`);

      const result = await fn();

      // If we reach this line, fn() succeeded! Return the result.
      console.log(`✅ Attempt ${attempt} succeeded!`);
      return result;

    } catch (error) {
      // -----------------------------------------------------------------------
      // CATCH: fn() threw an error
      // -----------------------------------------------------------------------
      // Store the error in case this is the last attempt
      lastError = error;

      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`❌ Attempt ${attempt} failed. Reason: ${errorMessage}`);

      // Check if there are more attempts left
      if (attempt < totalAttempts) {
        // There are more attempts - wait before trying again
        console.log(`⏳ Waiting ${delay}ms before next attempt...`);
        await sleep(delay);
      } else {
        // No more attempts left - we'll throw the error after the loop
        console.log(`🚫 All ${totalAttempts} attempts failed.`);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // If we reach here, ALL attempts have failed.
  // Throw the last error so the caller knows what went wrong.
  // ---------------------------------------------------------------------------
  const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Failed after ${totalAttempts} attempt(s). Last error: ${errorMessage}`);
}


// =============================================================================
// HELPER: sleep()
// =============================================================================
// Pauses execution for the given number of milliseconds.
// Used to wait between retry attempts.
// =============================================================================

function sleep(ms: number): Promise<void> {
  // setTimeout fires after 'ms' milliseconds and resolves the Promise
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================================
// EXAMPLES
// =============================================================================
// Below are several real-world examples showing how retry<T>() works
// with different return types and different scenarios.
// =============================================================================


// -----------------------------------------------------------------------------
// EXAMPLE 1: retry<string>
// fn() returns Promise<string>, so retry() also returns Promise<string>
// -----------------------------------------------------------------------------

async function example1_retryString(): Promise<void> {

  // Simulate a flaky function that returns a string
  // It fails the first 2 times and succeeds on the 3rd attempt
  let callCount = 0;

  const fetchUsername = async (): Promise<string> => {
    callCount++;
    if (callCount < 3) {
      throw new Error(`Server not ready (call #${callCount})`);
    }
    return 'Alice'; // Returns a string on the 3rd call
  };

  // retry<string> tells TypeScript: "The result will be a string"
  // But TypeScript can actually INFER this from fetchUsername's return type!
  const username = await retry<string>(
    fetchUsername,  // fn - the function to retry
    3,              // retries - retry up to 3 more times after the first failure
    500             // delay - wait 500ms between attempts
  );

  console.log(`Got username: ${username}`); // "Got username: Alice"
}


// -----------------------------------------------------------------------------
// EXAMPLE 2: retry<number>
// fn() returns Promise<number>, so retry() also returns Promise<number>
// -----------------------------------------------------------------------------

async function example2_retryNumber(): Promise<void> {

  // Simulate a flaky function that returns a number
  let callCount = 0;

  const fetchUserCount = async (): Promise<number> => {
    callCount++;
    if (callCount < 2) {
      throw new Error('Database temporarily unavailable');
    }
    return 42; // Returns a number on the 2nd call
  };

  // TypeScript INFERS the type as number from fetchUserCount's return type
  // So you can skip the explicit <number> and just write retry(...)
  const userCount = await retry(
    fetchUserCount,
    2,     // retry up to 2 more times
    1000   // wait 1 second between attempts
  );

  console.log(`Total users: ${userCount}`); // "Total users: 42"
}


// -----------------------------------------------------------------------------
// EXAMPLE 3: retry<User> (custom object type)
// fn() returns Promise<User>, so retry() also returns Promise<User>
// -----------------------------------------------------------------------------

// Define a custom type for our User object
type User = {
  id: number;
  name: string;
  email: string;
};

async function example3_retryCustomType(): Promise<void> {

  // Simulate fetching a User from an API that is temporarily flaky
  let callCount = 0;

  const fetchUser = async (): Promise<User> => {
    callCount++;
    if (callCount < 3) {
      throw new Error(`API timeout on call #${callCount}`);
    }
    // Return a User object on success
    return {
      id: 1,
      name: 'Bob',
      email: 'bob@example.com'
    };
  };

  // TypeScript infers the return type as User automatically
  const user = await retry(
    fetchUser,
    5,    // retry up to 5 more times
    2000  // wait 2 seconds between attempts
  );

  // TypeScript KNOWS user is of type User, so it provides type safety:
  console.log(`User ID: ${user.id}`);       // ✅ TypeScript allows this
  console.log(`User Name: ${user.name}`);   // ✅ TypeScript allows this
  // console.log(user.phone);               // ❌ TypeScript error! 'phone' doesn't exist on User
}


// -----------------------------------------------------------------------------
// EXAMPLE 4: retry<boolean>
// Useful when retrying a check that should return true/false
// -----------------------------------------------------------------------------

async function example4_retryBoolean(): Promise<void> {

  // Simulate checking if a feature flag is enabled
  let callCount = 0;

  const isFeatureEnabled = async (): Promise<boolean> => {
    callCount++;
    if (callCount < 2) {
      throw new Error('Feature flag service unavailable');
    }
    return true; // Feature is enabled
  };

  const featureEnabled = await retry(
    isFeatureEnabled,
    3,   // retry up to 3 more times
    500  // wait 500ms between attempts
  );

  console.log(`Feature enabled: ${featureEnabled}`); // "Feature enabled: true"
}


// -----------------------------------------------------------------------------
// EXAMPLE 5: retry<void>
// Useful when retrying an action that doesn't return a value
// -----------------------------------------------------------------------------

async function example5_retryVoid(): Promise<void> {

  // Simulate sending an email that might fail temporarily
  let callCount = 0;

  const sendEmail = async (): Promise<void> => {
    callCount++;
    if (callCount < 3) {
      throw new Error('SMTP server not responding');
    }
    console.log('Email sent successfully!'); // Action completed, no return value
  };

  // retry<void> for functions that don't return a value
  await retry(
    sendEmail,
    4,    // retry up to 4 more times
    1000  // wait 1 second between attempts
  );
}


// -----------------------------------------------------------------------------
// EXAMPLE 6: Using retry() in a Playwright test
// Shows how it integrates with real browser automation
// -----------------------------------------------------------------------------

import { test, expect, Page } from '@playwright/test';

test('retry example in a Playwright test', async ({ page }) => {

  await page.goto('https://example.com');

  // ── Retry Example A: Get text content with retry ─────────────────────────
  // The page might load slowly, so we retry until the text appears
  const headerText = await retry<string>(
    async () => {
      // Try to get the text content of the header
      const text = await page.locator('h1').textContent();

      // If text is null or empty, throw an error to trigger a retry
      if (!text || text.trim() === '') {
        throw new Error('Header text is empty - page might still be loading');
      }

      // Return the text if it is valid
      return text;
    },
    3,    // retry up to 3 more times
    1000  // wait 1 second between attempts
  );

  console.log(`Page header: ${headerText}`);


  // ── Retry Example B: Wait for element count with retry ───────────────────
  // The list might load asynchronously, so we retry until items appear
  const itemCount = await retry<number>(
    async () => {
      const count = await page.locator('.item').count();

      if (count === 0) {
        throw new Error('No items found yet - list might still be loading');
      }

      return count;
    },
    5,    // retry up to 5 more times
    500   // wait 500ms between attempts
  );

  console.log(`Found ${itemCount} items on the page`);


  // ── Retry Example C: Retry a click that might fail ───────────────────────
  // The button might not be clickable immediately (e.g., it's covered by a modal)
  await retry<void>(
    async () => {
      await page.getByRole('button', { name: 'Submit' }).click();

      // Verify the click worked by checking for a success message
      const isVisible = await page.locator('.success-toast').isVisible();
      if (!isVisible) {
        throw new Error('Submit did not work - success toast not visible');
      }
    },
    3,   // retry up to 3 more times
    1000 // wait 1 second between attempts
  );
});


// =============================================================================
// HOW GENERIC <T> WORKS - Simple Explanation
// =============================================================================
//
// Think of <T> as a PLACEHOLDER for any type.
//
// When you call: retry<string>(fn, 3, 1000)
//   → TypeScript replaces every T with string
//   → fn becomes: () => Promise<string>
//   → return type becomes: Promise<string>
//
// When you call: retry<number>(fn, 3, 1000)
//   → TypeScript replaces every T with number
//   → fn becomes: () => Promise<number>
//   → return type becomes: Promise<number>
//
// When you call: retry<User>(fn, 3, 1000)
//   → TypeScript replaces every T with User
//   → fn becomes: () => Promise<User>
//   → return type becomes: Promise<User>
//
// The BEST part: TypeScript can INFER <T> automatically!
// If your fn returns Promise<string>, you can just write retry(fn, 3, 1000)
// and TypeScript will automatically know the result is a string. Magic! 🎩
// =============================================================================