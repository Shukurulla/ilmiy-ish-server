"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiBookOpenLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";
import { toast } from "sonner";

interface ScientificField {
  _id: string;
  code: string;
  branch: { code: string; uz: string; ru: string; en: string };
  group?: { code: string; uz: string; ru: string; en: string };
  name: { uz: string; ru: string; en: string };
  isActive: boolean;
}

interface Branch {
  _id: string;
  uz: string;
  ru: string;
  en: string;
}

export default function AdminFieldsPage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  const [fields, setFields] = useState<ScientificField[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set());

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fieldsRes, branchesRes] = await Promise.all([
        api.get("/scientific-fields"),
        api.get("/scientific-fields/branches"),
      ]);
      setFields(fieldsRes.data.fields || []);
      setBranches(branchesRes.data.branches || []);
    } catch {
      toast.error(t("common.error", lang));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const toggleBranch = (branchCode: string) => {
    setExpandedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchCode)) next.delete(branchCode);
      else next.add(branchCode);
      return next;
    });
  };

  const toggleActive = async (fieldId: string, currentActive: boolean) => {
    try {
      await api.put(`/scientific-fields/${fieldId}`, { isActive: !currentActive });
      setFields((prev) =>
        prev.map((f) => (f._id === fieldId ? { ...f, isActive: !currentActive } : f))
      );
    } catch {
      toast.error(t("common.error", lang));
    }
  };

  // Filter fields based on search
  const filteredFields = useMemo(() => {
    if (!search.trim()) return fields;
    const q = search.toLowerCase();
    return fields.filter(
      (f) =>
        f.code.toLowerCase().includes(q) ||
        f.name.uz.toLowerCase().includes(q) ||
        f.name.ru.toLowerCase().includes(q) ||
        f.name.en.toLowerCase().includes(q)
    );
  }, [fields, search]);

  // Group filtered fields by branch, then by group within branch
  const groupedByBranch = useMemo(() => {
    const map: Record<
      string,
      {
        branch: Branch | { _id: string; uz: string; ru: string; en: string };
        groups: Record<string, { group: { code: string; uz: string; ru: string; en: string } | null; items: ScientificField[] }>;
        totalCount: number;
        activeCount: number;
      }
    > = {};

    for (const field of filteredFields) {
      if (!field.branch) continue;
      const branchCode = field.branch.code;
      if (!map[branchCode]) {
        const branchInfo = branches.find((b) => b._id === branchCode) || {
          _id: branchCode,
          uz: field.branch.uz || "",
          ru: field.branch.ru || "",
          en: field.branch.en || "",
        };
        map[branchCode] = { branch: branchInfo, groups: {}, totalCount: 0, activeCount: 0 };
      }

      const groupCode = field.group?.code || "no-group";
      if (!map[branchCode].groups[groupCode]) {
        map[branchCode].groups[groupCode] = {
          group: field.group || null,
          items: [],
        };
      }

      map[branchCode].groups[groupCode].items.push(field);
      map[branchCode].totalCount++;
      if (field.isActive) map[branchCode].activeCount++;
    }

    return map;
  }, [filteredFields, branches]);

  // Auto-expand branches when searching
  useEffect(() => {
    if (search.trim()) {
      setExpandedBranches(new Set(Object.keys(groupedByBranch)));
    }
  }, [search, groupedByBranch]);

  if (!user) return null;

  const branchCodes = Object.keys(groupedByBranch).sort();

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {t("common.total", lang)}: {fields.length} | {t("admin.manage_fields", lang)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("specialty.search", lang)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold text-primary">{fields.length}</div>
            <div className="text-xs text-muted-foreground">{t("common.total", lang)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold text-green-600">{fields.filter((f) => f.isActive).length}</div>
            <div className="text-xs text-muted-foreground">
              {lang === "uz" ? "Faol" : lang === "ru" ? "Активных" : "Active"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold">{branches.length}</div>
            <div className="text-xs text-muted-foreground">{t("specialty.branch", lang)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-3 text-center">
            <div className="text-2xl font-bold">{filteredFields.length}</div>
            <div className="text-xs text-muted-foreground">{t("search.results_found", lang)}</div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : branchCodes.length > 0 ? (
        <div className="space-y-3">
          {branchCodes.map((branchCode) => {
            const branchData = groupedByBranch[branchCode];
            const isExpanded = expandedBranches.has(branchCode);

            return (
              <Card key={branchCode} className="overflow-hidden">
                {/* Branch header */}
                <button
                  type="button"
                  onClick={() => toggleBranch(branchCode)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs shrink-0">
                      {branchCode}
                    </Badge>
                    <span className="font-semibold">
                      {getLocalizedField(branchData.branch, lang)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {branchData.activeCount}/{branchData.totalCount}
                    </span>
                    <RiArrowDownSLine
                      className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Expanded: groups and specialties */}
                {isExpanded && (
                  <div className="border-t">
                    {Object.entries(branchData.groups)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([groupCode, groupData]) => (
                        <div key={groupCode}>
                          {/* Group header */}
                          {groupCode !== "no-group" && groupData.group && (
                            <div className="px-6 py-2 bg-muted/30 border-b">
                              <span className="text-xs font-mono text-muted-foreground mr-2">
                                {groupData.group.code}
                              </span>
                              <span className="text-sm font-medium">
                                {getLocalizedField(groupData.group, lang)}
                              </span>
                            </div>
                          )}

                          {/* Specialty items */}
                          {groupData.items
                            .sort((a, b) => a.code.localeCompare(b.code))
                            .map((field) => (
                              <div
                                key={field._id}
                                className={`flex items-center justify-between px-6 py-2 border-b last:border-0 hover:bg-accent/30 transition-colors ${
                                  !field.isActive ? "opacity-50" : ""
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="font-mono text-xs text-muted-foreground shrink-0 w-20">
                                    {field.code}
                                  </span>
                                  <span className="text-sm truncate">
                                    {getLocalizedField(field.name, lang)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {field.isActive ? (
                                    <RiCheckLine className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <RiCloseLine className="h-4 w-4 text-red-500" />
                                  )}
                                  {user.role === "superadmin" && (
                                    <Switch
                                      checked={field.isActive}
                                      onCheckedChange={() =>
                                        toggleActive(field._id, field.isActive)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <RiBookOpenLine className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}
    </div>
  );
}
