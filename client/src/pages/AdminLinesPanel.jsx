import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil } from "lucide-react";

export default function AdminLinesPanel() {
  const [lines, setLines] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [members, setMembers] = useState("");
  const [me, setMe] = useState("");
  const [ame, setAme] = useState("");
  const [editingId, setEditingId] = useState(null);

  const cloudName = "dqex0du42";
  const uploadPreset = "epsilon";

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = async () => {
    const res = await axios.get("/api/lines");
    const sorted = [...res.data].sort((a, b) => {
      return (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
    });
    setLines(sorted);
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setImageFile(null);
    setMembers("");
    setMe("");
    setAme("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        imageUrl = res.data.secure_url;
      }

      if (editingId) {
        // fallback to existing image if new one wasn't uploaded
        const currentImage = lines.find((l) => l._id === editingId)?.image || "";

        const updatedLine = {
          title,
          date,
          image: imageUrl || currentImage,
          members: members.split("\n"),
          me,
          ame,
        };

        await axios.put(`/api/lines/${editingId}`, updatedLine);
      } else {
        await axios.post("/api/lines", {
          title,
          date,
          image: imageUrl,
          members: members.split("\n"),
          me,
          ame,
        });
      }

      resetForm();
      fetchLines();
    } catch (err) {
      console.error("Error saving line:", err);
    }
  };

  const handleEdit = (line) => {
    setEditingId(line._id);
    setTitle(line.title);
    setDate(line.date);
    setMembers(line.members.join("\n"));
    setMe(line.me || "");
    setAme(line.ame || "");
    setImageFile(null); // clear image selection
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/lines/${id}`);
    fetchLines();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">
          {editingId ? "Edit Line" : "Manage Lines"}
        </h1>

        {/* Form */}
        <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl shadow mb-10 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Line Title"
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className="w-full p-3 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-3 border rounded bg-white text-sm"
          />
          <textarea
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="Members (one per line)"
            className="w-full p-3 border rounded h-32"
          />
          <input
            type="text"
            value={me}
            onChange={(e) => setMe(e.target.value)}
            placeholder="ME"
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            value={ame}
            onChange={(e) => setAme(e.target.value)}
            placeholder="AME"
            className="w-full p-3 border rounded"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              {editingId ? "Save Changes" : "➕ Add Line"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-gray-500 hover:underline text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Display */}
        <div className="space-y-6">
          {lines.map((line) => (
            <div
              key={line._id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-purple-700">{line.title}</h3>
                  {line.date && <p className="text-sm text-gray-500">{line.date}</p>}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(line)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Line"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(line._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Line"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {line.image && (
                <img
                  src={line.image}
                  alt={line.title}
                  className="mt-3 rounded max-h-56 object-cover w-full"
                />
              )}

              <ul className="list-disc list-inside mt-3 text-sm text-gray-800 space-y-1">
                {line.members.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                {line.me && <p><span className="font-semibold">ME:</span> {line.me}</p>}
                {line.ame && <p><span className="font-semibold">AME:</span> {line.ame}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
