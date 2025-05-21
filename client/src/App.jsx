import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./components/About";
import Principles from "./components/Principles";
import FirmFamily from "./components/FirmFamily";
import Lines from "./components/Lines";
import Eboard from "./components/Eboard";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

import AdminDashboard from "./pages/AdminDashboard";
import AdminHomeEditor from "./pages/AdminHomeEditor";
import AdminAboutPanel from "./pages/AdminAboutPanel";
import AdminPrinciplesPanel from "./pages/AdminPrinciplesPanel";
import AdminFirmFamilyPanel from "./pages/AdminFirmFamilyPanel";
import AdminEboardPanel from "./pages/AdminEboardPanel";
import AdminLinesPanel from "./pages/AdminLinesPanel";
import AdminGalleryPanel from "./pages/AdminGalleryPanel";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* 🌊 Stretched Haikei Background */}
      <div className="absolute top-0 left-0 w-full h-[300vh] -z-10 pointer-events-none overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
        >
          <path
            fill="#a78bfa"
            fillOpacity="1"
            d="M0,192L80,197.3C160,203,320,213,480,213.3C640,213,800,203,960,186.7C1120,171,1280,149,1360,138.7L1440,128L1440,800L1360,800C1280,800,1120,800,960,800C800,800,640,800,480,800C320,800,160,800,80,800L0,800Z"
          />
        </svg>
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/principles" element={<Principles />} />
          <Route path="/firm-family" element={<FirmFamily />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/eboard" element={<Eboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/home" element={<AdminHomeEditor />} />
          <Route path="/admin/about" element={<AdminAboutPanel />} />
          <Route path="/admin/principles" element={<AdminPrinciplesPanel />} />
          <Route path="/admin/firm-family" element={<AdminFirmFamilyPanel />} />
          <Route path="/admin/eboards" element={<AdminEboardPanel />} />
          <Route path="/admin/lines" element={<AdminLinesPanel />} />
          <Route path="/admin/gallery" element={<AdminGalleryPanel />} />

          <Route
            path="*"
            element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
