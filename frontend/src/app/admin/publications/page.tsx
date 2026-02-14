"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiCheckLine, RiCloseLine, RiEditLine, RiEyeLine, RiArrowLeftLine, RiDownloadLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

export default function AdminPublicationsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });

  // Moderation dialog
  const [moderateDialog, setModerateDialog] = useState(false);
  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [moderateAction, setModerateAction] = useState("");
  const [moderateComment, setModerateComment] = useState("");
  const [moderating, setModerating] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else if (!["admin", "superadmin"].includes(user.role)) router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/publications/admin/all?status=${statusFilter}&page=${page}&limit=20`);
      setPublications(res.data.publications || []);
      setPagination(res.data.pagination || { total: 0, pages: 0 });
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => {
    if (user && ["admin", "superadmin"].includes(user.role)) fetchPublications();
  }, [user, statusFilter, page]);

  const openModerateDialog = (pub: any, action: string) => {
    setSelectedPub(pub);
    setModerateAction(action);
    setModerateComment("");
    setModerateDialog(true);
  };

  const handleModerate = async () => {
    if (["revision", "reject"].includes(moderateAction) && !moderateComment.trim()) {
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
      fetchPublications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setModerating(false);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    revision: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  if (authLoading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user || !["admin", "superadmin"].includes(user.role)) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin"><Button variant="ghost" size="icon"><RiArrowLeftLine /></Button></Link>
        <h1 className="text-2xl font-bold">{t("admin.publications", lang)}</h1>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">{t("status.pending", lang)}</SelectItem>
            <SelectItem value="published">{t("status.published", lang)}</SelectItem>
            <SelectItem value="revision">{t("status.revision", lang)}</SelectItem>
            <SelectItem value="rejected">{t("status.rejected", lang)}</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{t("common.total", lang)}: {pagination.total}</span>
      </div>

      {/* Publications */}
      {loading ? (
        [...Array(5)].map((_, i) => <Skeleton key={i} className="h-28 mb-3" />)
      ) : publications.length > 0 ? (
        <div className="space-y-4">
          {publications.map((pub: any) => (
            <Card key={pub._id}>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={statusColors[pub.status]} variant="secondary">{t(`status.${pub.status}`, lang)}</Badge>
                      <Badge variant="outline">{t(`type.${pub.type}`, lang)}</Badge>
                    </div>
                    <h3 className="font-medium line-clamp-2">{getLocalizedField(pub.title, lang)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pub.author && `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`}
                      {" · "}{pub.publicationYear}{" · "}{new Date(pub.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/publications/${pub._id}`}>
                      <Button variant="outline" size="sm" className="gap-1"><RiEyeLine /> {t("pub.view", lang)}</Button>
                    </Link>
                    {pub.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => openModerateDialog(pub, "approve")} className="gap-1 bg-green-600 hover:bg-green-700">
                          <RiCheckLine /> {t("admin.approve", lang)}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openModerateDialog(pub, "revision")} className="gap-1 text-orange-600 border-orange-600 hover:bg-orange-50">
                          <RiEditLine /> {t("admin.revision", lang)}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => openModerateDialog(pub, "reject")} className="gap-1">
                          <RiCloseLine /> {t("admin.reject", lang)}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>{t("common.previous", lang)}</Button>
              <span className="flex items-center px-4 text-sm">{page} / {pagination.pages}</span>
              <Button variant="outline" disabled={page === pagination.pages} onClick={() => setPage(page + 1)}>{t("common.next", lang)}</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}

      {/* Moderation Dialog */}
      <Dialog open={moderateDialog} onOpenChange={setModerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {moderateAction === "approve" ? t("admin.approve", lang) : moderateAction === "revision" ? t("admin.revision", lang) : t("admin.reject", lang)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPub && (
              <p className="text-sm font-medium">{getLocalizedField(selectedPub.title, lang)}</p>
            )}
            {["revision", "reject"].includes(moderateAction) && (
              <div>
                <label className="text-sm font-medium">{t("admin.comment", lang)} *</label>
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
            <Button variant="outline" onClick={() => setModerateDialog(false)}>{t("common.cancel", lang)}</Button>
            <Button
              onClick={handleModerate}
              disabled={moderating}
              variant={moderateAction === "reject" ? "destructive" : "default"}
              className={moderateAction === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {moderating ? t("common.loading", lang) : (moderateAction === "approve" ? t("admin.approve", lang) : moderateAction === "revision" ? t("admin.revision", lang) : t("admin.reject", lang))}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
