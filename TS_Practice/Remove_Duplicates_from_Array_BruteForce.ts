function removeDuplicates(arr: number[]): number[] {
    // Step 1: Create an empty array to store unique elements
    // This will be our result array
    const result: number[] = [];
    
    // Step 2: Outer loop - iterate through each element in the original array
    // i is the index that goes from 0 to the last element
    for (let i = 0; i < arr.length; i++) {
        // Step 3: Assume the current element is unique until proven otherwise
        // This flag will track if we find a duplicate
        let isDuplicate = false;
        
        // Step 4: Inner loop - check if current element already exists in result array
        // j is the index that goes through all elements already added to result
        for (let j = 0; j < result.length; j++) {
            // Step 5: Compare current element from original array with each element in result
            // If we find a match, it means this element is already in result (duplicate)
            if (arr[i] === result[j]) {
                // Mark this element as duplicate
                isDuplicate = true;
                // No need to check further, break out of inner loop
                break;
            }
        }
        
        // Step 6: After checking all elements in result array
        // If isDuplicate is still false, it means this element is unique
        if (!isDuplicate) {
            // Add this unique element to the result array
            // We manually add it by creating a new position at the end
            result[result.length] = arr[i] as number;
        }
        // If isDuplicate is true, we skip adding this element (it's already in result)
    }
    
    // Step 7: Return the result array containing only unique elements
    return result;
}

// Test Case 1: Given example
console.log("Test Case 1:");
const input1 = [1, 2, 2, 3, 4, 4, 5];
console.log("Input:", input1);
console.log("Output:", removeDuplicates(input1));
console.log("Expected: [1, 2, 3, 4, 5]\n");

// Test Case 2: Array with all duplicates
console.log("Test Case 2:");
const input2 = [1, 1, 1, 1];
console.log("Input:", input2);
console.log("Output:", removeDuplicates(input2));
console.log("Expected: [1]\n");

// Test Case 3: Array with no duplicates
console.log("Test Case 3:");
const input3 = [1, 2, 3, 4, 5];
console.log("Input:", input3);
console.log("Output:", removeDuplicates(input3));
console.log("Expected: [1, 2, 3, 4, 5]\n");

// Test Case 4: Empty array
console.log("Test Case 4:");
const input4: number[] = [];
console.log("Input:", input4);
console.log("Output:", removeDuplicates(input4));
console.log("Expected: []\n");

// Test Case 5: Array with multiple duplicates
console.log("Test Case 5:");
const input5 = [5, 3, 5, 2, 3, 1, 2, 5];
console.log("Input:", input5);
console.log("Output:", removeDuplicates(input5));
console.log("Expected: [5, 3, 2, 1]\n");