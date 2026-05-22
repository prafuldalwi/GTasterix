import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";


// 1. CUSTOM HOOK: useFetch


function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const result = await response.json();

        if (!ignore) {
          setData(result);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
      console.log("Cleanup useFetch");
    };
  }, [url]);

  return { data, loading, error };
}


// 2. MEMOIZED CHILD COMPONENT


const ChildButton = memo(({ onClick }) => {
  console.log("Child Component Rendered");

  return (
    <button style={styles.button} onClick={onClick}>
      Memoized Child Button
    </button>
  );
});


// 3. MAIN APP COMPONENT


export default function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  
  // FETCH USERS USING CUSTOM HOOK
  

  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  
  // OPTIMIZE RERENDERS USING useCallback
  

  const handleChildClick = useCallback(() => {
    alert("Child button clicked");
  }, []);

  
  // OPTIMIZE FILTERING USING useMemo
  

  const filteredUsers = useMemo(() => {
    console.log("Filtering Users...");

    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  
  // DEBUG INFINITE LOOP IN useEffect
  

  useEffect(() => {
    console.log("Count Changed:", count);

    // SAFE CONDITION TO PREVENT INFINITE LOOP
    if (count > 5) {
      console.log("Count exceeded limit");
    }
  }, [count]);

  
  // UI
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>React Hooks Tasks</h1>

      {/* useFetch */}
      <div style={styles.card}>
        <h2>1. Custom Hook - useFetch</h2>

        {loading && <p>Loading users...</p>}

        {error && <p style={styles.error}>{error}</p>}

        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      {/* useMemo */}
      <div style={styles.card}>
        <h2>2. useMemo Optimization</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* useCallback */}
      <div style={styles.card}>
        <h2>3. useCallback + React.memo</h2>

        <button
          style={styles.button}
          onClick={() => setCount((prev) => prev + 1)}
        >
          Count: {count}
        </button>

        <ChildButton onClick={handleChildClick} />
      </div>

      {/* Infinite Loop Explanation */}
      <div style={styles.card}>
        <h2>4. Infinite Loop Debug</h2>

        <p>
          Avoid updating state directly inside useEffect without conditions.
        </p>

        <pre style={styles.code}>
{`// BAD
useEffect(() => {
  setCount(count + 1);
}, [count]);

// Causes infinite loop`}
        </pre>

        <pre style={styles.code}>
{`// GOOD
useEffect(() => {
  if(count < 5){
    setCount(prev => prev + 1);
  }
}, [count]);`}
        </pre>
      </div>
    </div>
  );
}


// STYLES


const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f4f4",
    padding: "30px",
    fontFamily: "Arial",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
  },

  error: {
    color: "red",
  },

  code: {
    background: "#111",
    color: "#0f0",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "10px",
    overflowX: "auto",
  },
};