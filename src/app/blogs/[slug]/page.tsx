import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/services/blogServices";
import { formatDate } from "@/helpers/helper";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [blog.cover_image],
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
    };
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogBySlug(slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <section className="min-h-screen pt-20 pb-20 px-4 sm:px-8 bg-zinc-100 dark:bg-zinc-900">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Blogs</span>
        </Link>

        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 ring-1 ring-zinc-400/50 dark:ring-zinc-50/5">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-400/20 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            {blog.title}
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(blog.created_at || "")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        <hr className="border-zinc-300 dark:border-zinc-700 mb-8" />

        <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
          <div
            className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <footer className="mt-12 pt-8 border-t border-zinc-300 dark:border-zinc-700">
          <div className="flex justify-between items-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              More Blogs
            </Link>
          </div>
        </footer>
      </article>
    </section>
  );
};

export default BlogDetailPage;