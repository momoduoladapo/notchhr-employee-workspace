import { useState, useMemo, useEffect, useRef } from "react";
import React from "react";
import {
  Bell, BookOpen, Calendar, Clock, FileText, DollarSign,
  AlertCircle, Eye, EyeOff, Plus, ChevronDown,
  LayoutDashboard, Users, Briefcase, Award,
  User, Upload, Shield, Coffee, Laptop, ArrowRight,
  Monitor, Tablet, Smartphone, CheckSquare, Lock,
  Target, Star, GraduationCap, Heart, AlertTriangle, TrendingUp,
  LayoutGrid, Globe, HelpCircle, LogOut, Check, Settings,
  Command, X, Info, Sliders, GripVertical, Pencil, RotateCcw, MessageCircle,
  ExternalLink, ChevronRight, ChevronLeft, Pin, Bookmark, Building2, BadgeCheck, Phone, CheckCircle,
  LogIn, Timer, CalendarClock, Home, Moon, Sun,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { PieChart, Pie, Cell } from "recharts";
import imgLogo from "@/imports/Header/1e98815916c2da691000efb84bd865b81ff2aff7.png";
import svgPaths from "@/imports/Header/svg-dsmq9ulj5k";

import { C, S, type PlanId, type ScenarioId, type ViewMode, type WsRecord } from "./tokens";
import {
  MODULES, has, PLAN_META, SCENARIO_META, APP_MODULES, PHOTOS, EMPLOYEE, ORG_ACCOUNTS,
  ANNOUNCEMENTS, ANNOUNCEMENT_ICON_MAP, EVENTS, PENDING_TASKS,
  QA_BASIC, QA_STANDARD, QA_PREMIUM,
  QA_CATALOG_BASIC, QA_CATALOG_STANDARD, QA_CATALOG_PREMIUM,
  APPROVALS, APPROVALS_STANDARD, APPROVALS_BASIC,
  TEAM, ON_LEAVE, LEAVE_REQUESTS, DIRECTORY, HOLIDAYS, ANNIVERSARIES, BIRTHDAYS,
  KPI_DATA, DOCS_DATA, PERF_DATA, LEARNING_DATA, ENPS_DATA, ANNOUNCEMENT_UNREAD,
  SALARY_DEMAND_DATA, TAX_RELIEF_DATA,
  MEMBER_ONLINE, MEMBER_BIRTHDAY_TODAY, MEMBER_ON_LEAVE, SUBORDINATES,
  ABOUT_ME_DEFAULTS, COMPETENCY_DATA, WORK_HISTORY_DATA, ACADEMIC_HIST,
  PENSION_DATA, TAX_DATA, EMPLOYMENT_DETAILS_DATA,
  MODULE_CATALOG, ADDABLE_CARD_IDS,
  RECENT_SEARCHES, SEARCH_DATA, LANGUAGES, NOTIFS, PROFILE_GROUPS, DG_CASES,
  ALL_WS_MODULES, WS_ROW_SIZES, WS_FLAT_DEFAULT, getDefaultOrder, WS_MULTI_KEY, WS_ACTIVE_KEY, makeDefaultWs,
  CARD_SPAN_DEFAULT, CARD_SPAN_MIN, CARD_SPAN_MAX, CARD_MODULE,
} from "./data";
import { Av, Card, SecHead, EmptyCard, ProfileProgress, packLayout } from "./shared";
import {
  AppLauncher, AppLauncherPanel, GlobalSearch,
  LanguageTrigger, LanguageSelectorPanel,
  NotifTrigger, NotificationPanel,
  HelpSupportPanel, ProfileTrigger, ProfileMenuPanel,
} from "./panels";
import {
  KPICard, DocumentsCard, FigmaTable, GrievanceCard, PerformanceCard,
  LearningCard, ENPSCard, AboutMeCard, CompetencyCard, WorkHistoryCard,
  AcademicProfessionalCard, PayrollHistoryCard, PensionCard, TaxHistoryCard,
  EmploymentDetailsCard, RecruitmentCard, TimeTrackerCard,
} from "./cards";
import { AuthFlow } from "./auth";

function Dashboard({ scenario, plan, viewMode, tourEditMode = false }: { scenario: ScenarioId; plan: PlanId; viewMode: ViewMode; tourEditMode?: boolean }) {
  const [leaveFilter, setLeaveFilter] = useState<{ by: "dept" | "cadre" | "role"; value: string } | null>(null);
  const [leaveDropdownOpen, setLeaveDropdownOpen] = useState(false);
  const [leaveReqTab, setLeaveReqTab] = useState<"data" | "empty">("data");
  const [payPrivacy, setPayPrivacy] = useState(false);
  const [payrollTab, setPayrollTab] = useState<"Payroll" | "Payroll History" | "Pension History" | "Tax History" | "Salary on Demand" | "Tax Relief">("Payroll");
  const [showAppLinks, setShowAppLinks] = useState(false);
  const [teamTab, setTeamTab] = useState<"Events" | "Work Anniversaries" | "Holiday" | "Birthdays">("Birthdays");
  const [teamViewTab, setTeamViewTab] = useState<"Members" | "Subordinates">("Members");
  const [taxReliefSubTab, setTaxReliefSubTab] = useState<"NHIS" | "NHIA" | "NHF" | "Rent Relief">("NHIS");
  const [pinnedAnnouncement, setPinnedAnnouncement] = useState<string | null>(null);
  const togglePin = (title: string) => setPinnedAnnouncement(prev => prev === title ? null : title);
  const [calOffset, setCalOffset] = useState(0); // months relative to current WAT month
  const [attendanceView, setAttendanceView] = useState(0); // 0 = regular, 1 = shift
  const [qaEditOpen, setQaEditOpen] = useState(false);
  const [customQALabels, setCustomQALabels] = useState<string[] | null>(null);
  const [qaEditorDraft, setQaEditorDraft] = useState<string[]>([]);

  // ── Personalisation ─────────────────────────────────────────────────────────
  const [isEditing, setIsEditing] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  const [workspaces, setWorkspaces] = useState<WsRecord[]>(() => {
    try {
      const s = localStorage.getItem(WS_MULTI_KEY);
      if (s) { const p = JSON.parse(s) as WsRecord[]; if (p.length) return p; }
    } catch {}
    return [makeDefaultWs()];
  });
  const [activeWsId, setActiveWsId] = useState<string>(() => {
    try { return localStorage.getItem(WS_ACTIVE_KEY) || "default"; }
    catch { return "default"; }
  });
  const activeWs = workspaces.find(w => w.id === activeWsId) ?? workspaces[0];

  const [cardOrder, setCardOrder] = useState<string[]>(() => [...(activeWs?.order ?? getDefaultOrder(plan))]);
  const [savedOrder, setSavedOrder] = useState<string[]>(() => [...(activeWs?.order ?? getDefaultOrder(plan))]);
  const isDirty = JSON.stringify(cardOrder) !== JSON.stringify(savedOrder);

  // Sync card order to plan-specific default whenever the plan changes
  useEffect(() => {
    const order = getDefaultOrder(plan);
    setCardOrder([...order]);
    setSavedOrder([...order]);
  }, [plan]);

  // Returns true when a card is available in the active plan
  const isPlanCard = (id: string) => {
    const mod = CARD_MODULE[id];
    return !mod || has(plan, mod);
  };

  const [resetConfirm, setResetConfirm] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  // Live preview: compute the rearranged order while the user is hovering during drag
  const previewOrder = useMemo(() => {
    if (!dragging || !dragOver || dragOver === dragging) return cardOrder;
    const arr = [...cardOrder];
    const fi = arr.indexOf(dragging);
    if (fi === -1) return arr;
    arr.splice(fi, 1);
    const ti = arr.indexOf(dragOver);
    if (ti === -1) return arr;
    arr.splice(ti, 0, dragging);
    return arr;
  }, [dragging, dragOver, cardOrder]);

  // packedRows: kept for signature compat but not used in fluid layout
  const packedRows = useMemo(() => {
    return [previewOrder.filter(isPlanCard)];
  }, [previewOrder, plan]);

  // Dropdown interaction state
  const [wsEditId, setWsEditId] = useState<string | null>(null);
  const [wsRenameId, setWsRenameId] = useState<string | null>(null);
  const [wsRenameVal, setWsRenameVal] = useState("");
  const [wsDeleteId, setWsDeleteId] = useState<string | null>(null);
  const [wsLockTooltip, setWsLockTooltip] = useState(false);
  const [wsResetConfirm, setWsResetConfirm] = useState(false);
  const [identityLockTooltip, setIdentityLockTooltip] = useState(false);

  const toggleModule = (id: string) => {
    if (id === "identity") return;
    setCardOrder(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  // Save panel state
  const [savePanelOpen, setSavePanelOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  const emp = EMPLOYEE[scenario];
  const isMobile = viewMode === "mobile";
  const isTablet = viewMode === "tablet";

  const px = isMobile ? "px-3" : isTablet ? "px-4" : "px-6";

  const firstName = emp.name.split(" ")[0];
  const hour = new Date().getHours();
  const timeOfDay = hour >= 5 && hour < 12 ? "Morning" : hour >= 12 && hour < 17 ? "Afternoon" : "Night";
  const greeting = `Good ${timeOfDay}, ${firstName}! 👋`;
  const subGreeting = "Welcome back! Here's your workday at a glance.";

  // ── Drag handlers ────────────────────────────────────────────────────────────
  const handleDragStart = (id: string, e: React.DragEvent) => {
    if (id === "identity") { e.preventDefault(); return; }
    setDragging(id);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (cardId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // Never drag over the identity card (it must stay first)
    if (dragging && cardId !== dragging && cardId !== "identity") setDragOver(cardId);
  };
  const commitDrop = () => {
    if (!dragging) { setDragging(null); setDragOver(null); return; }
    if (dragOver && dragOver !== dragging) {
      setCardOrder(prev => {
        const arr = [...prev];
        const fi = arr.indexOf(dragging);
        if (fi === -1) return prev;
        arr.splice(fi, 1);
        const ti = arr.indexOf(dragOver);
        if (ti === -1) return prev;
        arr.splice(ti, 0, dragging);
        // Ensure identity always stays at index 0
        const ii = arr.indexOf("identity");
        if (ii > 0) { arr.splice(ii, 1); arr.unshift("identity"); }
        return arr;
      });
    }
    setDragging(null); setDragOver(null);
  };
  const handleDragEnd = () => { setDragging(null); setDragOver(null); };
  const moveCard = (flatIdx: number, dir: -1 | 1) => {
    setCardOrder(prev => {
      const arr = [...prev];
      const ni = flatIdx + dir;
      if (ni < 0 || ni >= arr.length) return prev;
      // Prevent swapping with or swapping identity
      if (arr[flatIdx] === "identity" || arr[ni] === "identity") return prev;
      [arr[flatIdx], arr[ni]] = [arr[ni], arr[flatIdx]];
      return arr;
    });
  };
  const persistWss = (wss: WsRecord[]) => {
    try { localStorage.setItem(WS_MULTI_KEY, JSON.stringify(wss)); } catch {}
  };
  const persistActiveWs = (id: string) => {
    try { localStorage.setItem(WS_ACTIVE_KEY, id); } catch {}
  };
  const saveWorkspace = () => {
    // Open the naming panel — pre-fill name unless it's an auto-generated untitled one
    const isUntitled = activeWs.name.startsWith("Untitled ");
    setSaveName(isUntitled ? "" : activeWs.name);
    setExitConfirm(false);
    setSavePanelOpen(true);
  };
  const commitSave = (name: string | null) => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm2 = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy2 = now.getFullYear();
    const finalName = name?.trim() ? name.trim() : `Untitled ${dd}/${mm2}/${yyyy2}`;
    const updated = workspaces.map(w => w.id === activeWs.id ? { ...w, name: finalName, order: [...cardOrder] } : w);
    setWorkspaces(updated); persistWss(updated);
    setSavedOrder([...cardOrder]);
    setSavePanelOpen(false); setSaveName("");
    setIsEditing(false); setResetConfirm(false); setExitConfirm(false);
    toast.success("Workspace saved", { duration: 2500 });
  };
  const discardAndExit = () => {
    setCardOrder([...savedOrder]);
    setIsEditing(false); setResetConfirm(false); setExitConfirm(false);
  };
  const handleCancelClick = () => {
    if (isDirty) { setExitConfirm(true); setResetConfirm(false); }
    else { setIsEditing(false); setResetConfirm(false); }
  };
  const switchWorkspace = (id: string) => {
    const ws = workspaces.find(w => w.id === id);
    if (!ws) return;
    setActiveWsId(id); persistActiveWs(id);
    setCardOrder([...ws.order]); setSavedOrder([...ws.order]);
    setIsManageOpen(false); setIsEditing(false);
    setResetConfirm(false); setExitConfirm(false);
    setWsEditId(null); setWsRenameId(null); setWsDeleteId(null);
  };
  const createWorkspace = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const newWs: WsRecord = { id: `ws-${Date.now()}`, name: `Untitled ${dd}/${mm}/${yyyy}`, order: getDefaultOrder(plan) };
    const updated = [...workspaces, newWs];
    setWorkspaces(updated); persistWss(updated);
    setActiveWsId(newWs.id); persistActiveWs(newWs.id);
    setCardOrder(getDefaultOrder(plan)); setSavedOrder(getDefaultOrder(plan));
    setIsManageOpen(false); setIsEditing(true);
    setResetConfirm(false); setExitConfirm(false);
  };
  const commitRename = () => {
    if (!wsRenameId) return;
    const name = wsRenameVal.trim();
    const updated = workspaces.map(w => w.id === wsRenameId ? { ...w, name: name || w.name } : w);
    setWorkspaces(updated); persistWss(updated);
    setWsRenameId(null); setWsEditId(null);
    toast.success("Workspace renamed", { duration: 2000 });
  };
  const deleteWorkspace = (id: string) => {
    let updated = workspaces.filter(w => w.id !== id);
    if (updated.length === 0) updated = [makeDefaultWs()];
    setWorkspaces(updated); persistWss(updated);
    if (id === activeWs.id) {
      const fallback = updated[0];
      setActiveWsId(fallback.id); persistActiveWs(fallback.id);
      setCardOrder([...fallback.order]); setSavedOrder([...fallback.order]);
      setIsEditing(false);
    }
    setWsDeleteId(null); setWsEditId(null);
  };
  const resetToDefault = () => {
    let wss = [...workspaces];
    const defIdx = wss.findIndex(w => w.id === "default");
    if (defIdx === -1) {
      wss = [makeDefaultWs(), ...wss];
    } else {
      wss = wss.map(w => w.id === "default" ? { ...w, order: getDefaultOrder(plan) } : w);
    }
    setWorkspaces(wss); persistWss(wss);
    setActiveWsId("default"); persistActiveWs("default");
    setCardOrder(getDefaultOrder(plan)); setSavedOrder(getDefaultOrder(plan));
    setIsManageOpen(false); setIsEditing(false);
    setResetConfirm(false); setExitConfirm(false);
    setWsEditId(null); setWsRenameId(null); setWsDeleteId(null); setWsResetConfirm(false);
    toast.success("Workspace reset to default", { duration: 2500 });
  };

  const handleStyle: React.CSSProperties = {
    width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 6, background: "rgba(255,255,255,0.92)", border: "none", padding: 0,
    boxShadow: "0 1px 6px rgba(68,15,124,0.14)",
  };

  // ── Card renderer ────────────────────────────────────────────────────────────
  const renderCardById = (id: string): React.ReactNode => {
    switch (id) {
      case "identity": return (
        <Card className="h-full flex flex-col">
          {scenario === 3 && <ProfileProgress pct={65} />}
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border flex-shrink-0">
            {PHOTOS[emp.name]
              ? <img src={PHOTOS[emp.name]} alt={emp.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-border" />
              : <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: scenario === 2 ? C.magenta : "#f97316" }}>{emp.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</div>
            }
            <div>
              <div className="text-[13px] font-semibold" style={{ color: C.tertiary }}>{emp.name}</div>
              <div className="text-[11px]" style={{ color: C.tertiary }}>{emp.role}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col text-[11px] min-h-0">
            {((): Array<[React.ElementType, string, string]> => [
              [Building2,   "Department",  emp.dept],
              ...(EMPLOYMENT_DETAILS_DATA[scenario].cadre ? [[Award, "Cadre Level", EMPLOYMENT_DETAILS_DATA[scenario].cadre as string]] as [React.ElementType, string, string][] : []),
              [BadgeCheck,  "Employee ID", emp.id],
              [Calendar,    "Joined",      emp.joined],
              [Clock,       "Tenure",      emp.tenure],
              [User,        "Manager",     emp.supervisor],
            ])().map(([IconComp, label, value]) => (
              <div key={label} className="flex-1 flex items-center justify-between py-1 border-b border-border last:border-0 min-h-0">
                <div className="flex items-center gap-2 min-w-0">
                  <IconComp size={13} style={{ color: C.tertiary, flexShrink: 0 }} />
                  <span className="text-[11px] font-medium truncate" style={{ color: C.tertiary400 }}>{label}</span>
                </div>
                <span className="text-[11px] font-bold ml-2 flex-shrink-0" style={{ color: C.tertiary }}>{value}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 flex-shrink-0 flex items-center justify-center gap-1.5 text-[11px] font-semibold py-1.5 rounded-xl w-full" style={{ background: C.purple100, color: C.tertiary }}>
            {scenario === 2 ? <><ArrowRight size={12} /> Complete Your Profile</> : <><User size={12} /> View Profile</>}
          </button>
          {scenario === 1 && (() => {
            const { facebook, linkedin } = ABOUT_ME_DEFAULTS[1];
            return (facebook || linkedin) ? (
              <div className="flex gap-2 mt-4">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold py-1.5 rounded-xl" style={{ background: "#e7f0fd", color: "#1877F2" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                    Facebook
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold py-1.5 rounded-xl" style={{ background: "#e8f3fc", color: "#0A66C2" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                )}
              </div>
            ) : null;
          })()}
        </Card>
      );

      case "attendance": return (
        <Card className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Attendance</span>
            {scenario === 1 ? (
              <div className="flex gap-0">
                {(["Regular", "Shift"] as const).map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setAttendanceView(i)}
                    className="pb-1 ml-4 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                    style={{ color: attendanceView === i ? C.magentaIcon : C.tertiary300, borderBottom: attendanceView === i ? `2px solid ${C.magenta}` : "2px solid transparent" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            ) : (
              <button className="text-[11px] font-semibold" style={{ color: C.magentaIcon }}>View Attendance</button>
            )}
          </div>
          {scenario === 2 ? (
            <div className="flex flex-col items-center text-center py-3 gap-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-1 flex-shrink-0" style={{ background: S.warning50 }}>
                <Clock size={18} style={{ color: S.warning }} />
              </div>
              <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>You have not been assigned to a work schedule.</div>
              <div className="text-[10px] leading-relaxed" style={{ color: C.tertiary }}>Please contact your admin or HR.</div>
            </div>
          ) : scenario === 3 ? (
            <div className="flex-1 flex items-center justify-center">
              <EmptyCard icon={Clock} title="No attendance records yet" body="Your attendance will be tracked here once you have been assigned to a work schedule." />
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              {attendanceView === 0 ? (
              /* ── Standard view ─────────────────────────────────────────── */
              <div className="flex-1 flex flex-col min-h-0">
                {[
                  { icon: LogIn,        label: "Clocked in at",    value: "9:00 AM",           pill: false, status: null },
                  { icon: Timer,        label: "Hours Worked",     value: "4h 38m",            pill: false, status: null },
                  { icon: CheckCircle,  label: "Attendance Status",value: "Present",           pill: true,  status: "Present" as const },
                  { icon: CalendarClock,label: "Today's Schedule", value: "9:00 AM – 5:00 PM", pill: false, status: null },
                  { icon: Coffee,       label: "Break Remaining",  value: "45 mins",           pill: false, status: null },
                ].map(row => (
                  <div key={row.label} className="flex-1 flex justify-between items-center py-1 border-b border-border last:border-0 min-h-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <row.icon size={13} style={{ color: C.tertiary, flexShrink: 0 }} />
                      <span className="text-[11px] font-medium truncate" style={{ color: C.tertiary400 }}>{row.label}</span>
                    </div>
                    {row.pill
                      ? <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full" style={{
                          background: row.status === "Present" ? S.success50 : row.status === "Late" ? S.warning50 : S.error50,
                          color: row.status === "Present" ? S.success : row.status === "Late" ? S.warning : S.error,
                        }}>{row.value}</span>
                      : <span className="text-[12px] font-semibold flex-shrink-0 ml-2" style={{ color: C.tertiary }}>{row.value}</span>}
                  </div>
                ))}
              </div>
              ) : (
              /* ── Shift / rotational view ────────────────────────────────── */
              <div className="flex-1 flex flex-col min-h-0">
                {[
                  { icon: CalendarClock, label: "Today's Shift",   value: "Morning Shift",     pill: false },
                  { icon: Clock,         label: "Scheduled",       value: "8:00 AM — 4:00 PM", pill: false },
                  { icon: LogIn,         label: "Clocked In",      value: "7:52 AM",           pill: false },
                  { icon: CheckCircle,   label: "Shift Status",    value: "Present",           pill: true  },
                  { icon: ChevronRight,  label: "Next Rotation",   value: "Tomorrow · 4 PM – 12 AM", pill: false },
                ].map(row => (
                  <div key={row.label} className="flex-1 flex justify-between items-center py-1 border-b border-border last:border-0 min-h-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <row.icon size={13} style={{ color: C.tertiary, flexShrink: 0 }} />
                      <span className="text-[11px] font-medium" style={{ color: C.tertiary400 }}>{row.label}</span>
                    </div>
                    {row.pill
                      ? <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0" style={{ background: S.success50, color: S.success }}>{row.value}</span>
                      : <span className="text-[11px] font-semibold flex-shrink-0 ml-2" style={{ color: C.tertiary }}>{row.value}</span>}
                  </div>
                ))}
              </div>
              )}
              {/* Week dot strip */}
              {(() => { /* flex-shrink-0 applied inside */
                const WAT = "Africa/Lagos";
                const todayWAT = new Date(new Date().toLocaleString("en-US", { timeZone: WAT }));
                const dow = todayWAT.getDay(); // 0=Sun,1=Mon,...,5=Fri,6=Sat
                const monday = new Date(todayWAT);
                monday.setDate(todayWAT.getDate() - (dow === 0 ? 6 : dow - 1));
                const weekDays = Array.from({ length: 5 }, (_, i) => {
                  const d = new Date(monday);
                  d.setDate(monday.getDate() + i);
                  const isToday = d.toDateString() === todayWAT.toDateString();
                  const isPast  = d < todayWAT && !isToday;
                  const wdIdx   = d.getDay(); // 3 = Wednesday
                  // Mock: Wednesday is "late", today + all other past days are "present"
                  const status  = (isToday || isPast) ? (wdIdx === 3 ? "late" : "present") : "upcoming";
                  return {
                    day: d.toLocaleDateString("en-US", { weekday: "short", timeZone: WAT }).slice(0, 3),
                    label: d.toLocaleDateString("en-US", { day: "numeric", timeZone: WAT }),
                    status,
                    isToday,
                  };
                });
                const monLabel = monday.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: WAT });
                const friDate  = new Date(monday); friDate.setDate(monday.getDate() + 4);
                const friLabel = friDate.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: WAT });
                return (
                  <div className="flex-shrink-0 border-t border-border pt-3 mt-2">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[10px] font-semibold" style={{ color: C.tertiary }}>This Week</span>
                      <span className="text-[9px]" style={{ color: C.tertiary300 }}>{monLabel} – {friLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      {weekDays.map(d => {
                        const dotBg   = d.status === "present" ? "#22c55e"
                                      : d.status === "late"    ? "#ef4444"
                                      : C.purple200;
                        const ringCol = d.status === "present" ? "#86efac"
                                      : d.status === "late"    ? "#fca5a5"
                                      : C.purple200;
                        return (
                          <div key={d.day} className="flex flex-col items-center gap-1">
                            <span className="text-[9px] font-medium" style={{ color: d.isToday ? C.tertiary : C.tertiary300 }}>{d.day}</span>
                            <div style={{
                              width: 26, height: 26, borderRadius: "50%",
                              background: dotBg,
                              border: d.isToday ? `3px solid ${ringCol}` : "3px solid transparent",
                              boxSizing: "border-box",
                              boxShadow: d.isToday ? `0 0 0 3px ${ringCol}40` : "none",
                            }} />
                            <span className="text-[8px]" style={{ color: d.isToday ? C.tertiary : C.tertiary300 }}>{d.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {[
                        { col: "#22c55e", label: "Present"  },
                        { col: "#ef4444", label: "Late"     },
                        { col: C.purple200, label: "Upcoming"},
                      ].map(l => (
                        <div key={l.label} className="flex items-center gap-1">
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: l.col, flexShrink: 0 }} />
                          <span className="text-[8.5px]" style={{ color: C.tertiary300 }}>{l.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </Card>
      );

      case "leave-summary": return (
        <Card className="h-full flex flex-col">
          <SecHead title="My Leave Summary" link="Request Leave" />
          {scenario === 3 ? (
            <EmptyCard icon={Calendar} title="Leave balance pending" body="Your leave entitlement will be allocated once onboarding is complete." />
          ) : (() => {
            const isMale = EMPLOYEE[scenario].gender === "male";
            type LeaveRow = { name: string; icon: React.ElementType; color: string; iconColor: string; track: string; total: number; used: number; applied: number; approved: number; declined: number };
            const rows: LeaveRow[] = [
              { name: "Annual Leave",      icon: Calendar, color: C.purple,    iconColor: C.purpleIcon,  track: C.purple100,  total: 25, used: scenario===1?18:3, applied: scenario===1?5:1, approved: 0, declined: 0 },
              { name: "Sick Leave",        icon: Heart,    color: C.magenta,   iconColor: C.magentaIcon, track: C.magenta100, total: 10, used: scenario===1?3:1,  applied: 0,                approved: 0, declined: 0 },
              { name: "Compassionate",     icon: Users,    color: C.tertiary,  iconColor: C.tertiary,    track: C.tertiary100, total: 3, used: 0,                  applied: 0,                approved: 0, declined: 0 },
              { name: isMale ? "Paternity Leave" : "Maternity Leave", icon: Heart, color: S.info, iconColor: S.info, track: S.info100, total: 5, used: 0, applied: 0, approved: 0, declined: 0 },
            ];
            // Summary stats (aggregate or per-type — show aggregate across all types)
            const totalApplied = rows.reduce((s, r) => s + r.applied, 0);
            const totalApproved = rows.reduce((s, r) => s + r.approved, 0);
            const totalDeclined = rows.reduce((s, r) => s + r.declined, 0);
            const eligibleLeft = rows.reduce((s, r) => s + Math.max(0, r.total - r.used), 0);
            const statsData = [
              { label: "Eligible Days Left",   value: eligibleLeft,  color: C.purpleIcon  },
              { label: "Total Leave Applied",  value: totalApplied,  color: C.magentaIcon },
              { label: "Approved Leave Days",  value: totalApproved, color: S.success      },
              { label: "Declined Leave Days",  value: totalDeclined, color: S.error        },
            ];
            return (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Stats strip */}
                <div className="flex-shrink-0 grid grid-cols-4 gap-1.5 rounded-xl p-2 mb-2" style={{ background: C.tertiary50 }}>
                  {statsData.map(st => (
                    <div key={st.label} className="flex flex-col items-center text-center py-1">
                      <span className="text-[18px] font-bold leading-none mb-0.5" style={{ color: st.color }}>{st.value}</span>
                      <span className="text-[8.5px] font-medium leading-tight" style={{ color: C.tertiary300 }}>{st.label}</span>
                    </div>
                  ))}
                </div>
                {/* Leave type rows — stretch to fill remaining height */}
                <div className="flex-1 flex flex-col min-h-0">
                  {rows.map(row => {
                    const remaining = row.total - row.used;
                    const pct = row.total > 0 ? (remaining / row.total) * 100 : 0;
                    const isExhausted = remaining === 0;

                    return (
                      <div key={row.name} className="flex-1 flex flex-col justify-center py-1 min-h-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: row.track }}>
                              <row.icon size={11} style={{ color: row.iconColor }} />
                            </div>
                            <span className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{row.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-[12px] font-bold" style={{ color: isExhausted ? S.error : row.iconColor }}>{remaining}</span>
                            <span className="text-[9px]" style={{ color: C.tertiary300 }}>/ {row.total}</span>
                            {isExhausted && <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: S.error50, color: S.error }}>Exhausted</span>}
                          </div>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: row.track }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: row.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* My Leave Requests */}
                {(() => {
                  const reqs = LEAVE_REQUESTS[scenario];
                  const today = new Date("2026-08-26");
                  const yesterday = new Date("2026-08-25");
                  const fmtD = (iso: string) => {
                    const [, m, d] = iso.split("-");
                    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    return `${parseInt(d)} ${months[parseInt(m)-1]}`;
                  };
                  const resolveChip = (r: { start: string; end: string; status: "pending"|"approved"|"rejected" }) => {
                    if (r.status === "rejected") return { bg: S.error50,   fg: S.error,   label: "Rejected" };
                    if (r.status === "pending")  return { bg: S.warning50,  fg: S.warning,  label: "Pending"  };
                    const start = new Date(r.start), end = new Date(r.end);
                    if (start <= today && end >= today) return { bg: S.warning50, fg: S.warning, label: "On Leave" };
                    if (end >= yesterday && end < today) return { bg: S.info50, fg: S.info, label: "Resumed" };
                    return { bg: S.success50, fg: S.success, label: "Approved" };
                  };
                  return (
                    <div className="flex-shrink-0 mt-2 pt-2 border-t border-border flex flex-col gap-1.5">
                      {/* Header + tabs */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: C.tertiary300 }}>My Leave Requests</span>
                        <div className="flex gap-0">
                          {(["data", "empty"] as const).map(t => (
                            <button key={t} onClick={() => setLeaveReqTab(t)}
                              className="pb-0.5 ml-2.5 text-[9px] font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0"
                              style={{
                                color: leaveReqTab === t ? C.magentaIcon : C.tertiary300,
                                borderBottom: leaveReqTab === t ? `2px solid ${C.magenta}` : "2px solid transparent",
                              }}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Content */}
                      {leaveReqTab === "empty" || !reqs || reqs.length === 0 ? (
                        <div className="flex items-center justify-center gap-1.5 py-2" style={{ color: C.tertiary300 }}>
                          <Calendar size={11} />
                          <span className="text-[10px]">No leave requests yet</span>
                        </div>
                      ) : (
                        reqs.map((r, i) => {
                          const c = resolveChip(r);
                          return (
                            <div key={i} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-[10px] font-semibold truncate" style={{ color: C.tertiary }}>{r.type}</span>
                                <span className="text-[9px] flex-shrink-0" style={{ color: C.tertiary300 }}>{fmtD(r.start)} – {fmtD(r.end)}</span>
                              </div>
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: c.bg, color: c.fg }}>{c.label}</span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })()}
        </Card>
      );

      case "announcements": return (
        <Card className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Announcements</span>
              {ANNOUNCEMENT_UNREAD[scenario] > 0 && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.magenta }}>{ANNOUNCEMENT_UNREAD[scenario]} new</span>
              )}
              {pinnedAnnouncement && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: C.purple100, color: C.purpleIcon }}>
                  <Pin size={9} /> 1 pinned
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            {(() => {
              const all = ANNOUNCEMENTS[scenario];
              if (all.length === 0) return (
                <div className="flex-1 flex items-center justify-center">
                  <EmptyCard icon={Bell} title="No announcements yet" body="Company announcements will appear here once your account is fully set up." />
                </div>
              );
              const sorted = [
                ...all.filter(a => a.title === pinnedAnnouncement),
                ...all.filter(a => a.title !== pinnedAnnouncement),
              ];
              return sorted.map((a, idx) => {
                const origIdx = all.indexOf(a);
                const isUnread = origIdx < ANNOUNCEMENT_UNREAD[scenario];
                const isPinned = a.title === pinnedAnnouncement;
                return (
                  <div key={a.title}
                    id={idx === 0 ? "tour-announcement-pin" : undefined}
                    className="flex-1 flex items-center gap-2.5 border-b border-border last:border-0 group min-h-0"
                    style={isPinned ? { background: C.purple100, borderRadius: 10, padding: "6px 10px", marginLeft: -10, marginRight: -10, borderBottom: "none", flexGrow: 1.5 } : { padding: "6px 0" }}>
                    {(() => { const AIcon = ANNOUNCEMENT_ICON_MAP[a.icon]; return <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.iconBg }}><AIcon size={13} style={{ color: a.iconFg }} /></div>; })()}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="text-[11px] font-semibold leading-tight" style={{ color: C.tertiary }}>{a.title}</div>
                        {isUnread && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.magenta }} />}
                        {isPinned && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0" style={{ background: C.purple200, color: C.purpleIcon }}>
                            <Pin size={8} /> Pinned
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: C.tertiary }}>{a.date}</div>
                    </div>
                    <button
                      onClick={() => togglePin(a.title)}
                      className="opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity p-1 rounded-lg"
                      style={{ background: isPinned ? C.purple200 : "transparent", color: isPinned ? C.purpleIcon : C.tertiary400 }}
                      title={isPinned ? "Unpin" : "Pin announcement"}>
                      <Pin size={12} style={{ fill: isPinned ? C.purpleIcon : "none", strokeWidth: isPinned ? 1.5 : 1.5 }} />
                    </button>
                  </div>
                );
              });
            })()}
          </div>
        </Card>
      );

      case "team": return (
        <Card className="h-full flex flex-col">
          <SecHead title="Team" />
          {scenario === 3 ? (
            <EmptyCard icon={Users} title="Team not yet assigned" body="Your manager and team members will appear here once your onboarding is complete." />
          ) : (() => {
            const team = TEAM[scenario];
            const buddyAlreadyInMembers = team.buddy && team.members.some(m => m.name === team.buddy!.name);
            const allMembers: Array<{ name: string; role: string; color: string }> = [
              ...(team.buddy && !buddyAlreadyInMembers ? [{ name: team.buddy.name, role: team.buddy.role, color: "#22c55e" }] : []),
              ...team.members,
            ];
            const subordinateMembers = allMembers.filter(m => SUBORDINATES[scenario].has(m.name));
            const TABS = ["Members", "Subordinates"] as const;
            const activeList = teamViewTab === "Members" ? allMembers : subordinateMembers;
            return (
              <div className="flex flex-col gap-3 flex-1 min-h-0">
                {/* Manager row — always visible */}
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <Av name={team.manager.name} color={C.purple} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{team.manager.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary300 }}>{team.manager.role}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: C.purple100, color: C.purpleIcon }}>Manager</span>
                </div>
                {/* Tabs */}
                <div className="flex gap-0 border-b border-border" style={{ marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setTeamViewTab(tab)}
                      className="pb-2 mr-4 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                      style={{ color: teamViewTab === tab ? C.magentaIcon : C.tertiary, borderBottom: teamViewTab === tab ? `2px solid ${C.magenta}` : "2px solid transparent" }}
                    >
                      {tab}
                      {tab === "Subordinates" && subordinateMembers.length > 0 && (
                        <span className="ml-1 text-[9px] px-1.5 rounded-full" style={{ background: C.purple100, color: C.purpleIcon }}>
                          {subordinateMembers.length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {/* Member grid */}
                {activeList.length === 0 ? (
                  <EmptyCard
                    icon={Users}
                    title={teamViewTab === "Subordinates" ? "No direct reports" : "Team members loading"}
                    body={teamViewTab === "Subordinates" ? "You currently have no direct reports in this plan." : "Your team will appear here once your manager completes onboarding setup."}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {activeList.map(m => (
                      <div key={m.name} className="flex items-center gap-2">
                        <div className="relative flex-shrink-0">
                          <Av name={m.name} color={m.color} size="sm" />
                          {MEMBER_ONLINE.has(m.name) && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: S.success }} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-semibold truncate" style={{ color: C.tertiary }}>{m.name}</div>
                          <div className="flex items-center gap-1 flex-wrap">
                            <div className="text-[10px] truncate" style={{ color: C.tertiary300 }}>{m.role}</div>
                            {MEMBER_ON_LEAVE.has(m.name) && (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: S.warning50, color: S.warning }}>On Leave</span>
                            )}
                            {MEMBER_BIRTHDAY_TODAY.has(m.name) && (
                              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: C.magenta100, color: C.magentaIcon }}>🎂 Birthday</span>
                            )}
                          </div>
                        </div>
                        <button
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: C.purple100 }}
                          title={`Chat with ${m.name}`}
                          aria-label={`Chat with ${m.name}`}
                          onClick={() => toast(`Use the NotchHR mobile app to chat with ${m.name}.`, { duration: 4000 })}
                        >
                          <MessageCircle size={12} style={{ color: C.purpleIcon }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </Card>
      );

      case "approvals": return (
        <Card className="h-full flex flex-col">
          {(() => {
            const items = plan === "basic" ? APPROVALS_BASIC[scenario] : plan === "standard" ? APPROVALS_STANDARD[scenario] : APPROVALS[scenario];
            return (
              <>
                <SecHead title="Pending Approvals" count={items.length > 0 ? items.length : undefined} link="View All" />
                <div className="flex-1 flex flex-col min-h-0">
                  {items.length === 0 ? (
                    <EmptyCard icon={CheckSquare} title="No pending approvals" body={scenario === 2 ? "Approval workflows are not yet active. They will become available once your onboarding is confirmed." : "Approval requests submitted on your behalf will appear here."} />
                  ) : (
                    <div className="flex-1 flex flex-col min-h-0">
                      {items.map(item => {
                        const chip =
                          item.status === "awaiting"   ? { bg: S.warning50, fg: S.warning, label: "Awaiting Signature" } :
                          item.status === "processing" ? { bg: S.info50,    fg: S.info,    label: "Processing" }         :
                          item.status === "approved"   ? { bg: S.success50, fg: S.success, label: "Approved" }           : null;
                        return (
                          <div key={item.label} className="flex-1 flex items-center gap-3 border-b border-border last:border-0 min-h-0">
                            <div className="flex-1 min-w-0">
                              <div className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{item.label}</div>
                              <div className="text-[10px] mt-0.5" style={{ color: C.tertiary }}>{item.requester}</div>
                            </div>
                            {scenario === 1 ? (
                              <div className="flex gap-1.5 flex-shrink-0">
                                <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg" style={{ background: S.success50, color: S.success }}>Approve</button>
                                <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg" style={{ background: S.error50, color: S.error }}>Decline</button>
                              </div>
                            ) : chip && (
                              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0" style={{ background: chip.bg, color: chip.fg }}>{chip.label}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </Card>
      );

      case "payslip": {
        if (scenario === 3) return (
          <Card className="h-full flex flex-col">
            <SecHead title="Employee Benefits" />
            <EmptyCard icon={DollarSign} title="Payroll not yet configured" body="Your salary, payslips, and benefits will appear here once payroll setup is complete." />
          </Card>
        );
        const payTabs: Array<"Payroll" | "Payroll History" | "Pension History" | "Tax History" | "Salary on Demand" | "Tax Relief"> = [
          "Payroll", "Payroll History", "Pension History", "Tax History", "Salary on Demand", "Tax Relief",
        ];
        const payslips = scenario === 1 ? [
          { month: "May 2025", gross: "₦800,000", net: "₦680,000" },
          { month: "Apr 2025", gross: "₦800,000", net: "₦680,000" },
          { month: "Mar 2025", gross: "₦800,000", net: "₦672,000" },
        ] : null;
        return (
          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Employee Benefits</span>
              <button className="text-[11px] font-medium" style={{ color: C.magentaIcon }}>View All</button>
            </div>
            <div className="flex gap-0 overflow-x-auto no-scrollbar border-b border-border mb-3" style={{ marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16 }}>
              {payTabs.map(tab => (
                <button key={tab} onClick={() => setPayrollTab(tab)}
                  className="pb-2 mr-3 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                  style={{ color: payrollTab === tab ? C.magentaIcon : C.tertiary, borderBottom: payrollTab === tab ? `2px solid ${C.magenta}` : "2px solid transparent" }}>
                  {tab}
                </button>
              ))}
            </div>
            {payrollTab === "Payroll" && (
              scenario === 1 ? (
                <div className="rounded-xl p-4 text-white relative" style={{ background: `linear-gradient(135deg, ${C.purple} 0%, ${C.magenta} 100%)` }}>
                  <button id="tour-eye-toggle" onClick={() => setPayPrivacy(p => !p)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors hover:opacity-90 active:opacity-75"
                    style={{ background: "rgba(255,255,255,0.25)", zIndex: 1 }}>
                    {payPrivacy ? <EyeOff size={14} style={{ color: "#ffffff" }} /> : <Eye size={14} style={{ color: "#ffffff" }} />}
                  </button>
                  <div className="text-[10px] opacity-75 mb-1 font-medium">Net Salary — June 2025</div>
                  <div className="text-2xl font-bold mb-2 tracking-widest">{payPrivacy ? "••••••••" : "₦850,000"}</div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] mb-3">
                    {[["Gross", "₦1,000,000"], ["Deductions", "₦150,000"], ["Tax", "₦80,000"]].map(([k, v]) => (
                      <div key={k}><div className="opacity-70 font-light">{k}</div><div className="font-semibold">{payPrivacy ? "•••••" : v}</div></div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href="https://apps.apple.com/us/app/myxalary-app/id1557894792" target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold hover:opacity-90 transition-opacity"
                      style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      App Store
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.myxalary" target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold hover:opacity-90 transition-opacity"
                      style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3.18 23.76c.3.16.65.19.99.08l12.19-7.03-2.64-2.64L3.18 23.76z" fill="white"/><path d="M20.82 10.26L17.93 8.6l-2.95 2.94 2.95 2.95 2.92-1.68c.83-.48.83-1.67-.03-2.55z" fill="white"/><path d="M3.18.24C2.85.37 2.62.7 2.62 1.12V22.88c0 .42.23.75.56.88l12.56-12.56L3.18.24z" fill="white"/><path d="M4.17.32l12.19 7.03-2.64 2.64L3.18.24c.33-.09.68-.06.99.08z" fill="white"/></svg>
                      Google Play
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl p-4 text-white" style={{ background: `linear-gradient(135deg, ${C.tertiary700} 0%, ${C.tertiary900} 100%)` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}><Clock size={13} /></div>
                    <span className="text-[10px] font-semibold opacity-80">{scenario === 2 ? "Payroll Not Configured" : "Payroll Setup In Progress"}</span>
                  </div>
                  <div className="text-base font-bold mb-1.5">{scenario === 2 ? "No payslip available" : "Processing…"}</div>
                  <div className="text-[10px] opacity-70 leading-relaxed mb-3">
                    {scenario === 2
                      ? "Your payroll details haven't been configured yet. HR will set this up as part of onboarding. Expected: Aug 1, 2025."
                      : "HR is finalising your payroll setup. Your first payslip will be issued on Aug 1, 2025."}
                  </div>
                  {scenario === 3 && (
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: "40%", background: "rgba(255,255,255,0.6)" }} />
                    </div>
                  )}
                </div>
              )
            )}
            {payrollTab === "Payroll History" && (
              !payslips ? (
                <EmptyCard icon={DollarSign} title="No payroll records yet" body="Your payslips will appear here once payroll processing is set up." />
              ) : (
                <div className="flex flex-col gap-2">
                  {payslips.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: S.success50 }}>
                        <span className="text-[11px] font-bold" style={{ color: S.success }}>₦</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.month}</div>
                        <div className="text-[10px]" style={{ color: C.tertiary300 }}>Gross: {p.gross}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.net}</div>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: S.success50, color: S.success }}>Paid</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
            {payrollTab === "Pension History" && (() => {
              const pdata = PENSION_DATA[scenario];
              return !pdata ? (
                <EmptyCard icon={Shield}
                  title="No pension records yet"
                  body={scenario === 2
                    ? "Pension enrollment will begin once payroll is configured for your account."
                    : scenario === 3
                    ? "Pension details will appear here once your payroll setup is complete."
                    : "Your pension contribution history will appear here once your pension account is linked."} />
              ) : (
                <div className="flex flex-col gap-2">
                  {pdata.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.employer}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>{p.period}</div>
                        <div className="text-[10px]" style={{ color: C.tertiary300 }}>{p.contribution}</div>
                      </div>
                      <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: p.status === "Active" ? S.success50 : S.info50, color: p.status === "Active" ? S.success : S.info }}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
            {payrollTab === "Tax History" && (() => {
              const tdata = TAX_DATA[scenario];
              return !tdata ? (
                <EmptyCard icon={FileText}
                  title="No tax records yet"
                  body={scenario === 2
                    ? "Tax records will be generated once payroll is configured for your account."
                    : scenario === 3
                    ? "Tax records will appear here once your payroll setup is finalised."
                    : "Your annual tax records and filings will appear here once available."} />
              ) : (
                <div className="flex flex-col gap-2">
                  {tdata.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{t.year}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>Income: {t.income}</div>
                        <div className="text-[10px]" style={{ color: C.tertiary300 }}>Tax Paid: {t.tax}</div>
                      </div>
                      <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full" style={{ background: S.success50, color: S.success }}>{t.status}</span>
                    </div>
                  ))}
                </div>
              );
            })()}
            {payrollTab === "Salary on Demand" && (() => {
              const sod = SALARY_DEMAND_DATA[scenario];
              return !sod ? (
                <EmptyCard icon={DollarSign}
                  title="Salary on Demand"
                  body={scenario === 2
                    ? "Salary on Demand is not yet active. This feature will become available after your first completed pay cycle."
                    : scenario === 3
                    ? "Salary on Demand will activate once your payroll setup is complete."
                    : "No earnings accumulated yet this cycle. Salary on Demand becomes available after your first working day."} />
              ) : (() => {
                const fmt = (n: number) => `₦${n.toLocaleString("en-NG")}`;
                const maxDraw       = Math.floor(sod.earnedToDate * 0.5);
                const remainingDraw = Math.max(0, maxDraw - sod.withdrawn);
                const balancePayDate = sod.grossSalary - sod.withdrawn;
                const drawnPct      = maxDraw > 0 ? Math.min(100, Math.round((sod.withdrawn / maxDraw) * 100)) : 0;
                return (
                  <div className="flex flex-col gap-3">
                    <div className="rounded-xl p-4" style={{ background: C.purple100 }}>
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: C.tertiary300 }}>This Month</div>
                      <div className="space-y-1.5 mb-3">
                        {[
                          ["Earned this month",       fmt(sod.earnedToDate)],
                          ["Max withdrawable (50%)",  fmt(maxDraw)],
                          ["Already withdrawn",       fmt(sod.withdrawn)],
                          ["Still available to draw", fmt(remainingDraw)],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-[11px]">
                            <span style={{ color: C.tertiary300 }}>{k}</span>
                            <span className="font-semibold" style={{ color: k === "Still available to draw" ? C.purpleIcon : C.tertiary }}>{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: C.purple200 }}>
                        <div className="h-2 rounded-full" style={{ width: `${drawnPct}%`, background: `linear-gradient(90deg, ${C.purple}, ${C.magenta})` }} />
                      </div>
                      <div className="text-[10px]" style={{ color: C.tertiary300 }}>{fmt(sod.withdrawn)} withdrawn of {fmt(maxDraw)} available</div>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5">
                      <Smartphone size={13} style={{ color: C.purpleIcon, flexShrink: 0 }} />
                      <span className="text-[10px]" style={{ color: C.tertiary }}>To request an advance, please log in to your mobile app.</span>
                    </div>
                  </div>
                );
              })()
            })()}
            {payrollTab === "Tax Relief" && (() => {
              const tr = TAX_RELIEF_DATA[scenario];
              const SUB_TABS = ["NHIS", "NHIA", "NHF", "Rent Relief"] as const;
              return (
                <div className="flex flex-col gap-3">
                  {/* Sub-tabs — underline style matching parent */}
                  <div className="flex gap-0 overflow-x-auto border-b border-border" style={{ marginLeft: -16, marginRight: -16, paddingLeft: 16, paddingRight: 16, scrollbarWidth: "none" }}>
                    {SUB_TABS.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTaxReliefSubTab(tab)}
                        className="pb-2 mr-3 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                        style={{
                          color: taxReliefSubTab === tab ? C.magenta : C.tertiary,
                          borderBottom: taxReliefSubTab === tab ? `2px solid ${C.magenta}` : "2px solid transparent",
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Sub-tab content */}
                  {taxReliefSubTab === "Rent Relief" && (!tr ? (
                    <EmptyCard icon={DollarSign}
                      title="No rent relief active"
                      body={scenario === 2
                        ? "Rent relief will be configured once payroll is set up for your account."
                        : scenario === 3
                        ? "Rent relief enrollment is being processed as part of your payroll setup."
                        : "Rent relief allocations will appear here once approved by HR."} />
                  ) : (
                    <div className="rounded-xl p-4" style={{ background: C.purple100 }}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-[13px] font-bold" style={{ color: C.tertiary }}>Rent Relief</div>
                        <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: S.success50, color: S.success }}>{tr.status}</span>
                      </div>
                      <div className="text-[10px] mb-3" style={{ color: C.tertiary300 }}>The company covers up to 20% of your annual rent as a welfare benefit.</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[["Annual Rent", tr.annualRent], [`Company Covered (${tr.coveredPct}%)`, tr.covered], ["Disbursed", tr.disbursed], ["Cycle", tr.cycle]].map(([k, v]) => (
                          <div key={k}>
                            <div className="text-[10px]" style={{ color: C.tertiary300 }}>{k}</div>
                            <div className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {taxReliefSubTab === "NHIS" && (
                    <EmptyCard icon={Heart} title="NHIS Relief" body="National Health Insurance Scheme contributions and employer relief will appear here once configured." />
                  )}
                  {taxReliefSubTab === "NHIA" && (
                    <EmptyCard icon={Shield} title="NHIA Relief" body="National Health Insurance Authority relief details will appear here once your enrollment is confirmed." />
                  )}
                  {taxReliefSubTab === "NHF" && (
                    <EmptyCard icon={Home} title="NHF Relief" body="National Housing Fund contribution relief will appear here. Contact HR to set up your NHF deductions." />
                  )}
                </div>
              );
            })()}
            {payrollTab !== "Salary on Demand" && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-[10px]" style={{ color: C.tertiary }}>To download payslips, please log in to your mobile app.</p>
              </div>
            )}
          </Card>
        );
      }

      case "on-leave": return (
        <Card className="h-full flex flex-col">
          {scenario === 3 ? (
            <>
              <SecHead title="Employees on Leave" />
              <EmptyCard icon={Users} title="No team leave activity yet" body="Leave schedules for your colleagues will appear here once your onboarding is complete." />
            </>
          ) : (<>
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Employees on Leave</span>
            <div className="flex items-center gap-2">
              <button className="text-[11px] font-medium" style={{ color: C.tertiary }}>View All</button>
              <div className="relative">
                <button onClick={() => setLeaveDropdownOpen(o => !o)}
                  className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-border hover:bg-muted transition-colors"
                  style={{ color: C.tertiary }}>
                  <span>{leaveFilter ? `${leaveFilter.by === "dept" ? "Dept" : leaveFilter.by === "cadre" ? "Cadre" : "Role"}: ${leaveFilter.value}` : "Filter by"}</span>
                  <ChevronDown size={11} />
                </button>
                {leaveDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-card rounded-xl shadow-lg border border-border z-30 overflow-hidden">
                    {leaveFilter && (
                      <button className="w-full text-left px-3 py-2 text-[11px] font-semibold border-b border-border"
                        style={{ color: S.error }} onClick={() => { setLeaveFilter(null); setLeaveDropdownOpen(false); }}>Clear filter</button>
                    )}
                    {[{ label: "Department", key: "dept" as const, vals: [...new Set(ON_LEAVE.map(e => e.dept))] },
                      { label: "Cadre",      key: "cadre" as const, vals: [...new Set(ON_LEAVE.map(e => e.cadre))] },
                      { label: "Job Role",   key: "role" as const,  vals: [...new Set(ON_LEAVE.map(e => e.role))] }].map(group => (
                      <div key={group.label}>
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide border-t border-border first:border-t-0" style={{ color: C.tertiary, opacity: 0.6 }}>{group.label}</div>
                        {group.vals.map(v => (
                          <button key={v} className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-muted"
                            style={{ color: leaveFilter?.value === v ? C.purple : C.tertiary, fontWeight: leaveFilter?.value === v ? 600 : 400 }}
                            onClick={() => { setLeaveFilter({ by: group.key, value: v }); setLeaveDropdownOpen(false); }}>{v}</button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <div className="space-y-4">
            {ON_LEAVE.filter(e => !leaveFilter || (leaveFilter.by === "dept" && e.dept === leaveFilter.value) || (leaveFilter.by === "cadre" && e.cadre === leaveFilter.value) || (leaveFilter.by === "role" && e.role === leaveFilter.value)).map(e => (
              <div key={e.name} className="flex items-center gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <Av name={e.name} color={e.color} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{e.name}</div>
                  <div className="text-[10px]" style={{ color: C.tertiary }}>{e.role} · {e.dept} · {e.cadre}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px]" style={{ color: C.tertiary }}>Returns {e.to}</div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0" style={{ background: S.warning50, color: S.warning }}>On Leave</span>
              </div>
            ))}
            {ON_LEAVE.filter(e => !leaveFilter || (leaveFilter.by === "dept" && e.dept === leaveFilter.value) || (leaveFilter.by === "cadre" && e.cadre === leaveFilter.value) || (leaveFilter.by === "role" && e.role === leaveFilter.value)).length === 0 && (
              <div className="text-center py-4 text-[12px]" style={{ color: C.tertiary }}>No employees match this filter.</div>
            )}
            </div>
          </div>
          </>)}
        </Card>
      );

      case "events": return (
        <Card className="h-full flex flex-col">
          {scenario === 3 ? (
            <>
              <SecHead title="Events" />
              <EmptyCard icon={Calendar} title="No events yet" body="Company events, birthdays, and work anniversaries will appear here once your profile is active." />
            </>
          ) : (<>
          <div className="flex items-center justify-between mb-0 flex-shrink-0">
            <div className="flex gap-0 overflow-x-auto no-scrollbar">
              {(["Birthdays", "Work Anniversaries", "Holiday", "Events"] as const).map(tab => {
                const isActive = teamTab === tab;
                return (
                  <button key={tab} onClick={() => setTeamTab(tab as typeof teamTab)}
                    className="pb-2 mr-3 text-[12px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                    style={{
                      color: isActive ? C.magentaIcon : C.tertiary,
                      borderBottom: isActive ? `2px solid ${C.magenta}` : "2px solid transparent",
                    }}>
                    {tab}
                  </button>
                );
              })}
            </div>
            <button className="text-[11px] font-medium pb-2 flex-shrink-0" style={{ color: C.magentaIcon }}>View All</button>
          </div>
          <div className="border-b border-border mb-3 flex-shrink-0" />
          <div className="flex-1 min-h-0">
          {teamTab === "Holiday" && (
            <div className="flex flex-col gap-3">
              {HOLIDAYS.map(h => (
                <div key={h.name} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{h.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary }}>{h.date}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: S.info50, color: S.info }}>{h.type}</span>
                </div>
              ))}
            </div>
          )}
          {teamTab === "Work Anniversaries" && (
            <div className="flex flex-col gap-3">
              {ANNIVERSARIES.map(m => (
                <div key={m.name} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <Av name={m.name} color={m.color} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{m.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary }}>{m.role}</div>
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: C.tertiary }}>{m.years} yrs 🎉</span>
                </div>
              ))}
            </div>
          )}
          {teamTab === "Birthdays" && (
            <div className="flex flex-col gap-3">
              {BIRTHDAYS.map(b => (
                <div key={b.name} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <Av name={b.name} color={b.color} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{b.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary }}>{b.role}</div>
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: C.magentaIcon }}>🎂 {b.date}</span>
                </div>
              ))}
            </div>
          )}
          {teamTab === "Events" && (
              <div className="space-y-2">
                {EVENTS[scenario].map(ev => (
                  <div key={ev.title} className="flex items-center justify-between px-3 py-2 border" style={{ borderRadius: 8, background: C.magenta100, borderColor: C.magenta200 }}>
                    <div>
                      <div className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{ev.title}</div>
                      <div className="text-[10px]" style={{ color: C.tertiary }}>{ev.project} · {ev.time}</div>
                    </div>
                    <div className="flex -space-x-1.5">
                      {ev.avatarColors.slice(0, 3).map((col, i) => <div key={i} className="w-5 h-5 rounded-full border-2 border-white" style={{ backgroundColor: col }} />)}
                    </div>
                  </div>
                ))}
              </div>
          )}
          </div>
          </>)}
        </Card>
      );

      case "directory": return (
        <Card className="h-full flex flex-col">
          {scenario === 3 ? (
            <>
              <SecHead title="Employee Directory" />
              <EmptyCard icon={Users} title="Directory not yet available" body="The employee directory will be accessible once your profile setup and onboarding are complete." />
            </>
          ) : (<>
          <div className="flex items-start justify-between mb-4 flex-shrink-0">
            <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Employee Directory</span>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-3">
              <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: C.tertiary400 }}>Recently Contacted</div>
              <div className="flex gap-2">
                {DIRECTORY.slice(0, 3).map(d => (
                  <div key={d.name} className="flex flex-col items-center gap-0.5">
                    <Av name={d.name} color={d.color} size="sm" />
                    <span className="text-[8px] text-center" style={{ color: C.tertiary }}>{d.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 space-y-2.5">
            {DIRECTORY.map(d => (
              <div key={d.name} className="flex items-center gap-2.5 pb-2.5 border-b border-border last:border-0 last:pb-0">
                <Av name={d.name} color={d.color} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold truncate" style={{ color: C.tertiary }}>{d.name}</div>
                  <div className="text-[10px]" style={{ color: C.tertiary }}>{d.role}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: C.purple100, color: C.tertiary }}>{d.dept}</span>
                  <button className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: C.purple100 }} title={`Chat with ${d.name}`}>
                    <MessageCircle size={12} style={{ color: C.purpleIcon }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold flex-shrink-0" style={{ background: C.purple100, color: C.tertiary }}>
            <Plus size={12} /> View All Employees
          </button>
          </>)}
        </Card>
      );

      case "kpi":         return <KPICard scenario={scenario} plan={plan} />;
      case "documents":   return <DocumentsCard scenario={scenario} plan={plan} />;
      case "grievance":   return <GrievanceCard scenario={scenario} plan={plan} />;
      case "performance": return <PerformanceCard scenario={scenario} plan={plan} />;
      case "learning":    return <LearningCard scenario={scenario} plan={plan} />;
      case "enps":        return <ENPSCard scenario={scenario} plan={plan} />;
      case "recruitment":    return <RecruitmentCard scenario={scenario} plan={plan} />;
      case "time-tracker":   return <TimeTrackerCard scenario={scenario} plan={plan} />;
      case "about-me":              return <AboutMeCard scenario={scenario} />;
      case "competency":            return <CompetencyCard scenario={scenario} />;
      case "work-history":          return <WorkHistoryCard scenario={scenario} />;
      case "academic-professional": return <AcademicProfessionalCard scenario={scenario} />;
      case "payroll-history":       return <PayrollHistoryCard scenario={scenario} />;
      case "pension":               return <PensionCard scenario={scenario} />;
      case "tax-history":           return <TaxHistoryCard scenario={scenario} />;
      case "employment-details":    return <EmploymentDetailsCard scenario={scenario} />;
      case "quick-actions": {
        const defaultActions = plan === "basic" ? QA_BASIC : plan === "standard" ? QA_STANDARD : QA_PREMIUM[scenario];
        const catalog        = plan === "basic" ? QA_CATALOG_BASIC : plan === "standard" ? QA_CATALOG_STANDARD : QA_CATALOG_PREMIUM;
        const activeActions  = customQALabels
          ? catalog.filter(qa => customQALabels.includes(qa.label))
          : defaultActions;

        const openEditor = () => {
          setQaEditorDraft(activeActions.map(qa => qa.label));
          setQaEditOpen(true);
        };
        const toggleDraft = (label: string) => {
          setQaEditorDraft(prev =>
            prev.includes(label)
              ? prev.filter(l => l !== label)
              : prev.length < 4 ? [...prev, label] : prev
          );
        };
        const saveEditor = () => {
          setCustomQALabels(qaEditorDraft.length === 4 ? qaEditorDraft : null);
          setQaEditOpen(false);
        };

        return (
          <>
            <Card className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Quick Actions</span>
                {/* Edit button — hidden, reserved for future use */}
              </div>
              {/* Adaptive grid — 2 cols, equal-height rows filling card */}
              {(() => {
                const nRows = Math.ceil(activeActions.length / 2);
                return (
                  <div className="flex-1 min-h-0" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: `repeat(${nRows}, 1fr)`, gap: "0.5rem" }}>
                    {activeActions.map((qa, i) => {
                      const isLastOdd = activeActions.length % 2 !== 0 && i === activeActions.length - 1;
                      return (
                        <button
                          key={qa.label}
                          title={qa.hint}
                          onClick={() => toast(qa.toast, { description: qa.hint })}
                          className="flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-colors p-2 text-center"
                          style={{ background: "transparent", borderColor: C.purple100, gridColumn: isLastOdd ? "span 2" : undefined }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.purple100; (e.currentTarget as HTMLElement).style.borderColor = C.purple200; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = C.purple100; }}
                        >
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
                            <qa.icon size={16} style={{ color: C.purpleIcon }} />
                          </div>
                          <span className="text-[10px] font-semibold leading-tight" style={{ color: C.tertiary }}>{qa.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </Card>

            {/* Editor panel — matches workspace management panel design */}
            {qaEditOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" style={{ background: "rgba(30,25,46,0.48)" }} onClick={() => setQaEditOpen(false)} />

                {/* Panel */}
                <div className="fixed z-50 flex flex-col overflow-hidden"
                  style={{
                    ...(isMobile
                      ? { bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0", width: "100%", maxHeight: "92vh" }
                      : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: 20,
                          width: catalog.length <= 7
                            ? "min(560px, calc(100vw - 48px))"
                            : catalog.length <= 12
                              ? "min(720px, calc(100vw - 48px))"
                              : "min(900px, calc(100vw - 48px))" }),
                    background: "var(--card)", border: `1px solid ${C.purple200}`, boxShadow: "0 20px 60px rgba(68,15,124,0.22)",
                  }}>

                  {/* Panel header */}
                  <div className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)`, borderBottom: `1px solid ${C.purple200}` }}>
                    <div>
                      <div className="text-[15px] font-bold" style={{ color: C.tertiary }}>Customise Quick Actions</div>
                      <div className="text-[12px] mt-0.5" style={{ color: C.tertiary300 }}>
                        Select 4 actions to pin to your dashboard
                      </div>
                    </div>
                    <button onClick={() => setQaEditOpen(false)}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/60"
                      style={{ color: C.tertiary }}>
                      <X size={13} />
                    </button>
                  </div>

                  {/* Body */}
                  <div>

                    {/* Progress section */}
                    <div className="px-4 pt-4 pb-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.tertiary300 }}>Selected Actions</div>
                        <span className="text-[11px] font-semibold" style={{ color: qaEditorDraft.length === 4 ? C.purple : C.tertiary300 }}>
                          {qaEditorDraft.length} / 4
                        </span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: C.purple100 }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${(qaEditorDraft.length / 4) * 100}%`, background: C.purple }} />
                      </div>
                    </div>

                    {/* Action grid */}
                    <div className="px-4 pb-4 pt-2">
                      <div className={`grid gap-2 ${catalog.length <= 7 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {catalog.map(qa => {
                          const selected = qaEditorDraft.includes(qa.label);
                          const disabled = !selected && qaEditorDraft.length >= 4;
                          return (
                            <button
                              key={qa.label}
                              onClick={() => !disabled && toggleDraft(qa.label)}
                              disabled={disabled}
                              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border text-left transition-colors"
                              style={{
                                background: selected ? C.purple100 : "var(--card)",
                                borderColor: selected ? C.purple200 : C.purple100,
                                cursor: disabled ? "not-allowed" : "pointer",
                              }}
                              onMouseEnter={e => { if (!disabled && !selected) (e.currentTarget as HTMLElement).style.background = C.tertiary50; }}
                              onMouseLeave={e => { if (!disabled && !selected) (e.currentTarget as HTMLElement).style.background = "var(--card)"; }}
                            >
                              {/* Checkbox */}
                              <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border"
                                style={{ borderColor: selected ? C.purple : C.purple200, background: selected ? C.purple : "var(--card)" }}>
                                {selected && <Check size={9} style={{ color: "white" }} />}
                              </div>
                              {/* Icon */}
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: C.purple100 }}>
                                <qa.icon size={13} style={{ color: C.purpleIcon }} />
                              </div>
                              <span className="text-[12px] leading-tight flex-1 min-w-0" style={{ color: C.tertiary, fontWeight: selected ? 600 : 400 }}>{qa.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 flex-shrink-0 flex gap-2" style={{ borderTop: `1px solid ${C.purple200}` }}>
                    <button
                      onClick={() => { setCustomQALabels(null); setQaEditOpen(false); }}
                      className="flex-1 py-2 rounded-xl text-[12px] font-semibold border border-border transition-colors"
                      style={{ color: C.tertiary300, background: "var(--card)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.tertiary50}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--card)"}
                    >
                      Reset to default
                    </button>
                    <button
                      onClick={saveEditor}
                      disabled={qaEditorDraft.length !== 4}
                      className="flex-1 py-2 rounded-xl text-[12px] font-semibold text-white transition-opacity"
                      style={{ background: C.purple, opacity: qaEditorDraft.length === 4 ? 1 : 0.4 }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        );
      }
      default:            return null;
    }
  };

  // ── Card cell renderer (shared by unified grid and row grid) ─────────────────
  const renderCardCell = (id: string, previewIdx: number, extraStyle?: React.CSSProperties): React.ReactNode => {
    const isDragging = dragging === id;
    const isInsertTarget = dragOver === id && dragging !== id;
    const origIdx = cardOrder.indexOf(id);
    const showHandles = (isEditing || tourEditMode) && id !== "identity";
    // First card gets the tour anchor ID for step 3 spotlight
    const isFirstCard = previewIdx === 0;
    return (
      <div key={id}
        id={id === "actions" ? "tour-quick-actions" : isFirstCard ? "tour-first-card" : undefined}
        onDragOver={isEditing ? e => handleDragOver(id, e) : undefined}
        onDrop={isEditing ? commitDrop : undefined}
        style={{
          position: "relative",
          opacity: isDragging ? 0.3 : 1,
          outline: isInsertTarget ? `2px dashed ${C.purple300}` : "2px solid transparent",
          outlineOffset: 3,
          borderRadius: 16,
          transition: "opacity 0.15s, outline 0.1s",
          ...extraStyle,
        }}>
        {showHandles && (
          <div style={{ position: "absolute", top: 10, right: 10, zIndex: 20, display: "flex", gap: 4, alignItems: "center" }}>
            {/* Mobile up/down arrows — only in real edit mode */}
            {isEditing && isMobile && (
              <>
                <button onClick={() => origIdx > 0 && moveCard(origIdx, -1)} aria-label="Move card up"
                  style={{ ...handleStyle, opacity: origIdx === 0 ? 0.3 : 1, cursor: origIdx === 0 ? "default" : "pointer" }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1.5L1 6.5h7L4.5 1.5z" fill={C.tertiary} /></svg>
                </button>
                <button onClick={() => origIdx < cardOrder.length - 1 && moveCard(origIdx, 1)} aria-label="Move card down"
                  style={{ ...handleStyle, opacity: origIdx === cardOrder.length - 1 ? 0.3 : 1, cursor: origIdx === cardOrder.length - 1 ? "default" : "pointer" }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 7.5L1 2.5h7L4.5 7.5z" fill={C.tertiary} /></svg>
                </button>
              </>
            )}
            {/* Grip handle — interactive in real edit mode, demo-only in tour */}
            {tourEditMode && !isEditing ? (
              <div style={{
                ...handleStyle, cursor: "grab",
                background: "transparent",
                border: `2px solid ${C.purple}`,
                animation: "tour-ring-pulse 1.2s ease-in-out infinite",
              }}>
                <GripVertical size={13} style={{ color: C.purpleIcon }} />
              </div>
            ) : (
              <div
                draggable={!isMobile}
                onDragStart={!isMobile ? e => handleDragStart(id, e) : undefined}
                onDragEnd={!isMobile ? handleDragEnd : undefined}
                tabIndex={0}
                role="button"
                aria-label={`Drag to reorder ${id} card`}
                onKeyDown={e => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); if (origIdx > 0) moveCard(origIdx, -1); }
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); if (origIdx < cardOrder.length - 1) moveCard(origIdx, 1); }
                }}
                style={{ ...handleStyle, cursor: isMobile ? "default" : "grab" }}>
                <GripVertical size={13} style={{ color: C.tertiary }} />
              </div>
            )}
            {/* Remove button — only in real edit mode */}
            {isEditing && ADDABLE_CARD_IDS.has(id) && (
              <button
                onClick={() => setCardOrder(prev => prev.filter(cid => cid !== id))}
                aria-label={`Remove ${id} card`}
                style={{ ...handleStyle, marginLeft: 2 }}
                title="Remove card">
                <X size={11} style={{ color: "#dc2626" }} />
              </button>
            )}
          </div>
        )}
        {renderCardById(id)}
      </div>
    );
  };

  // ── Row renderer (tablet + mobile) ───────────────────────────────────────────
  const renderRow = (rowCards: string[], gridClass: string, rowStartIdx: number) => (
    <div className={`grid ${gridClass} gap-4`}>
      {rowCards.map((id: string, localIdx: number) => renderCardCell(id, rowStartIdx + localIdx))}
    </div>
  );

  return (
    <div className={`${px} py-5 space-y-4`}>
      {/* Header row: greeting left, quick actions centre, workspace controls right */}
      <div className={`flex gap-3 ${isMobile ? "flex-col items-start" : "items-center justify-between"}`}>
        {/* Left: greeting */}
        <div className="min-w-0 flex-shrink-0">
          <h1 className="text-base font-bold" style={{ color: C.tertiary }}>{greeting}</h1>
          <p className="text-[12px] mt-0.5" style={{ color: C.tertiary }}>{subGreeting}</p>
        </div>


        {/* Right: workspace controls */}
        <div className={`flex items-center gap-2 flex-shrink-0 ${isMobile ? "flex-wrap w-full" : ""}`}>
          {isEditing && !savePanelOpen && !exitConfirm && (
            <>
              {/* Arrange label */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0" style={{ background: C.purple200 }}>
                  <GripVertical size={11} style={{ color: C.purpleIcon }} />
                </div>
                <span className="text-[11px] font-semibold hidden sm:inline" style={{ color: C.tertiary }}>Arrange Workspace</span>
              </div>
              {isDirty && (
                <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: C.magenta100, color: C.magentaIcon, border: `1px solid ${C.magenta200}` }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.magentaIcon }} />
                  Unsaved
                </span>
              )}
              {!resetConfirm && (
                <button onClick={() => setResetConfirm(true)}
                  className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{ color: C.tertiary300 }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.tertiary}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.tertiary300}>
                  Reset
                </button>
              )}
              {resetConfirm && (
                <>
                  <span className="text-[11px]" style={{ color: C.tertiary }}>Reset to default?</span>
                  <button onClick={() => { setCardOrder(getDefaultOrder(plan)); setResetConfirm(false); }}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg" style={{ background: S.error50, color: S.error }}>Confirm</button>
                  <button onClick={() => setResetConfirm(false)}
                    className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Cancel</button>
                </>
              )}
              <div className="w-px h-4 flex-shrink-0" style={{ background: C.purple200 }} />
              <button onClick={handleCancelClick}
                className="text-[11px] font-medium px-3 py-1.5 rounded-xl border border-border transition-colors"
                style={{ background: "var(--card)", color: C.tertiary }}>
                Cancel
              </button>
              <button
                onClick={saveWorkspace}
                disabled={!isDirty}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-opacity"
                style={{ background: C.purple, color: "white", opacity: isDirty ? 1 : 0.38, cursor: isDirty ? "pointer" : "default" }}>
                Save Workspace
              </button>
            </>
          )}

          {/* Exit-confirm strip (unsaved changes) */}
          {isEditing && !savePanelOpen && exitConfirm && (
            <div className={`flex items-center gap-2 flex-wrap px-3 py-2 rounded-xl ${isMobile ? "w-full" : ""}`} style={{ background: C.magenta100, border: `1px solid ${C.magenta200}` }}>
              <span className="text-[11px] font-medium flex-1 min-w-0" style={{ color: C.tertiary }}>Unsaved changes — what would you like to do?</span>
              <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
                <button onClick={() => setExitConfirm(false)}
                  className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Continue Editing</button>
                <button onClick={discardAndExit}
                  className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg" style={{ color: C.tertiary300 }}>Discard</button>
                <button onClick={saveWorkspace}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-xl" style={{ background: C.purple, color: "white" }}>Save Workspace</button>
              </div>
            </div>
          )}

          {/* Unified Manage Workspace button — hidden, reserved for future use */}
          {false && !isEditing && (
          <div className="relative flex-shrink-0">
            <button
              id="tour-workspace-btn"
              onClick={() => { setIsManageOpen(p => !p); setWsEditId(null); setWsRenameId(null); setWsDeleteId(null); setWsLockTooltip(false); setIdentityLockTooltip(false); setWsResetConfirm(false); }}
              className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-xl border border-border hover:bg-muted transition-colors"
              style={{ color: C.tertiary, background: isManageOpen ? C.purple100 : "white", borderColor: isManageOpen ? C.purple200 : undefined }}>
              <Sliders size={12} />
              <span className="max-w-[140px] truncate">{activeWs.name}</span>
              {isDirty && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.magenta }} />}
              <ChevronDown size={10} style={{ transform: isManageOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
            </button>

            {/* Backdrop — dims workspace so the panel is the clear focus */}
            {isManageOpen && <div className="fixed inset-0 z-40" style={{ background: "rgba(30,25,46,0.48)" }} onClick={() => { setIsManageOpen(false); setWsLockTooltip(false); setIdentityLockTooltip(false); }} />}

            {/* Unified panel — fixed centered on desktop/tablet, bottom-sheet on mobile */}
            {isManageOpen && (
              <div className="fixed z-50 flex flex-col overflow-hidden"
                style={{
                  ...(isMobile
                    ? { bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0", width: "100%", maxHeight: "88vh" }
                    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: 20,
                        width: isTablet ? "min(540px, calc(100vw - 48px))" : "min(700px, calc(100vw - 80px))",
                        maxHeight: "min(88vh, 780px)" }),
                  background: "var(--card)", border: `1px solid ${C.purple200}`, boxShadow: "0 20px 60px rgba(68,15,124,0.22)",
                }}>

                {/* ── Panel header ── */}
                <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)`, borderBottom: `1px solid ${C.purple200}` }}>
                  <div>
                    <div className="text-[15px] font-bold" style={{ color: C.tertiary }}>Manage Workspace</div>
                    <div className="text-[12px] mt-0.5" style={{ color: C.tertiary300 }}>Arrange modules and customise your view</div>
                  </div>
                  <button onClick={() => setIsManageOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/60" style={{ color: C.tertiary }}>
                    <X size={13} />
                  </button>
                </div>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto">

                  {/* SECTION: Workspaces */}
                  <div className="px-4 pt-4 pb-3">
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: C.tertiary300 }}>Workspaces</div>
                    <div className="space-y-0.5">
                      {workspaces.map(ws => {
                        const isActive = ws.id === activeWs.id;
                        const isDefault = ws.id === "default";
                        const isExpanded = wsEditId === ws.id && wsRenameId !== ws.id && wsDeleteId !== ws.id;
                        const isRenaming = wsRenameId === ws.id;
                        const isDeleting = wsDeleteId === ws.id;
                        return (
                          <div key={ws.id}>
                            {isRenaming ? (
                              <div className="rounded-xl px-2.5 py-2.5" style={{ background: C.purple100 }}>
                                <input autoFocus value={wsRenameVal} onChange={e => setWsRenameVal(e.target.value)}
                                  onKeyDown={e => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") { setWsRenameId(null); setWsEditId(null); } }}
                                  className="w-full text-[13px] px-2.5 py-2 rounded-lg border outline-none block"
                                  style={{ color: C.tertiary, borderColor: C.purple200, background: "var(--card)" }} />
                                <div className="flex items-center gap-1.5 mt-2">
                                  <button onClick={commitRename} className="text-[12px] font-semibold px-3 py-1.5 rounded-lg" style={{ background: C.purple, color: "white" }}>Save</button>
                                  <button onClick={() => { setWsRenameId(null); setWsEditId(null); }} className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Cancel</button>
                                </div>
                              </div>
                            ) : isDeleting ? (
                              <div className="rounded-xl px-2.5 py-2.5" style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}>
                                <div className="text-[13px] font-semibold mb-0.5" style={{ color: C.tertiary }}>Delete workspace?</div>
                                <div className="text-[12px] mb-2 truncate" style={{ color: C.tertiary300 }}>&ldquo;{ws.name}&rdquo;</div>
                                <div className="flex items-center gap-1.5">
                                  <button onClick={() => deleteWorkspace(ws.id)} className="text-[12px] font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#dc2626", color: "white" }}>Delete</button>
                                  <button onClick={() => { setWsDeleteId(null); setWsEditId(null); }} className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <div className="rounded-xl" style={{ background: isExpanded ? C.purple100 : "transparent" }}>
                                <div className="flex items-center gap-1">
                                  <button onClick={() => isActive ? undefined : switchWorkspace(ws.id)}
                                    className="flex-1 flex items-center gap-2 px-2.5 py-2 text-left rounded-xl transition-colors min-w-0"
                                    style={{ cursor: isActive ? "default" : "pointer", background: "transparent" }}
                                    onMouseEnter={e => { if (!isActive && !isExpanded) (e.currentTarget as HTMLElement).style.background = C.tertiary50; }}
                                    onMouseLeave={e => { if (!isActive && !isExpanded) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                                    <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                                      {isActive && <Check size={12} style={{ color: C.purpleIcon }} />}
                                    </div>
                                    <span className="text-[13px] flex-1 min-w-0 truncate" style={{ color: isActive ? C.purpleIcon : C.tertiary, fontWeight: isActive ? 600 : 400 }}>{ws.name}</span>
                                  </button>
                                  {isDefault ? (
                                    <div className="relative pr-2.5 pl-1 flex-shrink-0">
                                      <button onClick={() => setWsLockTooltip(p => !p)} aria-label="Protected workspace"
                                        className="p-1 rounded flex items-center justify-center" style={{ color: C.tertiary300 }}>
                                        <Lock size={11} />
                                      </button>
                                      {wsLockTooltip && (
                                        <div className="absolute right-0 top-full mt-1 z-10 px-2.5 py-1.5 rounded-lg text-[10px] font-medium" style={{ background: C.tertiary800, color: "white", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                                          Default Workspace — cannot be renamed or deleted
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <button onClick={() => { setWsEditId(isExpanded ? null : ws.id); setWsRenameId(null); setWsDeleteId(null); setWsLockTooltip(false); }}
                                      className="pr-2.5 pl-1 py-2 flex-shrink-0" aria-label={`Edit ${ws.name}`}>
                                      <Pencil size={11} style={{ color: isExpanded ? C.purple : C.tertiary300 }} />
                                    </button>
                                  )}
                                </div>
                                {isExpanded && (
                                  <div className="px-2.5 pb-2.5 pt-1" style={{ borderTop: `1px solid ${C.purple200}`, marginTop: 2 }}>
                                    <div className="flex items-center gap-2">
                                      <button onClick={() => { setWsRenameId(ws.id); setWsRenameVal(ws.name); }}
                                        className="text-[12px] font-medium px-3 py-2 rounded-lg border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Rename</button>
                                      <button onClick={() => setWsDeleteId(ws.id)}
                                        className="text-[12px] font-medium px-3 py-2 rounded-lg" style={{ background: "#fff1f2", color: "#dc2626" }}>Delete</button>
                                      <button onClick={() => setWsEditId(null)} className="ml-auto p-1.5 rounded-lg" style={{ color: C.tertiary300 }}><X size={11} /></button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={createWorkspace}
                      className="mt-1.5 w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors"
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.purple100}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                      <Plus size={12} style={{ color: C.purpleIcon }} />
                      <span className="text-[13px] font-medium" style={{ color: C.purpleIcon }}>Create New Workspace</span>
                    </button>
                  </div>

                  <div className="mx-4 mt-1" style={{ height: 1, background: C.purple100 }} />

                  {/* SECTION: Workspace Modules — responsive multi-column grid */}
                  <div className="px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C.tertiary300 }}>Workspace Modules</div>
                      <div className="text-[12px]" style={{ color: C.tertiary300 }}>
                        {cardOrder.filter(isPlanCard).length} of {ALL_WS_MODULES.filter(m => isPlanCard(m.id)).length} shown
                      </div>
                    </div>
                    {(() => {
                      const planModules = ALL_WS_MODULES.filter(m => isPlanCard(m.id));
                      const numCols = isMobile ? 1 : isTablet ? 2 : 3;
                      const colSize = Math.ceil(planModules.length / numCols);
                      const cols = Array.from({ length: numCols }, (_, ci) =>
                        planModules.slice(ci * colSize, (ci + 1) * colSize)
                      );
                      return (
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, 1fr)`, gap: "0 16px" }}>
                      {cols.map((col, ci) => (
                        <div key={ci} className="space-y-1 min-w-0">
                          {col.map(mod => {
                            const isChecked = cardOrder.includes(mod.id);
                            const isLocked = !!mod.locked;
                            return (
                              <label key={mod.id}
                                className="flex items-center gap-2 px-2 py-2 rounded-lg transition-colors min-w-0"
                                style={{ cursor: isLocked ? "default" : "pointer", background: "transparent" }}
                                onMouseEnter={e => { if (!isLocked) (e.currentTarget as HTMLElement).style.background = C.tertiary50; }}
                                onMouseLeave={e => { if (!isLocked) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                                {/* Checkbox */}
                                <div className="flex-shrink-0"
                                  onClick={e => { e.preventDefault(); if (!isLocked) toggleModule(mod.id); }}>
                                  <div className="w-4 h-4 rounded flex items-center justify-center border transition-all"
                                    style={{
                                      background: isChecked ? (isLocked ? C.tertiary300 : C.purple) : "var(--card)",
                                      borderColor: isChecked ? (isLocked ? C.tertiary300 : C.purple) : C.tertiary200,
                                    }}>
                                    {isChecked && <Check size={10} color="white" />}
                                  </div>
                                </div>
                                {/* Icon */}
                                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
                                  <mod.icon size={13} style={{ color: C.purpleIcon }} />
                                </div>
                                {/* Label */}
                                <span className="text-[12px] flex-1 min-w-0 truncate" style={{ color: isLocked ? C.tertiary300 : C.tertiary }}>
                                  {mod.label}
                                </span>
                                {/* Lock icon with tooltip for identity */}
                                {isLocked && (
                                  <div className="relative flex-shrink-0">
                                    <button type="button"
                                      onClick={e => { e.preventDefault(); e.stopPropagation(); setIdentityLockTooltip(p => !p); }}
                                      aria-label="Identity Card is required and cannot be hidden"
                                      className="p-0.5 rounded" style={{ color: C.tertiary300 }}>
                                      <Lock size={10} />
                                    </button>
                                    {identityLockTooltip && (
                                      <div className="absolute right-0 top-full mt-1 z-20 px-2.5 py-1.5 rounded-lg text-[10px] font-medium"
                                        style={{ background: C.tertiary800, color: "white", whiteSpace: "nowrap", lineHeight: 1.4, maxWidth: 220 }}>
                                        Identity Card is required and cannot be hidden.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                      );
                    })()}
                  </div>
                </div>

                {/* ── Panel footer ── */}
                <div className="flex-shrink-0" style={{ borderTop: `1px solid ${C.purple100}` }}>
                  {/* Customize Layout */}
                  <div className="px-4 pt-3 pb-2">
                    <button
                      onClick={() => { setIsManageOpen(false); setIsEditing(true); setWsEditId(null); setWsRenameId(null); setWsDeleteId(null); setWsResetConfirm(false); }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors w-full"
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.tertiary50}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                      <GripVertical size={15} style={{ color: C.tertiary }} />
                      <span className="text-[13px] font-medium" style={{ color: C.tertiary }}>Customize Layout</span>
                      <ArrowRight size={13} style={{ color: C.tertiary300 }} />
                    </button>
                  </div>
                  {/* Reset Workspace — always visible */}
                  <div className="px-4 pb-3" style={{ borderTop: `1px solid ${C.purple100}` }}>
                    {!wsResetConfirm ? (
                      <button onClick={() => setWsResetConfirm(true)}
                        className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border w-full transition-colors"
                        style={{ background: "var(--card)", color: C.tertiary }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = S.error50}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--card)"}>
                        <RotateCcw size={14} style={{ color: C.tertiary300 }} />
                        <span className="text-[13px] font-medium">Reset Workspace</span>
                      </button>
                    ) : (
                      <div className="mt-3 rounded-xl p-4" style={{ background: S.error50, border: `1px solid ${S.error100}` }}>
                        <div className="text-[13px] font-semibold mb-1" style={{ color: C.tertiary }}>Reset Workspace?</div>
                        <p className="text-[12px] leading-relaxed mb-4" style={{ color: C.tertiary }}>Resetting will restore the default workspace layout and module arrangement for this plan.</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => { resetToDefault(); setWsResetConfirm(false); }}
                            className="text-[13px] font-semibold px-4 py-2 rounded-xl" style={{ background: "#dc2626", color: "white" }}>Reset Workspace</button>
                          <button onClick={() => setWsResetConfirm(false)}
                            className="text-[13px] font-medium px-4 py-2 rounded-xl border border-border" style={{ background: "var(--card)", color: C.tertiary }}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Save / Discard — only when dirty */}
                  {isDirty && (
                    <div className="px-4 pb-4 pt-2" style={{ borderTop: `1px solid ${C.purple100}` }}>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: C.magenta }} />
                        <span className="text-[12px] font-medium" style={{ color: C.tertiary }}>Unsaved changes</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={discardAndExit}
                          className="text-[12px] font-medium px-3 py-2 rounded-lg flex-shrink-0"
                          style={{ color: C.tertiary300 }}>Discard</button>
                        <button onClick={() => { setIsManageOpen(false); saveWorkspace(); }}
                          className="text-[12px] font-semibold px-4 py-2 rounded-xl flex-shrink-0 ml-auto"
                          style={{ background: C.purple, color: "white" }}>Save Workspace</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Save Workspace naming panel — compact inline panel below header */}
      {isEditing && savePanelOpen && (
        <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: `1px solid ${C.purple200}`, boxShadow: "0 4px 20px rgba(68,15,124,0.10)" }}>
          <div className="text-[13px] font-bold mb-0.5" style={{ color: C.tertiary }}>Save Workspace</div>
          <div className="text-[11px] mb-4" style={{ color: C.tertiary300 }}>Give your workspace a name so you can easily find it later.</div>
          <label className="text-[10px] font-semibold uppercase tracking-wide block mb-1.5" style={{ color: C.tertiary300 }}>Workspace name</label>
          <input
            autoFocus
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && saveName.trim()) commitSave(saveName); if (e.key === "Escape") { setSavePanelOpen(false); setSaveName(""); } }}
            placeholder="e.g. My Daily Workspace"
            className="w-full text-[12px] px-3 py-2 rounded-xl border outline-none mb-4 block"
            style={{ color: C.tertiary, borderColor: C.purple200, background: "var(--card)" }}
          />
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => commitSave(saveName)}
              disabled={!saveName.trim()}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-opacity"
              style={{ background: C.purple, color: "white", opacity: saveName.trim() ? 1 : 0.38, cursor: saveName.trim() ? "pointer" : "default" }}>
              Save Workspace
            </button>
            <button
              onClick={() => commitSave(null)}
              className="text-[11px] font-medium px-3 py-1.5 rounded-xl border border-border"
              style={{ background: "var(--card)", color: C.tertiary }}>
              Save as Untitled
            </button>
            <button
              onClick={() => { setSavePanelOpen(false); setSaveName(""); }}
              className="text-[11px] font-medium px-2.5 py-1.5 rounded-xl ml-auto"
              style={{ color: C.tertiary300 }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile quick actions — horizontal scroll strip */}
      {isMobile && !isEditing && (() => {
        const actions = plan === "basic" ? QA_BASIC : plan === "standard" ? QA_STANDARD : QA_PREMIUM[scenario];
        return (
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {actions.map(qa => (
              <button
                key={qa.label}
                title={qa.hint}
                onClick={() => toast(qa.toast, { description: qa.hint })}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border flex-shrink-0"
                style={{ background: "var(--card)", borderColor: C.purple200, color: C.tertiary }}
              >
                <qa.icon size={11} style={{ color: C.purpleIcon }} />
                <span className="text-[10px] font-medium whitespace-nowrap">{qa.label}</span>
              </button>
            ))}
          </div>
        );
      })()}

      {/* ── Workspace card grid ───────────────────────────────────────────── */}
      {!isMobile && !isTablet ? (
        /* Desktop: fluid CSS Grid — rows share height, list cards expand to fill */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "16px",
        }}>
          {(() => {
            const visible = previewOrder.filter(isPlanCard).filter(id => renderCardById(id) !== null);
            const layout = packLayout(visible, plan);
            return layout.map(({ id, span }, idx) =>
              renderCardCell(id, idx, { gridColumn: `span ${span}` })
            );
          })()}
        </div>
      ) : (
        /* Tablet + Mobile: single dynamic grid over all active cards */
        <>{(() => {
            const visible = previewOrder.filter(isPlanCard).filter(id => renderCardById(id) !== null);
            return renderRow(visible, isMobile ? "grid-cols-1" : "grid-cols-2", 0);
          })()}</>
      )}

    </div>
  );
}


// ─── Header ───────────────────────────────────────────────────────────────────
function DashboardHeader({ scenario, plan, viewMode, tourStep, onTourStep, onTourComplete, tourCompleted, activeOrgId, onLogout, onSwitchOrg, isDark, onToggleTheme }: {
  scenario: ScenarioId; plan: PlanId; viewMode: ViewMode;
  tourStep: number | null; onTourStep: (s: number | null) => void; onTourComplete: () => void; tourCompleted: boolean;
  activeOrgId: string;
  onLogout: () => void;
  onSwitchOrg: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const [activePanel, setActivePanel] = useState<"search" | "launcher" | "lang" | "notif" | "help" | "profile" | null>(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [notifMarkedAll, setNotifMarkedAll] = useState(false);
  const isMobile = viewMode === "mobile";
  const isConstrained = viewMode !== "desktop";

  // ── Product walkthrough ──────────────────────────────────────────────────
  const [tourRect, setTourRect] = useState<DOMRect | null>(null);

  // Periodic launcher nudge after tour completion
  const [showLauncherNudge, setShowLauncherNudge] = useState(false);

  const toggle = (panel: typeof activePanel) => { setActivePanel(p => p === panel ? null : panel); if (panel === "launcher") setShowLauncherNudge(false); };
  const close = () => setActivePanel(null);
  const unreadCount = notifMarkedAll ? 0 : NOTIFS.filter(n => !n.read).length;
  useEffect(() => {
    if (tourStep !== null) return; // tour still active — wait until dismissed or completed
    const show = () => setShowLauncherNudge(true);
    const hide = () => setShowLauncherNudge(false);
    // Show after 4s, hide after 3s, repeat every 14s
    const cycle = () => {
      const t1 = setTimeout(() => { show(); const t2 = setTimeout(hide, 3000); return t2; }, 4000);
      return t1;
    };
    let handle = cycle();
    const interval = setInterval(() => { clearTimeout(handle); handle = cycle(); }, 14000);
    return () => { clearTimeout(handle); clearInterval(interval); };
  }, [tourStep]);

  const TOUR_IDS = ["tour-launcher", "tour-eye-toggle", "tour-announcement-pin"];

  // Re-measure target element whenever step changes
  useEffect(() => {
    if (tourStep === null) { setTourRect(null); return; }
    const measure = () => {
      const el = document.getElementById(TOUR_IDS[tourStep]);
      if (el) setTourRect(el.getBoundingClientRect());
    };
    measure();
    const t = setTimeout(measure, 120);
    return () => clearTimeout(t);
  }, [tourStep]);

  const completeTour = () => { onTourComplete(); setTourRect(null); };
  const closeTour = () => { onTourStep(null); setTourRect(null); };
  const nextTour = () => onTourStep(tourStep !== null && tourStep < TOUR_STEPS.length - 1 ? tourStep + 1 : null);
  const prevTour = () => onTourStep(tourStep !== null && tourStep > 0 ? tourStep - 1 : tourStep);

  // Smart placement: prefer below, fallback above, then right, then left
  const getTooltipPlacement = (rect: DOMRect): React.CSSProperties => {
    const TW = 380, TH = 260, PAD = 12;
    const vw = window.innerWidth, vh = window.innerHeight;
    // Centre the tooltip horizontally on the target, clamping to viewport
    const centreLeft = rect.left + rect.width / 2 - TW / 2;
    const clampedLeft = Math.max(PAD, Math.min(centreLeft, vw - TW - PAD));
    if (rect.bottom + TH + PAD < vh) return { position: "fixed", top: rect.bottom + PAD, left: clampedLeft, width: TW };
    if (rect.top - TH - PAD > 0)    return { position: "fixed", top: rect.top - TH - PAD, left: clampedLeft, width: TW };
    if (rect.right + TW + PAD < vw) return { position: "fixed", top: Math.max(PAD, Math.min(rect.top, vh - TH - PAD)), left: rect.right + PAD, width: TW };
    return { position: "fixed", top: Math.max(PAD, Math.min(rect.top, vh - TH - PAD)), left: Math.max(PAD, rect.left - TW - PAD), width: TW };
  };

  type TourStepDef = { icon: React.ElementType; color: string; bg: string; title: string; body: string; label: string };
  const TOUR_STEPS: TourStepDef[] = [
    {
      icon: LayoutGrid, color: C.purpleIcon, bg: C.purple100,
      title: "Your App Launcher",
      body: "The grid icon opens your App Launcher — your hub for every module in your workspace. Click it to explore and navigate between apps.",
      label: "Grid icon · top-right of the header",
    },
    {
      icon: Eye, color: C.magentaIcon, bg: C.magenta100,
      title: "Privacy Toggle",
      body: "Your Employee Benefits card has a privacy toggle. Click the eye icon to instantly show or hide your salary and financial information.",
      label: "Eye icon · next to the Employee Benefits card title",
    },
    {
      icon: Pin, color: C.purpleIcon, bg: C.purple100,
      title: "Pin an Announcement",
      body: "Hover over any announcement and click the pin icon to keep it at the top of your list. You can pin one announcement at a time — pin a different one to move it to the top.",
      label: "Pin icon · hover over an announcement to reveal it",
    },
  ];

  const panelAt = (w: number): React.CSSProperties => ({
    position: "absolute",
    right: 8,
    top: "calc(100% + 8px)",
    zIndex: 50,
    width: w,
    maxWidth: "calc(100% - 16px)",
  });

  return (
    <>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes tour-ring-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 0 0 transparent; }
        50% { opacity: 0.45; box-shadow: 0 0 0 5px transparent; }
      }
    `}</style>
    <header className="bg-card border-b border-border relative"
      style={{ flexShrink: 0, zIndex: 30, boxShadow: "0px 1px 4px rgba(68,15,124,0.07)", borderRadius: isConstrained ? "16px 16px 0 0" : 0 }}>
      <div className="h-[54px] flex items-center px-4 gap-2">

        {/* Logo — active organisation */}
        {(() => {
          const activeOrg = ORG_ACCOUNTS.find(o => o.id === activeOrgId) ?? ORG_ACCOUNTS[0];
          return (
            <div className="flex items-center gap-2.5 flex-shrink-0 mr-1">
              <img src={activeOrg.logo} alt={activeOrg.name} className="h-[28px] w-auto max-w-[120px] pointer-events-none flex-shrink-0" style={{ objectFit: "contain", display: "block" }} />
              {!isMobile && (
                <div style={{ display: "block" }}>
                  <p className="text-[11px] font-bold leading-[13px]" style={{ color: C.tertiary }}>My Workspace</p>
                  <p className="text-[8.5px] font-medium leading-[11px] flex items-center gap-1" style={{ color: C.tertiary300 }}>
                    powered by <img src={imgLogo} alt="NotchHR" style={{ height: 11, width: "auto", display: "inline-block", verticalAlign: "middle", opacity: isDark ? 0.85 : 0.7, filter: isDark ? "brightness(0) invert(1)" : "none" }} />
                  </p>
                </div>
              )}
            </div>
          );
        })()}

        {/* Search bar — click to open panel */}
        {!isMobile && (
          <div className="flex-1 flex justify-center px-3">
            <button onClick={() => toggle("search")}
              className="relative flex items-center justify-between h-[38px] w-full max-w-[420px] px-[14px] rounded-full border transition-all"
              style={{ background: activePanel === "search" ? C.purple100 : "var(--brand-tertiary100)", borderColor: activePanel === "search" ? C.purple300 : "var(--brand-tertiary200)" }}>
              <span className="text-[13px] font-normal" style={{ color: C.tertiary }}>Search workspace</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p32697080} stroke={C.tertiary400} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* Right controls */}
        <div className={`flex items-center gap-1.5 flex-shrink-0 ${isMobile ? "ml-auto" : ""}`}>

          {/* Mobile search icon */}
          {isMobile && (
            <button onClick={() => toggle("search")}
              className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors"
              style={{ background: activePanel === "search" ? C.purple100 : "var(--brand-tertiary100)" }}>
              <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p32697080} stroke={activePanel === "search" ? C.purpleIcon : C.tertiary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </button>
          )}

          <div style={{ position: "relative", flexShrink: 0 }}>
            <AppLauncher plan={plan} isOpen={activePanel === "launcher"} onToggle={() => toggle("launcher")} nudge={showLauncherNudge} />
            {showLauncherNudge && activePanel !== "launcher" && tourStep === null && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                zIndex: 55,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderRadius: 999,
                padding: "5px 12px",
                fontSize: 11,
                fontWeight: 600,
                color: "white",
                background: `linear-gradient(135deg, ${C.purple} 0%, ${C.magenta} 100%)`,
                boxShadow: "0 4px 16px rgba(68,15,124,0.28)",
              }}>
                <LayoutGrid size={12} style={{ color: "rgba(255,255,255,0.85)", flexShrink: 0 }} />
                Click here to get started
              </div>
            )}
          </div>

          {!isMobile && (
            <LanguageTrigger selectedCode={selectedLang} isOpen={activePanel === "lang"} onToggle={() => toggle("lang")} />
          )}

          <NotifTrigger unreadCount={unreadCount} isOpen={activePanel === "notif"} onToggle={() => toggle("notif")} />

          <button onClick={() => toggle("help")}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors flex-shrink-0"
            style={{ background: activePanel === "help" ? C.purple100 : "var(--brand-tertiary100)" }}
            title="Help & Support">
            <HelpCircle size={17} style={{ color: activePanel === "help" ? C.purpleIcon : C.tertiary }} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors flex-shrink-0"
            style={{ background: isDark ? C.purple100 : "var(--brand-tertiary100)" }}>
            {isDark
              ? <Sun size={17} style={{ color: C.purpleIcon }} />
              : <Moon size={17} style={{ color: C.tertiary }} />}
          </button>

          <div className="w-px h-[20px] flex-shrink-0" style={{ background: C.tertiary200 }} />

          <ProfileTrigger scenario={scenario} isOpen={activePanel === "profile"} onToggle={() => toggle("profile")} />
        </div>
      </div>

      {/* Global Search — full-width, already self-positions */}
      <GlobalSearch isOpen={activePanel === "search"} onClose={close} />

      {/* Shared backdrop for all non-search panels */}
      {activePanel && activePanel !== "search" && (
        <div className="fixed inset-0 z-40" onClick={close} />
      )}

      {/* All panels rendered at header level so they constrain to header/frame width */}
      {activePanel === "launcher" && (
        <div style={panelAt(340)}>
          <AppLauncherPanel plan={plan} onClose={close} />
        </div>
      )}

      {/* ── Product walkthrough overlay ───────────────────────────────────── */}
      {tourStep !== null && (() => {
        const step = TOUR_STEPS[tourStep];
        if (!step) return null;
        const StepIcon = step.icon;
        const isLast = tourStep === TOUR_STEPS.length - 1;
        const tooltipStyle = tourRect ? getTooltipPlacement(tourRect) : { position: "fixed" as const, bottom: 32, left: "50%", transform: "translateX(-50%)", width: 380 };
        return (
          <>
            {/* SVG mask — cuts a hole in the backdrop exactly over the spotlight target */}
            <svg style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 189, pointerEvents: "none" }}>
              <defs>
                <mask id="tour-spotlight-mask">
                  <rect width="100%" height="100%" fill="white" />
                  {tourRect && (
                    <rect
                      x={tourRect.left - 8} y={tourRect.top - 8}
                      width={tourRect.width + 16} height={tourRect.height + 16}
                      rx="16" fill="black"
                    />
                  )}
                </mask>
              </defs>
            </svg>

            {/* Blurred backdrop with spotlight cutout */}
            <div
              onClick={closeTour}
              style={{
                position: "fixed", inset: 0, zIndex: 190,
                backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
                background: "rgba(30,25,46,0.35)",
                maskImage: "url(#tour-spotlight-mask)",
                WebkitMaskImage: "url(#tour-spotlight-mask)",
              }}
            />

            {/* Highlight ring — pulsing border, transparent fill */}
            {tourRect && (
              <div style={{
                position: "fixed",
                top: tourRect.top - 5,
                left: tourRect.left - 5,
                width: tourRect.width + 10,
                height: tourRect.height + 10,
                borderRadius: 14,
                zIndex: 195,
                pointerEvents: "none",
                background: "transparent",
                border: `2px solid ${step.color}`,
                animation: "tour-ring-pulse 1.2s ease-in-out infinite",
                transition: "top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease",
              }} />
            )}

            {/* Tooltip card — smart-placed adjacent to the target */}
            <div style={{ ...tooltipStyle, zIndex: 202, maxWidth: "calc(100vw - 24px)" }}>
              <div className="bg-card rounded-2xl border border-border overflow-hidden"
                style={{ boxShadow: "0 16px 60px rgba(68,15,124,0.28), 0 4px 16px rgba(0,0,0,0.12)" }}>
                {/* Progress bar */}
                <div style={{ height: 3, background: "#f0e8f9" }}>
                  <div style={{ height: "100%", width: `${((tourStep + 1) / TOUR_STEPS.length) * 100}%`, background: `linear-gradient(90deg, ${C.purple}, ${C.magenta})`, transition: "width 0.35s ease" }} />
                </div>
                <div className="px-5 py-4">
                  {/* Header row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: step.bg }}>
                      <StepIcon size={16} style={{ color: step.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.tertiary300 }}>Step {tourStep + 1} of {TOUR_STEPS.length}</span>
                      <div className="text-[13px] font-bold mt-0.5" style={{ color: C.tertiary }}>{step.title}</div>
                    </div>
                    <button onClick={closeTour}
                      className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-xl hover:opacity-70 transition-opacity"
                      style={{ background: "var(--brand-tertiary100)" }} aria-label="Close tour">
                      <X size={13} style={{ color: C.tertiary }} />
                    </button>
                  </div>
                  {/* Body */}
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: C.tertiary }}>{step.body}</p>
                  {/* Location hint */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4" style={{ background: step.bg }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.color }} />
                    <span className="text-[11px] font-medium leading-tight" style={{ color: step.color }}>{step.label}</span>
                  </div>
                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {TOUR_STEPS.map((_, i) => (
                        <button key={i} onClick={() => setTourStep(i)}
                          style={{ width: i === tourStep ? 20 : 6, height: 6, borderRadius: 3, background: i === tourStep ? step.color : "var(--brand-tertiary200)", transition: "all 0.25s ease" }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {tourStep > 0 && (
                        <button onClick={prevTour}
                          className="text-[11px] font-medium px-3 py-1.5 rounded-xl border border-border transition-opacity hover:opacity-70"
                          style={{ background: "var(--card)", color: C.tertiary }}>
                          Back
                        </button>
                      )}
                      {!isLast ? (
                        <button onClick={nextTour}
                          className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-1.5 rounded-xl transition-opacity hover:opacity-90"
                          style={{ background: step.color, color: "white" }}>
                          Next <ArrowRight size={12} />
                        </button>
                      ) : (
                        <button onClick={completeTour}
                          className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-1.5 rounded-xl transition-opacity hover:opacity-90"
                          style={{ background: `linear-gradient(135deg, ${C.purple}, ${C.magenta})`, color: "white" }}>
                          {"Done — Let's Go! 🎉"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
      {activePanel === "lang" && (
        <div style={panelAt(252)}>
          <LanguageSelectorPanel selectedCode={selectedLang} onSelect={code => { setSelectedLang(code); close(); }} />
        </div>
      )}
      {activePanel === "notif" && (
        <div style={panelAt(384)}>
          <NotificationPanel markedAll={notifMarkedAll} onMarkAll={() => setNotifMarkedAll(true)} onClose={close} />
        </div>
      )}
      {activePanel === "help" && (
        <div style={panelAt(380)}>
          <HelpSupportPanel onClose={close} />
        </div>
      )}
      {activePanel === "profile" && (
        <div style={panelAt(272)}>
          <ProfileMenuPanel scenario={scenario} activeOrgId={activeOrgId} onClose={close} onLogout={onLogout} onSwitchOrg={onSwitchOrg} />
        </div>
      )}
    </header>
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeOrgId, setActiveOrgId] = useState<string>("mtn-001");
  const [authInitialStep, setAuthInitialStep] = useState<"login" | "org-select">("login");
  const [plan, setPlan] = useState<PlanId>("standard");
  const [scenario, setScenario] = useState<ScenarioId>(1);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [isDark, setIsDark] = useState<boolean>(() => {
    try { return localStorage.getItem("notch-theme") === "dark"; } catch { return false; }
  });
  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem("notch-theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  };

  // Tour always starts on every load; completeTour is session-only (no localStorage)
  const [tourStep, setTourStep] = useState<number | null>(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const completeTour = () => { setTourStep(null); setTourCompleted(true); };

  const isConstrained = viewMode !== "desktop";
  const frameWidth: Record<ViewMode, number | string> = { desktop: 1440, tablet: 768, mobile: 390 };

  const frameStyle: React.CSSProperties = {
    width: frameWidth[viewMode],
    background: C.bg,
    borderRadius: isConstrained ? 16 : 0,
    boxShadow: isConstrained ? "0 12px 60px rgba(0,0,0,0.25)" : "none",
    height: isConstrained ? "calc(100vh - 88px)" : "calc(100vh - 48px)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  };

  if (!isLoggedIn) {
    return (
      <>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
        <AuthFlow initialStep={authInitialStep} onComplete={(orgId) => { setActiveOrgId(orgId); setAuthInitialStep("login"); setIsLoggedIn(true); }} />
        <Toaster position="bottom-right" richColors closeButton />
      </>
    );
  }

  return (
    <div className={`flex flex-col${isDark ? " dark" : ""}`} style={{ height: "100vh", background: "var(--brand-outer-bg)", fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c7c0e0; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #9d8fc4; }
        * { scrollbar-width: thin; scrollbar-color: #c7c0e0 transparent; }
      `}</style>

      {/* ── Control Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0" style={{ background: C.tertiary900, borderBottom: `1px solid ${C.tertiary800}`, height: 48, gap: 12 }}>

        {/* Plan switcher */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
          {(["basic", "standard", "premium"] as PlanId[]).map(p => {
            const m = PLAN_META[p];
            const active = plan === p;
            return (
              <button key={p} onClick={() => setPlan(p)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap"
                style={{ background: active ? "rgba(255,255,255,0.12)" : "transparent", color: active ? "#fff" : "rgba(255,255,255,0.4)" }}>
                <span className="hidden sm:inline">{m.short}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: m.tagBg, color: m.tagFg }}>{m.short[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Center label */}
        <div className="hidden md:block text-[10px] font-bold tracking-widest uppercase text-center flex-1" style={{ color: "rgba(255,255,255,0.18)" }}>
          NotchHR · {PLAN_META[plan].label} · {SCENARIO_META[scenario].label}
        </div>

        {/* Scenario switcher */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
          {([1, 2, 3] as ScenarioId[]).map(s => {
            const m = SCENARIO_META[s];
            const active = scenario === s;
            return (
              <button key={s} onClick={() => setScenario(s)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all whitespace-nowrap"
                style={{ background: active ? "rgba(255,255,255,0.12)" : "transparent", color: active ? "#fff" : "rgba(255,255,255,0.4)" }}>
                <span className="text-[9px] font-bold" style={{ color: active ? C.magenta : "rgba(255,255,255,0.3)" }}>S{s}</span>
                <span className="hidden lg:inline">{m.label}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: m.tagBg, color: m.tagFg }}>{m.sub.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[{ id: "desktop" as ViewMode, icon: Monitor }, { id: "tablet" as ViewMode, icon: Tablet }, { id: "mobile" as ViewMode, icon: Smartphone }].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)}
              className="flex items-center justify-center w-8 h-7 rounded-md transition-all"
              style={{ background: viewMode === v.id ? "rgba(255,255,255,0.14)" : "transparent", color: viewMode === v.id ? "#fff" : "rgba(255,255,255,0.4)" }}>
              <v.icon size={14} />
            </button>
          ))}
        </div>

      </div>

      {/* ── Preview Frame ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex justify-center items-start overflow-hidden" style={{ padding: isConstrained ? "20px 20px 0" : "0" }}>
        <div style={{ ...frameStyle, position: "relative" }}>
          <DashboardHeader scenario={scenario} plan={plan} viewMode={viewMode} tourStep={tourStep} onTourStep={setTourStep} onTourComplete={completeTour} tourCompleted={tourCompleted} activeOrgId={activeOrgId} onLogout={() => { setAuthInitialStep("login"); setIsLoggedIn(false); setActiveOrgId("mtn-001"); }} onSwitchOrg={() => { setAuthInitialStep("org-select"); setIsLoggedIn(false); }} isDark={isDark} onToggleTheme={toggleTheme} />
          <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: C.bg }}>
            <Dashboard scenario={scenario} plan={plan} viewMode={viewMode} tourEditMode={false} />
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
