"use client";

import { RiFileTextLine, RiSearchLine, RiUserLine, RiShieldCheckLine, RiBuildingLine, RiGlobalLine } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { useLangStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function AboutPage() {
  const { lang } = useLangStore();

  const features = [
    {
      icon: RiFileTextLine,
      title: t("about.features.publish", lang),
      desc: t("about.features.publish_desc", lang),
    },
    {
      icon: RiSearchLine,
      title: t("about.features.search", lang),
      desc: t("about.features.search_desc", lang),
    },
    {
      icon: RiUserLine,
      title: t("about.features.profile", lang),
      desc: t("about.features.profile_desc", lang),
    },
    {
      icon: RiShieldCheckLine,
      title: t("about.features.moderate", lang),
      desc: t("about.features.moderate_desc", lang),
    },
    {
      icon: RiBuildingLine,
      title: t("about.features.multi_university", lang),
      desc: t("about.features.multi_university_desc", lang),
    },
    {
      icon: RiGlobalLine,
      title: t("about.features.multilingual", lang),
      desc: t("about.features.multilingual_desc", lang),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title", lang)}</h1>
        <p className="text-lg text-muted-foreground">{t("about.description", lang)}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">{t("about.features.title", lang)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* University info */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-bold text-xl mb-2">
              {t("about.university_title", lang)}
            </h3>
            <p className="text-muted-foreground">
              {t("about.university_desc", lang)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
