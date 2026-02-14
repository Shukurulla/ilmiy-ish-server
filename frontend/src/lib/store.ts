import { create } from "zustand";
import api from "./api";
import Cookies from "js-cookie";

interface User {
  id: string;
  _id?: string;
  email: string;
  role: string;
  firstName: { uz: string; ru: string; en: string };
  lastName: { uz: string; ru: string; en: string };
  middleName?: { uz: string; ru: string; en: string };
  avatar?: string;
  university?: any;
  profileCompleted?: boolean;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    Cookies.set("token", res.data.token, { expires: 7 });
    set({ user: res.data.user });
  },
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    Cookies.set("token", res.data.token, { expires: 7 });
    set({ user: res.data.user });
  },
  logout: () => {
    Cookies.remove("token");
    set({ user: null });
  },
  fetchUser: async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        set({ loading: false });
        return;
      }
      const res = await api.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch {
      Cookies.remove("token");
      set({ user: null, loading: false });
    }
  },
}));

// Language store
type Lang = "uz" | "ru" | "en";

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: (typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang) : null) || "uz",
  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },
}));
