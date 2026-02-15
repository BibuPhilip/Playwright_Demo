const fruits =['apple','strawberry','apple','melon','grapes','grapes','cherries'];

//Using Array's reduce function
const fruitCount = fruits.reduce((fc,currentFruit)=>{
    fc[currentFruit] = (fc[currentFruit]||0) + 1;
    return fc;
},{} as {[key:string]:number})

//Using Map object
const map = new Map<string,number>();
for (const fr of fruits){
    const count = (map.get(fr)||0) + 1;
        map.set(fr,count);
    }


console.log(fruitCount);
console.log("**************************");
console.log(JSON.stringify(Array.from(map),null,'\t'));