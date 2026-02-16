"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RiSearchLine, RiUserLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { staticAuthor, staticPublications } from "@/lib/static-data";
import api from "@/lib/api";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
    "/api",
    ""
  );

interface Researcher {
  _id: string;
  firstName: { uz: string; ru: string; en: string };
  lastName: { uz: string; ru: string; en: string };
  academicDegree?: string;
  academicTitle?: string;
  avatar?: string;
  university?: { _id: string; name: { uz: string; ru: string; en: string } };
  scientificFields?: {
    _id: string;
    name: { uz: string; ru: string; en: string };
    code: string;
  }[];
  publicationStats?: { total?: number };
}

export default function ResearchersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("all");
  const [titleFilter, setTitleFilter] = useState("all");
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchResearchers = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "20" };
      if (search) params.search = search;
      if (degree !== "all") params.degree = degree;
      if (titleFilter !== "all") params.title = titleFilter;

      const res = await api.get("/users/researchers", { params });
      setResearchers(res.data.users || []);
      setTotal(res.data.pagination?.total || 0);
      setTotalPages(res.data.pagination?.pages || 1);
      setUsingFallback(false);
    } catch {
      // Fallback to static data
      const staticResearchers: Researcher[] = [
        {
          _id: "turdimambetov",
          firstName: staticAuthor.firstName,
          lastName: staticAuthor.lastName,
          academicDegree: staticAuthor.academicDegree,
          academicTitle: staticAuthor.academicTitle,
          university: staticAuthor.university as any,
          publicationStats: { total: staticPublications.length },
        },
      ];

      let filtered = staticResearchers;
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.firstName.uz.toLowerCase().includes(q) ||
            r.firstName.ru.toLowerCase().includes(q) ||
            r.lastName.uz.toLowerCase().includes(q) ||
            r.lastName.ru.toLowerCase().includes(q)
        );
      }
      if (degree !== "all")
        filtered = filtered.filter((r) => r.academicDegree === degree);
      if (titleFilter !== "all")
        filtered = filtered.filter((r) => r.academicTitle === titleFilter);

      setResearchers(filtered);
      setTotal(filtered.length);
      setTotalPages(1);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [search, degree, titleFilter, page]);

  useEffect(() => {
    fetchResearchers();
  }, [fetchResearchers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchResearchers();
  };

  const getAvatarUrl = (user: Researcher) => {
    if (usingFallback && user._id === "turdimambetov") return "/turdimambetov.png";
    if (user.avatar) return `${API_BASE}${user.avatar}`;
    return undefined;
  };

  const getResearcherLink = (user: Researcher) => {
    if (usingFallback && user._id === "turdimambetov")
      return "/researchers/turdimambetov";
    return `/researchers/${user._id}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {t("nav.researchers", lang)}
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

        <div className="flex gap-2">
          <Select
            value={degree}
            onValueChange={(v) => {
              setDegree(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("filter.degree", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="PhD">{t("degree.PhD", lang)}</SelectItem>
              <SelectItem value="DSc">{t("degree.DSc", lang)}</SelectItem>
              <SelectItem value="candidate">
                {t("degree.candidate", lang)}
              </SelectItem>
              <SelectItem value="doctor">
                {t("degree.doctor", lang)}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={titleFilter}
            onValueChange={(v) => {
              setTitleFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("filter.title_rank", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="docent">
                {t("title.docent", lang)}
              </SelectItem>
              <SelectItem value="professor">
                {t("title.professor", lang)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 text-center">
                <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : researchers.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {t("common.total", lang)}: {total}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {researchers.map((user) => (
              <Link key={user._id} href={getResearcherLink(user)}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage
                        src={getAvatarUrl(user)}
                        alt={getLocalizedField(user.lastName, lang)}
                      />
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {(getLocalizedField(user.lastName, lang)?.[0] || "") +
                          (getLocalizedField(user.firstName, lang)?.[0] || "")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">
                      {getLocalizedField(user.lastName, lang)}{" "}
                      {getLocalizedField(user.firstName, lang)}
                    </h3>
                    {user.academicDegree &&
                      user.academicDegree !== "none" && (
                        <Badge variant="secondary" className="mb-2">
                          {t(`degree.${user.academicDegree}`, lang)}
                        </Badge>
                      )}
                    {user.academicTitle &&
                      user.academicTitle !== "none" && (
                        <Badge variant="outline" className="ml-1 mb-2">
                          {t(`title.${user.academicTitle}`, lang)}
                        </Badge>
                      )}
                    {user.scientificFields &&
                      user.scientificFields.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                          {user.scientificFields.slice(0, 2).map((sf) => (
                            <span
                              key={sf._id}
                              className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
                            >
                              {sf.code} - {getLocalizedField(sf.name, lang)}
                            </span>
                          ))}
                          {user.scientificFields.length > 2 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{user.scientificFields.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    {user.university && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {getLocalizedField(user.university.name, lang)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("researchers.works_count", lang)}:{" "}
                      {user.publicationStats?.total || 0}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t("common.previous", lang)}
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t("common.next", lang)}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <RiUserLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}
    </div>
  );
}
