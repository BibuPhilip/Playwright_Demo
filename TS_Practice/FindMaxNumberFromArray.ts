const numbers =[10, 20, 3, 15, 25, 6];

const max = numbers.reduce((Intermax, currentValue)=>{
    return currentValue>Intermax?currentValue:Intermax
},0)

console.log(max);