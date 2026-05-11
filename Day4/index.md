# JavaScript Async & Event Loop — Deep Dive

---

# 1. Event Loop — Deep Understanding

JavaScript is:

* Single-threaded
* Non-blocking
* Uses an event loop to handle async operations

The engine has:

* Call Stack
* Web APIs / Browser APIs
* Task Queues
* Event Loop

---

## Core Flow

### Step 1 — Execute synchronous code

Functions enter the Call Stack.


console.log("A");
console.log("B");
console.log("C");


Execution order:


A
B
C


---

### Step 2 — Async APIs move out of stack

Example:


setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");


Flow:

1. `setTimeout` enters stack
2. Browser registers timer
3. Timer callback goes to Macrotask Queue
4. Stack continues execution
5. `"End"` prints
6. Event loop checks queues
7. Callback pushed to stack

Output:


End
Timer


---

# Event Loop Architecture


┌─────────────┐
│ Call Stack  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Web APIs    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Task Queues │
├─────────────┤
│ Microtasks  │
│ Macrotasks  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Event Loop  │
└─────────────┘


---

# 2. Microtask Queue vs Macrotask Queue

## Macrotasks

Examples:

* `setTimeout`
* `setInterval`
* DOM events
* `setImmediate` (Node.js)
* MessageChannel

---

## Microtasks

Examples:

* `Promise.then`
* `catch`
* `finally`
* `queueMicrotask`
* MutationObserver

---

# Priority Rule

Microtasks ALWAYS execute before macrotasks.

---

## Example


setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("sync");


Output: sync
promise
timeout


---

# Event Loop Cycle

The loop executes:

1. One macrotask
2. ALL microtasks
3. Rendering (browser)
4. Next macrotask

---

# Important Rule

After every macrotask:


Flush entire microtask queue


before processing another macrotask.

---

# 3. Promise Internal State Transitions

A Promise has 3 states:


pending
fulfilled
rejected


---

# Lifecycle


pending
   ├──> fulfilled
   └──> rejected


Once settled:

* State cannot change
* Result becomes immutable

---

## Example


const p = new Promise((resolve, reject) => {
  resolve("success");
});

p.then(console.log);


---

# Internal Mechanics

When resolved:

1. Promise stores value
2. `.then()` callbacks become microtasks
3. Event loop executes them later

---

## Chaining


Promise.resolve(1)
  .then(v => v + 1)
  .then(v => v + 1)
  .then(console.log);


Each `.then()`:

* Creates NEW promise
* Queues new microtask

---

# Error Propagation


Promise.resolve()
  .then(() => {
    throw new Error("Boom");
  })
  .catch(err => {
    console.log(err.message);
  });


Output:


Boom


Thrown errors automatically become rejected promises.

---

# 4. async/await Compilation Behavior

`async/await` is syntax sugar over promises.

---

# Internal Transformation

This:


async function test() {
  const data = await fetchData();
  return data;
}


roughly becomes:


function test() {
  return fetchData().then(data => {
    return data;
  });
}


---

# Important Behavior

`await`:

* pauses ONLY the async function
* does NOT block the JS thread

---

## Example


async function run() {
  console.log(1);

  await Promise.resolve();

  console.log(2);
}

run();

console.log(3);


Output:


1
3
2


Because code after `await` becomes a microtask.

---

# Multiple Awaits


async function test() {
  await 1;
  await 2;
  await 3;
}


Each `await` creates:

* additional promise resolution
* additional microtask

Too many awaits can reduce performance.

---

# Parallel vs Serial Execution

## Serial


const a = await fetchA();
const b = await fetchB();
const c = await fetchC();


Total time:


A + B + C


---

## Parallel


const [a, b, c] = await Promise.all([
  fetchA(),
  fetchB(),
  fetchC()
]);


Total time:


max(A, B, C)


---

# 5. Fetch API Pipeline & Error Propagation

## Fetch Lifecycle


fetch()
   ↓
DNS lookup
   ↓
TCP/TLS connection
   ↓
HTTP request
   ↓
Response headers
   ↓
Body stream
   ↓
Promise resolved


---

# Important Detail

`fetch()` only rejects on:

* network failure
* CORS failure
* aborted request

NOT on HTTP errors.

---

## Example


fetch("/404")
  .then(res => {
    console.log(res.ok); // false
  });


Still resolves successfully.

---

# Proper Error Handling


async function getData() {
  const res = await fetch("/api");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}


---

# Response Body Parsing


await res.json()


also returns a promise because parsing is async.

---

# AbortController


const controller = new AbortController();

fetch("/api", {
  signal: controller.signal
});

controller.abort();


Useful for:

* cancelling requests
* preventing memory leaks
* race condition handling

---

# HANDS-ON TASKS

---

# 1. Fetch Wrapper with Retry Logic


async function fetchWithRetry(
  url,
  options = {},
  retries = 3,
  delay = 1000
) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries) {
        throw error;
      }

      console.log(`Retry ${i + 1}`);

      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }
}


---

## Usage


fetchWithRetry("https://api.example.com/data")
  .then(console.log)
  .catch(console.error);


---

# 2. Async Exercises — Serial vs Parallel

## Serial Execution


function wait(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

async function serial() {
  console.time("serial");

  const a = await wait(1000, "A");
  const b = await wait(1000, "B");
  const c = await wait(1000, "C");

  console.log(a, b, c);

  console.timeEnd("serial");
}

serial();


Expected:


~3000ms


---

## Parallel Execution


async function parallel() {
  console.time("parallel");

  const [a, b, c] = await Promise.all([
    wait(1000, "A"),
    wait(1000, "B"),
    wait(1000, "C")
  ]);

  console.log(a, b, c);

  console.timeEnd("parallel");
}

parallel();


Expected:


~1000ms


---

# Promise.allSettled


const results = await Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Failed")
]);

console.log(results);


Useful when all results matter.

---

# 3. Event Loop Inspection Exercises

## Exercise 1


console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");


Output:


start
end
promise
timeout


---

## Exercise 2


setTimeout(() => console.log(1));

Promise.resolve().then(() => {
  console.log(2);
});

queueMicrotask(() => {
  console.log(3);
});

console.log(4);


Output:


4
2
3
1


---

## Exercise 3 — Nested Microtasks


Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

setTimeout(() => {
  console.log("C");
}, 0);


Output:


A
B
C


Because microtasks fully drain before macrotasks.

---

## Exercise 4 — async/await Ordering


async function test() {
  console.log(1);

  await null;

  console.log(2);
}

console.log(3);

test();

console.log(4);


Output:


3
1
4
2


---

# CHECKPOINTS

# What is Microtask Starvation?

Microtask starvation happens when:

* microtasks continuously queue new microtasks
* macrotasks never get chance to execute

---

## Example


function infiniteMicrotasks() {
  Promise.resolve().then(() => {
    console.log("microtask");

    infiniteMicrotasks();
  });
}

infiniteMicrotasks();

setTimeout(() => {
  console.log("timeout");
}, 0);


`setTimeout` may never execute because:


Microtask queue never becomes empty


---

# Why This Is Dangerous

It can:

* freeze UI
* block rendering
* delay timers
* create browser unresponsiveness

---

# Prevention

Use macrotask yielding:


setTimeout(() => {
    
}, 0);


or batching strategies.

---
