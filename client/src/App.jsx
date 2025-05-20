import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Main site components
import Home from "./pages/Home"; // Only Home is in pages
import About from "./components/About";
import Principles from "./components/Principles";
import FirmFamily from "./components/FirmFamily";
import Lines from "./components/Lines";
import Eboard from "./components/Eboard";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";


// Admin panel components
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
    <Router>
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/principles" element={<Principles />} />
        <Route path="/firm-family" element={<FirmFamily />} />
        <Route path="/lines" element={<Lines />} />
        <Route path="/eboard" element={<Eboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />


        {/* Admin panel routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/home" element={<AdminHomeEditor />} />
        <Route path="/admin/about" element={<AdminAboutPanel />} />
        <Route path="/admin/principles" element={<AdminPrinciplesPanel />} />
        <Route path="/admin/firm-family" element={<AdminFirmFamilyPanel />} />
        <Route path="/admin/eboards" element={<AdminEboardPanel />} />
        <Route path="/admin/lines" element={<AdminLinesPanel />} />
        <Route path="/admin/gallery" element={<AdminGalleryPanel />} />



        {/* 404 fallback */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
