"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success(t("common.success", lang));
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.login", lang)}</CardTitle>
          <CardDescription>
            {t("auth.login_desc", lang)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email", lang)}</Label>
              <div className="relative">
                <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password", lang)}</Label>
              <div className="relative">
                <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <RiEyeOffLine className="h-4 w-4" /> : <RiEyeLine className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("common.loading", lang) : t("auth.login_btn", lang)}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("auth.no_account", lang)} </span>
            <Link href="/register" className="text-primary hover:underline font-medium">
              {t("auth.register", lang)}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
