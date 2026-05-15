
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
  
  
fetch("/api/data")
.then(res => res.json())
.catch(err => {
  console.error("Fetch failed:", err);
});


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









  