# JavaScript DOM & Browser Rendering

## DOM Tree Structure

The DOM (Document Object Model) is a tree representation of an HTML document.

Every HTML element becomes a node.

---

Example HTML

<html>
  <body>
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  </body>
</html>


## DOM Tree


Document
 └── html
      └── body
           └── div
                ├── h1
                │    └── "Hello"
                └── p
                     └── "World"


---

## Types of DOM Nodes

| Node Type      | Example       |
| -------------- | ------------- |
| Document Node  | `document`    |
| Element Node   | `<div>`       |
| Text Node      | `Hello`       |
| Attribute Node | `class="box"` |

---

# Browser DOM Creation Process

1. Browser downloads HTML.
2. HTML parser reads tags.
3. Browser converts tags into nodes.
4. DOM tree gets created in memory.

---

# DOM Traversal

## Parent → Child


const parent = document.querySelector(".container");
console.log(parent.children);


## Child → Parent


const child = document.querySelector("button");
console.log(child.parentElement);


## Sibling Access


console.log(element.nextElementSibling);
console.log(element.previousElementSibling);


---

# Reflow vs Repaint

## Repaint

Occurs when visual appearance changes without affecting layout.

Examples:

* Color change
* Background change
* Visibility change


box.style.color = "red";


Browser redraws pixels only.

Cheap operation.

---

## Reflow (Layout)

Occurs when layout changes.

Examples:

* Width change
* Height change
* Font size change
* Adding/removing elements
* Margin/padding updates


box.style.width = "500px";


Browser must:

1. Recalculate layout
2. Reposition elements
3. Repaint affected areas

Expensive operation.

---

# Browser Rendering Pipeline


HTML
 ↓
DOM Construction
 ↓
CSSOM Construction
 ↓
Render Tree
 ↓
Layout (Reflow)
 ↓
Paint (Repaint)
 ↓
Compositing


---

# Why Reflow Is Expensive

Because browser recalculates positions and dimensions of elements.

Large DOM trees increase cost.

---

## Bad Example


for (let i = 0; i < 1000; i++) {
  element.style.width = i + "px";
}


May trigger multiple layouts.

---

## Better Example


element.style.cssText = `
  width:500px;
  height:300px;
`;


Single layout update.

---

# Layout Thrashing

## Bad Pattern


for (let i = 0; i < 1000; i++) {
  box.style.width = box.offsetWidth + 1 + "px";
}


`offsetWidth` forces synchronous layout calculation every iteration.

---

# Optimization Techniques

| Technique              | Benefit                     |
| ---------------------- | --------------------------- |
| Batch DOM updates      | Fewer reflows               |
| Use CSS classes        | Better browser optimization |
| Use transform/opacity  | GPU acceleration            |
| Use DocumentFragment   | Less layout work            |
| Debounce scroll/resize | Reduced rendering work      |

---

# Event Bubbling, Capturing & Delegation

---

# Event Flow


Capturing Phase
↓
Target Phase
↓
Bubbling Phase


---

# Event Bubbling

Events move upward from child → parent.

## Example


<div id="parent">
  <button id="child">Click</button>
</div>



parent.addEventListener("click", () => {
  console.log("Parent");
});

child.addEventListener("click", () => {
  console.log("Child");
});


## Output


Child
Parent


---

# Event Capturing

Events travel downward first.


parent.addEventListener(
  "click",
  () => {
    console.log("Capture");
  },
  true
);


`true` enables capture phase.

---

# stopPropagation()

Stops event movement.


button.addEventListener("click", (e) => {
  e.stopPropagation();
});


---

# Event Delegation

Instead of attaching listeners to many children:

## Bad


buttons.forEach(btn => {
  btn.addEventListener("click", handler);
});


---

## Better

Attach one listener to parent.


list.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log(e.target.textContent);
  }
});


---

# Why Event Delegation Is Powerful

| Benefit                    | Reason          |
| -------------------------- | --------------- |
| Better performance         | Fewer listeners |
| Dynamic elements supported | No re-binding   |
| Lower memory usage         | Single handler  |

---

# Browser Rendering Pipeline Deep Dive

## Step 1 — Parse HTML

Creates DOM.

---

## Step 2 — Parse CSS

Creates CSSOM.

---

## Step 3 — Render Tree


DOM + CSSOM = Render Tree


Hidden elements (`display:none`) excluded.

---

## Step 4 — Layout

Calculates:

* Width
* Height
* Position

---

## Step 5 — Paint

Draws pixels.

---

## Step 6 — Compositing

GPU combines layers efficiently.

---

# GPU-Friendly Properties

Prefer animating:

transform
opacity


Avoid animating:

width
height
top
left


---

# Virtual DOM vs Real DOM

## Real DOM

Actual browser DOM.

Direct manipulation is expensive.

---

## Virtual DOM

A lightweight JavaScript representation of UI.

Used by React.

---

# Virtual DOM Workflow

## Initial Render


JSX → Virtual DOM → Real DOM


---

## On State Update

1. New Virtual DOM created
2. Diffing compares old vs new
3. Minimal changes detected
4. Only affected nodes updated

---

# Example

Instead of replacing full tree:


Old:
<h1>Hello</h1>

New:
<h1>Hello World</h1>


Only text node changes.

---

# Real DOM vs Virtual DOM

| Feature      | Real DOM                | Virtual DOM |
| ------------ | ----------------------- | ----------- |
| Update Cost  | High                    | Lower       |
| Manipulation | Direct                  | Batched     |
| Performance  | Slower for many updates | Faster      |
| Memory Usage | Lower                   | Higher      |

---

# Hands-On Project — Interactive DOM App

## Features

* Add tasks
* Delete tasks
* Event delegation
* Dynamic DOM updates

---



---

# Checkpoint — Why DOM Manipulation Is Expensive?

DOM manipulation is expensive because:

1. DOM is a large tree structure.
2. Browser synchronizes JS changes with UI.
3. Updates may trigger:

   * Reflow
   * Repaint
   * Compositing
4. Frequent updates block the main thread.
5. Large DOM trees increase rendering work.

---
