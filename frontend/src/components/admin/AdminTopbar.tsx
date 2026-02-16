"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  RiMenuLine,
  RiNotification3Line,
  RiUser3Line,
  RiHomeLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace("/api", "");

const pageTitles: Record<string, string> = {
  "/admin": "admin.dashboard_title",
  "/admin/publications": "admin.publications",
  "/admin/users": "admin.users",
  "/admin/universities": "admin.universities",
  "/admin/fields": "admin.fields",
  "/admin/stats": "admin.stats",
};

interface Props {
  onMobileMenuToggle: () => void;
}

export default function AdminTopbar({ onMobileMenuToggle }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { lang } = useLangStore();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      api
        .get("/notifications/unread-count")
        .then((res) => setUnreadCount(res.data.count))
        .catch(() => {});
    }
  }, [user]);

  if (!user) return null;

  const titleKey = pageTitles[pathname] || "admin.dashboard_title";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 md:hidden"
          onClick={onMobileMenuToggle}
        >
          <RiMenuLine className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{t(titleKey, lang)}</h1>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <RiNotification3Line className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </Link>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={
                    user.avatar ? `${API_BASE}${user.avatar}` : undefined
                  }
                />
                <AvatarFallback className="text-xs">
                  {(getLocalizedField(user.firstName, lang)?.[0] || "") +
                    (getLocalizedField(user.lastName, lang)?.[0] || "")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {getLocalizedField(user.firstName, lang)}{" "}
                {getLocalizedField(user.lastName, lang)}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="gap-2">
                <RiUser3Line className="h-4 w-4" />
                {t("nav.profile", lang)}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className="gap-2">
                <RiHomeLine className="h-4 w-4" />
                {lang === "uz"
                  ? "Asosiy saytga"
                  : lang === "ru"
                  ? "На сайт"
                  : "Back to Site"}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive gap-2"
            >
              <RiLogoutBoxRLine className="h-4 w-4" />
              {t("nav.logout", lang)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
