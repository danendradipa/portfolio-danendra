"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AdminLogin from "@/components/AdminLogin"; 
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import ToggleTheme from "@/components/ToggleTheme";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading Admin...
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 w-full bg-gray-50 dark:bg-zinc-900 transition-all duration-300 ease-in-out">
          <div className="p-4 border-b bg-white dark:bg-zinc-800 flex justify-between items-center gap-2 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="font-semibold text-sm">Admin Area</h1>
            </div>
            <ToggleTheme />
          </div>

          <div className="p-6 fade-in">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
