"use client";

import FadeIn from "@/animations/FadeIn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-6 relative">
      <div className="max-w-8xl mx-auto w-full space-y-8 text-center z-10">
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Hi, I&apos;m{" "}
              <span className="text-orange-500">Danendra Dipa</span>.
            </h1>

            <p className="text-lg md:text-xl font-light text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Frontend Developer, Data & ML Enthusiast{" "}
              <br className="hidden md:block" />
              Building digital products with{" "}
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                precision
              </span>{" "}
              and{" "}
              <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                purpose
              </span>
              .
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/projects" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                See My Work
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 text-zinc-600 dark:text-zinc-400 font-medium hover:text-zinc-900 dark:hover:text-white transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg cursor-pointer">
                About Me
              </button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HomePage;
