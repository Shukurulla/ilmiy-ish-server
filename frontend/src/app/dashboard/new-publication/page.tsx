"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiUploadCloudLine } from "react-icons/ri";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

export default function NewPublicationPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [loading, setLoading] = useState(false);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    type: "article",
    title: { uz: "", ru: "", en: "" },
    annotation: "",
    keywords: "",
    publicationYear: new Date().getFullYear(),
    language: "uzbek",
    coAuthors: "",
    // Article
    journalName: "", volume: "", issue: "", pageFrom: "", pageTo: "", doi: "", articleUrl: "", journalType: "", quartile: "",
    // Dissertation
    supervisorName: "", supervisorDegree: "", defensePlace: "", defenseDate: "", diplomaNumber: "", dissertationType: "",
    // Conference
    conferenceName: "", conferenceType: "", conferenceCity: "", conferenceCountry: "", conferenceDate: "", proceedingsUrl: "",
    // Textbook
    publisher: "", isbn: "", pageCount: "", approval: "",
  });

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainFile) {
      toast.error(t("pub.error_no_pdf", lang));
      return;
    }

    setLoading(true);
    try {
      const data: any = {
        type: formData.type,
        title: formData.title,
        annotation: formData.annotation,
        keywords: formData.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        publicationYear: formData.publicationYear,
        language: formData.language,
        coAuthors: formData.coAuthors ? formData.coAuthors.split(",").map((n) => ({ name: n.trim() })) : [],
      };

      if (formData.type === "article") {
        data.articleDetails = {
          journalName: formData.journalName,
          volume: formData.volume,
          issue: formData.issue,
          pageFrom: formData.pageFrom ? parseInt(formData.pageFrom) : undefined,
          pageTo: formData.pageTo ? parseInt(formData.pageTo) : undefined,
          doi: formData.doi,
          url: formData.articleUrl,
          journalType: formData.journalType || undefined,
          quartile: formData.quartile || undefined,
        };
      }

      if (formData.type === "dissertation") {
        data.dissertationDetails = {
          subType: formData.dissertationType || undefined,
          supervisor: { fullName: formData.supervisorName, degree: formData.supervisorDegree },
          defensePlace: formData.defensePlace,
          defenseDate: formData.defenseDate || undefined,
          diplomaNumber: formData.diplomaNumber,
        };
      }

      if (formData.type === "conference_thesis") {
        data.conferenceDetails = {
          conferenceName: formData.conferenceName,
          conferenceType: formData.conferenceType || undefined,
          location: { city: formData.conferenceCity, country: formData.conferenceCountry },
          date: formData.conferenceDate || undefined,
          proceedingsUrl: formData.proceedingsUrl,
        };
      }

      if (["textbook", "manual"].includes(formData.type)) {
        data.textbookDetails = {
          publisher: formData.publisher,
          isbn: formData.isbn,
          pageCount: formData.pageCount ? parseInt(formData.pageCount) : undefined,
          approval: formData.approval,
        };
      }

      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      fd.append("mainFile", mainFile);
      additionalFiles.forEach((f) => fd.append("additionalFiles", f));

      await api.post("/publications", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(t("pub.success_submitted", lang));
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) return null;

  const updateField = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-6 gap-2"><RiArrowLeftLine /> {t("common.back", lang)}</Button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">{t("pub.add_new", lang)}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Type */}
        <Card>
          <CardHeader><CardTitle>{t("pub.type", lang)}</CardTitle></CardHeader>
          <CardContent>
            <Select value={formData.type} onValueChange={(v) => updateField("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["dissertation", "abstract", "article", "monograph", "textbook", "manual", "conference_thesis", "other"].map((type) => (
                  <SelectItem key={type} value={type}>{t(`type.${type}`, lang)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Title */}
        <Card>
          <CardHeader><CardTitle>{t("pub.work_title", lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t("pub.uzbek", lang) + " *"}</Label>
              <Input value={formData.title.uz} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, uz: e.target.value } })} required />
            </div>
            <div>
              <Label>{t("pub.russian", lang)}</Label>
              <Input value={formData.title.ru} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ru: e.target.value } })} />
            </div>
            <div>
              <Label>{t("pub.english", lang)}</Label>
              <Input value={formData.title.en} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} />
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader><CardTitle>{t("pub.basic_info", lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t("pub.annotation", lang)}</Label>
              <Textarea value={formData.annotation} onChange={(e) => updateField("annotation", e.target.value)} rows={4} maxLength={2000} />
              <p className="text-xs text-muted-foreground mt-1">{formData.annotation.length}/2000</p>
            </div>
            <div>
              <Label>{t("pub.keywords", lang)} ({t("pub.keywords_hint", lang)})</Label>
              <Input value={formData.keywords} onChange={(e) => updateField("keywords", e.target.value)} placeholder="keyword1, keyword2, keyword3" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("pub.year", lang)} *</Label>
                <Input type="number" value={formData.publicationYear} onChange={(e) => updateField("publicationYear", parseInt(e.target.value))} required />
              </div>
              <div>
                <Label>{t("pub.language", lang)}</Label>
                <Select value={formData.language} onValueChange={(v) => updateField("language", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uzbek">{t("lang.uzbek", lang)}</SelectItem>
                    <SelectItem value="russian">{t("lang.russian", lang)}</SelectItem>
                    <SelectItem value="english">{t("lang.english", lang)}</SelectItem>
                    <SelectItem value="other">{t("type.other", lang)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>{t("pub.coauthors", lang)} ({t("pub.keywords_hint", lang)})</Label>
              <Input value={formData.coAuthors} onChange={(e) => updateField("coAuthors", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Article specific */}
        {formData.type === "article" && (
          <Card>
            <CardHeader><CardTitle>{t("pub.article_details", lang)}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>{t("pub.journal_name", lang)}</Label><Input value={formData.journalName} onChange={(e) => updateField("journalName", e.target.value)} /></div>
                <div><Label>DOI</Label><Input value={formData.doi} onChange={(e) => updateField("doi", e.target.value)} placeholder="10.xxxx/xxxxx" /></div>
                <div><Label>Volume</Label><Input value={formData.volume} onChange={(e) => updateField("volume", e.target.value)} /></div>
                <div><Label>Issue</Label><Input value={formData.issue} onChange={(e) => updateField("issue", e.target.value)} /></div>
                <div><Label>{t("pub.page_from", lang)}</Label><Input type="number" value={formData.pageFrom} onChange={(e) => updateField("pageFrom", e.target.value)} /></div>
                <div><Label>{t("pub.page_to", lang)}</Label><Input type="number" value={formData.pageTo} onChange={(e) => updateField("pageTo", e.target.value)} /></div>
                <div>
                  <Label>{t("pub.journal_type", lang)}</Label>
                  <Select value={formData.journalType} onValueChange={(v) => updateField("journalType", v)}>
                    <SelectTrigger><SelectValue placeholder={t("common.select", lang)} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="republican">{lang === "uz" ? "Respublika" : "Republican"}</SelectItem>
                      <SelectItem value="foreign">{lang === "uz" ? "Xorijiy" : "Foreign"}</SelectItem>
                      <SelectItem value="scopus">Scopus</SelectItem>
                      <SelectItem value="wos">Web of Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t("pub.quartile", lang)}</Label>
                  <Select value={formData.quartile} onValueChange={(v) => updateField("quartile", v)}>
                    <SelectTrigger><SelectValue placeholder={t("common.select", lang)} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1">Q1</SelectItem>
                      <SelectItem value="Q2">Q2</SelectItem>
                      <SelectItem value="Q3">Q3</SelectItem>
                      <SelectItem value="Q4">Q4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>URL</Label><Input value={formData.articleUrl} onChange={(e) => updateField("articleUrl", e.target.value)} /></div>
            </CardContent>
          </Card>
        )}

        {/* Dissertation specific */}
        {formData.type === "dissertation" && (
          <Card>
            <CardHeader><CardTitle>{t("pub.dissertation_details", lang)}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t("pub.dissertation_type", lang)}</Label>
                  <Select value={formData.dissertationType} onValueChange={(v) => updateField("dissertationType", v)}>
                    <SelectTrigger><SelectValue placeholder={t("common.select", lang)} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate">{t("degree.candidate", lang)}</SelectItem>
                      <SelectItem value="doctoral">{t("degree.doctor", lang)}</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                      <SelectItem value="DSc">DSc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>{t("pub.supervisor", lang)}</Label><Input value={formData.supervisorName} onChange={(e) => updateField("supervisorName", e.target.value)} /></div>
                <div><Label>{t("pub.defense_place", lang)}</Label><Input value={formData.defensePlace} onChange={(e) => updateField("defensePlace", e.target.value)} /></div>
                <div><Label>{t("pub.defense_date", lang)}</Label><Input type="date" value={formData.defenseDate} onChange={(e) => updateField("defenseDate", e.target.value)} /></div>
                <div><Label>{t("pub.diploma_number", lang)}</Label><Input value={formData.diplomaNumber} onChange={(e) => updateField("diplomaNumber", e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conference specific */}
        {formData.type === "conference_thesis" && (
          <Card>
            <CardHeader><CardTitle>{t("pub.conference_details", lang)}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>{t("pub.conference_name", lang)}</Label><Input value={formData.conferenceName} onChange={(e) => updateField("conferenceName", e.target.value)} /></div>
                <div>
                  <Label>{t("pub.conference_type", lang)}</Label>
                  <Select value={formData.conferenceType} onValueChange={(v) => updateField("conferenceType", v)}>
                    <SelectTrigger><SelectValue placeholder={t("common.select", lang)} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="republican">{lang === "uz" ? "Respublika" : "Republican"}</SelectItem>
                      <SelectItem value="international">{lang === "uz" ? "Xalqaro" : "International"}</SelectItem>
                      <SelectItem value="scopus">Scopus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>{t("pub.city", lang)}</Label><Input value={formData.conferenceCity} onChange={(e) => updateField("conferenceCity", e.target.value)} /></div>
                <div><Label>{t("pub.country", lang)}</Label><Input value={formData.conferenceCountry} onChange={(e) => updateField("conferenceCountry", e.target.value)} /></div>
                <div><Label>{t("pub.date", lang)}</Label><Input type="date" value={formData.conferenceDate} onChange={(e) => updateField("conferenceDate", e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Textbook specific */}
        {["textbook", "manual"].includes(formData.type) && (
          <Card>
            <CardHeader><CardTitle>{t("pub.textbook_details", lang)}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>{t("pub.publisher", lang)}</Label><Input value={formData.publisher} onChange={(e) => updateField("publisher", e.target.value)} /></div>
                <div><Label>ISBN</Label><Input value={formData.isbn} onChange={(e) => updateField("isbn", e.target.value)} /></div>
                <div><Label>{t("pub.pages", lang)}</Label><Input type="number" value={formData.pageCount} onChange={(e) => updateField("pageCount", e.target.value)} /></div>
                <div><Label>{t("pub.approval", lang)}</Label><Input value={formData.approval} onChange={(e) => updateField("approval", e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Upload */}
        <Card>
          <CardHeader><CardTitle>{t("pub.files", lang)}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t("pub.pdf_file", lang)} * ({t("pub.up_to_50mb", lang)})</Label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors" onClick={() => document.getElementById("mainFile")?.click()}>
                <RiUploadCloudLine className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {mainFile ? mainFile.name : t("pub.select_pdf", lang)}
                </p>
                <input id="mainFile" type="file" accept=".pdf" className="hidden" onChange={(e) => setMainFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div>
              <Label>{t("pub.additional_files", lang)} ({t("pub.up_to_5", lang)})</Label>
              <Input type="file" multiple accept=".pdf,.ppt,.pptx,.jpg,.png" onChange={(e) => setAdditionalFiles(Array.from(e.target.files || []).slice(0, 5))} className="mt-2" />
              {additionalFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {additionalFiles.map((f, i) => <p key={i} className="text-xs text-muted-foreground">{f.name}</p>)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={loading} className="flex-1">
            {loading ? t("common.loading", lang) : t("pub.submit", lang)}
          </Button>
          <Link href="/dashboard">
            <Button type="button" variant="outline" size="lg">{t("common.cancel", lang)}</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
