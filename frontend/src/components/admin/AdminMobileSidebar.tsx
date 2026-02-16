"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import AdminSidebarContent from "./AdminSidebarContent";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminMobileSidebar({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Admin Menu</SheetTitle>
        <AdminSidebarContent onNavigate={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
