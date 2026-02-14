"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiFileTextLine, RiUserLine, RiBuildingLine, RiBarChartLine } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else if (!["admin", "superadmin"].includes(user.role)) router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user || !["admin", "superadmin"].includes(user.role)) return null;

  const adminLinks = [
    { href: "/admin/publications", icon: RiFileTextLine, label: t("admin.publications", lang), desc: t("admin.manage_publications", lang) },
    { href: "/admin/users", icon: RiUserLine, label: t("admin.users", lang), desc: t("admin.manage_users", lang) },
    { href: "/admin/stats", icon: RiBarChartLine, label: t("admin.stats", lang), desc: t("admin.platform_stats", lang) },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("admin.title", lang)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <link.icon className="h-10 w-10 text-primary mb-4" />
                <h2 className="font-semibold text-lg mb-1">{link.label}</h2>
                <p className="text-sm text-muted-foreground">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
