"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  RiDashboardLine,
  RiFileTextLine,
  RiUserLine,
  RiBuildingLine,
  RiBookOpenLine,
  RiBarChartLine,
  RiArrowLeftLine,
  RiLogoutBoxRLine,
  RiSunLine,
  RiMoonLine,
  RiGlobalLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField, type Lang } from "@/lib/i18n";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace("/api", "");

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  exact?: boolean;
  superadminOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: "/admin", icon: RiDashboardLine, labelKey: "admin.dashboard_title", exact: true },
  { href: "/admin/publications", icon: RiFileTextLine, labelKey: "admin.publications" },
  { href: "/admin/users", icon: RiUserLine, labelKey: "admin.users" },
  { href: "/admin/universities", icon: RiBuildingLine, labelKey: "admin.universities" },
  { href: "/admin/fields", icon: RiBookOpenLine, labelKey: "admin.fields", superadminOnly: true },
  { href: "/admin/stats", icon: RiBarChartLine, labelKey: "admin.stats" },
];

const langOptions: { value: Lang; label: string }[] = [
  { value: "uz", label: "O'z" },
  { value: "ru", label: "Ру" },
  { value: "en", label: "En" },
];

interface Props {
  onNavigate?: () => void;
}

export default function AdminSidebarContent({ onNavigate }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const { lang, setLang } = useLangStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) return null;

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const filteredItems = navItems.filter(
    (item) => !item.superadminOnly || user.role === "superadmin"
  );

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header — Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border shrink-0">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
          IP
        </div>
        <div>
          <p className="font-bold text-sm leading-none">IlmiyPlatforma</p>
          <p className="text-[10px] text-sidebar-foreground/60 mt-0.5">
            {lang === "uz" ? "Admin panel" : lang === "ru" ? "Админ панель" : "Admin Panel"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="px-3 space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-10 font-normal ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t(item.labelKey, lang)}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-3 bg-sidebar-border" />

        {/* Back to site */}
        <div className="px-3">
          <Link href="/" onClick={onNavigate}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 font-normal text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <RiArrowLeftLine className="h-4 w-4 shrink-0" />
              {lang === "uz" ? "Asosiy saytga" : lang === "ru" ? "На сайт" : "Back to Site"}
            </Button>
          </Link>
        </div>
      </ScrollArea>

      {/* Footer — User + Controls */}
      <div className="border-t border-sidebar-border p-3 space-y-3 shrink-0">
        {/* Language & Theme */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <RiGlobalLine className="h-3.5 w-3.5 text-sidebar-foreground/50 mr-1" />
            {langOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setLang(option.value)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  lang === option.value
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              {theme === "dark" ? (
                <RiSunLine className="h-4 w-4" />
              ) : (
                <RiMoonLine className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        <Separator className="bg-sidebar-border" />

        {/* User info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage
              src={user.avatar ? `${API_BASE}${user.avatar}` : undefined}
            />
            <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground">
              {(getLocalizedField(user.firstName, lang)?.[0] || "") +
                (getLocalizedField(user.lastName, lang)?.[0] || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate leading-none">
              {getLocalizedField(user.firstName, lang)}{" "}
              {getLocalizedField(user.lastName, lang)}
            </p>
            <Badge
              variant="outline"
              className="mt-1 text-[10px] h-4 px-1.5 border-sidebar-border text-sidebar-foreground/60"
            >
              {user.role}
            </Badge>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
            title={t("nav.logout", lang)}
          >
            <RiLogoutBoxRLine className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
