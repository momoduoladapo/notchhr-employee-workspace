// ─── NotchHR Production — Type Definitions ────────────────────────────────────

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error" | "session_expired";
export type PlanTier = "basic" | "standard" | "premium";
export type EmployeeStatus = "active" | "onboarding" | "newly_onboarded" | "inactive" | "suspended";
export type Theme = "light" | "dark";

export interface Organization {
  id: string; name: string; logoUrl?: string;
  industry?: string; plan: PlanTier; employeeCount?: number;
}

export interface User {
  id: string; employeeId: string; firstName: string; lastName: string;
  email: string; phone: string; avatarUrl?: string; jobTitle: string;
  department: string; organization: Organization; status: EmployeeStatus;
  plan: PlanTier; roles: string[]; lastLogin?: string;
}

export interface Department {
  id: string; name: string; headId?: string; employeeCount: number;
}

export interface Employee {
  id: string; employeeId: string; firstName: string; lastName: string;
  email: string; phone: string; avatarUrl?: string; jobTitle: string;
  department: string; departmentId: string; managerId?: string; managerName?: string;
  status: EmployeeStatus; employmentType: "full-time" | "part-time" | "contract" | "intern";
  startDate: string; location: string; gender: "male" | "female" | "other" | "prefer_not_to_say";
  gradeLevel?: string;
}

export type AttendanceStatus = "present" | "absent" | "late" | "half_day" | "remote" | "on_leave" | "holiday";

export interface AttendanceRecord {
  id: string; employeeId: string; date: string;
  /** Every session that started on `date`, oldest first. */
  sessions: AttendanceSession[];
  /** Completed sessions only; undefined until one is completed. */
  hoursWorked?: number;
  status: AttendanceStatus; notes?: string;
}

export interface AttendanceSummary {
  totalDays: number; present: number; absent: number; late: number;
  halfDay: number; remote: number; onLeave: number; attendanceRate: number;
  avgHoursPerDay: number;
}

/** Working hours an employee is assigned to. Times are "HH:mm" in Africa/Lagos. */
export interface WorkSchedule { start: string; end: string; }

/** Whose attendance is being read or changed. */
export interface AttendanceScope { organisationId: string; employeeId: string; }

/** One simulated clock-in/clock-out pair, stored in this browser only. A day can have many. */
export interface AttendanceSession {
  id: string; employeeId: string; organisationId: string;
  clockInAt: string;
  /** Null while active. */
  clockOutAt: string | null;
  /** Null while active; use `sessionDuration` for the running time. */
  durationMs: number | null;
  status: "active" | "completed";
}

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";
export type LeaveType = "annual" | "sick" | "maternity" | "paternity" | "compassionate" | "study" | "unpaid";

export interface LeaveBalance {
  type: LeaveType; label: string; entitled: number;
  used: number; pending: number; remaining: number;
}

export interface LeaveRequest {
  id: string; employeeId: string; employeeName: string; employeeAvatar?: string;
  department: string; type: LeaveType; typeLabel: string; startDate: string;
  endDate: string; days: number; reason?: string; status: LeaveStatus;
  appliedDate: string; approvedBy?: string; approvedDate?: string; rejectionReason?: string;
}

export interface PayrollItem {
  id: string; label: string; amount: number; type: "earning" | "deduction";
}

export interface PayrollRecord {
  id: string; employeeId: string; month: string; year: number; grossPay: number;
  netPay: number; totalDeductions: number; items: PayrollItem[];
  status: "draft" | "processed" | "paid"; payDate?: string;
}

export type JobStatus = "draft" | "open" | "closed" | "on_hold";
export type CandidateStage = "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";

export interface JobPosting {
  id: string; title: string; department: string; location: string;
  type: "full-time" | "part-time" | "contract"; status: JobStatus;
  postedDate: string; closingDate?: string; applicantCount: number;
  hiringManagerId?: string; hiringManagerName?: string; description?: string;
}

export interface Candidate {
  id: string; jobId: string; jobTitle: string; firstName: string; lastName: string;
  email: string; phone?: string; avatarUrl?: string;
  stage: CandidateStage; appliedDate: string; rating?: number; notes?: string;
}

export type CourseStatus = "not_started" | "in_progress" | "completed" | "overdue";

export interface Course {
  id: string; title: string; category: string; instructor?: string;
  duration: string; dueDate?: string; completedDate?: string;
  progress: number; status: CourseStatus; mandatory: boolean; thumbnailUrl?: string;
}

export interface KPI {
  id: string; title: string; target: number; actual: number; unit: string;
  period: string; status: "on_track" | "at_risk" | "behind" | "exceeded";
}

export interface PerformanceReview {
  id: string; employeeId: string; period: string; overallScore?: number;
  selfScore?: number; managerScore?: number;
  status: "not_started" | "self_review" | "manager_review" | "completed";
  dueDate: string; completedDate?: string;
}

export type DocumentCategory = "contract" | "policy" | "payslip" | "certificate" | "id" | "other";

export interface Document {
  id: string; name: string; category: DocumentCategory; uploadedBy: string;
  uploadedDate: string; size: string; fileType: string; url?: string; expiryDate?: string;
}

export type AnnouncementPriority = "low" | "medium" | "high" | "urgent";

export interface Announcement {
  id: string; title: string; body: string; author: string;
  publishedDate: string; priority: AnnouncementPriority; pinned: boolean; readBy: string[];
}

export interface CompanyEvent {
  id: string; title: string; description?: string; date: string; endDate?: string;
  location?: string; type: "company" | "team" | "training" | "holiday" | "birthday" | "anniversary";
}

export interface TableColumn<T> {
  key: keyof T | string; header?: string; label?: string; sortable?: boolean; width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface ApiResponse<T> {
  data: T; meta?: { total: number; page: number; pageSize: number }; error?: string;
}
