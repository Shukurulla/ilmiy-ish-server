"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiNotification3Line, RiCheckDoubleLine, RiArrowLeftLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useLangStore } from "@/lib/store";
import { t, getLocalizedField } from "@/lib/i18n";
import api from "@/lib/api";

export default function NotificationsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const { lang } = useLangStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      api.get("/notifications").then((res) => {
        setNotifications(res.data.notifications || []);
      }).catch(() => {}).finally(() => setLoading(false));
    }
  }, [user]);

  const markAsRead = async (id: string) => {
    await api.put(`/notifications/read/${id}`);
    setNotifications(notifications.map((n) => n._id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = async () => {
    await api.put("/notifications/read-all");
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  if (authLoading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard"><Button variant="ghost" size="icon"><RiArrowLeftLine /></Button></Link>
          <h1 className="text-2xl font-bold">{t("dashboard.notifications", lang)}</h1>
        </div>
        {notifications.some((n) => !n.isRead) && (
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
            <RiCheckDoubleLine /> {t("notifications.mark_all_read", lang)}
          </Button>
        )}
      </div>

      {loading ? (
        [...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 mb-3" />)
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif: any) => (
            <Card
              key={notif._id}
              className={`cursor-pointer transition-colors ${!notif.isRead ? "border-primary/50 bg-primary/5" : ""}`}
              onClick={() => {
                if (!notif.isRead) markAsRead(notif._id);
                if (notif.publication) router.push(`/publications/${notif.publication._id || notif.publication}`);
              }}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  {!notif.isRead && <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{getLocalizedField(notif.title, lang)}</p>
                    <p className="text-sm text-muted-foreground mt-1">{getLocalizedField(notif.message, lang)}</p>
                    {notif.comment && <p className="text-xs text-orange-600 mt-1">{notif.comment}</p>}
                    <p className="text-xs text-muted-foreground mt-2">{new Date(notif.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <RiNotification3Line className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p>{t("common.no_results", lang)}</p>
        </div>
      )}
    </div>
  );
}
