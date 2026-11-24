import React, { useState, useEffect } from "react";
import { Wallet, Eye, EyeOff, Download, ChevronRight } from "lucide-react";
import { PageHeader, Badge, Button, UnderlineTabs, Card, LoadingSpinner, EmptyState } from "../components/ui";
import { payrollService } from "../services/api";
import { useAuth } from "../store/AuthContext";
import type { PayrollRecord } from "../types";

type TabId = "payslip" | "history" | "sod" | "tax" | "pension";

export default function PayrollPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PayrollRecord | null>(null);
  const [tab, setTab] = useState<TabId>("payslip");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    payrollService.list(user.employeeId).then(r => { setRecords(r); setSelected(r[0] ?? null); }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;
  if (records.length === 0) return <EmptyState icon={Wallet} title="No payroll records" description="Your payslips will appear here once processed." />;

  const mask = (n: number) => hidden ? "₦ ••••••" : `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
      <PageHeader title="Payroll" description="View your payslips and salary information" actions={
        <Button variant="outline" size="sm" icon={<Download size={14} />}>Download PDF</Button>
      } />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Period sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pay Periods</h3>
          <div className="space-y-1">
            {records.map(r => (
              <button key={r.id} onClick={() => setSelected(r)} className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${selected?.id === r.id ? "bg-[#440F7C] text-white" : "hover:bg-muted text-foreground"}`}>
                <div className="font-medium">{r.period}</div>
                <div className={`text-xs mt-0.5 ${selected?.id === r.id ? "text-white/70" : "text-muted-foreground"}`}>{r.payDate}</div>
                {r.status === "paid" && <span className={`text-[10px] font-bold ${selected?.id === r.id ? "text-white/80" : "text-[#14532d]"}`}>PAID</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        {selected && (
          <div className="flex-1 min-w-0 space-y-5">
            <UnderlineTabs
              tabs={[
                { label: "Payslip", value: "payslip" },
                { label: "History", value: "history" },
                { label: "Salary on Demand", value: "sod" },
                { label: "Tax Relief", value: "tax" },
                { label: "Pension", value: "pension" },
              ]}
              active={tab}
              onChange={v => setTab(v as TabId)}
            />

            {tab === "payslip" && (
              <div className="space-y-4">
                {/* Net pay */}
                <Card className="bg-gradient-to-br from-[#440F7C] to-[#2d0a52] border-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm font-medium">Net Pay — {selected.period}</span>
                    <button onClick={() => setHidden(h => !h)} className="text-white/70 hover:text-white transition-colors p-1">
                      {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="text-3xl font-bold text-white mb-3">{mask(selected.netPay)}</div>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span>Pay Date: {selected.payDate}</span>
                    <Badge variant="success" className="!bg-white/20 !text-white">{selected.status}</Badge>
                  </div>
                </Card>

                {/* Earnings & Deductions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card noPadding>
                    <div className="px-5 py-3.5 border-b border-border font-semibold text-sm text-foreground">Earnings</div>
                    <div className="divide-y divide-border">
                      {selected.items.filter(i => i.type === "earning").map(item => (
                        <div key={item.label} className="px-5 py-3 flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-foreground">{mask(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3.5 border-t border-border flex justify-between text-sm font-bold">
                      <span>Gross Pay</span><span className="text-[#440F7C]">{mask(selected.grossPay)}</span>
                    </div>
                  </Card>
                  <Card noPadding>
                    <div className="px-5 py-3.5 border-b border-border font-semibold text-sm text-foreground">Deductions</div>
                    <div className="divide-y divide-border">
                      {selected.items.filter(i => i.type === "deduction").map(item => (
                        <div key={item.label} className="px-5 py-3 flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium text-destructive">- {mask(item.amount)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3.5 border-t border-border flex justify-between text-sm font-bold">
                      <span>Total Deductions</span>
                      <span className="text-destructive">- {mask(selected.items.filter(i => i.type === "deduction").reduce((s, i) => s + i.amount, 0))}</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {tab === "history" && (
              <div className="space-y-2">
                {records.map(r => (
                  <button key={r.id} onClick={() => { setSelected(r); setTab("payslip"); }} className="w-full flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-3.5 hover:border-[#440F7C]/40 transition-all text-left">
                    <Wallet size={18} className="text-[#440F7C] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{r.period}</div>
                      <div className="text-xs text-muted-foreground">Pay date: {r.payDate}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-foreground">{mask(r.netPay)}</div>
                      <Badge variant={r.status === "paid" ? "success" : "warning"}>{r.status}</Badge>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}

            {(tab === "sod" || tab === "tax" || tab === "pension") && (
              <div className="bg-muted/40 rounded-xl p-8 text-center text-sm text-muted-foreground">
                {tab === "sod" && "Salary on Demand lets you access a portion of your earned salary before payday. Contact HR to enable this feature."}
                {tab === "tax" && "Your tax relief calculations and declarations will appear here."}
                {tab === "pension" && "Your pension contributions and fund details will appear here."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
