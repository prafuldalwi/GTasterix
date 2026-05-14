// math.js
export function add(a, b) {
    return a + b;
  }
  
  
  
  
  import { add } from './math.js';
  
  console.log(add(2, 3));






// utils.js
export function used() {
    console.log('used');
  }
  
  export function unused() {
    console.log('unused');
  }
  
  
  
  
  import { used } from './utils.js';
  
  used();
  




// counter.js
export let count = 0;

export function increment() {
  count++;
}




import { count, increment } from './counter.js';

console.log(count); // 0

increment();

console.log(count); // 1






const obj = {};

const map = new Map();

map.set(obj, 'hello');

console.log(map.get(obj));





const map1 = new Map([
  ['name', 'John'],
  ['age', 20]
]);

for (const [key, value] of map1) {
  console.log(key, value);
}





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