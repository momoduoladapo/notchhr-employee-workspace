// ─── Mock Data ─ Replace each section with real API calls ─────────────────────
// Pattern: return Promise.resolve(MOCK_X)  →  return client.get('/endpoint')

import type {
  User, Employee, Organization, AttendanceRecord, LeaveRequest, LeaveBalance,
  PayrollRecord, JobPosting, Candidate, Course, KPI, PerformanceReview,
  Document, Announcement, CompanyEvent, Department, WorkSchedule, AttendanceScope,
} from "../types";

// GET /api/organizations
export const MOCK_ORGS: Organization[] = [
  { id: "mtn-001", name: "MTN Nigeria", industry: "Telecommunications", plan: "premium", employeeCount: 4800 },
  { id: "gtb-001", name: "GTBank Plc", industry: "Financial Services", plan: "standard", employeeCount: 3200 },
  { id: "dng-001", name: "Dangote Industries", industry: "Manufacturing", plan: "premium", employeeCount: 12000 },
];

// GET /api/me
export const MOCK_USER: User = {
  id: "emp-001", employeeId: "MTN-2019-0042", firstName: "Adaeze", lastName: "Okonkwo",
  email: "adaeze.okonkwo@mtn.com", phone: "+234 803 456 7890",
  jobTitle: "Senior Product Manager", department: "Product & Technology",
  organization: MOCK_ORGS[0], status: "active", plan: "premium",
  roles: ["employee", "manager"], lastLogin: "2024-11-14T08:32:00Z",
};

// GET /api/departments
export const MOCK_DEPARTMENTS: Department[] = [
  { id: "dept-001", name: "Product & Technology", headId: "emp-001", employeeCount: 142 },
  { id: "dept-002", name: "Human Resources", headId: "emp-010", employeeCount: 38 },
  { id: "dept-003", name: "Finance & Accounts", headId: "emp-020", employeeCount: 64 },
  { id: "dept-004", name: "Sales & Marketing", headId: "emp-030", employeeCount: 215 },
  { id: "dept-005", name: "Operations", headId: "emp-040", employeeCount: 320 },
  { id: "dept-006", name: "Customer Experience", headId: "emp-050", employeeCount: 188 },
  { id: "dept-007", name: "Legal & Compliance", headId: "emp-060", employeeCount: 22 },
  { id: "dept-008", name: "Executive Office", headId: "emp-070", employeeCount: 12 },
];

// GET /api/employees
export const MOCK_EMPLOYEES: Employee[] = [
  { id: "emp-001", employeeId: "MTN-2019-0042", firstName: "Adaeze", lastName: "Okonkwo", email: "adaeze.okonkwo@mtn.com", phone: "+234 803 456 7890", jobTitle: "Senior Product Manager", department: "Product & Technology", departmentId: "dept-001", managerName: "Chukwuemeka Eze", status: "active", employmentType: "full-time", startDate: "2019-03-15", location: "Lagos", gender: "female", gradeLevel: "L5" },
  { id: "emp-002", employeeId: "MTN-2020-0118", firstName: "Babatunde", lastName: "Adesanya", email: "babatunde.adesanya@mtn.com", phone: "+234 808 123 4567", jobTitle: "Software Engineer II", department: "Product & Technology", departmentId: "dept-001", managerName: "Adaeze Okonkwo", status: "active", employmentType: "full-time", startDate: "2020-06-01", location: "Lagos", gender: "male", gradeLevel: "L3" },
  { id: "emp-003", employeeId: "MTN-2021-0234", firstName: "Chidinma", lastName: "Nwosu", email: "chidinma.nwosu@mtn.com", phone: "+234 701 987 6543", jobTitle: "HR Business Partner", department: "Human Resources", departmentId: "dept-002", managerName: "Fatima Aliyu", status: "active", employmentType: "full-time", startDate: "2021-01-10", location: "Abuja", gender: "female", gradeLevel: "L4" },
  { id: "emp-004", employeeId: "MTN-2018-0056", firstName: "Emeka", lastName: "Obi", email: "emeka.obi@mtn.com", phone: "+234 812 345 6789", jobTitle: "Finance Analyst", department: "Finance & Accounts", departmentId: "dept-003", managerName: "Ngozi Adeyemi", status: "active", employmentType: "full-time", startDate: "2018-08-20", location: "Lagos", gender: "male", gradeLevel: "L3" },
  { id: "emp-005", employeeId: "MTN-2022-0389", firstName: "Funmilayo", lastName: "Akinwande", email: "funmilayo.akinwande@mtn.com", phone: "+234 706 543 2109", jobTitle: "Sales Executive", department: "Sales & Marketing", departmentId: "dept-004", status: "active", employmentType: "full-time", startDate: "2022-04-11", location: "Port Harcourt", gender: "female", gradeLevel: "L2" },
  { id: "emp-006", employeeId: "MTN-2023-0501", firstName: "Gbenga", lastName: "Olatunji", email: "gbenga.olatunji@mtn.com", phone: "+234 803 111 2233", jobTitle: "Operations Analyst", department: "Operations", departmentId: "dept-005", status: "newly_onboarded", employmentType: "full-time", startDate: "2023-11-01", location: "Kano", gender: "male", gradeLevel: "L2" },
  { id: "emp-007", employeeId: "MTN-2023-0512", firstName: "Halima", lastName: "Suleiman", email: "halima.suleiman@mtn.com", phone: "+234 809 222 3344", jobTitle: "Customer Success Manager", department: "Customer Experience", departmentId: "dept-006", status: "onboarding", employmentType: "full-time", startDate: "2023-11-13", location: "Abuja", gender: "female", gradeLevel: "L3" },
  { id: "emp-008", employeeId: "MTN-2017-0012", firstName: "Ibrahim", lastName: "Musa", email: "ibrahim.musa@mtn.com", phone: "+234 811 333 4455", jobTitle: "Legal Counsel", department: "Legal & Compliance", departmentId: "dept-007", managerName: "Kola Adebayo", status: "active", employmentType: "full-time", startDate: "2017-02-14", location: "Lagos", gender: "male", gradeLevel: "L6" },
  { id: "emp-009", employeeId: "MTN-2020-0198", firstName: "Jennifer", lastName: "Eze", email: "jennifer.eze@mtn.com", phone: "+234 706 444 5566", jobTitle: "UX Designer", department: "Product & Technology", departmentId: "dept-001", managerName: "Adaeze Okonkwo", status: "active", employmentType: "full-time", startDate: "2020-09-07", location: "Lagos", gender: "female", gradeLevel: "L3" },
  { id: "emp-010", employeeId: "MTN-2015-0003", firstName: "Kelechi", lastName: "Nwofor", email: "kelechi.nwofor@mtn.com", phone: "+234 803 555 6677", jobTitle: "Head of HR", department: "Human Resources", departmentId: "dept-002", status: "active", employmentType: "full-time", startDate: "2015-05-01", location: "Lagos", gender: "male", gradeLevel: "L7" },
  { id: "emp-011", employeeId: "MTN-2021-0267", firstName: "Lola", lastName: "Fashola", email: "lola.fashola@mtn.com", phone: "+234 807 666 7788", jobTitle: "Marketing Manager", department: "Sales & Marketing", departmentId: "dept-004", status: "active", employmentType: "full-time", startDate: "2021-07-19", location: "Lagos", gender: "female", gradeLevel: "L5" },
  { id: "emp-012", employeeId: "MTN-2019-0088", firstName: "Mohammed", lastName: "Aliyu", email: "mohammed.aliyu@mtn.com", phone: "+234 811 777 8899", jobTitle: "Data Engineer", department: "Product & Technology", departmentId: "dept-001", managerName: "Adaeze Okonkwo", status: "active", employmentType: "full-time", startDate: "2019-11-04", location: "Lagos", gender: "male", gradeLevel: "L4" },
];

// Attendance — simulated. Employees without an entry here have no work schedule.
export const MOCK_SCHEDULES: Record<string, WorkSchedule> = {
  "emp-001":   { start: "09:00", end: "17:00" }, // Adaeze Okonkwo (MOCK_USER)
  "ws-active": { start: "09:00", end: "17:00" }, // Shola Adeleke (Employee Workspace, active)
};

const hhmm = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

/**
 * Past weekday records from the start of last month up to the day before `todayKey`.
 * Wednesdays are late, matching the workspace's "This Week" strip.
 */
export function buildMockAttendance({ organisationId, employeeId }: AttendanceScope, todayKey: string): AttendanceRecord[] {
  const DAY = 86_400_000;
  const [y, m, d] = todayKey.split("-").map(Number);
  const today = Date.UTC(y, m - 1, d);
  const weekStart = today - ((new Date(today).getUTCDay() + 6) % 7) * DAY;
  const records: AttendanceRecord[] = [];

  for (let t = Date.UTC(y, m - 2, 1); t < today; t += DAY) {
    const day = new Date(t);
    const dow = day.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const dom = day.getUTCDate();
    const date = day.toISOString().slice(0, 10);
    const base = { id: `att-${employeeId}-${date}`, employeeId, date, sessions: [] };

    if (t < weekStart && dow === 1 && dom >= 8 && dom <= 14) {
      records.push({ ...base, status: "absent" });
      continue;
    }
    const late = dow === 3;
    const inMins = late ? 9 * 60 + 12 + (dom % 10) : 8 * 60 + 44 + ((dom * 7) % 15);
    const outMins = 17 * 60 + 2 + ((dom * 5) % 28);
    records.push({
      ...base,
      sessions: [{
        id: `${base.id}-1`, employeeId, organisationId,
        clockInAt: `${date}T${hhmm(inMins)}:00+01:00`, clockOutAt: `${date}T${hhmm(outMins)}:00+01:00`, // Africa/Lagos
        durationMs: (outMins - inMins) * 60_000, status: "completed",
      }],
      hoursWorked: Math.round(((outMins - inMins) / 60) * 100) / 100,
      status: late ? "late" : dow === 5 && dom <= 7 ? "remote" : "present",
    });
  }
  return records;
}

// GET /api/leave/balances, GET /api/leave/requests
export const MOCK_LEAVE_BALANCES: LeaveBalance[] = [
  { type: "annual", label: "Annual Leave", entitled: 20, used: 8, pending: 3, remaining: 9 },
  { type: "sick", label: "Sick Leave", entitled: 10, used: 2, pending: 0, remaining: 8 },
  { type: "maternity", label: "Maternity Leave", entitled: 90, used: 0, pending: 0, remaining: 90 },
  { type: "compassionate", label: "Compassionate", entitled: 5, used: 0, pending: 0, remaining: 5 },
  { type: "study", label: "Study Leave", entitled: 10, used: 0, pending: 0, remaining: 10 },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "lr-001", employeeId: "emp-001", employeeName: "Adaeze Okonkwo", department: "Product & Technology", type: "annual", typeLabel: "Annual Leave", startDate: "2024-11-25", endDate: "2024-11-27", days: 3, reason: "Family vacation", status: "pending", appliedDate: "2024-11-12" },
  { id: "lr-002", employeeId: "emp-002", employeeName: "Babatunde Adesanya", department: "Product & Technology", type: "sick", typeLabel: "Sick Leave", startDate: "2024-11-11", endDate: "2024-11-11", days: 1, status: "approved", appliedDate: "2024-11-11", approvedBy: "Adaeze Okonkwo", approvedDate: "2024-11-11" },
  { id: "lr-003", employeeId: "emp-003", employeeName: "Chidinma Nwosu", department: "Human Resources", type: "annual", typeLabel: "Annual Leave", startDate: "2024-12-02", endDate: "2024-12-06", days: 5, reason: "End of year holiday", status: "pending", appliedDate: "2024-11-10" },
  { id: "lr-004", employeeId: "emp-004", employeeName: "Emeka Obi", department: "Finance & Accounts", type: "annual", typeLabel: "Annual Leave", startDate: "2024-10-28", endDate: "2024-10-30", days: 3, status: "approved", appliedDate: "2024-10-20", approvedBy: "Ngozi Adeyemi", approvedDate: "2024-10-22" },
  { id: "lr-005", employeeId: "emp-009", employeeName: "Jennifer Eze", department: "Product & Technology", type: "annual", typeLabel: "Annual Leave", startDate: "2024-12-16", endDate: "2024-12-20", days: 5, reason: "Christmas holiday", status: "pending", appliedDate: "2024-11-13" },
];

// GET /api/payroll/history
export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: "pay-001", employeeId: "emp-001", month: "October", year: 2024, grossPay: 850000, netPay: 672500, totalDeductions: 177500, status: "paid", payDate: "2024-10-28",
    items: [
      { id: "pi-001", label: "Basic Salary", amount: 600000, type: "earning" },
      { id: "pi-002", label: "Housing Allowance", amount: 150000, type: "earning" },
      { id: "pi-003", label: "Transport Allowance", amount: 50000, type: "earning" },
      { id: "pi-004", label: "Medical Allowance", amount: 50000, type: "earning" },
      { id: "pi-005", label: "PAYE Tax", amount: -120000, type: "deduction" },
      { id: "pi-006", label: "Pension (Employee 8%)", amount: -48000, type: "deduction" },
      { id: "pi-007", label: "NHF", amount: -9500, type: "deduction" },
    ],
  },
  {
    id: "pay-002", employeeId: "emp-001", month: "September", year: 2024, grossPay: 850000, netPay: 672500, totalDeductions: 177500, status: "paid", payDate: "2024-09-27",
    items: [
      { id: "pi-008", label: "Basic Salary", amount: 600000, type: "earning" },
      { id: "pi-009", label: "Housing Allowance", amount: 150000, type: "earning" },
      { id: "pi-010", label: "Transport Allowance", amount: 50000, type: "earning" },
      { id: "pi-011", label: "Medical Allowance", amount: 50000, type: "earning" },
      { id: "pi-012", label: "PAYE Tax", amount: -120000, type: "deduction" },
      { id: "pi-013", label: "Pension (Employee 8%)", amount: -48000, type: "deduction" },
      { id: "pi-014", label: "NHF", amount: -9500, type: "deduction" },
    ],
  },
];

// GET /api/recruitment/jobs, GET /api/recruitment/candidates
export const MOCK_JOBS: JobPosting[] = [
  { id: "job-001", title: "Senior Backend Engineer", department: "Product & Technology", location: "Lagos", type: "full-time", status: "open", postedDate: "2024-10-15", closingDate: "2024-11-30", applicantCount: 47, hiringManagerName: "Adaeze Okonkwo" },
  { id: "job-002", title: "HR Generalist", department: "Human Resources", location: "Abuja", type: "full-time", status: "open", postedDate: "2024-11-01", closingDate: "2024-11-25", applicantCount: 28, hiringManagerName: "Kelechi Nwofor" },
  { id: "job-003", title: "Financial Analyst", department: "Finance & Accounts", location: "Lagos", type: "full-time", status: "closed", postedDate: "2024-09-01", closingDate: "2024-10-15", applicantCount: 62, hiringManagerName: "Ngozi Adeyemi" },
  { id: "job-004", title: "Sales Representative (North)", department: "Sales & Marketing", location: "Kano", type: "full-time", status: "open", postedDate: "2024-11-05", applicantCount: 14, hiringManagerName: "Lola Fashola" },
  { id: "job-005", title: "Customer Success Associate", department: "Customer Experience", location: "Port Harcourt", type: "full-time", status: "on_hold", postedDate: "2024-10-20", applicantCount: 19 },
];

export const MOCK_CANDIDATES: Candidate[] = [
  { id: "cand-001", jobId: "job-001", jobTitle: "Senior Backend Engineer", firstName: "Obinna", lastName: "Okafor", email: "obinna.okafor@gmail.com", stage: "interview", appliedDate: "2024-10-18", rating: 4 },
  { id: "cand-002", jobId: "job-001", jobTitle: "Senior Backend Engineer", firstName: "Taiwo", lastName: "Akinpelu", email: "taiwo.a@yahoo.com", stage: "screening", appliedDate: "2024-10-20", rating: 3 },
  { id: "cand-003", jobId: "job-002", jobTitle: "HR Generalist", firstName: "Amaka", lastName: "Ogbechie", email: "amaka.ogbechie@hotmail.com", stage: "applied", appliedDate: "2024-11-03" },
  { id: "cand-004", jobId: "job-001", jobTitle: "Senior Backend Engineer", firstName: "Yusuf", lastName: "Abdullahi", email: "y.abdullahi@gmail.com", stage: "offer", appliedDate: "2024-10-17", rating: 5 },
  { id: "cand-005", jobId: "job-002", jobTitle: "HR Generalist", firstName: "Sade", lastName: "Coker", email: "sade.coker@gmail.com", stage: "interview", appliedDate: "2024-11-05", rating: 4 },
];

// GET /api/learning/courses
export const MOCK_COURSES: Course[] = [
  { id: "crs-001", title: "Cybersecurity Awareness 2024", category: "Compliance", duration: "2h 30m", dueDate: "2024-11-30", progress: 65, status: "in_progress", mandatory: true },
  { id: "crs-002", title: "Leadership Essentials for Managers", category: "Leadership", duration: "8h", progress: 100, status: "completed", mandatory: false, completedDate: "2024-10-12" },
  { id: "crs-003", title: "Data Privacy & NDPR Compliance", category: "Compliance", duration: "1h 45m", dueDate: "2024-11-20", progress: 0, status: "overdue", mandatory: true },
  { id: "crs-004", title: "Product Management Fundamentals", category: "Professional Skills", duration: "12h", progress: 40, status: "in_progress", mandatory: false },
  { id: "crs-005", title: "Workplace Health & Safety", category: "Compliance", duration: "1h", progress: 0, status: "not_started", mandatory: true, dueDate: "2024-12-31" },
  { id: "crs-006", title: "Agile Project Management", category: "Professional Skills", duration: "6h", progress: 100, status: "completed", mandatory: false, completedDate: "2024-09-20" },
];

// GET /api/performance/kpis, GET /api/performance/reviews
export const MOCK_KPIS: KPI[] = [
  { id: "kpi-001", title: "Product Launch Milestones", target: 4, actual: 3, unit: " milestones", period: "Q4 2024", status: "at_risk" },
  { id: "kpi-002", title: "Team Velocity (Story Points)", target: 80, actual: 88, unit: " pts/sprint", period: "Q4 2024", status: "exceeded" },
  { id: "kpi-003", title: "Customer Satisfaction Score", target: 4.5, actual: 4.3, unit: "/5", period: "Q4 2024", status: "at_risk" },
  { id: "kpi-004", title: "Feature Adoption Rate", target: 70, actual: 72, unit: "%", period: "Q4 2024", status: "on_track" },
  { id: "kpi-005", title: "Incident Response Time", target: 2, actual: 1.5, unit: " hrs avg", period: "Q4 2024", status: "exceeded" },
];

export const MOCK_PERFORMANCE_REVIEW: PerformanceReview = {
  id: "rev-001", employeeId: "emp-001", period: "H2 2024",
  selfScore: undefined, status: "self_review", dueDate: "2024-12-15",
};

// GET /api/documents
export const MOCK_DOCUMENTS: Document[] = [
  { id: "doc-001", name: "Employment Contract - Adaeze Okonkwo.pdf", category: "contract", uploadedBy: "HR Team", uploadedDate: "2019-03-15", size: "1.2 MB", fileType: "PDF" },
  { id: "doc-002", name: "October 2024 Payslip.pdf", category: "payslip", uploadedBy: "Payroll System", uploadedDate: "2024-10-28", size: "245 KB", fileType: "PDF" },
  { id: "doc-003", name: "September 2024 Payslip.pdf", category: "payslip", uploadedBy: "Payroll System", uploadedDate: "2024-09-27", size: "238 KB", fileType: "PDF" },
  { id: "doc-004", name: "Remote Work Policy 2024.pdf", category: "policy", uploadedBy: "HR Team", uploadedDate: "2024-01-10", size: "890 KB", fileType: "PDF" },
  { id: "doc-005", name: "NIN Document.pdf", category: "id", uploadedBy: "Adaeze Okonkwo", uploadedDate: "2019-03-12", size: "180 KB", fileType: "PDF" },
  { id: "doc-006", name: "PMP Certification.pdf", category: "certificate", uploadedBy: "Adaeze Okonkwo", uploadedDate: "2022-07-01", size: "420 KB", fileType: "PDF", expiryDate: "2025-07-01" },
  { id: "doc-007", name: "Code of Conduct Policy.pdf", category: "policy", uploadedBy: "HR Team", uploadedDate: "2024-01-10", size: "1.1 MB", fileType: "PDF" },
];

// GET /api/announcements
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: "ann-001", title: "Year-End Closing & Public Holiday Notice", body: "Please be reminded that December 25 and 26, 2024 are public holidays. All offices will be closed. Submissions for year-end reports are due by December 20.", author: "Corporate Communications", publishedDate: "2024-11-12", priority: "high", pinned: true, readBy: [] },
  { id: "ann-002", title: "Updated Remote Work Policy — Effective December 1", body: "Following a review of our hybrid work practices, the updated Remote Work Policy comes into effect on December 1, 2024. Key changes include a maximum of 3 remote days per week.", author: "Human Resources", publishedDate: "2024-11-10", priority: "medium", pinned: false, readBy: ["emp-001"] },
  { id: "ann-003", title: "Open Enrolment: Health Insurance 2025", body: "The 2025 health insurance enrolment window is open from November 15 to November 30. Please log in to your benefits portal to review and update your coverage.", author: "Benefits Team", publishedDate: "2024-11-08", priority: "urgent", pinned: false, readBy: [] },
  { id: "ann-004", title: "Town Hall — November 2024", body: "Join us for our monthly All-Hands Town Hall on November 28, 2024 at 10:00 AM. The CEO will present Q3 results and outline strategic priorities for 2025.", author: "Executive Office", publishedDate: "2024-11-07", priority: "medium", pinned: false, readBy: ["emp-001"] },
];

// GET /api/events
export const MOCK_EVENTS: CompanyEvent[] = [
  { id: "ev-001", title: "Town Hall — November 2024", date: "2024-11-28", type: "company", location: "Victoria Island HQ" },
  { id: "ev-002", title: "Product Demo Day", date: "2024-11-22", type: "team", location: "Conference Room A" },
  { id: "ev-003", title: "Cybersecurity Training", date: "2024-11-20", type: "training", location: "Virtual" },
  { id: "ev-004", title: "Christmas Celebration", date: "2024-12-13", type: "company", location: "Eko Hotel, Lagos" },
  { id: "ev-005", title: "Babatunde Adesanya — Birthday", date: "2024-11-22", type: "birthday" },
  { id: "ev-006", title: "Chidinma Nwosu — 3 Year Anniversary", date: "2024-11-24", type: "anniversary" },
];
