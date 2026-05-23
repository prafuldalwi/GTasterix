import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <h2>React Router v6</h2>

          <div className="nav-links">
            <Link className="link" to="/">
              Home
            </Link>

            <Link className="link" to="/about">
              About
            </Link>

            <Link className="link" to="/dashboard">
              Dashboard
            </Link>

            {!isAuthenticated ? (
              <button
                className="button"
                onClick={() => setIsAuthenticated(true)}
              >
                Login
              </button>
            ) : (
              <button
                className="button"
                onClick={() => setIsAuthenticated(false)}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Login */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/*

PRIVATE ROUTE

*/

function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/*

PAGES

*/

function Home() {
  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>Public route accessible to everyone.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About Page</h1>
      <p>This is another public route.</p>
    </div>
  );
}

function Login({ setIsAuthenticated }) {
  return (
    <div className="page">
      <h1>Login Page</h1>

      <p>You must login to access dashboard routes.</p>

      <button
        className="button"
        onClick={() => setIsAuthenticated(true)}
      >
        Login
      </button>
    </div>
  );
}

/*

DASHBOARD LAYOUT

*/

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Dashboard</h3>

        <Link className="sidebar-link" to="/dashboard">
          Overview
        </Link>

        <Link className="sidebar-link" to="/dashboard/analytics">
          Analytics
        </Link>

        <Link className="sidebar-link" to="/dashboard/settings">
          Settings
        </Link>
      </aside>

      {/* Nested Route Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

/*

NESTED PAGES

*/

function Overview() {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <p>This is the default nested route.</p>
    </div>
  );
}

function Analytics() {
  return (
    <div>
      <h2>Analytics Page</h2>
      <p>Analytics nested route rendered via Outlet.</p>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2>Settings Page</h2>
      <p>Settings nested route rendered via Outlet.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}