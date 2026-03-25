import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaHistory,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTheme } from "../theme.context";
import { useAuth } from "../../auth/hooks/useAuth";
import "./Sidebar.scss";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { theme, themeToggle } = useTheme();
  const { user, handleLogout } = useAuth();

  const greet = [
    "Good Morning",
    "Good Afternoon",
    "Good Evening",
    "Good Night",
  ];

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/favorites", icon: <FaHeart />, label: "Favourites" },
    { path: "/history", icon: <FaHistory />, label: "History" },
  ];

  return (
    <aside
      className={`sidebar glass-morphism ${isCollapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎧</span>
          {!isCollapsed && <span className="logo-text">Moodify</span>}
        </div>
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            {!isCollapsed && <span className="label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <h1>
        {isCollapsed ? (
          <span className="user-name">{user?.username || "User"}</span>
        ) : (
          <div>
            {greet[Math.floor(new Date().getHours() / 6)]},{" "}
            <span className="user-name">{user?.username || "User"}</span>
          </div>
        )}
      </h1>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={themeToggle}>
          <span className="icon">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </span>
          {!isCollapsed && (
            <span className="label">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          {!isCollapsed && <span className="label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
