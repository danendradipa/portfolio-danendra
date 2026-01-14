"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/types/Blog";
import { getBlogs, deleteBlog } from "@/services/blogServices";
import AdminBlogForm from "@/components/AdminBlogForm";
import AdminBlogItem from "@/components/AdminBlogItem";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs(true);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, imageUrl: string) => {
    if (confirm("Yakin mau hapus blog ini beserta gambarnya?")) {
      try {
        await deleteBlog(id, imageUrl);
        fetchAllBlogs();
      } catch (error) {
        alert("Gagal menghapus blog");
        console.error(error);
      }
    }
  };

  const handleSuccess = () => {
    setIsFormOpen(false);
    setEditingBlog(null);
    fetchAllBlogs();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your blog posts here.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="bg-black dark:bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-gray-800 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
        >
          + Add New Blog
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border dark:border-zinc-700">
          <AdminBlogForm
            initialData={editingBlog}
            onSuccess={handleSuccess}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingBlog(null);
            }}
          />
        </div>
      )}

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-800 rounded-lg border dark:border-zinc-700">
            <p className="text-gray-500 dark:text-gray-400">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-800 rounded-lg border border-dashed dark:border-zinc-700">
            <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <AdminBlogItem
              key={blog.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}