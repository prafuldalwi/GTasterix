
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
  