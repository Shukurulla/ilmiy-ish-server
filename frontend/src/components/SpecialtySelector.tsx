"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RiCloseLine, RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

interface ScientificFieldItem {
  _id: string;
  code: string;
  branch: { code: string; uz: string; ru: string; en: string };
  group?: { code: string; uz: string; ru: string; en: string };
  name: { uz: string; ru: string; en: string };
}

interface Branch {
  _id: string;
  uz: string;
  ru: string;
  en: string;
}

interface SpecialtySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

export default function SpecialtySelector({
  value,
  onChange,
  multiple = true,
  placeholder,
}: SpecialtySelectorProps) {
  const { lang } = useLangStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ScientificFieldItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [branchFields, setBranchFields] = useState<ScientificFieldItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ScientificFieldItem[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load branches on mount
  useEffect(() => {
    api
      .get("/scientific-fields/branches")
      .then((res) => setBranches(res.data.branches || []))
      .catch(() => {});
  }, []);

  // Load selected items by IDs
  useEffect(() => {
    if (value.length > 0 && selectedItems.length === 0) {
      api
        .get("/scientific-fields")
        .then((res) => {
          const allFields = res.data.fields || [];
          const items = allFields.filter((f: ScientificFieldItem) =>
            value.includes(f._id)
          );
          setSelectedItems(items);
        })
        .catch(() => {});
    }
  }, [value]);

  // Search with debounce
  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      api
        .get(`/scientific-fields/search?q=${encodeURIComponent(q)}`)
        .then((res) => setSearchResults(res.data.fields || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
  }, []);

  // Load branch fields
  const handleBranchSelect = (branchCode: string) => {
    if (selectedBranch === branchCode) {
      setSelectedBranch(null);
      setBranchFields([]);
      return;
    }
    setSelectedBranch(branchCode);
    setLoading(true);
    api
      .get(`/scientific-fields/by-branch/${branchCode}`)
      .then((res) => setBranchFields(res.data.fields || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const toggleItem = (item: ScientificFieldItem) => {
    const isSelected = value.includes(item._id);
    if (isSelected) {
      onChange(value.filter((id) => id !== item._id));
      setSelectedItems((prev) => prev.filter((i) => i._id !== item._id));
    } else {
      if (multiple) {
        onChange([...value, item._id]);
        setSelectedItems((prev) => [...prev, item]);
      } else {
        onChange([item._id]);
        setSelectedItems([item]);
        setIsOpen(false);
      }
    }
  };

  const removeItem = (id: string) => {
    onChange(value.filter((v) => v !== id));
    setSelectedItems((prev) => prev.filter((i) => i._id !== id));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayFields = searchQuery.length >= 2 ? searchResults : branchFields;

  // Group branchFields by group
  const groupedFields: Record<string, ScientificFieldItem[]> = {};
  if (searchQuery.length < 2) {
    for (const f of branchFields) {
      const groupKey = f.group?.code || "no-group";
      if (!groupedFields[groupKey]) groupedFields[groupKey] = [];
      groupedFields[groupKey].push(f);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Selected items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selectedItems.map((item) => (
            <Badge
              key={item._id}
              variant="secondary"
              className="gap-1 pr-1 text-xs"
            >
              <span className="font-mono text-[10px] opacity-70">
                {item.code}
              </span>{" "}
              {getLocalizedField(item.name, lang)}
              <button
                onClick={() => removeItem(item._id)}
                className="ml-1 p-0.5 rounded-full hover:bg-muted"
              >
                <RiCloseLine className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        className="w-full justify-between font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted-foreground truncate">
          {placeholder ||
            t("specialty.select", lang) ||
            "Ilmiy sohani tanlang..."}
        </span>
        <RiArrowDownSLine
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-popover border rounded-lg shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("specialty.search", lang) || "Qidirish..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 h-9"
                autoFocus
              />
            </div>
          </div>

          <ScrollArea className="max-h-72">
            {/* Search results mode */}
            {searchQuery.length >= 2 ? (
              <div className="p-1">
                {loading ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {t("common.loading", lang)}
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {t("common.no_results", lang)}
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                        value.includes(item._id) ? "bg-accent/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                          {item.code}
                        </span>
                        <span>{getLocalizedField(item.name, lang)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 pl-12">
                        {getLocalizedField(item.branch, lang)}
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              /* Browse mode - branches */
              <div className="p-1">
                {branches.map((branch) => (
                  <div key={branch._id}>
                    <button
                      type="button"
                      onClick={() => handleBranchSelect(branch._id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors flex items-center justify-between ${
                        selectedBranch === branch._id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {branch._id}
                        </span>
                        <span>{(branch as any)[lang] || branch.uz}</span>
                      </div>
                      <RiArrowDownSLine
                        className={`h-4 w-4 transition-transform ${
                          selectedBranch === branch._id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded specialties under branch */}
                    {selectedBranch === branch._id && (
                      <div className="ml-4 border-l pl-2 my-1">
                        {loading ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            {t("common.loading", lang)}
                          </div>
                        ) : Object.keys(groupedFields).length > 0 ? (
                          Object.entries(groupedFields).map(
                            ([groupCode, items]) => (
                              <div key={groupCode}>
                                {groupCode !== "no-group" && items[0]?.group && (
                                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                                    {items[0].group.code} -{" "}
                                    {getLocalizedField(items[0].group, lang)}
                                  </div>
                                )}
                                {items.map((item) => (
                                  <button
                                    key={item._id}
                                    type="button"
                                    onClick={() => toggleItem(item)}
                                    className={`w-full text-left px-2 py-1.5 rounded text-sm hover:bg-accent transition-colors ${
                                      value.includes(item._id)
                                        ? "bg-primary/10 text-primary"
                                        : ""
                                    }`}
                                  >
                                    <span className="font-mono text-xs text-muted-foreground mr-2">
                                      {item.code}
                                    </span>
                                    {getLocalizedField(item.name, lang)}
                                  </button>
                                ))}
                              </div>
                            )
                          )
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">
                            {t("common.no_results", lang)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
