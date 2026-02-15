function SortArrayDescendingBruteForce(arr:number[]):number[]{
    if(arr.length<=1){
        return arr;
    }
    const pivotIndex = Math.floor(arr.length/2);
    const pivot = arr[pivotIndex]!;
    const left:number[] = [];
    const middle:number[] = [];
    const right:number[] =[];

    for(let i=0;i<arr.length;i++){
        if(arr[i]! > pivot){
            left.push(arr[i]!);
        }
        else if(arr[i]! < pivot){
            right.push(arr[i]!);
        }
        else{
            middle.push(arr[i]!);
        }
    }
    return[...SortArrayDescendingBruteForce(left),...middle,...SortArrayDescendingBruteForce(right)];
}

function SortArrayAscendingBruteForce(arr:number[]):number[]{
    if(arr.length<=1){
        return arr;
    }
    const pivotIndex = Math.floor(arr.length/2);
    const pivot = arr[pivotIndex]!;
    const left:number[] = [];
    const middle:number[]=[];
    const right:number[] = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i]! < pivot){
            left.push(arr[i]!);
        }
        else if(arr[i]! > pivot){
            right.push(arr[i]!);
        }
        else{
            middle.push(arr[i]!);
        }
    }
    return[...SortArrayAscendingBruteForce(left),...middle,...SortArrayAscendingBruteForce(right)];
}




const OriginalArray=[8,5,13,7,4,8,1,6];
console.log(`Original Array: ${OriginalArray}`);
if(OriginalArray.length>=2){
    const DescendingArray = SortArrayDescendingBruteForce(OriginalArray);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray.length>=2){
    const AscendingArray = SortArrayAscendingBruteForce(OriginalArray);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray1=[82,0,24,61,19,13,7,58,8,1,16];
console.log(`Original Array: ${OriginalArray1}`);
if(OriginalArray1.length>=2){
    const DescendingArray = SortArrayDescendingBruteForce(OriginalArray1);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray1.length>=2){
    const AscendingArray = SortArrayAscendingBruteForce(OriginalArray1);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray2=[9,9];
console.log(`Original Array: ${OriginalArray2}`);
if(OriginalArray2.length>=2){
    const DescendingArray = SortArrayDescendingBruteForce(OriginalArray2);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray2.length>=2){
    const AscendingArray = SortArrayAscendingBruteForce(OriginalArray2);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}
console.log('********************************************');
const OriginalArray3=[-1,0];
console.log(`Original Array: ${OriginalArray3}`);
if(OriginalArray3.length>=2){
    const DescendingArray = SortArrayDescendingBruteForce(OriginalArray3);
    console.log(`Descending Order: ${DescendingArray}`);
    console.log(DescendingArray[1]);
}
if(OriginalArray3.length>=2){
    const AscendingArray = SortArrayAscendingBruteForce(OriginalArray3);
    console.log(`Ascending Order: ${AscendingArray}`);
    console.log(AscendingArray[1]);
}