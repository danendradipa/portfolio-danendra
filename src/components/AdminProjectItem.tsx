import { Project } from "@/types/Project";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Props = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number, imageUrl: string) => void;
};

export default function AdminProjectItem({ project, onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-4 rounded-lg border dark:border-zinc-700 shadow-sm mb-2">
      <div className="flex items-center gap-4 flex-1">
        <Image
          src={project.image_url}
          alt="thumbnail"
          width={80}
          height={80}
          className="w-20 h-20 rounded object-cover bg-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{project.title}</h3>
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-orange-700 dark:text-orange-400"
              >
                {tag}
              </span>
            ))}
            {project.tools.slice(0, 2).map((tool, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(project)}
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id, project.image_url)}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
