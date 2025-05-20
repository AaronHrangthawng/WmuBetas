import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Principles from "../components/Principles";
import FirmFamily from "../components/FirmFamily";
import Lines from "../components/Lines";
import Eboard from "../components/Eboard";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <Hero />
      <About />
      <Principles />
      <FirmFamily />
      <Lines />
      <Eboard />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
