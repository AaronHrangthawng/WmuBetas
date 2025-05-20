import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

export default function AdminPrinciplesPanel() {
  const navigate = useNavigate();
  const [principles, setPrinciples] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) return navigate("/admin/login");

    fetch("/api/principles")
      .then((res) => res.json())
      .then(setPrinciples)
      .catch(() => setPrinciples([]));
  }, [navigate]);

  const handleChange = (index, field, value) => {
    const updated = [...principles];
    updated[index][field] = value;
    setPrinciples(updated);
  };

 const handleImageUpload = async (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post("/api/upload", formData);
    const url = res.data?.url || res.data?.secure_url;

    if (url) {
      const updated = [...principles];
      updated[index] = {
        ...updated[index],
        image: url,
      };
      setPrinciples(updated);
      console.log("✅ Image set at index", index, ":", url);
    } else {
      console.error("❌ Missing URL in Cloudinary response", res.data);
    }
  } catch (err) {
    console.error("❌ Upload failed:", err);
  }
};


  const handleAdd = () => {
    setPrinciples([
      ...principles,
      { title: "", description: "", image: "" }
    ]);
  };

  const handleDelete = (index) => {
    const updated = [...principles];
    updated.splice(index, 1);
    setPrinciples(updated);
  };

    const handleSaveAll = async () => {
    try {
        console.log("📤 Sending principles:", principles);

        const res = await fetch("/api/principles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(principles),
        });

        const updated = await res.json();
        console.log("✅ Updated response:", updated);

        setPrinciples(updated);
        setStatus("✅ All changes saved.");
    } catch (err) {
        console.error("❌ Save failed:", err);
        setStatus("❌ Save failed.");
    }
    };


  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Edit Principles Section</h1>

        <button
          onClick={handleAdd}
          className="mb-8 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <PlusCircle className="w-4 h-4" /> Add Principle
        </button>

        <div className="space-y-8">
          {principles.map((p, index) => (
            <div
              key={index}
              className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-purple-800">Principle {index + 1}</h2>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">Title</label>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="w-full p-3 rounded border border-purple-300 bg-white"
                    placeholder="Title"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">Description</label>
                  <textarea
                    value={p.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full p-3 rounded border border-purple-300 bg-white"
                    placeholder="Description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="text-sm"
                  />
                  {p.image && (
                    <img
                      src={p.image}
                      alt="Preview"
                      className="mt-2 w-40 rounded shadow"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveAll}
          className="mt-10 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          <Save className="w-5 h-5" /> Save All Changes
        </button>

        {status && <p className="mt-6 text-sm text-blue-700">{status}</p>}
      </div>
    </div>
  );
}
