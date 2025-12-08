"use client";

import { useEffect, useState } from "react";
import { Github, Moon, Sun, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { navItems } from "@/constant/data";
import FadeIn from "@/animations/FadeIn";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 py-8 px-8 bg-zinc-100 dark:bg-zinc-900">
      <FadeIn>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold ">Dane</h1>
          </div>

          {/* Navigation Links */}
          <nav
            className={`fixed md:relative top-0 left-0 h-screen md:h-auto w-full md:w-auto bg-zinc-300 dark:bg-zinc-900 md:bg-transparent flex flex-col md:flex-row items-center md:items-center md:space-x-10 px-4 md:px-0 transition-all duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <ul className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 text-center mt-16 md:mt-0">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={
                      pathname === item.path
                        ? "dark:text-gray-300 font-bold border-b-2 border-orange-400 pb-1 transition-all duration-300 ease-in-out"
                        : "dark:hover:text-gray-300"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Icons (desktop) */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className="cursor-pointer hover:bg-zinc-300/50 dark:hover:bg-zinc-800/50 rounded p-2 transition duration-200"
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="hover:bg-zinc-300/50 dark:hover:bg-zinc-800/50 rounded p-2 transition duration-200">
              <a href="https://github.com/danendradipa" target="_blank">
                <Github size={20} />
              </a>
            </div>

            <button
              className="text-2xl md:hidden focus:outline-none z-50 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </FadeIn>
    </header>
  );
};

export default Navbar;
