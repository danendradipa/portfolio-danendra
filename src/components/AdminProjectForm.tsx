"use client";
import { useState, useEffect } from "react";
import { Project, ProjectInput } from "@/types/Project";
import {
  uploadImage,
  createProject,
  updateProject,
} from "@/services/projectServices";
import { formatFileSize } from "@/helpers/helper";

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
  const [fileError, setFileError] = useState<string>("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFileError("");

    if (selectedFile) {
      const maxSize = 3 * 1024 * 1024; // 3MB
      if (selectedFile.size > maxSize) {
        setFileError("File size exceeds 3MB limit");
        setFile(null);
        return;
      }
    }

    setFile(selectedFile);
  };

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
      className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold mb-2">
        {initialData ? "Edit Project" : "Add New Project"}
      </h2>

      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Contoh: Web, Mobile, AI (Pisahkan koma)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Tools</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Contoh: React, Next.js, Supabase (Pisahkan koma)"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Project URL</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="https://github.com/..."
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="border dark:border-zinc-600 p-2 rounded w-full h-24 outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Project Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Project Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer border border-gray-300 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-700 focus:outline-none"
        />
        {file && (
          <p className="text-xs text-green-600 mt-1">
            Selected: {file.name} ({formatFileSize(file.size)})
          </p>
        )}
        {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
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
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition disabled:bg-gray-400"
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
          className="bg-gray-300 dark:bg-zinc-600 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-zinc-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
