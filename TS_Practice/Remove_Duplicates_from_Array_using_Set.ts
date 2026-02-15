function removeDuplicates(arr: number[]): number[] {
    // Using Set - the most efficient built-in method for removing duplicates
    // Set automatically stores only unique values
    // Time Complexity: O(n) - iterates through array once
    // Space Complexity: O(n) - stores unique elements in Set
    
    // Step 1: Convert array to Set (automatically removes duplicates). [1, 2, 2, 3, 4, 4, 5] becomes {1,2,3,4,5}
    // Step 2: Convert Set back to array using spread operator
    // Sub steps of Step2: ...will unpack and spread out the values in Set, so Set{1,2,3,4,5} becomes individual values: 1,2,3,4,5
    // Sub steps of Step2: putting [] around the individual values will convert those values into an array like [1,2,3,4,5]
    return [...new Set(arr)];
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