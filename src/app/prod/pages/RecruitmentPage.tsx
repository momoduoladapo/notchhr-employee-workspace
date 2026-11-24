import { useState, useEffect } from "react";
import {
  Briefcase, Plus, Users, ChevronRight, ArrowRight,
  MapPin, Clock, Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  PageHeader, Card, Badge, Button, UnderlineTabs, SearchBar,
  Select, LoadingSpinner, EmptyState, Avatar, Drawer, DropdownMenu,
  StatCard, cn,
} from "../components/ui";
import { DataTable } from "../components/DataTable";
import { recruitmentService } from "../services/api";
import type { JobPosting, Candidate, TableColumn } from "../types";

const JOB_STATUS_BADGE: Record<string, { label: string; v: "success" | "warning" | "default" | "info" }> = {
  open: { label: "Open", v: "success" },
  closed: { label: "Closed", v: "default" },
  on_hold: { label: "On Hold", v: "warning" },
  draft: { label: "Draft", v: "info" },
};

const CANDIDATE_STAGE_BADGE: Record<string, { label: string; v: "info" | "warning" | "success" | "default" | "error" }> = {
  applied: { label: "Applied", v: "info" },
  screening: { label: "Screening", v: "warning" },
  interview: { label: "Interview", v: "info" },
  offer: { label: "Offer", v: "success" },
  hired: { label: "Hired", v: "success" },
  rejected: { label: "Rejected", v: "error" },
};

const STAGES: Candidate["stage"][] = ["applied", "screening", "interview", "offer", "hired", "rejected"];

export function RecruitmentPage() {
  const [tab, setTab] = useState("jobs");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [advancingId, setAdvancingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const [j, c] = await Promise.all([
        recruitmentService.listJobs(),
        recruitmentService.listCandidates(),
      ]);
      setJobs(j);
      setCandidates(c);
      setLoading(false);
    };
    void load();
  }, []);

  const filteredJobs = jobs.filter(j => {
    const matchSearch = search === "" || j.title.toLowerCase().includes(search.toLowerCase()) || j.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredCandidates = candidates.filter(c =>
    search === "" || `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) || c.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdvanceStage = async (candidateId: string, stage: Candidate["stage"]) => {
    setAdvancingId(candidateId);
    try {
      await recruitmentService.advanceStage(candidateId, stage);
      setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, stage } : c));
      toast.success(`Candidate moved to ${stage}`);
    } finally {
      setAdvancingId(null);
    }
  };

  const JOB_COLUMNS: TableColumn<JobPosting>[] = [
    {
      key: "title", label: "Job Title", sortable: true,
      render: (v, row: JobPosting) => (
        <div>
          <div className="font-medium text-foreground">{String(v)}</div>
          <div className="text-xs text-muted-foreground">{row.department}</div>
        </div>
      ),
    },
    { key: "location", label: "Location", render: v => <span className="flex items-center gap-1 text-sm"><MapPin size={11} className="text-muted-foreground" />{String(v)}</span> },
    { key: "type", label: "Type", render: v => <span className="capitalize text-sm">{String(v).replace("-", " ")}</span> },
    {
      key: "applicantCount", label: "Applicants", sortable: true,
      render: v => <span className="flex items-center gap-1 font-medium"><Users size={12} className="text-muted-foreground" />{String(v)}</span>,
    },
    {
      key: "status", label: "Status",
      render: v => {
        const s = JOB_STATUS_BADGE[String(v)] ?? { label: String(v), v: "default" };
        return <Badge variant={s.v}>{s.label}</Badge>;
      },
    },
    {
      key: "closingDate", label: "Closing",
      render: v => v ? <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={10} />{new Date(String(v)).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span> : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "id", label: "",
      render: (_, row: JobPosting) => (
        <Button size="xs" variant="ghost" iconRight={<ChevronRight size={12} />} onClick={() => setSelectedJob(row)}>View</Button>
      ),
    },
  ];

  const CANDIDATE_COLUMNS: TableColumn<Candidate>[] = [
    {
      key: "firstName", label: "Candidate", sortable: true,
      render: (_, row: Candidate) => (
        <div className="flex items-center gap-2">
          <Avatar name={`${row.firstName} ${row.lastName}`} size="sm" />
          <div>
            <div className="font-medium">{row.firstName} {row.lastName}</div>
            <div className="text-xs text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "jobTitle", label: "Applied For", sortable: true },
    {
      key: "stage", label: "Stage",
      render: v => {
        const s = CANDIDATE_STAGE_BADGE[String(v)] ?? { label: String(v), v: "default" };
        return <Badge variant={s.v}>{s.label}</Badge>;
      },
    },
    {
      key: "rating", label: "Rating",
      render: v => v ? (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Number(v) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"} />
          ))}
        </div>
      ) : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "appliedDate", label: "Applied",
      render: v => new Date(String(v)).toLocaleDateString("en-NG", { day: "numeric", month: "short" }),
    },
    {
      key: "id", label: "Actions",
      render: (_, row: Candidate) => (
        <DropdownMenu
          trigger={<Button size="xs" variant="ghost" iconRight={<ChevronRight size={12} />}>Move to</Button>}
          items={STAGES.filter(s => s !== row.stage).map(s => ({
            label: CANDIDATE_STAGE_BADGE[s]?.label ?? s,
            onClick: () => void handleAdvanceStage(row.id, s),
          }))}
        />
      ),
    },
  ];

  if (loading) return <LoadingSpinner />;

  const openJobs = jobs.filter(j => j.status === "open").length;
  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicantCount, 0);
  const inInterviewStage = candidates.filter(c => c.stage === "interview").length;
  const offersOut = candidates.filter(c => c.stage === "offer").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Recruitment"
        description="Manage job postings, track applicants, and advance candidates through your pipeline"
        actions={<Button variant="primary" size="sm" icon={<Plus size={14} />}>Post a Job</Button>}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open Positions" value={openJobs} icon={Briefcase} />
        <StatCard label="Total Applicants" value={totalApplicants} icon={Users} iconBg="bg-[#D62196]/10" />
        <StatCard label="In Interview" value={inInterviewStage} icon={Users} iconBg="bg-status-info100" />
        <StatCard label="Offers Extended" value={offersOut} icon={Users} iconBg="bg-status-success100" />
      </div>

      {/* Tabs */}
      <UnderlineTabs
        tabs={[
          { label: "Job Postings", value: "jobs", count: openJobs },
          { label: "Candidates", value: "candidates", count: candidates.length },
          { label: "Pipeline", value: "pipeline" },
        ]}
        active={tab}
        onChange={v => { setTab(v); setSearch(""); setStatusFilter(""); }}
        className="mb-5"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={tab === "jobs" ? "Search jobs…" : "Search candidates…"}
          className="flex-1"
        />
        {tab === "jobs" && (
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            options={[
              { label: "All Statuses", value: "" },
              { label: "Open", value: "open" },
              { label: "On Hold", value: "on_hold" },
              { label: "Closed", value: "closed" },
              { label: "Draft", value: "draft" },
            ]}
            className="sm:w-40"
          />
        )}
      </div>

      {tab === "jobs" && (
        <DataTable
          columns={JOB_COLUMNS}
          data={filteredJobs as unknown as Record<string, unknown>[]}
          keyField="id"
          emptyTitle="No job postings found"
          emptyDescription="Post your first job to start receiving applications"
          onRowClick={row => setSelectedJob(row as unknown as JobPosting)}
        />
      )}

      {tab === "candidates" && (
        <DataTable
          columns={CANDIDATE_COLUMNS}
          data={filteredCandidates as unknown as Record<string, unknown>[]}
          keyField="id"
          emptyTitle="No candidates yet"
          emptyDescription="Candidates will appear here once applications are received"
        />
      )}

      {tab === "pipeline" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {STAGES.slice(0, -1).map(stage => {
              const stageCandidates = candidates.filter(c => c.stage === stage);
              const stageInfo = CANDIDATE_STAGE_BADGE[stage];
              return (
                <div key={stage} className="w-56 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stageInfo?.label ?? stage}</span>
                    <Badge variant={stageInfo?.v ?? "default"}>{stageCandidates.length}</Badge>
                  </div>
                  {stageCandidates.length === 0 ? (
                    <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-border text-xs text-muted-foreground">
                      No candidates
                    </div>
                  ) : (
                    stageCandidates.map(c => (
                      <Card key={c.id} className="!p-3 cursor-pointer hover:border-primary/30" onClick={() => setSelectedCandidate(c)}>
                        <div className="flex items-start gap-2">
                          <Avatar name={`${c.firstName} ${c.lastName}`} size="xs" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-foreground truncate">{c.firstName} {c.lastName}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{c.jobTitle}</div>
                            {c.rating && (
                              <div className="flex items-center gap-0.5 mt-1">
                                {Array.from({ length: c.rating }).map((_, i) => (
                                  <Star key={i} size={9} className="text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Detail Drawer */}
      <Drawer open={!!selectedJob} onClose={() => setSelectedJob(null)} title="Job Posting" width="w-[480px]">
        {selectedJob && (
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-lg font-bold text-foreground">{selectedJob.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={JOB_STATUS_BADGE[selectedJob.status]?.v ?? "default"}>{JOB_STATUS_BADGE[selectedJob.status]?.label ?? selectedJob.status}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={11} />{selectedJob.location}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground capitalize">{selectedJob.type.replace("-", " ")}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Department", value: selectedJob.department },
                { label: "Hiring Manager", value: selectedJob.hiringManagerName ?? "—" },
                { label: "Posted", value: new Date(selectedJob.postedDate).toLocaleDateString("en-NG") },
                { label: "Closing Date", value: selectedJob.closingDate ? new Date(selectedJob.closingDate).toLocaleDateString("en-NG") : "Rolling" },
                { label: "Applicants", value: String(selectedJob.applicantCount) },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium text-foreground mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Candidates in Pipeline</div>
              {candidates.filter(c => c.jobId === selectedJob.id).length === 0 ? (
                <div className="text-sm text-muted-foreground">No candidates yet</div>
              ) : (
                <div className="flex flex-col gap-2">
                  {candidates.filter(c => c.jobId === selectedJob.id).map(c => {
                    const stage = CANDIDATE_STAGE_BADGE[c.stage];
                    return (
                      <div key={c.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                        <Avatar name={`${c.firstName} ${c.lastName}`} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{c.firstName} {c.lastName}</div>
                          <div className="text-xs text-muted-foreground">{c.email}</div>
                        </div>
                        <Badge variant={stage?.v ?? "default"}>{stage?.label ?? c.stage}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="primary" className="flex-1">Edit Posting</Button>
              <Button variant="outline" className="flex-1">View Applications</Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Candidate Detail Drawer */}
      <Drawer open={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} title="Candidate Profile" width="w-96">
        {selectedCandidate && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar name={`${selectedCandidate.firstName} ${selectedCandidate.lastName}`} size="lg" />
              <div>
                <div className="font-bold text-lg">{selectedCandidate.firstName} {selectedCandidate.lastName}</div>
                <div className="text-sm text-muted-foreground">{selectedCandidate.email}</div>
                <Badge variant={CANDIDATE_STAGE_BADGE[selectedCandidate.stage]?.v ?? "default"} className="mt-1">
                  {CANDIDATE_STAGE_BADGE[selectedCandidate.stage]?.label ?? selectedCandidate.stage}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { label: "Applied for", value: selectedCandidate.jobTitle },
                { label: "Applied date", value: new Date(selectedCandidate.appliedDate).toLocaleDateString("en-NG") },
                { label: "Rating", value: selectedCandidate.rating ? `${selectedCandidate.rating}/5` : "Not rated" },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Move to Stage</div>
              <div className="flex flex-wrap gap-2">
                {STAGES.filter(s => s !== selectedCandidate.stage).map(s => (
                  <Button
                    key={s}
                    size="xs"
                    variant="outline"
                    loading={advancingId === selectedCandidate.id}
                    onClick={() => void handleAdvanceStage(selectedCandidate.id, s)}
                    iconRight={<ArrowRight size={10} />}
                  >
                    {CANDIDATE_STAGE_BADGE[s]?.label ?? s}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
