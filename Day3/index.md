# JavaScript Arrays & Objects

## 1. Arrays: Internal Structure, Amortized Time, Sparse Arrays

### How Arrays Work Internally

JavaScript arrays are specialized objects optimized for indexed storage.


const arr = [10, 20, 30];


Internally:


{
  0: 10,
  1: 20,
  2: 30,
  length: 3
}


Array indices are actually string keys.

---

## Time Complexity

| Operation       | Complexity     |
| --------------- | -------------- |
| Access `arr[i]` | O(1)           |
| Push            | O(1) amortized |
| Pop             | O(1)           |
| Shift / Unshift | O(n)           |
| Insert middle   | O(n)           |

---

## Amortized Time

Appending usually takes constant time:


arr.push(100);


But when internal storage becomes full:

1. Engine allocates larger memory
2. Copies elements
3. Adds new item

This expensive resize happens rarely.

So average cost becomes:


O(1) amortized


---

## Sparse Arrays

Sparse arrays contain “empty slots”.


const sparse = [1, , , 4];

console.log(sparse.length); // 4


Indices 1 and 2 do not exist.


1 in sparse // false


### Behavior Differences


sparse.map(x => x);


`map()` skips empty slots.

Sparse arrays are slower because JS engines cannot optimize them efficiently.

---

# 2. Custom Implementations

## Custom map()


Array.prototype.myMap = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }

  return result;
};


### Example


const nums = [1, 2, 3];

const doubled = nums.myMap(n => n * 2);

console.log(doubled);


---

## Custom filter()


Array.prototype.myFilter = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};


---

## Custom reduce()


Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};


---

# 3. Object Data Structures & Prototypes

## Objects

Objects store key-value pairs.


const user = {
  name: "Praful",
  age: 22
};


---

## Prototype Chain

Every object has an internal link:


object -> prototype -> prototype -> null





const animal = {
  eats: true
};

const dog = Object.create(animal);

dog.barks = true;

console.log(dog.eats);


JS searches properties upward through the prototype chain.

---

## Prototype Lookup Mechanism

When accessing:


dog.eats


Engine checks:

1. `dog`
2. `animal`
3. `Object.prototype`
4. `null`

---

# 4. Deep vs Shallow Copy Mechanics

## Shallow Copy

Copies only first-level references.


const original = {
  user: {
    name: "Praful"
  }
};

const copy = { ...original };

copy.user.name = "Changed";

console.log(original.user.name);


Output:


Changed


Because nested objects share memory.

---

## Deep Copy

Creates entirely independent structures.

---

## Why `JSON.parse(JSON.stringify())` is Problematic

It breaks:

* Functions
* Dates
* Maps
* Sets
* Undefined
* Circular references

---

# 5. Deep Clone Without JSON.parse


function deepClone(value, weakMap = new WeakMap()) {

  if (value === null || typeof value !== "object") {
    return value;
  }

  if (weakMap.has(value)) {
    return weakMap.get(value);
  }

  const clone = Array.isArray(value) ? [] : {};

  weakMap.set(value, clone);

  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      clone[key] = deepClone(value[key], weakMap);
    }
  }

  return clone;
}


---




const obj = {
  name: "Praful",
  nested: {
    age: 22
  }
};

const copied = deepClone(obj);

copied.nested.age = 99;

console.log(obj.nested.age);


Output:


22


---

# 6. Destructuring Patterns

## Object Destructuring


const user = {
  name: "Praful",
  age: 22
};

const { name, age } = user;


---

## Nested Destructuring


const person = {
  profile: {
    city: "Mumbai"
  }
};

const {
  profile: { city }
} = person;


---

## Array Destructuring


const nums = [10, 20, 30];

const [a, b] = nums;


---

## Rest Operator


const { id, ...remaining } = user;


---

## Default Values


const { country = "India" } = user;


---

# 7. Reusable Destructuring Utility


function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}


---

Example


const user = {
  name: "Praful",
  age: 22,
  city: "Pune"
};

const result = pick(user, ["name", "city"]);

console.log(result);


Output:


{
  name: "Praful",
  city: "Pune"
}


---

# Hands-on Task 1 — Custom Reduce for Nested Structures


const data = [
  {
    category: "fruit",
    items: ["apple", "banana"]
  },
  {
    category: "vegetable",
    items: ["carrot"]
  }
];

const grouped = data.reduce((acc, curr) => {
  acc[curr.category] = curr.items;

  return acc;
}, {});

console.log(grouped);


Output:


{
  fruit: ["apple", "banana"],
  vegetable: ["carrot"]
}


---

# Hands-on Task 2 — Advanced Deep Clone


function deepCloneAdvanced(obj, map = new WeakMap()) {

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  let clone;

  if (obj instanceof Date) {
    clone = new Date(obj);
  } else if (Array.isArray(obj)) {
    clone = [];
  } else {
    clone = {};
  }

  map.set(obj, clone);

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      clone[key] = deepCloneAdvanced(obj[key], map);
    }
  }

  return clone;
}


---

# Hands-on Task 3 — Reusable Nested Destructuring Utility


function getNestedValue(obj, path) {

  return path
    .split(".")
    .reduce((acc, key) => acc?.[key], obj);
}


---

## Example


const user = {
  profile: {
    address: {
      city: "Delhi"
    }
  }
};

console.log(
  getNestedValue(user, "profile.address.city")
);





---


## What Happens When Spreading a Nested Object?


const original = {
  user: {
    name: "Praful"
  }
};

const copied = { ...original };


Spread operator performs:


SHALLOW COPY


Meaning:

* Top-level properties are copied
* Nested objects are copied by reference

So:


copied.user.name = "Changed";


also changes:


original.user.name


because both point to the same nested object in memory.

---


## Arrays are specialized objects


typeof [] // "object"


---

## Sparse arrays behave differently

Methods skip holes:


[1, , 3].map(x => x * 2)


---

## `reduce()` is the most powerful array method

Most array transformations can be built using reduce.

---

## Prototypes enable inheritance


obj.__proto__


creates prototype linkage.

---

## Spread operator ≠ deep clone

Nested references remain shared.

