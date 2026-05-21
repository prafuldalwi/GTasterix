    # React State Management

# 1. useState Deep Dive

`useState` is React’s built-in hook for storing component state.


const [count, setCount] = useState(0);

- `count` → current state value
- `setCount` → function to update state

---

# How React State Updates Work

React does not immediately change the state value.

Instead:

1. State update is scheduled
2. React batches updates
3. Component re-renders
4. New UI is generated

---

# Batching Updates

React groups multiple state updates together for performance.

Example:


const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

Expected?


3

Actual?


1

Because all updates use the SAME stale value of `count`.

---

# Functional Updates Fix This


setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);

Now result becomes:


3

Why?

Each update receives the latest state value.

---

# React Update Queue

React internally queues updates:


prev = 0
1st update → 1
2nd update → 2
3rd update → 3

---

# Why State Updates Are Async

React delays updates to:

- optimize rendering
- prevent unnecessary DOM changes
- improve performance

---

# 2. State Immutability

React state should NEVER be mutated directly.

BAD:


const [user, setUser] = useState({
  name: "John",
});

user.name = "Mike";
setUser(user);

Why this breaks UI:

React compares references.


Old object === New object

React thinks nothing changed.

---

# Correct Immutable Update

GOOD:


setUser({
  ...user,
  name: "Mike",
});

Now reference changes:


Old object !== New object

React re-renders correctly.

---

# Arrays Must Also Be Immutable

BAD:


items.push("New");
setItems(items);

GOOD:


setItems([...items, "New"]);

---

# Mutation Problems

Mutation can cause:

- UI not updating
- stale data
- unpredictable bugs
- broken memoization
- rendering issues

---

# 3. Controlled vs Uncontrolled Inputs

# Controlled Inputs

React controls input state.


const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

Advantages:

- instant validation
- dynamic UI
- easier debugging
- predictable behavior

---

# Uncontrolled Inputs

DOM controls input state.


<input ref={inputRef} />

Value accessed using refs.

Example:


inputRef.current.value

---

# Comparison

| Controlled | Uncontrolled |
|---|---|
| React manages state | DOM manages state |
| Easier validation | Simpler |
| More renders | Fewer renders |
| Preferred in React | Useful for simple forms |

---

# 4. React Rendering Lifecycle

# Initial Render


Component mounts
↓
JSX generated
↓
Virtual DOM created
↓
DOM updated

---

# Re-render

Occurs when:

- state changes
- props change
- parent re-renders

Flow:


State Update
↓
React creates new Virtual DOM
↓
Diffing/Reconciliation
↓
Only changed parts update

---

# Example


function App() {
  const [count, setCount] = useState(0);

  console.log("Rendered");

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

Every click:


Rendered

Component function executes again.

---

# React Reconciliation

React compares:


Old Virtual DOM
VS
New Virtual DOM

Only minimal DOM changes occur.

This makes React fast.

---

# 5. Common State Mistakes

# Mistake 1 — Mutating State

BAD:


user.name = "Sam";
setUser(user);

FIX:


setUser({ ...user, name: "Sam" });

---

# Mistake 2 — Using Old State

BAD:


setCount(count + 1);
setCount(count + 1);

FIX:


setCount(prev => prev + 1);

---

# Mistake 3 — Too Many States

BAD:


const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");

BETTER:


const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
});

---

# Mistake 4 — Directly Updating Nested Objects

BAD:


form.address.city = "Delhi";

FIX:


setForm({
  ...form,
  address: {
    ...form.address,
    city: "Delhi",
  },
});

---

# Task 1 — Controlled Form


import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <h2>{name}</h2>
    </div>
  );
}

---

# Task 2 — Multi-field Form State


import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}

---

# Hands-on Task 3 — Dynamic Form Validation


import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password too short";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("Form Submitted");
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <p>{errors.email}</p>

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <p>{errors.password}</p>

      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

---


# Why does updating state in loops behave differently?

Example:


for (let i = 0; i < 5; i++) {
  setCount(count + 1);
}

Result:


1

NOT `5`.

Because:

- each iteration captures the SAME stale value
- React batches updates
- updates execute later

Correct approach:


for (let i = 0; i < 5; i++) {
  setCount(prev => prev + 1);
}

Now output becomes: 5
Because each update uses the latest queued state.

