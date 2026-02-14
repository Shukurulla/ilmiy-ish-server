"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { searchStaticPublications } from "@/lib/static-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  RiSearchLine,
  RiFilterLine,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";

const typeColors: Record<string, string> = {
  dissertation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  article: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  monograph: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  textbook: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  conference_thesis: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  other: "bg-muted text-muted-foreground",
};

interface Publication {
  _id: string;
  title: { uz: string; ru: string; en: string };
  author: string;
  type: string;
  year: number;
  annotation: { uz: string; ru: string; en: string };
  language?: string;
  journalType?: string;
  quartile?: string;
}

interface SearchResponse {
  publications: Publication[];
  total: number;
  page: number;
  totalPages: number;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLangStore();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [language, setLanguage] = useState("");
  const [journalType, setJournalType] = useState("");
  const [quartile, setQuartile] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const limit = 12;

  const publicationTypes = [
    "dissertation",
    "article",
    "monograph",
    "textbook",
    "conference_thesis",
    "other",
  ];

  const languages = ["uz", "ru", "en"];
  const journalTypes = ["scopus", "web_of_science", "other"];
  const quartiles = ["Q1", "Q2", "Q3", "Q4"];

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  useEffect(() => {
    performSearch();
  }, [searchQuery, selectedTypes, yearFrom, yearTo, language, journalType, quartile, sortBy, currentPage]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const result = searchStaticPublications({
        search: searchQuery || undefined,
        type: selectedTypes.length > 0 ? selectedTypes.join(",") : undefined,
        yearFrom: yearFrom || undefined,
        yearTo: yearTo || undefined,
        language: language || undefined,
        journalType: journalType || undefined,
        quartile: quartile || undefined,
        sort: sortBy,
        page: currentPage,
        limit,
      });
      setResults(result as any);
    } catch (error) {
      console.error("Search error:", error);
      setResults({ publications: [], total: 0, page: 1, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setYearFrom("");
    setYearTo("");
    setLanguage("");
    setJournalType("");
    setQuartile("");
    setCurrentPage(1);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg">{t("search.filters", lang)}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="w-full mb-4"
        >
          <RiCloseLine className="mr-2" />
          {t("filter.clear", lang)}
        </Button>
      </div>

      <div>
        <h4 className="font-medium mb-2">{t("pub.type", lang)}</h4>
        <div className="space-y-2">
          {publicationTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">{t(`type.${type}`, lang)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">{t("search.year_range", lang)}</h4>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder={t("search.from", lang)}
            value={yearFrom}
            onChange={(e) => {
              setYearFrom(e.target.value);
              setCurrentPage(1);
            }}
            min="1900"
            max={new Date().getFullYear()}
          />
          <Input
            type="number"
            placeholder={t("search.to", lang)}
            value={yearTo}
            onChange={(e) => {
              setYearTo(e.target.value);
              setCurrentPage(1);
            }}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">{t("filter.language", lang)}</h4>
        <Select
          value={language}
          onValueChange={(value) => {
            setLanguage(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("search.select_language", lang)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
            {languages.map((l) => (
              <SelectItem key={l} value={l}>
                {l === "uz" ? "O'zbekcha" : l === "ru" ? "Русский" : "English"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="font-medium mb-2">{t("filter.journal_type", lang)}</h4>
        <Select
          value={journalType}
          onValueChange={(value) => {
            setJournalType(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("search.select_journal_type", lang)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
            {journalTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`journal.${type}`, lang)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h4 className="font-medium mb-2">{t("filter.quartile", lang)}</h4>
        <Select
          value={quartile}
          onValueChange={(value) => {
            setQuartile(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("search.select_quartile", lang)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filter.all", lang)}</SelectItem>
            {quartiles.map((q) => (
              <SelectItem key={q} value={q}>
                {q}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {t("search.title", lang)}
          </h1>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xl" />
              <Input
                type="text"
                placeholder={t("home.search_placeholder", lang)}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="lg">
                  <RiFilterLine className="mr-2" />
                  {t("search.filters", lang)}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetTitle className="sr-only">Filters</SheetTitle>
                <FiltersContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-8">
              <FiltersContent />
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-muted-foreground">
                {loading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  <span>
                    {t("search.results_found", lang)}: <strong className="text-foreground">{results?.total || 0}</strong>
                  </span>
                )}
              </div>

              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("filter.newest", lang)}</SelectItem>
                  <SelectItem value="oldest">{t("filter.oldest", lang)}</SelectItem>
                  <SelectItem value="name">{t("filter.by_name", lang)}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </Card>
                ))}
              </div>
            ) : results && results.publications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.publications.map((publication) => (
                  <Card
                    key={publication._id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/publications/static/${publication._id}`)}
                  >
                    <div className="mb-3">
                      <Badge className={typeColors[publication.type] || typeColors.other}>
                        {t(`type.${publication.type}`, lang)}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {getLocalizedField(publication.title, lang)}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3">
                      {typeof publication.author === "object"
                        ? `${getLocalizedField((publication.author as any).lastName, lang)} ${getLocalizedField((publication.author as any).firstName, lang)}`
                        : publication.author}{" "}
                      • {(publication as any).publicationYear || (publication as any).year}
                    </p>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {getLocalizedField(publication.annotation, lang)}
                    </p>

                    {publication.quartile && (
                      <div className="mt-4">
                        <Badge variant="outline">{publication.quartile}</Badge>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <RiSearchLine className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-xl font-semibold mb-2">
                  {t("common.no_results", lang)}
                </h3>
                <p className="text-muted-foreground">
                  {t("search.try_different", lang)}
                </p>
              </div>
            )}

            {/* Pagination */}
            {results && results.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <RiArrowLeftLine />
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: results.totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      const distance = Math.abs(page - currentPage);
                      return (
                        page === 1 ||
                        page === results.totalPages ||
                        distance <= 1
                      );
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span
                            key={`ellipsis-${page}`}
                            className="px-3 py-2 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(results.totalPages, prev + 1))}
                  disabled={currentPage === results.totalPages}
                >
                  <RiArrowRightLine />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-12 w-96 mx-auto" />
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
