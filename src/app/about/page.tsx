import { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import SkillSection from "@/components/SkillSection";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Danendra Dipa Dananjaya - Frontend Developer, Data & ML Enthusiast with expertise in React, Next.js, and modern web technologies.",
};

const About = () => {
  return (
    <div>
      <AboutSection />
      <SkillSection />
    </div>
  );
};

export default About;
