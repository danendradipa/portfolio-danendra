"use client";
import { useState } from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import { Project } from "@/types/Project";
import ProjectModal from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={
          "relative p-4 rounded-2xl bg-zinc-200/50 hover:bg-zinc-300/50  dark:bg-zinc-800 dark:hover:bg-zinc-700/50 ring-1 ring-inset ring-zinc-400/50 dark:ring-zinc-50/5 transition-colors overflow-hidden h-full"
        }
      >
        <div className="h-60 w-full rounded-lg mb-4 relative overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1.5 max-w-[80%]">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider text-black shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mb-3 font-bold text-2xl">{project.title}</h1>
          <p className="text-base text-zinc-700 dark:text-zinc-300/70 mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="h-8 text-sm text-zinc-700 bg-zinc-300 dark:text-zinc-400 dark:bg-zinc-50/5 grid items-center px-3 rounded-lg"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 text-white bg-orange-400 text-base font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition duration-300 cursor-pointer"
            >
              View Details
            </button>
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 px-4 rounded-md transition duration-300"
            >
              <Github size={20} className="text-zinc-900 dark:text-zinc-100" />
            </a>
          </div>
        </div>
      </div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
