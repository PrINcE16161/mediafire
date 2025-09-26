import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Config } from "../config";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212",
  },
  card: {
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    color: "white",
    width: "350px",
    textAlign: "center",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    width: "100%",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  loginPrompt: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
    marginLeft: "4px",
  },
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${Config.API_DOMAIN}/api/auth/register`, { username, password });
      nav("/login");
    } catch (e) {
      setError("Registration failed. Try a different username.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        {error && <div style={styles.error}>{error}</div>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <input
          type="password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          placeholder="Retype Password"
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
        <div style={styles.loginPrompt}>
          Already have an account?
          <Link to="/login" style={styles.loginLink}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
