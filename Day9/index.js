
class Database {
    constructor() {
      if (Database.instance) {
        return Database.instance;
      }
  
      this.connection = "Connected";
  
      Database.instance = this;
    }
  }
  
  const db1 = new Database();
  const db2 = new Database();
  
  console.log(db1 === db2); // true






const CounterModule = (() => {
    let count = 0;
  
    function increment() {
      count++;
    }
  
    function decrement() {
      count--;
    }
  
    function getCount() {
      return count;
    }
  
    return {
      increment,
      decrement,
      getCount
    };
  })();
  
  CounterModule.increment();
  CounterModule.increment();
  
  console.log(CounterModule.getCount());
  



class UserModel {
    constructor(name) {
      this.name = name;
    }
  
    getUser() {
      return this.name;
    }
  }
  
  // VIEW
  class UserView {
    render(userName) {
      console.log("Rendering:", userName);
    }
  }
  
  // CONTROLLER
  class UserController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
    }
  
    updateView() {
      this.view.render(this.model.getUser());
    }
  }
  
  const model = new UserModel("Praful");
  const view = new UserView();
  
  const controller = new UserController(model, view);
  
  controller.updateView();
  