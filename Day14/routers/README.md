# React Router v6


# 1. SPA vs MPA

## SPA

A Single Page Application loads a single HTML document initially and dynamically updates the UI without refreshing the entire page.

React applications are typically SPAs.

## How SPA Works


User Action
   ↓
React State Changes
   ↓
React Re-renders Components
   ↓
Browser Updates Only Changed DOM

## Characteristics of SPA

* Only one HTML page is loaded.
* Navigation happens on the client side.
* Uses JavaScript heavily.
* Faster route transitions.
* Better interactive UX.
* React Router manages navigation.

## Advantages

### Faster Navigation

After initial load, page transitions are nearly instant.

### Better User Experience

Feels like a desktop application.

### Reusable Components

React components are reused across routes.

### Efficient Rendering

Only necessary UI updates occur.

## Disadvantages

### Initial Bundle Size

Large JS bundles can slow first load.

### SEO Complexity

Requires SSR/SSG optimization.

### Client-Side Dependency

App heavily depends on JavaScript.


# MPA (Multi Page Application)

A Multi Page Application loads a completely new HTML page for every route.

Traditional websites use MPA architecture.

## How MPA Works


User Clicks Link
   ↓
Browser Sends New Request
   ↓
Server Generates New HTML
   ↓
Browser Reloads Entire Page

## Characteristics of MPA

* Multiple HTML pages.
* Full-page refresh on navigation.
* Server-side rendering focused.
* Better traditional SEO.
* Independent page architecture.

## Advantages

### Strong SEO

Search engines easily index pages.

### Smaller Initial Load

Only required page loads.

### Better for Large Content Sites

Useful for blogs, documentation, news platforms.

## Disadvantages

### Slower Navigation

Entire page reloads every time.

### Less Interactive UX

Feels less app-like.

### Repeated Asset Loading

Can reload styles/scripts repeatedly.


# SPA vs MPA Comparison

| Feature          | SPA              | MPA            |
| ---------------- | ---------------- | -------------- |
| Page Reload      | No               | Yes            |
| Speed After Load | Fast             | Slower         |
| SEO              | Harder           | Easier         |
| UX               | Smooth           | Traditional    |
| Rendering        | Client-side      | Server-side    |
| Routing          | React Router     | Server Routing |
| Best For         | Dashboards, Apps | Blogs, Portals |


# 2. React Router v6 Deep Architecture

React Router is a client-side routing library for React.

It enables navigation between components without full-page reloads.


# Core Routing Flow


URL Changes
   ↓
React Router Matches Route
   ↓
Correct Component Selected
   ↓
React Renders UI


# Main Components in React Router v6

## BrowserRouter

Provides routing context to the entire application.


<BrowserRouter>
  <App />
</BrowserRouter>

### Responsibilities

* Watches browser URL.
* Syncs UI with URL.
* Uses History API internally.


## Routes

Acts as a route container.


<Routes>
  <Route path="/" element={<Home />} />
</Routes>

### Responsibilities

* Matches best route.
* Renders matched route element.
* Handles nested matching.


## Route

Defines a route configuration.


<Route path="/about" element={<About />} />

### Important Props

| Prop     | Purpose             |
| -------- | ------------------- |
| path     | URL path            |
| element  | Component to render |
| children | Nested routes       |
| index    | Default child route |


# v6 Route Ranking System

React Router v6 automatically ranks routes.

It selects the most specific route.

## Example


<Route path="/users/:id" />
<Route path="/users/settings" />

Route `/users/settings` gets higher priority because it is more specific.


# History API Usage

React Router internally uses the browser History API.


pushState()
replaceState()
popstate events

This enables URL changes without page refresh.


# Navigation Components

## Link

Used for client-side navigation.


<Link to="/dashboard">Dashboard</Link>

### Why Link Instead of Anchor Tag?

```html
<a href="/dashboard">Reloads page</a>


<Link to="/dashboard">No reload</Link>


# useNavigate Hook

Programmatic navigation.


const navigate = useNavigate();

navigate('/dashboard');

## Common Usage

* Redirect after login
* Redirect after form submit
* Navigation based on conditions


# useLocation Hook

Access current route information.


const location = useLocation();

## Provides

| Property | Meaning          |
| -------- | ---------------- |
| pathname | Current path     |
| search   | Query string     |
| hash     | URL hash         |
| state    | Navigation state |


# 3. Nested Routes & Layout Routes

Nested routes allow UI composition based on route hierarchy.


# Why Nested Routes?

Many applications share layouts.

Example:


Dashboard
 ├── Sidebar
 ├── Navbar
 └── Content Area

Only content changes between pages.


# Layout Route Concept

A layout route renders shared UI.


<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="overview" element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>


# Outlet Component

`Outlet` renders child routes.


function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}


# Nested Routing Flow


/dashboard
   ↓
DashboardLayout Rendered
   ↓
Outlet Renders Child Route


# Benefits of Nested Routes

## Shared Layouts

Avoid duplicate UI.

## Better Organization

Routes mirror UI structure.

## Cleaner Architecture

Easy scalability.

## Performance Benefits

Partial UI updates.


# Index Routes

Default child route.


<Route index element={<DashboardHome />} />

Rendered automatically when parent route matches.


# Relative Routing

React Router v6 supports relative paths.


<Link to="settings">Settings</Link>

Automatically resolves relative to parent route.


# 4. Protected Route Implementation

Protected routes restrict access based on authentication.


# Authentication Flow


User Visits Protected Route
   ↓
Check Authentication
   ↓
If Authenticated → Render Page
Else → Redirect to Login


# Basic Protected Route


function PrivateRoute({ children }) {
  const isAuthenticated = true;

  return isAuthenticated
    ? children
    : <Navigate to="/login" />;
}


# Using Protected Route


<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>


# Navigate Component

Used for redirection.


<Navigate to="/login" replace />

## replace Prop

Prevents user from going back to previous route.


# Real Authentication Sources

Protected routes usually check:

* JWT tokens
* Session cookies
* Redux auth state
* Context API state
* Firebase auth
* OAuth providers


# Role-Based Protected Routes

Example:


if (user.role !== 'admin') {
  return <Navigate to="/unauthorized" />;
}


# Common Protected Route Problems

## Infinite Redirect Loops

Occurs when auth logic is incorrect.

## Flashing UI

Protected content briefly appears before redirect.

## Async Authentication Delay

Auth state may load after route render.


# Best Practice

Use loading states.


if (loading) return <Spinner />;


# 5. Dynamic and Optional Route Params

Route params allow dynamic URLs.


# Dynamic Params


<Route path="/products/:id" element={<Product />} />

## Example URLs


/products/1
/products/25
/products/abc


# Access Params

Using `useParams`.


const { id } = useParams();


# Dynamic Route Flow


URL → /products/10
        ↓
:id = 10
        ↓
Component Receives Param


# Multiple Params


<Route path="/users/:userId/posts/:postId" />

## Access


const { userId, postId } = useParams();


# Optional Route Params

React Router v6 does not directly support optional params using `?`.

Instead:

## Approach 1

Use multiple routes.


<Route path="/profile" element={<Profile />} />
<Route path="/profile/:username" element={<Profile />} />


# Query Parameters

Optional values are commonly handled using query strings.


/products?category=mobile

Using:


const [searchParams] = useSearchParams();


# Difference Between Params and Query

| Feature     | Route Params | Query Params     |
| ----------- | ------------ | ---------------- |
| Position    | URL path     | After ?          |
| Required    | Usually yes  | Usually optional |
| Example     | /users/10    | ?page=2          |
| Access Hook | useParams    | useSearchParams  |


# Full Architecture Example


BrowserRouter
   ↓
Routes
   ↓
Layout Route
   ↓
Protected Route
   ↓
Nested Child Routes
   ↓
Dynamic Route Params


# Real World Example


/dashboard/users/15/settings

## Breakdown

| Part       | Meaning       |
| ---------- | ------------- |
| /dashboard | Parent layout |
| /users     | Nested route  |
| /15        | Dynamic param |
| /settings  | Child page    |


# Best Practices

## Use Layout Routes

Avoid repeated UI.

## Keep Routes Organized

Separate route modules for large apps.

## Use Lazy Loading

Improve performance.


const Dashboard = lazy(() => import('./Dashboard'));

## Use Protected Wrappers

Centralize auth logic.

## Prefer Relative Routing

Improves maintainability.








Difference Between navigate() vs redirect()
Feature	navigate()	redirect()
Type	Hook Function	Router Utility
Usage Area	Components	Loaders/Actions
Trigger Time	Client-side runtime	Before render
Causes Render?	Yes	Prevents render
Common Use	Button clicks/forms	Auth redirects
navigate()

Used inside components.

const navigate = useNavigate();

navigate("/dashboard");

Example:

onClick={() => navigate("/profile")}
redirect()

Used in loaders/actions.

import { redirect } from "react-router-dom";

export async function loader() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return null;
}

Best for:

Authentication checks
Pre-render redirects
Data routers