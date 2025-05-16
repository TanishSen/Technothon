import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initScrollAnimationFallback } from "./utils/scrollAnimationFallback.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize fallback animations for browsers that don't support CSS scroll-driven animations
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimationFallback();
});
