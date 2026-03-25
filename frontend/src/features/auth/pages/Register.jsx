import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import Loader from "../../shared/components/Loader";
import "./AuthForm.scss";
import { toast } from "react-toastify";

const Register = () => {
  const initialState = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    const { success, message } = await handleRegister(formData);
    if (success) {
      toast.success(message);
      navigate("/");
    } else {
      toast.error(message);
    }
  };

  return (
    <main className="auth-page">
      {loading && <Loader text="Loading..." />}
      <div className="auth-card glass-morphism">
        <div className="auth-header">
          <h1 className="project-name">Moodify</h1>
          <p className="subtitle">Join us and let your mood drive the music</p>
          <h2 className="title">Create Account</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
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
            {loading ? "Creating..." : "Register"} <FaArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
