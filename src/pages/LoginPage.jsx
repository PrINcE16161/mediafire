//LoginPage.jsx
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  registerPrompt: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#ccc",
  },
  registerLink: {
    color: "#007bff",
    textDecoration: "none",
    marginLeft: "4px",
  },
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${Config.API_DOMAIN}/api/auth/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      nav("/userdashboard");
    } catch (e) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <div style={styles.registerPrompt}>
          Don’t have an account?
          <Link to="/register" style={styles.registerLink}>
            Register for one now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
