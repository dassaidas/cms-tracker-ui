import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logger from "../utils/logger";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, allowedPaths, loading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const accessAllowed = allowedPaths.includes(currentPath);

  logger.info("Route Check", {
    path: currentPath,
    isAuthenticated,
    accessAllowed,
    allowedPaths,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!accessAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
