"use client";
import { useState, useEffect } from "react";
import { Blog, BlogInput } from "@/types/Blog";
import { uploadImage, createBlog, updateBlog } from "@/services/blogServices";

type Props = {
  initialData?: Blog | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function AdminBlogForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setExcerpt(initialData.excerpt);
      setContent(initialData.content);
      setTagsInput(initialData.tags.join(", "));
      setIsPublished(initialData.is_published);
    }
  }, [initialData]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initialData) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = initialData?.cover_image || "";

      if (file) {
        coverImageUrl = await uploadImage(file);
      } else if (!initialData && !file) {
        alert("Cover image wajib diupload!");
        setLoading(false);
        return;
      }

      const formattedTags = tagsInput
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);

      const blogData: BlogInput = {
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImageUrl,
        tags: formattedTags,
        is_published: isPublished,
      };

      if (initialData) {
        await updateBlog(initialData.id, blogData, initialData.cover_image);
      } else {
        await createBlog(blogData);
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
        {initialData ? "Edit Blog" : "Add New Blog"}
      </h2>

      <div>
        <label className="block text-sm font-semibold mb-1">Title</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Slug</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="blog-slug-url"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          URL: /blogs/{slug || "blog-slug-url"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Excerpt</label>
        <textarea
          className="border dark:border-zinc-600 p-2 rounded w-full h-20 outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Short description of the blog..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <input
          className="border dark:border-zinc-600 p-2 rounded w-full outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700"
          placeholder="Contoh: Web Development, React, Tutorial (Pisahkan koma)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Content</label>
        <textarea
          className="border dark:border-zinc-600 p-2 rounded w-full h-64 outline-1 focus:outline-zinc-900 dark:focus:outline-zinc-400 focus:outline-2 bg-white dark:bg-zinc-700 font-mono text-sm"
          placeholder="Write your blog content here... (Supports HTML)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          You can use HTML tags for formatting.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer border border-gray-300 dark:border-zinc-600 rounded-lg bg-gray-50 dark:bg-zinc-700 focus:outline-none"
        />
        {initialData && (
          <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
            Biarkan kosong jika tidak ingin mengubah gambar.
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
        <label
          htmlFor="is_published"
          className="text-sm font-semibold cursor-pointer"
        >
          Publish this blog
        </label>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : initialData ? "Update Blog" : "Create Blog"}
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
