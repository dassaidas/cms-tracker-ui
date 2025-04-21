import { useState } from "react";
import api from "../api/apiClient";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { setLoading } = useLoading();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to your email.");
    } catch {
      toast.error("Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
