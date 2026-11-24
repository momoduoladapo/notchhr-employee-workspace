// ─── API Service Layer ─────────────────────────────────────────────────────────
// All data calls go through this layer.
// To connect real backend: replace `return Promise.resolve(MOCK_X)` with
// `return client.get<T>('/endpoint')` using the typed fetch helper below.
//
// API_BASE_URL is read from VITE_API_BASE_URL env var (set in .env.production).

import type {
  User, Employee, Department, AttendanceRecord, AttendanceSummary,
  LeaveRequest, LeaveBalance, PayrollRecord, JobPosting, Candidate,
  Course, KPI, PerformanceReview, Document, Announcement, CompanyEvent,
} from "../types";

import {
  MOCK_USER, MOCK_EMPLOYEES, MOCK_DEPARTMENTS,
  MOCK_ATTENDANCE, MOCK_ATTENDANCE_SUMMARY,
  MOCK_LEAVE_REQUESTS, MOCK_LEAVE_BALANCES, MOCK_PAYROLL,
  MOCK_JOBS, MOCK_CANDIDATES, MOCK_COURSES,
  MOCK_KPIS, MOCK_PERFORMANCE_REVIEW,
  MOCK_DOCUMENTS, MOCK_ANNOUNCEMENTS, MOCK_EVENTS, MOCK_ORGS,
} from "../mock/data";

// ── Base client (wire to real backend by replacing mock returns) ──────────────
const API_BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_BASE_URL ?? "/api";
const TIMEOUT_MS = 15_000;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...init?.headers },
      signal: controller.signal, ...init,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timer);
  }
}

const delay = (ms = 400) => new Promise<void>(r => setTimeout(r, ms));

// ── Auth ─────── POST /api/auth/request-otp | /verify-otp | /select-org | /logout
export const authService = {
  async requestOTP(phone: string) {
    await delay(600);
    void phone; // replace: return request('/auth/request-otp', { method:'POST', body: JSON.stringify({phone}) })
    return { success: true, message: "OTP sent to registered email address" };
  },
  async verifyOTP(phone: string, otp: string) {
    await delay(800);
    void phone; // replace: return request('/auth/verify-otp', { method:'POST', body: JSON.stringify({phone, otp}) })
    if (otp === "000000") return { success: false as const, token: undefined };
    return { success: true as const, token: `mock-jwt-${Date.now()}` };
  },
  async getOrganizations() { await delay(400); return [...MOCK_ORGS]; },
  async selectOrganization(orgId: string) { await delay(500); void orgId; return { success: true }; },
  async getMe(): Promise<User> { await delay(300); return { ...MOCK_USER }; },
  async logout() { await delay(200); },
};

// ── Employees ─── GET /api/employees | /employees/:id | /departments ──────────
export const employeeService = {
  async list(params?: { department?: string; status?: string; search?: string }): Promise<Employee[]> {
    await delay();
    let r = [...MOCK_EMPLOYEES];
    if (params?.department) r = r.filter(e => e.departmentId === params.department);
    if (params?.status)     r = r.filter(e => e.status === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      r = r.filter(e => `${e.firstName} ${e.lastName} ${e.email} ${e.jobTitle}`.toLowerCase().includes(q));
    }
    return r;
  },
  async get(id: string): Promise<Employee | null> {
    await delay(200);
    return MOCK_EMPLOYEES.find(e => e.id === id) ?? null;
  },
  async departments(): Promise<Department[]> { await delay(); return [...MOCK_DEPARTMENTS]; },
};

// ── Attendance ─── GET /api/attendance | /attendance/summary | POST /clock-in | /clock-out
export const attendanceService = {
  async getSummary(_empId: string): Promise<AttendanceSummary> { await delay(); return { ...MOCK_ATTENDANCE_SUMMARY }; },
  async list(empId: string): Promise<AttendanceRecord[]> {
    await delay();
    return MOCK_ATTENDANCE.filter(a => a.employeeId === empId);
  },
  async clockIn() {
    await delay(500);
    return { success: true, time: new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }) };
  },
  async clockOut() {
    await delay(500);
    return { success: true, time: new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }), hoursWorked: 8.5 };
  },
};

// ── Leave ─── GET /api/leave/balances | /leave/requests | POST /apply | PATCH approve/reject | DELETE
export const leaveService = {
  async getBalances(_empId: string): Promise<LeaveBalance[]> { await delay(); return [...MOCK_LEAVE_BALANCES]; },
  async list(params?: { status?: string; employeeId?: string }): Promise<LeaveRequest[]> {
    await delay();
    let r = [...MOCK_LEAVE_REQUESTS];
    if (params?.status)     r = r.filter(x => x.status === params.status);
    if (params?.employeeId) r = r.filter(x => x.employeeId === params.employeeId);
    return r;
  },
  async apply(data: Partial<LeaveRequest>) {
    await delay(700); void data;
    return { success: true, id: `lr-${Date.now()}` };
  },
  async approve(id: string) { await delay(400); void id; return { success: true }; },
  async reject(id: string, reason: string) { await delay(400); void id; void reason; return { success: true }; },
  async cancel(id: string) { await delay(400); void id; return { success: true }; },
};

// ── Payroll ─── GET /api/payroll/history
export const payrollService = {
  async list(empId: string): Promise<PayrollRecord[]> {
    await delay();
    return MOCK_PAYROLL.filter(p => p.employeeId === empId);
  },
};

// ── Recruitment ─── GET /api/recruitment/jobs | /candidates | PUT /candidates/:id/stage
export const recruitmentService = {
  async listJobs(params?: { status?: string; department?: string }): Promise<JobPosting[]> {
    await delay();
    let r = [...MOCK_JOBS];
    if (params?.status)     r = r.filter(j => j.status === params.status);
    if (params?.department) r = r.filter(j => j.department === params.department);
    return r;
  },
  async listCandidates(jobId?: string): Promise<Candidate[]> {
    await delay();
    return jobId ? MOCK_CANDIDATES.filter(c => c.jobId === jobId) : [...MOCK_CANDIDATES];
  },
  async advanceStage(candidateId: string, stage: Candidate["stage"]) {
    await delay(400); void candidateId; void stage; return { success: true };
  },
};

// ── Learning ─── GET /api/learning/courses | POST /enroll
export const learningService = {
  async list(_empId: string): Promise<Course[]> { await delay(); return [...MOCK_COURSES]; },
  async enroll(courseId: string) { await delay(400); void courseId; return { success: true }; },
};

// ── Performance ─── GET /api/performance/kpis | /reviews | POST /reviews/:id/self-review
export const performanceService = {
  async getKPIs(_empId: string): Promise<KPI[]> { await delay(); return [...MOCK_KPIS]; },
  async getReview(_empId: string): Promise<PerformanceReview | null> {
    await delay(); return { ...MOCK_PERFORMANCE_REVIEW };
  },
  async submitSelfReview(reviewId: string, score: number, notes: string) {
    await delay(600); void reviewId; void score; void notes; return { success: true };
  },
};

// ── Documents ─── GET /api/documents | POST /upload | DELETE /:id
export const documentService = {
  async list(_empId: string, category?: string): Promise<Document[]> {
    await delay();
    const r = [...MOCK_DOCUMENTS];
    return category ? r.filter(d => d.category === category) : r;
  },
  async upload(file: File, category: string) {
    await delay(1200); void file; void category;
    return { success: true, id: `doc-${Date.now()}` };
  },
  async delete(id: string) { await delay(300); void id; return { success: true }; },
};

// ── Announcements ─── GET /api/announcements | POST /:id/read
export const announcementService = {
  async list(): Promise<Announcement[]> { await delay(); return [...MOCK_ANNOUNCEMENTS]; },
  async markRead(id: string, empId: string) { await delay(200); void id; void empId; },
};

// ── Events ─── GET /api/events
export const eventService = {
  async list(): Promise<CompanyEvent[]> { await delay(); return [...MOCK_EVENTS]; },
};

// Export request for direct use when backend is available
export { request };
