"use client";

import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/Project";
import { getProjects } from "@/services/projectServices";
import { useEffect, useState } from "react";
import FadeIn from "@/animations/FadeIn";

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const allTags = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="space-y-6 mb-10">
        <FadeIn>
          <div className="space-y-2">
            <p className="text-base font-light text-center">Get to Know</p>
            <h1 className="font-bold text-dark text-2xl text-center text-orange-400">
              My Highlight Projects
            </h1>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setFilter(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  filter === tag
                    ? "bg-orange-400 text-white border-orange-400 shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Loading projects...
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No projects found in &quot;{filter}&quot; category.
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
