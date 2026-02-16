"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiFileTextLine,
  RiUserLine,
  RiBuildingLine,
  RiBarChartLine,
  RiBookOpenLine,
  RiCheckLine,
  RiTimeLine,
  RiCloseLine,
  RiEditLine,
  RiEyeLine,
  RiArrowRightLine,
  RiAlertLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
  published: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
  revision: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
};

const statusBarColors: Record<string, string> = {
  pending: "bg-yellow-500",
  published: "bg-green-500",
  revision: "bg-orange-500",
  rejected: "bg-red-500",
};

const typeBarColors: Record<string, string> = {
  dissertation: "bg-purple-500",
  abstract: "bg-pink-500",
  article: "bg-blue-500",
  monograph: "bg-green-500",
  textbook: "bg-orange-500",
  manual: "bg-teal-500",
  conference_thesis: "bg-yellow-500",
  other: "bg-gray-500",
};

export default function AdminPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [stats, setStats] = useState<any>(null);
  const [pendingPubs, setPendingPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Moderation dialog
  const [moderateDialog, setModerateDialog] = useState(false);
  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [moderateAction, setModerateAction] = useState("");
  const [moderateComment, setModerateComment] = useState("");
  const [moderating, setModerating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, pendingRes] = await Promise.all([
        api.get("/publications/admin/stats"),
        api.get("/publications/admin/all?status=pending&page=1&limit=5"),
      ]);
      setStats(statsRes.data.stats);
      setPendingPubs(pendingRes.data.publications || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const openModerateDialog = (pub: any, action: string) => {
    setSelectedPub(pub);
    setModerateAction(action);
    setModerateComment("");
    setModerateDialog(true);
  };

  const handleModerate = async () => {
    if (
      ["revision", "reject"].includes(moderateAction) &&
      !moderateComment.trim()
    ) {
      toast.error(t("admin.comment_required", lang));
      return;
    }
    setModerating(true);
    try {
      await api.put(`/publications/admin/moderate/${selectedPub._id}`, {
        action: moderateAction,
        comment: moderateComment,
      });
      toast.success(t("common.success", lang));
      setModerateDialog(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setModerating(false);
    }
  };

  if (!user) return null;

  const totalPubs = stats?.totalPublications || 0;
  const published = stats?.byStatus?.published || 0;
  const pending = stats?.byStatus?.pending || 0;
  const revision = stats?.byStatus?.revision || 0;
  const rejected = stats?.byStatus?.rejected || 0;
  const totalUsers = stats?.totalUsers || 0;
  const approvalRate = totalPubs > 0 ? Math.round((published / totalPubs) * 100) : 0;

  const adminLinks = [
    {
      href: "/admin/publications",
      icon: RiFileTextLine,
      label: t("admin.publications", lang),
      desc: t("admin.manage_publications", lang),
      badge: pending > 0 ? pending : null,
      badgeColor: "bg-yellow-500",
    },
    {
      href: "/admin/users",
      icon: RiUserLine,
      label: t("admin.users", lang),
      desc: t("admin.manage_users", lang),
      badge: null,
      badgeColor: "",
    },
    {
      href: "/admin/universities",
      icon: RiBuildingLine,
      label: t("admin.universities", lang),
      desc: t("admin.manage_universities", lang),
      badge: null,
      badgeColor: "",
    },
    {
      href: "/admin/fields",
      icon: RiBookOpenLine,
      label: t("admin.fields", lang),
      desc: t("admin.manage_fields", lang),
      badge: null,
      badgeColor: "",
      superadminOnly: true,
    },
    {
      href: "/admin/stats",
      icon: RiBarChartLine,
      label: t("admin.stats", lang),
      desc: t("admin.platform_stats", lang),
      badge: null,
      badgeColor: "",
    },
  ];

  const visibleLinks = adminLinks.filter(
    (link) =>
      !("superadminOnly" in link && link.superadminOnly) ||
      user.role === "superadmin"
  );

  return (
    <div className="p-4 md:p-6">

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {t("admin.total_works", lang)}
                    </p>
                    <p className="text-3xl font-bold mt-1">{totalPubs}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <RiFileTextLine className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {t("admin.pending_review", lang)}
                    </p>
                    <p className="text-3xl font-bold mt-1 text-yellow-600">
                      {pending}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <RiTimeLine className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {t("admin.published_works", lang)}
                    </p>
                    <p className="text-3xl font-bold mt-1 text-green-600">
                      {published}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <RiCheckLine className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {t("admin.total_researchers", lang)}
                    </p>
                    <p className="text-3xl font-bold mt-1">{totalUsers}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <RiUserLine className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content: 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left column - Pending + Recent */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending works */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <RiAlertLine className="h-5 w-5 text-yellow-600" />
                      {t("admin.pending_works", lang)}
                      {pending > 0 && (
                        <Badge className="bg-yellow-500 text-white ml-2">
                          {pending}
                        </Badge>
                      )}
                    </CardTitle>
                    <Link href="/admin/publications">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        {t("admin.view_all", lang)} <RiArrowRightLine />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {pendingPubs.length > 0 ? (
                    <div className="space-y-3">
                      {pendingPubs.map((pub: any) => (
                        <div
                          key={pub._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-[10px] shrink-0">
                                {t(`type.${pub.type}`, lang)}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm line-clamp-1">
                              {getLocalizedField(pub.title, lang)}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {pub.author &&
                                `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`}
                              {" · "}
                              {new Date(pub.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Link href={`/publications/${pub._id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <RiEyeLine className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="h-8 bg-green-600 hover:bg-green-700 text-xs gap-1"
                              onClick={() => openModerateDialog(pub, "approve")}
                            >
                              <RiCheckLine className="h-3.5 w-3.5" />
                              {t("admin.approve", lang)}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs gap-1 text-orange-600 border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950"
                              onClick={() => openModerateDialog(pub, "revision")}
                            >
                              <RiEditLine className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs gap-1 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                              onClick={() => openModerateDialog(pub, "reject")}
                            >
                              <RiCloseLine className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <RiCheckLine className="h-10 w-10 mx-auto mb-2 text-green-500 opacity-50" />
                      <p className="text-sm">{t("admin.no_pending", lang)}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent submissions */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{t("admin.recent_submissions", lang)}</CardTitle>
                    <Link href="/admin/stats">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        {t("admin.view_all", lang)} <RiArrowRightLine />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {stats?.recentPublications?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium text-muted-foreground">
                              {t("pub.work_title", lang)}
                            </th>
                            <th className="text-left py-2 font-medium text-muted-foreground hidden md:table-cell">
                              {t("pub.author", lang)}
                            </th>
                            <th className="text-left py-2 font-medium text-muted-foreground">
                              {t("pub.status", lang)}
                            </th>
                            <th className="text-right py-2 font-medium text-muted-foreground hidden sm:table-cell">
                              {t("pub.date", lang)}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats.recentPublications.map((pub: any) => (
                            <tr key={pub._id} className="border-b last:border-0 hover:bg-accent/30">
                              <td className="py-2.5 pr-4">
                                <Link
                                  href={`/publications/${pub._id}`}
                                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                                >
                                  {getLocalizedField(pub.title, lang)}
                                </Link>
                              </td>
                              <td className="py-2.5 text-muted-foreground hidden md:table-cell">
                                {pub.author &&
                                  `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`}
                              </td>
                              <td className="py-2.5">
                                <Badge
                                  className={`${statusColors[pub.status] || ""} text-[10px]`}
                                  variant="secondary"
                                >
                                  {t(`status.${pub.status}`, lang)}
                                </Badge>
                              </td>
                              <td className="py-2.5 text-right text-muted-foreground text-xs hidden sm:table-cell">
                                {new Date(pub.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center py-4 text-muted-foreground text-sm">
                      {t("common.no_results", lang)}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column - Charts + Quick Links */}
            <div className="space-y-6">
              {/* Approval Rate */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t("admin.approval_rate", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 mb-3">
                    {approvalRate}%
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-green-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${approvalRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {published} / {totalPubs} {t("home.stats.publications", lang).toLowerCase()}
                  </p>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.status_distribution", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { key: "published", count: published },
                      { key: "pending", count: pending },
                      { key: "revision", count: revision },
                      { key: "rejected", count: rejected },
                    ].map((item) => {
                      const pct = totalPubs > 0 ? Math.round((item.count / totalPubs) * 100) : 0;
                      return (
                        <div key={item.key}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{t(`status.${item.key}`, lang)}</span>
                            <span className="font-medium">
                              {item.count}{" "}
                              <span className="text-muted-foreground text-xs">({pct}%)</span>
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className={`${statusBarColors[item.key]} h-full rounded-full transition-all duration-700`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Type Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("admin.type_distribution", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2.5">
                    {Object.entries(stats?.byType || {})
                      .sort(([, a]: any, [, b]: any) => b - a)
                      .map(([type, count]: [string, any]) => {
                        const pct = totalPubs > 0 ? Math.round((count / totalPubs) * 100) : 0;
                        return (
                          <div key={type}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>{t(`type.${type}`, lang)}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`${typeBarColors[type] || "bg-gray-400"} h-full rounded-full transition-all duration-700`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {t("admin.quick_actions", lang)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {visibleLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/30 group">
                    <CardContent className="pt-5 pb-4 text-center relative">
                      {link.badge && (
                        <span
                          className={`absolute top-2 right-2 ${link.badgeColor} text-white text-[10px] font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center`}
                        >
                          {link.badge}
                        </span>
                      )}
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                        <link.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium text-sm">{link.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {link.desc}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Moderation Dialog */}
      <Dialog open={moderateDialog} onOpenChange={setModerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {moderateAction === "approve"
                ? t("admin.approve", lang)
                : moderateAction === "revision"
                  ? t("admin.revision", lang)
                  : t("admin.reject", lang)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPub && (
              <p className="text-sm font-medium">
                {getLocalizedField(selectedPub.title, lang)}
              </p>
            )}
            {["revision", "reject"].includes(moderateAction) && (
              <div>
                <label className="text-sm font-medium">
                  {t("admin.comment", lang)} *
                </label>
                <Textarea
                  value={moderateComment}
                  onChange={(e) => setModerateComment(e.target.value)}
                  rows={3}
                  placeholder={t("admin.comment", lang) + "..."}
                  className="mt-1"
                />
              </div>
            )}
            {moderateAction === "approve" && (
              <p className="text-sm text-muted-foreground">
                {t("admin.approve_confirm", lang)}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModerateDialog(false)}>
              {t("common.cancel", lang)}
            </Button>
            <Button
              onClick={handleModerate}
              disabled={moderating}
              variant={moderateAction === "reject" ? "destructive" : "default"}
              className={
                moderateAction === "approve" ? "bg-green-600 hover:bg-green-700" : ""
              }
            >
              {moderating
                ? t("common.loading", lang)
                : moderateAction === "approve"
                  ? t("admin.approve", lang)
                  : moderateAction === "revision"
                    ? t("admin.revision", lang)
                    : t("admin.reject", lang)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
