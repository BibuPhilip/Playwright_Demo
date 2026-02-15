function removeDuplicatesUsingMap(arr: number[]): number[] {
    // Map is similar to an object but better for this use case
    // It maintains insertion order and has better performance
    const map = new Map<number, boolean>();
    const result: number[] = [];
    
    // Iterate through each element
    for (const item of arr) {
        // Check if this element exists as a key in the Map
        if (!map.has(item)) {
            // If not in Map, add it with value true
            map.set(item, true);
            // And add to result array
            result.push(item);
        }
        // Skip if already exists in Map
    }
    
    return result;
}

// Example usage
const numbers = [1, 2, 2, 3, 4, 4, 5];
console.log('Remove duplicates from this array: [1, 2, 2, 3, 4, 4, 5]');
console.log(removeDuplicatesUsingMap(numbers)); // Output: [1, 2, 3, 4, 5]
console.log("*************************************************")
const numbers1 = [1,2,2,3,4,4,5,6,4,5,4];
console.log('Remove duplicates from this array: [1,2,2,3,4,4,5,6,4,5,4]');
console.log(removeDuplicatesUsingMap(numbers1)); // Output: [1, 2, 3, 4, 5,6]

// Time Complexity: O(n) - single pass
// Space Complexity: O(n) - Map and result array