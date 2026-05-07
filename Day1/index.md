 1. JS Engine Architecture (V8 Internals)

JavaScript engines execute JS code inside browsers and runtimes.

Examples:

* Chrome → V8
* Safari → JavaScriptCore
* Node.js → V8



# V8 Architecture Overview


JS Source Code
      ↓
Parser
      ↓
AST (Abstract Syntax Tree)
      ↓
Ignition (Interpreter)
      ↓
Bytecode
      ↓
TurboFan (Optimizing Compiler)
      ↓
Optimized Machine Code


# Compilation Pipeline

 Step 1 — Parsing

V8 parses JS code into:

* Tokens
* AST (Abstract Syntax Tree)

Example:

js
const x = 10 + 20;


---

## Step 2 — Ignition Interpreter

V8 converts AST → bytecode.

Example idea:


Load 10
Load 20
Add
Store x



## Step 3 — TurboFan Optimization

If a function runs repeatedly:


function add(a, b) {
  return a + b;
}


V8 marks it as “hot”.

TurboFan:

* analyzes types
* optimizes execution
* generates machine code

This process is called:

# JIT (Just-In-Time Compilation)

---

# Hidden Classes

V8 internally creates hidden classes for objects.


const user1 = {
  name: "Praful",
  age: 29
};

const user2 = {
  name: "Laukik",
  age: 30
};


Both share the same hidden class.



# Deoptimization

Changing object shapes dynamically hurts performance.


const user = {};
user.name = "A";
user.age = 20;
user.city = "Mumbai";




# 2. Execution Context & Call Stack

Every function call creates an execution context.

---

# Types of Execution Context

## Global Execution Context

Created first.

Contains:

* global object
* this
* variables/functions

---

## Function Execution Context

Created on every function call.

---

# Execution Phases

## A. Creation Phase

Memory allocation happens.

Variables:

* `var` → undefined
* `let/const` → TDZ

Functions fully hoisted.

---

## B. Execution Phase

Code executes line-by-line.

---

# Call Stack Example


function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("JS");
}

one();


Stack flow:

Global
one()
two()
three()


---

# 3. Memory Model — Stack vs Heap

## Stack Memory

Stores:

* primitive values
* execution contexts
* function calls

---

## Heap Memory

Stores:

* objects
* arrays
* functions

---

# Example


let name = "Praful";

const user = {
  age: 25
};


Reference stored in stack.
Actual object stored in heap.

---

# Garbage Collection

V8 uses:

# Mark-and-Sweep Algorithm

Steps:

1. Mark reachable objects
2. Remove unreachable objects


let obj = { name: "A" };
obj = null;


---

# 4. Primitive vs Reference Types

# Primitive Types

* string
* number
* boolean
* null
* undefined
* bigint
* symbol

Copied by value.


let a = 10;
let b = a;

b = 20;

console.log(a);


Output: 10


---

# Reference Types

Objects copied by reference.


const user1 = {
  name: "Praful"
};

const user2 = user1;

user2.name = "John";

console.log(user1.name);


Output: John


---

# Pass-by-Sharing

JavaScript uses pass-by-sharing.


function change(obj) {
  obj.name = "Changed";
}

const user = {
  name: "Original"
};

change(user);

console.log(user.name);


---

# 5. Hoisting Rules

# var


console.log(a);
var a = 10;


Output: undefined


---

# let


console.log(a);
let a = 10;


ReferenceError.

---

# const


console.log(a);
const a = 10;


ReferenceError.

---

# Temporal Dead Zone (TDZ)

Period between hoisting and initialization.

---

# 10 Hoisting Examples

## Example 1


console.log(a);
var a = 5;


Output: undefined


---

## Example 2


console.log(a);
let a = 5;


ReferenceError.

---

## Example 3


console.log(a);
const a = 5;


ReferenceError.

---

## Example 4


sayHi();

function sayHi() {
  console.log("Hi");
}


Works.

---

## Example 5


sayHi();

var sayHi = function() {
  console.log("Hi");
}


TypeError.

---

## Example 6


console.log(x);

{
  var x = 10;
}


Output: undefined


---

## Example 7


{
  console.log(x);
  let x = 20;
}


ReferenceError.

---

## Example 8


var a = 1;

function test() {
  console.log(a);
  var a = 2;
}

test();


Outpu: undefined


---

## Example 9


function test() {
  console.log(a);
}

var a = 10;

test();


Output: 10


---

## Example 10


console.log(typeof a);

let a = 10;


ReferenceError.

---

# 6. Strict Mode

Enable strict mode:


"use strict";


---

# Strict Mode Differences

## Prevents accidental globals


"use strict";

x = 10;


Error.

---

## this becomes undefined


"use strict";

function test() {
  console.log(this);
}

test();


Output: undefined


---

## Duplicate parameters not allowed


function test(a, a) {}


Error.

---

# 7. Scope & Lexical Environments

# Types of Scope

* Global Scope
* Function Scope
* Block Scope
* Lexical Scope

---

# Lexical Scope

Inner functions can access outer variables.


function outer() {
  let count = 0;

  function inner() {
    console.log(count);
  }

  inner();
}


---

# Closures

Function + preserved lexical environment.


function counter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const inc = counter();

console.log(inc());
console.log(inc());


---

# Lexical Scope vs Dynamic Scope

## Lexical Scope

Scope determined by where function is written.


let name = "Global";

function outer() {
  let name = "Outer";

  function inner() {
    console.log(name);
  }

  inner();
}

outer();


Output: Outer


---

## Dynamic Scope

Scope determined by who called the function.

JavaScript does NOT use dynamic scope.

---

# Memory Visualization


const user1 = {
  name: "Praful"
};

const user2 = user1;

user2.name = "John";


Visualization:


STACK
----------------
user1 ─────┐
           │
user2 ─────┘

HEAP
----------------
{
  name: "John"
}


---

# Debug Execution Context using console.trace()


function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.trace("Trace:");
}

first();


---

# Checkpoint Answers

# How V8 Optimizes Repeated Function Calls

V8:

1. Uses Ignition interpreter first
2. Detects hot functions
3. TurboFan compiles optimized machine code
4. Uses:

   * hidden classes
   * inline caching
   * type feedback
   * function inlining

---

# Lexical Scope vs Dynamic Scope

| Lexical Scope            | Dynamic Scope         |
| ------------------------ | --------------------- |
| Based on code location   | Based on caller       |
| Determined at write time | Determined at runtime |
| JavaScript uses this     | JS does NOT use this  |
| Predictable              | Less predictable      |

Example:


let x = 1;

function a() {
  console.log(x);
}

function b() {
  let x = 2;
  a();
}

b();


Output: 1
