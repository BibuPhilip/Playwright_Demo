function reverseNumRecursive(num: number, reversed: number = 0): number {
    // Handle negative numbers
    if (num < 0) {
        return -reverseNumRecursive(-num, 0);
    }

    // Base case: when num becomes 0, return the reversed number
    if (num === 0) {
        return reversed;
    }
    
    // Get the last digit
    let lastDigit = num % 10;
    
    // Add the last digit to reversed (shift reversed left by multiplying by 10)
    reversed = reversed * 10 + lastDigit;
    
    // Remove the last digit from num
    num = Math.floor(num / 10);
    
    // Recursive call
    return reverseNumRecursive(num, reversed);
}

console.log(`The reverse of number 1234567 is ${reverseNumRecursive(1234567)}`);
console.log(`The reverse of number 1064290 is ${reverseNumRecursive(1064290)}`);
console.log(`The reverse of number -12345 is ${reverseNumRecursive(-12345)}`);
console.log(`The reverse of number 100 is ${reverseNumRecursive(100)}`);
console.log(`The reverse of number -1 is ${reverseNumRecursive(-1)}`);
console.log(`The reverse of number 1 is ${reverseNumRecursive(1)}`);
console.log(`The reverse of number 0 is ${reverseNumRecursive(0)}`);