import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "aos/dist/aos.css";
import AOS from "aos";
import './index.css';


// Initialize AOS globally
AOS.init({
  duration: 800,
  once: true,
  easing: "ease-in-out",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
