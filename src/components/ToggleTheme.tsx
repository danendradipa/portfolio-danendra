"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {useEffect, useState } from "react";

const ToggleTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button
      onClick={handleThemeToggle}
      className="cursor-pointer hover:bg-zinc-300/50 dark:hover:bg-zinc-800/50 rounded p-2 transition duration-200"
    >
      {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ToggleTheme;
