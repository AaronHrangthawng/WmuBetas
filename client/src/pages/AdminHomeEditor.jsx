import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Trash2, UploadCloud, Save } from "lucide-react";

export default function AdminHomeEditor() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    fetch("/api/home/images")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.order - b.order);
        setImages(sorted);
      });
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", "");

    try {
      const res = await axios.post("/api/home/upload", formData);
      setImages((prev) => [...prev, res.data]);
      setMessage("✅ Image uploaded successfully");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleOrderChange = (id, newOrder) => {
    setImages((prev) =>
      prev.map((img) =>
        img._id === id ? { ...img, order: parseInt(newOrder) } : img
      )
    );
  };

  const handleCaptionChange = (id, newCaption) => {
    setImages((prev) =>
      prev.map((img) =>
        img._id === id ? { ...img, caption: newCaption } : img
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/home/images/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      setMessage("🗑️ Image deleted");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete image");
    }
  };

  const handleSaveOrder = async () => {
    try {
      await axios.put("/api/home/images/order", { images });
      setMessage("✅ Image info updated");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update order/captions");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Centered Title Bar */}
        <div className="flex justify-center mb-8">
          <div className="bg-purple-100 border border-purple-300 text-purple-800 font-extrabold text-2xl sm:text-3xl rounded-full px-8 py-4 shadow-md text-center">
            Edit Homepage Hero Images
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-purple-700 font-semibold cursor-pointer">
            <UploadCloud className="w-5 h-5" />
            Upload New Image
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {uploading && (
            <p className="text-sm text-blue-600">Uploading image...</p>
          )}
        </div>

        {/* Image Cards */}
        <div className="grid gap-y-6 gap-x-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-purple-50 border border-purple-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={img.url}
                alt="Hero"
                className="w-full h-40 object-cover border-b"
              />
              <div className="p-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Caption
                </label>
                <input
                  type="text"
                  value={img.caption || ""}
                  onChange={(e) => handleCaptionChange(img._id, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />

                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Order
                </label>
                <input
                  type="number"
                  value={img.order}
                  onChange={(e) => handleOrderChange(img._id, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />

                {img.uploadedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded: {new Date(img.uploadedAt).toLocaleString()}
                  </p>
                )}

                <button
                  onClick={() => handleDelete(img._id)}
                  className="mt-2 flex items-center text-red-600 hover:text-red-800 text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSaveOrder}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            <Save className="w-5 h-5" />
            Save All Changes
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-blue-700">{message}</p>
        )}
      </div>
    </div>
  );
}
