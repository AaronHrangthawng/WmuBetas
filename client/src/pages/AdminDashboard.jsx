import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  BookOpen,
  Users,
  Briefcase,
  Layers,
  Image,
  LogOut,
} from "lucide-react";

const panels = [
  { title: "Home", path: "/admin/home", icon: <Home className="w-5 h-5 mr-2" /> },
  { title: "About", path: "/admin/about", icon: <Info className="w-5 h-5 mr-2" /> },
  { title: "Principles", path: "/admin/principles", icon: <BookOpen className="w-5 h-5 mr-2" /> },
  { title: "FIRM Family", path: "/admin/firm-family", icon: <Users className="w-5 h-5 mr-2" /> },
  { title: "Eboard", path: "/admin/eboards", icon: <Briefcase className="w-5 h-5 mr-2" /> },
  { title: "Lines", path: "/admin/lines", icon: <Layers className="w-5 h-5 mr-2" /> },
  { title: "Gallery", path: "/admin/gallery", icon: <Image className="w-5 h-5 mr-2" /> },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Centered Welcome Bar */}
        <div className="flex justify-center mb-10">
          <div className="bg-purple-100 border border-purple-300 text-purple-800 font-extrabold text-3xl rounded-full px-8 py-4 shadow-md">
            Welcome, Admin
          </div>
        </div>

        {/* Logout button aligned right */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Admin Panels */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {panels.map(({ title, path, icon }) => (
            <Link
              key={title}
              to={path}
              className="bg-purple-100 border border-purple-300 rounded-2xl shadow-md p-6 hover:scale-105 hover:shadow-lg transition duration-200 flex flex-col"
            >
              <div className="flex items-center text-purple-800 text-xl font-bold mb-2">
                {icon}
                {title}
              </div>
              <p className="text-sm text-gray-700">Edit the {title} section.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
