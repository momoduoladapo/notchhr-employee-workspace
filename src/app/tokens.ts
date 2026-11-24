import type React from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
// Values are CSS variable references so they adapt to light/dark mode automatically.
export const C = {
  purple: "var(--brand-purple)", purpleIcon: "var(--brand-purple-icon)",
  purple100: "var(--brand-purple100)", purple200: "var(--brand-purple200)",
  purple300: "var(--brand-purple300)", purple800: "var(--brand-purple800)",
  magenta: "var(--brand-magenta)", magentaIcon: "var(--brand-magenta-icon)",
  magenta100: "var(--brand-magenta100)", magenta200: "var(--brand-magenta200)",
  magenta800: "var(--brand-magenta800)", magenta900: "var(--brand-magenta900)",
  tertiary50: "var(--brand-tertiary50)", tertiary100: "var(--brand-tertiary100)", tertiary200: "var(--brand-tertiary200)",
  tertiary300: "var(--brand-tertiary300)", tertiary400: "var(--brand-tertiary400)", tertiary: "var(--brand-tertiary)",
  tertiary600: "var(--brand-tertiary600)", tertiary700: "var(--brand-tertiary700)", tertiary800: "var(--brand-tertiary800)",
  tertiary900: "var(--brand-tertiary900)", white: "var(--brand-white)", bg: "var(--brand-bg)",
};

export const S = {
  success: "var(--status-success)", success50: "var(--status-success50)", success100: "var(--status-success100)",
  error: "var(--status-error)", error50: "var(--status-error50)", error100: "var(--status-error100)",
  warning: "var(--status-warning)", warning50: "var(--status-warning50)", warning100: "var(--status-warning100)",
  info: "var(--status-info)", info50: "var(--status-info50)", info100: "var(--status-info100)",
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type PlanId = "basic" | "standard" | "premium";
export type ScenarioId = 1 | 2 | 3;
export type ViewMode = "desktop" | "tablet" | "mobile";

export type OrgAccount = {
  id: string;
  name: string;
  country: string;
  industry: string;
  role: string;
  logo: string;
  avatarBg: string;
  avatarFg: string;
  initials: string;
};

export type AnnouncementIcon = "Users" | "FileText" | "MessageCircle" | "Heart" | "Star" | "Bell" | "Calendar" | "Laptop" | "Briefcase" | "Award" | "Info" | "CheckSquare";

export type QA = { label: string; icon: React.ElementType; hint: string; toast: string };

export type ApprovalStatus = "pending" | "awaiting" | "processing" | "approved";

export type SalaryOnDemandRecord = {
  grossSalary: number;
  earnedToDate: number;
  withdrawn: number;
  payDate: string;
  cycleStart: string;
  cycleEnd: string;
};

export type TaxReliefRecord = { status: string; annualRent: string; covered: string; coveredPct: number; disbursed: string; remaining: string; cycle: string };

export type NotifItem = {
  id: number; group: string; icon: React.ElementType;
  iconBg: string; iconFg: string; title: string; desc: string; time: string;
  read: boolean; badge: string | null; badgeBg: string; badgeFg: string;
};

export type PMenuItem = { id: string; label: string; icon: React.ElementType; danger?: boolean };

export type WsRecord = { id: string; name: string; order: string[] };

export type AuthStep = "login" | "pin" | "otp" | "org-select" | "loading" |
                "forgot-phone" | "forgot-otp" | "forgot-newpin" | "forgot-confirmpin" | "forgot-success";
