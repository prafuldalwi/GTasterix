React Global State Management — Deep Theory
1. Context API — Provider & Consumer

React Context API is a built-in mechanism for sharing data globally across components without manually passing props at every level.

It solves the problem of deeply nested prop passing.

Why Context API Exists

In large applications, many components need access to shared data such as:

User authentication
Theme settings
Language preferences
Notifications
Cart state

Without Context, props must travel through many intermediate components.

This is called prop drilling.

Basic Flow of Context API
Create Context
      ↓
Wrap App with Provider
      ↓
Provide Shared Value
      ↓
Consume Value Anywhere
Creating Context
import { createContext } from "react";

export const UserContext = createContext();

createContext() creates a global communication channel.

Provider Component

The Provider makes data available to child components.

<UserContext.Provider value={{ user }}>
  <App />
</UserContext.Provider>
Important Concepts
Concept	Explanation
Provider	Supplies shared state
value prop	Data being shared
Children	Components that can access data
Consuming Context
Using useContext Hook
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  return <h1>{user.name}</h1>;
}
Old Consumer Pattern

Before hooks, React used Consumer components.

<UserContext.Consumer>
  {(value) => <h1>{value.user.name}</h1>}
</UserContext.Consumer>

Now useContext() is preferred.

2. Prop Drilling Problem & Solution
What is Prop Drilling?

Prop drilling happens when props are passed through multiple components that do not actually use the data.

Example
App
 ↓
Dashboard
 ↓
Sidebar
 ↓
Profile

Suppose only Profile needs user data.

Without Context:

<App user={user} />

Then:

<Dashboard user={user} />
<Sidebar user={user} />
<Profile user={user} />

Intermediate components unnecessarily receive props.

Problems with Prop Drilling
Problem	Explanation
Hard to maintain	Too many prop chains
Poor readability	Components become cluttered
Tight coupling	Components depend on unrelated props
Difficult scaling	Bigger apps become messy
Context API as Solution

Instead of passing props manually:

<UserProvider>
  <App />
</UserProvider>

Any nested component can directly access state:

const user = useContext(UserContext);
3. React Reducer Pattern

Reducers provide predictable state management.

React’s reducer pattern is inspired by Redux.

Why Reducers?

useState() becomes difficult when:

State is complex
Multiple state transitions exist
Many components modify the same state

Reducers centralize update logic.

Reducer Architecture
User Action
    ↓
dispatch(action)
    ↓
Reducer Function
    ↓
New State Returned
    ↓
UI Re-render
Basic Reducer Syntax
const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    default:
      return state;
  }
}
Using useReducer
const [state, dispatch] = useReducer(reducer, initialState);
Dispatching Actions
dispatch({ type: "increment" });
Reducer Advantages
Advantage	Explanation
Predictable	State changes happen in one place
Easier debugging	Centralized logic
Better scalability	Complex logic becomes manageable
Cleaner components	UI separated from logic
4. Global State Design

Global state should contain only data shared across many components.

What Belongs in Global State?

Good candidates:

Authenticated user
Theme
Cart items
Notifications
API cache
Language settings
What Should NOT Be Global?

Avoid globalizing local UI state:

Modal open/close
Input field value
Hover states
Local toggles

Keep local state local.

Good Global State Architecture
Global State
 ├── Auth
 ├── Theme
 ├── Cart
 ├── Notifications
 └── Settings
State Normalization

Avoid deeply nested state.

Bad:

state.user.profile.settings.theme.dark

Better:

state.theme.darkMode
Single Responsibility Principle

Each context should manage one concern.

Good:

AuthContext
ThemeContext
CartContext

Bad:

AppMegaContext

Large monolithic contexts cause unnecessary re-renders.

5. Combining Context + Reducer for Scalability

This is one of the most powerful React architecture patterns.

Why Combine Them?
Context	Reducer
Shares state globally	Manages complex logic
Avoids prop drilling	Predictable updates

Together they create scalable state systems.

Architecture Flow
Context Provider
      ↓
useReducer()
      ↓
Global State + dispatch
      ↓
Components consume state
      ↓
Components dispatch actions
Full Example Structure
src/
 ├── context/
 │    ├── AuthContext.js
 │    ├── authReducer.js
 │
 ├── components/
 │    ├── Navbar.jsx
 │    ├── Profile.jsx
Reducer File
export const initialState = {
  user: null
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };

    case "LOGOUT":
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}
Context Provider
import { createContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  return (
    <AuthContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}
Consuming State
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { state, dispatch } =
    useContext(AuthContext);

  return (
    <div>
      <h1>{state.user?.name}</h1>

      <button
        onClick={() =>
          dispatch({ type: "LOGOUT" })
        }
      >
        Logout
      </button>
    </div>
  );
}
Benefits of Context + Reducer
Benefit	Explanation
Centralized state	Easy maintenance
Predictable updates	Reducer controls mutations
Avoids prop drilling	Context distributes state
Scalable	Easy to split contexts
Cleaner components	UI separated from business logic
Common Scalability Strategies
Split Contexts by Domain
AuthContext
CartContext
ThemeContext

Prevents unnecessary re-renders.

Separate State & Dispatch Contexts

Optimization pattern:

StateContext
DispatchContext

Components using only dispatch won’t re-render on state updates.

Memoize Expensive Values
const value = useMemo(() => ({
  state,
  dispatch
}), [state]);

Improves performance.

Context vs Redux
Feature	Context + Reducer	Redux
Built into React	Yes	No
Boilerplate	Low	Medium
DevTools	Limited	Excellent
Middleware	Manual	Powerful
Best For	Medium apps	Large enterprise apps
Best Practices
Keep Reducers Pure

Reducers should:

Never mutate state
Never call APIs
Never use timers
Always return new state

Correct:

return {
  ...state,
  count: state.count + 1
};

Wrong:

state.count++;
return state;
Use Action Constants
const LOGIN = "LOGIN";

Prevents typos.

Avoid Overusing Context

Too many global updates can hurt performance.

Use:

Local state for local UI
Context for shared data
Redux/Zustand for huge apps
Mental Model
Context = Distribution System
Reducer = State Manager
useReducer = Brain
Context Provider = Global Access Point
dispatch() = Sends Instructions
Final Architecture Summary
User Action
    ↓
dispatch(action)
    ↓
Reducer Updates State
    ↓
Context Shares Updated State
    ↓
Components Re-render
Mastery Checkpoints

■ Explain why prop drilling is problematic.
■ When should useReducer be preferred over useState?
■ Why should reducers remain pure functions?
■ How does Context help global state management?
■ Why split contexts into domains?
■ Difference between Context API and Redux?