const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    console.log(innerVar);
    console.log(outerVar);
    console.log(globalVar);
  }

  inner();
}

outer();





function outer() {
    let count = 0;
  
    function inner() {
      count++;
      console.log(count);
    }
  
    return inner;
  }
  
  const counter = outer();
  
  counter(); // 1
  counter(); // 2
  counter(); // 3





let total = 0;

function addToTotal(value) {
  total += value;
}





function randomNumber() {
    return Math.random();
  }






const UserModule = (function() {
    let username = "Praful";
  
    function getUser() {
      return username;
    }
  
    function setUser(name) {
      username = name;
    }
  
    return {
      getUser,
      setUser
    };
  })();
  
  
  Usage:
  
  
  console.log(UserModule.getUser());
  
  UserModule.setUser("John");
  
  console.log(UserModule.getUser());








function createCounter() {
    let count = 0;
  
    return {
      increment() {
        count++;
        return count;
      },
  
      decrement() {
        count--;
        return count;
      },
  
      reset() {
        count = 0;
        return count;
      },
  
      getCount() {
        return count;
      }
    };
  }
  
  const counterA = createCounter();
  
  console.log(counterA.increment()); // 1
  console.log(counterA.increment()); // 2
  console.log(counterA.decrement()); // 1
  console.log(counterA.reset());     // 0
  







function createMathUtils(base) {
    return {
      add(num) {
        return base + num;
      },
  
      subtract(num) {
        return base - num;
      },
  
      multiply(num) {
        return base * num;
      },
  
      divide(num) {
        return base / num;
      }
    };
  }
  
  const math = createMathUtils(10);
  
  console.log(math.add(5));       // 15
  console.log(math.multiply(2));  // 20
  console.log(math.subtract(3));  // 7
  










function createBankAccount(initialBalance) {
    let balance = initialBalance;
  
    return {
      deposit(amount) {
        balance += amount;
        return balance;
      },
  
      withdraw(amount) {
        if (amount > balance) {
          return "Insufficient funds";
        }
  
        balance -= amount;
        return balance;
      },
  
      getBalance() {
        return balance;
      }
    };
  }
  
  const account = createBankAccount(1000);
  
  console.log(account.deposit(500));    // 1500
  console.log(account.withdraw(200));   // 1300
  console.log(account.getBalance());    // 1300
  






