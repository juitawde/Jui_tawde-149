import { logoutUser } from "../api";
import { HeartPulse, LogOut, Home, Building2, Database, ShieldCheck, ArrowUpRight } from "lucide-react";

function Navbar({
  user,
  currentPage,
  setPage,
  onLogout,
  mobileActive
}) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
    } catch (error) {
      alert(error.message);
    }
  };

  const getInitials = (name) => {
    if (!name) return "MM";
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <aside className={`sidebar ${mobileActive ? "active" : ""}`}>
      <div>
        <div className="sidebar-logo">
          <HeartPulse size={24} />
          <span>Carevia</span>
        </div>

        <div className="sidebar-menu">
          <span className="sidebar-label">Dashboard</span>
          
          <button
            className={`sidebar-item ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => setPage("dashboard")}
          >
            <Home size={18} />
            <span>Overview</span>
          </button>

          <button
            className={`sidebar-item ${currentPage === "hospitals" ? "active" : ""}`}
            onClick={() => setPage("hospitals")}
          >
            <Building2 size={18} />
            <span>Hospitals Registry</span>
          </button>

          <span className="sidebar-label">System Specs</span>
          
          <div className="sidebar-item" style={{ cursor: "default", opacity: 0.85 }}>
            <Database size={18} />
            <span>MongoDB Active</span>
          </div>

          <div className="sidebar-item" style={{ cursor: "default", opacity: 0.85 }}>
            <ShieldCheck size={18} />
            <span>Passport Auth</span>
          </div>

          <div className="sidebar-item" style={{ cursor: "default", opacity: 0.85 }}>
            <ArrowUpRight size={18} />
            <span>RESTful APIs</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {getInitials(user.username)}
          </div>
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{user.username}</span>
            <span className="sidebar-profile-role">Administrator</span>
          </div>
        </div>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Navbar;