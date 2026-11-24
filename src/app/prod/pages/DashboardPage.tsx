import React, { useState, useEffect } from "react";
import { Clock, Users, Calendar, TrendingUp, BookOpen, ChevronRight, CheckCircle, Bell, Play } from "lucide-react";
import { Card, StatCard, Badge, Button, LoadingSpinner, ConfirmDialog } from "../components/ui";
import { useAuth } from "../store/AuthContext";
import { useAttendance } from "../store/useAttendance";
import { formatInstant } from "../services/attendanceSimulation";
import {
  leaveService, announcementService,
  eventService, learningService, employeeService,
} from "../services/api";
import type { LeaveBalance, Announcement, CompanyEvent, Course, Employee } from "../types";

export default function DashboardPage() {
  const { user } = useAuth();
  const attendance = useAttendance({ organisationId: user?.organization.id ?? "", employeeId: user?.id ?? "" });
  const { phase, active, sessions, today, summary, prompt, pending } = attendance;
  const lastClockOut = sessions.at(-1)?.clockOutAt;
  const [now, setNow] = useState(new Date());

  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<CompanyEvent[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [team, setTeam] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      leaveService.getBalances(user.employeeId),
      announcementService.list(),
      eventService.list(),
      learningService.list(user.employeeId),
      employeeService.list({ department: user.departmentId }),
    ]).then(([b, a, e, c, t]) => {
      setBalances(b); setAnnouncements(a);
      setEvents(e.slice(0, 4)); setCourses(c); setTeam(t.slice(0, 5));
    }).finally(() => setLoading(false));
  }, [user]);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const timeStr = now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" });

  const mandatory = courses.filter(c => c.mandatory && c.status !== "completed");
  const overdue = courses.filter(c => c.status === "overdue");

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header + clock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{greeting}, {user?.firstName} 👋</h2>
          <p className="text-sm text-muted-foreground">{dateStr}</p>
        </div>
        {/* Clock widget */}
        <Card className="flex items-center gap-4 !p-4 min-w-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground tabular-nums">{timeStr}</div>
            {active && (
              <div className="text-xs text-muted-foreground">Clocked in at {formatInstant(active.clockInAt, today)}</div>
            )}
            {!active && lastClockOut && (
              <div className="text-xs text-muted-foreground">Clocked out at {formatInstant(lastClockOut, today)}</div>
            )}
            {prompt?.error && <div className="text-xs text-destructive" role="alert">{prompt.error.message}</div>}
          </div>
          {phase !== "no-schedule" && (
            <Button
              variant={phase === "clocked-in" ? "danger" : "primary"}
              size="sm"
              onClick={() => phase === "idle" ? attendance.clockIn("page") : attendance.requestClockOut("page")}
              loading={pending !== null}
              icon={phase === "clocked-in" ? <CheckCircle size={14} /> : <Play size={14} />}
            >
              {phase === "clocked-in" ? "Clock Out" : "Clock In"}
            </Button>
          )}
        </Card>
        <ConfirmDialog
          open={prompt?.surface === "page" && prompt.action === "clock-out" && !prompt.error}
          onClose={attendance.dismissPrompt}
          onConfirm={attendance.confirm}
          title="Clock out now?"
          description="You can clock in again later."
          confirmLabel="Clock Out"
          loading={pending !== null}
        />
      </div>

      {/* Stats */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Present Days" value={summary.present} sub="This month" icon={CheckCircle} iconBg="bg-[#f0fdf4]" trend={{ value: 4, positive: true }} />
          <StatCard label="Absent Days" value={summary.absent} sub="This month" icon={Calendar} iconBg="bg-[#fef2f2]" />
          <StatCard label="Late Arrivals" value={summary.late} sub="This month" icon={Clock} iconBg="bg-[#fffbeb]" />
          <StatCard label="Leave Balance" value={balances.find(b => b.type === "Annual")?.remaining ?? 0} sub="Annual leave days" icon={TrendingUp} iconBg="bg-primary/10" />
        </div>
      )}

      {/* Overdue course warning */}
      {overdue.length > 0 && (
        <div className="bg-[#fffbeb] border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <BookOpen size={16} className="text-yellow-600 flex-shrink-0" />
          <p className="text-sm text-yellow-800 flex-1">You have {overdue.length} overdue course{overdue.length > 1 ? "s" : ""}. Complete them to avoid compliance issues.</p>
          <Button variant="outline" size="xs" className="flex-shrink-0">View</Button>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <Card className="lg:col-span-2" noPadding>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Bell size={16} className="text-[#440F7C]" />Announcements</h3>
            <button className="text-xs text-[#440F7C] hover:underline flex items-center gap-1">View all <ChevronRight size={12} /></button>
          </div>
          <div className="divide-y divide-border">
            {announcements.slice(0, 4).map(a => (
              <div key={a.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.body}</div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <Badge variant={a.priority === "urgent" ? "error" : a.priority === "high" ? "warning" : "default"}>{a.priority}</Badge>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{new Date(a.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming events */}
        <Card noPadding>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Calendar size={16} className="text-[#440F7C]" />Upcoming</h3>
          </div>
          <div className="divide-y divide-border">
            {events.slice(0, 4).map(ev => {
              const d = new Date(ev.startDate);
              return (
                <div key={ev.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-[#440F7C] uppercase">{d.toLocaleDateString("en-NG", { month: "short" })}</span>
                    <span className="text-sm font-bold text-[#440F7C] leading-none">{d.getDate()}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{ev.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{ev.location || ev.type}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave balances */}
        <Card noPadding>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Leave Balances</h3>
          </div>
          <div className="p-5 space-y-3">
            {balances.map(b => (
              <div key={b.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{b.type}</span>
                  <span className="text-muted-foreground">{b.remaining}/{b.total} days</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#440F7C] transition-all" style={{ width: `${(b.remaining / b.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* My team */}
        <Card noPadding>
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Users size={16} className="text-[#440F7C]" />
            <h3 className="font-semibold text-foreground">My Team</h3>
          </div>
          <div className="divide-y divide-border">
            {team.map(emp => (
              <div key={emp.id} className="px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#440F7C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {emp.firstName[0]}{emp.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{emp.firstName} {emp.lastName}</div>
                  <div className="text-xs text-muted-foreground truncate">{emp.jobTitle}</div>
                </div>
                <Badge variant={emp.status === "active" ? "success" : "default"} dot>{emp.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
