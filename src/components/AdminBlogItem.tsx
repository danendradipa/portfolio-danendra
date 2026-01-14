import { Blog } from "@/types/Blog";
import Image from "next/image";
import { formatDate } from "@/helpers/helper";
import { Calendar, Eye, EyeOff } from "lucide-react";

type Props = {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: number, imageUrl: string) => void;
};

export default function AdminBlogItem({ blog, onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-zinc-800 p-4 rounded-lg border dark:border-zinc-700 shadow-sm mb-2">
      <div className="flex items-center gap-4 flex-1">
        <Image
          src={blog.cover_image}
          alt="thumbnail"
          width={80}
          height={80}
          className="w-20 h-20 rounded object-cover bg-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{blog.title}</h3>
            {blog.is_published ? (
              <span className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                <Eye size={12} />
                Published
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                <EyeOff size={12} />
                Draft
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {blog.excerpt}
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded text-orange-700 dark:text-orange-400"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(blog.created_at || "")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(blog)}
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog.id, blog.cover_image)}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
