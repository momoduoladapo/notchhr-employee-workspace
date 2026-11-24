import type React from "react";
import type { PlanId, ScenarioId, OrgAccount, AnnouncementIcon, QA, ApprovalStatus, SalaryOnDemandRecord, TaxReliefRecord, NotifItem, PMenuItem, WsRecord } from "./tokens";
import { C, S } from "./tokens";
import {
  Bell, BookOpen, Calendar, Clock, FileText, DollarSign,
  AlertCircle, AlertTriangle,
  LayoutDashboard, Users, Briefcase, Award,
  User, Upload, Shield, Coffee, Laptop,
  Target, Star, GraduationCap, Heart, TrendingUp,
  Globe, HelpCircle, LogOut, Settings,
  Info, Sliders, MessageCircle,
  CheckSquare, Building2, BadgeCheck, Sparkles,
} from "lucide-react";

// ─── Module availability per plan ────────────────────────────────────────────
export const MODULES: Record<PlanId, Set<string>> = {
  basic: new Set(["employee","attendance","payroll","meetings","announcements","requisitions","approvals"]),
  standard: new Set(["employee","attendance","events","payroll","leave","announcements","grievance","confirmation","requisitions","exit","promotions","approvals","documents"]),
  premium: new Set(["employee","attendance","events","payroll","leave","announcements","grievance","confirmation","requisitions","exit","promotions","approvals","documents","performance","learning","elearning","talent","safety","enps","volunteering"]),
};
export const has = (plan: PlanId, mod: string) => MODULES[plan].has(mod);

// ─── Plan + Scenario meta ─────────────────────────────────────────────────────
export const PLAN_META: Record<PlanId, { label: string; short: string; tagBg: string; tagFg: string }> = {
  basic:    { label: "HR Basic + Payroll", short: "Basic",    tagBg: S.success50, tagFg: S.success },
  standard: { label: "HR Standard",        short: "Standard", tagBg: S.info50,    tagFg: S.info    },
  premium:  { label: "HR Premium",         short: "Premium",  tagBg: C.purple100, tagFg: C.purple  },
};
export const SCENARIO_META: Record<ScenarioId, { label: string; sub: string; tagBg: string; tagFg: string }> = {
  1: { label: "Active Employee",        sub: "Full data",    tagBg: S.success50, tagFg: S.success },
  2: { label: "Newly Onboarded",        sub: "No data",      tagBg: S.info50,    tagFg: S.info    },
  3: { label: "Onboarding In Progress", sub: "Partial data", tagBg: S.warning50, tagFg: S.warning },
};

// ─── App Launcher modules ─────────────────────────────────────────────────────
export const APP_MODULES: Array<{ id: string; label: string; icon: React.ElementType; module: string | null; iconBg: string; iconFg: string }> = [
  { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard, module: null,            iconBg: C.purple100,  iconFg: C.purpleIcon  },
  { id: "employees",     label: "Employees",     icon: Users,           module: "employee",      iconBg: C.purple100,  iconFg: C.purpleIcon  },
  { id: "attendance",    label: "Attendance",    icon: Clock,           module: "attendance",    iconBg: S.info50,     iconFg: S.info        },
  { id: "payroll",       label: "Employee Benefits", icon: DollarSign,      module: "payroll",       iconBg: S.success50,  iconFg: S.success     },
  { id: "meetings",      label: "Meetings",      icon: Coffee,          module: "meetings",      iconBg: C.tertiary100,iconFg: C.tertiary    },
  { id: "announcements", label: "Announcements", icon: Bell,            module: "announcements", iconBg: C.magenta100, iconFg: C.magentaIcon },
  { id: "approvals",     label: "Approvals",     icon: CheckSquare,     module: "approvals",     iconBg: S.warning50,  iconFg: S.warning     },
  { id: "requisitions",  label: "Requisitions",  icon: Briefcase,       module: "requisitions",  iconBg: C.tertiary100,iconFg: C.tertiary600 },
  { id: "leave",         label: "Leave",         icon: Calendar,        module: "leave",         iconBg: S.warning50,  iconFg: S.warning     },
  { id: "events",        label: "Events",        icon: Award,           module: "events",        iconBg: C.magenta100, iconFg: C.magentaIcon },
  { id: "documents",     label: "Documents",     icon: FileText,        module: "documents",     iconBg: C.purple100,  iconFg: C.purpleIcon  },
  { id: "kpi",           label: "KPI",           icon: Target,          module: "kpi",           iconBg: C.purple100,  iconFg: C.purpleIcon  },
  { id: "grievance",     label: "Grievance",     icon: AlertTriangle,   module: "grievance",     iconBg: S.error50,    iconFg: S.error       },
  { id: "performance",   label: "Performance",   icon: TrendingUp,      module: "performance",   iconBg: C.magenta100, iconFg: C.magentaIcon },
  { id: "learning",      label: "Learning",      icon: GraduationCap,   module: "learning",      iconBg: S.success50,  iconFg: S.success     },
  { id: "enps",          label: "eNPS",          icon: Star,            module: "enps",          iconBg: S.warning50,  iconFg: S.warning     },
  { id: "safety",        label: "Safety",        icon: Shield,          module: "safety",        iconBg: S.error50,    iconFg: S.error       },
  { id: "volunteering",  label: "Volunteering",  icon: Heart,           module: "volunteering",  iconBg: C.magenta100, iconFg: C.magentaIcon },
  { id: "settings",      label: "Settings",      icon: Settings,        module: "settings",      iconBg: C.tertiary100,iconFg: C.tertiary    },
];

// ─── Photos ───────────────────────────────────────────────────────────────────
const BASE = "?w=500&h=500&fit=crop&crop=faces&q=95&fm=jpg&auto=format";
export const PHOTOS: Record<string, string> = {
  "Shola Adeleke":  `https://images.unsplash.com/photo-1709810529099-0ce6102692df${BASE}`,
  "Amaka Eze":      `https://images.unsplash.com/photo-1563132337-f159f484226c${BASE}`,
  "Grace Okafor":   `https://images.unsplash.com/photo-1620252746149-97c3ba2904b6${BASE}`,
  "Natalie Cooper": `https://images.unsplash.com/photo-1554727242-741c14fa561c${BASE}`,
  "Sarah Mensah":   `https://images.unsplash.com/photo-1645736353780-e70a7d508088${BASE}`,
  "John Adewale":   `https://images.unsplash.com/photo-1630952588297-422becd8056f${BASE}`,
  "James Obi":      `https://images.unsplash.com/photo-1683595350111-51fde6bdbcff${BASE}`,
  "Emeka Peters":   `https://images.unsplash.com/photo-1630952588491-d740c3b8ffb3${BASE}`,
  "Daniel Eze":     `https://images.unsplash.com/photo-1630952588467-3e7bb7b2b00d${BASE}`,
};

// ─── Scenario data ────────────────────────────────────────────────────────────
export const EMPLOYEE = {
  1: { name: "Shola Adeleke", role: "Product Designer", dept: "Design", id: "#1042",   joined: "Jan 10, 2023", tenure: "3 Years",  supervisor: "Amaka Eze", gender: "female" as const },
  2: { name: "Shola Adeleke", role: "Product Designer", dept: "Design", id: "Pending", joined: "Jul 15, 2025", tenure: "2 days",   supervisor: "Amaka Eze", gender: "female" as const },
  3: { name: "Shola Adeleke", role: "Product Designer", dept: "Design", id: "#1042",   joined: "Jul 3, 2025",  tenure: "2 weeks",  supervisor: "Amaka Eze", gender: "female" as const },
};

// Attendance employee per scenario. Only "ws-active" has a work schedule (see prod/mock/data.ts).
export const ATTENDANCE_EMPLOYEE_ID: Record<ScenarioId, string> = { 1: "ws-active", 2: "ws-onboarded", 3: "ws-onboarding" };

// ─── Organisation accounts (data-driven; replace with API response in production) ──
export const ORG_ACCOUNTS: OrgAccount[] = [
  {
    id: "mtn-001",
    name: "MTN Nigeria",
    country: "Nigeria",
    industry: "Telecommunications",
    role: "Product Designer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/MTN_Logo.svg",
    avatarBg: "#FFCC00",
    avatarFg: "#1a1a1a",
    initials: "MTN",
  },
  {
    id: "dangote-002",
    name: "Dangote Industries",
    country: "Nigeria",
    industry: "Manufacturing / Conglomerate",
    role: "UX Designer",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0b/Dangote_Group_Logo.svg",
    avatarBg: "#C8102E",
    avatarFg: "#ffffff",
    initials: "DI",
  },
  {
    id: "flutterwave-003",
    name: "Flutterwave",
    country: "Nigeria",
    industry: "Fintech",
    role: "Lead Product Designer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flutterwave_Logo.png",
    avatarBg: "#E8792B",
    avatarFg: "#ffffff",
    initials: "FW",
  },
  {
    id: "gtco-004",
    name: "GTCO",
    country: "Nigeria",
    industry: "Banking / Financial Services",
    role: "Design Systems Lead",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/GTCO_logo.svg",
    avatarBg: "#F7941D",
    avatarFg: "#ffffff",
    initials: "GT",
  },
  {
    id: "jumia-005",
    name: "Jumia",
    country: "Nigeria",
    industry: "E-commerce / Technology",
    role: "Product Designer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Jumia_Group-Logo.png",
    avatarBg: "#FF6C00",
    avatarFg: "#ffffff",
    initials: "JM",
  },
  {
    id: "safaricom-006",
    name: "Safaricom",
    country: "Kenya",
    industry: "Telecommunications / Fintech",
    role: "Senior UX Designer",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Safaricom_logo.svg",
    avatarBg: "#4CAF50",
    avatarFg: "#ffffff",
    initials: "SC",
  },
  {
    id: "ecobank-007",
    name: "Ecobank",
    country: "Togo / Pan-African",
    industry: "Banking",
    role: "Product Consultant",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Ecobank_Logo.svg",
    avatarBg: "#003087",
    avatarFg: "#ffffff",
    initials: "EB",
  },
  {
    id: "ethiopian-008",
    name: "Ethiopian Airlines",
    country: "Ethiopia",
    industry: "Aviation",
    role: "UX Designer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Ethiopian_Airlines_Logo.svg",
    avatarBg: "#007A3D",
    avatarFg: "#FCCC02",
    initials: "ET",
  },
  {
    id: "shoprite-009",
    name: "Shoprite",
    country: "South Africa",
    industry: "Retail",
    role: "Product Designer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Logo_-_Shoprite_-_SUPERMARCE.jpg",
    avatarBg: "#E31837",
    avatarFg: "#ffffff",
    initials: "SR",
  },
  {
    id: "leadway-010",
    name: "Leadway Assurance",
    country: "Nigeria",
    industry: "Insurance",
    role: "Product Designer",
    logo: "https://www.leadway.com/wp-content/uploads/2025/03/leadway_logo.webp",
    avatarBg: "#00529B",
    avatarFg: "#ffffff",
    initials: "LW",
  },
];

export const ANNOUNCEMENTS: Record<ScenarioId, Array<{ title: string; date: string; icon: AnnouncementIcon; iconBg: string; iconFg: string }>> = {
  1: [
    { title: "New HR Manager Joins the Team",          date: "June 19, 2025", icon: "Users",         iconBg: C.purple100,  iconFg: C.purpleIcon  },
    { title: "Office Policy Update for All Employees", date: "June 18, 2025", icon: "FileText",      iconBg: S.info50,     iconFg: S.info    },
    { title: "Q&A Session on Workplace Policy",        date: "June 15, 2025", icon: "MessageCircle", iconBg: C.magenta100, iconFg: C.magentaIcon },
    { title: "Staff Welfare Initiative Launched",      date: "June 12, 2025", icon: "Heart",         iconBg: S.success50,  iconFg: S.success },
    { title: "Annual Company Retreat — Save the Date", date: "June 10, 2025", icon: "Award",         iconBg: C.magenta100, iconFg: C.magentaIcon },
    { title: "Health & Wellness Week — Aug 18 to 22",  date: "Aug 8, 2025",   icon: "Heart",         iconBg: S.success50,  iconFg: S.success },
  ],
  2: [
    { title: `Welcome, ${EMPLOYEE[2].name} — ${EMPLOYEE[2].role}!`, date: "July 15, 2025", icon: "Star",          iconBg: C.magenta100, iconFg: C.magentaIcon },
    { title: "Your onboarding schedule is ready",                    date: "July 15, 2025", icon: "Calendar",      iconBg: C.purple100,  iconFg: C.purpleIcon  },
    { title: "Meet your buddy: Jide Alabi",                          date: "July 15, 2025", icon: "Users",         iconBg: S.success50,  iconFg: S.success },
    { title: "Office Policy Update for All Employees",               date: "June 18, 2025", icon: "FileText",      iconBg: S.info50,     iconFg: S.info    },
    { title: "New Employee Town Hall — July 25, 10 AM",              date: "July 16, 2025", icon: "Bell",          iconBg: C.purple100,  iconFg: C.purpleIcon  },
    { title: "Health & Wellness Week — Aug 18 to 22",               date: "Aug 8, 2025",   icon: "Heart",         iconBg: S.success50,  iconFg: S.success },
  ],
  3: [],
};
export const ANNOUNCEMENT_ICON_MAP: Record<AnnouncementIcon, React.ElementType> = {
  Users: Users, FileText: FileText, MessageCircle: MessageCircle, Heart: Heart,
  Star: Star, Bell: Bell, Calendar: Calendar, Laptop: Laptop,
  Briefcase: Briefcase, Award: Award, Info: Info, CheckSquare: CheckSquare,
};

export const EVENTS: Record<ScenarioId, Array<{ title: string; project: string; time: string; avatarColors: string[] }>> = {
  1: [
    { title: "Team Kickoff",          project: "Product",   time: "1 hr",   avatarColors: [C.purple, C.magenta, "#f97316"] },
    { title: "Marketing Meeting",     project: "Marketing", time: "2 hrs",  avatarColors: ["#22c55e", C.purple, "#f97316"] },
    { title: "Design Workshop",       project: "Design",    time: "3 hrs",  avatarColors: [C.magenta, C.purple] },
    { title: "Sprint Retrospective",  project: "Product",   time: "1.5 hrs",avatarColors: [C.purple, "#22c55e", C.magenta] },
    { title: "Stakeholder Review",    project: "Strategy",  time: "1 hr",   avatarColors: [C.tertiary, C.purple] },
  ],
  2: [
    { title: "New Employee Orientation",   project: "HR",     time: "2 hrs",  avatarColors: [C.purple, C.magenta] },
    { title: "Buddy Introduction Meeting", project: "Design", time: "30 min", avatarColors: [C.purple] },
    { title: "IT Setup Session",           project: "IT",     time: "1 hr",   avatarColors: [C.tertiary] },
    { title: "HR Welcome Call",            project: "HR",     time: "30 min", avatarColors: [C.magenta, C.purple] },
    { title: "Benefits Walkthrough",       project: "HR",     time: "45 min", avatarColors: [C.purple] },
  ],
  3: [],
};

export const PENDING_TASKS: Record<ScenarioId, Array<{ label: string; tag: "High" | "Medium" | "Low" }> | null> = {
  1: [
    { label: "Complete Annual Self-Assessment", tag: "High" },
    { label: "Acknowledge New Policy",          tag: "Medium" },
    { label: "Update Training Record",          tag: "Low" },
  ],
  2: null,
  3: [
    { label: "Sign Employee Handbook",          tag: "High" },
    { label: "Complete IT Security Training",   tag: "High" },
    { label: "Submit Bank Details for Payroll", tag: "Medium" },
  ],
};

export type QAType = { label: string; icon: React.ElementType; hint: string; toast: string };

// Full action catalogs per plan — shown in the Quick Actions editor
export const QA_CATALOG_BASIC: QA[] = [
  { label: "Chat",                    icon: MessageCircle, hint: "Chats › Team Messaging",                          toast: "Opening Chats…"                         },
  { label: "View Attendance Record",  icon: Clock,         hint: "Attendance › My Records › Monthly View",          toast: "Opening attendance records…"            },
  { label: "Make a Requisition",      icon: Briefcase,     hint: "Requisitions › New Request › Select Category",    toast: "Opening requisition form…"              },
  { label: "Update Profile",          icon: User,          hint: "Profile › Personal Info › Edit Profile",          toast: "Opening profile editor…"                },
  { label: "Update Bank Details",     icon: DollarSign,    hint: "Profile › Finance › Bank Account › Edit",         toast: "Opening bank details form…"             },
  { label: "Update Emergency Contact",icon: Users,         hint: "Profile › Personal Info › Emergency Contact",     toast: "Opening emergency contact form…"        },
  { label: "Update Next-of-Kin",      icon: Heart,         hint: "Profile › Personal Info › Next of Kin",           toast: "Opening next-of-kin form…"              },
];

export const QA_CATALOG_STANDARD: QA[] = [
  ...QA_CATALOG_BASIC,
  { label: "Submit Grievance",         icon: AlertTriangle, hint: "Grievance & Disciplinary › New Case › File",     toast: "Opening grievance form…"                },
  { label: "Request Salary Confirmation",icon: FileText,    hint: "HR › Confirmation › Salary Letter",              toast: "Opening salary confirmation form…"      },
  { label: "Upload Document",          icon: Upload,        hint: "Documents › Upload › Select Category",           toast: "Opening document upload…"               },
  { label: "View Exit Checklist",      icon: CheckSquare,   hint: "Exit Management › My Checklist › View",          toast: "Opening exit checklist…"                },
];

export const QA_CATALOG_PREMIUM: QA[] = [
  ...QA_CATALOG_STANDARD,
  { label: "Submit Self-Assessment",   icon: TrendingUp,    hint: "Performance › Self-Assessment › Current Period", toast: "Opening self-assessment…"               },
  { label: "Update KPI Score",         icon: Target,        hint: "Performance › My KPIs › Update Progress",        toast: "Opening KPI update…"                    },
  { label: "Request Work-from-Home",   icon: Laptop,        hint: "Attendance › Work Mode › WFH Request",           toast: "Opening WFH request form…"              },
  { label: "Submit Overtime",          icon: Clock,         hint: "Attendance › Overtime › New Request",            toast: "Opening overtime request…"              },
  { label: "Log Safety Incident",      icon: AlertCircle,   hint: "Safety › Incidents › Report New",                toast: "Opening safety incident report…"        },
  { label: "Request Training",         icon: GraduationCap, hint: "L&D › Training Requests › Submit New",           toast: "Opening training request form…"         },
];

const QA_BASE: QA[] = [
  { label: "Chat with a Team Member", icon: MessageCircle, hint: "Chats › Team Messaging",                        toast: "Opening Chats…"                        },
  { label: "View Attendance",         icon: Clock,         hint: "Attendance › My Records › Monthly View",        toast: "Opening attendance records…"           },
  { label: "Create a Requisition",    icon: Briefcase,     hint: "Requisitions › New Request › Select Category",  toast: "Opening requisition form…"             },
  { label: "Update My Profile",       icon: User,          hint: "Profile › Personal Info › Edit Profile",        toast: "Opening profile editor…"               },
];

export const QA_BASIC: QA[] = [...QA_BASE];

export const QA_STANDARD: QA[] = [
  ...QA_BASE,
  { label: "Upload Document",         icon: Upload,        hint: "Documents › Upload › Select Category",          toast: "Opening document upload…"              },
  { label: "Request Leave",           icon: Calendar,      hint: "Leave › Apply › Select Leave Type",             toast: "Opening leave request form…"           },
];

const QA_PREMIUM_ITEMS: QA[] = [
  ...QA_BASE,
  { label: "Create a Goal",           icon: Target,        hint: "Performance › My Goals › Add New Goal",         toast: "Opening goal creation form…"           },
  { label: "Take a Course",           icon: BookOpen,      hint: "E-Learning › Course Catalogue › Browse",        toast: "Opening course catalogue…"             },
  { label: "Apply for Training",      icon: GraduationCap, hint: "L&D › Training Requests › Submit New",          toast: "Opening training request form…"        },
];
export const QA_PREMIUM: Record<ScenarioId, QA[]> = { 1: QA_PREMIUM_ITEMS, 2: QA_PREMIUM_ITEMS, 3: QA_PREMIUM_ITEMS };

export const APPROVALS: Record<ScenarioId, Array<{ label: string; requester: string; type: string; status: ApprovalStatus }>> = {
  1: [
    { label: "Annual Request",       requester: "James Obi",      type: "Leave",   status: "pending" },
    { label: "Travel Expense Claim", requester: "Natalie Cooper", type: "Expense", status: "pending" },
    { label: "Remote Work Request",  requester: "Emeka Peters",   type: "Policy",  status: "pending" },
    { label: "Overtime Approval",    requester: "Sarah Mensah",   type: "Leave",   status: "pending" },
  ],
  2: [],
  3: [],
};

export const APPROVALS_STANDARD: Record<ScenarioId, Array<{ label: string; requester: string; type: string; status: ApprovalStatus }>> = {
  1: [
    { label: "Annual Request",        requester: "James Obi",      type: "Leave",   status: "pending" },
    { label: "Travel Expense Claim",  requester: "Natalie Cooper", type: "Expense", status: "pending" },
    { label: "Remote Work Request",   requester: "Sarah Mensah",   type: "Policy",  status: "pending" },
    { label: "Training Budget Claim", requester: "Daniel Eze",     type: "Expense", status: "pending" },
  ],
  2: [],
  3: [],
};

// HR Basic + Payroll only shows Leave Request approvals — no expense/policy/compliance categories
export const APPROVALS_BASIC: Record<ScenarioId, Array<{ label: string; requester: string; type: string; status: ApprovalStatus }>> = {
  1: [
    { label: "Annual Request",       requester: "James Obi",      type: "Leave", status: "pending" },
    { label: "Sick Request",         requester: "Grace Okafor",   type: "Leave", status: "pending" },
    { label: "Casual Request",       requester: "Natalie Cooper", type: "Leave", status: "pending" },
    { label: "Maternity Form",       requester: "Sarah Mensah",   type: "Leave", status: "pending" },
    { label: "Compassionate Request",requester: "Emeka Peters",   type: "Leave", status: "pending" },
  ],
  2: [],
  3: [],
};

export const TEAM: Record<ScenarioId, { manager: { name: string; role: string }; buddy?: { name: string; role: string }; members: Array<{ name: string; role: string; color: string }> }> = {
  1: {
    manager: { name: "Amaka Eze", role: "Engineering Manager · Design" },
    members: [
      { name: EMPLOYEE[1].name, role: EMPLOYEE[1].role,   color: C.magenta  },
      { name: "James Obi",      role: "Backend Engineer", color: "#f97316"  },
      { name: "Natalie Cooper", role: "UI Designer",      color: "#22c55e"  },
      { name: "Sarah Mensah",   role: "Product Manager",  color: S.info     },
      { name: "Emeka Peters",   role: "HR Analyst",       color: "#f97316"  },
      { name: "Daniel Eze",     role: "Data Analyst",     color: C.purple   },
    ],
  },
  2: {
    manager: { name: "Amaka Eze", role: "Engineering Manager · Design" },
    buddy:   { name: "Jide Alabi", role: "Senior Product Designer" },
    members: [],
  },
  3: {
    manager: { name: "Amaka Eze", role: "Engineering Manager · Design" },
    members: [],
  },
};

export const ON_LEAVE = [
  { name: "John Adewale",   role: "Product Designer",  dept: "Design",      cadre: "Mid-level", from: "Jun 18", to: "Jun 25", color: C.purple   },
  { name: "Grace Okafor",   role: "Frontend Engineer", dept: "Engineering", cadre: "Senior",    from: "Jun 20", to: "Jun 27", color: C.magenta  },
  { name: "Emeka Peters",   role: "HR Analyst",        dept: "HR",          cadre: "Junior",    from: "Jun 22", to: "Jun 24", color: "#f97316"  },
  { name: "Tunde Balogun",  role: "DevOps Engineer",   dept: "Engineering", cadre: "Mid-level", from: "Jun 24", to: "Jul 4",  color: "#22c55e"  },
  { name: "Chisom Nwosu",   role: "UX Researcher",     dept: "Design",      cadre: "Senior",    from: "Jun 25", to: "Jul 2",  color: S.info     },
];

export const LEAVE_REQUESTS: Record<ScenarioId, Array<{
  type: string; start: string; end: string; status: "pending" | "approved" | "rejected";
}>> = {
  1: [
    { type: "Annual Leave",  start: "2026-08-26", end: "2026-08-28", status: "approved" },
    { type: "Sick Leave",    start: "2026-08-20", end: "2026-08-25", status: "approved" },
    { type: "Annual Leave",  start: "2026-09-02", end: "2026-09-10", status: "pending"  },
  ],
  2: [
    { type: "Annual Leave",      start: "2026-08-20", end: "2026-08-22", status: "pending"  },
  ],
  3: [],
};

export const DIRECTORY = [
  { name: "Natalie Cooper", role: "UI Designer",      dept: "Design",      color: C.purple   },
  { name: "James Obi",      role: "Backend Engineer", dept: "Engineering", color: C.magenta  },
  { name: "Sarah Mensah",   role: "Product Manager",  dept: "Product",     color: "#22c55e"  },
  { name: "Emeka Peters",   role: "HR Analyst",       dept: "HR",          color: "#f97316"  },
  { name: "Daniel Eze",     role: "Data Analyst",     dept: "Analytics",   color: C.tertiary },
];

export const HOLIDAYS = [
  { name: "Democracy Day",      date: "Jun 12",    type: "Public"  },
  { name: "Eid el-Kabir",      date: "Jun 28–29", type: "Public"  },
  { name: "Independence Day",   date: "Oct 1",     type: "Public"  },
  { name: "Christmas Day",      date: "Dec 25",    type: "Public"  },
  { name: "New Year's Day",     date: "Jan 1",     type: "Public"  },
];
export const ANNIVERSARIES = [
  { name: "Emeka Peters",   role: "HR Analyst",        years: 3, color: "#f97316"  },
  { name: "Grace Okafor",   role: "Frontend Engineer", years: 5, color: C.magenta  },
  { name: "Daniel Eze",     role: "Data Analyst",      years: 2, color: S.info     },
  { name: "Tunde Balogun",  role: "DevOps Engineer",   years: 1, color: "#22c55e"  },
  { name: "Natalie Cooper", role: "UI Designer",       years: 4, color: C.purple   },
];
export const BIRTHDAYS = [
  { name: "Amaka Eze",     role: "Engineering Manager", date: "Jul 18", color: C.purple  },
  { name: "Daniel Eze",    role: "Data Analyst",        date: "Jul 22", color: S.info    },
  { name: "Sarah Mensah",  role: "Product Manager",     date: "Aug 3",  color: C.magenta },
  { name: "James Obi",     role: "Backend Engineer",    date: "Aug 14", color: "#f97316" },
  { name: "Chisom Nwosu",  role: "UX Researcher",       date: "Sep 2",  color: "#22c55e" },
];

// ─── Extended module data ─────────────────────────────────────────────────────
export const KPI_DATA: Record<ScenarioId, Array<{ label: string; value: string; delta: string; good: boolean | null }> | null> = {
  1: [
    { label: "Task Completion",   value: "87%", delta: "+5%",       good: true  },
    { label: "Attendance Rate",   value: "94%", delta: "+2%",       good: true  },
    { label: "Projects On Track", value: "3/4", delta: "-1 stalled", good: false },
  ],
  2: null,
  3: null,
};

export const DOCS_DATA: Record<ScenarioId, Array<{ name: string; date: string; type: string; status: "approved" | "pending" }> | null> = {
  1: [
    { name: "Employment Contract", date: "Jan 10, 2023", type: "Contract", status: "approved" },
    { name: "NDA Agreement",       date: "Jan 10, 2023", type: "Legal",    status: "approved" },
    { name: "Q1 Appraisal Form",   date: "Mar 15, 2025", type: "HR",       status: "pending"  },
    { name: "Remote Work Policy",  date: "Jun 5, 2025",  type: "Policy",   status: "pending"  },
  ],
  2: [
    { name: "Employment Contract", date: "Jun 1, 2025",  type: "Contract", status: "pending"  },
    { name: "NDA Agreement",       date: "Jun 1, 2025",  type: "Legal",    status: "pending"  },
    { name: "Employee Handbook",   date: "Jun 1, 2025",  type: "Policy",   status: "pending"  },
    { name: "Benefits Enrolment",  date: "Jun 2, 2025",  type: "HR",       status: "pending"  },
  ],
  3: null,
};

export const PERF_DATA: Record<ScenarioId, {
  stage: string;
  reviewDue: string; timeLeft: string;
  goalProgress: number;
  status: string; statusGood: boolean;
  rating: string;
  managerFeedback: boolean;
  goals: Array<{ label: string; pct: number; color: string }>;
} | null> = {
  1: {
    stage: "Pending Line Manager Review",
    reviewDue: "15 Aug 2026",
    timeLeft: "3 days left",
    goalProgress: 78,
    status: "On Track",
    statusGood: true,
    rating: "Excellent",
    managerFeedback: true,
    goals: [
      { label: "Q2 Design Sprint",   pct: 78, color: C.purple  },
      { label: "Mentorship Program", pct: 60, color: C.magenta },
      { label: "Skills Assessment",  pct: 40, color: "#f97316" },
    ],
  },
  2: null,
  3: null,
};

export const LEARNING_DATA: Record<ScenarioId, {
  courses: Array<{ title: string; progress: number; status: string; mandatory: boolean; dueThisWeek: boolean }>;
  certificates: number;
  recommended: Array<{ title: string; duration: string }>;
} | null> = {
  1: {
    courses: [
      { title: "Leadership Essentials",   progress: 80,  status: "In Progress", mandatory: false, dueThisWeek: true  },
      { title: "Data Privacy Compliance", progress: 100, status: "Completed",   mandatory: true,  dueThisWeek: false },
      { title: "Design Systems Mastery",  progress: 45,  status: "In Progress", mandatory: false, dueThisWeek: false },
    ],
    certificates: 1,
    recommended: [
      { title: "Advanced Communication Skills", duration: "2h" },
      { title: "Project Management Basics",     duration: "3h" },
    ],
  },
  2: null,
  3: null,
};

export const ENPS_DATA: Record<ScenarioId, { score: number; category: string; trend: string } | null> = {
  1: { score: 72, category: "Promoter", trend: "+8 vs last quarter" },
  2: null,
  3: null,
};

export const ANNOUNCEMENT_UNREAD: Record<ScenarioId, number> = { 1: 2, 2: 4, 3: 2 };

export const SALARY_DEMAND_DATA: Record<ScenarioId, SalaryOnDemandRecord | null> = {
  1: {
    grossSalary: 500_000,
    earnedToDate: 300_000,
    withdrawn: 100_000,
    payDate: "31 Aug 2025",
    cycleStart: "1 Aug",
    cycleEnd: "31 Aug",
  },
  2: null,
  3: null,
};
export const TAX_RELIEF_DATA: Record<ScenarioId, TaxReliefRecord | null> = {
  1: {
    status: "Active",
    annualRent: "₦1,800,000",
    covered: "₦360,000",
    coveredPct: 20,
    disbursed: "₦360,000",
    remaining: "",
    cycle: "Jan – Dec 2026",
  },
  2: null,
  3: null,
};

export const MEMBER_ONLINE = new Set(["Natalie Cooper", "Sarah Mensah"]);
export const MEMBER_BIRTHDAY_TODAY = new Set(["Daniel Eze"]);
export const MEMBER_ON_LEAVE = new Set(["John Adewale", "Grace Okafor", "Emeka Peters"]);
export const SUBORDINATES: Record<ScenarioId, Set<string>> = {
  1: new Set(["James Obi", "Natalie Cooper"]),
  2: new Set(),
  3: new Set(),
};

// ─── New card data ────────────────────────────────────────────────────────────
export const ABOUT_ME_DEFAULTS: Record<ScenarioId, { summary: string; facebook: string; linkedin: string }> = {
  1: {
    summary: "Product Designer with over 3 years of experience at NotchHR. Passionate about design systems, accessibility, and crafting meaningful user experiences. Background in both fintech and enterprise software.",
    facebook: "https://facebook.com/shola.adeleke",
    linkedin: "https://linkedin.com/in/shola-adeleke",
  },
  2: { summary: "", facebook: "", linkedin: "" },
  3: { summary: "", facebook: "", linkedin: "" },
};

export const COMPETENCY_DATA: Record<ScenarioId, Array<{ name: string; empScore: string; roleScore: string; pass: boolean }> | null> = {
  1: [
    { name: "Quality Check",          empScore: "2/5", roleScore: "0/5", pass: false },
    { name: "Business Development",   empScore: "2/5", roleScore: "0/5", pass: false },
    { name: "Emotional Intelligence", empScore: "1/5", roleScore: "0/5", pass: false },
    { name: "Computation",            empScore: "2/5", roleScore: "0/5", pass: false },
    { name: "Arithmetic",             empScore: "2/5", roleScore: "0/5", pass: false },
  ],
  2: null,
  3: null,
};

export const WORK_HISTORY_DATA: Record<ScenarioId, Array<{ org: string; role: string; from: string; to: string; type: string; details?: string }> | null> = {
  1: [
    { org: "NotchHR",              role: "Product Designer",  from: "Jan 2023", to: "Present",  type: "Full-time", details: "Led design system overhaul and employee workspace redesign." },
    { org: "FinEdge Technologies", role: "UX Designer",       from: "Jun 2020", to: "Dec 2022", type: "Full-time", details: "Designed mobile banking app serving 500,000+ users." },
    { org: "Freelance",            role: "UI/UX Consultant",  from: "Jan 2020", to: "May 2020", type: "Contract"  },
  ],
  2: null,
  3: null,
};

export const ACADEMIC_HIST: Record<ScenarioId, {
  academic: Array<{ institution: string; qualification: string; field: string; from: string; to: string }> | null;
  professional: Array<{ name: string; org: string; issued: string; expires?: string }> | null;
}> = {
  1: {
    academic: [
      { institution: "University of Lagos", qualification: "B.Sc. Computer Science", field: "Computer Science", from: "2016", to: "2020" },
    ],
    professional: [
      { name: "Certified UX Professional (CXP)", org: "UXPA International",  issued: "Aug 2022", expires: "Aug 2025" },
      { name: "Google UX Design Certificate",    org: "Google / Coursera",   issued: "Mar 2021" },
    ],
  },
  2: { academic: null, professional: null },
  3: { academic: null, professional: null },
};

export const PENSION_DATA: Record<ScenarioId, Array<{ period: string; employer: string; contribution: string; status: string }> | null> = {
  1: [
    { period: "Jan 2023 – Present",  employer: "NotchHR",              contribution: "₦42,000 / mo", status: "Active"   },
    { period: "Jun 2020 – Dec 2022", employer: "FinEdge Technologies", contribution: "₦28,000 / mo", status: "Deferred" },
  ],
  2: null,
  3: null,
};

export const TAX_DATA: Record<ScenarioId, Array<{ year: string; income: string; tax: string; status: string }> | null> = {
  1: [
    { year: "2024", income: "₦9,600,000", tax: "₦960,000", status: "Filed" },
    { year: "2023", income: "₦8,400,000", tax: "₦840,000", status: "Filed" },
  ],
  2: null,
  3: null,
};

export const EMPLOYMENT_DETAILS_DATA: Record<ScenarioId, { cadre: string | null; cadreStep: string | null; contractType: string; grade: string | null; location: string }> = {
  1: { cadre: "Professional", cadreStep: "Step 3", contractType: "Permanent",    grade: "Grade 5", location: "Lagos, Nigeria" },
  2: { cadre: null,           cadreStep: null,      contractType: "Permanent",    grade: null,      location: "Lagos, Nigeria" },
  3: { cadre: "Professional", cadreStep: "Step 1",  contractType: "Probationary", grade: "Grade 5", location: "Lagos, Nigeria" },
};

export const MODULE_CATALOG: Array<{ id: string; label: string; description: string; iconBg: string; iconFg: string }> = [
  { id: "about-me",              label: "About Me",                          description: "Professional summary and social profiles.",          iconBg: C.purple100,   iconFg: C.purpleIcon },
  { id: "competency",            label: "My Competency",                     description: "Recorded competencies and proficiency levels.",       iconBg: C.magenta100,  iconFg: C.magentaIcon },
  { id: "work-history",          label: "My Work History",                   description: "Employment history and previous roles.",              iconBg: C.tertiary100, iconFg: C.tertiary   },
  { id: "academic-professional", label: "Academic & Professional History",   description: "Qualifications, certifications, and education.",      iconBg: S.success50,   iconFg: S.success    },
  { id: "employment-details",    label: "Employment Details",                description: "Current cadre, grade, contract type and step.",       iconBg: C.purple100,   iconFg: C.purpleIcon },
];

export const ADDABLE_CARD_IDS = new Set(MODULE_CATALOG.map(m => m.id));

// ─── Global Search ────────────────────────────────────────────────────────────
export const RECENT_SEARCHES = ["Shola Adeleke", "Annual Leave Policy", "July Payslip", "Performance Review"];
export const SEARCH_DATA = {
  employees: [
    { name: "John Adewale",   role: "Product Designer",  dept: "Design",      color: C.purple  },
    { name: "Sarah Mensah",   role: "Product Manager",   dept: "Product",     color: C.magenta },
    { name: "James Obi",      role: "Backend Engineer",  dept: "Engineering", color: "#f97316" },
  ],
  documents: [
    { name: "Employee Handbook", type: "Policy",  date: "Jan 2025" },
    { name: "Leave Policy",      type: "Policy",  date: "Mar 2025" },
    { name: "July Payslip",      type: "Payslip", date: "Jul 2025" },
  ],
  modules: [
    { name: "Payroll",      icon: DollarSign   },
    { name: "Performance",  icon: TrendingUp   },
    { name: "Learning",     icon: GraduationCap },
  ],
  quickActions: [
    { label: "Apply for Leave",   icon: Calendar   },
    { label: "Download Payslip",  icon: DollarSign },
    { label: "Clock In",          icon: Clock      },
    { label: "Submit Expense",    icon: FileText   },
  ],
};

// ─── Language Selector ────────────────────────────────────────────────────────
export const LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English", native: "English" },
  { code: "fr", flag: "🇫🇷", label: "French",  native: "Français" },
];

// ─── Notification Center ──────────────────────────────────────────────────────
export const NOTIFS: NotifItem[] = [
  { id:1,  group:"Today",     icon:Calendar,     iconBg:S.success50,  iconFg:S.success,  title:"Leave Approved",             desc:"Your annual leave Jun 25–27 has been approved by HR.",      time:"2m ago",    read:false, badge:"Approved", badgeBg:S.success50, badgeFg:S.success  },
  { id:2,  group:"Today",     icon:Bell,         iconBg:C.magenta100, iconFg:C.magentaIcon,  title:"New Announcement",           desc:"Staff Welfare Initiative has been launched. Read the update.",time:"1h ago",    read:false, badge:null,       badgeBg:"",          badgeFg:""         },
  { id:3,  group:"Today",     icon:TrendingUp,   iconBg:C.purple100,  iconFg:C.purpleIcon, title:"Performance Review Due",     desc:"Your Q2 performance review is due by June 30, 2025.",       time:"3h ago",    read:false, badge:"Action",   badgeBg:S.warning50, badgeFg:S.warning  },
  { id:4,  group:"Yesterday", icon:Target,       iconBg:C.purple100,  iconFg:C.purpleIcon, title:"Goal Assigned",              desc:"'Q2 Design Sprint' has been assigned to you by Amaka Eze.",  time:"Yesterday", read:true,  badge:null,       badgeBg:"",          badgeFg:""         },
  { id:5,  group:"Yesterday", icon:DollarSign,   iconBg:S.success50,  iconFg:S.success,  title:"Payslip Available",          desc:"Your June 2025 payslip is now ready to view.",               time:"Yesterday", read:true,  badge:"New",      badgeBg:S.info50,    badgeFg:S.info     },
  { id:6,  group:"Yesterday", icon:Coffee,       iconBg:S.info50,     iconFg:S.info,     title:"Meeting Reminder",           desc:"Design Workshop starts in 30 minutes.",                       time:"Yesterday", read:true,  badge:null,       badgeBg:"",          badgeFg:""         },
  { id:7,  group:"Earlier",   icon:GraduationCap,iconBg:S.success50,  iconFg:S.success,  title:"Training Assigned",          desc:"'Leadership Essentials' course has been assigned to you.",    time:"3d ago",    read:true,  badge:null,       badgeBg:"",          badgeFg:""         },
  { id:8,  group:"Earlier",   icon:Briefcase,    iconBg:S.warning50,  iconFg:S.warning,  title:"Expense Awaiting Approval",  desc:"Travel Expense Claim ₦45,000 is pending HR approval.",       time:"4d ago",    read:true,  badge:"Pending",  badgeBg:S.warning50, badgeFg:S.warning  },
  { id:9,  group:"Earlier",   icon:Star,         iconBg:S.warning50,  iconFg:S.warning,  title:"Birthday Reminder",          desc:"Amaka Eze's birthday is on July 18. Send her a message!",    time:"5d ago",    read:true,  badge:null,       badgeBg:"",          badgeFg:""         },
  { id:10, group:"Earlier",   icon:Award,        iconBg:C.magenta100, iconFg:C.magentaIcon,  title:"Company Event",              desc:"Independence Day celebration on Oct 1. Register now.",        time:"1w ago",    read:true,  badge:null,       badgeBg:"",          badgeFg:""         },
];

// ─── Profile Menu ─────────────────────────────────────────────────────────────
export const PROFILE_GROUPS: Array<{ label: string; items: PMenuItem[] }> = [
  { label: "Account", items: [
    { id: "profile",   label: "My Profile",    icon: User            },
    { id: "switchorg", label: "Switch Organisation", icon: Building2 },
    { id: "settings",  label: "Settings",      icon: Settings        },
    { id: "prefs",     label: "Preferences",   icon: Sliders         },
  ]},
  { label: "Personalization", items: [
    { id: "language",  label: "Change Language",           icon: Globe    },
    { id: "notifpref", label: "Notification Preferences",  icon: Bell     },
    { id: "security",  label: "Security",                  icon: Shield   },
  ]},
  { label: "Support", items: [
    { id: "rewind",    label: "NotchHR Rewind",     icon: Sparkles   },
    { id: "help",      label: "Help & Support",     icon: HelpCircle },
  ]},
  { label: "Session", items: [
    { id: "signout",   label: "Sign Out",   icon: LogOut, danger: true },
  ]},
];

// ─── Grievance data ───────────────────────────────────────────────────────────
const DG_CASES_BASE: Record<ScenarioId, Array<{ ref: string; type: string; date: string; status: string; statusGood: boolean }>> = {
  1: [
    { ref: "GRV-2026-014", type: "Grievance",    date: "2026-07-15", status: "Under Review", statusGood: false },
    { ref: "GRV-2026-009", type: "Disciplinary", date: "2026-06-02", status: "Resolved",     statusGood: true  },
    { ref: "GRV-2026-022", type: "Misconduct",   date: "2026-08-03", status: "Pending",      statusGood: false },
    { ref: "GRV-2026-007", type: "Appeal",        date: "2026-05-11", status: "Closed",       statusGood: true  },
  ],
  2: [],
  3: [],
};

const DG_CASES_STANDARD_EXTRA: Array<{ ref: string; type: string; date: string; status: string; statusGood: boolean }> = [
  { ref: "GRV-2026-021", type: "Misconduct",   date: "2026-08-01", status: "Pending",      statusGood: false },
  { ref: "GRV-2026-005", type: "Appeal",        date: "2026-04-18", status: "Closed",       statusGood: true  },
];

const DG_CASES_PREMIUM_EXTRA: Array<{ ref: string; type: string; date: string; status: string; statusGood: boolean }> = [
  { ref: "GRV-2026-031", type: "Harassment",   date: "2026-08-10", status: "Under Review", statusGood: false },
];

export const DG_CASES: Record<ScenarioId, Array<{ ref: string; type: string; date: string; status: string; statusGood: boolean }>> = DG_CASES_BASE;

export function getDGCases(plan: PlanId, scenario: ScenarioId) {
  const base = DG_CASES_BASE[scenario];
  if (plan === "standard") return [...base, ...DG_CASES_STANDARD_EXTRA];
  if (plan === "premium")  return [...base, ...DG_CASES_PREMIUM_EXTRA];
  return base;
}

// ─── All workspace modules (ordered) ─────────────────────────────────────────
export const ALL_WS_MODULES: Array<{ id: string; label: string; icon: React.ElementType; locked?: boolean }> = [
  { id: "identity",              label: "Identity Card",                   icon: User,          locked: true },
  { id: "attendance",            label: "Attendance Today",                icon: Clock          },
  { id: "leave-summary",         label: "My Leave Summary",                icon: Calendar       },
  { id: "quick-actions",         label: "Quick Actions",                   icon: CheckSquare    },
  { id: "announcements",         label: "Announcements",                   icon: Bell           },
  { id: "team",                  label: "Team",                            icon: Users          },
  { id: "approvals",             label: "Approvals",                       icon: CheckSquare    },
  { id: "payslip",               label: "Employee Benefits",               icon: DollarSign     },
  { id: "on-leave",              label: "Employees on Leave",              icon: Calendar       },
  { id: "events",                label: "Events & Calendar",               icon: Award          },
  { id: "grievance",             label: "Grievance & Compliance",          icon: AlertTriangle  },
  { id: "performance",           label: "Performance Overview",            icon: TrendingUp     },
  { id: "learning",              label: "E-Learning",                      icon: GraduationCap  },
  { id: "directory",             label: "Employee Directory",              icon: Users          },
  { id: "documents",             label: "Document Hub",                    icon: FileText       },
  { id: "recruitment",           label: "Recruitment",                     icon: Users          },
  { id: "time-tracker",          label: "Time Tracker",                    icon: Clock          },
  { id: "about-me",              label: "About Me",                        icon: User           },
  { id: "competency",            label: "My Competency",                   icon: Star           },
  { id: "work-history",          label: "My Work History",                 icon: Briefcase      },
  { id: "academic-professional", label: "Academic & Professional History", icon: GraduationCap  },
  { id: "employment-details",    label: "Employment Details",              icon: Briefcase      },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const WS_ROW_SIZES = [5, 4, 3, 3, 3];
// Row 1: identity(3) · attendance(3) · announcements(3) · quick-actions(3) = 12
// Row 2: team(4) · approvals(3) · payslip(5) = 12
// Row 3: leave-summary(3) · on-leave(4) · events(4) → 12
// Row 4 premium: grievance(4) · performance(4) · learning(4) = 12
// Row 5 all plans: directory(4) · documents(4) · recruitment(4) = 12
export const WS_FLAT_DEFAULT: string[] = [
  "identity", "attendance", "announcements", "quick-actions",
  "team", "approvals", "payslip",
  "leave-summary", "on-leave", "events",
  "grievance", "performance", "learning",
  "directory", "documents", "recruitment",
  "time-tracker",
];

export const WS_FLAT_DEFAULT_BASIC: string[] = [
  "identity", "attendance", "announcements", "quick-actions",
  "team", "approvals", "payslip",
  "leave-summary", "on-leave", "events",
  "grievance", "performance", "learning",
  "directory", "documents", "recruitment",
  "time-tracker",
];

// Standard: grievance alone in its row (expands to 12), then directory · documents · recruitment
export const WS_FLAT_DEFAULT_STANDARD: string[] = [
  "identity", "attendance", "announcements", "quick-actions",
  "team", "approvals", "payslip",
  "leave-summary", "on-leave", "events",
  "grievance", "performance", "learning",
  "directory", "documents", "recruitment",
  "time-tracker",
];

export const getDefaultOrder = (plan: PlanId): string[] =>
  plan === "basic"    ? [...WS_FLAT_DEFAULT_BASIC]    :
  plan === "standard" ? [...WS_FLAT_DEFAULT_STANDARD] :
                        [...WS_FLAT_DEFAULT];
export const WS_MULTI_KEY = "notchr-workspaces-v1";
export const WS_ACTIVE_KEY = "notchr-active-ws-v1";
export const makeDefaultWs = (): WsRecord => ({ id: "default", name: "Default Workspace", order: [...WS_FLAT_DEFAULT] });

// 12-column grid. Minimum card width = span 3 (≈ Quick Actions card width at 1440px desktop).
// Default preferred span per card — the starting point before row packing.
export const CARD_SPAN_DEFAULT: Record<string, number> = {
  "identity": 3, "attendance": 3, "leave-summary": 3, "quick-actions": 3,
  "announcements": 3, "approvals": 3, "enps": 3,
  "team": 4, "on-leave": 4, "events": 4, "directory": 4,
  "documents": 4, "grievance": 4, "learning": 4,
  "performance": 4,
  "payslip": 5,
  "about-me": 3, "competency": 6, "work-history": 3,
  "academic-professional": 3, "employment-details": 3,
  "recruitment": 4,
  "time-tracker": 8,
};

// Hard minimum span per card (floor when the row packer shrinks a card to make it fit).
// Minimum for all cards = 3 (QA card width), but some cards have higher content floors.
export const CARD_SPAN_MIN: Record<string, number> = {
  "identity": 3,                          // fixed — never moves
  "attendance": 3, "leave-summary": 3, "quick-actions": 3,
  "announcements": 3, "approvals": 3,
  "enps": 3,
  "performance": 3, "learning": 3,
  "events": 4,      // Birthdays/Events: wide enough to display avatar + name + role + date
  "payslip": 4,     // Employee Benefits: can shrink 25% from 5 → floor 4
  "team": 4,        // Teams: never reduce
  "on-leave": 4,    // Employees on Leave: never reduce
  "directory": 4,   // Employee Directory: never reduce from default
  "documents": 4,   // Document Hub: never reduce from default
  "grievance": 4,   // Grievance: shares row with performance(5)+learning(3) on premium
  "competency": 5,  // Competency: score columns + long names need minimum 5 spans
  "recruitment": 4,
  "time-tracker": 6,
};

// Hard maximum span per card (ceiling when the row packer stretches a card to fill slack).
// Unconstrained cards (max=12) grow freely; capped cards are limited to 25% above default.
export const CARD_SPAN_MAX: Record<string, number> = {
  "identity": 3,    // locked — never grows or shrinks
  "quick-actions": 3, // fixed width — same as identity
  "attendance": 12, "leave-summary": 12,
  "announcements": 12, "approvals": 12,
  "enps": 12, "performance": 12, "learning": 4, "events": 12,
  "payslip": 12,    // Employee Benefits: can grow freely
  "team": 12,       // Teams: can grow freely
  "on-leave": 12,   // Employees on Leave: can grow freely
  "directory": 6,   // can grow to 6 to fill a two-card row with documents
  "documents": 6,   // can grow to 6 to fill a two-card row with directory
  "grievance": 12,  // can grow freely when alone in a row (standard plan)
  "competency": 8,  // 6 default, grows to fill row when paired with narrower cards
  "recruitment": 6,
  "time-tracker": 12,
};

// Per-plan span overrides — takes precedence over the global CARD_SPAN_* constants
export const CARD_SPAN_PLAN_OVERRIDE: Partial<Record<string, Partial<Record<PlanId, { default?: number; min?: number; max?: number }>>>> = {
  "time-tracker": {
    basic:    { default: 4, min: 4, max: 4 },
    standard: { default: 4, min: 4, max: 4 },
    premium:  { default: 4, min: 4, max: 4 },
  },
};

// Unused — kept for backwards compat
export const PLAN_CARD_SPAN: Record<string, Partial<Record<string, number>>> = { basic: {}, standard: {}, premium: {} };
export const CARD_SPANS: Record<string, number> = {};
export const CARD_SIZE: Record<string, string> = {};

// Maps workspace card IDs to the MODULES key required to display them (undefined = always available)
export const CARD_MODULE: Partial<Record<string, string>> = {
  "leave-summary": "leave",
  "on-leave":      "leave",
  "documents":     "documents",
  "grievance":     "grievance",
  "performance":   "performance",
  "learning":      "learning",
  "enps":          "enps",
  // "recruitment" intentionally omitted — addon-gated by data presence, not plan module
  // "time-tracker" intentionally omitted — addon-gated by data presence, visible on all plans
};

// ─── Time Tracker data ────────────────────────────────────────────────────────
export interface TrackerData {
  stats: { totalTime: string; productiveTime: string; manualTime: string; idleTime: string };
  timeLogged: Array<{ date: string; hours: number }>;
  activity: Array<{ day: string; value: number }>;
  teamMostTime: Array<{ name: string; time: string; percent: number }>;
  teamLeastTime: Array<{ name: string; time: string; percent: number }>;
  topApps: Array<{ name: string; time: string; minutes: number }>;
}

export const TRACKER_DATA: Record<ScenarioId, TrackerData | null> = {
  1: {
    stats: { totalTime: "16h 22m", productiveTime: "2h 13m", manualTime: "11h 54m", idleTime: "12h 36m" },
    timeLogged: [
      { date: "20 Aug", hours: 7.0 },
      { date: "21 Aug", hours: 0.4 },
      { date: "22 Aug", hours: 0   },
      { date: "23 Aug", hours: 0   },
      { date: "24 Aug", hours: 0   },
      { date: "25 Aug", hours: 6.5 },
      { date: "26 Aug", hours: 2.5 },
    ],
    activity: [
      { day: "Mon", value: 90 },
      { day: "Tue", value: 85 },
      { day: "Wed", value: 10 },
      { day: "Thu", value: 5  },
      { day: "Fri", value: 20 },
      { day: "Sat", value: 72 },
      { day: "Sun", value: 80 },
    ],
    teamMostTime:  [{ name: "Oladapo", time: "16h 22m", percent: 85 }],
    teamLeastTime: [{ name: "Oladapo", time: "16h 22m", percent: 85 }],
    topApps: [
      { name: "figma.com",            time: "1h 33m",  minutes: 93   },
      { name: "Microsoft Teams",       time: "13m 32s", minutes: 13.5 },
      { name: "employee.notchhhr.io",  time: "12m 38s", minutes: 12.6 },
      { name: "Notepad",              time: "6m 35s",  minutes: 6.6  },
      { name: "WhatsApp.Root",        time: "6m 4s",   minutes: 6.1  },
    ],
  },
  2: null,
  3: null,
};

// ─── Recruitment data ─────────────────────────────────────────────────────────
export type RecruitmentActionType =
  | "conduct-interview"
  | "submit-feedback"
  | "review-profile"
  | "approve-candidate"
  | "waiting";

export type RecruitmentRole = "Interviewer" | "Hiring Manager" | "Panelist" | "Approver";

export interface RecruitmentActivity {
  candidateName: string;
  jobRole: string;
  stageName: string;
  activityType: "interview" | "profile-review" | "feedback";
  date?: string;
  time?: string;
  format?: "Video" | "In-person" | "Phone";
  status: "scheduled" | "feedback-due" | "pending" | "completed";
}

export interface RecruitmentAssignment {
  myRole: RecruitmentRole;
  activities: RecruitmentActivity[];
  action: {
    type: RecruitmentActionType;
    label: string;
    urgency: "high" | "medium" | "low" | "none";
  };
}

export const RECRUITMENT_DATA: Record<ScenarioId, RecruitmentAssignment | null> = {
  1: {
    myRole: "Interviewer",
    activities: [
      { candidateName: "Tunde Okafor",  jobRole: "Product Designer",  stageName: "First Interview",            activityType: "interview",      date: "2026-08-25", time: "10:00 AM", format: "Video",     status: "scheduled"    },
      { candidateName: "Ngozi Adeyemi", jobRole: "UX Researcher",     stageName: "Panel Review Interview",     activityType: "interview",      date: "2026-08-27", time: "2:00 PM",  format: "In-person", status: "scheduled"    },
      { candidateName: "Bisi Lawson",   jobRole: "UI Designer",       stageName: "Awaiting Design Task",         activityType: "profile-review",                                                             status: "pending"      },
      { candidateName: "Chidi Nwosu",   jobRole: "Product Designer",  stageName: "Design Task Review",           activityType: "feedback",                                                                   status: "feedback-due" },
      { candidateName: "Emeka Fadipe",  jobRole: "Backend Engineer",  stageName: "Submit Feedback to HR",      activityType: "feedback",                                                                   status: "feedback-due" },
    ],
    action: {
      type: "conduct-interview",
      label: "Conduct interview for Tunde Okafor — tomorrow, 10:00 AM",
      urgency: "high",
    },
  },
  2: null,
  3: null,
};
