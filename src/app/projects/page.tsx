import { Metadata } from "next";
import ProjectSection from "@/components/ProjectSection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects using React, Next.js, TypeScript, and other modern technologies.",
};

const ProjectPage = () => {
  return (
    <section className="pt-18 pb-20 px-8 bg-zinc-100 dark:bg-zinc-900">
      <ProjectSection />
    </section>
  );
};

export default ProjectPage;
