function CharOccuranceInString(str: string){
  const map = new Map<string,number>();
  const strUpper = str.toUpperCase().replace(' ','');
  for(let i of strUpper){
    map.set(i,(map.get(i)||0)+1);
  }
  for(let j of map.entries()){
    console.log('Count of: ' + j[0] + ': ' + j[1] );
  }

}

const OriginalString = 'Great Responsibility'
CharOccuranceInString(OriginalString);