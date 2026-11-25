// ─── NotchHR Production Router ────────────────────────────────────────────────
// Route map:
//   /demo                  → Existing prototype (preserved, unchanged)
//   /                      → Redirect → /dashboard (auth) | /login (not auth)
//   /login                 → Phone + PIN step
//   /login/otp             → OTP verification
//   /login/org             → Organisation selection
//   /dashboard             → Main workspace dashboard
//   /attendance            → Attendance & time tracking
//   /leave                 → Leave management + approvals
//   /payroll               → Payroll, payslips, benefits
//   /directory             → Employee directory
//   /recruitment           → Jobs & candidate pipeline
//   /learning              → E-learning courses
//   /performance           → KPIs & review cycles
//   /documents             → Document hub
//   /settings              → User settings & preferences
//   *                      → 404

import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AuthProvider } from "./store/AuthContext";
import { AppProvider } from "./store/AppContext";
import { AppLayout, AuthLayout } from "./layout/AppLayout";
import { LoadingSpinner } from "./components/ui";

// ── Lazy page imports (each route is code-split) ──────────────────────────
// Demo: dynamic import avoids circular dependency (App.tsx → routes.tsx → App.tsx).
// By the time the /demo route renders, App.tsx is already in the module cache.
const DemoApp = React.lazy(() =>
  import("../App").then(m => ({ default: m.DemoApp }))
);

const LoginPage    = React.lazy(() => import("./pages/auth/LoginPage"));
const OTPPage      = React.lazy(() => import("./pages/auth/OTPPage"));
const OrgSelectPage= React.lazy(() => import("./pages/auth/OrgSelectPage"));
const DashboardPage= React.lazy(() => import("./pages/DashboardPage"));
const AttendancePage=React.lazy(() => import("./pages/AttendancePage"));
const LeavePage    = React.lazy(() => import("./pages/LeavePage"));
const PayrollPage  = React.lazy(() => import("./pages/PayrollPage"));
const DirectoryPage= React.lazy(() => import("./pages/DirectoryPage"));
const RecruitmentPage = React.lazy(() =>
  import("./pages/RecruitmentPage").then(m => ({ default: m.RecruitmentPage }))
);
const LearningPage = React.lazy(() =>
  import("./pages/LearningPage").then(m => ({ default: m.LearningPage }))
);
const PerformancePage = React.lazy(() =>
  import("./pages/PerformancePage").then(m => ({ default: m.PerformancePage }))
);
const DocumentsPage = React.lazy(() =>
  import("./pages/DocumentsPage").then(m => ({ default: m.DocumentsPage }))
);
const SettingsPage = React.lazy(() =>
  import("./pages/SettingsPage").then(m => ({ default: m.SettingsPage }))
);
const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage }))
);

// ── Shared providers (wraps all production routes) ────────────────────────
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AppProvider>
  );
}

// ── Suspense boundary for all lazy pages ──────────────────────────────────
function Page({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

// ── Router definition ─────────────────────────────────────────────────────
export const router = createBrowserRouter([

  // ── Demo / Prototype ── completely independent, no shared providers ──────
  // Access at /demo — the full existing Figma Make prototype
  {
    path: "/demo",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <DemoApp />
      </Suspense>
    ),
  },

  // ── Production frontend ── authenticated app shell ────────────────────
  {
    element: (
      <Providers>
        <AppLayout />
      </Providers>
    ),
    children: [
      // Root redirect: /  →  /dashboard
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard",    element: <Page><DashboardPage /></Page> },
      { path: "attendance",   element: <Page><AttendancePage /></Page> },
      { path: "leave",        element: <Page><LeavePage /></Page> },
      { path: "payroll",      element: <Page><PayrollPage /></Page> },
      { path: "directory",    element: <Page><DirectoryPage /></Page> },
      { path: "recruitment",  element: <Page><RecruitmentPage /></Page> },
      { path: "learning",     element: <Page><LearningPage /></Page> },
      { path: "performance",  element: <Page><PerformancePage /></Page> },
      { path: "documents",    element: <Page><DocumentsPage /></Page> },
      { path: "settings",     element: <Page><SettingsPage /></Page> },
      { path: "settings/:section", element: <Page><SettingsPage /></Page> },
    ],
  },

  // ── Auth routes ── outside AppLayout, no sidebar/topbar ──────────────
  {
    element: (
      <Providers>
        <AuthLayout />
      </Providers>
    ),
    children: [
      { path: "login",      element: <Page><LoginPage /></Page> },
      { path: "login/otp",  element: <Page><OTPPage /></Page> },
      { path: "login/org",  element: <Page><OrgSelectPage /></Page> },
    ],
  },

  // ── 404 catch-all ────────────────────────────────────────────────────
  { path: "*", element: <Page><NotFoundPage /></Page> },
], {
  basename: import.meta.env.BASE_URL,
});
