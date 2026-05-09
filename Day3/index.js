// Custom map


Array.prototype.myMap = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }

  return result;
};








//  Custom filter()


Array.prototype.myFilter = function(callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};










//  Custom reduce()


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









// Prototype Chain


const animal = {
    eats: true
  };
  
  const dog = Object.create(animal);
  
  dog.barks = true;
  
  console.log(dog.eats);







//   Shallow Copy

  
  const original = {
    user: {
      name: "Praful"
    }
  };
  
  const copy = { ...original };
  
  copy.user.name = "Changed";
  
  console.log(original.user.name);
  






//   Deep Clone Without JSON.parse


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







// Reusable Destructuring Utility


function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}






// Task 1 — Custom Reduce for Nested Structures


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







// Task 2 — Advanced Deep Clone


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