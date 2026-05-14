# JavaScript ES6+


## 1. ES6 Modules — Static Analysis & Tree Shaking

### What Are ES Modules?

ES Modules (ESM) are the official JavaScript module system introduced in ES6.

They allow JavaScript code to be split into reusable files using:

* `export`
* `import`

Example:


// math.js
export function add(a, b) {
  return a + b;
}




import { add } from './math.js';

console.log(add(2, 3));



## Why Modules Matter

Before ES Modules:

* Global namespace pollution
* Dependency ordering problems
* Difficult code scaling
* Manual script management

Modules solve this through:

* Encapsulation
* Dependency isolation
* Reusability
* Better optimization


# Static Analysis

## What Does Static Analysis Mean?

The JavaScript engine understands module dependencies BEFORE code execution.

Example:


import { sum } from './math.js';


The engine already knows:

* Which module is required
* Which export is imported
* Whether the export exists
* Dependency graph structure

This enables:

* Tree shaking
* Dead code elimination
* Faster bundling
* Better optimization


# Tree Shaking

## What Is Tree Shaking?

Tree shaking removes unused exports during bundling.

Example:


// utils.js
export function used() {
  console.log('used');
}

export function unused() {
  console.log('unused');
}




import { used } from './utils.js';

used();


Bundlers like:

* Webpack
* Rollup
* Vite
* ESBuild

can remove `unused()` from the final bundle.


# Why ES Modules Enable Tree Shaking

Because imports are:

* Static
* Predictable
* Top-level only

This is difficult in CommonJS:


const lib = require(variableName);


Dynamic imports prevent static analysis.


# Live Bindings

ES Module imports are LIVE references.

They are not copied values.


// counter.js
export let count = 0;

export function increment() {
  count++;
}




import { count, increment } from './counter.js';

console.log(count); // 0

increment();

console.log(count); // 1



# Default vs Named Export

## Named Export


export const PI = 3.14;


Import:


import { PI } from './math.js';



## Default Export


export default function greet() {
  console.log('Hello');
}


Import:


import greet from './file.js';


Only one default export is allowed.


# Dynamic Import


const module = await import('./math.js');


Useful for:

* Lazy loading
* Route splitting
* Performance optimization


# ES Modules vs CommonJS

| Feature         | CommonJS               | ES Modules    |
| --------------- | ---------------------- | ------------- |
| Syntax          | require/module.exports | import/export |
| Loading         | Runtime                | Static        |
| Tree shaking    | Weak                   | Excellent     |
| Browser support | No                     | Yes           |
| Async support   | Limited                | Native        |


# 2. Map — Deep Theory

## What Is Map?

`Map` is a key-value collection.

Keys can be ANY data type.


const map = new Map();

map.set('name', 'John');
map.set(1, 'number');
map.set({}, 'object');



# Why Map Exists

Objects have limitations:

* Keys become strings
* Prototype pollution
* Weak iteration support
* Slower dynamic operations

Map solves these issues.


# Map Features

| Feature       | Map |
| ------------- | --- |
| Key types     | Any |
| Ordered       | Yes |
| Iterable      | Yes |
| Size property | Yes |
| Fast lookup   | Yes |


# Internal Complexity

| Operation | Complexity |
| --------- | ---------- |
| set       | O(1)       |
| get       | O(1)       |
| delete    | O(1)       |


# Object Identity in Map

Objects are compared by reference.


const obj = {};

const map = new Map();

map.set(obj, 'hello');

console.log(map.get(obj));



# Iterating Map


const map = new Map([
  ['name', 'John'],
  ['age', 20]
]);

for (const [key, value] of map) {
  console.log(key, value);
}



# 3. WeakMap — Deep Theory

## What Is WeakMap?

A collection where:

* Keys MUST be objects
* Keys are weakly referenced


const wm = new WeakMap();

const user = {};

wm.set(user, 'cached');



# Weak References

Normal Map:


map.set(obj, data);


The object stays alive in memory.

WeakMap:


weakMap.set(obj, data);


If no references remain:

* Object is garbage collected
* WeakMap entry disappears automatically


# Why WeakMap Exists

WeakMap helps avoid memory leaks.

Perfect for:

* Caching
* Private data
* DOM metadata
* Temporary object storage


# WeakMap Is Not Iterable

Because entries may disappear anytime.

These are NOT allowed:


weakMap.keys();
weakMap.forEach();



# WeakMap Private Data Pattern


const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, {
      name
    });
  }

  getName() {
    return privateData.get(this).name;
  }
}



# 4. Set — Deep Theory

## What Is Set?

A collection of unique values.


const set = new Set();

set.add(1);
set.add(1);

console.log(set.size); // 1



# Why Set Is Useful

Common uses:

* Remove duplicates
* Membership checking
* Unique collections
* Tracking visited items


# Remove Duplicates


const nums = [1, 2, 2, 3, 3];

const unique = [...new Set(nums)];

console.log(unique);



# Set Complexity

| Operation | Complexity |
| --------- | ---------- |
| add       | O(1)       |
| has       | O(1)       |
| delete    | O(1)       |


# 5. WeakSet — Deep Theory

WeakSet stores only objects.


const ws = new WeakSet();

const obj = {};

ws.add(obj);


Features:

* Objects only
* Weak references
* Not iterable

Common use cases:

* Tracking object state
* Circular reference detection


# 6. Optional Chaining (`?.`)

## Problem Before


const city = user &&
             user.address &&
             user.address.city;



# Modern Solution


const city = user?.address?.city;


If any value is:

* null
* undefined

The expression safely returns `undefined`.


# Optional Function Calls


callback?.();



# Optional Array Access


arr?.[0];



# 7. Nullish Coalescing (`??`)

## Problem with `||`


const value = 0 || 10;

console.log(value); // 10



# Correct Solution


const value = 0 ?? 10;

console.log(value); // 0


`??` only falls back for:

* null
* undefined


# `||` vs `??`

| Value | `||` | `??` |
|---|---|---|
| 0 | fallback | keeps 0 |
| false | fallback | keeps false |
| '' | fallback | keeps '' |
| null | fallback | fallback |
| undefined | fallback | fallback |


# 8. Spread Operator (`...`) — Advanced Usage

## Spread Expands Values

### Arrays


const a = [1, 2];

const b = [...a, 3];



### Objects


const user = {
  name: 'John'
};

const updated = {
  ...user,
  age: 20
};



# Spread Is Shallow Copy


const obj = {
  nested: {
    x: 1
  }
};

const copy = { ...obj };

copy.nested.x = 99;

console.log(obj.nested.x); // 99



# Conditional Spreading


const isAdmin = true;

const user = {
  name: 'John',
  ...(isAdmin && {
    role: 'admin'
  })
};



# Spread in Function Calls


const nums = [1, 2, 3];

console.log(Math.max(...nums));



# 9. Rest Operator (`...`) — Advanced Usage

## Rest Collects Values

### Function Parameters


function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}



# Object Rest


const user = {
  name: 'John',
  age: 20,
  city: 'NY'
};

const { city, ...rest } = user;

console.log(rest);



# Array Rest


const [first, ...others] = [1, 2, 3];

console.log(others);



# Spread vs Rest

| Spread      | Rest        |
| ----------- | ----------- |
| Expands     | Collects    |
| RHS usage   | LHS usage   |
| Copies data | Groups data |


# Hands-On Task 1 — Convert Multi-File Project to ES Modules

## Folder Structure

txt
project/
│
├── index.html
├
├── math.js
└── user.js



# math.js


export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}



# user.js


export default class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}





import User from './user.js';
import { add, multiply } from './math.js';

const user = new User('John');

console.log(user.greet());

console.log(add(2, 3));
console.log(multiply(4, 5));



# index.html

html
<!DOCTYPE html>
<html>
<head>
  <title>ES Modules</title>
</head>
<body>

<script type="module" src="></script>

</body>
</html>



# Hands-On Task 2 — WeakMap Caching System


const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    console.log('From cache');
    return cache.get(obj);
  }

  console.log('Computed');

  const result = {
    value: obj.num * 1000
  };

  cache.set(obj, result);

  return result;
}

const data = {
  num: 5
};

console.log(expensiveOperation(data));
console.log(expensiveOperation(data));



# Why WeakMap Is Perfect for Caching

When object references disappear:


let data = {
  num: 5
};

cache.set(data, 'cached');

data = null;


Garbage collector can remove:

* Object
* WeakMap entry

Automatically.


# Advanced WeakMap Memoization


function memoize(fn) {
  const cache = new WeakMap();

  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }

    const result = fn(obj);

    cache.set(obj, result);

    return result;
  };
}



# Checkpoint — Difference Between Map and WeakMap?

| Feature            | Map             | WeakMap                   |
| ------------------ | --------------- | ------------------------- |
| Key types          | Any             | Objects only              |
| Iterable           | Yes             | No                        |
| Size property      | Yes             | No                        |
| Garbage collection | Strong refs     | Weak refs                 |
| Prevents GC        | Yes             | No                        |
| Use case           | General storage | Temporary/private storage |


# Important Interview Insight

## Why WeakMap Cannot Be Iterated?

Because keys may disappear anytime due to garbage collection.

Enumeration would become unpredictable.

