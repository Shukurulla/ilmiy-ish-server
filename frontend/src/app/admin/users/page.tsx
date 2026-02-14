"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftLine, RiUserLine, RiShieldLine, RiLockLine, RiLockUnlockLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else if (!["admin", "superadmin"].includes(user.role)) router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      params.set("page", page.toString());
      const res = await api.get(`/users/admin/all?${params}`);
      setUsers(res.data.users || []);
      setPagination(res.data.pagination || { total: 0, pages: 0 });
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => {
    if (user && ["admin", "superadmin"].includes(user.role)) fetchUsers();
  }, [user, roleFilter, page]);

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
    } catch { toast.error(t("common.error", lang)); }
  };

  const changeRole = async (userId: string, role: string) => {
    try {
      await api.put(`/users/admin/change-role/${userId}`, { role });
      fetchUsers();
      toast.success(t("common.success", lang));
    } catch { toast.error(t("common.error", lang)); }
  };

  if (authLoading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user || !["admin", "superadmin"].includes(user.role)) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin"><Button variant="ghost" size="icon"><RiArrowLeftLine /></Button></Link>
        <h1 className="text-2xl font-bold">{t("admin.users", lang)}</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input placeholder={t("researchers.search_placeholder", lang)} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button type="submit">{t("home.search_btn", lang)}</Button>
        </form>
        <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder={t("filter.type", lang)} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
            <SelectItem value="researcher">{t("admin.researcher", lang)}</SelectItem>
            <SelectItem value="admin">{lang === "uz" ? "Admin" : "Admin"}</SelectItem>
            <SelectItem value="superadmin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{t("common.total", lang)}: {pagination.total}</p>

      {loading ? (
        [...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 mb-3" />)
      ) : users.length > 0 ? (
        <div className="space-y-3">
          {users.map((u: any) => (
            <Card key={u._id}>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={u.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${u.avatar}` : undefined} />
                      <AvatarFallback className="text-xs">{(getLocalizedField(u.firstName, lang)?.[0] || "") + (getLocalizedField(u.lastName, lang)?.[0] || "")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{getLocalizedField(u.lastName, lang)} {getLocalizedField(u.firstName, lang)}</span>
                        <Badge variant={u.role === "superadmin" ? "default" : u.role === "admin" ? "secondary" : "outline"} className="text-xs">
                          {u.role}
                        </Badge>
                        {!u.isActive && <Badge variant="destructive" className="text-xs">{t("admin.blocked", lang)}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(u._id)} className="gap-1">
                      {u.isActive ? <RiLockLine className="h-3 w-3" /> : <RiLockUnlockLine className="h-3 w-3" />}
                      {u.isActive ? t("admin.block", lang) : t("admin.unblock", lang)}
                    </Button>
                    {user.role === "superadmin" && u._id !== user.id && u._id !== user._id && (
                      <Select value={u.role} onValueChange={(v) => changeRole(u._id, v)}>
                        <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
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
          <RiUserLine className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}
    </div>
  );
}
