import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import logger from "../utils/logger";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [allowedPaths, setAllowedPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMenus = useCallback(async () => {
    const extractPaths = (menus) => {
      let paths = [];
      for (const menu of menus) {
        if (menu.path) paths.push(menu.path);
        if (menu.children?.length > 0) {
          paths = paths.concat(extractPaths(menu.children));
        }
      }
      return paths;
    };

    try {
      const res = await api.get("/menus");
      const paths = extractPaths(res.data);
      logger.info("Allowed paths loaded", paths);
      setAllowedPaths(paths);
    } catch (error) {
      logger.error("Failed to fetch menus:", error?.response || error);
      setAllowedPaths([]); // fallback to prevent crash
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");

      if (token && userRole) {
        setIsAuthenticated(true);
        setRole(userRole);
        await fetchMenus();
      }

      setLoading(false);
    };

    init();
  }, [fetchMenus]);

  const login = async (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);

    try {
      await fetchMenus(); //  ensure menus are ready
      navigate("/my-profile");
    } catch (err) {
      logger.error("Login fetchMenus failed:", err);
      setAllowedPaths([]); // fallback
      navigate("/unauthorized");
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token && token.includes(".")) {
        await api.post("/auth/logout", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      logger.error("Logout error:", error?.response || error);
    } finally {
      localStorage.clear();
      setIsAuthenticated(false);
      setRole(null);
      setAllowedPaths([]);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout, loading, allowedPaths }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
