"use client";
import { useState, useEffect } from "react";
import { Project, ProjectInput } from "@/types/Project";
import {
  uploadImage,
  createProject,
  updateProject,
} from "@/services/projectServices";

type Props = {
  initialData?: Project | null; // Kalau ada isinya berarti Edit Mode
  onSuccess: () => void; // Fungsi biar Admin Page tau kalau sudah selesai
  onCancel: () => void;
};

export default function AdminProjectForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  // 1. State disesuaikan dengan Type Baru
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  // State khusus string input (karena HTML input tidak bisa langsung Array)
  const [tagsInput, setTagsInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. Logic Populate Data (Saat Edit Mode)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDesc(initialData.description);
      setProjectUrl(initialData.project_url);

      // Konversi Array ["Web", "React"] menjadi String "Web, React" untuk ditampilkan di input
      setTagsInput(initialData.tags.join(", "));
      setToolsInput(initialData.tools.join(", "));
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = initialData?.image_url || "";

      // Logic Upload Gambar
      if (file) {
        imageUrl = await uploadImage(file);
      } else if (!initialData && !file) {
        alert("Gambar wajib diupload!");
        setLoading(false);
        return;
      }

      // 3. Konversi String Input -> Array Data
      // "Web, Mobile" -> ["Web", "Mobile"]
      const formattedTags = tagsInput
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);
      const formattedTools = toolsInput
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);

      // Membentuk Object sesuai Type ProjectInput
      const projectData: ProjectInput = {
        title,
        description: desc,
        image_url: imageUrl,
        project_url: projectUrl, // Field baru
        tags: formattedTags, // Field baru (Array)
        tools: formattedTools, // Field baru (Array)
      };

      if (initialData) {
        await updateProject(
            initialData.id, 
            projectData, 
            initialData.image_url 
        );
      } else {
        await createProject(projectData);
      }

      onSuccess();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md text-black border border-gray-200 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold mb-2">
        {initialData ? "Edit Project" : "Add New Project"}
      </h2>

      {/* Input Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          className="border p-2 rounded w-full"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Input Tags (Array) */}
      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <input
          className="border p-2 rounded w-full"
          placeholder="Contoh: Web, Mobile, AI (Pisahkan koma)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      {/* Input Tools (Array) */}
      <div>
        <label className="block text-sm font-semibold mb-1">Tools</label>
        <input
          className="border p-2 rounded w-full"
          placeholder="Contoh: React, Next.js, Supabase (Pisahkan koma)"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
        />
      </div>

      {/* Input Project URL */}
      <div>
        <label className="block text-sm font-semibold mb-1">Project URL</label>
        <input
          className="border p-2 rounded w-full"
          placeholder="https://github.com/..."
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
        />
      </div>

      {/* Input Description */}
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="border p-2 rounded w-full h-24"
          placeholder="Project Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      {/* Input Image */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Project Image
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {initialData && (
          <p className="text-xs text-gray-400 mt-1">
            Biarkan kosong jika tidak ingin mengubah gambar.
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Project"
            : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
