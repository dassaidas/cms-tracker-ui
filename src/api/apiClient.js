import axios from "axios";
import { isTokenExpired } from "../utils/isTokenExpired";
import logger from "../utils/logger";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

//  Request Interceptor: Add valid token only
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  //  Clear session if expired
  if (token && isTokenExpired(token)) {
    localStorage.clear();
    window.location.href = "/login";
    return Promise.reject(new Error("Session expired"));
  }

  // Send only well-formed token (must contain 2 dots)
  const isValidJwtFormat =
    token && token.includes(".") && token.split(".").length === 3;
  if (isValidJwtFormat) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  Response Interceptor: Handle 401 + refresh token flow
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`,
          { refreshToken: localStorage.getItem("refreshToken") }
        );

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        // Store new tokens
        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Only retry request if token is valid
        const isValid =
          newToken &&
          newToken.includes(".") &&
          newToken.split(".").length === 3;
        if (isValid) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } else {
          localStorage.clear();
          window.location.href = "/login";
        }
      } catch (refreshError) {
        logger.error("refreshError:", error?.response || error);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Exported wrapper for all HTTP methods
const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
};

export default api;
