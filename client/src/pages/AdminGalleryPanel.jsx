import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Trash2, RotateCcw } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function AdminGalleryPanel() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [rotation, setRotation] = useState({});
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin/login");

    fetch("/api/new-gallery")
      .then((res) => res.json())
      .then(setImages)
      .catch((err) => console.error("Failed to load gallery", err));
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "epsilon");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqex0du42/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.secure_url) throw new Error("Cloudinary upload failed");

      const saveRes = await fetch("/api/new-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data.secure_url, title }),
      });

      if (!saveRes.ok) throw new Error("Failed to save image to database");

      const saved = await saveRes.json();
      setImages([saved, ...images]);
      setTitle("");
      setFile(null);
      setUploading(false);
      setStatus("✅ Image uploaded.");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setStatus("❌ Upload failed.");
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/new-gallery/${id}`, { method: "DELETE" });
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`/api/new-gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });

      if (!res.ok) throw new Error("Failed to update title");

      const updated = await res.json();
      setImages(images.map((img) => (img._id === id ? updated : img)));
      setEditingId(null);
      setEditedTitle("");
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleRotate = (id) => {
    setRotation((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 90) % 360,
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img._id === active.id);
    const newIndex = images.findIndex((img) => img._id === over.id);
    setImages(arrayMove(images, oldIndex, newIndex));
  };

  const SortableItem = ({ id, img }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      rotate: `${rotation[id] || 0}deg`,
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col transition"
        style={style}
      >
        <img
          src={img.url}
          alt={img.title || "Gallery image"}
          className="w-full h-48 object-cover object-center cursor-pointer rounded-t-xl"
          onClick={() => setPreviewImg(img)}
          loading="lazy"
        />

        {editingId === img._id ? (
          <div className="p-4 bg-gray-50 border-t space-y-2 text-center">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-sm p-2 border rounded w-full text-center"
            />
            <button
              onClick={() => handleEdit(img._id)}
              className="text-sm bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border-t text-sm text-gray-800 text-center font-medium">
            {img.title}
            <button
              onClick={() => {
                setEditingId(img._id);
                setEditedTitle(img.title);
              }}
              className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
              title="Edit"
            >
              ✏️
            </button>
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => handleRotate(img._id)}
            className="bg-white text-purple-700 hover:text-purple-900 rounded-full p-1 shadow"
            title="Rotate"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(img._id)}
            className="bg-white text-red-600 hover:text-red-800 rounded-full p-1 shadow"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-10 text-center">
          Manage Gallery
        </h1>

        <form
          onSubmit={handleUpload}
          className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-12 space-y-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-purple-800 mb-2">
            Upload New Image
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Image caption"
              className="p-3 rounded border border-purple-300 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-purple-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-md text-sm font-medium transition"
              disabled={uploading}
            >
              <ImagePlus className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {status && <p className="text-sm text-blue-700 mt-2">{status}</p>}
        </form>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((img) => img._id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
              {images.map((img) => (
                <SortableItem key={img._id} id={img._id} img={img} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {previewImg && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setPreviewImg(null)}
          >
            <div className="max-w-6xl w-full max-h-[90vh] overflow-auto relative">
              <img
                src={previewImg.url}
                alt={previewImg.title || "Preview"}
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
              {previewImg.title && (
                <div className="absolute bottom-0 left-0 right-0 text-white text-center bg-black/60 py-3 text-base font-medium">
                  {previewImg.title}
                </div>
              )}
              <button
                onClick={() => setPreviewImg(null)}
                className="absolute top-3 right-4 text-white text-2xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
