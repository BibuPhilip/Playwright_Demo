function SortArrayDescending(arr: number[]):number[]{
    if(arr.length===0){
        return [];
    }
    if(arr.length===1){
        return arr;
    }
    const SortedArray = [...arr].sort((a,b) => b-a);
    return SortedArray;
}

function SortArrayAscending(arr: number[]):number[]{
    if(arr.length===0){
        return [];
    }
    if(arr.length===1){
        return arr;
    }
    const SortedArray = [...arr].sort((a,b) => a-b);
    return SortedArray;
}

const OriginalArray=[8,5,13,7,19,8,13,6];
console.log(`Original Array: ${OriginalArray}`);
if(OriginalArray.length>=2){
    const DescendingArray = SortArrayDescending(OriginalArray);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray.length>=2){
    const AscendingArray = SortArrayAscending(OriginalArray);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray1=[82,0,24,61,19,13,7,58,8,1,16];
console.log(`Original Array: ${OriginalArray1}`);
if(OriginalArray1.length>=2){
    const DescendingArray = SortArrayDescending(OriginalArray1);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray1.length>=2){
    const AscendingArray = SortArrayAscending(OriginalArray1);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray2=[9,9];
console.log(`Original Array: ${OriginalArray2}`);
if(OriginalArray2.length>=2){
    const DescendingArray = SortArrayDescending(OriginalArray2);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray2.length>=2){
    const AscendingArray = SortArrayAscending(OriginalArray2);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray3=[-1,0];
console.log(`Original Array: ${OriginalArray3}`);
if(OriginalArray3.length>=2){
    const DescendingArray = SortArrayDescending(OriginalArray3);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray3.length>=2){
    const AscendingArray = SortArrayAscending(OriginalArray3);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}