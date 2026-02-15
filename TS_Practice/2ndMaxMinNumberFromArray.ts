function find2ndMaxNumberFromArray(arr: number[]):number|null{
    if(arr.length<2){
        return null;
    }
    const Descendingsorted = [...arr].sort((a,b) => b-a);
    console.log(Descendingsorted);
    return Descendingsorted[1] ?? null;
}

function find2ndMinNumberFromArray(arr: number[]):number|null{
    if(arr.length<2){
        return null;
    }
    const AscendingSorted = [...arr].sort((a,b) => a-b);
    console.log(AscendingSorted);
    return AscendingSorted[1] ?? null;
}

const OriginalArray=[8,5,13,7,4,8,1,6];
console.log(find2ndMaxNumberFromArray(OriginalArray));
console.log(find2ndMinNumberFromArray(OriginalArray));
const OriginalArray1=[82,0,24,61,19,13,7,58,8,1,16];
console.log(find2ndMaxNumberFromArray(OriginalArray1));
console.log(find2ndMinNumberFromArray(OriginalArray1));