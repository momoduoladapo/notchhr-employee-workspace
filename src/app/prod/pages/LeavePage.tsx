import React, { useState, useEffect } from "react";
import { Plus, Check, X } from "lucide-react";
import {
  PageHeader, Badge, Button, Modal, ConfirmDialog, UnderlineTabs,
  Input, Select, Alert, EmptyState, LoadingSpinner, ProgressBar, Card,
} from "../components/ui";
import { DataTable } from "../components/DataTable";
import { leaveService } from "../services/api";
import { useAuth } from "../store/AuthContext";
import type { LeaveBalance, LeaveRequest, TableColumn } from "../types";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

type TabId = "my" | "approvals" | "calendar";

const STATUS_V: Record<string, "success" | "warning" | "error" | "default"> = {
  approved: "success", pending: "warning", rejected: "error", cancelled: "default",
};

export default function LeavePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<TabId>("my");
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [applyOpen, setApplyOpen] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [form, setForm] = useState({ type: "", startDate: "", endDate: "", reason: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      leaveService.getBalances(user.employeeId),
      leaveService.list({ employeeId: user.employeeId }),
    ]).then(([b, r]) => { setBalances(b); setRequests(r); }).finally(() => setLoading(false));
  }, [user]);

  function validateForm() {
    const errs: Record<string, string> = {};
    if (!form.type) errs.type = "Select leave type";
    if (!form.startDate) errs.startDate = "Start date is required";
    if (!form.endDate) errs.endDate = "End date is required";
    if (form.startDate && form.endDate && form.startDate > form.endDate) errs.endDate = "End must be after start";
    if (!form.reason.trim()) errs.reason = "Reason is required";
    return errs;
  }

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setApplyLoading(true);
    try {
      await leaveService.apply({ ...form, employeeId: user?.employeeId, status: "pending" });
      toast.success("Leave request submitted successfully");
      setApplyOpen(false);
      setForm({ type: "", startDate: "", endDate: "", reason: "" });
      setFormErrors({});
      const r = await leaveService.list({ employeeId: user?.employeeId });
      setRequests(r);
    } finally { setApplyLoading(false); }
  }

  async function handleCancel() {
    if (!cancelId) return;
    setCancelLoading(true);
    try {
      await leaveService.cancel(cancelId);
      toast.success("Leave request cancelled");
      setRequests(r => r.map(x => x.id === cancelId ? { ...x, status: "cancelled" as const } : x));
      setCancelId(null);
    } finally { setCancelLoading(false); }
  }

  const columns: TableColumn<LeaveRequest>[] = [
    { key: "leaveType", header: "Type", sortable: true },
    { key: "startDate", header: "From", sortable: true, render: v => new Date(v as string).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "endDate", header: "To", sortable: true, render: v => new Date(v as string).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "days", header: "Days", sortable: true },
    { key: "status", header: "Status", render: v => <Badge variant={STATUS_V[v as string] ?? "default"} dot>{String(v)}</Badge> },
    {
      key: "id", header: "Actions",
      render: (_, row) => row.status === "pending" ? (
        <Button variant="ghost" size="xs" className="text-destructive hover:bg-destructive/10" onClick={e => { e.stopPropagation(); setCancelId(row.id); }}>
          Cancel
        </Button>
      ) : null,
    },
  ];

  const pendingApprovals = requests.filter(r => r.status === "pending");

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Apply for leave and track your requests"
        actions={<Button icon={<Plus size={16} />} onClick={() => setApplyOpen(true)}>Apply Leave</Button>}
      />

      {/* Balances */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {balances.map(b => (
          <Card key={b.id} className="!p-4">
            <div className="text-xs text-muted-foreground mb-1 font-medium">{b.type}</div>
            <div className="text-xl font-bold text-foreground mb-2">{b.remaining} <span className="text-sm font-normal text-muted-foreground">/ {b.total}</span></div>
            <ProgressBar value={b.remaining} max={b.total} />
          </Card>
        ))}
      </div>

      <UnderlineTabs
        tabs={[
          { label: "My Requests", value: "my", count: requests.length },
          { label: "Pending Approvals", value: "approvals", count: pendingApprovals.length },
          { label: "Team Calendar", value: "calendar" },
        ]}
        active={tab}
        onChange={v => setTab(v as TabId)}
      />

      {tab === "my" && (
        requests.length === 0
          ? <EmptyState icon={Calendar} title="No leave requests" description="Apply for leave using the button above." action={<Button size="sm" onClick={() => setApplyOpen(true)}>Apply Leave</Button>} />
          : <DataTable columns={columns} data={requests} rowKey={r => r.id} pageSize={8} />
      )}

      {tab === "approvals" && (
        pendingApprovals.length === 0
          ? <EmptyState icon={Check} title="No pending approvals" description="All leave requests have been reviewed." />
          : (
            <div className="space-y-3">
              {pendingApprovals.map(r => (
                <Card key={r.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">{r.employeeId}</div>
                    <div className="text-xs text-muted-foreground">{r.leaveType} · {r.days} days · {r.startDate} to {r.endDate}</div>
                    {r.reason && <div className="text-xs text-muted-foreground mt-0.5 italic">"{r.reason}"</div>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="secondary" size="xs" icon={<Check size={12} />} onClick={async () => { await leaveService.approve(r.id); toast.success("Approved"); setRequests(rs => rs.map(x => x.id === r.id ? { ...x, status: "approved" as const } : x)); }}>Approve</Button>
                    <Button variant="danger" size="xs" icon={<X size={12} />} onClick={async () => { await leaveService.reject(r.id, ""); toast.error("Rejected"); setRequests(rs => rs.map(x => x.id === r.id ? { ...x, status: "rejected" as const } : x)); }}>Reject</Button>
                  </div>
                </Card>
              ))}
            </div>
          )
      )}

      {tab === "calendar" && (
        <div className="bg-muted/40 rounded-xl p-8 text-center text-sm text-muted-foreground">Team leave calendar view coming soon.</div>
      )}

      {/* Apply Modal */}
      <Modal open={applyOpen} onClose={() => { setApplyOpen(false); setFormErrors({}); }} title="Apply for Leave" size="md">
        <form onSubmit={handleApply} className="space-y-4">
          <Select
            label="Leave Type" required
            value={form.type} onChange={e => { setForm(f => ({ ...f, type: e.target.value })); setFormErrors(fe => ({ ...fe, type: "" })); }}
            options={[{ label: "Select type…", value: "" }, ...balances.map(b => ({ label: b.type, value: b.type }))]}
            error={formErrors.type}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" required value={form.startDate} onChange={e => { setForm(f => ({ ...f, startDate: e.target.value })); setFormErrors(fe => ({ ...fe, startDate: "" })); }} error={formErrors.startDate} />
            <Input label="End Date" type="date" required value={form.endDate} onChange={e => { setForm(f => ({ ...f, endDate: e.target.value })); setFormErrors(fe => ({ ...fe, endDate: "" })); }} error={formErrors.endDate} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Reason <span className="text-[#D62196]">*</span></label>
            <textarea
              value={form.reason}
              onChange={e => { setForm(f => ({ ...f, reason: e.target.value })); setFormErrors(fe => ({ ...fe, reason: "" })); }}
              rows={3}
              placeholder="Briefly describe the reason for your leave…"
              className={`w-full border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all ${formErrors.reason ? "border-destructive" : "border-border"} bg-input-background text-foreground`}
            />
            {formErrors.reason && <span className="text-xs text-destructive mt-1 block">{formErrors.reason}</span>}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => { setApplyOpen(false); setFormErrors({}); }}>Cancel</Button>
            <Button type="submit" size="sm" loading={applyLoading}>Submit Request</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!cancelId} onClose={() => setCancelId(null)} onConfirm={handleCancel}
        title="Cancel Leave Request" description="Are you sure you want to cancel this leave request? This action cannot be undone."
        confirmLabel="Yes, Cancel" cancelLabel="Keep Request" destructive loading={cancelLoading}
      />
    </div>
  );
}
