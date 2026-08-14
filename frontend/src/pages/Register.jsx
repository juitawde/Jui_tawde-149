import { useState } from "react";
import { registerUser } from "../api";
import { UserRound, Mail, Lock, HeartPulse } from "lucide-react";

function Register({
  onRegister,
  onLoginClick
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert(
        "Registration successful! Please login."
      );

      onRegister();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-visual-side">
        <div className="auth-brand">
          <div className="auth-brand-badge">
            <HeartPulse size={20} />
          </div>
          <span>Carevia</span>
        </div>

        <div className="auth-visual-content">
          <h2>Smarter hospital management, beautifully organized.</h2>
          <p>
            Securely manage hospitals, bed availability and healthcare records from one place.
          </p>
        </div>

        <div style={{ color: "#ebebebff", fontSize: "12.5px" }}>
          &copy; {new Date().getFullYear()} Carevia. All rights reserved.
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card-wrapper">
          <h1>Create your account</h1>
          <p>Start managing hospital information with Carevia.</p>

          <form onSubmit={handleSubmit} className="form-layout">
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <UserRound size={16} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose username"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={16} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
            >
              Register
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button onClick={onLoginClick}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;