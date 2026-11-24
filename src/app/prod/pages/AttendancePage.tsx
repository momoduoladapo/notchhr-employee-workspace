import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { PageHeader, StatCard, UnderlineTabs, SearchBar, Badge, Button, LoadingSpinner } from "../components/ui";
import { DataTable } from "../components/DataTable";
import { attendanceService } from "../services/api";
import { useAuth } from "../store/AuthContext";
import type { AttendanceRecord, AttendanceSummary, TableColumn } from "../types";
import { toast } from "sonner";

type TabId = "my" | "team" | "reports";

const STATUS_VARIANT: Record<string, "success" | "error" | "warning" | "default"> = {
  present: "success", absent: "error", late: "warning", "half-day": "info" as "default",
};

export default function AttendancePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<TabId>("my");
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [clockState, setClockState] = useState<"idle" | "clocked-in" | "done">("idle");
  const [clockLoading, setClockLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      attendanceService.getSummary(user.employeeId),
      attendanceService.list(user.employeeId),
    ]).then(([s, r]) => { setSummary(s); setRecords(r); }).finally(() => setLoading(false));
  }, [user]);

  const filtered = records.filter(r => {
    if (!search) return true;
    return r.date.includes(search) || r.status.includes(search.toLowerCase());
  });

  const columns: TableColumn<AttendanceRecord>[] = [
    { key: "date", header: "Date", sortable: true, render: v => new Date(v as string).toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) },
    { key: "checkIn", header: "Clock In", render: v => v ? String(v) : <span className="text-muted-foreground">—</span> },
    { key: "checkOut", header: "Clock Out", render: v => v ? String(v) : <span className="text-muted-foreground">—</span> },
    { key: "hoursWorked", header: "Hours", sortable: true, render: v => v ? `${v}h` : <span className="text-muted-foreground">—</span> },
    { key: "status", header: "Status", render: v => <Badge variant={STATUS_VARIANT[v as string] ?? "default"} dot>{String(v)}</Badge> },
    { key: "note", header: "Note", render: v => v ? <span className="text-xs text-muted-foreground">{String(v)}</span> : <span className="text-muted-foreground">—</span> },
  ];

  async function handleClock() {
    setClockLoading(true);
    try {
      if (clockState === "idle") {
        const r = await attendanceService.clockIn();
        toast.success(`Clocked in at ${r.time}`);
        setClockState("clocked-in");
      } else {
        const r = await attendanceService.clockOut();
        toast.success(`Clocked out at ${r.time} — ${r.hoursWorked}h worked`);
        setClockState("done");
      }
    } finally { setClockLoading(false); }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track your attendance and working hours"
        actions={
          clockState !== "done" ? (
            <Button
              variant={clockState === "clocked-in" ? "danger" : "primary"}
              onClick={handleClock}
              loading={clockLoading}
              icon={clockState === "clocked-in" ? <XCircle size={16} /> : <CheckCircle size={16} />}
            >
              {clockState === "clocked-in" ? "Clock Out" : "Clock In"}
            </Button>
          ) : <Badge variant="success" dot>Done for today</Badge>
        }
      />

      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Present" value={summary.presentDays} sub="This month" icon={CheckCircle} iconBg="bg-[#f0fdf4]" />
          <StatCard label="Absent" value={summary.absentDays} sub="This month" icon={XCircle} iconBg="bg-[#fef2f2]" />
          <StatCard label="Late" value={summary.lateDays} sub="This month" icon={AlertTriangle} iconBg="bg-[#fffbeb]" />
          <StatCard label="Avg Hours/Day" value={`${summary.avgHoursPerDay}h`} sub="This month" icon={Clock} iconBg="bg-primary/10" />
        </div>
      )}

      <div className="space-y-4">
        <UnderlineTabs
          tabs={[
            { label: "My Records", value: "my" },
            { label: "Team Overview", value: "team" },
            { label: "Reports", value: "reports" },
          ]}
          active={tab}
          onChange={v => setTab(v as TabId)}
        />

        {tab === "my" && (
          <>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by date or status…" className="max-w-xs" />
            <DataTable
              columns={columns}
              data={filtered}
              rowKey={r => r.id}
              pageSize={8}
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
            <div className="mt-3"><Button variant="outline" size="sm">Download Report</Button></div>
          </div>
        )}
      </div>
    </div>
  );
}
