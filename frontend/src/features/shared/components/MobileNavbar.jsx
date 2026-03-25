import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHeart,
  FaHistory,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTheme } from "../theme.context";
import { useAuth } from "../../auth/hooks/useAuth";
import "./MobileNavbar.scss";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, themeToggle } = useTheme();
  const { handleLogout } = useAuth();

  const menuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/favorites", icon: <FaHeart />, label: "Favourites" },
    { path: "/history", icon: <FaHistory />, label: "History" },
  ];

  return (
    <nav className="mobile-navbar glass-morphism">
      <div className="nav-header">
        <span className="logo">Moodify</span>
        <div className="nav-actions">
          <button onClick={themeToggle} className="icon-btn">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="icon-btn">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`nav-menu ${isOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
        <button className="menu-item logout" onClick={handleLogout}>
          <span className="icon">
            <FaSignOutAlt />
          </span>
          <span className="label">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
