"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftLine, RiFileTextLine, RiUserLine, RiCheckLine, RiTimeLine, RiCloseLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

export default function AdminStatsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else if (!["admin", "superadmin"].includes(user.role)) router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && ["admin", "superadmin"].includes(user.role)) {
      api.get("/publications/admin/stats").then((res) => {
        setStats(res.data.stats);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [user]);

  if (authLoading || loading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user || !["admin", "superadmin"].includes(user.role)) return null;

  const typeLabels: Record<string, string> = {
    dissertation: t("type.dissertation", lang),
    abstract: t("type.abstract", lang),
    article: t("type.article", lang),
    monograph: t("type.monograph", lang),
    textbook: t("type.textbook", lang),
    manual: t("type.manual", lang),
    conference_thesis: t("type.conference_thesis", lang),
    other: t("type.other", lang),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin"><Button variant="ghost" size="icon"><RiArrowLeftLine /></Button></Link>
        <h1 className="text-2xl font-bold">{t("admin.stats", lang)}</h1>
      </div>

      {stats && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <RiFileTextLine className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-3xl font-bold">{stats.totalPublications}</div>
                <div className="text-sm text-muted-foreground">{t("home.stats.publications", lang)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <RiUserLine className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">{t("home.stats.researchers", lang)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <RiCheckLine className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-3xl font-bold">{stats.byStatus?.published || 0}</div>
                <div className="text-sm text-muted-foreground">{t("status.published", lang)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <RiTimeLine className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                <div className="text-3xl font-bold">{stats.byStatus?.pending || 0}</div>
                <div className="text-sm text-muted-foreground">{t("status.pending", lang)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Status */}
            <Card>
              <CardHeader><CardTitle>{t("admin.by_status", lang)}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.byStatus || {}).map(([status, count]: [string, any]) => (
                    <div key={status} className="flex items-center justify-between">
                      <Badge variant="secondary">{t(`status.${status}`, lang)}</Badge>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* By Type */}
            <Card>
              <CardHeader><CardTitle>{t("admin.by_type", lang)}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.byType || {}).map(([type, count]: [string, any]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm">{typeLabels[type] || type}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Publications */}
          <Card className="mt-6">
            <CardHeader><CardTitle>{t("admin.recent_submissions", lang)}</CardTitle></CardHeader>
            <CardContent>
              {stats.recentPublications?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentPublications.map((pub: any) => (
                    <div key={pub._id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{getLocalizedField(pub.title, lang)}</p>
                        <p className="text-xs text-muted-foreground">
                          {pub.author && `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`}
                          {" · "}{new Date(pub.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className="ml-2">{t(`status.${pub.status}`, lang)}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">{t("common.no_results", lang)}</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
