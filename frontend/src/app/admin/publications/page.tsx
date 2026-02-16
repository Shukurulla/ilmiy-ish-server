"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiEyeLine,
  RiSearchLine,
  RiDownloadLine,
  RiEyeFill,
  RiFileTextLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  revision: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function AdminPublicationsPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });

  // Moderation dialog
  const [moderateDialog, setModerateDialog] = useState(false);
  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [moderateAction, setModerateAction] = useState("");
  const [moderateComment, setModerateComment] = useState("");
  const [moderating, setModerating] = useState(false);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("status", statusFilter);
      params.set("page", page.toString());
      params.set("limit", "20");
      if (typeFilter !== "all") params.set("type", typeFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await api.get(`/publications/admin/all?${params}`);
      setPublications(res.data.publications || []);
      setPagination(res.data.pagination || { total: 0, pages: 0 });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPublications();
  }, [user, statusFilter, typeFilter, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPublications();
  };

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
      fetchPublications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setModerating(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {t("common.total", lang)}: {pagination.total}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                lang === "uz"
                  ? "Sarlavha bo'yicha qidirish..."
                  : lang === "ru"
                  ? "Поиск по названию..."
                  : "Search by title..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">{t("home.search_btn", lang)}</Button>
        </form>

        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">{t("status.pending", lang)}</SelectItem>
              <SelectItem value="published">{t("status.published", lang)}</SelectItem>
              <SelectItem value="revision">{t("status.revision", lang)}</SelectItem>
              <SelectItem value="rejected">{t("status.rejected", lang)}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filter.type", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="dissertation">{t("type.dissertation", lang)}</SelectItem>
              <SelectItem value="abstract">{t("type.abstract", lang)}</SelectItem>
              <SelectItem value="article">{t("type.article", lang)}</SelectItem>
              <SelectItem value="monograph">{t("type.monograph", lang)}</SelectItem>
              <SelectItem value="textbook">{t("type.textbook", lang)}</SelectItem>
              <SelectItem value="manual">{t("type.manual", lang)}</SelectItem>
              <SelectItem value="conference_thesis">{t("type.conference_thesis", lang)}</SelectItem>
              <SelectItem value="other">{t("type.other", lang)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Publications */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : publications.length > 0 ? (
        <div className="space-y-4">
          {publications.map((pub: any) => (
            <Card key={pub._id} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Status and type badges */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge
                        className={statusColors[pub.status]}
                        variant="secondary"
                      >
                        {t(`status.${pub.status}`, lang)}
                      </Badge>
                      <Badge variant="outline">{t(`type.${pub.type}`, lang)}</Badge>
                      {pub.publicationYear && (
                        <span className="text-xs text-muted-foreground">
                          {pub.publicationYear}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-medium line-clamp-2 mb-1.5">
                      {getLocalizedField(pub.title, lang)}
                    </h3>

                    {/* Author info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {pub.author && (
                        <span>
                          {getLocalizedField(pub.author.lastName, lang)}{" "}
                          {getLocalizedField(pub.author.firstName, lang)}
                        </span>
                      )}
                      {pub.author?.email && (
                        <span className="text-xs">{pub.author.email}</span>
                      )}
                      <span className="text-xs">
                        {new Date(pub.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <RiEyeFill className="h-3 w-3" />
                        {pub.viewCount || 0}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <RiDownloadLine className="h-3 w-3" />
                        {pub.downloadCount || 0}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <Link href={`/publications/${pub._id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <RiEyeLine className="h-3.5 w-3.5" /> {t("pub.view", lang)}
                      </Button>
                    </Link>
                    {pub.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => openModerateDialog(pub, "approve")}
                          className="gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <RiCheckLine className="h-3.5 w-3.5" />{" "}
                          {t("admin.approve", lang)}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModerateDialog(pub, "revision")}
                          className="gap-1 text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
                        >
                          <RiEditLine className="h-3.5 w-3.5" />{" "}
                          {t("admin.revision", lang)}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openModerateDialog(pub, "reject")}
                          className="gap-1"
                        >
                          <RiCloseLine className="h-3.5 w-3.5" />{" "}
                          {t("admin.reject", lang)}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {t("common.previous", lang)}
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                {page} / {pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === pagination.pages}
                onClick={() => setPage(page + 1)}
              >
                {t("common.next", lang)}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <RiFileTextLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
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
                moderateAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
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
