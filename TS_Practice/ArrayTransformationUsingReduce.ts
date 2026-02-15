//Input
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];

// Step 1: Create a clear, readable type
type GroupedUsers = {
  [role: string]: typeof users;
};

// Step 2: Use it in reduce
const grouped = users.reduce<GroupedUsers>((acc, user) => {
  acc[user.role] ??= [];  // Modern nullish assignment
  acc[user.role]!.push(user);
  return acc;
}, {});

console.log(JSON.stringify(grouped, null, '\t'));

/* Output:
{
	"admin": [
		{
			"name": "Alice",
			"role": "admin"
		},
		{
			"name": "Charlie",
			"role": "admin"
		}
	],
	"user": [
		{
			"name": "Bob",
			"role": "user"
		}
	]
}*/