import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Theme } from "../types";

interface AppContextValue {
  theme: Theme; sidebarOpen: boolean; sidebarCollapsed: boolean; notificationCount: number;
  toggleTheme: () => void; toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void; setNotificationCount: (n: number) => void;
}

const Ctx = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return (localStorage.getItem("notch-prod-theme") as Theme) ?? "light"; } catch { return "light"; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("notch-prod-theme", theme); } catch { /* */ }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(t => t === "light" ? "dark" : "light"), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(o => !o), []);
  const setSidebarCollapsed = useCallback((v: boolean) => setSidebarCollapsedState(v), []);

  return (
    <Ctx.Provider value={{ theme, sidebarOpen, sidebarCollapsed, notificationCount, toggleTheme, toggleSidebar, setSidebarCollapsed, setNotificationCount }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
