import React, { useState, useEffect } from "react";
import { Grid, List, Users, Mail, Phone, MapPin } from "lucide-react";
import { PageHeader, SearchBar, Badge, Button, Drawer, LoadingSpinner, EmptyState } from "../components/ui";
import { employeeService } from "../services/api";
import type { Employee, Department } from "../types";

const STATUS_V: Record<string, "success" | "error" | "warning" | "default"> = {
  active: "success", inactive: "error", suspended: "warning",
};

export default function DirectoryPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Employee | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([employeeService.list(), employeeService.departments()])
      .then(([emps, depts]) => { setEmployees(emps); setDepartments(depts); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${e.firstName} ${e.lastName} ${e.email} ${e.jobTitle}`.toLowerCase().includes(q);
    const matchDept = dept === "all" || e.departmentId === dept;
    return matchSearch && matchDept;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader title="Employee Directory" description={`${employees.length} employees across ${departments.length} departments`} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search employees…" className="flex-1 max-w-sm" />
        <div className="flex items-center gap-2 flex-wrap">
          {[{ id: "all", name: "All" }, ...departments].map(d => (
            <button key={d.id} onClick={() => setDept(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${dept === d.id ? "bg-[#440F7C] text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {"name" in d ? d.name : d.id}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-[#440F7C] text-white" : "hover:bg-muted text-muted-foreground"}`}><Grid size={16} /></button>
          <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-[#440F7C] text-white" : "hover:bg-muted text-muted-foreground"}`}><List size={16} /></button>
        </div>
      </div>

      {filtered.length === 0
        ? <EmptyState icon={Users} title="No employees found" description="Try adjusting your search or department filter." />
        : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(emp => (
              <button key={emp.id} onClick={() => setSelected(emp)} className="text-left bg-card border border-border rounded-xl p-5 hover:border-[#440F7C]/40 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#440F7C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm truncate">{emp.firstName} {emp.lastName}</div>
                    <div className="text-xs text-muted-foreground truncate">{emp.jobTitle}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">{departments.find(d => d.id === emp.departmentId)?.name ?? emp.departmentId}</span>
                  <Badge variant={STATUS_V[emp.status] ?? "default"} dot>{emp.status}</Badge>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {filtered.map((emp, i) => (
              <button key={emp.id} onClick={() => setSelected(emp)} className={`w-full flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors text-left ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-[#440F7C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {emp.firstName[0]}{emp.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">{emp.firstName} {emp.lastName}</div>
                  <div className="text-xs text-muted-foreground">{emp.jobTitle}</div>
                </div>
                <div className="hidden sm:block text-xs text-muted-foreground flex-shrink-0">{departments.find(d => d.id === emp.departmentId)?.name}</div>
                <div className="hidden md:block text-xs text-muted-foreground flex-shrink-0">{emp.email}</div>
                <Badge variant={STATUS_V[emp.status] ?? "default"} dot>{emp.status}</Badge>
              </button>
            ))}
          </div>
        )
      }

      {/* Employee Detail Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Employee Details" width="w-96">
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center pb-5 border-b border-border">
              <div className="w-20 h-20 rounded-full bg-[#440F7C] flex items-center justify-center text-white text-2xl font-bold mb-3">
                {selected.firstName[0]}{selected.lastName[0]}
              </div>
              <h3 className="text-lg font-bold text-foreground">{selected.firstName} {selected.lastName}</h3>
              <p className="text-sm text-muted-foreground">{selected.jobTitle}</p>
              <div className="mt-2">
                <Badge variant={STATUS_V[selected.status] ?? "default"} dot>{selected.status}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <InfoRow icon={Mail} label="Email" value={selected.email} />
              {selected.phone && <InfoRow icon={Phone} label="Phone" value={selected.phone} />}
              <InfoRow icon={Users} label="Department" value={departments.find(d => d.id === selected.departmentId)?.name ?? selected.departmentId} />
              {selected.location && <InfoRow icon={MapPin} label="Location" value={selected.location} />}
            </div>

            <div className="pt-3 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Employee ID</span><span className="font-medium text-foreground">{selected.employeeId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Join Date</span><span className="font-medium text-foreground">{new Date(selected.joinDate).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</span></div>
              {selected.managerId && <div className="flex justify-between"><span className="text-muted-foreground">Manager</span><span className="font-medium text-foreground">{selected.managerId}</span></div>}
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" icon={<Mail size={14} />}>Send Email</Button>
              {selected.phone && <Button variant="secondary" size="sm" className="flex-1" icon={<Phone size={14} />}>Call</Button>}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-[#440F7C]" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
