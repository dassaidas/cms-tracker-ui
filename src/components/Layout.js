// src/components/Layout.js
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Always open on desktop
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <div className="topbar">
          <button className="hamburger" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
      )}

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onToggle={toggleSidebar}
        />
        <main
          style={{
            flexGrow: 1,
            padding: "20px",
            marginLeft: !isMobile ? "220px" : "0",
            transition: "margin-left 0.3s",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
