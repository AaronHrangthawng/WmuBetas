import React from "react";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white px-4 py-6 mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-1">Exotic Epsilon</h2>
        <p className="text-sm text-purple-100 mb-2">
          Sigma Lambda Beta at Western Michigan University
        </p>
        <p className="text-xs text-purple-200">
          &copy; {new Date().getFullYear()} Exotic Epsilon – All rights reserved.
        </p>
      </div>
    </footer>
  );
}
