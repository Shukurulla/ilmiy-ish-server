"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiAddLine, RiFileTextLine, RiEditLine, RiDeleteBinLine, RiEyeLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      const params = statusFilter ? `?status=${statusFilter}` : "";
      api.get(`/publications/my${params}`).then((res) => {
        setPublications(res.data.publications || []);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [user, statusFilter]);

  const handleDelete = async (pubId: string) => {
    if (!confirm(t("dashboard.confirm_delete", lang))) return;
    try {
      await api.delete(`/publications/${pubId}`);
      setPublications(publications.filter((p) => p._id !== pubId));
      toast.success(t("common.success", lang));
    } catch {
      toast.error(t("common.error", lang));
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    revision: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  if (authLoading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboard.title", lang)}</h1>
          <p className="text-muted-foreground mt-1">
            {t("dashboard.welcome", lang)}, {getLocalizedField(user.firstName, lang)}!
          </p>
        </div>
        <Link href="/dashboard/new-publication">
          <Button className="gap-2"><RiAddLine /> {t("pub.add_new", lang)}</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: t("filter.all", lang), value: publications.length, color: "text-primary" },
          { label: t("status.published", lang), value: publications.filter((p) => p.status === "published").length, color: "text-green-600" },
          { label: t("status.pending", lang), value: publications.filter((p) => p.status === "pending").length, color: "text-yellow-600" },
          { label: t("status.revision", lang), value: publications.filter((p) => p.status === "revision").length, color: "text-orange-600" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-4 pb-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Publications Tab */}
      <Tabs defaultValue="" onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="">{t("filter.all", lang)}</TabsTrigger>
          <TabsTrigger value="published">{t("status.published", lang)}</TabsTrigger>
          <TabsTrigger value="pending">{t("status.pending", lang)}</TabsTrigger>
          <TabsTrigger value="revision">{t("status.revision", lang)}</TabsTrigger>
          <TabsTrigger value="rejected">{t("status.rejected", lang)}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)
        ) : publications.length > 0 ? (
          publications.map((pub: any) => (
            <Card key={pub._id} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={statusColors[pub.status]} variant="secondary">
                        {t(`status.${pub.status}`, lang)}
                      </Badge>
                      <Badge variant="outline">{t(`type.${pub.type}`, lang)}</Badge>
                    </div>
                    <h3 className="font-medium line-clamp-1">{getLocalizedField(pub.title, lang)}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pub.publicationYear} · {new Date(pub.createdAt).toLocaleDateString()}
                    </p>
                    {pub.moderationHistory?.length > 0 && pub.status === "revision" && (
                      <p className="text-xs text-orange-600 mt-1">
                        {t("dashboard.revision_comment", lang)}: {pub.moderationHistory[pub.moderationHistory.length - 1]?.comment}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/publications/${pub._id}`}>
                      <Button variant="ghost" size="icon"><RiEyeLine className="h-4 w-4" /></Button>
                    </Link>
                    {["pending", "revision"].includes(pub.status) && (
                      <Link href={`/dashboard/new-publication?edit=${pub._id}`}>
                        <Button variant="ghost" size="icon"><RiEditLine className="h-4 w-4" /></Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(pub._id)} className="text-destructive">
                      <RiDeleteBinLine className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <RiFileTextLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p>{t("common.no_results", lang)}</p>
            <Link href="/dashboard/new-publication">
              <Button className="mt-4 gap-2"><RiAddLine /> {t("pub.add_new", lang)}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
