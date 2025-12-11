"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { FolderGit2, User, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const { count } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      if (count) setProjectCount(count);
      setLoading(false);
    };

    initData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className=" p-6 bg-blue-50 dark:bg-zinc-800/50 border border-blue-100 dark:border-zinc-700 rounded-xl">
        <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          👋 Welcome back!
        </h2>
        <p className="text-blue-700 dark:text-gray-400 text-sm">
          Select <b>Projects</b> in the sidebar to manage your website
          content.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border dark:border-zinc-700 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">
              Total Projects
            </h3>
            {loading ? (
              <div className="h-8 w-12 bg-gray-200 dark:bg-zinc-700 animate-pulse rounded mt-1"></div>
            ) : (
              <p className="font-bold text-3xl mt-1">{projectCount}</p>
            )}
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
            <FolderGit2 size={24} />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border dark:border-zinc-700 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Active User</h3>
            <p className="font-bold text-sm mt-2 truncate max-w-[150px]">
              {session?.user?.email}
            </p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400">
            <User size={24} />
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border dark:border-zinc-700 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">System Status</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="font-bold text-lg text-green-600">Online</p>
            </div>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400">
            <Activity size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
