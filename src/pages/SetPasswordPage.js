import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { toast } from "react-toastify";
import { useLoading } from "../context/LoadingContext";

export default function SetPasswordPage() {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/auth/set-password", { password: form.password, token });
      toast.success("Password set successfully!");
      navigate("/login");
    } catch {
      toast.error("Failed to set password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )}

        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
        />
        {errors.confirm && <div style={{ color: "red" }}>{errors.confirm}</div>}

        <button type="submit">Set Password</button>
      </form>
    </div>
  );
}
