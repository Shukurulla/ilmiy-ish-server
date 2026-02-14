"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiSearchLine, RiBookOpenLine, RiUserLine, RiArrowRightLine, RiFileTextLine, RiShieldCheckLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { staticPublications } from "@/lib/static-data";

export default function HomePage() {
  const router = useRouter();
  const { lang } = useLangStore();
  const [searchQuery, setSearchQuery] = useState("");
  const recentPubs = [...staticPublications]
    .sort((a, b) => b.publicationYear - a.publicationYear)
    .slice(0, 6);
  const stats = { publications: staticPublications.length, researchers: 1, universities: 1 };
  const loading = false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const typeColors: Record<string, string> = {
    dissertation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    article: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    monograph: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    textbook: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    conference_thesis: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    manual: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    abstract: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t("home.title", lang)}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("home.subtitle", lang)}
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t("home.search_placeholder", lang)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              {t("home.search_btn", lang)}
            </Button>
          </form>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.publications}</div>
              <div className="text-sm text-muted-foreground">{t("home.stats.publications", lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.researchers}</div>
              <div className="text-sm text-muted-foreground">{t("home.stats.researchers", lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.universities}</div>
              <div className="text-sm text-muted-foreground">{t("home.stats.universities", lang)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: RiFileTextLine, title: t("home.feature.publish", lang), desc: t("home.feature.publish_desc", lang) },
              { icon: RiSearchLine, title: t("home.feature.search", lang), desc: t("home.feature.search_desc", lang) },
              { icon: RiUserLine, title: t("home.feature.profiles", lang), desc: t("home.feature.profiles_desc", lang) },
              { icon: RiShieldCheckLine, title: t("home.feature.quality", lang), desc: t("home.feature.quality_desc", lang) },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.recent", lang)}</h2>
            <Link href="/search">
              <Button variant="outline" className="gap-2">
                {t("home.view_all", lang)} <RiArrowRightLine />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}><CardContent className="pt-6"><Skeleton className="h-4 w-20 mb-3" /><Skeleton className="h-5 w-full mb-2" /><Skeleton className="h-4 w-3/4 mb-4" /><Skeleton className="h-3 w-full" /></CardContent></Card>
              ))}
            </div>
          ) : recentPubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPubs.map((pub: any) => (
                <Link key={pub._id} href={`/publications/static/${pub._id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <Badge className={`mb-3 ${typeColors[pub.type] || typeColors.other}`} variant="secondary">
                        {t(`type.${pub.type}`, lang)}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2 mb-2">{getLocalizedField(pub.title, lang)}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {pub.author && `${getLocalizedField(pub.author.lastName, lang)} ${getLocalizedField(pub.author.firstName, lang)}`}
                        {pub.publicationYear && ` · ${pub.publicationYear}`}
                      </p>
                      {pub.annotation && <p className="text-xs text-muted-foreground line-clamp-3">{pub.annotation.substring(0, 200)}</p>}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <RiBookOpenLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>{t("common.no_results", lang)}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
