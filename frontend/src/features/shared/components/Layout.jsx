import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Layout.scss";
import MobileNavbar from "./MobileNavbar";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <MobileNavbar />
      <main
        className={`content scroll-container ${isCollapsed ? "expanded" : ""}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
