import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import "./AuthForm.scss";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      toast.error("Please fill all the fields");
      return;
    }
    const { success, message } = await handleLogin(formData);
    if (success) {
      toast.success(message);
      navigate("/");
    } else {
      toast.error(message);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card glass-morphism">
        <div className="auth-header">
          <h1 className="project-name">Moodify</h1>
          <p className="subtitle">Welcome back! Ready for some music?</p>
          <h2 className="title">Login</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"} <FaArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
