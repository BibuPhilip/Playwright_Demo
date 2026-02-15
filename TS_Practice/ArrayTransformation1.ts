// Define the structure of a single test result object
// This interface ensures each test has a 'name' and 'status' property
interface TestResult {
  name: string;   // The name of the test (e.g., 'LoginTest')
  status: string; // The status of the test (e.g., 'Pass', 'fail', 'PASSED')
}

// Define the structure of the expected output
// This interface represents the final transformed data structure
interface ExpectedOutput {
  summary: {
    pass: number; // Count of tests that passed
    fail: number; // Count of tests that failed
  };
  results: TestResult[]; // Array of normalized test results
}

// Input data: array of test results with inconsistent status formats
const testResults: TestResult[] = [
  { name: 'LoginTest', status: 'Pass' },        // Mixed case 'Pass'
  { name: 'SignupTest', status: 'fail' },       // Lowercase 'fail'
  { name: 'CheckoutTest', status: 'Passed' },   // Past tense 'Passed'
  { name: 'SearchTest', status: 'FAILED' },     // Uppercase past tense 'FAILED'
  { name: 'CartTest', status: 'PASS' }          // Uppercase 'PASS'
];

// Main function that processes the test results array
// Takes an array of TestResult objects and returns an ExpectedOutput object
function processTestResults(results: TestResult[]): ExpectedOutput {
  
  // Transform each test result to normalize the status field
  // .map() creates a new array by applying a function to each element
  const normalizedResults = results.map(test => ({
    name: test.name,                    // Keep the test name unchanged
    status: normalizeStatus(test.status) // Convert status to standardized format
  }));
  console.log("*******************Normalized Results******************************");
  //JSON.stringify(output, null, 2)
  console.log(JSON.stringify(normalizedResults,null,2));
  console.log("*******************************************************************");
  // Create summary object by counting pass and fail results
  const summary = {
    // Count tests with 'PASS' status
    // .filter() creates a new array with elements that pass the condition
    // .length returns the count of filtered elements
    pass: normalizedResults.filter(test => test.status === 'PASS').length,
    
    // Count tests with 'FAIL' status
    fail: normalizedResults.filter(test => test.status === 'FAIL').length
  };
  console.log("**********************Summary***************************************");
  console.log(summary);
  console.log("********************************************************************");
  // Return the complete output object with summary and normalized results
  return {
    summary,              // ES6 shorthand for summary: summary
    results: normalizedResults // Array of normalized test results
  };
}

// Helper function to normalize status strings
// Takes a status string and returns either 'PASS' or 'FAIL'
// The return type annotation specifies it can only return these two literal values
function normalizeStatus(status: string): 'PASS' | 'FAIL' {
  
  // Convert the input status to uppercase for case-insensitive comparison
  // This handles 'pass', 'Pass', 'PASS', etc. uniformly
  const upperStatus = status.toUpperCase();
  
  // Check if the status indicates a passing test
  // Handles both 'PASS' and 'PASSED' variations
  //if (upperStatus === 'PASS' || upperStatus === 'PASSED') {
  if (upperStatus.includes('PASS')){
    return 'PASS'; // Return standardized 'PASS' string
  }
  
  // Check if the status indicates a failing test
  // Handles both 'FAIL' and 'FAILED' variations
  //if (upperStatus === 'FAIL' || upperStatus === 'FAILED') {
  if (upperStatus.includes('FAIL')){
    return 'FAIL'; // Return standardized 'FAIL' string
  }
  
  // Safety fallback: if status doesn't match any expected value,
  // default to 'FAIL' (conservative approach for unexpected values)
  return 'FAIL';
}

// Execute the transformation function with the test data
// This calls processTestResults and stores the result in 'output'
const output = processTestResults(testResults);

// Display the output in a formatted JSON structure
// JSON.stringify() converts the JavaScript object to a JSON string
// Parameters: (object, replacer function (null = none), spacing for indentation)
console.log(JSON.stringify(output, null,'\t'));