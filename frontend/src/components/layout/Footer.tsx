"use client";

import Link from "next/link";
import { useLangStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLangStore();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                IP
              </div>
              <span>IlmiyPlatforma</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {t("footer.description", lang)}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              {t("footer.pages", lang)}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">{t("nav.home", lang)}</Link></li>
              <li><Link href="/search" className="hover:text-foreground transition-colors">{t("nav.search", lang)}</Link></li>
              <li><Link href="/researchers" className="hover:text-foreground transition-colors">{t("nav.researchers", lang)}</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">{t("nav.about", lang)}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              {t("footer.contact", lang)}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@ilmiy.uz</li>
              <li>+998 61 229 40 50</li>
              <li>
                {t("footer.location", lang)}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} IlmiyPlatforma.
            {" " + t("footer.copyright", lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
