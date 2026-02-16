"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiAddLine, RiEditLine, RiDeleteBinLine,
  RiBuildingLine, RiAddCircleLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

interface Faculty {
  _id?: string;
  name: { uz: string; ru: string; en: string };
  departments: { _id?: string; name: { uz: string; ru: string; en: string } }[];
}

interface University {
  _id: string;
  name: { uz: string; ru: string; en: string };
  slug: string;
  city: string;
  region: string;
  website: string;
  email: string;
  faculties: Faculty[];
  isActive: boolean;
}

const emptyUni = (): Omit<University, "_id" | "slug" | "isActive"> => ({
  name: { uz: "", ru: "", en: "" },
  city: "",
  region: "",
  website: "",
  email: "",
  faculties: [],
});

export default function AdminUniversitiesPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyUni());
  const [saving, setSaving] = useState(false);

  // Faculty dialog
  const [facultyDialogOpen, setFacultyDialogOpen] = useState(false);
  const [facultyForm, setFacultyForm] = useState({ uz: "", ru: "", en: "" });
  const [editingFacultyIdx, setEditingFacultyIdx] = useState<number | null>(null);

  // Department dialog
  const [deptDialogOpen, setDeptDialogOpen] = useState(false);
  const [deptForm, setDeptForm] = useState({ uz: "", ru: "", en: "" });
  const [deptFacultyIdx, setDeptFacultyIdx] = useState<number>(0);
  const [editingDeptIdx, setEditingDeptIdx] = useState<number | null>(null);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const res = await api.get("/universities");
      setUniversities(res.data.universities || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUniversities();
  }, [user]);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyUni());
    setDialogOpen(true);
  };

  const openEditDialog = (uni: University) => {
    setEditingId(uni._id);
    setForm({
      name: { ...uni.name },
      city: uni.city || "",
      region: uni.region || "",
      website: uni.website || "",
      email: uni.email || "",
      faculties: uni.faculties.map((f) => ({
        ...f,
        name: { ...f.name },
        departments: f.departments.map((d) => ({ ...d, name: { ...d.name } })),
      })),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.uz.trim()) {
      toast.error("Nomini kiriting");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/universities/${editingId}`, form);
      } else {
        await api.post("/universities", form);
      }
      toast.success(t("common.success", lang));
      setDialogOpen(false);
      fetchUniversities();
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("common.error", lang));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin.confirm_delete", lang))) return;
    try {
      await api.delete(`/universities/${id}`);
      toast.success(t("common.success", lang));
      fetchUniversities();
    } catch {
      toast.error(t("common.error", lang));
    }
  };

  // Faculty management
  const openAddFaculty = () => {
    setEditingFacultyIdx(null);
    setFacultyForm({ uz: "", ru: "", en: "" });
    setFacultyDialogOpen(true);
  };

  const openEditFaculty = (idx: number) => {
    setEditingFacultyIdx(idx);
    setFacultyForm({ ...form.faculties[idx].name });
    setFacultyDialogOpen(true);
  };

  const saveFaculty = () => {
    if (!facultyForm.uz.trim()) return;
    const updated = [...form.faculties];
    if (editingFacultyIdx !== null) {
      updated[editingFacultyIdx] = { ...updated[editingFacultyIdx], name: { ...facultyForm } };
    } else {
      updated.push({ name: { ...facultyForm }, departments: [] });
    }
    setForm({ ...form, faculties: updated });
    setFacultyDialogOpen(false);
  };

  const removeFaculty = (idx: number) => {
    setForm({ ...form, faculties: form.faculties.filter((_, i) => i !== idx) });
  };

  // Department management
  const openAddDept = (facIdx: number) => {
    setDeptFacultyIdx(facIdx);
    setEditingDeptIdx(null);
    setDeptForm({ uz: "", ru: "", en: "" });
    setDeptDialogOpen(true);
  };

  const openEditDept = (facIdx: number, deptIdx: number) => {
    setDeptFacultyIdx(facIdx);
    setEditingDeptIdx(deptIdx);
    setDeptForm({ ...form.faculties[facIdx].departments[deptIdx].name });
    setDeptDialogOpen(true);
  };

  const saveDept = () => {
    if (!deptForm.uz.trim()) return;
    const updated = [...form.faculties];
    const depts = [...updated[deptFacultyIdx].departments];
    if (editingDeptIdx !== null) {
      depts[editingDeptIdx] = { ...depts[editingDeptIdx], name: { ...deptForm } };
    } else {
      depts.push({ name: { ...deptForm } });
    }
    updated[deptFacultyIdx] = { ...updated[deptFacultyIdx], departments: depts };
    setForm({ ...form, faculties: updated });
    setDeptDialogOpen(false);
  };

  const removeDept = (facIdx: number, deptIdx: number) => {
    const updated = [...form.faculties];
    updated[facIdx] = {
      ...updated[facIdx],
      departments: updated[facIdx].departments.filter((_, i) => i !== deptIdx),
    };
    setForm({ ...form, faculties: updated });
  };

  if (!user) return null;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{t("admin.universities", lang)}</h1>
        {user.role === "superadmin" && (
          <Button onClick={openAddDialog} className="gap-2">
            <RiAddLine /> {t("admin.add_university", lang)}
          </Button>
        )}
      </div>

      {loading ? (
        [...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 mb-4" />)
      ) : universities.length > 0 ? (
        <div className="space-y-4">
          {universities.map((uni) => (
            <Card key={uni._id}>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <RiBuildingLine className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{getLocalizedField(uni.name, lang)}</h3>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1 ml-8">
                      {uni.city && <p>{uni.city}{uni.region ? `, ${uni.region}` : ""}</p>}
                      {uni.website && <p>{uni.website}</p>}
                      {uni.email && <p>{uni.email}</p>}
                    </div>
                    {uni.faculties.length > 0 && (
                      <div className="ml-8 mt-3">
                        <p className="text-sm font-medium mb-1">{t("admin.faculties_departments", lang)}:</p>
                        <div className="space-y-1">
                          {uni.faculties.map((fac, fi) => (
                            <div key={fi}>
                              <Badge variant="secondary" className="mr-2">{getLocalizedField(fac.name, lang)}</Badge>
                              {fac.departments.map((dept, di) => (
                                <Badge key={di} variant="outline" className="mr-1 text-xs">
                                  {getLocalizedField(dept.name, lang)}
                                </Badge>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {user.role === "superadmin" && (
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(uni)} className="gap-1">
                        <RiEditLine /> {t("common.edit", lang)}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(uni._id)} className="gap-1">
                        <RiDeleteBinLine /> {t("common.delete", lang)}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <RiBuildingLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}

      {/* University Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? t("admin.edit_university", lang) : t("admin.add_university", lang)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>{t("admin.name_uz", lang)} *</Label>
                <Input value={form.name.uz} onChange={(e) => setForm({ ...form, name: { ...form.name, uz: e.target.value } })} />
              </div>
              <div>
                <Label>{t("admin.name_ru", lang)}</Label>
                <Input value={form.name.ru} onChange={(e) => setForm({ ...form, name: { ...form.name, ru: e.target.value } })} />
              </div>
              <div>
                <Label>{t("admin.name_en", lang)}</Label>
                <Input value={form.name.en} onChange={(e) => setForm({ ...form, name: { ...form.name, en: e.target.value } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("admin.city", lang)}</Label>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <Label>{t("admin.region", lang)}</Label>
                <Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
              </div>
              <div>
                <Label>{t("admin.website", lang)}</Label>
                <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div>
                <Label>{t("admin.email", lang)}</Label>
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <Separator />

            {/* Faculties */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{t("admin.faculties_departments", lang)}</h3>
                <Button type="button" variant="outline" size="sm" onClick={openAddFaculty} className="gap-1">
                  <RiAddCircleLine /> {t("admin.add_faculty", lang)}
                </Button>
              </div>

              {form.faculties.length > 0 ? (
                <div className="space-y-3">
                  {form.faculties.map((fac, fi) => (
                    <Card key={fi} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{getLocalizedField(fac.name, lang) || `Fakultet ${fi + 1}`}</span>
                        <div className="flex gap-1">
                          <Button type="button" variant="ghost" size="sm" onClick={() => openEditFaculty(fi)}><RiEditLine className="h-3 w-3" /></Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFaculty(fi)}><RiDeleteBinLine className="h-3 w-3 text-destructive" /></Button>
                        </div>
                      </div>
                      <div className="ml-4 space-y-1">
                        {fac.departments.map((dept, di) => (
                          <div key={di} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{getLocalizedField(dept.name, lang)}</span>
                            <div className="flex gap-1">
                              <Button type="button" variant="ghost" size="sm" onClick={() => openEditDept(fi, di)}><RiEditLine className="h-3 w-3" /></Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeDept(fi, di)}><RiDeleteBinLine className="h-3 w-3 text-destructive" /></Button>
                            </div>
                          </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => openAddDept(fi)} className="gap-1 text-xs">
                          <RiAddCircleLine /> {t("admin.add_department", lang)}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t("common.no_results", lang)}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t("common.cancel", lang)}</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? t("common.loading", lang) : t("common.save", lang)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Faculty Dialog */}
      <Dialog open={facultyDialogOpen} onOpenChange={setFacultyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingFacultyIdx !== null ? t("admin.faculty", lang) : t("admin.add_faculty", lang)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>{t("admin.name_uz", lang)} *</Label><Input value={facultyForm.uz} onChange={(e) => setFacultyForm({ ...facultyForm, uz: e.target.value })} /></div>
            <div><Label>{t("admin.name_ru", lang)}</Label><Input value={facultyForm.ru} onChange={(e) => setFacultyForm({ ...facultyForm, ru: e.target.value })} /></div>
            <div><Label>{t("admin.name_en", lang)}</Label><Input value={facultyForm.en} onChange={(e) => setFacultyForm({ ...facultyForm, en: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFacultyDialogOpen(false)}>{t("common.cancel", lang)}</Button>
            <Button onClick={saveFaculty}>{t("common.save", lang)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Department Dialog */}
      <Dialog open={deptDialogOpen} onOpenChange={setDeptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDeptIdx !== null ? t("admin.department", lang) : t("admin.add_department", lang)}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>{t("admin.name_uz", lang)} *</Label><Input value={deptForm.uz} onChange={(e) => setDeptForm({ ...deptForm, uz: e.target.value })} /></div>
            <div><Label>{t("admin.name_ru", lang)}</Label><Input value={deptForm.ru} onChange={(e) => setDeptForm({ ...deptForm, ru: e.target.value })} /></div>
            <div><Label>{t("admin.name_en", lang)}</Label><Input value={deptForm.en} onChange={(e) => setDeptForm({ ...deptForm, en: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeptDialogOpen(false)}>{t("common.cancel", lang)}</Button>
            <Button onClick={saveDept}>{t("common.save", lang)}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
