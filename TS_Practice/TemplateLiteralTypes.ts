//Template Literal Type in Typescript: Is a way of creating new Types based on Template Literals and existing Types
type Flavor = "Chocolate" | "Vanilla" | "Strawberry";
type Toppings = "Sprinkles" | "Cherry" | "Jelly";

type Order = `${Flavor} with ${Toppings}`;

const Order1:Order = "Chocolate with Sprinkles";
//const Order2: Order = "Strwberry with coffee";
const Order3: Order = "Strawberry with Jelly";
const Order4: Order = "Vanilla with Cherry";

type Environs = "Dev" | "Sys" | "QA-E2E" | "PROD";
type XXX = "Whatever1" | "Whatever2" | "Whatever3" | "Whatever4";

type Environs_with_XXX = `Combining environ ${Environs} with any type of XXX ${XXX}`;

const Environs_with_XXX1: Environs_with_XXX = "Combining environ Dev with any type of XXX Whatever1";
const Environs_with_XXX2: Environs_with_XXX = "Combining environ Dev with any type of XXX Whatever4";
//const Environs_with XXX3: Environs_with_XXX = "Combining environ Dev with any type of XXX Whatever5";
const Environs_with_XXX4: Environs_with_XXX = "Combining environ PROD with any type of XXX Whatever1";
const Environs_with_XXX5: Environs_with_XXX = "Combining environ PROD with any type of XXX Whatever2";
const Environs_with_XXX6: Environs_with_XXX = "Combining environ PROD with any type of XXX Whatever3";
const Environs_with_XXX7: Environs_with_XXX = "Combining environ PROD with any type of XXX Whatever4";

type name = "Tim" | "Daisy" | "Michelle" | "Hetal" | "Martha";
type age = 23 | 38 | 29 | 42;

type MixnMatch = `My name is ${name} and I am ${age} years old!`;

const MixnMatch1: MixnMatch = "My name is Daisy and I am 23 years old!";
const MixnMatch2: MixnMatch = "My name is Tim and I am 42 years old!";
//const MixnMatch3: MixnMatch = "My name is Hetal and I am 56 years old!";

