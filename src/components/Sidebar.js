import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import logger from "../utils/logger";
import {
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaFile,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaUserFriends,
  FaDatabase,
  FaTasks,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaIdCard,
  FaKey,
  FaUser,
  FaProjectDiagram,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import "./Sidebar.css";

const iconMap = {
  FaUsers,
  FaBuilding,
  FaUserTie,
  FaFile,
  FaBriefcase,
  FaChartLine,
  FaFileAlt,
  FaUserFriends,
  FaDatabase,
  FaTasks,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaIdCard,
  FaKey,
  FaUser,
  FaProjectDiagram,
};

export default function Sidebar({ isOpen, isMobile, onToggle }) {
  const [menus, setMenus] = useState([]);
  const [expandedMenuIds, setExpandedMenuIds] = useState([]);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const { logout, role } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await apiClient.get("/menus");
        setMenus(res.data || []);
      } catch (err) {
        logger.error("refreshError:", err?.response || err);
      } finally {
        setLoadingMenus(false);
      }
    };
    fetchMenus();
  }, []);

  const toggleMenu = (id) => {
    setExpandedMenuIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const renderMenu = (menu) => {
    const IconComponent = iconMap[menu.icon] || FaFileAlt;
    const isExpanded = expandedMenuIds.includes(menu.id);
    const hasChildren = menu.children?.length > 0;

    const isChildActive = menu.children?.some(
      (child) => location.pathname === child.path
    );

    return (
      <div
        key={menu.id}
        className={`menu-item ${isChildActive ? "active-parent" : ""}`}
      >
        {hasChildren ? (
          <div
            className={`menu-link ${isExpanded ? "expanded" : ""} ${
              isChildActive ? "active" : ""
            }`}
            onClick={() => toggleMenu(menu.id)}
          >
            <IconComponent className="menu-icon" />
            <span>{menu.name}</span>
            <span
              className={`arrow-icon ${isExpanded ? "rotated" : ""}`}
              style={{ marginLeft: "auto" }}
            >
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </div>
        ) : (
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              `menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => isMobile && onToggle()}
          >
            <IconComponent className="menu-icon" />
            <span>{menu.name}</span>
          </NavLink>
        )}

        {hasChildren && (
          <div
            className={`submenu-wrapper ${isExpanded ? "open" : ""}`}
            style={{ maxHeight: isExpanded ? "500px" : "0" }}
          >
            <div className="submenu">
              {menu.children.map((child) => renderMenu(child))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <span>CMS</span>
        {isMobile && (
          <button className="close-btn" onClick={onToggle}>
            ×
          </button>
        )}
      </div>

      <div className="sidebar-role-badge">
        <span className="badge">{role}</span>
      </div>

      <div className="sidebar-content">
        {loadingMenus ? (
          <div className="sidebar-loading">
            <RotatingLines
              strokeColor="gray"
              strokeWidth="4"
              animationDuration="0.75"
              width="32"
              visible={true}
            />
          </div>
        ) : (
          menus.map(renderMenu)
        )}
      </div>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
    </aside>
  );
}
