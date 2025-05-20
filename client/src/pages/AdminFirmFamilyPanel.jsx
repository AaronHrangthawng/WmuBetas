import React, { useEffect, useState } from "react";
import { Save, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";

export default function AdminFirmPanel() {
  const [firms, setFirms] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/firm")
      .then((res) => res.json())
      .then((data) => {
        setFirms(data.firms || []);
      })
      .catch((err) => {
        console.error("Failed to load firm data:", err);
        setFirms([]);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...firms];
    updated[index][field] = value;
    setFirms(updated);
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
        const updated = [...firms];
        updated[index].image = url;
        setFirms(updated);
      } else {
        console.error("Missing secure_url from upload response", res.data);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleAdd = () => {
    setFirms([...firms, { name: "", description: "", image: "" }]);
  };

  const handleDelete = (index) => {
    const updated = [...firms];
    updated.splice(index, 1);
    setFirms(updated);
  };

  const handleSaveAll = async () => {
    try {
      const res = await fetch("/api/firm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firms }),
      });
      const updated = await res.json();
      setFirms(updated.firms || []);
      setStatus("✅ Firm Family saved successfully.");
    } catch (err) {
      console.error("Save failed:", err);
      setStatus("❌ Save failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Edit Firm Family Section</h1>

        <button
          onClick={handleAdd}
          className="mb-8 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <PlusCircle className="w-4 h-4" /> Add Firm
        </button>

        <div className="space-y-8">
          {firms.map((f, index) => (
            <div
              key={index}
              className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-purple-800">
                  Firm {index + 1}
                </h2>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">
                    Fraternity Name
                  </label>
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="w-full p-3 rounded border border-purple-300 bg-white"
                    placeholder="e.g. Alpha Chapter"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">
                    Description
                  </label>
                  <textarea
                    value={f.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    className="w-full p-3 rounded border border-purple-300 bg-white"
                    placeholder="Who are they?"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-800 block mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="text-sm"
                  />
                  {f.image && (
                    <img
                      src={f.image}
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
