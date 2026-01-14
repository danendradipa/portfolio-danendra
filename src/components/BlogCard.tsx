import Image from "next/image";
import { Blog } from "@/types/Blog";
import { formatDate } from "@/helpers/helper";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div
      className={
        "relative p-4 rounded-2xl bg-zinc-200/50 hover:bg-zinc-300/50  dark:bg-zinc-800 dark:hover:bg-zinc-700/50 ring-1 ring-inset ring-zinc-400/50 dark:ring-zinc-50/5 transition-colors overflow-hidden h-full"
      }
    >
      <div className="h-45 w-full rounded-lg mb-4 relative overflow-hidden">
        <Image
          src={blog.cover_image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 text-xs font-bold rounded uppercase tracking-wider text-black">
          {blog.tags}
        </span>
      </div>
      <div className="flex justify-between gap-4 ">
        <div>
          <h1 className="mb-3 font-bold text-2xl">{blog.title}</h1>
          <p className="text-base text-zinc-700 dark:text-zinc-300/70 mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          <div className="flex justify-between items-center gap-2">
            <p className="text-xs text-zinc-900 dark:text-zinc-300 flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(blog.created_at || "")}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <Clock size={12} />3 min read
            </p>
          </div>
          <Link href={`/blogs/${blog.slug}`}>
            <button
              type="button"
              className="text-white bg-orange-400 text-base font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition duration-300 mt-6 w-full"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
