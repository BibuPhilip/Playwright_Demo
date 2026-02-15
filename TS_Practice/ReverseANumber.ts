function reverseNumber(num:number):number{
    let isNegative: boolean=num<0;
    let reverse = 0;
    let absoluteNum:number = Math.abs(num);
    while(absoluteNum>0){
        let lastDigit = absoluteNum%10;
        reverse = reverse * 10 + lastDigit;
        absoluteNum = Math.floor(absoluteNum/10);
    }
    return isNegative? -reverse: reverse;
}


console.log(`The reverse of number 12345 is ${reverseNumber(12345)}`);
console.log(`The reverse of number 1064290 is ${reverseNumber(1064290)}`);
console.log(`The reverse of number -12345 is ${reverseNumber(-12345)}`);
console.log(`The reverse of number 100 is ${reverseNumber(100)}`);
console.log(`The reverse of number -9652 is ${reverseNumber(-9652)}`);