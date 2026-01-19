import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/Project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
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
      <div className="flex items-end justify-between gap-4 ">
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
        </div>
        <div className="w-11 h-11 rounded-lg grid place-items-center text-zinc-100 bg-orange-400 dark:text-zinc-950 shrink-0">
          <i>
            <ArrowUpRight />
          </i>
        </div>

        <a
          href={project.project_url}
          target="_blank"
          className="absolute inset-0"
        ></a>
      </div>
    </div>
  );
};

export default ProjectCard;
