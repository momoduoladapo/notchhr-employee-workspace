import React, { useRef, useState } from "react";
import { Clock, CheckCircle, XCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, StatCard, UnderlineTabs, SearchBar, Badge, Button, Alert, ConfirmDialog, EmptyState, LoadingSpinner } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { formatClockOut, formatDuration, formatInstant, sessionDuration, shiftDate, toHours, totalDuration } from "../services/attendanceSimulation";
import { useAuth } from "../store/AuthContext";
import { useAttendance, useNow } from "../store/useAttendance";
import type { AttendanceRecord, AttendanceSession, TableColumn } from "../types";

type TabId = "my" | "team" | "reports";

const STATUS_VARIANT: Record<string, "success" | "error" | "warning" | "info"> = {
  present: "success", absent: "error", late: "warning", half_day: "info", remote: "info",
};

const NONE = <span className="text-muted-foreground">—</span>;
const formatDate = (key: string) =>
  new Date(`${key}T00:00:00`).toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export default function AttendancePage() {
  const { user } = useAuth();
  return user ? <AttendanceView organisationId={user.organization.id} employeeId={user.id} /> : <LoadingSpinner />;
}

type SessionRow = AttendanceSession & { number: number };

const SESSION_COLUMNS: TableColumn<SessionRow>[] = [
  { key: "number", header: "Session", render: v => `Session ${v}` },
  { key: "clockInAt", header: "Clock In", render: v => formatInstant(String(v)) },
  { key: "clockOutAt", header: "Clock Out", render: (_, s) => s.clockOutAt ? formatClockOut(s) : NONE },
  { key: "durationMs", header: "Duration", render: (_, s) => <span className="tabular-nums">{formatDuration(s.durationMs ?? 0, s.status === "active")}</span> },
  { key: "status", header: "Status", render: v => v === "active" ? <Badge variant="success" dot>Active</Badge> : <Badge>Completed</Badge> },
];

/** Every session of one day, with the day's total working time. */
function DaySessions({ date, today, oldest, sessions, now, onSelect }: {
  date: string; today: string; oldest: string;
  sessions: AttendanceSession[]; now: number; onSelect: (date: string) => void;
}) {
  const rows = sessions.map((s, i) => ({ ...s, number: i + 1, durationMs: sessionDuration(s, now) }));
  const total = formatDuration(totalDuration(sessions, now), sessions.some(s => s.status === "active"));
  const crossesMidnight = sessions.some(s => s.clockOutAt && formatClockOut(s) !== formatInstant(s.clockOutAt));
  return (
    <section aria-label="Sessions" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{formatDate(date)}{date === today && " · Today"}</h3>
          <p className="text-xs text-muted-foreground">
            Total worked <span className="font-semibold text-foreground tabular-nums">{total}</span> · {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="xs" aria-label="Previous day" disabled={date <= oldest} onClick={() => onSelect(shiftDate(date, -1))} icon={<ChevronLeft size={14} />} />
          <Button variant="outline" size="xs" disabled={date === today} onClick={() => onSelect(today)}>Today</Button>
          <Button variant="outline" size="xs" aria-label="Next day" disabled={date >= today} onClick={() => onSelect(shiftDate(date, 1))} icon={<ChevronRight size={14} />} />
        </div>
      </div>
      <DataTable columns={SESSION_COLUMNS} data={rows} rowKey={s => s.id} pageSize={Math.max(1, rows.length)} emptyMessage="No sessions recorded on this day."
        className="@max-xl:[&_th]:px-1.5 @max-xl:[&_td]:px-1.5 @max-xl:[&_th]:whitespace-normal" />
      {crossesMidnight && <p className="text-xs text-muted-foreground">A session that passes midnight counts in full towards the day it started.</p>}
    </section>
  );
}

export function AttendanceView({ organisationId, employeeId }: { organisationId: string; employeeId: string }) {
  const { phase, active, sessions, workDate, today, records, summary, prompt, pending, clockIn, requestClockOut, confirm, dismissPrompt } = useAttendance({ organisationId, employeeId });
  const now = useNow(!!active);
  const [tab, setTab] = useState<TabId>("my");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<string | null>(null); // null follows the current working day
  const sessionsRef = useRef<HTMLDivElement>(null);

  const selected = picked ?? workDate;
  const selectedRecord = records.find(r => r.date === selected);
  const pickFromRecords = (date: string) => {
    setPicked(date);
    sessionsRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  // The day in progress shows its running total.
  const rows = records.map(r => active && r.date === workDate ? { ...r, hoursWorked: toHours(totalDuration(r.sessions, now)) } : r);
  const filtered = rows.filter(r => {
    if (!search) return true;
    return r.date.includes(search) || r.status.includes(search.toLowerCase());
  });

  const columns: TableColumn<AttendanceRecord>[] = [
    { key: "date", header: "Date", sortable: true, render: v => <button type="button" className="text-sm text-left hover:underline" title="Show this day's sessions">{formatDate(String(v))}</button> },
    { key: "clockIn", header: "First In", render: (_, r) => r.sessions[0] ? formatInstant(r.sessions[0].clockInAt) : NONE },
    { key: "clockOut", header: "Last Out", render: (_, r) => { const s = r.sessions.at(-1); return s?.clockOutAt ? formatClockOut(s) : NONE; } },
    { key: "sessions", header: "Sessions", render: (_, r) => r.sessions.length || NONE },
    { key: "hoursWorked", header: "Hours", sortable: true, render: v => v !== undefined ? <span className="tabular-nums">{`${v}h`}</span> : NONE },
    { key: "status", header: "Status", render: v => <Badge variant={STATUS_VARIANT[v as string] ?? "default"} dot>{String(v)}</Badge> },
    { key: "notes", header: "Note", render: v => v ? <span className="text-xs text-muted-foreground">{String(v)}</span> : NONE },
  ];

  if (phase === "no-schedule") return (
    <EmptyState icon={Clock} title="No attendance records yet" description="You have not been assigned to a work schedule. Please contact your admin or HR." />
  );

  const last = sessions.at(-1);
  const total = `${workDate === today ? "Total today" : `Total for ${formatDate(workDate)}`}: ${formatDuration(totalDuration(sessions, now), !!active)}`;
  const status = active
    ? `Session ${sessions.length} — clocked in at ${formatInstant(active.clockInAt, today)}, ${formatDuration(sessionDuration(active, now), true)} so far. ${total}.`
    : last?.clockOutAt
      ? `Clocked out at ${formatInstant(last.clockOutAt, today)}. ${total} across ${sessions.length} ${sessions.length === 1 ? "session" : "sessions"}.`
      : "You haven't clocked in today.";
  const pageError = prompt?.surface === "page" ? prompt.error : undefined;

  return (
    <>
    <div className="space-y-6 @container">
      <PageHeader
        title="Attendance"
        description="Track your attendance and working hours"
        actions={
          <Button
            variant={active ? "danger" : "primary"}
            onClick={() => active ? requestClockOut("page") : void clockIn("page")}
            loading={pending !== null}
            icon={active ? <XCircle size={16} /> : <CheckCircle size={16} />}
          >
            {active ? "Clock Out" : "Clock In"}
          </Button>
        }
      />

      <p className="text-sm font-medium text-foreground tabular-nums">{status}</p>

      {pageError && (
        <div role="alert">
          <Alert variant="error" title={prompt?.action === "clock-in" ? "Couldn't clock in" : "Couldn't clock out"} onClose={dismissPrompt} className="dark:bg-[#3d1e1e] dark:[&>svg]:text-[#f87171]">
            {pageError.message}{" "}
            {pageError.retryable && <button type="button" onClick={confirm} className="text-sm font-medium underline">Try again</button>}
          </Alert>
        </div>
      )}

      <div ref={sessionsRef} className="scroll-mt-5">
        <DaySessions date={selected} today={today} oldest={records.at(-1)?.date ?? today} sessions={selectedRecord?.sessions ?? []} now={now} onSelect={d => setPicked(d === workDate ? null : d)} />
      </div>

      <div className="grid grid-cols-2 @3xl:grid-cols-4 gap-4">
        <StatCard label="Present" value={summary.present} sub="This month" icon={CheckCircle} iconBg="bg-[#f0fdf4]" />
        <StatCard label="Absent" value={summary.absent} sub="This month" icon={XCircle} iconBg="bg-[#fef2f2]" />
        <StatCard label="Late" value={summary.late} sub="This month" icon={AlertTriangle} iconBg="bg-[#fffbeb]" />
        <StatCard label="Avg Hours/Day" value={`${summary.avgHoursPerDay}h`} sub="This month" icon={Clock} iconBg="bg-primary/10" />
      </div>

      <div className="space-y-4">
        <UnderlineTabs
          tabs={[
            { label: "My Records", value: "my" },
            { label: "Team Overview", value: "team" },
            { label: "Reports", value: "reports" },
          ]}
          active={tab}
          onChange={v => setTab(v as TabId)}
          className="dark:[&>.border-\[\#440F7C\]]:text-foreground dark:[&>.border-\[\#440F7C\]]:border-foreground"
        />

        {tab === "my" && (
          <>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by date or status…" className="max-w-xs" />
            <DataTable
              columns={columns}
              data={filtered}
              rowKey={r => r.id}
              pageSize={8}
              onRowClick={r => pickFromRecords(r.date)}
              selectedIds={new Set(selectedRecord && [selectedRecord.id])}
              emptyMessage="No attendance records found."
            />
          </>
        )}

        {tab === "team" && (
          <div className="bg-muted/40 rounded-xl p-8 text-center text-sm text-muted-foreground">
            Team attendance view is available to managers and HR administrators.
          </div>
        )}

        {tab === "reports" && (
          <div className="bg-muted/40 rounded-xl p-8 text-center text-sm text-muted-foreground">
            Export monthly attendance reports in PDF or Excel format.
            <div className="mt-3"><Button variant="outline" size="sm" disabled>Download Report</Button></div>
          </div>
        )}
      </div>
    </div>

    <ConfirmDialog
      open={prompt?.surface === "page" && prompt.action === "clock-out" && !prompt.error}
      onClose={dismissPrompt}
      onConfirm={confirm}
      title="Clock out now?"
      description={`${status} You can clock in again later.`}
      confirmLabel="Clock Out"
      loading={pending !== null}
    />
    </>
  );
}
