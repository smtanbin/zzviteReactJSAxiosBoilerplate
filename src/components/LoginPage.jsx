import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { APIContext } from "../contexts/APIProvider.jsx";

const LoginPage = () => {
  const { api } = useContext(APIContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api("POST", "/auth/login", {
        username,
        password,
      });

      if (response.error) {
        setError(response.error);
      } else if (response.payload) {
        const authToken = response.payload.token;
        Cookies.set("token", authToken, { expires: 1, secure: false });
        window.location.href = "/";
      } else {
        setError("Login failed. No response from server.");
      }
    } catch (err) {
        console.error(err)
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onKeyDown={handleKeyEnter}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          style={styles.input}
        />
      </div>
      {error && (
        <div style={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={styles.button}
        onKeyDown={handleKeyEnter}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#1B6CFF",
    marginBottom: "20px",
  },
  formGroup: {
    width: "100%",
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1B6CFF",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default LoginPage;
