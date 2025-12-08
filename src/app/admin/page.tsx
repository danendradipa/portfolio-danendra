"use client";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/Project";
import { getProjects, deleteProject } from "@/services/projectServices";
import AdminProjectForm from "@/components/AdminProjectForm";
import AdminProjectItem from "@/components/AdminProjectItem";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // State untuk mengontrol mode form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);


  const fetchAllProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        try {
          const data = await getProjects();
          setProjects(data); 
        } catch (err) {
          console.error("Gagal fetch projects admin:", err);
        }
      }
    };

    initializeData();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number, imageUrl: string) => {
    if (confirm("Yakin mau hapus project ini beserta gambarnya?")) {
      try {
        await deleteProject(id, imageUrl);
        fetchAllProjects();
      } catch (error) {
        alert("Gagal menghapus project");
        console.error(error);
      }
    }
  };

  const handleSuccess = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    fetchAllProjects();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) window.location.reload();
    else alert(error.message);
  };

  if (!session)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <h2 className="mt-4 text-3xl font-bold text-center text-gray-800">
              Masuk ke Akun Anda
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Masukkan email dan password Anda
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-2 mt-1 border text-zinc-900 rounded-lg"
                placeholder="nama@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-2 mt-1 border text-zinc-900 rounded-lg"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-zinc-900 text-white"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );

  return (
    <div className="p-10 max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Manager</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingProject(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            + Add Project
          </button>
          <button
            onClick={() =>
              supabase.auth.signOut().then(() => window.location.reload())
            }
            className="text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <AdminProjectForm
            initialData={editingProject}
            onSuccess={handleSuccess}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProject(null);
            }}
          />
        </div>
      )}

      {/* List Projects */}
      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-gray-500">Belum ada project.</p>
        ) : (
          projects.map((p) => (
            <AdminProjectItem
              key={p.id}
              project={p}
              onEdit={handleEdit}
              onDelete={handleDelete} // Props ini sekarang menerima fungsi dengan 2 parameter
            />
          ))
        )}
      </div>
    </div>
  );
}
