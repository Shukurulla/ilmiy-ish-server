"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftLine, RiDownloadLine, RiEyeLine, RiFileTextLine, RiExternalLinkLine, RiCalendarLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

export default function PublicationDetailPage() {
  const { id } = useParams();
  const { lang } = useLangStore();
  const [pub, setPub] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/publications/view/${id}`).then((res) => {
      setPub(res.data.publication);
      // Fetch similar
      if (res.data.publication?.keywords?.length) {
        api.get(`/publications/search?search=${res.data.publication.keywords[0]}&limit=4`).then((simRes) => {
          setSimilar((simRes.data.publications || []).filter((p: any) => p._id !== id));
        }).catch(() => {});
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async () => {
    try {
      const res = await api.get(`/publications/download/${id}`);
      const url = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${res.data.fileUrl}`;
      window.open(url, "_blank");
    } catch {}
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!pub) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">{t("common.no_results", lang)}</p>
        <Link href="/search"><Button variant="outline" className="mt-4">{t("common.back", lang)}</Button></Link>
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    dissertation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    article: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    monograph: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    textbook: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    conference_thesis: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/search">
        <Button variant="ghost" className="mb-6 gap-2"><RiArrowLeftLine /> {t("common.back", lang)}</Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className={`mb-3 ${typeColors[pub.type] || typeColors.other}`} variant="secondary">
              {t(`type.${pub.type}`, lang)}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">{getLocalizedField(pub.title, lang)}</h1>

            {/* Show all languages */}
            {pub.title.ru && lang !== "ru" && <p className="text-sm text-muted-foreground mb-1">{pub.title.ru}</p>}
            {pub.title.en && lang !== "en" && <p className="text-sm text-muted-foreground mb-1">{pub.title.en}</p>}

            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><RiCalendarLine /> {pub.publicationYear}</span>
              <span className="flex items-center gap-1"><RiEyeLine /> {pub.viewCount}</span>
              <span className="flex items-center gap-1"><RiDownloadLine /> {pub.downloadCount}</span>
            </div>
          </div>

          {/* Annotation */}
          {pub.annotation && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.annotation", lang)}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap">{pub.annotation}</p></CardContent>
            </Card>
          )}

          {/* Keywords */}
          {pub.keywords?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">{t("pub.keywords", lang)}</h3>
              <div className="flex flex-wrap gap-2">
                {pub.keywords.map((kw: string, i: number) => (
                  <Link key={i} href={`/search?q=${encodeURIComponent(kw)}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">{kw}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Article Details */}
          {pub.type === "article" && pub.articleDetails && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.article_details", lang)}</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                {pub.articleDetails.journalName && <div><span className="text-muted-foreground">{t("pub.journal", lang)}</span><p className="font-medium">{pub.articleDetails.journalName}</p></div>}
                {pub.articleDetails.volume && <div><span className="text-muted-foreground">Volume</span><p className="font-medium">{pub.articleDetails.volume}</p></div>}
                {pub.articleDetails.issue && <div><span className="text-muted-foreground">Issue</span><p className="font-medium">{pub.articleDetails.issue}</p></div>}
                {pub.articleDetails.doi && <div><span className="text-muted-foreground">DOI</span><p className="font-medium font-mono text-xs">{pub.articleDetails.doi}</p></div>}
                {pub.articleDetails.quartile && <div><span className="text-muted-foreground">Quartile</span><Badge>{pub.articleDetails.quartile}</Badge></div>}
                {pub.articleDetails.url && <div><a href={pub.articleDetails.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1"><RiExternalLinkLine /> {t("pub.source_link", lang)}</a></div>}
              </CardContent>
            </Card>
          )}

          {/* Dissertation Details */}
          {pub.type === "dissertation" && pub.dissertationDetails && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.dissertation_details", lang)}</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                {pub.dissertationDetails.supervisor?.fullName && <div><span className="text-muted-foreground">{t("pub.supervisor", lang)}</span><p className="font-medium">{pub.dissertationDetails.supervisor.fullName}</p></div>}
                {pub.dissertationDetails.defensePlace && <div><span className="text-muted-foreground">{t("pub.defense_place", lang)}</span><p className="font-medium">{pub.dissertationDetails.defensePlace}</p></div>}
                {pub.dissertationDetails.defenseDate && <div><span className="text-muted-foreground">{t("pub.defense_date", lang)}</span><p className="font-medium">{new Date(pub.dissertationDetails.defenseDate).toLocaleDateString()}</p></div>}
              </CardContent>
            </Card>
          )}

          {/* Download */}
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <RiDownloadLine /> {t("pub.download", lang)} PDF
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          {pub.author && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.author", lang)}</CardTitle></CardHeader>
              <CardContent>
                <Link href={`/researchers/${pub.author._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={pub.author.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${pub.author.avatar}` : undefined} />
                    <AvatarFallback>{(getLocalizedField(pub.author.firstName, lang)?.[0] || "") + (getLocalizedField(pub.author.lastName, lang)?.[0] || "")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{getLocalizedField(pub.author.lastName, lang)} {getLocalizedField(pub.author.firstName, lang)}</p>
                    {pub.author.academicDegree && pub.author.academicDegree !== "none" && (
                      <Badge variant="secondary" className="mt-1 text-xs">{t(`degree.${pub.author.academicDegree}`, lang)}</Badge>
                    )}
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Co-authors */}
          {pub.coAuthors?.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.coauthors", lang)}</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pub.coAuthors.map((ca: any, i: number) => (
                    <li key={i} className="text-sm">{ca.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Similar Works */}
          {similar.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-lg">{t("pub.similar", lang)}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {similar.slice(0, 3).map((s: any) => (
                  <Link key={s._id} href={`/publications/${s._id}`} className="block p-2 rounded hover:bg-muted transition-colors">
                    <p className="text-sm font-medium line-clamp-2">{getLocalizedField(s.title, lang)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.publicationYear}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
