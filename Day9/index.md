# JavaScript Design Patterns & Architecture



# 1. Observer Pattern

## Definition

The Observer Pattern defines a between objects so that when one object changes state, all its dependents are notified automatically.

It is heavily used in:

* Event systems
* State management libraries
* UI frameworks
* Reactive programming



### Subject

Maintains a list of observers and notifies them.

### Observer

Receives updates from the subject.



# Basic Observer Flow


Observer subscribes → Subject stores observer
Subject changes state → Subject notifies observers
Observers react to update




# Observer Pattern


class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(obs => obs !== fn);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const subject = new Subject();

function observer1(data) {
  console.log("Observer 1:", data);
}

function observer2(data) {
  console.log("Observer 2:", data);
}

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("New Update");




# Advantages

✔ Loose coupling
✔ Dynamic subscriptions
✔ Real-time updates
✔ Extensible event systems



# Disadvantages

✘ Memory leaks from forgotten listeners
✘ Difficult debugging
✘ Chain reactions can become complex



# Real-World s

* DOM Events
* Redux subscriptions
* WebSocket listeners
* RxJS Observables



# 2. Factory Pattern Implementation

## Definition

Factory Pattern creates objects without exposing exact creation logic to the user.

Instead of:


const user = new AdminUser();


You use:


const user = UserFactory.create("admin");



# Factory Pattern


class Admin {
  constructor(name) {
    this.name = name;
    this.role = "Admin";
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.role = "Customer";
  }
}

class UserFactory {
  static createUser(type, name) {
    switch(type) {
      case "admin":
        return new Admin(name);

      case "customer":
        return new Customer(name);

      default:
        throw new Error("Invalid user type");
    }
  }
}

const user1 = UserFactory.createUser("admin", "John");
const user2 = UserFactory.createUser("customer", "Alice");

console.log(user1);
console.log(user2);




# Factory Benefits

✔ Cleaner object creation
✔ Better abstraction
✔ Centralized management
✔ Easier testing



# Factory Drawbacks

✘ More abstraction layers
✘ Can become overly complex



# 3. Singleton Pitfalls

## Definition

Singleton ensures only ONE instance of a class exists.



# Singleton 


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

console.log(db1 === db2);




# Singleton Problems

## 1. Global State Problem

Singleton behaves like global variables.

This creates:

* Tight coupling
* Hard debugging
* Hidden dependencies



## 2. Difficult Testing

Testing becomes hard because:

* Shared state persists
* Mocks become difficult



## 3. Concurrency Issues

In large systems:

* Shared mutation becomes dangerous
* Race conditions may occur



## 4. Violates Single Responsibility Principle

Singleton handles:

* Instance management
* Business logic

Two responsibilities.



# When Singleton Is Acceptable

✔ Logger
✔ Config manager
✔ Database connection pool
✔ Cache manager



# 4. Module Pattern Best Usage

## Definition

Module Pattern encapsulates private variables and exposes public APIs.

Usually implemented with:

* Closures
* IIFE (Immediately Invoked Function Expression)



# Why Module Pattern?

* Data privacy
* Avoid global scope pollution
* Encapsulation
* Cleaner architecture



# Module Pattern 


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




# Private vs Public


// Private
let secret = "hidden";

// Public
return {
  showSecret
}




# Best Use Cases

✔ Utility libraries
✔ State containers
✔ Feature encapsulation
✔ API wrappers



# 5. MVC Architecture

## MVC = Model + View + Controller

Separates application concerns.



# MVC Structure


User Action
    ↓
Controller
    ↓
Model
    ↓
View Updates




# Components

## Model

Handles:

* Data
* Business logic
* State



## View

Handles:

* UI rendering
* Display



## Controller

Handles:

* User input
* Coordination



# Simple MVC 


// MODEL
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




# MVC Advantages

✔ Separation of concerns
✔ Easier maintenance
✔ Better scalability
✔ Easier testing



# MVC Disadvantages

✘ More files and complexity
✘ Overkill for small apps



# HANDS-ON TASKS



# Task 1 — Implement an Event Bus

## Event Bus Definition

Central communication system between independent modules.



# Event Bus Implementation


class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] =
      this.events[eventName].filter(cb => cb !== callback);
  }

  publish(eventName, data) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(callback => callback(data));
  }
}

const bus = new EventBus();

function logger(data) {
  console.log("Logger:", data);
}

bus.subscribe("login", logger);

bus.publish("login", {
  user: "Praful"
});

bus.unsubscribe("login", logger);

bus.publish("login", {
  user: "Another User"
});




# Task 2 — Factory for Dynamic Component Creation


class Button {
  render() {
    console.log("Rendering Button");
  }
}

class Input {
  render() {
    console.log("Rendering Input");
  }
}

class Card {
  render() {
    console.log("Rendering Card");
  }
}

class ComponentFactory {
  static createComponent(type) {
    switch(type) {
      case "button":
        return new Button();

      case "input":
        return new Input();

      case "card":
        return new Card();

      default:
        throw new Error("Unknown component");
    }
  }
}

const button = ComponentFactory.createComponent("button");
button.render();

const input = ComponentFactory.createComponent("input");
input.render();





# Q1 — Difference Between Observer vs Pub/Sub?

| Observer Pattern                                   | Pub/Sub Pattern                        |
| -------------------------------------------------- | -------------------------------------- |
| Direct communication between subject and observers | Communication through broker/event bus |
| Subject knows observers                            | Publisher does NOT know subscribers    |
| Tight coupling                                     | Loose coupling                         |
| Simpler architecture                               | More scalable                          |
| Common in UI systems                               | Common in distributed systems          |


