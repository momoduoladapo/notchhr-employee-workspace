import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Bell, Moon, Sun, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { cn } from "../components/ui";
import { useAuth } from "../store/AuthContext";
import { useApp } from "../store/AppContext";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard":   "Dashboard",
  "/attendance":  "Attendance",
  "/leave":       "Leave Management",
  "/payroll":     "Payroll",
  "/directory":   "Employee Directory",
  "/recruitment": "Recruitment",
  "/learning":    "Learning & Development",
  "/performance": "Performance",
  "/documents":   "Documents",
  "/settings":    "Settings",
};

export function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme, toggleSidebar, sidebarCollapsed, notificationCount } = useApp();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const title = ROUTE_LABELS[pathname] ?? "NotchHR";

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 z-10 flex items-center justify-between px-4 bg-card border-b border-border transition-all duration-300",
      sidebarCollapsed ? "left-16" : "left-64",
      "max-lg:left-0",
    )}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D62196] rounded-full" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <span className="text-xs text-[#440F7C] cursor-pointer hover:underline" onClick={() => setNotifOpen(false)}>Mark all read</span>
              </div>
              {[
                { text: "Your leave request was approved", time: "2 hours ago", unread: true },
                { text: "Payslip for September is available", time: "1 day ago", unread: true },
                { text: "New course assigned: Leadership 101", time: "2 days ago", unread: true },
              ].map((n, i) => (
                <div key={i} className={cn("px-4 py-3 border-b border-border last:border-0 flex gap-3 items-start cursor-pointer hover:bg-muted/50 transition-colors", n.unread && "bg-[#440F7C]/3")}>
                  {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#D62196] mt-1.5 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground leading-snug">{n.text}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1">
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#440F7C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
            </div>
            {user && (
              <span className="text-sm font-medium text-foreground hidden sm:block max-w-[120px] truncate">
                {user.firstName}
              </span>
            )}
            <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-1 overflow-hidden">
              {user && (
                <div className="px-4 py-3 border-b border-border">
                  <div className="text-sm font-semibold text-foreground">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                </div>
              )}
              <button onClick={() => { navigate("/settings"); setProfileOpen(false); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                <User size={14} className="text-muted-foreground" />My Profile
              </button>
              <button onClick={() => { navigate("/settings"); setProfileOpen(false); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                <Settings size={14} className="text-muted-foreground" />Settings
              </button>
              <div className="border-t border-border my-1" />
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                <LogOut size={14} />Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
