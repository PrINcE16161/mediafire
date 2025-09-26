import React, { useEffect, useState } from "react";
import { Config } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const headerStyles = {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#333",
    color: "white",
    zIndex: 1000,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white !important",
    textDecoration: "none !important",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  userText: {
    marginRight: "10px",
    color: "#ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    marginLeft: "8px",
    cursor: "pointer",
  },
};

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.username);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.container}>
        <div style={headerStyles.logo}>
          <Link to="/" style={headerStyles.navLink}>
            {Config.APP_NAME}
          </Link>
        </div>
        <nav>
          <Link style={headerStyles.navLink} to="/">Home</Link>
          <Link style={headerStyles.navLink} to="/upload">Upload</Link>
          <Link style={headerStyles.navLink} to="/about">About Us</Link>
        </nav>
        <div style={headerStyles.userSection}>
          {user ? (
            <>
              <span style={headerStyles.userText}>Hey! {user}</span>
              <Link to="/userdashboard" style={headerStyles.button}>Dashboard</Link>
              <button style={headerStyles.button} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={headerStyles.button}>Login</Link>
              <Link to="/register" style={headerStyles.button}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
