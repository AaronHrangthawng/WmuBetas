import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Trash2, Pencil, Save } from "lucide-react";

export default function AdminEboardPanel() {
  const [officers, setOfficers] = useState([]);
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch("/api/eboards")
      .then((res) => res.json())
      .then(setOfficers)
      .catch(() => setOfficers([]));
  }, []);

  const handleUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("/api/upload", formData);
      callback(res.data.url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleAdd = async () => {
    if (!position || !name || !bio || !image) {
      setStatus("❌ All fields are required.");
      return;
    }

    const newOfficer = {
      position,
      name,
      bio,
      image,
      sortOrder: officers.length,
    };

    try {
      const res = await fetch("/api/eboards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOfficer),
      });

      const added = await res.json();
      setOfficers([...officers, added]);

      setPosition("");
      setName("");
      setBio("");
      setImage("");
      setStatus("✅ Officer added.");
    } catch (err) {
      console.error("Save failed", err);
      setStatus("❌ Failed to add officer.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/eboards/${id}`, { method: "DELETE" });
      setOfficers(officers.filter((o) => o._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditSave = async (index) => {
    const updated = officers[index];
    try {
      const res = await fetch(`/api/eboards/${updated._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const saved = await res.json();
      const all = [...officers];
      all[index] = saved;
      setOfficers(all);
      setEditingIndex(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Manage Executive Board</h1>

        {/* Add Form */}
        <div className="space-y-4 mb-10">
          <input
            className="w-full p-3 rounded border border-purple-300 bg-white"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            className="w-full p-3 rounded border border-purple-300 bg-white"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full p-3 rounded border border-purple-300 bg-white"
            placeholder="Bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, setImage)} className="text-sm" />

          <button
            onClick={handleAdd}
            className="mt-4 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            <PlusCircle className="w-5 h-5" /> Add Officer
          </button>
          {status && <p className="text-sm text-blue-700">{status}</p>}
        </div>

        {/* Current Officers */}
        {officers.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Current Officers</h2>
            {officers.map((officer, index) => (
              <div key={officer._id || index} className="border border-purple-200 rounded-lg p-4 bg-purple-50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  {officer.image && (
                    <img
                      src={officer.image}
                      alt={officer.name}
                      className="w-20 h-20 object-cover rounded-full mb-4 sm:mb-0"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    {editingIndex === index ? (
                      <>
                        <input
                          value={officer.name}
                          onChange={(e) => {
                            const updated = [...officers];
                            updated[index].name = e.target.value;
                            setOfficers(updated);
                          }}
                          className="w-full p-2 rounded border border-purple-300"
                        />
                        <input
                          value={officer.position}
                          onChange={(e) => {
                            const updated = [...officers];
                            updated[index].position = e.target.value;
                            setOfficers(updated);
                          }}
                          className="w-full p-2 rounded border border-purple-300"
                        />
                        <textarea
                          value={officer.bio}
                          rows={3}
                          onChange={(e) => {
                            const updated = [...officers];
                            updated[index].bio = e.target.value;
                            setOfficers(updated);
                          }}
                          className="w-full p-2 rounded border border-purple-300"
                        />
                        <input
                          type="file"
                          onChange={(e) =>
                            handleUpload(e, (url) => {
                              const updated = [...officers];
                              updated[index].image = url;
                              setOfficers(updated);
                            })
                          }
                          className="text-sm"
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-purple-800">{officer.name}</h3>
                        <p className="text-sm text-gray-700">{officer.position}</p>
                        {officer.bio && (
                          <p className="text-xs text-gray-600 mt-1">{officer.bio}</p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-4">
                    {editingIndex === index ? (
                      <button
                        onClick={() => handleEditSave(index)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(officer._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
