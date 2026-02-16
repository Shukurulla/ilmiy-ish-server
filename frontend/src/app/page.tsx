"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiSearchLine,
  RiBookOpenLine,
  RiUserLine,
  RiArrowRightLine,
  RiFileTextLine,
  RiShieldCheckLine,
  RiGraduationCapLine,
  RiArticleLine,
  RiBookLine,
  RiBook2Line,
  RiSlideshowLine,
  RiBookmarkLine,
  RiUserAddLine,
  RiUploadCloud2Line,
  RiCheckDoubleLine,
  RiGlobalLine,
  RiEyeLine,
  RiDownloadLine,
  RiBuilding2Line,
  RiTeamLine,
  RiFlashlightLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { staticPublications, staticAuthor } from "@/lib/static-data";
import api from "@/lib/api";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace("/api", "");

/* ── AnimatedCounter ─────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary">
      {count}
      {suffix}
    </div>
  );
}

/* ── ScrollFadeIn ────────────────────────────────────── */
function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const { lang } = useLangStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    publications: 0,
    researchers: 0,
    universities: 0,
    downloads: 0,
  });
  const [recentPubs, setRecentPubs] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [topResearchers, setTopResearchers] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, researcherRes] = await Promise.all([
          api.get("/publications/search", {
            params: { limit: 6, sort: "newest" },
          }),
          api.get("/users/researchers", { params: { limit: 4 } }),
        ]);

        const pubs = pubRes.data.publications || [];
        const pubTotal = pubRes.data.pagination?.total || pubs.length;
        const researchers = researcherRes.data.researchers || [];
        const researcherTotal =
          researcherRes.data.pagination?.total || researchers.length;

        setTopResearchers(researchers);

        // Calculate total downloads
        let totalDownloads = 0;
        for (const p of pubs) {
          totalDownloads += p.downloadCount || 0;
        }

        setStats({
          publications: pubTotal,
          researchers: researcherTotal,
          universities: 1,
          downloads: totalDownloads || 500,
        });

        setRecentPubs(pubs);

        // Fetch category counts
        const types = [
          "dissertation",
          "article",
          "monograph",
          "textbook",
          "conference_thesis",
          "manual",
        ];
        const counts: Record<string, number> = {};
        const typeResults = await Promise.all(
          types.map((type) =>
            api
              .get("/publications/search", { params: { type, limit: 1 } })
              .then((r) => ({
                type,
                count: r.data.pagination?.total || 0,
              }))
              .catch(() => ({ type, count: 0 }))
          )
        );
        for (const r of typeResults) {
          counts[r.type] = r.count;
        }
        setCategoryCounts(counts);

        // Fetch universities
        try {
          const uniRes = await api.get("/universities");
          setUniversities(uniRes.data || []);
        } catch {
          setUniversities([
            {
              _id: "karsu",
              name: {
                uz: "Berdax nomidagi Qoraqalpoq davlat universiteti",
                ru: "Каракалпакский государственный университет имени Бердаха",
                en: "Karakalpak State University named after Berdakh",
              },
            },
          ]);
        }
      } catch {
        // Fallback to static data
        const sorted = [...staticPublications]
          .sort((a, b) => b.publicationYear - a.publicationYear)
          .slice(0, 6);
        setRecentPubs(sorted);

        let totalDownloads = 0;
        for (const p of staticPublications) {
          totalDownloads += p.downloadCount || 0;
        }

        setStats({
          publications: staticPublications.length,
          researchers: 1,
          universities: 1,
          downloads: totalDownloads,
        });

        const counts: Record<string, number> = {};
        for (const p of staticPublications) {
          counts[p.type] = (counts[p.type] || 0) + 1;
        }
        setCategoryCounts(counts);

        setTopResearchers([
          {
            _id: staticAuthor._id,
            firstName: staticAuthor.firstName,
            lastName: staticAuthor.lastName,
            academicDegree: staticAuthor.academicDegree,
            academicTitle: staticAuthor.academicTitle,
            university: staticAuthor.university,
            publicationsCount: staticPublications.length,
          },
        ]);

        setUniversities([
          {
            _id: "karsu",
            name: {
              uz: "Berdax nomidagi Qoraqalpoq davlat universiteti",
              ru: "Каракалпакский государственный университет имени Бердаха",
              en: "Karakalpak State University named after Berdakh",
            },
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    },
    [searchQuery, router]
  );

  const typeColors: Record<string, string> = {
    dissertation:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    article:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    monograph:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    textbook:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    conference_thesis:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    manual:
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    abstract:
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    other:
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  const typeBorderColors: Record<string, string> = {
    dissertation: "border-l-purple-500",
    article: "border-l-blue-500",
    monograph: "border-l-green-500",
    textbook: "border-l-orange-500",
    conference_thesis: "border-l-yellow-500",
    manual: "border-l-teal-500",
    abstract: "border-l-pink-500",
    other: "border-l-gray-500",
  };

  const categories = [
    {
      type: "dissertation",
      icon: RiGraduationCapLine,
      color: "from-purple-500 to-purple-700",
      key: "home.category_dissertations",
    },
    {
      type: "article",
      icon: RiArticleLine,
      color: "from-blue-500 to-blue-700",
      key: "home.category_articles",
    },
    {
      type: "monograph",
      icon: RiBookLine,
      color: "from-green-500 to-green-700",
      key: "home.category_monographs",
    },
    {
      type: "textbook",
      icon: RiBook2Line,
      color: "from-orange-500 to-orange-700",
      key: "home.category_textbooks",
    },
    {
      type: "conference_thesis",
      icon: RiSlideshowLine,
      color: "from-yellow-500 to-yellow-700",
      key: "home.category_conferences",
    },
    {
      type: "manual",
      icon: RiBookmarkLine,
      color: "from-teal-500 to-teal-700",
      key: "home.category_manuals",
    },
  ];

  const steps = [
    { icon: RiUserAddLine, key: "step1", num: "01" },
    { icon: RiUploadCloud2Line, key: "step2", num: "02" },
    { icon: RiCheckDoubleLine, key: "step3", num: "03" },
    { icon: RiGlobalLine, key: "step4", num: "04" },
  ];

  const features = [
    {
      icon: RiFileTextLine,
      titleKey: "home.feature.publish",
      descKey: "home.feature.publish_desc",
    },
    {
      icon: RiSearchLine,
      titleKey: "home.feature.search",
      descKey: "home.feature.search_desc",
    },
    {
      icon: RiUserLine,
      titleKey: "home.feature.profiles",
      descKey: "home.feature.profiles_desc",
    },
    {
      icon: RiShieldCheckLine,
      titleKey: "home.feature.quality",
      descKey: "home.feature.quality_desc",
    },
  ];

  const trendingSearches = [
    { label: "Scopus Q1", query: "type=article&journalType=scopus" },
    {
      label: lang === "uz" ? "Dissertatsiya" : lang === "ru" ? "Диссертация" : "Dissertation",
      query: "type=dissertation",
    },
    {
      label: lang === "uz" ? "Tibbiyot" : lang === "ru" ? "Медицина" : "Medicine",
      query: "q=medicine",
    },
  ];

  const getPublicationLink = (pub: any) => {
    if (pub.slug) return `/publications/${pub.slug}`;
    if (pub._id && pub._id.length === 24) return `/publications/${pub._id}`;
    return `/publications/static/${pub._id}`;
  };

  const featuredPub = recentPubs[0];
  const remainingPubs = recentPubs.slice(1);

  return (
    <div>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-28 lg:py-36"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary) / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* Animated floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl animate-float-medium" />
          {/* Small floating shapes */}
          <div className="absolute top-20 right-[20%] w-3 h-3 bg-primary/20 rounded-full animate-float-medium" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-purple-500/20 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[30%] right-[10%] w-4 h-4 bg-blue-500/10 rounded-full animate-float-reverse" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-20 right-[30%] w-2.5 h-2.5 bg-primary/15 rounded-full animate-float-medium" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-[45%] left-[5%] w-3 h-3 border border-primary/20 rounded-full animate-pulse-ring" />
          <div className="absolute top-16 left-[40%] w-2 h-2 border border-purple-500/20 rounded-full animate-pulse-ring" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Gradient top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-1.5 text-sm font-medium"
              >
                {t("home.hero_badge", lang)}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  {t("home.title", lang)}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("home.subtitle", lang)}
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl p-1.5 shadow-xl shadow-primary/5">
                  <div className="relative flex-1">
                    <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder={t("home.search_placeholder", lang)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-base border-0 shadow-none focus-visible:ring-0 bg-transparent"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 rounded-lg"
                  >
                    {t("home.search_btn", lang)}
                  </Button>
                </div>
              </form>

              {/* Trending searches */}
              <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <span className="text-xs text-muted-foreground font-medium">
                  {t("home.popular_searches", lang)}:
                </span>
                {trendingSearches.map((item) => (
                  <Link
                    key={item.query}
                    href={`/search?${item.query}`}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
                    >
                      {item.label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Dashboard Visualization */}
            <div className="hidden lg:flex flex-shrink-0 w-[440px] h-[420px] relative items-center justify-center">
              {/* Main dashboard card */}
              <div className="relative w-full h-full">
                {/* Main chart card */}
                <div className="absolute top-0 left-4 right-0 bg-card/90 backdrop-blur-xl border rounded-2xl shadow-xl p-5 z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {lang === "uz" ? "Nashrlar o'sishi" : lang === "ru" ? "Рост публикаций" : "Publication Growth"}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10 border-0">
                      +34%
                    </Badge>
                  </div>

                  <svg viewBox="0 0 280 100" className="w-full">
                    <defs>
                      <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="heroAreaGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[25, 50, 75].map((y) => (
                      <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                    ))}

                    {/* Secondary line (dissertations) area + line */}
                    <path d="M0,78 L40,72 L80,75 L120,62 L160,58 L200,50 L240,42 L280,35 L280,95 L0,95 Z" fill="url(#heroAreaGrad2)" />
                    <path d="M0,78 L40,72 L80,75 L120,62 L160,58 L200,50 L240,42 L280,35" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

                    {/* Primary line (articles) area + line */}
                    <path d="M0,70 L40,58 L80,62 L120,42 L160,48 L200,28 L240,22 L280,10 L280,95 L0,95 Z" fill="url(#heroAreaGrad)" />
                    <path d="M0,70 L40,58 L80,62 L120,42 L160,48 L200,28 L240,22 L280,10" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Last data point with pulse */}
                    <circle cx="280" cy="10" r="3.5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="280" cy="10" r="7" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4" className="animate-pulse-ring" />
                    <circle cx="280" cy="35" r="3" fill="white" stroke="#a855f7" strokeWidth="1.5" />
                  </svg>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-1 rounded-full bg-blue-500" />
                      <span className="text-[10px] text-muted-foreground">{t("home.category_articles", lang)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-1 rounded-full bg-purple-500" />
                      <span className="text-[10px] text-muted-foreground">{t("home.category_dissertations", lang)}</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat card — top right */}
                <div className="absolute top-4 -right-3 bg-card/90 backdrop-blur-sm border rounded-xl px-3.5 py-2.5 shadow-lg animate-float-slow z-20">
                  <p className="text-xl font-bold text-blue-500">1,247</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{t("home.stats.publications", lang)}</p>
                </div>

                {/* Floating mini bar chart — bottom left */}
                <div className="absolute bottom-12 -left-2 bg-card/90 backdrop-blur-sm border rounded-xl px-4 py-3 shadow-lg animate-float-reverse z-20">
                  <p className="text-[10px] text-muted-foreground font-medium mb-2">
                    {lang === "uz" ? "Turlar" : lang === "ru" ? "Типы" : "Types"}
                  </p>
                  <div className="flex items-end gap-1.5 h-10">
                    {[
                      { h: 85, color: "bg-blue-500" },
                      { h: 60, color: "bg-purple-500" },
                      { h: 45, color: "bg-green-500" },
                      { h: 70, color: "bg-orange-500" },
                      { h: 35, color: "bg-teal-500" },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        className={`w-3.5 rounded-sm ${bar.color}`}
                        style={{ height: `${bar.h}%`, opacity: 0.7 + i * 0.03 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating researcher count — bottom right */}
                <div className="absolute bottom-6 right-8 bg-card/90 backdrop-blur-sm border rounded-xl px-3.5 py-2.5 shadow-lg animate-float-medium z-20" style={{ animationDelay: "0.8s" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <RiTeamLine className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">86+</p>
                      <p className="text-[10px] text-muted-foreground">{t("home.stats.researchers", lang)}</p>
                    </div>
                  </div>
                </div>

                {/* Small decorative elements */}
                <div className="absolute top-[45%] left-0 w-2 h-2 bg-blue-500/20 rounded-full animate-float-medium" style={{ animationDelay: "1.5s" }} />
                <div className="absolute bottom-[40%] right-2 w-1.5 h-1.5 bg-purple-500/20 rounded-full animate-float-slow" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative overflow-hidden border-y bg-gradient-to-r from-background via-card to-background py-10 md:py-14">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-4 right-[15%] w-2 h-2 bg-primary/15 rounded-full animate-float-medium" />
          <div className="absolute bottom-4 left-[10%] w-1.5 h-1.5 bg-purple-500/20 rounded-full animate-pulse-ring" />
          <div className="absolute top-[50%] left-[45%] w-2 h-2 bg-green-500/10 rounded-full animate-float-reverse" style={{ animationDelay: "1.2s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Left: Stat Cards 2x2 */}
              <div className="grid grid-cols-2 gap-4 lg:flex-1">
                {[
                  {
                    icon: RiFileTextLine,
                    value: stats.publications,
                    label: t("home.stats.publications", lang),
                    gradient: "from-blue-500 to-blue-600",
                    bgGlow: "bg-blue-500/10",
                    sparkline: [30, 45, 35, 60, 50, 75, 90],
                  },
                  {
                    icon: RiTeamLine,
                    value: stats.researchers,
                    label: t("home.stats.researchers", lang),
                    gradient: "from-green-500 to-emerald-600",
                    bgGlow: "bg-green-500/10",
                    sparkline: [20, 35, 30, 45, 40, 55, 70],
                  },
                  {
                    icon: RiBuilding2Line,
                    value: stats.universities,
                    label: t("home.stats.universities", lang),
                    gradient: "from-purple-500 to-violet-600",
                    bgGlow: "bg-purple-500/10",
                    sparkline: [40, 42, 48, 50, 55, 58, 65],
                  },
                  {
                    icon: RiDownloadLine,
                    value: stats.downloads,
                    label: t("home.stats.downloads", lang),
                    gradient: "from-orange-500 to-amber-600",
                    bgGlow: "bg-orange-500/10",
                    sparkline: [25, 40, 35, 55, 45, 70, 85],
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group relative bg-card/60 backdrop-blur-sm border rounded-2xl p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Hover glow */}
                    <div className={`absolute inset-0 rounded-2xl ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                          <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                        </div>
                        <div>
                          <AnimatedCounter target={stat.value} suffix="+" />
                          <p className="text-xs text-muted-foreground font-medium">
                            {stat.label}
                          </p>
                        </div>
                      </div>

                      {/* Mini sparkline bars */}
                      <div className="flex items-end gap-1 h-8">
                        {stat.sparkline.map((h: number, j: number) => (
                          <div
                            key={j}
                            className={`flex-1 rounded-sm bg-gradient-to-t ${stat.gradient} transition-all duration-500`}
                            style={{
                              height: `${h}%`,
                              opacity: 0.15 + (j / stat.sparkline.length) * 0.45,
                              transitionDelay: `${j * 60}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${stat.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                  </div>
                ))}
              </div>

              {/* Right: Trend Chart */}
              <div className="lg:w-[42%] bg-card/60 backdrop-blur-sm border rounded-2xl p-5 md:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {lang === "uz" ? "Nashrlar dinamikasi" : lang === "ru" ? "Динамика публикаций" : "Publication Trend"}
                    </h3>
                    <p className="text-[11px] text-muted-foreground">
                      {lang === "uz" ? "So'nggi 7 oy" : lang === "ru" ? "Последние 7 месяцев" : "Last 7 months"}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10 border-0">
                    ↑ 28%
                  </Badge>
                </div>

                <div className="flex-1 flex items-center">
                  <svg viewBox="0 0 300 130" className="w-full">
                    <defs>
                      <linearGradient id="statsAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[25, 50, 75, 100].map((y) => (
                      <line key={y} x1="15" y1={y} x2="285" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4" />
                    ))}

                    {/* Area fill */}
                    <path
                      d="M15,95 L60,78 L105,85 L150,52 L195,62 L240,28 L285,12 L285,110 L15,110 Z"
                      fill="url(#statsAreaGrad)"
                    />

                    {/* Line */}
                    <path
                      d="M15,95 L60,78 L105,85 L150,52 L195,62 L240,28 L285,12"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {[[15,95],[60,78],[105,85],[150,52],[195,62],[240,28],[285,12]].map(([cx, cy], idx) => (
                      <g key={idx}>
                        <circle cx={cx} cy={cy} r="4" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
                        {/* Pulsing ring on the last point */}
                        {idx === 6 && (
                          <circle cx={cx} cy={cy} r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" className="animate-pulse-ring" />
                        )}
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Month labels */}
                <div className="flex justify-between text-[10px] text-muted-foreground px-1 mt-1">
                  {(lang === "uz"
                    ? ["Sen", "Okt", "Noy", "Dek", "Yan", "Fev", "Mar"]
                    : lang === "ru"
                    ? ["Сен", "Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"]
                    : ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
                  ).map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                {/* Bottom stats row */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{stats.publications}</p>
                    <p className="text-[10px] text-muted-foreground">{lang === "uz" ? "Jami" : lang === "ru" ? "Всего" : "Total"}</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">+12</p>
                    <p className="text-[10px] text-muted-foreground">{lang === "uz" ? "Bu oy" : lang === "ru" ? "За месяц" : "This month"}</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">4.2</p>
                    <p className="text-[10px] text-muted-foreground">{lang === "uz" ? "O'rtacha" : lang === "ru" ? "В среднем" : "Average"}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="relative overflow-hidden py-20 bg-muted/30">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-[10%] w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 left-[5%] w-48 h-48 bg-blue-500/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-16 left-[20%] w-2.5 h-2.5 bg-purple-500/15 rounded-full animate-float-medium" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[40%] right-[8%] w-2 h-2 bg-blue-500/15 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-20 right-[25%] w-3 h-3 border border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-[70%] left-[15%] w-1.5 h-1.5 bg-green-500/15 rounded-full animate-float-medium" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {t("home.browse_categories", lang)}
              </h2>
              <p className="text-muted-foreground">
                {t("home.browse_categories_desc", lang)}
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, i) => {
              const count = categoryCounts[cat.type] || 0;
              return (
                <ScrollFadeIn key={cat.type} delay={i * 100}>
                  <Link href={`/search?type=${cat.type}`}>
                    <Card className="group h-full border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${cat.color}`}
                      />
                      <CardContent className="pt-6 pb-5 px-5">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} text-white group-hover:scale-110 transition-transform duration-300`}
                          >
                            <cat.icon className="h-7 w-7" />
                          </div>
                          <RiArrowRightLine className="h-5 w-5 text-muted-foreground/0 group-hover:text-muted-foreground group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                        <h3 className="font-semibold text-base mb-1">
                          {t(cat.key, lang)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {count}{" "}
                          {t("home.stats.publications", lang).toLowerCase()}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE ═══════════════ */}
      <section className="relative overflow-hidden py-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[5%] w-56 h-56 bg-primary/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute bottom-20 left-[8%] w-44 h-44 bg-purple-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-[30%] left-[3%] w-2 h-2 bg-primary/15 rounded-full animate-float-medium" style={{ animationDelay: "0.7s" }} />
          <div className="absolute bottom-[20%] right-[12%] w-3 h-3 bg-purple-500/10 rounded-full animate-float-slow" style={{ animationDelay: "1.3s" }} />
          <div className="absolute top-20 left-[45%] w-2 h-2 border border-primary/15 rounded-full animate-pulse-ring" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-10 right-[35%] w-1.5 h-1.5 bg-blue-500/15 rounded-full animate-float-reverse" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {t("home.why_choose", lang)}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("home.why_choose_desc", lang)}
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <ScrollFadeIn key={i} delay={i * 120}>
                <Card className="group border hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                  {/* Decorative number */}
                  <div className="absolute top-4 right-6 text-7xl font-bold text-muted-foreground/[0.06] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <CardContent className="p-6 md:p-8 flex items-start gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {t(feature.titleKey, lang)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(feature.descKey, lang)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PUBLICATION ═══════════════ */}
      {featuredPub && (
        <section className="relative overflow-hidden py-20 bg-muted/30">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 left-[15%] w-52 h-52 bg-primary/5 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute bottom-0 right-[10%] w-48 h-48 bg-orange-500/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-[25%] right-[5%] w-2.5 h-2.5 bg-primary/15 rounded-full animate-float-reverse" style={{ animationDelay: "0.8s" }} />
            <div className="absolute bottom-[30%] left-[3%] w-2 h-2 bg-orange-500/15 rounded-full animate-float-medium" style={{ animationDelay: "1.5s" }} />
            <div className="absolute top-12 right-[40%] w-2 h-2 border border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollFadeIn>
              <div className="flex items-center gap-3 mb-8">
                <RiFlashlightLine className="h-6 w-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("home.featured_publication", lang)}
                </h2>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={150}>
              <Link href={getPublicationLink(featuredPub)}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/20">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left */}
                      <div className="flex-1 p-6 md:p-8 lg:p-10">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            className={`${
                              typeColors[featuredPub.type] ||
                              typeColors.other
                            }`}
                            variant="secondary"
                          >
                            {t(`type.${featuredPub.type}`, lang)}
                          </Badge>
                          {featuredPub.articleDetails?.quartile && (
                            <Badge variant="outline" className="text-xs">
                              {featuredPub.articleDetails.quartile}
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground"
                          >
                            {featuredPub.publicationYear}
                          </Badge>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {typeof featuredPub.title === "string"
                            ? featuredPub.title
                            : getLocalizedField(featuredPub.title, lang)}
                        </h3>

                        {featuredPub.author && (
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  featuredPub.author.avatar
                                    ? `${API_BASE}${featuredPub.author.avatar}`
                                    : undefined
                                }
                              />
                              <AvatarFallback className="text-xs">
                                {(getLocalizedField(
                                  featuredPub.author.firstName,
                                  lang
                                )?.[0] || "") +
                                  (getLocalizedField(
                                    featuredPub.author.lastName,
                                    lang
                                  )?.[0] || "")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {getLocalizedField(
                                  featuredPub.author.lastName,
                                  lang
                                )}{" "}
                                {getLocalizedField(
                                  featuredPub.author.firstName,
                                  lang
                                )}
                              </p>
                            </div>
                          </div>
                        )}

                        {featuredPub.annotation && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                            {typeof featuredPub.annotation === "string"
                              ? featuredPub.annotation.substring(0, 300)
                              : getLocalizedField(
                                  featuredPub.annotation,
                                  lang
                                )?.substring(0, 300)}
                          </p>
                        )}

                        {featuredPub.keywords &&
                          featuredPub.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {featuredPub.keywords
                                .slice(0, 4)
                                .map((kw: string, idx: number) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-[10px] text-muted-foreground"
                                  >
                                    {kw}
                                  </Badge>
                                ))}
                            </div>
                          )}
                      </div>

                      {/* Right — Stats */}
                      <div className="lg:w-64 bg-muted/30 p-6 md:p-8 lg:p-10 flex flex-row lg:flex-col items-center lg:items-start justify-center gap-6 lg:gap-5 border-t lg:border-t-0 lg:border-l">
                        <div className="text-center lg:text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <RiEyeLine className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {t("pub.views", lang)}
                            </span>
                          </div>
                          <p className="text-2xl font-bold">
                            {featuredPub.viewCount || 0}
                          </p>
                        </div>
                        <Separator className="hidden lg:block" />
                        <div className="text-center lg:text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <RiDownloadLine className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {t("pub.downloads", lang)}
                            </span>
                          </div>
                          <p className="text-2xl font-bold">
                            {featuredPub.downloadCount || 0}
                          </p>
                        </div>

                        {featuredPub.articleDetails?.journalName && (
                          <>
                            <Separator className="hidden lg:block" />
                            <div className="text-center lg:text-left">
                              <p className="text-xs text-muted-foreground mb-1">
                                {t("pub.journal", lang)}
                              </p>
                              <p className="text-xs font-medium line-clamp-2">
                                {featuredPub.articleDetails.journalName}
                              </p>
                            </div>
                          </>
                        )}

                        <div className="hidden lg:block mt-auto pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            {t("home.read_more", lang)}{" "}
                            <RiArrowRightLine className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════ RECENT PUBLICATIONS ═══════════════ */}
      <section className="relative overflow-hidden py-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[3%] w-60 h-60 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-10 left-[10%] w-52 h-52 bg-green-500/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-[15%] left-[5%] w-2 h-2 bg-blue-500/15 rounded-full animate-float-medium" style={{ animationDelay: "0.4s" }} />
          <div className="absolute top-[60%] right-[7%] w-2.5 h-2.5 bg-green-500/15 rounded-full animate-float-slow" style={{ animationDelay: "1.2s" }} />
          <div className="absolute bottom-[15%] left-[40%] w-2 h-2 border border-blue-500/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-10 left-[30%] w-1.5 h-1.5 bg-purple-500/15 rounded-full animate-float-reverse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t("home.recent", lang)}
                </h2>
                {stats.publications > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-xs hidden sm:inline-flex"
                  >
                    {stats.publications}+ {t("home.stats.publications", lang).toLowerCase()}
                  </Badge>
                )}
              </div>
              <Link href="/search">
                <Button variant="outline" className="gap-2">
                  {t("home.view_all", lang)} <RiArrowRightLine />
                </Button>
              </Link>
            </div>
          </ScrollFadeIn>

          {remainingPubs.length > 0 ? (
            <div className="space-y-6">
              {/* Top 2 — larger cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remainingPubs.slice(0, 2).map((pub: any, i: number) => (
                  <ScrollFadeIn key={pub._id} delay={i * 100}>
                    <Link href={getPublicationLink(pub)}>
                      <Card
                        className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-0.5 border-l-4 ${
                          typeBorderColors[pub.type] ||
                          typeBorderColors.other
                        }`}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              className={`${
                                typeColors[pub.type] || typeColors.other
                              }`}
                              variant="secondary"
                            >
                              {t(`type.${pub.type}`, lang)}
                            </Badge>
                            {pub.articleDetails?.quartile && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                              >
                                {pub.articleDetails.quartile}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {typeof pub.title === "string"
                              ? pub.title
                              : getLocalizedField(pub.title, lang)}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {pub.author &&
                              `${getLocalizedField(
                                pub.author.lastName,
                                lang
                              )} ${getLocalizedField(
                                pub.author.firstName,
                                lang
                              )}`}
                            {pub.publicationYear &&
                              ` · ${pub.publicationYear}`}
                          </p>
                          {pub.annotation && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {typeof pub.annotation === "string"
                                ? pub.annotation.substring(0, 200)
                                : getLocalizedField(
                                    pub.annotation,
                                    lang
                                  )?.substring(0, 200)}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <RiEyeLine className="h-3.5 w-3.5" />
                              {pub.viewCount || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <RiDownloadLine className="h-3.5 w-3.5" />
                              {pub.downloadCount || 0}
                            </span>
                            {pub.keywords && pub.keywords.length > 0 && (
                              <div className="flex gap-1 ml-auto">
                                {pub.keywords
                                  .slice(0, 2)
                                  .map((kw: string, idx: number) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-[10px] text-muted-foreground px-1.5 py-0"
                                    >
                                      {kw}
                                    </Badge>
                                  ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollFadeIn>
                ))}
              </div>

              {/* Bottom 3 — smaller cards */}
              {remainingPubs.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {remainingPubs.slice(2, 5).map((pub: any, i: number) => (
                    <ScrollFadeIn key={pub._id} delay={i * 100}>
                      <Link href={getPublicationLink(pub)}>
                        <Card
                          className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-0.5 border-l-4 ${
                            typeBorderColors[pub.type] ||
                            typeBorderColors.other
                          }`}
                        >
                          <CardContent className="pt-5 pb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                className={`text-[10px] ${
                                  typeColors[pub.type] || typeColors.other
                                }`}
                                variant="secondary"
                              >
                                {t(`type.${pub.type}`, lang)}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                              {typeof pub.title === "string"
                                ? pub.title
                                : getLocalizedField(pub.title, lang)}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {pub.author &&
                                `${getLocalizedField(
                                  pub.author.lastName,
                                  lang
                                )} ${getLocalizedField(
                                  pub.author.firstName,
                                  lang
                                )}`}
                              {pub.publicationYear &&
                                ` · ${pub.publicationYear}`}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                              <span className="flex items-center gap-1">
                                <RiEyeLine className="h-3 w-3" />
                                {pub.viewCount || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <RiDownloadLine className="h-3 w-3" />
                                {pub.downloadCount || 0}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </ScrollFadeIn>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <RiBookOpenLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>{t("common.no_results", lang)}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="relative overflow-hidden py-20 bg-muted/30">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-[20%] w-56 h-56 bg-primary/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute bottom-10 right-[15%] w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute top-[20%] right-[3%] w-2 h-2 bg-primary/15 rounded-full animate-float-slow" style={{ animationDelay: "0.6s" }} />
          <div className="absolute bottom-[25%] left-[5%] w-2.5 h-2.5 bg-purple-500/15 rounded-full animate-float-medium" style={{ animationDelay: "1.4s" }} />
          <div className="absolute top-[50%] left-[50%] w-3 h-3 border border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: "1.8s" }} />
          <div className="absolute top-8 right-[30%] w-1.5 h-1.5 bg-blue-500/10 rounded-full animate-float-reverse" style={{ animationDelay: "0.3s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("home.how_it_works", lang)}
              </h2>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {steps.map((step, i) => (
              <ScrollFadeIn key={i} delay={i * 150}>
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-6 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center border-2 border-primary/20">
                      <step.icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t(`home.${step.key}_title`, lang)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {t(`home.${step.key}_desc`, lang)}
                  </p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TOP RESEARCHERS ═══════════════ */}
      {topResearchers.length > 0 && (
        <section className="relative overflow-hidden py-20">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-[8%] w-52 h-52 bg-green-500/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute -bottom-16 left-[12%] w-56 h-56 bg-primary/5 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute top-[35%] left-[3%] w-2 h-2 bg-green-500/15 rounded-full animate-float-reverse" style={{ animationDelay: "0.9s" }} />
            <div className="absolute bottom-[20%] right-[5%] w-2.5 h-2.5 bg-primary/15 rounded-full animate-float-slow" style={{ animationDelay: "1.6s" }} />
            <div className="absolute top-16 left-[60%] w-2 h-2 border border-green-500/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.4s" }} />
            <div className="absolute bottom-12 right-[40%] w-1.5 h-1.5 bg-purple-500/15 rounded-full animate-float-medium" style={{ animationDelay: "2.2s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollFadeIn>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {t("home.top_researchers", lang)}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("home.top_researchers_desc", lang)}
                  </p>
                </div>
                <Link href="/researchers">
                  <Button variant="outline" className="gap-2">
                    {t("home.view_all", lang)}{" "}
                    <RiArrowRightLine />
                  </Button>
                </Link>
              </div>
            </ScrollFadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topResearchers.map((researcher: any, i: number) => (
                <ScrollFadeIn key={researcher._id || i} delay={i * 100}>
                  <Link
                    href={
                      researcher._id === "turdimambetov"
                        ? "/researchers/turdimambetov"
                        : `/researchers/${researcher._id}`
                    }
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                      <CardContent className="pt-6 text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-4">
                          <AvatarImage
                            src={
                              researcher.avatar
                                ? `${API_BASE}${researcher.avatar}`
                                : undefined
                            }
                          />
                          <AvatarFallback className="text-lg bg-gradient-to-br from-primary/20 to-primary/5">
                            {(getLocalizedField(
                              researcher.firstName,
                              lang
                            )?.[0] || "") +
                              (getLocalizedField(
                                researcher.lastName,
                                lang
                              )?.[0] || "")}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                          {getLocalizedField(researcher.lastName, lang)}{" "}
                          {getLocalizedField(researcher.firstName, lang)}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-1 mb-2">
                          {researcher.academicDegree &&
                            researcher.academicDegree !== "none" && (
                              <Badge
                                variant="outline"
                                className="text-[10px]"
                              >
                                {t(
                                  `degree.${researcher.academicDegree}`,
                                  lang
                                )}
                              </Badge>
                            )}
                          {researcher.academicTitle &&
                            researcher.academicTitle !== "none" && (
                              <Badge
                                variant="outline"
                                className="text-[10px]"
                              >
                                {t(
                                  `title.${researcher.academicTitle}`,
                                  lang
                                )}
                              </Badge>
                            )}
                        </div>
                        {researcher.university && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {getLocalizedField(
                              researcher.university.name,
                              lang
                            )}
                          </p>
                        )}
                        {(researcher.publicationsCount !== undefined ||
                          researcher.publicationsCount > 0) && (
                          <p className="text-xs text-primary font-medium mt-2">
                            {researcher.publicationsCount || 0}{" "}
                            {t("researchers.works_count", lang).toLowerCase()}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PARTNER UNIVERSITIES ═══════════════ */}
      {universities.length > 0 && (
        <section className="relative overflow-hidden py-16 bg-muted/30">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 right-[20%] w-44 h-44 bg-primary/5 rounded-full blur-3xl animate-float-medium" />
            <div className="absolute bottom-0 left-[15%] w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute top-[30%] left-[5%] w-2 h-2 bg-primary/15 rounded-full animate-float-reverse" style={{ animationDelay: "1.1s" }} />
            <div className="absolute bottom-8 right-[10%] w-2 h-2 border border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollFadeIn>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {t("home.trusted_by", lang)}
                </h2>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={150}>
              <div className="flex flex-wrap justify-center gap-4">
                {universities.map((uni: any, i: number) => (
                  <div
                    key={uni._id || i}
                    className="bg-background border rounded-xl px-6 py-4 flex items-center gap-3 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <RiBuilding2Line className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">
                      {getLocalizedField(uni.name, lang)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="relative overflow-hidden py-20">
        {/* Section background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[8%] w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 right-[8%] w-44 h-44 bg-purple-500/5 rounded-full blur-3xl animate-float-reverse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollFadeIn>
            <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
                }}
              />
              {/* Decorative blurs */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl animate-float-slow" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl animate-float-reverse" />
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float-medium" />
                {/* Small floating dots */}
                <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white/20 rounded-full animate-float-medium" style={{ animationDelay: "0.5s" }} />
                <div className="absolute top-[70%] right-[20%] w-1.5 h-1.5 bg-white/15 rounded-full animate-float-slow" style={{ animationDelay: "1.2s" }} />
                <div className="absolute top-[40%] right-[10%] w-2.5 h-2.5 border border-white/15 rounded-full animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
                <div className="absolute bottom-[25%] left-[25%] w-2 h-2 bg-white/10 rounded-full animate-float-reverse" style={{ animationDelay: "1.8s" }} />
              </div>

              {/* Floating achievement pills */}
              <div className="absolute top-6 left-8 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium hidden md:flex items-center gap-2">
                <RiFileTextLine className="h-4 w-4" />
                {stats.publications}+ {t("home.stats.publications", lang).toLowerCase()}
              </div>
              <div className="absolute top-6 right-8 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium hidden md:flex items-center gap-2">
                <RiTeamLine className="h-4 w-4" />
                {stats.researchers}+ {t("home.stats.researchers", lang).toLowerCase()}
              </div>

              <div className="relative z-10 px-8 py-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("home.cta_title", lang)}
                </h2>
                <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
                  {t("home.cta_desc", lang)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="px-8 h-12 text-base font-semibold shadow-lg"
                    >
                      {t("home.cta_register", lang)}
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 h-12 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                      {t("home.cta_browse", lang)}
                    </Button>
                  </Link>
                </div>

                {/* Trust signal */}
                <p className="mt-6 text-sm opacity-70">
                  {t("home.cta_trust", lang)}
                </p>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
