import React, { useState } from "react";
import {
  Target, FileText, Info, Upload, CheckSquare,
  TrendingUp, Calendar, ChevronRight, GraduationCap, BookOpen,
  Star, User, Pencil, Briefcase, Award, DollarSign, Shield,
  Settings, Users, Video, Phone, MapPin, AlertCircle, Clock,
  CheckCircle, Timer, Activity, ChevronDown, Download, Flame,
} from "lucide-react";
import { toast } from "sonner";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { C, S, type ScenarioId, type PlanId } from "./tokens";
import {
  KPI_DATA, DOCS_DATA, DG_CASES, PERF_DATA, LEARNING_DATA, ENPS_DATA,
  ABOUT_ME_DEFAULTS, COMPETENCY_DATA, WORK_HISTORY_DATA, ACADEMIC_HIST,
  PENSION_DATA, TAX_DATA, EMPLOYMENT_DETAILS_DATA, EMPLOYEE,
  RECRUITMENT_DATA, TRACKER_DATA,
} from "./data";
import { Card, SecHead, EmptyCard, Av } from "./shared";

export function KPICard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const data = KPI_DATA[scenario];
  return (
    <Card className="h-full flex flex-col">
      <SecHead title="KPI Summary" link="View Goals" />
      {!data ? (
        <EmptyCard icon={Target} title="No KPIs assigned yet" body="Your manager will assign KPI targets once onboarding is confirmed." cta="View KPI Framework" />
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          {data.map(item => (
            <div key={item.label} className="flex-1 flex items-center justify-between border-b border-border last:border-0 min-h-0">
              <span className="text-[11px]" style={{ color: C.tertiary }}>{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold" style={{ color: C.tertiary }}>{item.value}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: item.good === null ? S.warning50 : item.good ? S.success50 : S.error50,
                    color: item.good === null ? S.warning : item.good ? S.success : S.error,
                  }}>
                  {item.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function DocumentsCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const docs = DOCS_DATA[scenario];
  return (
    <Card className="h-full flex flex-col">
      <SecHead title="Document Hub" link={scenario === 1 ? "View All" : undefined} />
      {scenario === 2 && (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl mb-3 flex-shrink-0" style={{ background: S.info50 }}>
          <Info size={13} style={{ color: S.info, flexShrink: 0 }} />
          <span className="text-[10px]" style={{ color: S.info }}>Your onboarding documents are being prepared by HR and will appear here shortly.</span>
        </div>
      )}
      {!docs && (
        <EmptyCard icon={FileText} title="No documents yet" body="Your documents will appear here once your HR setup is complete." />
      )}
      <div className="flex-1 flex flex-col min-h-0">
        {docs?.map(doc => (
          <div key={doc.name} className="flex-1 flex items-center gap-3 border-b border-border last:border-0 min-h-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
              <FileText size={14} style={{ color: C.purpleIcon }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold truncate" style={{ color: C.tertiary }}>{doc.name}</div>
              <div className="text-[10px]" style={{ color: C.tertiary }}>{doc.type} · {doc.date}</div>
            </div>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: doc.status === "approved" ? S.success50 : S.warning50,
                color: doc.status === "approved" ? S.success : S.warning,
              }}>
              {doc.status === "approved" ? "Approved" : "Pending"}
            </span>
          </div>
        ))}
      </div>
      {scenario !== 2 && (
        <button className="mt-2 flex-shrink-0 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold"
          style={{ background: C.purple100, color: C.tertiary }}>
          <Upload size={12} /> Upload Document
        </button>
      )}
    </Card>
  );
}

export function FigmaTable({ cols, rows, fontSize = 14 }: {
  cols: Array<{ header: string; flex?: number; width?: number; align?: "left" | "right"; mono?: boolean }>;
  rows: React.ReactNode[][];
  fontSize?: number;
}) {
  return (
    <div className="bg-card relative rounded-[8px] w-full">
      <div className="flex flex-col overflow-clip rounded-[inherit]">
        <div className="flex items-center px-4 gap-2 shrink-0 w-full"
          style={{ background: "rgba(68,15,124,0.02)", height: 45, borderBottom: "1px solid #e4e2ee" }}>
          {cols.map((col, i) => (
            <span key={i} style={{
              flex: col.flex != null ? `${col.flex} ${col.flex} 0` : undefined,
              width:    col.flex == null ? col.width : undefined,
              minWidth: col.flex != null ? 0 : col.width,
              textAlign: col.align ?? "left",
              color: "#5e5873", fontSize, lineHeight: "20px",
              fontFamily: "'Poppins', sans-serif", fontWeight: 600,
              whiteSpace: "nowrap",
            }}>{col.header}</span>
          ))}
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-stretch px-4 gap-2 shrink-0 w-full"
            style={{ minHeight: 45, borderBottom: ri < rows.length - 1 ? "1px solid #e4e2ee" : undefined }}>
            {row.map((cell, ci) => {
              const col = cols[ci];
              return (
                <div key={ci} className="flex items-center"
                  style={{
                    flex: col.flex != null ? `${col.flex} ${col.flex} 0` : undefined,
                    width:    col.flex == null ? col.width : undefined,
                    minWidth: col.flex != null ? 0 : col.width,
                    padding: "12px 0",
                    textAlign: col.align ?? "left",
                    color: "#5e5873", fontSize, lineHeight: "20px",
                    fontFamily: col.mono ? "'Consolas', monospace" : "'Poppins', sans-serif",
                    fontWeight: col.mono ? 700 : 400,
                    whiteSpace: col.flex != null ? "normal" : "nowrap",
                  }}>{cell}</div>
              );
            })}
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export function GrievanceCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  if (scenario === 3) return (
    <Card className="h-full flex flex-col">
      <SecHead title="Grievance & Disciplinary" />
      <EmptyCard icon={Shield} title="No cases on record" body="Grievance and disciplinary records will appear here once your employment is active." />
    </Card>
  );
  const cases = DG_CASES[scenario];
  const fmtDate = (iso: string) => {
    const [y, m, d] = iso.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
  };
  return (
    <Card className="h-full flex flex-col">
      <SecHead title="Grievance & Disciplinary" count={cases.length > 0 ? cases.length : undefined} />
      <div className="flex-1 flex flex-col gap-2 min-h-0">
        {cases.length === 0 ? (
          /* No cases — clean green banner */
          <div className="flex items-center gap-3 p-3 rounded-xl flex-shrink-0" style={{ background: S.success50 }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: S.success100 }}>
              <CheckSquare size={15} style={{ color: S.success }} />
            </div>
            <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>No active cases</div>
          </div>
        ) : (
          /* Case list — one row per case with individual View button */
          <div className="flex-1 flex flex-col min-h-0">
            {cases.map(c => {
              const active = !c.statusGood;
              const statusBg  = active ? S.warning50  : S.success50;
              const statusFg  = active ? S.warning     : S.success;
              const statusChipBg = active ? S.warning100 : S.success100;
              return (
                <div key={c.ref} className="flex-1 flex items-center gap-2.5 border-b border-border last:border-0 min-h-0 py-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: statusBg }}>
                    <FileText size={13} style={{ color: statusFg }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold truncate" style={{ color: C.tertiary }}>{c.type}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary300 }}>{c.ref} · {fmtDate(c.date)}</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: statusChipBg, color: statusFg }}>
                    {c.status}
                  </span>
                  <button
                    className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg border flex-shrink-0 transition-colors"
                    style={{ borderColor: C.purple200, color: C.purpleIcon, background: "var(--card)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.purple100}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--card)"}>
                    View Status
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit button — always visible */}
        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold flex-shrink-0 transition-colors"
          style={{ background: C.purple100, color: C.purpleIcon }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.purple200}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.purple100}>
          <CheckSquare size={12} /> Submit a Grievance
        </button>
      </div>
    </Card>
  );
}

export function PerformanceCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const data = PERF_DATA[scenario];
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Performance Overview</span>
      </div>
      {!data ? (
        <EmptyCard icon={TrendingUp}
          title="Your performance review hasn't started yet."
          body={scenario === 3
            ? "Your performance cycle will begin once your onboarding period is complete."
            : "Performance goals and reviews will appear here once your review cycle begins."} />
      ) : (
        <div className="flex-1 flex flex-col gap-2 min-h-0">

          {/* 1. Goal Progress */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px]" style={{ color: C.tertiary300 }}>Goal Progress</span>
              <span className="text-[12px] font-bold" style={{ color: C.purpleIcon }}>{data.goalProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.purple100 }}>
              <div className="h-full rounded-full" style={{ width: `${data.goalProgress}%`, background: C.purple }} />
            </div>
          </div>

          {/* 2. Review Due */}
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-[11px]" style={{ color: C.tertiary300 }}>Review Due</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={11} style={{ color: C.tertiary300 }} />
              <span className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{data.reviewDue.replace(" 2026", "")}</span>
              <span className="text-[10px] font-medium" style={{ color: C.magentaIcon }}>{data.timeLeft}</span>
            </div>
          </div>

          {/* 3. Status */}
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-[11px]" style={{ color: C.tertiary300 }}>Status</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: data.statusGood ? S.success50 : S.warning50, color: data.statusGood ? S.success : S.warning }}>
              {data.status}
            </span>
          </div>

          {/* 4. Manager Feedback */}
          {data.managerFeedback && (
            <div className="flex items-center justify-between flex-shrink-0">
              <span className="text-[11px]" style={{ color: C.tertiary300 }}>Manager Feedback</span>
              <span className="text-[11px] font-semibold" style={{ color: C.magentaIcon }}>Available</span>
            </div>
          )}

          {/* 5. Stage */}
          <div className="flex items-center justify-between gap-3 flex-shrink-0">
            <span className="text-[11px] flex-shrink-0" style={{ color: C.tertiary300 }}>Stage</span>
            <span className="text-[11px] font-medium text-right" style={{ color: C.tertiary }}>{data.stage}</span>
          </div>

          {/* 6. Performance Rating */}
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-[11px]" style={{ color: C.tertiary300 }}>Performance Rating</span>
            <span className="text-[11px] font-bold" style={{ color: C.purpleIcon }}>{data.rating}</span>
          </div>

          {/* 7. View Performance */}
          <div className="flex-1 flex items-end flex-shrink-0">
            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold transition-colors"
              style={{ background: C.purple100, color: C.purpleIcon }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.purple200}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.purple100}>
              View Performance <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

export function LearningCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const learning = LEARNING_DATA[scenario];
  if (!learning) {
    return (
      <Card className="h-full flex flex-col">
        <SecHead title="E-Learning" />
        <EmptyCard icon={GraduationCap} title="No learning has been assigned yet." body="Your manager will assign courses and development content once your profile is fully set up." />
      </Card>
    );
  }
  const { courses, certificates, recommended } = learning;
  const assigned = courses.length;
  const dueThisWeek = courses.filter(c => c.dueThisWeek).length;
  const mandatory = courses.filter(c => c.mandatory).length;
  const avgProgress = Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length);
  return (
    <Card className="h-full flex flex-col">
      <SecHead title="E-Learning" link="Browse Courses" />
      <div className="flex-1 flex flex-col gap-3 min-h-0">

        {/* Stat strip */}
        <div className="grid grid-cols-3 gap-1 flex-shrink-0">
          {[
            { label: "Assigned",    value: assigned,          color: C.purpleIcon },
            { label: "Completion",  value: `${avgProgress}%`, color: C.purpleIcon },
            { label: "Certs",       value: certificates,      color: C.purpleIcon },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center py-1.5 rounded-xl" style={{ background: C.purple100 }}>
              <span className="text-[13px] font-bold" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[8px] font-medium mt-0.5" style={{ color: C.tertiary300 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="flex-shrink-0">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.purple100 }}>
            <div className="h-full rounded-full" style={{ width: `${avgProgress}%`, background: C.purple }} />
          </div>
        </div>

        {/* Highlights */}
        <div className="flex-1 flex flex-col gap-1.5 min-h-0">
          {dueThisWeek > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: S.warning50 }}>
              <Calendar size={11} style={{ color: S.warning }} />
              <span className="text-[10px] font-semibold" style={{ color: S.warning }}>
                {dueThisWeek} course{dueThisWeek > 1 ? "s" : ""} due this week
              </span>
            </div>
          )}
          {mandatory > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: S.info50 }}>
              <CheckSquare size={11} style={{ color: S.info }} />
              <span className="text-[10px] font-semibold" style={{ color: S.info }}>
                {mandatory} mandatory training{mandatory > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {recommended.length > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: C.tertiary50 }}>
              <Star size={11} style={{ color: C.tertiary300 }} />
              <span className="text-[10px] font-semibold truncate" style={{ color: C.tertiary }}>
                Recommended: {recommended[0].title}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold flex-shrink-0 transition-colors"
          style={{ background: C.purple100, color: C.purpleIcon }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.purple200}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.purple100}>
          <BookOpen size={12} /> Continue Learning
        </button>
      </div>
    </Card>
  );

}

export function ENPSCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const data = ENPS_DATA[scenario];
  return (
    <Card>
      <SecHead title="eNPS — Employee Sentiment" />
      {!data ? (
        <EmptyCard icon={Star} title={scenario === 2 ? "Survey arriving Day 30" : "First survey pending"} body={scenario === 2 ? "Your first eNPS survey will be sent 30 days after your start date." : "eNPS survey scheduled for end of your first month."} />
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-3">
            <PieChart width={96} height={96}>
              <Pie data={[{ value: data.score }, { value: 100 - data.score }]} cx="50%" cy="50%" innerRadius={28} outerRadius={42} dataKey="value" startAngle={90} endAngle={-270} strokeWidth={0}>
                <Cell fill={C.magenta} />
                <Cell fill={C.magenta200} />
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold" style={{ color: C.tertiary }}>{data.score}</span>
              <span className="text-[9px]" style={{ color: C.tertiary }}>Score</span>
            </div>
          </div>
          <span className="text-[13px] font-bold mb-0.5" style={{ color: C.tertiary }}>{data.category}</span>
          <span className="text-[10px] px-2.5 py-1 rounded-full mb-3" style={{ background: S.success50, color: S.success }}>{data.trend}</span>
          <button className="w-full py-2 rounded-xl text-[11px] font-semibold" style={{ background: C.magenta100, color: C.tertiary }}>
            Take Latest Survey
          </button>
        </div>
      )}
    </Card>
  );
}

export function AboutMeCard({ scenario }: { scenario: ScenarioId }) {
  const defaults = ABOUT_ME_DEFAULTS[scenario];
  const [editing, setEditing] = useState(false);
  const [summary, setSummary] = useState(defaults.summary);
  const [facebook, setFacebook] = useState(defaults.facebook);
  const [linkedin, setLinkedin] = useState(defaults.linkedin);
  const [draftSummary, setDraftSummary] = useState(summary);
  const [draftFacebook, setDraftFacebook] = useState(facebook);
  const [draftLinkedin, setDraftLinkedin] = useState(linkedin);

  const isEmpty = !summary && !facebook && !linkedin;

  const startEdit = () => {
    setDraftSummary(summary);
    setDraftFacebook(facebook);
    setDraftLinkedin(linkedin);
    setEditing(true);
  };
  const cancel = () => setEditing(false);
  const save = () => {
    setSummary(draftSummary);
    setFacebook(draftFacebook);
    setLinkedin(draftLinkedin);
    setEditing(false);
    toast.success("About Me saved");
  };

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <SecHead title="About Me" />
        {!editing && (
          <button onClick={startEdit} className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg" style={{ background: C.purple100, color: C.purpleIcon }}>
            <Pencil size={11} /> Edit
          </button>
        )}
      </div>
      {editing ? (
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[11px] font-semibold mb-1" style={{ color: C.tertiary }}>Professional Summary</div>
            <textarea
              value={draftSummary}
              onChange={e => setDraftSummary(e.target.value)}
              rows={4}
              className="w-full rounded-xl border text-[12px] px-3 py-2 resize-none"
              style={{ borderColor: C.purple200, color: C.tertiary, outline: "none" }}
              placeholder="Write a short professional summary…"
            />
          </div>
          <div>
            <div className="text-[11px] font-semibold mb-1" style={{ color: C.tertiary }}>Facebook URL</div>
            <input
              value={draftFacebook}
              onChange={e => setDraftFacebook(e.target.value)}
              className="w-full rounded-xl border text-[12px] px-3 py-2"
              style={{ borderColor: C.purple200, color: C.tertiary, outline: "none" }}
              placeholder="https://facebook.com/yourprofile"
            />
          </div>
          <div>
            <div className="text-[11px] font-semibold mb-1" style={{ color: C.tertiary }}>LinkedIn URL</div>
            <input
              value={draftLinkedin}
              onChange={e => setDraftLinkedin(e.target.value)}
              className="w-full rounded-xl border text-[12px] px-3 py-2"
              style={{ borderColor: C.purple200, color: C.tertiary, outline: "none" }}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 py-2 rounded-xl text-[12px] font-semibold text-white" style={{ background: C.purple }}>Save</button>
            <button onClick={cancel} className="flex-1 py-2 rounded-xl text-[12px] font-semibold" style={{ background: C.purple100, color: C.tertiary }}>Cancel</button>
          </div>
        </div>
      ) : isEmpty ? (
        <EmptyCard icon={User} title="No summary yet" body="Add a professional summary and social links to help your colleagues know you better." cta="Add About Me" />
      ) : (
        <div className="flex flex-col gap-3">
          {summary && <p className="text-[12px] leading-relaxed" style={{ color: C.tertiary }}>{summary}</p>}
          {(facebook || linkedin) && (
            <div className="flex gap-3 pt-1">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl" style={{ background: "#e7f0fd", color: "#1877F2" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                  Facebook
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl" style={{ background: "#e8f3fc", color: "#0A66C2" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export function CompetencyCard({ scenario }: { scenario: ScenarioId }) {
  const data = COMPETENCY_DATA[scenario];
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>My Competency</span>
        <button className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-lg" style={{ background: C.purple100, color: C.tertiary }}><Settings size={12} /> Manage Competency</button>
      </div>
      {!data ? (
        <EmptyCard icon={Star} title="No competencies recorded" body="Your competency profile hasn't been assessed yet. Contact HR after your review." />
      ) : (
        <FigmaTable
          fontSize={11}
          cols={[
            { header: "Competency",      flex: 1 },
            { header: "Employee Score",  width: 112, align: "right", mono: true },
            { header: "Job Role Score",  width: 112, align: "right", mono: true },
          ]}
          rows={data.map(c => [c.name, c.empScore, c.roleScore])}
        />
      )}
    </Card>
  );
}

export function WorkHistoryCard({ scenario }: { scenario: ScenarioId }) {
  const data = WORK_HISTORY_DATA[scenario];
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="My Work History" link={data ? "View All" : undefined} />
      {!data ? (
        <EmptyCard icon={Briefcase} title="No work history recorded" body="Your previous employment history will appear here once added to your profile." />
      ) : (
        <div className="relative flex flex-col gap-0 pl-5">
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: C.purple200, borderRadius: 2 }} />
          {data.map((e, i) => (
            <div key={i} className="relative pb-4 last:pb-0">
              <div style={{
                position: "absolute", left: -22, top: 4,
                width: 10, height: 10, borderRadius: "50%",
                background: e.to === "Present" ? C.purple : C.tertiary200,
                border: `2px solid ${e.to === "Present" ? C.purple : C.tertiary200}`,
              }} />
              <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{e.role}</div>
              <div className="text-[11px]" style={{ color: C.tertiary }}>{e.org}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px]" style={{ color: C.tertiary300 }}>{e.from} – {e.to}</span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: C.purple100, color: C.purpleIcon }}>{e.type}</span>
              </div>
              {e.details && <div className="text-[10px] mt-1 leading-relaxed" style={{ color: C.tertiary300 }}>{e.details}</div>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function AcademicProfessionalCard({ scenario }: { scenario: ScenarioId }) {
  const [tab, setTab] = useState<"Academic" | "Professional">("Academic");
  const hist = ACADEMIC_HIST[scenario];
  const tabs: Array<"Academic" | "Professional"> = ["Academic", "Professional"];
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="Academic & Professional History" />
      <div className="flex gap-0 border-b border-border">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 text-[11px] font-semibold transition-colors"
            style={{ color: tab === t ? C.magenta : C.tertiary, borderBottom: tab === t ? `2px solid ${C.magenta}` : "2px solid transparent", marginBottom: -1 }}>
            {t}
          </button>
        ))}
      </div>
      {tab === "Academic" ? (
        !hist.academic ? (
          <EmptyCard icon={GraduationCap} title="No academic records" body="Academic qualifications will appear here once added to your profile." />
        ) : (
          <div className="flex flex-col gap-2">
            {hist.academic.map((a, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: C.purple100 }}>
                <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{a.qualification}</div>
                <div className="text-[11px]" style={{ color: C.tertiary }}>{a.institution}</div>
                <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>{a.field} · {a.from} – {a.to}</div>
              </div>
            ))}
          </div>
        )
      ) : (
        !hist.professional ? (
          <EmptyCard icon={Award} title="No professional certifications" body="Certifications and professional qualifications will appear here once added." />
        ) : (
          <div className="flex flex-col gap-2">
            {hist.professional.map((p, i) => {
              const expired = p.expires && new Date(p.expires) < new Date();
              return (
                <div key={i} className="rounded-xl p-3 border" style={{ borderColor: C.purple200, background: "var(--card)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.name}</div>
                    {p.expires && (
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: expired ? S.error50 : S.warning50, color: expired ? S.error : S.warning }}>
                        {expired ? "Expired" : `Expires ${p.expires}`}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: C.tertiary }}>{p.org}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>Issued {p.issued}</div>
                </div>
              );
            })}
          </div>
        )
      )}
    </Card>
  );
}

export function PayrollHistoryCard({ scenario }: { scenario: ScenarioId }) {
  const payslips = scenario === 1 ? [
    { month: "May 2025", gross: "₦800,000", net: "₦680,000" },
    { month: "Apr 2025", gross: "₦800,000", net: "₦680,000" },
    { month: "Mar 2025", gross: "₦800,000", net: "₦672,000" },
  ] : null;
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="Payroll History" link={payslips ? "View All Payslips" : undefined} />
      {!payslips ? (
        <EmptyCard icon={DollarSign} title="No payroll records yet" body="Your payslips will appear here once payroll processing is set up for your employment." />
      ) : (
        <div className="flex flex-col gap-2">
          {payslips.map((p, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: S.success50 }}>
                <span className="text-[11px] font-bold" style={{ color: S.success }}>₦</span>
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.month}</div>
                <div className="text-[10px]" style={{ color: C.tertiary300 }}>Gross: {p.gross}</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.net}</div>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: S.success50, color: S.success }}>Paid</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function PensionCard({ scenario }: { scenario: ScenarioId }) {
  const data = PENSION_DATA[scenario];
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="Pension History" link={data ? "View Details" : undefined} />
      {!data ? (
        <EmptyCard icon={Shield} title="No pension records yet" body="Your pension contribution history will appear here once your pension account is linked." />
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{p.employer}</div>
                <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>{p.period}</div>
                <div className="text-[10px]" style={{ color: C.tertiary300 }}>{p.contribution}</div>
              </div>
              <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: p.status === "Active" ? S.success50 : S.info50, color: p.status === "Active" ? S.success : S.info }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function TaxHistoryCard({ scenario }: { scenario: ScenarioId }) {
  const data = TAX_DATA[scenario];
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="Tax History" link={data ? "View All" : undefined} />
      {!data ? (
        <EmptyCard icon={FileText} title="No tax records yet" body="Your annual tax records and filings will appear here once available." />
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{t.year}</div>
                <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>Income: {t.income}</div>
                <div className="text-[10px]" style={{ color: C.tertiary300 }}>Tax Paid: {t.tax}</div>
              </div>
              <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full" style={{ background: S.success50, color: S.success }}>{t.status}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function RecruitmentCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const data = RECRUITMENT_DATA[scenario];
  if (!data) return null;

  const fmtDate = (iso: string) => {
    const [, m, d] = iso.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
  };

  const urgencyStyle = data.action.urgency === "high"
    ? { fg: S.error,   icon: AlertCircle }
    : data.action.urgency === "medium"
    ? { fg: S.warning, icon: Clock }
    : { fg: S.info,    icon: CheckSquare };
  const UrgencyIcon = urgencyStyle.icon;

  const activityStyle = (status: string) =>
    status === "scheduled"    ? { bg: C.purple100,  fg: C.purple,  label: "Scheduled"     } :
    status === "feedback-due" ? { bg: S.error50,    fg: S.error,   label: "Feedback Due"  } :
    status === "pending"      ? { bg: S.warning50,  fg: S.warning, label: "Pending"       } :
                                { bg: S.success50,  fg: S.success, label: "Done"          };

  const activityIcon = (a: typeof data.activities[0]) =>
    a.activityType === "interview"
      ? (a.format === "Video" ? Video : a.format === "Phone" ? Phone : MapPin)
      : a.activityType === "feedback"
      ? FileText
      : Users;

  const pendingCount = data.activities.filter(a => a.status !== "completed").length;

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>Recruitment</span>
          {pendingCount > 0 && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: S.warning50, color: S.warning }}>
              {pendingCount} action{pendingCount > 1 ? "s" : ""} pending
            </span>
          )}
        </div>
        <button className="text-[11px] font-medium flex items-center gap-0.5" style={{ color: C.magentaIcon }}>
          View All <ChevronRight size={11} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 min-h-0">

        {/* Activity list — border-bottom between rows only */}
        <div className="flex-1 flex flex-col min-h-0">
          {data.activities.map((activity, i) => {
            const AIcon = activityIcon(activity);
            const st = activityStyle(activity.status);
            return (
              <div key={i} className="flex items-center gap-2.5 py-2 border-b border-border last:border-0">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: st.bg }}>
                  <AIcon size={11} style={{ color: st.fg }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{activity.candidateName}</div>
                  <div className="text-[9px]" style={{ color: C.tertiary300 }}>
                    {activity.jobRole} · {activity.stageName}
                    {activity.date && <span> · {fmtDate(activity.date)}, {activity.time}</span>}
                  </div>
                </div>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: st.bg, color: st.fg }}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Next action — 30% label | 70% text */}
        <div className="flex items-start gap-2 pt-1 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-1.5 flex-shrink-0" style={{ width: "30%" }}>
            <UrgencyIcon size={11} style={{ color: urgencyStyle.fg, flexShrink: 0 }} />
            <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: urgencyStyle.fg }}>
              Next Action
            </span>
          </div>
          <span className="text-[11px] leading-snug" style={{ color: C.tertiary, width: "70%" }}>
            {data.action.label}
          </span>
        </div>

      </div>
    </Card>
  );
}

export function EmploymentDetailsCard({ scenario }: { scenario: ScenarioId }) {
  const d = EMPLOYMENT_DETAILS_DATA[scenario];
  const emp = EMPLOYEE[scenario];
  const rows = [
    ["Contract Type", d.contractType],
    ["Grade",         d.grade],
    ["Current Cadre", d.cadre],
    ["Cadre Step",    d.cadreStep],
    ["Department",    emp.dept],
    ["Location",      d.location],
  ] as Array<[string, string | null]>;
  return (
    <Card className="flex flex-col gap-3">
      <SecHead title="Employment Details" />
      <div className="space-y-0 text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-1.5 border-b border-border last:border-0">
            <span style={{ color: C.tertiary }}>{k}</span>
            <span className="font-semibold" style={{ color: v ? C.tertiary : S.warning }}>
              {v ?? "Not yet assigned"}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-xl px-3 py-2 text-[10px]" style={{ background: C.tertiary100, color: C.tertiary }}>
        Employment classification is managed by HR.
      </div>
    </Card>
  );
}

export function TimeTrackerCard({ scenario, plan }: { scenario: ScenarioId; plan: PlanId }) {
  const data = TRACKER_DATA[scenario];
  const [period, setPeriod] = useState<"Today" | "Last 7 Days" | "View All">("Last 7 Days");
  if (!data) return null;

  const reversed = [...data.timeLogged].reverse();
  let streak = 0;
  for (const d of reversed) { if (d.hours > 0) streak++; else break; }
  const bestDay = data.timeLogged.reduce((best, d) => d.hours > best.hours ? d : best, data.timeLogged[0]);
  const fmtH = (h: number) => { const hrs = Math.floor(h); const m = Math.round((h - hrs) * 60); return m > 0 ? `${hrs}h ${m}m` : `${hrs}h`; };

  const DAY_ABB = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const activityDays = data.activity.map((entry, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (data.activity.length - 1 - i));
    return { ...entry, day: i === data.activity.length - 1 ? "Today" : DAY_ABB[d.getDay()] };
  });

  const stats = [
    { label: "Total Time",      value: data.stats.totalTime,      icon: Clock,        bg: C.purple100,  fg: C.purple  },
    { label: "Productive Time", value: data.stats.productiveTime, icon: CheckCircle,  bg: S.success50,  fg: S.success },
    { label: "Manual Time",     value: data.stats.manualTime,     icon: Timer,        bg: S.warning50,  fg: S.warning },
    { label: "Idle Time",       value: data.stats.idleTime,       icon: Activity,     bg: S.error50,    fg: S.error   },
  ];

  const Banner = () => (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl flex-shrink-0" style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)`, position: "relative", overflow: "hidden" }}>
      <div className="relative z-10 min-w-0 mr-2">
        <div className="text-[12px] font-bold mb-0.5 truncate" style={{ color: C.tertiary }}>Download Time Tracker</div>
        <div className="text-[10px]" style={{ color: C.tertiary300 }}>Download desktop app to log your time</div>
      </div>
      <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <Timer size={40} style={{ color: C.purple }} />
      </div>
      <button className="flex items-center gap-1.5 flex-shrink-0 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg text-white relative z-10" style={{ background: C.purple }}>
        <Download size={11} /> Download
      </button>
    </div>
  );

  return (
    <Card className="h-full flex flex-col gap-3">
      {/* Header: title + period tabs left-aligned, View All right */}
      <div className="flex items-center justify-between mb-0 flex-shrink-0">
        <div className="flex items-center" style={{ gap: 8 }}>
          <span className="text-[13px] font-semibold flex-shrink-0" style={{ color: C.tertiary }}>Time Tracker</span>
          <div className="flex gap-0">
            {(["Today", "Last 7 Days"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p as typeof period)}
                className="pb-0.5 ml-2 text-[10px] font-medium transition-colors whitespace-nowrap flex-shrink-0"
                style={{
                  color: period === p ? C.magenta : C.tertiary300,
                  borderBottom: period === p ? `2px solid ${C.magenta}` : "2px solid transparent",
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setPeriod("View All")}
          className="text-[11px] font-medium flex items-center gap-0.5 flex-shrink-0"
          style={{ color: C.magentaIcon }}>
          View All <ChevronRight size={11} />
        </button>
      </div>
      {/* 4×1 stats row */}
      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
        {stats.map(s => (
          <div key={s.label} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: C.tertiary50 }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              <s.icon size={12} style={{ color: s.fg }} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold leading-none" style={{ color: C.tertiary }}>{s.value}</div>
              <div className="text-[8.5px] leading-tight mt-0.5 truncate" style={{ color: C.tertiary300 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Activity chart */}
      <div className="p-2 rounded-xl border border-border flex-shrink-0">
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[9.5px] font-semibold" style={{ color: C.tertiary }}>Activity</span>
          <div className="relative group">
            <Info size={10} style={{ color: C.tertiary300, cursor: "default" }} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex items-center whitespace-nowrap px-2 py-1 rounded-lg text-[9px] font-medium pointer-events-none z-50"
              style={{ background: C.tertiary, color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
              Percentage of time actively tracked vs idle
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: C.tertiary }} />
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={72}>
          <LineChart data={activityDays} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: C.tertiary, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <Line name="activity-b" type="monotone" dataKey="value" stroke={C.magenta} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Streak + Best Day — side by side */}
      <div className="flex gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 p-2 rounded-xl flex-1 min-w-0" style={{ background: S.warning50 }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: S.warning100 }}>
            <Flame size={14} style={{ color: S.warning }} />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-bold leading-none" style={{ color: C.tertiary }}>{streak} Day Streak</div>
            <div className="text-[8.5px] mt-0.5 truncate" style={{ color: C.tertiary300 }}>Consecutive days logged</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl flex-1 min-w-0" style={{ background: C.purple100 }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.purple }}>
            <TrendingUp size={13} style={{ color: "white" }} />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold leading-none truncate" style={{ color: C.tertiary }}>{fmtH(bestDay.hours)} · {bestDay.date}</div>
            <div className="text-[8.5px] mt-0.5 truncate" style={{ color: C.tertiary300 }}>Best logged day</div>
          </div>
        </div>
      </div>
      <Banner />
    </Card>
  );
}
