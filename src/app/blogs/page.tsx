import { Metadata } from "next";
import BlogSection from "@/components/BlogSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on web development, machine learning, and technology. Articles about React, Next.js, and modern web development.",
};

const BlogPage = () => {
  return (
    <section className="pt-18 pb-20 px-8 bg-zinc-100 dark:bg-zinc-900">
      <BlogSection />
    </section>
  );
};

export default BlogPage;
