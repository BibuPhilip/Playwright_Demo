const numbers =[10, 20, 3, 15, 25, 6];

const min = numbers.reduce((intermin: number, currentValue: number)=>{
    return currentValue<intermin?currentValue:intermin
},numbers[0]!)

console.log(min);