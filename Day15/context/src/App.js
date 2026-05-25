import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from "react";

/* AUTH REDUCER */

const initialState = {
  user: null,
  isAuthenticated: false
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}

/* AUTH CONTEXT */

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  /* 
  RESTORE USER SESSION

  */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(storedUser)
      });
    }
  }, []);

  /* 
  LOGIN FUNCTION

  */

  const login = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    dispatch({
      type: "LOGIN",
      payload: userData
    });
  };

  /* 
  LOGOUT FUNCTION

  */

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated:
          state.isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* CUSTOM HOOK */

function useAuth() {
  return useContext(AuthContext);
}

/* LOGIN COMPONENT */

function Login() {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      name,
      email
    };

    login(userData);

    setName("");
    setEmail("");
  };

  return (
    <div style={styles.card}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={styles.input}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={styles.input}
      />

      <button
        onClick={handleLogin}
        style={styles.button}
      >
        Login
      </button>
    </div>
  );
}

/* DASHBOARD COMPONENT */

function Dashboard() {
  const {
    user,
    logout
  } = useAuth();

  return (
    <div style={styles.card}>
      <h2>Dashboard</h2>

      <h3>Welcome, {user.name}</h3>

      <p>Email: {user.email}</p>

      <button
        onClick={logout}
        style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
}

/* NAVBAR COMPONENT */

function Navbar() {
  const { isAuthenticated } =
    useAuth();

  return (
    <div style={styles.navbar}>
      <h1>AuthContext App</h1>

      <p>
        Status:
        {" "}
        {isAuthenticated
          ? " Logged In"
          : " Logged Out"}
      </p>
    </div>
  );
}

/* MAIN APP */

function AppContent() {
  const { isAuthenticated } =
    useAuth();

  return (
    <div style={styles.container}>
      <Navbar />

      {isAuthenticated
        ? <Dashboard />
        : <Login />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

/* INLINE STYLES */

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "40px",
    fontFamily: "Arial"
  },

  navbar: {
    background: "#222",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "400px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  logoutButton: {
    width: "100%",
    padding: "10px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};