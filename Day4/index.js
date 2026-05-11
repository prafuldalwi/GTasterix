
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("sync");




const p = new Promise((resolve, reject) => {
    resolve("success");
  });
  
  p.then(console.log);
  




Promise.resolve()
.then(() => {
  throw new Error("Boom");
})
.catch(err => {
  console.log(err.message);
});




async function test() {
    const data = await fetchData();
    return data;
  }
  
  
  
  
  function test() {
    return fetchData().then(data => {
      return data;
    });
  }





async function run() {
    console.log(1);
  
    await Promise.resolve();
  
    console.log(2);
  }
  
  run();
  
  console.log(3);
  




async function getData() {
    const res = await fetch("/api");
  
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  
    return res.json();
  }




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
  




fetchWithRetry("https://api.example.com/data")
.then(console.log)
.catch(console.error);






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





const results = await Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Failed")
  ]);
  
  console.log(results);






console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");






setTimeout(() => console.log(1));

Promise.resolve().then(() => {
  console.log(2);
});

queueMicrotask(() => {
  console.log(3);
});

console.log(4);






Promise.resolve().then(() => {
    console.log("A");
  
    Promise.resolve().then(() => {
      console.log("B");
    });
  });
  
  setTimeout(() => {
    console.log("C");
  }, 0);
  



async function test() {
    console.log(1);
  
    await null;
  
    console.log(2);
  }
  
  console.log(3);
  
  test();
  
  console.log(4);






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
  