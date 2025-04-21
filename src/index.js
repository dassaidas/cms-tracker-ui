import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
