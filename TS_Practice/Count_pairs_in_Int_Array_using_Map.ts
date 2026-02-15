// ==================== OPTIMIZED METHOD (Using Map) ====================
function NoOfPairsInIntArray(arr: number[]): void{
    // Step 1: Create a Map to store frequency of each element
    // Key: the number, Value: how many times it appears
    // Time Complexity: O(n) - single pass through array
    // Space Complexity: O(k) where k is number of unique elements
    const frequencyMap = new Map<number, number>();
    
    // Step 2: Count frequency of each element in the array
    for (let i=0; i<arr.length; i++){
        let eachNumInArray = arr[i] as number;
        // Get current count (or 0 if not exists) and increment by 1
        frequencyMap.set(eachNumInArray, (frequencyMap.get(eachNumInArray) || 0) + 1);
    }
    
    // Step 3: Iterate through the frequency map
    // For each unique number, calculate how many pairs it forms and print
    for (const[numInEachRowOfMap, countOfNumInMap] of frequencyMap.entries()){
        // Number of pairs = frequency / 2 (integer division)
        const countOfpairs = Math.floor(countOfNumInMap/2);
        
        // Step 4: Only print if there is at least 1 pair
        if(countOfpairs>0){
            console.log(`Pairs of ${numInEachRowOfMap}: ${countOfpairs}`);
        }
    }
}

console.log("\n=== OPTIMIZED METHOD (Using Map) ===\n");

console.log("Test Case 1: [1, 2, 2, 3, 4, 4, 5]");
NoOfPairsInIntArray([1, 2, 2, 3, 4, 4, 5]);
console.log();

console.log("Test Case 2: [1, 2, 1, 3, 2, 2]");
NoOfPairsInIntArray([1, 2, 1, 3, 2, 2]);
console.log();

console.log("Test Case 3: [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]");
NoOfPairsInIntArray([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]);
console.log();

console.log("This is real test");
NoOfPairsInIntArray([1,2,2,3,4,4,5,4,5,4]);