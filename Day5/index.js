// 1. PROTOTYPE CHAIN RESOLUTION



const animal = {
 eats: true
};

const dog = {
 bark() {
   console.log("Woof");
 }
};

Object.setPrototypeOf(dog, animal);

console.log(dog.eats); // true


console.log(dog.fly); // undefined


// Lookup Chain:

// dog → animal → Object.prototype → null


// ERROR CASE

try {
 dog.fly();
} catch (err) {
 console.log(err.message);
}

// 2. CONSTRUCTOR FUNCTIONS & NEW KEYWORD


function User(name) {
 this.name = name;
}

const user1 = new User("Praful");

console.log(user1);


Internally:

const obj = {};

Object.setPrototypeOf(obj, User.prototype);

User.call(obj, "Praful");

return obj;


// PROTOTYPE METHODS

User.prototype.sayHi = function () {
 console.log(`Hi ${this.name}`);
};

user1.sayHi();



function BadUser(name) {
 this.name = name;

 // BAD: new function per object
 this.sayHi = function () {
   console.log(`Hi ${this.name}`);
 };
}

const b1 = new BadUser("A");
const b2 = new BadUser("B");

console.log(b1.sayHi === b2.sayHi); // false



function GoodUser(name) {
 this.name = name;
}

GoodUser.prototype.sayHi = function () {
 console.log(`Hi ${this.name}`);
};

const g1 = new GoodUser("A");
const g2 = new GoodUser("B");

console.log(g1.sayHi === g2.sayHi); // true

// 3. ES6 CLASSES



class Person {
 constructor(name) {
   this.name = name;
 }

 greet() {
   console.log(`Hello ${this.name}`);
 }
}

const p1 = new Person("Praful");

p1.greet();

// CLASS METHODS LIVE ON PROTOTYPE

console.log(
 Person.prototype.greet === p1.__proto__.greet
); // true

// CLASSES ARE NOT HOISTED

try {
 const temp = new TempUser();

 class TempUser {}
} catch (err) {
 console.log(err.message);
}

// CLASSES REQUIRE NEW

try {
 class Test {}

 Test();
} catch (err) {
 console.log(err.message);
}

// 4. ENCAPSULATION PATTERNS



// CLOSURE BASED PRIVACY

function Counter() {
 let count = 0;

 return {
   increment() {
     count++;
   },

   getCount() {
     return count;
   }
 };
}

const counter = Counter();

counter.increment();
counter.increment();

console.log(counter.getCount()); // 2
console.log(counter.count); // undefined

// WEAKMAP PRIVACY

const privateData = new WeakMap();

class PrivateUser {
 constructor(name) {
   privateData.set(this, {
     name
   });
 }

 getName() {
   return privateData.get(this).name;
 }
}

const privateUser = new PrivateUser("Praful");

console.log(privateUser.getName());

// PRIVATE CLASS FIELDS

class BankAccount {
 #balance = 0;

 deposit(amount) {
   this.#balance += amount;
 }

 withdraw(amount) {
   this.#balance -= amount;
 }

 getBalance() {
   return this.#balance;
 }
}

const account = new BankAccount();

account.deposit(1000);
account.withdraw(200);

console.log(account.getBalance());

// 5. INHERITANCE



class AppUser {
 constructor(name) {
   this.name = name;
 }

 login() {
   console.log(`${this.name} logged in`);
 }
}

class Admin extends AppUser {
 constructor(name, role) {
   super(name);

   this.role = role;
 }

 deleteUser(user) {
   console.log(`${user} deleted`);
 }
}

const admin = new Admin("Praful", "Super Admin");

admin.login();
admin.deleteUser("John");

// INTERNAL PROTOTYPE CHAIN

console.log(
 Object.getPrototypeOf(Admin.prototype)
 === AppUser.prototype
); // true

// 6. MIXINS



const canEat = {
 eat() {
   console.log("Eating");
 }
};

const canWalk = {
 walk() {
   console.log("Walking");
 }
};

class Human {}

Object.assign(Human.prototype, canEat, canWalk);

const h = new Human();

h.eat();
h.walk();

// 7. HANDS-ON TASK — USER → ADMIN HIERARCHY



class BaseUser {
 constructor(name) {
   this.name = name;
 }

 login() {
   console.log(`${this.name} logged in`);
 }
}

class SuperAdmin extends BaseUser {
 constructor(name, permissions) {
   super(name);

   this.permissions = permissions;
 }

 removeUser(user) {
   console.log(`${user} removed`);
 }
}

const sa = new SuperAdmin(
 "Praful",
 ["delete", "edit"]
);

sa.login();

sa.removeUser("Alex");

// 8. PRIVATE FIELD TASK



class Wallet {
 #money = 0;

 add(amount) {
   this.#money += amount;
 }

 spend(amount) {
   this.#money -= amount;
 }

 balance() {
   return this.#money;
 }
}

const wallet = new Wallet();

wallet.add(500);
wallet.spend(100);

console.log(wallet.balance());

// 9. PROTOTYPE-BASED UTILITIES



function Developer(name) {
 this.name = name;
}

Developer.prototype.sayHello = function () {
 console.log(`Hello ${this.name}`);
};

Developer.prototype.uppercaseName = function () {
 return this.name.toUpperCase();
};

const dev = new Developer("Praful");

dev.sayHello();

console.log(dev.uppercaseName());

// 10. ADVANCED PROTOTYPE INHERITANCE



function Animal(name) {
 this.name = name;
}

Animal.prototype.sound = function () {
 console.log("Some sound");
};

function Dog(name) {
 Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
 console.log("Woof");
};

const d = new Dog("Tommy");

d.sound();
d.bark();








