"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiUserLine,
  RiLockLine,
  RiLockUnlockLine,
  RiSearchLine,
  RiExternalLinkLine,
  RiCalendarLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace("/api", "");

const roleColors: Record<string, string> = {
  superadmin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  admin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  researcher: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

interface University {
  _id: string;
  name: { uz: string; ru: string; en: string };
}

export default function AdminUsersPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [universities, setUniversities] = useState<University[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });

  // Fetch universities for filter
  useEffect(() => {
    if (user && user.role === "superadmin") {
      api
        .get("/universities")
        .then((res) => setUniversities(res.data.universities || []))
        .catch(() => {});
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      if (universityFilter !== "all") params.set("university", universityFilter);
      params.set("page", page.toString());
      const res = await api.get(`/users/admin/all?${params}`);
      setUsers(res.data.users || []);
      setPagination(res.data.pagination || { total: 0, pages: 0 });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, roleFilter, universityFilter, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const toggleStatus = async (userId: string) => {
    try {
      await api.put(`/users/admin/toggle-status/${userId}`);
      fetchUsers();
      toast.success(t("common.success", lang));
    } catch {
      toast.error(t("common.error", lang));
    }
  };

  const changeRole = async (userId: string, role: string) => {
    try {
      await api.put(`/users/admin/change-role/${userId}`, { role });
      fetchUsers();
      toast.success(t("common.success", lang));
    } catch {
      toast.error(t("common.error", lang));
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
              placeholder={t("researchers.search_placeholder", lang)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">{t("home.search_btn", lang)}</Button>
        </form>

        <div className="flex gap-2 flex-wrap">
          <Select
            value={roleFilter || "all"}
            onValueChange={(v) => {
              setRoleFilter(v === "all" ? "" : v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("filter.type", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="researcher">{t("admin.researcher", lang)}</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="superadmin">Super Admin</SelectItem>
            </SelectContent>
          </Select>

          {user.role === "superadmin" && universities.length > 0 && (
            <Select
              value={universityFilter}
              onValueChange={(v) => {
                setUniversityFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue
                  placeholder={
                    lang === "uz"
                      ? "Universitet"
                      : lang === "ru"
                      ? "Университет"
                      : "University"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
                {universities.map((u) => (
                  <SelectItem key={u._id} value={u._id}>
                    {getLocalizedField(u.name, lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : users.length > 0 ? (
        <div className="space-y-3">
          {users.map((u: any) => (
            <Card key={u._id} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* User info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage
                        src={u.avatar ? `${API_BASE}${u.avatar}` : undefined}
                      />
                      <AvatarFallback className="text-sm bg-primary/10 text-primary">
                        {(getLocalizedField(u.lastName, lang)?.[0] || "") +
                          (getLocalizedField(u.firstName, lang)?.[0] || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      {/* Name and badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">
                          {getLocalizedField(u.lastName, lang)}{" "}
                          {getLocalizedField(u.firstName, lang)}
                        </span>
                        <Badge
                          className={`text-xs ${roleColors[u.role] || ""}`}
                          variant="secondary"
                        >
                          {u.role}
                        </Badge>
                        {!u.isActive && (
                          <Badge variant="destructive" className="text-xs">
                            {t("admin.blocked", lang)}
                          </Badge>
                        )}
                      </div>

                      {/* Email */}
                      <p className="text-sm text-muted-foreground">{u.email}</p>

                      {/* Academic info */}
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {u.academicDegree && u.academicDegree !== "none" && (
                          <Badge variant="outline" className="text-xs font-normal">
                            {t(`degree.${u.academicDegree}`, lang)}
                          </Badge>
                        )}
                        {u.academicTitle && u.academicTitle !== "none" && (
                          <Badge variant="outline" className="text-xs font-normal">
                            {t(`title.${u.academicTitle}`, lang)}
                          </Badge>
                        )}
                      </div>

                      {/* University and date */}
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-muted-foreground">
                        {u.university && (
                          <span>
                            {typeof u.university === "object"
                              ? getLocalizedField(u.university.name, lang)
                              : u.university}
                          </span>
                        )}
                        {u.createdAt && (
                          <span className="flex items-center gap-1">
                            <RiCalendarLine className="h-3 w-3" />
                            {t("admin.registered", lang)}:{" "}
                            {new Date(u.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <Link href={`/researchers/${u._id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs"
                      >
                        <RiExternalLinkLine className="h-3 w-3" />
                        {t("admin.view_profile", lang)}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(u._id)}
                      className="gap-1 text-xs"
                    >
                      {u.isActive ? (
                        <RiLockLine className="h-3 w-3" />
                      ) : (
                        <RiLockUnlockLine className="h-3 w-3" />
                      )}
                      {u.isActive
                        ? t("admin.block", lang)
                        : t("admin.unblock", lang)}
                    </Button>
                    {user.role === "superadmin" &&
                      u._id !== user.id &&
                      u._id !== (user as any)._id && (
                        <Select
                          value={u.role}
                          onValueChange={(v) => changeRole(u._id, v)}
                        >
                          <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="superadmin">Super Admin</SelectItem>
                          </SelectContent>
                        </Select>
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
          <RiUserLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}
    </div>
  );
}
