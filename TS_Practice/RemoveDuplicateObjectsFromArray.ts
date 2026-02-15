interface Person {
    id: number;
    name: string;
}

function removeDuplicates(arr: Person[]): Person[] {
    const map = new Map<number, Person>();
    
    // Use id as the unique key
    // If duplicate id exists, it will be overwritten (keeps first occurrence)
    for (const obj of arr) {
        if (!map.has(obj.id)) {
            map.set(obj.id, obj);
        }
    }
    
    // Convert Map values back to array
    return Array.from(map.values());
}

const people = [
    {id: 1, name: 'john'},
    {id: 2, name: 'jane'},
    {id: 1, name: 'john'},
    {id: 3, name: 'sarah'},
    {id: 4, name: 'michelle'},
    {id: 3, name: 'sarah'}
];

console.log('Before removing Duplicates: ' + JSON.stringify(people, null, '\t'));
console.log('******************************************************');
console.log('After removing Duplicates: ' + JSON.stringify(removeDuplicates(people), null, '\t'));