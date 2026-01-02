"use client";

import BlogCard from "./BlogCard";
import type { Blog } from "@/types/Blog";
import { getBlogs } from "@/services/blogServices";
import { useEffect, useState } from "react";
import FadeIn from "@/animations/FadeIn";
import TagsFilter from "./TagsFilter";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const allTags = [
    "All",
    ...Array.from(new Set(blogs.flatMap((p) => p.tags))),
  ];

  const filteredBlogs =
    filter === "All"
      ? blogs
      : blogs.filter((blog) => blog.tags.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="space-y-6 mb-10">
        <FadeIn>
          <div className="space-y-2">
            <p className="text-base font-light text-center">Get to Know</p>
            <h1 className="font-bold text-dark text-2xl text-center text-orange-400">
              My Blogs
            </h1>
          </div>
        </FadeIn>
        <FadeIn>
          <TagsFilter
            tags={allTags}
            activeTag={filter}
            onTagChange={setFilter}
          />
        </FadeIn>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          Loading blogs...
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBlogs.map((blog, index) => (
            <FadeIn key={blog.id} delay={index * 0.1}>
              <BlogCard blog={blog} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No blogs found in &quot;{filter}&quot; category.
        </div>
      )}
    </div>
  );
};

export default BlogSection;
