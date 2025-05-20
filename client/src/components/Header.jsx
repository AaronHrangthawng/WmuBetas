import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white/30 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-purple-700">
          Exotic Epsilon
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#home" className="hover:text-purple-600">Home</a>
          <a href="#about" className="hover:text-purple-600">About</a>
          <a href="#principles" className="hover:text-purple-600">Principles</a>
          <a href="#firm-family" className="hover:text-purple-600">FIRM Family</a>
          <a href="#lines" className="hover:text-purple-600">Lines</a>
          <a href="#gallery" className="hover:text-purple-600">Gallery</a>
          <a href="#contact" className="hover:text-purple-600">Contact</a>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-2 text-gray-700 font-medium">
          <a href="#home" className="block hover:text-purple-600">Home</a>
          <a href="#about" className="block hover:text-purple-600">About</a>
          <a href="#principles" className="block hover:text-purple-600">Principles</a>
          <a href="#firm-family" className="block hover:text-purple-600">FIRM Family</a>
          <a href="#lines" className="block hover:text-purple-600">Lines</a>
          <a href="#gallery" className="block hover:text-purple-600">Gallery</a>
          <a href="#contact" className="block hover:text-purple-600">Contact</a>
          <DarkModeToggle />
        </div>
      )}
    </header>
  );
}
