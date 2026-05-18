
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
  