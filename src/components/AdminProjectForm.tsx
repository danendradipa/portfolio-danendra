"use client";
import { useState, useEffect } from "react";
import { Project, ProjectInput } from "@/types/Project";
import {
  uploadImage,
  createProject,
  updateProject,
} from "@/services/projectServices";

type Props = {
  initialData?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function AdminProjectForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  const [tagsInput, setTagsInput] = useState("");
  const [toolsInput, setToolsInput] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDesc(initialData.description);
      setProjectUrl(initialData.project_url);

      setTagsInput(initialData.tags.join(", "));
      setToolsInput(initialData.tools.join(", "));
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = initialData?.image_url || "";

      if (file) {
        imageUrl = await uploadImage(file);
      } else if (!initialData && !file) {
        alert("Gambar wajib diupload!");
        setLoading(false);
        return;
      }

      const formattedTags = tagsInput
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);
      const formattedTools = toolsInput
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);

      const projectData: ProjectInput = {
        title,
        description: desc,
        image_url: imageUrl,
        project_url: projectUrl,
        tags: formattedTags,
        tools: formattedTools,
      };

      if (initialData) {
        await updateProject(initialData.id, projectData, initialData.image_url);
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

      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          className="border p-2 rounded w-full  outline-1 focus:outline-zinc-900 focus:outline-2"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <input
          className="border p-2 rounded w-full outline-1 focus:outline-zinc-900 focus:outline-2"
          placeholder="Contoh: Web, Mobile, AI (Pisahkan koma)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Tools</label>
        <input
          className="border p-2 rounded w-full  outline-1 focus:outline-zinc-900 focus:outline-2"
          placeholder="Contoh: React, Next.js, Supabase (Pisahkan koma)"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Project URL</label>
        <input
          className="border p-2 rounded w-full  outline-1 focus:outline-zinc-900 focus:outline-2"
          placeholder="https://github.com/..."
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="border p-2 rounded w-full h-24  outline-1 focus:outline-zinc-900 focus:outline-2"
          placeholder="Project Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Project Image
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
        />
        {initialData && (
          <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
            Biarkan kosong jika tidak ingin mengubah gambar.
          </p>
        )}
      </div>

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
