function ReverseAString(str: string):string{
    let reverseString: string='';
    for(let i=str.length-1;i>=0;i--){
        reverseString = reverseString + str[i];
    }
    return reverseString;
}

console.log(`The reverse of Hello World is: ${ReverseAString('Hello World')} `);
console.log(`The reverse of Bibu Philip is: ${ReverseAString('Bibu Philip')} `);
console.log(`The reverse of 1234567890 is: ${ReverseAString('1234567890')} `);