import React from "react";
import { Outlet, Navigate, useSearchParams } from "react-router";
import { cn } from "../components/ui";
import { useAuth } from "../store/AuthContext";
import { useApp } from "../store/AppContext";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppLayout() {
  const { status } = useAuth();
  const { sidebarCollapsed } = useApp();

  if (status === "idle" || status === "unauthenticated") return <Navigate to="/login" replace />;
  if (status === "session_expired") return <Navigate to="/login?expired=true" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <TopBar />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        sidebarCollapsed ? "lg:pl-16" : "lg:pl-64",
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AuthLayout() {
  const { status } = useAuth();
  const [params] = useSearchParams();

  if (status === "authenticated") return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#440F7C] to-[#2d0a52] flex flex-col items-center justify-center p-4">
      {params.get("expired") === "true" && (
        <div className="w-full max-w-sm mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 text-sm">
          Your session has expired. Please sign in again.
        </div>
      )}
      <Outlet />
    </div>
  );
}
