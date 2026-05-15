# JavaScript Error Handling & Debugging


# Theory

## 1. Custom Error Classes

JavaScript allows developers to create specialized error types by extending the built-in `Error` class.

### Why Use Custom Errors?

* Better debugging
* Cleaner architecture
* Easier error categorization
* Improved recovery logic
* More readable stack traces


## Basic Custom Error Example

class ValidationError extends Error {
  constructor(message) {
    super(message);

    this.name = "ValidationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

function registerUser(user) {
  if (!user.email) {
    throw new ValidationError("Email is required");
  }

  return "User Registered";
}

try {
  registerUser({});
} catch (err) {
  console.log(err.name);
  console.log(err.message);
}



## Advanced Custom Error

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.name = "APIError";
    this.statusCode = statusCode;
    this.timestamp = new Date();
  }
}

async function fetchData() {
  throw new APIError("Unauthorized", 401);
}

fetchData().catch(err => {
  console.log(err.statusCode);
});



# 2. Error Boundaries in JavaScript Apps

The idea of an error boundary is preventing one failure from crashing the entire application.


## Safe Execution Wrapper

function safeExecute(fn) {
  try {
    fn();
  } catch (err) {
    console.error("Application Error:", err.message);
  }
}

safeExecute(() => {
  JSON.parse("{ invalid json }");
});

console.log("App still running");



## Global Error Handler

window.onerror = function(message, source, line, column, error) {
  console.log("Global Error Caught");
  console.log(message);
};



## Unhandled Promise Rejections

window.addEventListener("unhandledrejection", event => {
  console.log("Unhandled Promise Rejection");
  console.log(event.reason);
});



# 3. Debugging Memory Leaks

## What is a Memory Leak?

A memory leak occurs when memory is no longer needed but still referenced.

The garbage collector cannot free it.


# Common Causes of Memory Leaks

## 1. Accidental Global Variables

function createLeak() {
  leakedData = new Array(1000000).fill("memory");
}


Problem:

* `leakedData` becomes a global variable accidentally.


## 2. Detached DOM Nodes

let button = document.getElementById("btn");

button.remove();

console.log(button);


The element is removed visually but still referenced in memory.


## 3. Forgotten Timers

setInterval(() => {
  console.log("Running forever");
}, 1000);


Intervals continue running unless cleared.


## 4. Event Listener Leaks

const handler = () => console.log("clicked");

button.addEventListener("click", handler);

// Missing removeEventListener



## 5. Closures Retaining Large Objects

function hugeMemory() {
  const largeArray = new Array(1000000).fill("data");

  return function() {
    console.log(largeArray.length);
  };
}


Closures can keep large objects alive.


# Garbage Collection Basics

JavaScript uses:

* Mark-and-sweep GC
* Reachability analysis

If an object is reachable from:

* Global scope
* Closures
* DOM references
* Event listeners

…it cannot be garbage collected.


# 4. Chrome DevTools Advanced Usage

## Opening DevTools

* Windows/Linux → `F12`
* Mac → `Cmd + Option + I`


# Important DevTools Tabs

 Tab          Purpose               
 -----------  --------------------- 
 Elements     Inspect DOM           
 Console      Run/debug JS          
 Sources      Breakpoints/debugging 
 Network      API requests          
 Performance  CPU profiling         
 Memory       Heap analysis         


# Breakpoints Debugging

## Example Broken Script

function divide(a, b) {
  return a / b;
}

const result = divide(10, 0);

console.log(result.toUpperCase());



# Debugging Steps

## Step 1 — Open Sources Tab

Navigate to:

* DevTools → Sources


## Step 2 — Add Breakpoint

Click the line number:

console.log(result.toUpperCase());



## Step 3 — Reload Script

Execution pauses before the error.


## Step 4 — Inspect Variables

Check:

* `result`
* Scope variables
* Call stack

You discover:

result === Infinity



## Step 5 — Fix Logic

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }

  return a / b;
}



# Memory Debugging Using DevTools

## Heap Snapshot

Steps:

1. Open Memory tab
2. Take Heap Snapshot
3. Interact with the app
4. Take another snapshot
5. Compare retained objects


## Allocation Timeline

Useful for:

* Detecting growing memory
* Finding leaked listeners
* Observing garbage collection behavior


# 5. Handling Async Errors Properly

Async code introduces different failure paths.


# Promise Error Handling

fetch("/api/data")
  .then(res => res.json())
  .catch(err => {
    console.error("Fetch failed:", err);
  });



# Async/Await Error Handling

async function loadData() {
  try {
    const res = await fetch("/api/data");

    if (!res.ok) {
      throw new Error("API failed");
    }

    const data = await res.json();

    return data;

  } catch (err) {
    console.error(err.message);
  }
}



# Parallel Async Error Handling

async function loadAll() {
  try {
    const results = await Promise.all([
      fetch("/users"),
      fetch("/posts"),
      fetch("/comments")
    ]);

    console.log(results);

  } catch (err) {
    console.error("One request failed");
  }
}



# Promise.allSettled()

Useful when partial success is acceptable.

const results = await Promise.allSettled([
  fetch("/a"),
  fetch("/b"),
  fetch("/c")
]);

console.log(results);



# Hands-on Task 1 — Custom Error Handler

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

function connectDB(status) {
  if (!status) {
    throw new DatabaseError("Database Connection Failed");
  }

  return "Connected";
}

try {
  console.log(connectDB(false));
} catch (err) {

  if (err instanceof DatabaseError) {
    console.error("DB ERROR:", err.message);
  } else {
    console.error("Unknown Error");
  }
}



# Hands-on Task 2 — Debugging With Breakpoints

function calculateTotal(items) {
  let total = 0;

  for (let item of items) {
    total += item.price;
  }

  return total;
}

const cart = [
  { price: 100 },
  { price: 200 },
  { cost: 300 }
];

console.log(calculateTotal(cart));



# Debugging Process

Set a breakpoint inside the loop.

Inspect:

item.price


Third item becomes:

undefined


Fix:

{ price: 300 }



## What causes memory leaks in large JS apps?


* Unremoved event listeners
* Forgotten intervals/timeouts
* Detached DOM nodes
* Accidental global variables
* Closures retaining large objects
* Cached references never cleared
* Long-lived singleton objects
* Improper state management

A leak occurs whenever objects remain reachable and therefore cannot be garbage collected.

