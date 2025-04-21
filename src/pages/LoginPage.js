import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const { token, refreshToken, role } = await response.json();

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      login(token, role);
    } catch (error) {
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          style={{
            border: "none",
            background: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}
