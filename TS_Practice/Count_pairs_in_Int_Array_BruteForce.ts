// A pair is defined as two elements with the same value in the array
// For example: [1, 2, 1, 3, 2, 2] has pairs: 2 has 1 pair, 1 has 1 pair

// ==================== BRUTE FORCE METHOD ====================
function countPairsBruteForce(arr: number[]): void {
    // Step 1: Create an array to track which elements we've already processed
    // This prevents counting the same group of duplicates multiple times
    const processed: boolean[] = [];
    
    // Step 2: Initialize the processed array with false values
    // processed[i] will be true if we've already counted element at index i
    for (let i = 0; i < arr.length; i++) {
        processed[i] = false;
    }
    //console.log(processed);
    
    // Step 3: Outer loop - iterate through each element in the array
    for (let i = 0; i < arr.length; i++) {
        // Skip if this element was already processed as part of another group
        console.log(processed[i]);
        if (processed[i]) {
            continue;
        }
        
        // Step 4: Count how many times current element appears in the array
        let count = 0;
        
        // Step 5: Inner loop - count occurrences of arr[i]
        for (let j = i; j < arr.length; j++) {
            // If we find a matching element
            if (arr[i] === arr[j]) {
                // Increment the count
                count++;
                // Mark this element as processed
                processed[j] = true;
            }
        }
        
        // Step 6: Calculate number of pairs for this element
        // Formula: number of pairs = count / 2 (integer division)
        // Example: 4 occurrences = 2 pairs, 5 occurrences = 2 pairs
        // We use Math.floor to perform integer division
        const pairs = Math.floor(count / 2);
        
        // Step 7: Only print if there is at least 1 pair
        if (pairs > 0) {
            console.log(`Pairs of ${arr[i]}: ${pairs}`);
        }
        console.log();
    }
}

// ==================== TEST CASES ====================
console.log("=== BRUTE FORCE METHOD ===\n");

console.log("Test Case 1: [1, 2, 2, 3, 4, 4, 5]");
countPairsBruteForce([1, 2, 2, 3, 4, 4, 5]);
console.log();

console.log("Test Case 2: [1, 2, 1, 3, 2, 2]");
countPairsBruteForce([1, 2, 1, 3, 2, 2]);
console.log();

console.log("Test Case 3: [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]");
countPairsBruteForce([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]);
console.log();

console.log("Test Case 4: [10, 20, 20, 10, 10, 30, 50, 10, 20]");
countPairsBruteForce([10, 20, 20, 10, 10, 30, 50, 10, 20]);
console.log();

console.log("Test Case 5: [1, 2, 3, 4, 5] (No pairs)");
countPairsBruteForce([1, 2, 3, 4, 5]);
console.log("(No output - no pairs found)");
console.log();

console.log("Test Case 6: [5, 5, 5, 5, 5]");
countPairsBruteForce([5, 5, 5, 5, 5]);
console.log();