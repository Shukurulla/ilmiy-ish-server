"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  RiArrowLeftLine, RiEyeLine, RiDownloadLine,
  RiCalendarLine, RiExternalLinkLine, RiFileTextLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { getStaticPublicationById, staticPublications } from "@/lib/static-data";

const typeColors: Record<string, string> = {
  dissertation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  article: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  monograph: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  textbook: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  conference_thesis: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  manual: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export default function StaticPublicationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { lang } = useLangStore();

  const pub = getStaticPublicationById(id as string);

  if (!pub) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">{t("common.no_results", lang)}</p>
        <Link href="/search">
          <Button variant="outline" className="mt-4">{t("common.back", lang)}</Button>
        </Link>
      </div>
    );
  }

  const similar = staticPublications
    .filter((p) => p._id !== pub._id && p.type === pub.type)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
        <RiArrowLeftLine /> {t("common.back", lang)}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Badge className={`mb-3 ${typeColors[pub.type] || typeColors.other}`} variant="secondary">
              {t(`type.${pub.type}`, lang)}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {getLocalizedField(pub.title, lang)}
            </h1>

            {pub.title.ru && lang !== "ru" && (
              <p className="text-sm text-muted-foreground mb-1">{pub.title.ru}</p>
            )}
            {pub.title.en && lang !== "en" && (
              <p className="text-sm text-muted-foreground mb-1">{pub.title.en}</p>
            )}

            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <RiCalendarLine /> {pub.publicationYear}
              </span>
              <span className="flex items-center gap-1">
                <RiEyeLine /> {pub.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <RiDownloadLine /> {pub.downloadCount}
              </span>
            </div>
          </div>

          {/* Annotation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("pub.annotation", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{pub.annotation}</p>
            </CardContent>
          </Card>

          {/* Keywords */}
          {pub.keywords.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">{t("pub.keywords", lang)}</h3>
              <div className="flex flex-wrap gap-2">
                {pub.keywords.map((kw, i) => (
                  <Link key={i} href={`/search?q=${encodeURIComponent(kw)}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      {kw}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Article Details */}
          {"articleDetails" in pub && pub.articleDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("pub.article_details", lang)}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                {pub.articleDetails.journalName && (
                  <div>
                    <span className="text-muted-foreground">{t("pub.journal", lang)}</span>
                    <p className="font-medium">{pub.articleDetails.journalName}</p>
                  </div>
                )}
                {pub.articleDetails.volume && (
                  <div>
                    <span className="text-muted-foreground">Volume</span>
                    <p className="font-medium">{pub.articleDetails.volume}</p>
                  </div>
                )}
                {pub.articleDetails.issue && (
                  <div>
                    <span className="text-muted-foreground">Issue</span>
                    <p className="font-medium">{pub.articleDetails.issue}</p>
                  </div>
                )}
                {pub.articleDetails.doi && (
                  <div>
                    <span className="text-muted-foreground">DOI</span>
                    <p className="font-medium font-mono text-xs">{pub.articleDetails.doi}</p>
                  </div>
                )}
                {pub.articleDetails.quartile && (
                  <div>
                    <span className="text-muted-foreground">Quartile</span>
                    <Badge>{pub.articleDetails.quartile}</Badge>
                  </div>
                )}
                {pub.articleDetails.journalType && (
                  <div>
                    <span className="text-muted-foreground">{t("pub.journal_type", lang)}</span>
                    <Badge variant="outline">{t(`journal.${pub.articleDetails.journalType}`, lang)}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Dissertation Details */}
          {"dissertationDetails" in pub && pub.dissertationDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("pub.dissertation_details", lang)}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                {pub.dissertationDetails.defensePlace && (
                  <div>
                    <span className="text-muted-foreground">{t("pub.defense_place", lang)}</span>
                    <p className="font-medium">{pub.dissertationDetails.defensePlace}</p>
                  </div>
                )}
                {pub.dissertationDetails.type && (
                  <div>
                    <span className="text-muted-foreground">{t("pub.dissertation_type", lang)}</span>
                    <p className="font-medium capitalize">{pub.dissertationDetails.type}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("pub.author", lang)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href="/researchers/turdimambetov"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">ТИ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {getLocalizedField(pub.author.lastName, lang)}{" "}
                    {getLocalizedField(pub.author.firstName, lang)}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {t("degree.doctor", lang)}
                  </Badge>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Similar Works */}
          {similar.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("pub.similar", lang)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {similar.map((s) => (
                  <Link
                    key={s._id}
                    href={`/publications/static/${s._id}`}
                    className="block p-2 rounded hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium line-clamp-2">
                      {getLocalizedField(s.title, lang)}
                    </p>
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
