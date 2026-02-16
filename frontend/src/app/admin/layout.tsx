"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import AdminSidebarContent from "@/components/admin/AdminSidebarContent";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminMobileSidebar from "@/components/admin/AdminMobileSidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, fetchUser } = useAuthStore();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!["admin", "superadmin"].includes(user.role)) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold mx-auto">
            IP
          </div>
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user || !["admin", "superadmin"].includes(user.role)) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-sidebar-border">
        <AdminSidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AdminMobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col md:pl-64">
        <AdminTopbar onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
