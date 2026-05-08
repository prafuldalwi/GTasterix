# JavaScript Functions & Closures — Deep Theory + Hands-on



# 1. Function Declarations vs Expressions vs Arrow Functions

## A) Function Declaration


function greet(name) {
  return `Hello ${name}`;
}


### Characteristics

* Hoisted completely
* Can call before definition
* Has its own `this`
* Has `arguments`
* Best for reusable named logic


sayHi();

function sayHi() {
  console.log("Hi");
}




## B) Function Expression


const greet = function(name) {
  return `Hello ${name}`;
};


### Characteristics

* Stored in variable
* Not fully hoisted
* Useful for callbacks
* Can be anonymous


// Error
sayHi();

const sayHi = function() {
  console.log("Hi");
};




## C) Arrow Function


const greet = (name) => {
  return `Hello ${name}`;
};


Short form:


const square = n => n * n;


### Characteristics

* No own `this`
* No `arguments`
* Lexically binds `this`
* Best for callbacks and functional code




# 2. Lexical Scope Chain Resolution

JavaScript uses **lexical scoping**.

Meaning:
A function accesses variables based on **where it was written**, not where it was called.



## Example


const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    console.log(innerVar);
    console.log(outerVar);
    console.log(globalVar);
  }

  inner();
}

outer();


### Scope Chain

text
inner scope
   ↓
outer scope
   ↓
global scope
   ↓
null




# 3. Closures — Practical Deep Dive

A **closure** happens when:

* Inner function remembers variables from outer function
* Even after outer function finishes execution



## Basic Closure Example


function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3




## Why It Works

When `outer()` finishes:

* Normally local variables disappear
* But `inner()` still references `count`
* JS engine keeps it alive in memory

This preserved environment is called:

text
Closure = Function + Lexical Environment




# Memory Visualization

text
outer()
 ├── count = 0
 └── returns inner()

counter > inner()
              ↑
       remembers count




# Real-World Closure Uses

Closures are used in:

* React hooks
* Event handlers
* Data privacy
* Memoization
* Debounce/throttle
* Module systems



# 4. Pure vs Impure Functions

## Pure Function

A pure function:

* Same input → same output
* No side effects


function add(a, b) {
  return a + b;
}


### Benefits

* Predictable
* Easy to test
* Easier debugging
* Better optimization



## Impure Function


let total = 0;

function addToTotal(value) {
  total += value;
}


### Why impure?

* Modifies external state
* Has side effects



## Another Impure Example


function randomNumber() {
  return Math.random();
}


Different output every call.



# 5. IIFE Patterns & Module Encapsulation

IIFE = Immediately Invoked Function Expression



## Basic IIFE


(function() {
  console.log("Runs immediately");
})();


Arrow version:


(() => {
  console.log("Arrow IIFE");
})();




# Why Use IIFE?

Before ES6 modules:

* Avoid global pollution
* Create private scope
* Encapsulate code



# Module Pattern Using Closure


const UserModule = (function() {
  let username = "Praful";

  function getUser() {
    return username;
  }

  function setUser(name) {
    username = name;
  }

  return {
    getUser,
    setUser
  };
})();


Usage:


console.log(UserModule.getUser());

UserModule.setUser("John");

console.log(UserModule.getUser());


Private variable:


username


Cannot be accessed directly.



# HANDS-ON TASKS



# ✔ Task 1 — Closure-Based Counter System


function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },

    decrement() {
      count--;
      return count;
    },

    reset() {
      count = 0;
      return count;
    },

    getCount() {
      return count;
    }
  };
}

const counter = createCounter();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset());     // 0




# How Closure Works Here

text
createCounter()
   ↓
count stored in lexical memory
   ↓
returned methods keep reference
   ↓
count survives forever




# ✔ Task 2 — Function Factory Returning Multiple Utilities


function createMathUtils(base) {
  return {
    add(num) {
      return base + num;
    },

    subtract(num) {
      return base - num;
    },

    multiply(num) {
      return base * num;
    },

    divide(num) {
      return base / num;
    }
  };
}

const math = createMathUtils(10);

console.log(math.add(5));       // 15
console.log(math.multiply(2));  // 20
console.log(math.subtract(3));  // 7




# Factory Pattern Concept

text
Factory Function
   ↓
Creates customized functions
   ↓
Each instance gets independent closure memory




# ✔ Task 3 — Private Variables Using Closures


function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },

    withdraw(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }

      balance -= amount;
      return balance;
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);

console.log(account.deposit(500));    // 1500
console.log(account.withdraw(200));   // 1300
console.log(account.getBalance());    // 1300




# Why `balance` is Private

This fails:


console.log(account.balance);


Because:

* `balance` exists only inside closure scope
* Outside code cannot access lexical environment directly



# CHECKPOINT

# ■ Why Closures Retain Outer Variables

Because JavaScript functions store a hidden reference to:

* Their lexical environment
* Variables available during creation

Even when outer execution finishes,
the JS engine keeps those variables alive if:

* Some inner function still references them



# Internal Engine Concept

When function is created:

text
Function Object
   +
[[Environment]]
   ↓
Reference to outer scope


This internal environment reference creates closures.



# Example


function test() {
  let value = 100;

  return function() {
    console.log(value);
  };
}

const fn = test();

fn();


Even after `test()` completes:

* `value` is preserved
* Because returned function still needs it



# Important Interview Questions

## Q1: Are closures memory efficient?

Yes — but:

* Unused closures can cause memory leaks
* Especially with DOM/event listeners



## Q2: Difference between closure and scope?

 Scope                        | Closure                         
 Variable accessibility rules | Preserved scope after execution 
 Compile-time structure       | Runtime memory behavior         



## Q3: Do arrow functions create closures?

Yes. Any function can create closures.




