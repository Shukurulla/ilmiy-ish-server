"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  RiFileTextLine,
  RiUserLine,
  RiCheckLine,
  RiTimeLine,
  RiCloseLine,
  RiEditLine,
  RiBarChartBoxLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  published: "bg-green-500",
  revision: "bg-orange-500",
  rejected: "bg-red-500",
};

const statusBadgeColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  revision: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const typeColors: Record<string, string> = {
  dissertation: "bg-blue-500",
  abstract: "bg-cyan-500",
  article: "bg-indigo-500",
  monograph: "bg-purple-500",
  textbook: "bg-pink-500",
  manual: "bg-teal-500",
  conference_thesis: "bg-amber-500",
  other: "bg-gray-500",
};

export default function AdminStatsPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.get("/publications/admin/stats")
        .then((res) => setStats(res.data.stats))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

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

  // Compute max values for bar chart scaling
  const statusEntries = useMemo(() => {
    if (!stats?.byStatus) return [];
    return Object.entries(stats.byStatus) as [string, number][];
  }, [stats]);

  const typeEntries = useMemo(() => {
    if (!stats?.byType) return [];
    return Object.entries(stats.byType) as [string, number][];
  }, [stats]);

  const maxStatusCount = useMemo(
    () => Math.max(...statusEntries.map(([, c]) => c), 1),
    [statusEntries]
  );

  const maxTypeCount = useMemo(
    () => Math.max(...typeEntries.map(([, c]) => c), 1),
    [typeEntries]
  );

  const approvalRate = useMemo(() => {
    if (!stats?.totalPublications) return 0;
    return Math.round(((stats.byStatus?.published || 0) / stats.totalPublications) * 100);
  }, [stats]);

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }
  if (!user) return null;

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <RiTimeLine className="h-4 w-4" />,
    published: <RiCheckLine className="h-4 w-4" />,
    revision: <RiEditLine className="h-4 w-4" />,
    rejected: <RiCloseLine className="h-4 w-4" />,
  };

  return (
    <div className="p-4 md:p-6">

      {stats && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <RiFileTextLine className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalPublications}</div>
                    <div className="text-xs text-muted-foreground">{t("admin.total_works", lang)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <RiCheckLine className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.byStatus?.published || 0}</div>
                    <div className="text-xs text-muted-foreground">{t("admin.published_works", lang)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <RiTimeLine className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.byStatus?.pending || 0}</div>
                    <div className="text-xs text-muted-foreground">{t("admin.pending_review", lang)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <RiUserLine className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <div className="text-xs text-muted-foreground">{t("admin.total_researchers", lang)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Approval Rate */}
          <Card className="mb-8">
            <CardContent className="py-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <RiBarChartBoxLine className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{t("admin.approval_rate", lang)}</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{approvalRate}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${approvalRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.byStatus?.published || 0} / {stats.totalPublications} {t("admin.published_works", lang).toLowerCase()}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Status Distribution - Bar Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t("admin.status_distribution", lang)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusEntries.map(([status, count]) => {
                    const pct = Math.round((count / (stats.totalPublications || 1)) * 100);
                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {statusIcons[status]}
                            <span className="text-sm font-medium">{t(`status.${status}`, lang)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{count}</span>
                            <span className="text-xs text-muted-foreground">({pct}%)</span>
                          </div>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${statusColors[status] || "bg-gray-500"}`}
                            style={{ width: `${(count / maxStatusCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Type Distribution - Bar Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t("admin.type_distribution", lang)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {typeEntries.map(([type, count]) => {
                    const pct = Math.round((count / (stats.totalPublications || 1)) * 100);
                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">{typeLabels[type] || type}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{count}</span>
                            <span className="text-xs text-muted-foreground">({pct}%)</span>
                          </div>
                        </div>
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${typeColors[type] || "bg-gray-500"}`}
                            style={{ width: `${(count / maxTypeCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Publications - Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{t("admin.recent_submissions", lang)}</CardTitle>
                <Link href="/admin/publications">
                  <Button variant="ghost" size="sm" className="text-xs">
                    {t("admin.view_all", lang)} →
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {stats.recentPublications?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium text-muted-foreground">#</th>
                        <th className="pb-2 font-medium text-muted-foreground pl-3">
                          {lang === "uz" ? "Sarlavha" : lang === "ru" ? "Название" : "Title"}
                        </th>
                        <th className="pb-2 font-medium text-muted-foreground pl-3">
                          {lang === "uz" ? "Muallif" : lang === "ru" ? "Автор" : "Author"}
                        </th>
                        <th className="pb-2 font-medium text-muted-foreground pl-3">
                          {lang === "uz" ? "Tur" : lang === "ru" ? "Тип" : "Type"}
                        </th>
                        <th className="pb-2 font-medium text-muted-foreground pl-3">
                          {lang === "uz" ? "Holat" : lang === "ru" ? "Статус" : "Status"}
                        </th>
                        <th className="pb-2 font-medium text-muted-foreground pl-3">
                          {lang === "uz" ? "Sana" : lang === "ru" ? "Дата" : "Date"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentPublications.map((pub: any, idx: number) => (
                        <tr key={pub._id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                          <td className="py-2.5 text-muted-foreground">{idx + 1}</td>
                          <td className="py-2.5 pl-3 max-w-[250px]">
                            <span className="line-clamp-1 font-medium">
                              {getLocalizedField(pub.title, lang)}
                            </span>
                          </td>
                          <td className="py-2.5 pl-3 whitespace-nowrap text-muted-foreground">
                            {pub.author
                              ? `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`
                              : "—"}
                          </td>
                          <td className="py-2.5 pl-3">
                            <Badge variant="outline" className="text-xs font-normal">
                              {t(`type.${pub.type}`, lang)}
                            </Badge>
                          </td>
                          <td className="py-2.5 pl-3">
                            <Badge className={`${statusBadgeColors[pub.status] || ""} text-xs`} variant="secondary">
                              {t(`status.${pub.status}`, lang)}
                            </Badge>
                          </td>
                          <td className="py-2.5 pl-3 text-muted-foreground whitespace-nowrap">
                            {new Date(pub.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">{t("common.no_results", lang)}</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
