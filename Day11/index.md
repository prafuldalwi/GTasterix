React, Architecture, Rendering & Components


1. React Architecture

React is a component-based UI library built around the idea that the UI is a function of state.

Core Parts of React Architecture
User Action
   ↓
State Changes
   ↓
React Creates Virtual DOM
   ↓
Reconciliation (Diffing)
   ↓
Efficient DOM Updates
   ↓
Browser Paint


2. React Rendering Engine

React does not directly manipulate the browser DOM every time something changes.

Instead:

React creates a Virtual DOM (JavaScript object representation of UI).
When state/props change:
React creates a new Virtual DOM tree.
React compares:
Old Virtual DOM
New Virtual DOM
React updates only changed parts in the real DOM.

This makes rendering efficient.

3. Reconciliation Algorithm (Diffing)

Reconciliation = React’s process of comparing UI trees.

React Uses These Rules
Rule 1 — Different Element Type → Replace Entire Node
<div>Hello</div>

to:

<section>Hello</section>

React destroys old node and creates new one.

Rule 2 — Same Element Type → Update Attributes Only
<button className="red">Click</button>

to:

<button className="blue">Click</button>

React only updates the class.

Rule 3 — Lists Need Keys
items.map(item => (
  <li key={item.id}>{item.name}</li>
))

Keys help React identify:

added items
removed items
reordered items

Without keys:

unnecessary re-renders happen
bugs may appear
4. JSX Compilation Under the Hood

JSX is NOT HTML.

This:

<h1>Hello</h1>

gets converted by Babel into:

React.createElement("h1", null, "Hello")

Modern React may compile into:

jsx("h1", { children: "Hello" })
JSX Compilation Flow
JSX Code
   ↓
Babel Transpiles
   ↓
React.createElement()
   ↓
Virtual DOM Object
   ↓
Rendered to Browser
Example
JSX
const element = <button>Save</button>;
Compiled
const element = React.createElement(
  "button",
  null,
  "Save"
);
5. Functional Components vs Class Components
Feature	Functional	Class
Syntax	Simple	Verbose
State	useState	this.state
Lifecycle	Hooks	Lifecycle methods
Performance	Better optimized	Older approach
this keyword	No	Yes
Recommended	Yes	Legacy
Functional Component
function Welcome() {
  return <h1>Hello</h1>;
}
Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
Why Functional Components Became Standard

Hooks introduced:

useState
useEffect
useMemo
useCallback

Now functional components can do everything class components could.

6. Props Immutability Concept

Props are read-only.

Parent sends data → Child receives data.

Child MUST NOT modify props.

Correct
function User(props) {
  return <h1>{props.name}</h1>;
}
Wrong
props.name = "New";

Why immutable?

predictable rendering
easier debugging
optimized reconciliation
7. State vs Props
Props	State
Passed from parent	Managed inside component
Immutable	Mutable
External data	Internal data
Read-only	Can update
Causes re-render	Causes re-render
Props Example
<User name="Praful" />
State Example
const [count, setCount] = useState(0);
Key Difference
Props

Component receives data.

State

Component owns data.

8. Lifecycle Simplified in Functional Components

Class components had:

componentDidMount()
componentDidUpdate()
componentWillUnmount()

Functional components use:

useEffect()
Example
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);
Lifecycle Mapping
Class Lifecycle	Hook Equivalent
componentDidMount	useEffect([], ...)
componentDidUpdate	useEffect([deps])
componentWillUnmount	cleanup function
Hands-on Tasks
1. Reusable UI Components
Button Component
function Button({ text, onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

Usage:

<Button
  text="Save"
  onClick={() => alert("Saved")}
/>
Card Component
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

Usage:

<Card title="Doctor">
  <p>Dr. Sharma</p>
</Card>
Layout Component
function Layout({ children }) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}
2. Hospital UI Component Tree
App
 ├── Navbar
 ├── Sidebar
 ├── Dashboard
 │     ├── PatientCard
 │     ├── DoctorCard
 │     ├── AppointmentList
 │     └── StatsPanel
 └── Footer
Example Hospital App
function PatientCard({ name, disease }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{disease}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <PatientCard
        name="Rahul"
        disease="Fever"
      />

      <PatientCard
        name="Aman"
        disease="Diabetes"
      />
    </div>
  );
}
3. Dynamic Props Rendering Behavior
function Greeting({ name }) {
  console.log("Rendered");

  return <h1>Hello {name}</h1>;
}

Usage:

<Greeting name="Praful" />

If prop changes:

<Greeting name="Rahul" />

React re-renders component because props changed.

Mastery Checkpoint
How React Decides When to Re-render

React re-renders a component when:

State changes
Props change
Parent re-renders
Context value changes
Important Detail

React does NOT compare deeply by default.

It mostly checks:

reference equality
primitive value changes
Example
Re-render Happens
setCount(1);

because state changed.

Re-render Does NOT Happen
user.name = "Rahul";
setUser(user);

because object reference is same.

Correct Immutable Update
setUser({
  ...user,
  name: "Rahul"
});

New object reference triggers re-render.

Advanced Rendering Optimization
React.memo

Prevents unnecessary re-renders.

const Button = React.memo(function Button(props) {
  return <button>{props.text}</button>;
});
useCallback

Memoizes functions.

const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
useMemo

Memoizes expensive calculations.

const total = useMemo(() => {
  return calculateTotal(data);
}, [data]);
Interview-Level Understanding
Why React is Fast

React optimizes performance using:

Virtual DOM
Reconciliation
Batched updates
Efficient diffing
Component memoization
Final Mental Model
State/Props Change
        ↓
Function Component Executes Again
        ↓
New Virtual DOM Generated
        ↓
Diffing/Reconciliation
        ↓
Minimal Real DOM Updates
        ↓
Browser Repaint