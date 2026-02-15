
function findLastNonRepeatingChar(s: string): string {
    // Step 1: Create a Map data structure to store each character as key 
    // and its frequency (count) as value
    // Map is used instead of object for better performance and cleaner syntax
    const charCount = new Map<string, number>();
    
    // Step 2: First pass - Count the frequency of each character in the string
    // This loop iterates through every character in the string from left to right
    for (const char of s) {
        // For each character:
        // - charCount.get(char) retrieves the current count (returns undefined if not exists)
        // - || 0 provides a default value of 0 if the character hasn't been seen before
        // - + 1 increments the count by 1
        // - charCount.set(char, ...) stores the updated count back in the Map
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Step 3: Second pass - Find the LAST non-repeating character
    // We start from the end of the string (s.length - 1) and go backwards to index 0
    // This ensures we find the LAST occurrence of a non-repeating character
    for (let i = s.length - 1; i >= 0; i--) {
        // Access the character at current position i
        // Check if this character appears exactly once (frequency === 1)
        const char = s[i] as string;
        if (charCount.get(char) === 1) {
            // Found it! Return this character immediately
            return char;
        }
        // If frequency is not 1, continue to the next character (moving left)
    }
    
    // Step 4: If we've checked all characters and none appear exactly once,
    // it means all characters are repeating, so return '$'
    return '$'
}

console.log("Test Case 1:");
console.log(`Input: 'geeksforgeeks'`);
console.log(`Output: '${findLastNonRepeatingChar('geeksforgeeks')}'`);
console.log(`Expected: 'r'\n`);

console.log("Test Case 2:");
console.log(`Input: 'aabbcc'`);
console.log(`Output: '${findLastNonRepeatingChar('aabbcc')}'`);
console.log(`Expected: '$'\n`);

console.log("Test Case 3:");
console.log(`Input: 'hello'`);
console.log(`Output: '${findLastNonRepeatingChar('hello')}'`);
console.log(`Expected: 'o'\n`);

console.log("Test Case 4:");
console.log(`Input: 'programming'`);
console.log(`Output: '${findLastNonRepeatingChar('programming')}'`);
console.log(`Expected: 'n'\n`);

console.log("Test Case 5:");
console.log(`Input: 'abcdef'`);
console.log(`Output: '${findLastNonRepeatingChar('abcdef')}'`);
console.log(`Expected: 'f'\n`);

console.log("Test Case 6:");
console.log(`Input: 'a'`);
console.log(`Output: '${findLastNonRepeatingChar('a')}'`);
console.log(`Expected: 'a'\n`);

console.log("Test Case 7:");
console.log(`Input: 'racecar'`);
console.log(`Output: '${findLastNonRepeatingChar('racecar')}'`);
//console.log(`Expected: 'a'\n`);
