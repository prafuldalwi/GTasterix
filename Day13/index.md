React Hooks Deep Theory — Effects, Memoization & Custom Hooks
1. useEffect Deep Dive

useEffect lets React run side effects after rendering.

A side effect is anything outside pure rendering:

API calls
Timers
DOM manipulation
Event listeners
LocalStorage
Subscriptions

Basic syntax:

useEffect(() => {
  // side effect
}, [dependencies]);
React Rendering Flow
Render Component
      ↓
Commit DOM Updates
      ↓
Run useEffect

Effects run after paint, not during rendering.

Dependency Array Behavior
A) No Dependency Array
useEffect(() => {
  console.log("Runs every render");
});

Runs after:

initial render
every re-render

Equivalent to:

render → effect
render → effect
render → effect

Use carefully because it may cause infinite loops.

B) Empty Dependency Array
useEffect(() => {
  console.log("Runs once");
}, []);

Runs only on mount.

Equivalent to:

Component Mounted
    ↓
Effect Runs Once

Common use:

initial API fetch
setup listeners
initialize libraries
C) Dependency Array With Values
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);

Runs when:

component mounts
count changes

React compares dependencies using:

Object.is(previous, next)

This is critical for understanding reference identity.

Why useEffect Depends on Reference Identity

Primitive values compare by value:

5 === 5 // true

Objects/functions/arrays compare by reference:

{} === {} // false

Example:

const options = { theme: "dark" };

useEffect(() => {
  console.log("Runs every render");
}, [options]);

Why?

Because every render creates a NEW object:

Render 1 → memory ref A
Render 2 → memory ref B

React sees:

A !== B

So effect re-runs.

Fixing Reference Identity Problems

Use useMemo.

const options = useMemo(() => {
  return { theme: "dark" };
}, []);

Now the reference remains stable.

Infinite Loop Example
useEffect(() => {
  setCount(count + 1);
}, [count]);

Flow:

count changes
    ↓
effect runs
    ↓
setCount()
    ↓
re-render
    ↓
count changes again

Infinite cycle.

Correct Fix

Use conditions:

useEffect(() => {
  if (count < 5) {
    setCount(count + 1);
  }
}, [count]);
Cleanup Functions

Effects may allocate resources:

event listeners
timers
subscriptions
sockets

Without cleanup → memory leaks.

Cleanup Syntax
useEffect(() => {
  const id = setInterval(() => {
    console.log("running");
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);

React lifecycle:

Mount
  ↓
Effect Runs
  ↓
Component Updates / Unmounts
  ↓
Cleanup Runs
Common Memory Leaks
Event Listener Leak

BAD:

useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

Listener never removed.

GOOD:

useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
Timer Leak

BAD:

useEffect(() => {
  setInterval(() => {
    console.log("tick");
  }, 1000);
}, []);

GOOD:

useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
2. useCallback Deep Dive

useCallback memoizes functions.

const memoizedFn = useCallback(() => {
  doSomething();
}, [deps]);

Without useCallback:

const handleClick = () => {};

Every render creates NEW function reference.

This causes:

child re-renders
effect re-triggers
performance issues
Example Problem
<Child onClick={handleClick} />

If handleClick changes every render:

Parent renders
   ↓
new function created
   ↓
Child props changed
   ↓
Child re-renders
Fix Using useCallback
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);

Now reference stays stable.

When to Use useCallback

Use ONLY when:

passing callbacks to memoized children
function used in dependencies
expensive re-renders exist

Do NOT overuse it.

Memoization itself has cost.

3. useMemo Deep Dive

useMemo memoizes computed values.

const value = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

Without memoization:

Every render
   ↓
Expensive calculation repeats

With useMemo:

Dependency unchanged
   ↓
Cached result reused
Expensive Computation Example
const sorted = useMemo(() => {
  return users.sort(sortFn);
}, [users]);

Useful for:

sorting
filtering
heavy loops
derived state
useMemo vs useCallback
useMemo    → memoizes VALUE
useCallback → memoizes FUNCTION

Equivalent:

useCallback(fn, deps)

is basically:

useMemo(() => fn, deps)
4. useRef Deep Dive

useRef stores mutable values WITHOUT re-rendering.

const ref = useRef(initialValue);

Returns:

{
  current: initialValue
}
A) DOM Access
const inputRef = useRef();

useEffect(() => {
  inputRef.current.focus();
}, []);
<input ref={inputRef} />
B) Persistent Mutable Values
const countRef = useRef(0);

Changing:

countRef.current++;

does NOT trigger render.

Useful for:

previous values
timers
caching
DOM nodes
useRef vs State
Feature	useState	useRef
Causes re-render	YES	NO
Persistent between renders	YES	YES
Mutable	NO	YES
Previous Value Pattern
function Example({ value }) {
  const prev = useRef();

  useEffect(() => {
    prev.current = value;
  });

  return (
    <div>
      Current: {value}
      Previous: {prev.current}
    </div>
  );
}
5. Custom Hooks Design Patterns

Custom hooks let you reuse logic.

Naming convention:

must start with "use"

Example:

useFetch()
useAuth()
useTheme()
Benefits
Reusable logic
Cleaner components
Separation of concerns
Testability
Maintainability
Custom Hook Example — useWindowWidth
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

Usage:

const width = useWindowWidth();






Why does useEffect depend on reference identity?

Because React compares dependency values using shallow comparison (Object.is).

For primitives:

1 === 1

works by value.

But arrays, objects, and functions are compared by memory reference:

[] === [] // false
{} === {} // false

Every render recreates object/function references unless memoized.

So React thinks dependency changed and re-runs the effect.

That’s why:

useMemo stabilizes objects/arrays
useCallback stabilizes functions
stable references prevent unnecessary effects and renders