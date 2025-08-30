import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for redirect
import { useAuth } from "../useAuth"; // <-- import your auth context
import "../css/LoginPage.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth(); // grab login function from context
  const navigate = useNavigate(); // for redirect after login
  const [error, setError] = useState(null); // show error if login fails

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard"); // or wherever you want to go after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Log in to access your habits</p>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
