import React from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard, Clock, CalendarDays, Wallet, Users, Briefcase,
  GraduationCap, Target, FileText, Settings, LogOut, ChevronLeft, Menu, X,
} from "lucide-react";
import { cn } from "../components/ui";
import { useAuth } from "../store/AuthContext";
import { useApp } from "../store/AppContext";

const NAV = [
  { section: "Workforce", items: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/attendance",  icon: Clock,          label: "Attendance" },
    { to: "/leave",       icon: CalendarDays,   label: "Leave" },
    { to: "/payroll",     icon: Wallet,         label: "Payroll" },
  ]},
  { section: "People", items: [
    { to: "/directory",   icon: Users,          label: "Directory" },
    { to: "/recruitment", icon: Briefcase,      label: "Recruitment" },
  ]},
  { section: "Growth", items: [
    { to: "/learning",    icon: GraduationCap,  label: "Learning" },
    { to: "/performance", icon: Target,         label: "Performance" },
  ]},
  { section: "Organisation", items: [
    { to: "/documents",   icon: FileText,       label: "Documents" },
    { to: "/settings",    icon: Settings,       label: "Settings" },
  ]},
];

export function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, setSidebarCollapsed, toggleSidebar } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const collapsed = sidebarCollapsed;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={toggleSidebar} />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full z-30 flex flex-col bg-[#440F7C] text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 h-16 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#D62196] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg leading-none truncate">NotchHR</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#D62196] flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded-md hover:bg-white/10 transition-colors flex-shrink-0"
          >
            {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button onClick={toggleSidebar} className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
          {NAV.map(group => (
            <div key={group.section}>
              {!collapsed && (
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {group.section}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-2 py-2 rounded-lg transition-all text-sm font-medium",
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                      collapsed && "justify-center px-2",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/10 p-3 flex-shrink-0">
          {!collapsed && user && (
            <div className="flex items-center gap-2 px-2 py-2 mb-1 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#D62196] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">{user.firstName} {user.lastName}</div>
                <div className="text-[10px] text-white/50 truncate">{user.role}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors",
              collapsed && "justify-center",
            )}
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
