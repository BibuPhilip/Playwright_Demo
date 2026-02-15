// Split the string into an array of words, reverse the array, then join back
// split and join are opposite functions:
// split splits the string into array based on separator, whereas
// join joins the array into string based on separator
function ReverseASentence(str: string): string{
    return str.split(' ').reverse().join(' ');
}

let str = 'I Love My India';
console.log(ReverseASentence(str)); // "India My Love I"
console.log(ReverseASentence('India is my Country, I love my Country'));
console.log(ReverseASentence('Make America Great Again! LFG! YAYYYYY!!!'));