"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiArrowLeftLine, RiBookOpenLine, RiAwardLine,
  RiLightbulbLine, RiGroupLine, RiFileTextLine,
  RiGraduationCapLine, RiMapPinLine, RiBriefcaseLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { staticPublications } from "@/lib/static-data";

const researcherData = {
  fullName: {
    uz: "Турдимамбетов Изимбет Рахметович",
    ru: "Турдимамбетов Изимбет Рахметович",
    en: "Turdimambetov Izimbet Rakhmetovich",
  },
  birthDate: "16.09.1976",
  birthPlace: {
    uz: "Қорақалпоғистон Республикаси, Хўжайли тумани",
    ru: "Республика Каракалпакстан, Ходжейлийский район",
    en: "Republic of Karakalpakstan, Khojayli district",
  },
  position: {
    uz: "Бердақ номидаги Қорақалпоқ давлат университети илмий ишлар ва инновациялар бўйича проректори",
    ru: "Проректор по научной работе и инновациям Каракалпакского государственного университета имени Бердаха",
    en: "Vice-Rector for Research and Innovation, Karakalpak State University named after Berdakh",
  },
  academicDegree: {
    uz: "География фанлари доктори",
    ru: "Доктор географических наук",
    en: "Doctor of Geographical Sciences",
  },
  academicTitle: {
    uz: "Профессор",
    ru: "Профессор",
    en: "Professor",
  },
  specialty: "11.00.02",
  specialtyName: {
    uz: "Иқтисодий ва ижтимоий география",
    ru: "Экономическая и социальная география",
    en: "Economic and Social Geography",
  },
  candidateDissertation: {
    uz: "Медико-географический анализ дельты Амударья и улучшение её санитарно-гигиенической ситуации",
    ru: "Медико-географический анализ дельты Амударья и улучшение её санитарно-гигиенической ситуации",
    en: "Medical-geographical analysis of the Amudarya delta and improvement of its sanitary-hygienic situation",
  },
  doctoralDissertation: {
    uz: "Социально-экономические особенности улучшения нозогеографической ситуации Республики Каракалпакстан",
    ru: "Социально-экономические особенности улучшения нозогеографической ситуации Республики Каракалпакстан",
    en: "Socio-economic features of improving the nosogeographic situation of the Republic of Karakalpakstan",
  },
  researchDirection: {
    uz: "Тиббиёт географияси ва нозогеография соҳасидаги илмий тадқиқотлар",
    ru: "Научные исследования в области медицинской географии и нозогеографии",
    en: "Research in the field of medical geography and nosogeography",
  },
  hIndexScopus: 3,
  hIndexWoS: 3,
  hIndexGoogleScholar: 8,
  publicationStats: {
    total: 53,
    textbooks: 3,
    manuals: 9,
    monographs: 5,
    republicanArticles: 24,
    foreignArticles: 12,
    scopusTotal: 7,
    scopusQ1: 1,
    scopusQ2: 1,
    scopusQ3: 1,
    scopusQ4: 1,
    scopusConference: 3,
    webOfScience: 1,
    republicanConference: 26,
    internationalConference: 15,
  },
  students: [
    { fullName: "Отеулиев Медетбай Оринбай ули", degree: "PhD" },
    { fullName: "Балтабаев Омирбай Осербай ули", degree: "PhD" },
    { fullName: "Узакбаев Коблан Кеунимжай ули", degree: "PhD" },
    { fullName: "Утарбаева Камила Абуталиповна", degree: "PhD" },
  ],
  projects: [
    {
      code: "ФЗ-201908019",
      title: {
        uz: "Қорақалпоғистон Республикасини тиббий-географик вазиятини яхшилашда нозогеографик хариталарни ишлаб чиқиш ва улардан фойдаланиш",
        ru: "Разработка и использование нозогеографических карт для улучшения медико-географической ситуации Республики Каракалпакстан",
        en: "Development and use of nosogeographic maps to improve the medical-geographic situation of the Republic of Karakalpakstan",
      },
      years: "2020–2022",
      role: { uz: "Лойиҳа раҳбари", ru: "Руководитель проекта", en: "Project Leader" },
    },
    {
      code: "ИЛ-5721122061",
      title: {
        uz: "Геоинформатика методини фойдаланган ҳолда Орол денгизи ҳавзасининг жанубий қисми радиация, сув-туз балансининг минтақавий моделининг фазовий хилма-хиллигини ландшафт-экологик таъминлаш",
        ru: "Ландшафтно-экологическое обеспечение пространственного разнообразия региональной модели радиации и водно-солевого баланса южной части бассейна Аральского моря с использованием метода геоинформатики",
        en: "Landscape-ecological support of spatial diversity of regional radiation and water-salt balance model of the southern Aral Sea basin using geoinformatics methods",
      },
      years: "2022–2025",
      role: { uz: "Катта илмий ходим", ru: "Старший научный сотрудник", en: "Senior Researcher" },
    },
    {
      code: "АЛ-9424115176",
      title: {
        uz: "Орол тубидаги тупроқларни шаклланишида агрофизикавий, биологик жараёнларни иқлим ўзгариши таъсирини баҳолаш ва шўрланган тупроқларнинг унумдорлигини биотехнологик усуллар билан тиклаш",
        ru: "Оценка влияния изменения климата на агрофизические и биологические процессы формирования почв на дне Аральского моря и восстановление плодородия засолённых почв биотехнологическими методами",
        en: "Assessment of climate change impact on agrophysical and biological processes of soil formation at the Aral Sea bed and restoration of saline soil fertility using biotechnological methods",
      },
      years: "2025–2028",
      role: { uz: "Катта илмий ходим", ru: "Старший научный сотрудник", en: "Senior Researcher" },
    },
  ],
  patents: [
    {
      title: {
        uz: "Энергия тежайдиган қурилиш блокларининг тўплами",
        ru: "Комплект энергосберегающих строительных блоков",
        en: "Set of energy-saving building blocks",
      },
      number: "SAP 02209",
      date: "12.03.2021",
      type: { uz: "Саноат намунаси", ru: "Промышленный образец", en: "Industrial design" },
    },
  ],
  authorCertificates: 2,
};

const typeColors: Record<string, string> = {
  dissertation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  article: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  monograph: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  textbook: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  conference_thesis: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  manual: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export default function TurdimambetovProfilePage() {
  const { lang } = useLangStore();
  const router = useRouter();
  const data = researcherData;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
        <RiArrowLeftLine /> {t("common.back", lang)}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <Avatar className="h-32 w-32 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">ТИ</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold mb-2">{data.fullName[lang]}</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge>{data.academicDegree[lang]}</Badge>
              <Badge variant="secondary">{data.academicTitle[lang]}</Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-1">{data.position[lang]}</p>

            <Separator className="my-4" />

            <div className="text-left space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <RiMapPinLine className="text-muted-foreground mt-0.5 shrink-0" />
                <span>{data.birthPlace[lang]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RiGraduationCapLine className="text-muted-foreground shrink-0" />
                <span>{data.specialty} – {data.specialtyName[lang]}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* h-indexes */}
            <div className="text-left space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">h-index (Scopus)</span>
                <Badge variant="outline">{data.hIndexScopus}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">h-index (Web of Science)</span>
                <Badge variant="outline">{data.hIndexWoS}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">h-index (Google Scholar)</span>
                <Badge variant="outline">{data.hIndexGoogleScholar}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="publications">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-1">
              <TabsTrigger value="publications">{t("profile.publications_tab", lang)} ({staticPublications.length})</TabsTrigger>
              <TabsTrigger value="stats">{t("profile.stats_tab", lang)}</TabsTrigger>
              <TabsTrigger value="info">{t("profile.info_tab", lang)}</TabsTrigger>
              <TabsTrigger value="students">{t("profile.students", lang)}</TabsTrigger>
              <TabsTrigger value="projects">{t("profile.projects", lang)}</TabsTrigger>
              <TabsTrigger value="patents">{t("profile.patents", lang)}</TabsTrigger>
            </TabsList>

            {/* Publications Tab */}
            <TabsContent value="publications" className="mt-6 space-y-3">
              {staticPublications.map((pub) => (
                <Link key={pub._id} href={`/publications/static/${pub._id}`}>
                  <Card className="hover:shadow-sm transition-shadow cursor-pointer mb-3">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <Badge className={`shrink-0 mt-0.5 ${typeColors[pub.type] || typeColors.other}`} variant="secondary">
                          {t(`type.${pub.type}`, lang)}
                        </Badge>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium line-clamp-2">{getLocalizedField(pub.title, lang)}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{pub.publicationYear}</p>
                        </div>
                        {"articleDetails" in pub && (pub as any).articleDetails?.quartile && (
                          <Badge variant="outline" className="shrink-0">{(pub as any).articleDetails.quartile}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiBookOpenLine className="h-5 w-5" />
                    {t("profile.pub_stats", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: t("stats.total_works", lang), value: data.publicationStats.total },
                      { label: "Scopus", value: data.publicationStats.scopusTotal },
                      { label: "Web of Science", value: data.publicationStats.webOfScience },
                      { label: "Q1", value: data.publicationStats.scopusQ1 },
                      { label: "Q2", value: data.publicationStats.scopusQ2 },
                      { label: "Q3", value: data.publicationStats.scopusQ3 },
                      { label: "Q4", value: data.publicationStats.scopusQ4 },
                      { label: t("stats.textbooks", lang), value: data.publicationStats.textbooks },
                      { label: t("stats.manuals", lang), value: data.publicationStats.manuals },
                      { label: t("stats.monographs", lang), value: data.publicationStats.monographs },
                      { label: t("stats.republican_articles", lang), value: data.publicationStats.republicanArticles },
                      { label: t("stats.foreign_articles", lang), value: data.publicationStats.foreignArticles },
                      { label: t("stats.scopus_conf", lang), value: data.publicationStats.scopusConference },
                      { label: t("stats.republican_conf", lang), value: data.publicationStats.republicanConference },
                      { label: t("stats.international_conf", lang), value: data.publicationStats.internationalConference },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiLightbulbLine className="h-5 w-5" />
                    {t("profile.research_direction", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{data.researchDirection[lang]}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiFileTextLine className="h-5 w-5" />
                    {lang === "uz" ? "Dissertatsiyalar" : lang === "ru" ? "Диссертации" : "Dissertations"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {lang === "uz" ? "Nomzodlik dissertatsiyasi" : lang === "ru" ? "Кандидатская диссертация" : "Candidate Dissertation"}
                    </h4>
                    <p className="text-sm text-muted-foreground">{data.candidateDissertation[lang]}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {lang === "uz" ? "Doktorlik dissertatsiyasi" : lang === "ru" ? "Докторская диссертация" : "Doctoral Dissertation"}
                    </h4>
                    <p className="text-sm text-muted-foreground">{data.doctoralDissertation[lang]}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiGroupLine className="h-5 w-5" />
                    {t("profile.students", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.students.map((student, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="text-xs">
                            {student.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{student.fullName}</p>
                          <Badge variant="secondary" className="text-[10px] mt-1">{student.degree}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiBriefcaseLine className="h-5 w-5" />
                    {t("profile.projects", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.projects.map((project, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-mono text-xs">{project.code}</Badge>
                          <span className="text-xs text-muted-foreground">{project.years}</span>
                        </div>
                        <p className="text-sm font-medium mb-2">{project.title[lang]}</p>
                        <Badge variant="secondary" className="text-xs">{project.role[lang]}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Patents Tab */}
            <TabsContent value="patents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RiAwardLine className="h-5 w-5" />
                    {t("profile.patents", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.patents.map((patent, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <Badge variant="outline" className="mb-2 text-xs">{patent.type[lang]}</Badge>
                        <p className="text-sm font-medium mb-2">{patent.title[lang]}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>№ {patent.number}</span>
                          <span>{patent.date}</span>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      {lang === "uz" ? "Mualliflik guvohnomalar" : lang === "ru" ? "Авторские свидетельства" : "Author certificates"}: <span className="font-medium text-foreground">{data.authorCertificates}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
