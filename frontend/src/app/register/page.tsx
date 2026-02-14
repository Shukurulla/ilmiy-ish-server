"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiMailLine, RiLockLine, RiUserLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import { toast } from "sonner";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const { lang } = useLangStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: { uz: "", ru: "", en: "" },
    lastName: { uz: "", ru: "", en: "" },
    university: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<any[]>([]);

  useEffect(() => {
    api.get("/universities").then((res) => {
      setUniversities(res.data.universities || []);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(t("auth.error_passwords_mismatch", lang));
      return;
    }

    if (formData.password.length < 6) {
      toast.error(t("auth.error_password_short", lang));
      return;
    }

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        university: formData.university || undefined,
      });
      toast.success(t("common.success", lang));
      router.push("/dashboard/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("auth.register", lang)}</CardTitle>
          <CardDescription>
            {t("auth.register_desc", lang)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("auth.last_name", lang)} *</Label>
                <Input
                  placeholder={t("auth.last_name", lang)}
                  value={formData.lastName.uz}
                  onChange={(e) => setFormData({ ...formData, lastName: { ...formData.lastName, uz: e.target.value } })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{t("auth.first_name", lang)} *</Label>
                <Input
                  placeholder={t("auth.first_name", lang)}
                  value={formData.firstName.uz}
                  onChange={(e) => setFormData({ ...formData, firstName: { ...formData.firstName, uz: e.target.value } })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("auth.email", lang)} *</Label>
              <div className="relative">
                <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("auth.university", lang)}</Label>
              <Select value={formData.university} onValueChange={(v) => setFormData({ ...formData, university: v })}>
                <SelectTrigger>
                  <SelectValue placeholder={t("auth.select_university", lang)} />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((u: any) => (
                    <SelectItem key={u._id} value={u._id}>
                      {getLocalizedField(u.name, lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("auth.password", lang)} *</Label>
                <div className="relative">
                  <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("auth.confirm_password", lang)} *</Label>
                <div className="relative">
                  <RiLockLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("common.loading", lang) : t("auth.register_btn", lang)}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("auth.has_account", lang)} </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              {t("auth.login", lang)}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
