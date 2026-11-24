// ─── Simulated attendance ─────────────────────────────────────────────────────
// Frontend-only stand-in for an attendance system. Sessions are kept in this
// browser's localStorage and combined with generated mock records.
//
// A day can have any number of sessions, but only one may be active. A session
// belongs to the day it started on (Africa/Lagos), even if it ends after midnight.

import type { AttendanceRecord, AttendanceScope, AttendanceSession, AttendanceSummary, WorkSchedule } from "../types";
import { MOCK_SCHEDULES, buildMockAttendance } from "../mock/data";

const TIME_ZONE = "Africa/Lagos";
export const storageKey = ({ organisationId, employeeId }: AttendanceScope) =>
  `notchr-attendance-sim-v2:${organisationId}:${employeeId}`;

export interface AttendanceState {
  schedule: WorkSchedule | null;
  today: string;
  active: AttendanceSession | null;
  /** The day being worked: the active session's day, otherwise today. */
  workDate: string;
  /** Sessions of `workDate`, oldest first. */
  sessions: AttendanceSession[];
  /** Newest first. */
  records: AttendanceRecord[];
  summary: AttendanceSummary;
}

/** `retryable` is false when trying the same action again cannot succeed. */
export class AttendanceError extends Error {
  retryable: boolean;
  constructor(message: string, retryable: boolean) {
    super(message);
    this.retryable = retryable;
  }
}

// ── Time helpers ──────────────────────────────────────────────────────────────
const dateFmt  = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const clockFmt = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const dayFmt   = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short" });

/** "YYYY-MM-DD" in Africa/Lagos. */
export const toDateKey = (d: Date) => dateFmt.format(d);
/** "HH:mm" in Africa/Lagos. */
const toClock = (d: Date) => clockFmt.format(d);

/** "2026-11-30" + 1 → "2026-12-01" */
export function shiftDate(key: string, days: number) {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "09:05" → "9:05 AM" */
export function formatClock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "10:00 PM", or "23 Nov, 10:00 PM" when it falls on a different day from `onDate`. */
export function formatInstant(iso: string, onDate?: string) {
  const d = new Date(iso);
  const time = formatClock(toClock(d));
  return onDate && toDateKey(d) !== onDate ? `${dayFmt.format(d)}, ${time}` : time;
}

export function formatDuration(ms: number, withSeconds = false) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const base = `${Math.floor(total / 3600)}h ${String(Math.floor((total % 3600) / 60)).padStart(2, "0")}m`;
  return withSeconds ? `${base} ${String(total % 60).padStart(2, "0")}s` : base;
}

/** Decimal hours, to two places. */
export const toHours = (ms: number) => Math.round((ms / 3_600_000) * 100) / 100;

// ── Session helpers ───────────────────────────────────────────────────────────
/** The day a session counts towards. */
export const sessionDate = (s: AttendanceSession) => toDateKey(new Date(s.clockInAt));

/** Elapsed time of a session; an active session is measured up to `now`. */
export const sessionDuration = (s: Pick<AttendanceSession, "clockInAt" | "clockOutAt">, now = Date.now()) =>
  Math.max(0, (s.clockOutAt ? Date.parse(s.clockOutAt) : now) - Date.parse(s.clockInAt));

/** Working time only: the gaps between sessions are not counted. */
export const totalDuration = (sessions: AttendanceSession[], now = Date.now()) =>
  sessions.reduce((sum, s) => sum + sessionDuration(s, now), 0);

/** Clock-out time, dated when it falls on a later day than the clock-in. */
export const formatClockOut = (s: AttendanceSession) => s.clockOutAt ? formatInstant(s.clockOutAt, sessionDate(s)) : "";

/** Clocking in after the scheduled start counts as late. */
export const statusForStart = (clockInAt: string, start: string): "present" | "late" =>
  toClock(new Date(clockInAt)) > start ? "late" : "present";

// ── Storage ───────────────────────────────────────────────────────────────────
const isInstant = (v: unknown): v is string => typeof v === "string" && !Number.isNaN(Date.parse(v));

/** Rebuilds a stored session, or null if it is invalid or belongs to someone else. */
function parseSession(v: unknown, { organisationId, employeeId }: AttendanceScope): AttendanceSession | null {
  const s = v as Partial<AttendanceSession> | null;
  if (!s || typeof s !== "object" || typeof s.id !== "string" || !s.id) return null;
  if (s.organisationId !== organisationId || s.employeeId !== employeeId) return null;
  if (!isInstant(s.clockInAt)) return null;
  const clockOutAt = s.clockOutAt ?? null;
  if (clockOutAt !== null && !isInstant(clockOutAt)) return null;
  const times = { clockInAt: s.clockInAt, clockOutAt };
  return {
    id: s.id, employeeId, organisationId, ...times,
    durationMs: clockOutAt ? sessionDuration(times) : null,
    status: clockOutAt ? "completed" : "active",
  };
}

/** Oldest first, with unique ids and at most one active session. */
function readSessions(scope: AttendanceScope): AttendanceSession[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(localStorage.getItem(storageKey(scope)) ?? "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const seen = new Set<string>();
  let hasActive = false;
  return parsed
    .map(v => parseSession(v, scope))
    .filter((s): s is AttendanceSession => s !== null)
    .sort((a, b) => Date.parse(a.clockInAt) - Date.parse(b.clockInAt))
    .filter(s => {
      if (seen.has(s.id) || (s.status === "active" && hasActive)) return false;
      seen.add(s.id);
      hasActive ||= s.status === "active";
      return true;
    });
}

function writeSessions(scope: AttendanceScope, sessions: AttendanceSession[]) {
  try {
    localStorage.setItem(storageKey(scope), JSON.stringify(sessions));
  } catch {
    throw new AttendanceError("Your attendance couldn't be saved. Please try again.", true);
  }
}

/** Runs read-then-write steps one tab at a time, where the browser supports it. */
async function exclusive<T>(scope: AttendanceScope, fn: () => T): Promise<T> {
  return navigator.locks ? await navigator.locks.request(storageKey(scope), async () => fn()) : fn();
}

// ── Reads ─────────────────────────────────────────────────────────────────────
const getSchedule = (employeeId: string): WorkSchedule | null => MOCK_SCHEDULES[employeeId] ?? null;

const findActive = (sessions: AttendanceSession[]) => sessions.find(s => s.status === "active") ?? null;

function toRecord(employeeId: string, date: string, sessions: AttendanceSession[], schedule: WorkSchedule): AttendanceRecord {
  const completed = sessions.filter(s => s.status === "completed");
  return {
    id: `sim-${employeeId}-${date}`, employeeId, date, sessions,
    hoursWorked: completed.length ? toHours(totalDuration(completed)) : undefined,
    status: statusForStart(sessions[0].clockInAt, schedule.start),
    notes: findActive(sessions) ? "In progress" : undefined,
  };
}

/** Totals for the month of `todayKey`. A day counts once one of its sessions is completed. */
function summarise(records: AttendanceRecord[], todayKey: string): AttendanceSummary {
  const done = records.filter(r => r.date.startsWith(todayKey.slice(0, 7)) && (r.status === "absent" || r.hoursWorked !== undefined));
  const count = (status: AttendanceRecord["status"]) => done.filter(r => r.status === status).length;
  const worked = done.filter(r => r.hoursWorked !== undefined);
  const hours = worked.reduce((sum, r) => sum + (r.hoursWorked ?? 0), 0);
  return {
    totalDays: done.length,
    present: count("present"), absent: count("absent"), late: count("late"),
    halfDay: count("half_day"), remote: count("remote"), onLeave: count("on_leave"),
    attendanceRate: done.length ? Math.round((worked.length / done.length) * 100) : 0,
    avgHoursPerDay: worked.length ? Math.round((hours / worked.length) * 10) / 10 : 0,
  };
}

export function readAttendanceState(scope: AttendanceScope): AttendanceState {
  const schedule = getSchedule(scope.employeeId);
  const today = toDateKey(new Date());
  if (!schedule) return { schedule, today, active: null, workDate: today, sessions: [], records: [], summary: summarise([], today) };

  const all = readSessions(scope);
  const active = findActive(all);
  const workDate = active ? sessionDate(active) : today;

  const byDate = new Map<string, AttendanceSession[]>();
  for (const s of all) {
    const date = sessionDate(s);
    byDate.set(date, [...(byDate.get(date) ?? []), s]);
  }
  const records = [
    ...buildMockAttendance(scope, today).filter(r => !byDate.has(r.date)),
    ...[...byDate].map(([date, sessions]) => toRecord(scope.employeeId, date, sessions, schedule)),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return { schedule, today, active, workDate, sessions: byDate.get(workDate) ?? [], records, summary: summarise(records, today) };
}

// ── Actions ───────────────────────────────────────────────────────────────────
const newId = () => `ses-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export function startSession(scope: AttendanceScope): Promise<AttendanceSession> {
  return exclusive(scope, () => {
    if (!getSchedule(scope.employeeId)) throw new AttendanceError("You have not been assigned to a work schedule. Please contact your admin or HR.", false);

    // Read again at write time so a second tab cannot create a duplicate.
    const sessions = readSessions(scope);
    if (findActive(sessions)) throw new AttendanceError("You're already clocked in.", false);

    const session: AttendanceSession = {
      id: newId(), organisationId: scope.organisationId, employeeId: scope.employeeId,
      clockInAt: new Date().toISOString(), clockOutAt: null, durationMs: null, status: "active",
    };
    writeSessions(scope, [...sessions, session]);
    return session;
  });
}

/** Ends that specific session, so a confirmation left open in one tab cannot end a newer session. */
export function endSession(scope: AttendanceScope, sessionId: string): Promise<AttendanceSession> {
  return exclusive(scope, () => {
    const sessions = readSessions(scope);
    const active = findActive(sessions);
    if (!active || active.id !== sessionId) throw new AttendanceError("This session has already been clocked out.", false);

    const clockOutAt = new Date(Math.max(Date.now(), Date.parse(active.clockInAt))).toISOString();
    const closed: AttendanceSession = { ...active, clockOutAt, durationMs: sessionDuration({ ...active, clockOutAt }), status: "completed" };
    writeSessions(scope, sessions.map(s => (s === active ? closed : s)));
    return closed;
  });
}
