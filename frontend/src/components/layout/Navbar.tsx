"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  RiSunLine, RiMoonLine, RiMenuLine, RiNotification3Line,
  RiGlobalLine, RiUser3Line, RiHomeLine, RiSearchLine,
  RiGroupLine, RiInformationLine, RiDashboardLine,
  RiShieldLine, RiLogoutBoxRLine, RiLoginBoxLine, RiUserAddLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField, type Lang } from "@/lib/i18n";
import api from "@/lib/api";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout, fetchUser } = useAuthStore();
  const { lang, setLang } = useLangStore();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      api.get("/notifications/unread-count").then((res) => {
        setUnreadCount(res.data.count);
      }).catch(() => {});
    }
  }, [user]);

  const navLinks = [
    { href: "/", label: t("nav.home", lang), icon: RiHomeLine },
    { href: "/search", label: t("nav.search", lang), icon: RiSearchLine },
    { href: "/researchers", label: t("nav.researchers", lang), icon: RiGroupLine },
    { href: "/about", label: t("nav.about", lang), icon: RiInformationLine },
  ];

  const langOptions: { value: Lang; label: string }[] = [
    { value: "uz", label: "O'z" },
    { value: "ru", label: "Ру" },
    { value: "en", label: "En" },
  ];

  const getInitials = () => {
    if (!user) return "";
    const first = user.firstName?.uz?.[0] || user.firstName?.ru?.[0] || "";
    const last = user.lastName?.uz?.[0] || user.lastName?.ru?.[0] || "";
    return (first + last).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            IP
          </div>
          <span className="hidden sm:inline">IlmiyPlatforma</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "default" : "ghost"}
                size="sm"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <RiGlobalLine className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {langOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setLang(option.value)}
                  className={lang === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
            </Button>
          )}

          {user ? (
            <>
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

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${user.avatar}` : undefined}
                      />
                      <AvatarFallback className="text-xs">{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.firstName?.[lang] || user.firstName?.uz} {user.lastName?.[lang] || user.lastName?.uz}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">{t("nav.dashboard", lang)}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">{t("nav.profile", lang)}</Link>
                  </DropdownMenuItem>
                  {["admin", "superadmin"].includes(user.role) && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">{t("nav.admin", lang)}</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    {t("nav.logout", lang)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">{t("nav.login", lang)}</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">{t("nav.register", lang)}</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <RiMenuLine className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* User Section */}
                {user ? (
                  <div className="p-6 bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${user.avatar}` : undefined}
                        />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {getLocalizedField(user.firstName, lang)} {getLocalizedField(user.lastName, lang)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <Badge variant="secondary" className="text-[10px] mt-1">{user.role}</Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <RiUser3Line className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">IlmiyPlatforma</p>
                        <p className="text-xs text-muted-foreground">{t("auth.login_desc", lang)}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  <div className="px-3 space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 h-11"
                          >
                            <Icon className="h-5 w-5" />
                            {link.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>

                  {user && (
                    <>
                      <Separator className="my-4" />
                      <div className="px-3 space-y-1">
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                          <Button
                            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 h-11"
                          >
                            <RiDashboardLine className="h-5 w-5" />
                            {t("nav.dashboard", lang)}
                          </Button>
                        </Link>
                        <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)}>
                          <Button
                            variant={pathname === "/dashboard/profile" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 h-11"
                          >
                            <RiUser3Line className="h-5 w-5" />
                            {t("nav.profile", lang)}
                          </Button>
                        </Link>
                        <Link href="/dashboard/notifications" onClick={() => setMobileOpen(false)}>
                          <Button
                            variant={pathname === "/dashboard/notifications" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 h-11"
                          >
                            <RiNotification3Line className="h-5 w-5" />
                            <span className="flex-1 text-left">{t("nav.notifications", lang)}</span>
                            {unreadCount > 0 && (
                              <Badge className="h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">
                                {unreadCount}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                        {["admin", "superadmin"].includes(user.role) && (
                          <Link href="/admin" onClick={() => setMobileOpen(false)}>
                            <Button
                              variant={pathname.startsWith("/admin") ? "secondary" : "ghost"}
                              className="w-full justify-start gap-3 h-11"
                            >
                              <RiShieldLine className="h-5 w-5" />
                              {t("nav.admin", lang)}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </>
                  )}
                </nav>

                {/* Bottom Section */}
                <div className="border-t p-4 space-y-3">
                  {/* Language & Theme */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <RiGlobalLine className="h-4 w-4 text-muted-foreground mr-1" />
                      {langOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={lang === option.value ? "default" : "outline"}
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => setLang(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                    {mounted && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      >
                        {theme === "dark" ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>

                  {/* Auth Buttons */}
                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-destructive hover:text-destructive"
                      onClick={() => { logout(); setMobileOpen(false); }}
                    >
                      <RiLogoutBoxRLine className="h-4 w-4" />
                      {t("nav.logout", lang)}
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <RiLoginBoxLine className="h-4 w-4" />
                          {t("nav.login", lang)}
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button className="w-full gap-2">
                          <RiUserAddLine className="h-4 w-4" />
                          {t("nav.register", lang)}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
