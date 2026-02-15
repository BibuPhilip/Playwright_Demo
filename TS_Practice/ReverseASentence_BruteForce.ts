function ReverseASentence(str: string): string {
    let reversed = '';
    let word = '';

    // Read from end to start
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === ' ') {
            reversed += word + ' ';
            word = '';
        } else {
            word = str[i] + word; // Prepend character
        }
    }
    return reversed += word; // Add the last word
}

console.log(ReverseASentence('Make America Great Again! LFG! YAYYYYY!!!')); // YAYYYYY!!! LFG! Again! Great America Make
console.log(ReverseASentence('I Love my India')); // India my Love I