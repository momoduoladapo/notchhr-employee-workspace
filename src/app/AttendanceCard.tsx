import { useEffect, useRef } from "react";
import { Clock, LogIn, Timer, CheckCircle, CalendarClock, Coffee, ChevronRight, Loader2 } from "lucide-react";
import { C, S, type ScenarioId } from "./tokens";
import { ATTENDANCE_EMPLOYEE_ID } from "./data";
import { Card, EmptyCard } from "./shared";
import { useAttendance, useNow } from "./prod/store/useAttendance";
import { formatClock, formatDuration, formatInstant, sessionDuration, statusForStart, totalDuration } from "./prod/services/attendanceSimulation";

type Attendance = ReturnType<typeof useAttendance>;

const SHIFT_START = "08:00";
const STATUS_LABEL = { present: "Present", late: "Late" } as const;

/**
 * Compact clock action that sits inside an information row. The negative margin
 * keeps it out of the row's height calculation, so the card never grows.
 */
function ClockButton({ attendance }: { attendance: Attendance }) {
  const { phase, pending, clockIn, requestClockOut } = attendance;
  if (phase === "no-schedule") return null;
  const isIn = phase === "clocked-in";
  return (
    <button
      type="button"
      onClick={() => isIn ? requestClockOut("card") : void clockIn("card")}
      disabled={pending !== null}
      className="relative inline-flex items-center justify-center gap-1 flex-shrink-0 px-2.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-opacity hover:opacity-85 disabled:opacity-60 after:absolute after:-inset-x-2 after:-inset-y-2.5"
      style={{
        height: 22, margin: "-4px 0", lineHeight: 1,
        background: isIn ? C.magenta100 : C.purple,
        color: isIn ? C.magentaIcon : "white",
      }}
    >
      {pending && <Loader2 size={10} className="animate-spin" />}
      {pending === "clock-in" ? "Clocking in…" : pending === "clock-out" ? "Clocking out…" : isIn ? "Clock Out" : "Clock In"}
    </button>
  );
}

/** Day total across all sessions. Live while clocked in; only this element re-renders every second. */
function HoursWorked({ attendance: { active, sessions } }: { attendance: Attendance }) {
  const now = useNow(!!active);
  return (
    <>
      {active && sessions.length > 1 && (
        <span className="text-[9px] font-medium tabular-nums whitespace-nowrap" style={{ color: C.tertiary400 }}>
          Session {sessions.length}: {formatDuration(sessionDuration(active, now))}
        </span>
      )}
      <span className="tabular-nums whitespace-nowrap">{formatDuration(totalDuration(sessions, now), !!active)}</span>
    </>
  );
}

/** Clock-out confirmation or error, overlaid on the card so its size is unaffected. */
function CardPrompt({ attendance }: { attendance: Attendance }) {
  const { prompt, active, today, pending, confirm, dismissPrompt } = attendance;
  const ref = useRef<HTMLDivElement>(null);
  const now = useNow(prompt?.action === "clock-out" && !prompt.error);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => { if (previous?.isConnected) previous.focus(); };
  }, []);

  if (!prompt) return null;
  const { action, error } = prompt;
  const canConfirm = !error || error.retryable;

  return (
    <div className="absolute inset-0 z-10 flex items-end rounded-2xl p-3" style={{ background: "rgba(30,25,46,0.38)" }} onClick={dismissPrompt}>
      <div
        ref={ref}
        role="alertdialog"
        aria-label={error ? "Attendance error" : "Confirm clock out"}
        className="w-full rounded-2xl border border-border bg-card p-3.5 shadow-lg"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => { if (e.key === "Escape") { e.stopPropagation(); dismissPrompt(); } }}
      >
        <div className="text-[12px] font-semibold mb-1" style={{ color: C.tertiary }}>
          {!error ? "Clock out now?" : action === "clock-in" ? "Couldn't clock in" : "Couldn't clock out"}
        </div>
        {error ? (
          <div role="alert" className="text-[10px] leading-relaxed mb-3" style={{ color: S.error }}>{error.message}</div>
        ) : active && (
          <div className="text-[10px] leading-relaxed mb-3" style={{ color: C.tertiary }}>
            Clocked in at {formatInstant(active.clockInAt, today)} · <span className="font-semibold tabular-nums">{formatDuration(sessionDuration(active, now), true)}</span> worked.
            <br />You can clock in again later.
          </div>
        )}
        <div className="flex gap-2">
          <button type="button" onClick={dismissPrompt} disabled={pending !== null}
            className="flex-1 py-1.5 rounded-xl border border-border text-[11px] font-medium disabled:opacity-60" style={{ color: C.tertiary }}>
            {error ? "Close" : "Cancel"}
          </button>
          {canConfirm && (
            <button type="button" onClick={confirm} disabled={pending !== null}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-semibold text-white disabled:opacity-60" style={{ background: C.purple }}>
              {pending && <Loader2 size={11} className="animate-spin" />}
              {pending ? "Clocking out…" : error ? "Try again" : "Clock Out"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AttendanceCard({ scenario, organisationId, view, onViewChange, onViewAttendance }: {
  scenario: ScenarioId;
  organisationId: string;
  view: number; // 0 = regular, 1 = shift
  onViewChange: (view: number) => void;
  onViewAttendance: () => void;
}) {
  const attendance = useAttendance({ organisationId, employeeId: ATTENDANCE_EMPLOYEE_ID[scenario] });
  const { active, sessions, workDate, today, schedule, records, prompt } = attendance;

  // The active session, or when the latest one ended.
  const last = sessions.at(-1);
  const clockedAt = active ? formatInstant(active.clockInAt, today)
    : last?.clockOutAt ? formatInstant(last.clockOutAt, today) : "Not yet";
  const verb = last && !active ? "out" : "in";
  const clockedLabel = view === 0 ? `Clocked ${verb} at` : `Clocked ${verb === "in" ? "In" : "Out"}`;

  // Punctuality is set by the day's first session. Shift compares against the shift's own start.
  const start = view === 0 ? schedule?.start : SHIFT_START;
  const status = sessions[0] && start ? statusForStart(sessions[0].clockInAt, start) : null;
  const statusText = !status ? "Not clocked in"
    : `${STATUS_LABEL[status]} · ${active ? "Clocked in" : "Clocked out"}`;
  const statusStyle = !status ? { background: C.tertiary100, color: C.tertiary }
    : status === "present" ? { background: S.success50, color: S.success }
    : { background: S.warning50, color: S.warning };

  return (
    <Card className="relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Attendance</span>
        {scenario === 1 ? (
          <div className="flex gap-0">
            {(["Regular", "Shift"] as const).map((tab, i) => (
              <button
                key={tab}
                onClick={() => onViewChange(i)}
                className="pb-1 ml-4 text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                style={{ color: view === i ? C.magentaIcon : C.tertiary300, borderBottom: view === i ? `2px solid ${C.magenta}` : "2px solid transparent" }}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          <button onClick={onViewAttendance} className="text-[11px] font-semibold" style={{ color: C.magentaIcon }}>View Attendance</button>
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
          {view === 0 ? (
          /* ── Standard view ─────────────────────────────────────────── */
          <div className="flex-1 flex flex-col min-h-0">
            {[
              { icon: LogIn,        label: clockedLabel,       value: clockedAt,           pill: false, action: true },
              { icon: Timer,        label: "Hours Worked",     value: <HoursWorked attendance={attendance} />, pill: false },
              { icon: CheckCircle,  label: "Attendance Status",value: statusText,          pill: true  },
              { icon: CalendarClock,label: "Today's Schedule", value: schedule ? `${formatClock(schedule.start)} – ${formatClock(schedule.end)}` : "—", pill: false },
              { icon: Coffee,       label: "Break Remaining",  value: "45 mins",           pill: false },
            ].map((row, i) => (
              <div key={i} className="flex-1 flex justify-between items-center py-1 border-b border-border last:border-0 min-h-0">
                <div className="flex items-center gap-2 min-w-0">
                  <row.icon size={13} style={{ color: C.tertiary, flexShrink: 0 }} />
                  <span className="text-[11px] font-medium truncate" style={{ color: C.tertiary400 }}>{row.label}</span>
                </div>
                {row.pill
                  ? <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0" style={statusStyle}>{row.value}</span>
                  : <span className="flex items-center gap-2 text-[12px] font-semibold flex-shrink-0 ml-2" style={{ color: C.tertiary }}>
                      {row.value}
                      {row.action && <ClockButton attendance={attendance} />}
                    </span>}
              </div>
            ))}
          </div>
          ) : (
          /* ── Shift / rotational view ────────────────────────────────── */
          <div className="flex-1 flex flex-col min-h-0">
            {[
              { icon: CalendarClock, label: "Today's Shift",   value: "Morning Shift",     pill: false },
              { icon: Clock,         label: "Scheduled",       value: "8:00 AM — 4:00 PM", pill: false },
              { icon: LogIn,         label: clockedLabel,      value: clockedAt,           pill: false, action: true },
              { icon: CheckCircle,   label: "Shift Status",    value: statusText,          pill: true  },
              { icon: ChevronRight,  label: "Next Rotation",   value: "Tomorrow · 4 PM – 12 AM", pill: false },
            ].map((row, i) => (
              <div key={i} className="flex-1 flex justify-between items-center py-1 border-b border-border last:border-0 min-h-0">
                <div className="flex items-center gap-2 min-w-0">
                  <row.icon size={13} style={{ color: C.tertiary, flexShrink: 0 }} />
                  <span className="text-[11px] font-medium" style={{ color: C.tertiary400 }}>{row.label}</span>
                </div>
                {row.pill
                  ? <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0" style={statusStyle}>{row.value}</span>
                  : <span className="flex items-center gap-2 text-[11px] font-semibold flex-shrink-0 ml-2" style={{ color: C.tertiary }}>
                      {row.value}
                      {row.action && <ClockButton attendance={attendance} />}
                    </span>}
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
              const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              const recorded = isToday && workDate === key && status ? status : records.find(r => r.date === key)?.status;
              const dayStatus = (isToday || isPast) && recorded ? (recorded === "late" ? "late" : "present") : "upcoming";
              return {
                day: d.toLocaleDateString("en-US", { weekday: "short", timeZone: WAT }).slice(0, 3),
                label: d.toLocaleDateString("en-US", { day: "numeric", timeZone: WAT }),
                status: dayStatus,
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
      {prompt?.surface === "card" && <CardPrompt key={prompt.error ? "error" : "confirm"} attendance={attendance} />}
    </Card>
  );
}
