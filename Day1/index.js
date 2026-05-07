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


// ---

let name = "Praful";

const user = {
  age: 25
};

let obj = { name: "A" };
obj = null;


// ---

let a = 10;
let b = a;

b = 20;

console.log(a);
Output: 10


// ---


const user1 = {
  name: "Praful"
};

const user2 = user1;

user2.name = "John";

console.log(user1.name);


Output: John

// ---


function change(obj) {
  obj.name = "Changed";
}

const userA = {
  name: "Original"
};

change(userA);

console.log(user.name);


// ---


// Closure


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


// ---

// Lexical


let nameA = "Global";

function outer() {
  let nameA = "Outer";

  function inner() {
    console.log(nameA);
  

  inner();
}

outer();

}


// ---


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




let x = 1;

function a() {
  console.log(x);
}

function b() {
  let x = 2;
  a();
}

b();
