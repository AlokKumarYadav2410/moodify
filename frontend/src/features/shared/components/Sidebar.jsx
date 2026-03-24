import React from "react";
import { useTheme } from "../theme.context";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaHistory,
  FaHome,
  FaMoon,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { handleLogout } = useAuth();

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/favorite", icon: <FaHeart />, label: "Favourites" },
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
            className="nav-item"
            activeClassName="active"
          >
            <span className="icon">{item.icon}</span>
            {!isCollapsed && <span className="label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
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
