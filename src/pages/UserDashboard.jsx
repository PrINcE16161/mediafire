//UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../config";

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    justifyItems: "center",
    gap: "2rem",
  },
  card: {
    position: "relative",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    width: "250px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.8rem",
  },
  previewContainer: {
    width: "100%",
    height: "160px",
    backgroundColor: "#333",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  previewIcon: {
    fontSize: "2rem",
  },
  filenameWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  filename: {
    fontWeight: "bold",
    fontSize: "0.85rem",
    wordBreak: "break-word",
    flex: 1,
    paddingRight: "0.5rem",
  },
  menuButton: {
    background: "transparent",
    border: "none",
    color: "#ccc",
    fontSize: "1.4rem",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "50%",
    transition: "background 0.2s ease",
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  menuButtonHover: {
    background: "#2a2a2a",
  },
  menuDropdown: {
    position: "absolute",
    top: "35px",
    right: "10px",
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    animation: "fadeIn 0.2s ease-in-out",
  },
  menuItem: {
    padding: "10px 16px",
    color: "#eee",
    fontSize: "0.9rem",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.2s ease",
  },
  menuItemHover: {
    backgroundColor: "#333",
  },
  details: {
    fontSize: "0.75rem",
    color: "#aaa",
    marginTop: "0.3rem",
  },
  
};

const UserDashboard = () => {
  const [files, setFiles] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Config.API_DOMAIN}/api/user/files`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFiles(res.data.mediaFiles))
      .catch(() => alert("Unauthorized"));
  }, []);

  const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

  const handleCopyLink = (id) => {
    const link = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleView = (id) => window.open(`/view/${id}`, "_blank");
  const handleDownload = (id) =>
    window.open(`${Config.API_DOMAIN}/api/file/${id}`, "_blank");

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Uploaded Files</h2>

      {files.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", fontSize: "1rem" }}>
          No uploaded files found.
        </p>
      ) : (
        <div style={styles.grid}>
          {files.map((f) => (
            <div key={f._id} style={styles.card}>
              <div style={styles.previewContainer}>
                {isImage(f.filename) ? (
                  <img
                    src={`${Config.API_DOMAIN}/uploads/${f.path}`}
                    alt={f.filename}
                    style={styles.previewImage}
                  />
                ) : (
                  <div style={styles.previewIcon}>📄</div>
                )}
              </div>
              <div style={styles.filenameWrapper}>
                <div style={styles.filename}>{f.filename}</div>
                <button
                  style={styles.menuButton}
                  onClick={() =>
                    setOpenMenuId(openMenuId === f._id ? null : f._id)
                  }
                >
                  ⋮
                </button>
                {openMenuId === f._id && (
                  <div style={styles.menuDropdown}>
                    <div
                      style={styles.menuItem}
                      onClick={() => handleView(f._id)}
                    >
                      View
                    </div>
                    <div
                      style={styles.menuItem}
                      onClick={() => handleDownload(f._id)}
                    >
                      Download
                    </div>
                    <div
                      style={{ ...styles.menuItem, borderBottom: "none" }}
                      onClick={() => handleCopyLink(f._id)}
                    >
                      Share
                    </div>
                  </div>
                )}
              </div>
              <div style={styles.details}>
                {(f.filesize / 1024).toFixed(2)} KB • {f.visitcount} downloads
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
