import React, { useState } from "react";

export default function App() {
  // Multi-field Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Dynamic Validation
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (form.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Email Validation
    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Age Validation
    if (!form.age || form.age < 18) {
      newErrors.age = "Age must be 18 or above";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form Submitted Successfully!");

      console.log(form);

      // Reset Form
      setForm({
        name: "",
        email: "",
        password: "",
        age: "",
      });

      setErrors({});
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>React Controlled Form</h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            {errors.name && (
              <p style={styles.error}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            {errors.email && (
              <p style={styles.error}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />

            {errors.password && (
              <p style={styles.error}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Age */}
          <div style={styles.inputGroup}>
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={form.age}
              onChange={handleChange}
              style={styles.input}
            />

            {errors.age && (
              <p style={styles.error}>
                {errors.age}
              </p>
            )}
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>

        {/* Live Form State */}
        <div style={styles.preview}>
          <h3>Live Form State</h3>

          <pre>
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  inputGroup: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },

  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },

  preview: {
    marginTop: "20px",
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
  },
};