import { useState } from "react";
import { loginUser } from "../api";
import { UserRound, Lock, HeartPulse } from "lucide-react";

function Login({
  onLogin,
  onRegisterClick
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        username,
        password
      });

      onLogin(data.user);
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

        <div style={{ color: "#ebebebff ", fontSize: "12.5px" }}>
          &copy; {new Date().getFullYear()} Carevia. All rights reserved.
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card-wrapper">
          <h1>Welcome back</h1>
          <p>Sign in to your Carevia account.</p>

          <form onSubmit={handleSubmit} className="form-layout">
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <UserRound size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
            >
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <button onClick={onRegisterClick}>
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;