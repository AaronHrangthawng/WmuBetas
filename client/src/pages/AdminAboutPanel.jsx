import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

export default function AdminAboutPanel() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    history: [],
    identity: [],
    nationalHistory: [],
    foundingFathers: [],
    mission: [],
    fraternityFacts: [],
    nationalHistoryImage: "",
    fraternityFactsImage: "",
    historyImage: "",
    identityImage: "",
    foundingFathersImage: "",
    missionImage: "",
  });

  const [editBuffer, setEditBuffer] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) return navigate("/admin/login");

    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setEditBuffer(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [navigate]);

  const handleListChange = (section, index, value) => {
    const updated = [...editBuffer[section]];
    updated[index] = value;
    setEditBuffer({ ...editBuffer, [section]: updated });
  };

  const handleListAdd = (section) => {
    setEditBuffer({
      ...editBuffer,
      [section]: [...(editBuffer[section] || []), ""],
    });
  };

  const handleListRemove = (section, index) => {
    const updated = [...editBuffer[section]];
    updated.splice(index, 1);
    setEditBuffer({ ...editBuffer, [section]: updated });
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/api/upload", formData);
      setEditBuffer({ ...editBuffer, [field]: res.data.url });
      setStatus("✅ Image uploaded");
    } catch {
      setStatus("❌ Image upload failed");
    }
  };

  const handleSave = async () => {
    const method = form._id ? "PUT" : "POST";
    try {
      const res = await fetch("/api/about", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBuffer),
      });
      const updated = await res.json();
      setForm(updated);
      setEditBuffer(updated);
      setStatus("✅ About section saved!");
    } catch (err) {
      setStatus("❌ Failed to save changes");
    }
  };

  const sections = [
    { label: "National History", key: "nationalHistory", image: "nationalHistoryImage" },
    { label: "Fraternity Facts", key: "fraternityFacts", image: "fraternityFactsImage" },
    { label: "Chapter History", key: "history", image: "historyImage" },
    { label: "Chapter Identity", key: "identity", image: "identityImage" },
    { label: "Founding Fathers", key: "foundingFathers", image: "foundingFathersImage" },
    { label: "Our Mission", key: "mission", image: "missionImage" },
  ];

  if (!loaded) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-purple-100 border border-purple-300 text-purple-800 font-extrabold text-2xl sm:text-3xl rounded-full px-8 py-4 shadow-md text-center">
            Edit About Section
          </div>
        </div>

        {sections.map(({ label, key, image }) => (
          <div key={key} className="mb-10 bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h2 className="text-xl font-semibold text-purple-800">{label}</h2>
              <button
                onClick={() => handleListAdd(key)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add Item
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-purple-800 block mb-2">
                {label} Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, image)}
                className="mb-2"
              />
              {editBuffer[image] && (
                <img
                  src={editBuffer[image]}
                  alt={`${label} image`}
                  className="rounded shadow h-32 object-cover w-full"
                />
              )}
            </div>

            {(editBuffer[key] || []).map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange(key, index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  onClick={() => handleListRemove(key, index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            <Save className="w-5 h-5" /> Save All Changes
          </button>
        </div>

        {status && (
          <p className="mt-4 text-center text-sm text-blue-700">{status}</p>
        )}
      </div>
    </div>
  );
}
