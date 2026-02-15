/**
 * Generates a Fibonacci series as an array
 * @param count - Number of Fibonacci numbers to generate
 * @returns Array of Fibonacci numbers
 */
function generateFibonacci(count: number): number[] {
  if (count <= 0) {
    return [];
  }
  
  if (count === 1) {
    return [0];
  }
  
  const fibonacci = [0, 1];
  
  for (let i = 2; i < count; i++) {
    fibonacci.push(fibonacci[i - 1]! + fibonacci[i - 2]!);
  }
  
  return fibonacci;
}

// Example usage
const fibCount = 10;
const fibonacciSeries = generateFibonacci(fibCount);

console.log(`Fibonacci series (${fibCount} numbers):`, fibonacciSeries);

// Additional examples
console.log('\nMore examples:');
console.log('First 5:', generateFibonacci(5));
console.log('First 15:', generateFibonacci(15));
console.log('First 20:', generateFibonacci(20));

export { generateFibonacci };