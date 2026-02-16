"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiSaveLine, RiCameraLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, fetchUser, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [scientificFields, setScientificFields] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
    if (user) {
      api.get("/auth/me").then((res) => setProfile(res.data.user)).catch(() => {});
    }
    api.get("/scientific-fields").then((res) => {
      setScientificFields(res.data.fields || []);
    }).catch(() => {});
  }, [user, authLoading, router]);

  const handleSave = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      await api.put("/users/profile", profile);
      await fetchUser();
      toast.success(t("common.success", lang));
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await api.put("/users/avatar", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setProfile({ ...profile, avatar: res.data.avatar });
      await fetchUser();
      toast.success(t("common.success", lang));
    } catch {
      toast.error(t("common.error", lang));
    }
  };

  const updateField = (path: string, value: any) => {
    setProfile((prev: any) => {
      const copy = { ...prev };
      const parts = path.split(".");
      let obj = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!obj[parts[i]]) obj[parts[i]] = {};
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  if (authLoading || !profile) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-96" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard"><Button variant="ghost" size="icon"><RiArrowLeftLine /></Button></Link>
          <h1 className="text-2xl font-bold">{t("profile.title", lang)}</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} className="gap-2">
          <RiSaveLine /> {loading ? t("common.loading", lang) : t("profile.save", lang)}
        </Button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${profile.avatar}` : undefined} />
            <AvatarFallback className="text-xl">
              {(profile.firstName?.uz?.[0] || "") + (profile.lastName?.uz?.[0] || "")}
            </AvatarFallback>
          </Avatar>
          <label className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90">
            <RiCameraLine className="h-4 w-4" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{profile.lastName?.uz} {profile.firstName?.uz}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="w-full flex-wrap h-auto gap-1">
          <TabsTrigger value="personal">{t("profile.personal_info", lang)}</TabsTrigger>
          <TabsTrigger value="scientific">{t("profile.scientific_qual", lang)}</TabsTrigger>
          <TabsTrigger value="identifiers">{t("profile.identifiers", lang)}</TabsTrigger>
          <TabsTrigger value="stats">{t("profile.pub_stats", lang)}</TabsTrigger>
          <TabsTrigger value="additional">{t("profile.additional", lang)}</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">{t("profile.fullname_uz", lang)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><Label>{t("profile.lastname", lang)}</Label><Input value={profile.lastName?.uz || ""} onChange={(e) => updateField("lastName.uz", e.target.value)} /></div>
                  <div><Label>{t("profile.firstname", lang)}</Label><Input value={profile.firstName?.uz || ""} onChange={(e) => updateField("firstName.uz", e.target.value)} /></div>
                  <div><Label>{t("profile.middlename", lang)}</Label><Input value={profile.middleName?.uz || ""} onChange={(e) => updateField("middleName.uz", e.target.value)} /></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">{t("profile.fullname_ru", lang)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><Label>{t("profile.lastname", lang)}</Label><Input value={profile.lastName?.ru || ""} onChange={(e) => updateField("lastName.ru", e.target.value)} /></div>
                  <div><Label>{t("profile.firstname", lang)}</Label><Input value={profile.firstName?.ru || ""} onChange={(e) => updateField("firstName.ru", e.target.value)} /></div>
                  <div><Label>{t("profile.middlename", lang)}</Label><Input value={profile.middleName?.ru || ""} onChange={(e) => updateField("middleName.ru", e.target.value)} /></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">{t("profile.fullname_en", lang)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><Label>{t("profile.lastname", lang)}</Label><Input value={profile.lastName?.en || ""} onChange={(e) => updateField("lastName.en", e.target.value)} /></div>
                  <div><Label>{t("profile.firstname", lang)}</Label><Input value={profile.firstName?.en || ""} onChange={(e) => updateField("firstName.en", e.target.value)} /></div>
                  <div><Label>{t("profile.middlename", lang)}</Label><Input value={profile.middleName?.en || ""} onChange={(e) => updateField("middleName.en", e.target.value)} /></div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>{t("profile.date_of_birth", lang)}</Label><Input type="date" value={profile.dateOfBirth?.slice(0, 10) || ""} onChange={(e) => updateField("dateOfBirth", e.target.value)} /></div>
                <div><Label>{t("profile.phone", lang)}</Label><Input value={profile.phone || ""} onChange={(e) => updateField("phone", e.target.value)} /></div>
                <div><Label>{t("profile.position", lang)}</Label><Input value={profile.currentPosition || ""} onChange={(e) => updateField("currentPosition", e.target.value)} /></div>
                <div><Label>{t("profile.faculty", lang)}</Label><Input value={profile.faculty || ""} onChange={(e) => updateField("faculty", e.target.value)} /></div>
                <div><Label>{t("profile.department", lang)}</Label><Input value={profile.department || ""} onChange={(e) => updateField("department", e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scientific Qualification */}
        <TabsContent value="scientific" className="mt-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t("filter.degree", lang)}</Label>
                  <Select value={profile.academicDegree || "none"} onValueChange={(v) => updateField("academicDegree", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["none", "candidate", "doctor", "PhD", "DSc"].map((d) => (
                        <SelectItem key={d} value={d}>{t(`degree.${d}`, lang)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("filter.title_rank", lang)}</Label>
                  <Select value={profile.academicTitle || "none"} onValueChange={(v) => updateField("academicTitle", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["none", "docent", "professor"].map((ti) => (
                        <SelectItem key={ti} value={ti}>{t(`title.${ti}`, lang)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("profile.scientific_field", lang)}</Label>
                  <Select
                    value={profile.scientificFieldRef?._id || profile.scientificFieldRef || ""}
                    onValueChange={(v) => updateField("scientificFieldRef", v)}
                  >
                    <SelectTrigger><SelectValue placeholder={t("profile.select_field", lang)} /></SelectTrigger>
                    <SelectContent>
                      {scientificFields.map((f: any) => (
                        <SelectItem key={f._id} value={f._id}>
                          {f.code ? `${f.code} — ` : ""}{getLocalizedField(f.name, lang)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>{t("profile.research_direction", lang)}</Label><Input value={profile.researchDirection || ""} onChange={(e) => updateField("researchDirection", e.target.value)} /></div>
                <div><Label>{t("profile.candidate_defense_year", lang)}</Label><Input type="number" value={profile.candidateDefenseYear || ""} onChange={(e) => updateField("candidateDefenseYear", parseInt(e.target.value) || null)} /></div>
                <div><Label>{t("profile.doctoral_defense_year", lang)}</Label><Input type="number" value={profile.doctoralDefenseYear || ""} onChange={(e) => updateField("doctoralDefenseYear", parseInt(e.target.value) || null)} /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Identifiers */}
        <TabsContent value="identifiers" className="mt-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>ORCID ID</Label><Input value={profile.orcid || ""} onChange={(e) => updateField("orcid", e.target.value)} placeholder="0000-0000-0000-0000" /></div>
                <div><Label>Scopus Author ID</Label><Input value={profile.scopusAuthorId || ""} onChange={(e) => updateField("scopusAuthorId", e.target.value)} /></div>
                <div><Label>h-index (Scopus)</Label><Input type="number" value={profile.hIndexScopus || 0} onChange={(e) => updateField("hIndexScopus", parseInt(e.target.value) || 0)} /></div>
                <div><Label>Web of Science ResearcherID</Label><Input value={profile.webOfScienceId || ""} onChange={(e) => updateField("webOfScienceId", e.target.value)} /></div>
                <div><Label>h-index (WoS)</Label><Input type="number" value={profile.hIndexWos || 0} onChange={(e) => updateField("hIndexWos", parseInt(e.target.value) || 0)} /></div>
                <div><Label>Google Scholar ID</Label><Input value={profile.googleScholarId || ""} onChange={(e) => updateField("googleScholarId", e.target.value)} /></div>
                <div><Label>h-index (Google Scholar)</Label><Input type="number" value={profile.hIndexGoogleScholar || 0} onChange={(e) => updateField("hIndexGoogleScholar", parseInt(e.target.value) || 0)} /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publication Stats */}
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: "total", label: t("stats.total_works", lang) },
                  { key: "textbooks", label: t("stats.textbooks", lang) },
                  { key: "manuals", label: t("stats.manuals", lang) },
                  { key: "monographs", label: t("stats.monographs", lang) },
                  { key: "republicanArticles", label: t("stats.republican_articles", lang) },
                  { key: "foreignArticles", label: t("stats.foreign_articles", lang) },
                  { key: "scopusTotal", label: "Scopus (jami)" },
                  { key: "scopusQ1", label: "Q1" },
                  { key: "scopusQ2", label: "Q2" },
                  { key: "scopusQ3", label: "Q3" },
                  { key: "scopusQ4", label: "Q4" },
                  { key: "webOfScience", label: "Web of Science" },
                  { key: "scopusConference", label: t("stats.scopus_conf", lang) },
                  { key: "republicanConference", label: t("stats.republican_conf", lang) },
                  { key: "internationalConference", label: t("stats.international_conf", lang) },
                ].map((stat) => (
                  <div key={stat.key}>
                    <Label className="text-xs">{stat.label}</Label>
                    <Input
                      type="number"
                      value={profile.publicationStats?.[stat.key] || 0}
                      onChange={(e) => updateField(`publicationStats.${stat.key}`, parseInt(e.target.value) || 0)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional */}
        <TabsContent value="additional" className="mt-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div><Label>{t("profile.teaching_experience", lang)}</Label><Input type="number" value={profile.teachingExperience || ""} onChange={(e) => updateField("teachingExperience", parseInt(e.target.value) || null)} /></div>
              <div><Label>{t("profile.additional_achievements", lang)}</Label><Textarea value={profile.additionalAchievements || ""} onChange={(e) => updateField("additionalAchievements", e.target.value)} rows={4} /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={loading} size="lg" className="gap-2">
          <RiSaveLine /> {loading ? t("common.loading", lang) : t("profile.save", lang)}
        </Button>
      </div>
    </div>
  );
}
