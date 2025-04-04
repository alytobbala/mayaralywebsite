import React, { useState, useEffect } from "react";

const CORRECT_PASSWORD = "ilovemayoora"; // Replace with your actual password

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedAuth = localStorage.getItem("unlocked");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      localStorage.setItem("unlocked", "true");
      setIsAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>🔒 Enter Password to Continue</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#00b894",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Unlock
        </button>
      </form>
    </div>
  );
};

export default PasswordGate;
