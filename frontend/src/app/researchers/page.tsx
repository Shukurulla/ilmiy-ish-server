"use client";

import { useState } from "react";
import Link from "next/link";
import { RiSearchLine, RiUserLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { staticAuthor, staticPublications } from "@/lib/static-data";

export default function ResearchersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = useState("");
  const [degree, setDegree] = useState("all");
  const [titleFilter, setTitleFilter] = useState("all");

  const staticResearchers = [
    {
      _id: "turdimambetov",
      firstName: staticAuthor.firstName,
      lastName: staticAuthor.lastName,
      academicDegree: staticAuthor.academicDegree,
      academicTitle: staticAuthor.academicTitle,
      scientificField: {
        uz: "Тиббиёт географияси ва нозогеография",
        ru: "Медицинская география и нозогеография",
        en: "Medical geography and nosogeography",
      },
      university: staticAuthor.university,
      publicationStats: { total: staticPublications.length },
    },
  ];

  const filtered = staticResearchers.filter((r) => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        r.firstName.uz.toLowerCase().includes(q) ||
        r.firstName.ru.toLowerCase().includes(q) ||
        r.firstName.en.toLowerCase().includes(q) ||
        r.lastName.uz.toLowerCase().includes(q) ||
        r.lastName.ru.toLowerCase().includes(q) ||
        r.lastName.en.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (degree !== "all" && r.academicDegree !== degree) return false;
    if (titleFilter !== "all" && r.academicTitle !== titleFilter) return false;
    return true;
  });

  const researchers = filtered;
  const loading = false;
  const pagination = { total: filtered.length, pages: 1 };
  const page = 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("nav.researchers", lang)}</h1>

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
          <Select value={degree} onValueChange={(v) => { setDegree(v); }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("filter.degree", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="PhD">{t("degree.PhD", lang)}</SelectItem>
              <SelectItem value="DSc">{t("degree.DSc", lang)}</SelectItem>
              <SelectItem value="candidate">{t("degree.candidate", lang)}</SelectItem>
              <SelectItem value="doctor">{t("degree.doctor", lang)}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={titleFilter} onValueChange={(v) => { setTitleFilter(v); }}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("filter.title_rank", lang)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
              <SelectItem value="docent">{t("title.docent", lang)}</SelectItem>
              <SelectItem value="professor">{t("title.professor", lang)}</SelectItem>
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
            {t("common.total", lang)}: {pagination.total}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {researchers.map((user: any) => (
              <Link key={user._id} href={`/researchers/${user._id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarFallback className="text-lg bg-primary/10 text-primary">
                        {(getLocalizedField(user.lastName, lang)?.[0] || "") + (getLocalizedField(user.firstName, lang)?.[0] || "")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">
                      {getLocalizedField(user.lastName, lang)} {getLocalizedField(user.firstName, lang)}
                    </h3>
                    {user.academicDegree && user.academicDegree !== "none" && (
                      <Badge variant="secondary" className="mb-2">
                        {t(`degree.${user.academicDegree}`, lang)}
                      </Badge>
                    )}
                    {user.academicTitle && user.academicTitle !== "none" && (
                      <Badge variant="outline" className="ml-1 mb-2">
                        {t(`title.${user.academicTitle}`, lang)}
                      </Badge>
                    )}
                    {user.scientificField && (
                      <p className="text-xs text-muted-foreground mt-1">{typeof user.scientificField === "object" ? getLocalizedField(user.scientificField, lang) : user.scientificField}</p>
                    )}
                    {user.university && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {getLocalizedField(user.university.name, lang)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("researchers.works_count", lang)}: {user.publicationStats?.total || 0}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
                {t("common.previous", lang)}
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                {page} / {pagination.pages}
              </span>
              <Button variant="outline" disabled={page === pagination.pages} onClick={() => setPage(page + 1)}>
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
