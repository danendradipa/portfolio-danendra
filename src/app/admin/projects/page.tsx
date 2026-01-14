"use client";
import { useState, useEffect } from "react";
import { Project } from "@/types/Project";
import { getProjects, deleteProject } from "@/services/projectServices";
import ProjectForm from "@/components/AdminProjectForm";
import AdminProjectItem from "@/components/AdminProjectItem";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
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
    const fetchData = async () => {
      await fetchAllProjects();
    };

    fetchData();
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage your portfolio projects here.</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsFormOpen(true);
          }}
          className=" bg-black dark:bg-blue-500 text-white px-4 py-2 rounded shadow dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
        >
          + Add New Project
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border dark:border-zinc-700">
          <ProjectForm
            initialData={editingProject}
            onSuccess={handleSuccess}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProject(null);
            }}
          />
        </div>
      )}

      <div className="space-y-2">
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed">
            <p className="text-gray-500">No projects found.</p>
          </div>
        ) : (
          projects.map((p) => (
            <AdminProjectItem
              key={p.id}
              project={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
