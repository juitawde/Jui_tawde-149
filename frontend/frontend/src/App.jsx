import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";

import { getCurrentUser } from "./api";
import { LoaderCircle, HeartPulse, Menu } from "lucide-react";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
        setPage("dashboard");
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: "100vh" }}>
        <LoaderCircle className="spinner" size={40} />
        <span>Loading MediManage...</span>
      </div>
    );
  }

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  if (!user) {
    return (
      <main>
        {page === "register" ? (
          <Register
            onRegister={() => setPage("login")}
            onLoginClick={() => setPage("login")}
          />
        ) : (
          <Login
            onLogin={handleLogin}
            onRegisterClick={() => setPage("register")}
          />
        )}
      </main>
    );
  }

  return (
    <div className="app-layout">
      {/* Mobile Top Navbar */}
      <div className="mobile-navbar">
        <div className="logo" onClick={() => setPage("dashboard")} style={{ cursor: "pointer" }}>
          <div className="logo-badge" style={{ width: "30px", height: "30px" }}>
            <HeartPulse size={16} />
          </div>
          <span>MediManage</span>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileSidebarOpen(true)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar overlay backdrop for mobile */}
      <div
        className={`mobile-sidebar-overlay ${mobileSidebarOpen ? "active" : ""}`}
        onClick={() => setMobileSidebarOpen(false)}
      ></div>

      <Navbar
        user={user}
        currentPage={page}
        setPage={(p) => {
          setPage(p);
          setMobileSidebarOpen(false);
        }}
        onLogout={handleLogout}
        mobileActive={mobileSidebarOpen}
      />

      <div className="main-content-area">
        {page === "dashboard" && <Dashboard />}

        {page === "hospitals" && <Hospitals />}
      </div>
    </div>
  );
}

export default App;