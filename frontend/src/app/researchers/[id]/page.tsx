"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RiArrowLeftLine, RiExternalLinkLine, RiBookOpenLine, RiMailLine, RiPhoneLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

export default function ResearcherProfilePage() {
  const { id } = useParams();
  const { lang } = useLangStore();
  const [user, setUser] = useState<any>(null);
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/users/profile/${id}`),
      api.get(`/publications/search?author=${id}&limit=50`),
    ]).then(([userRes, pubRes]) => {
      setUser(userRes.data.user);
      setPublications(pubRes.data.publications || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96" />
          <div className="lg:col-span-2"><Skeleton className="h-96" /></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">{t("common.no_results", lang)}</p>
        <Link href="/researchers"><Button variant="outline" className="mt-4">{t("common.back", lang)}</Button></Link>
      </div>
    );
  }

  const fullName = `${getLocalizedField(user.lastName, lang)} ${getLocalizedField(user.firstName, lang)} ${getLocalizedField(user.middleName, lang)}`.trim();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/researchers">
        <Button variant="ghost" className="mb-6 gap-2">
          <RiArrowLeftLine /> {t("common.back", lang)}
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <Avatar className="h-32 w-32 mx-auto mb-4">
              <AvatarImage src={user.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${user.avatar}` : undefined} />
              <AvatarFallback className="text-2xl">
                {(getLocalizedField(user.firstName, lang)?.[0] || "") + (getLocalizedField(user.lastName, lang)?.[0] || "")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold mb-2">{fullName}</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {user.academicDegree && user.academicDegree !== "none" && (
                <Badge>{t(`degree.${user.academicDegree}`, lang)}</Badge>
              )}
              {user.academicTitle && user.academicTitle !== "none" && (
                <Badge variant="secondary">{t(`title.${user.academicTitle}`, lang)}</Badge>
              )}
            </div>

            {user.currentPosition && <p className="text-sm text-muted-foreground mb-1">{user.currentPosition}</p>}
            {user.university && <p className="text-sm text-muted-foreground mb-1">{getLocalizedField(user.university.name, lang)}</p>}
            {user.faculty && <p className="text-sm text-muted-foreground mb-1">{user.faculty}</p>}
            {user.department && <p className="text-sm text-muted-foreground mb-4">{user.department}</p>}

            <Separator className="my-4" />

            {user.email && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <RiMailLine className="text-muted-foreground" />
                <a href={`mailto:${user.email}`} className="text-primary hover:underline">{user.email}</a>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <RiPhoneLine className="text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            )}

            <Separator className="my-4" />

            {/* Scientific IDs */}
            <div className="text-left space-y-2">
              {user.orcid && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ORCID</span>
                  <span className="font-mono text-xs">{user.orcid}</span>
                </div>
              )}
              {user.scopusAuthorId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Scopus</span>
                  <span className="font-mono text-xs">{user.scopusAuthorId}</span>
                </div>
              )}
              {user.hIndexScopus > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">h-index (Scopus)</span>
                  <Badge variant="outline">{user.hIndexScopus}</Badge>
                </div>
              )}
              {user.hIndexGoogleScholar > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">h-index (GS)</span>
                  <Badge variant="outline">{user.hIndexGoogleScholar}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="publications">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="publications">
                {t("profile.publications_tab", lang)} ({publications.length})
              </TabsTrigger>
              <TabsTrigger value="info">
                {t("profile.info_tab", lang)}
              </TabsTrigger>
              <TabsTrigger value="stats">
                {t("profile.stats_tab", lang)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="mt-6 space-y-4">
              {publications.length > 0 ? publications.map((pub: any) => (
                <Link key={pub._id} href={`/publications/${pub._id}`}>
                  <Card className="hover:shadow-sm transition-shadow cursor-pointer mb-3">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="shrink-0 mt-0.5">{t(`type.${pub.type}`, lang)}</Badge>
                        <div className="min-w-0">
                          <h3 className="font-medium line-clamp-2">{getLocalizedField(pub.title, lang)}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{pub.publicationYear}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <RiBookOpenLine className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>{t("common.no_results", lang)}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="info" className="mt-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {user.researchDirection && (
                    <div>
                      <h4 className="font-medium mb-1">{t("profile.research_direction", lang)}</h4>
                      <p className="text-sm text-muted-foreground">{user.researchDirection}</p>
                    </div>
                  )}
                  {user.scientificField && (
                    <div>
                      <h4 className="font-medium mb-1">{t("profile.scientific_field", lang)}</h4>
                      <p className="text-sm text-muted-foreground">{user.scientificField}</p>
                    </div>
                  )}
                  {user.supervisedStudents?.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">{t("profile.students", lang)}</h4>
                      <div className="space-y-2">
                        {user.supervisedStudents.map((s: any, i: number) => (
                          <div key={i} className="text-sm p-3 bg-muted rounded-lg">
                            <p className="font-medium">{s.fullName}</p>
                            <p className="text-muted-foreground">{s.degree} · {s.year}</p>
                            {s.dissertationTopic && <p className="text-muted-foreground mt-1">{s.dissertationTopic}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {user.projects?.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">{t("profile.projects", lang)}</h4>
                      <div className="space-y-2">
                        {user.projects.map((p: any, i: number) => (
                          <div key={i} className="text-sm p-3 bg-muted rounded-lg">
                            <p className="font-medium">{p.title}</p>
                            <p className="text-muted-foreground">{p.startYear} - {p.endYear} · {p.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  {user.publicationStats && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: t("stats.total_works", lang), value: user.publicationStats.total },
                        { label: "Scopus", value: user.publicationStats.scopusTotal },
                        { label: "Web of Science", value: user.publicationStats.webOfScience },
                        { label: "Q1", value: user.publicationStats.scopusQ1 },
                        { label: "Q2", value: user.publicationStats.scopusQ2 },
                        { label: "Q3", value: user.publicationStats.scopusQ3 },
                        { label: "Q4", value: user.publicationStats.scopusQ4 },
                        { label: t("stats.textbooks", lang), value: user.publicationStats.textbooks },
                        { label: t("stats.monographs", lang), value: user.publicationStats.monographs },
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">{stat.value || 0}</div>
                          <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
