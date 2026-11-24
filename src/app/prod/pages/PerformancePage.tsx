import { useState, useEffect } from "react";
import { Target, TrendingUp, TrendingDown, Minus, Star, ChevronRight, Award } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../store/AuthContext";
import {
  PageHeader, Card, Badge, Button, UnderlineTabs, LoadingSpinner,
  StatCard, ProgressBar, Modal, cn,
} from "../components/ui";
import { performanceService } from "../services/api";
import type { KPI, PerformanceReview } from "../types";

const KPI_STATUS: Record<string, { label: string; color: string; icon: React.ElementType; badgeV: "success" | "error" | "warning" | "info" }> = {
  on_track: { label: "On Track", color: "text-status-success", icon: TrendingUp, badgeV: "success" },
  exceeded: { label: "Exceeded", color: "text-[#440F7C]", icon: TrendingUp, badgeV: "info" },
  at_risk: { label: "At Risk", color: "text-status-warning", icon: Minus, badgeV: "warning" },
  behind: { label: "Behind", color: "text-status-error", icon: TrendingDown, badgeV: "error" },
};

const REVIEW_STATUS: Record<string, { label: string; v: "warning" | "info" | "success" | "default" }> = {
  not_started: { label: "Not Started", v: "default" },
  self_review: { label: "Self Review", v: "warning" },
  manager_review: { label: "Manager Review", v: "info" },
  completed: { label: "Completed", v: "success" },
};

export function PerformancePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [review, setReview] = useState<PerformanceReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selfScore, setSelfScore] = useState(3);
  const [selfNotes, setSelfNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const [k, r] = await Promise.all([
        performanceService.getKPIs(user.id),
        performanceService.getReview(user.id),
      ]);
      setKPIs(k);
      setReview(r);
      setLoading(false);
    };
    void load();
  }, [user]);

  const handleSubmitReview = async () => {
    if (!review) return;
    setSubmitting(true);
    try {
      await performanceService.submitSelfReview(review.id, selfScore, selfNotes);
      setReview(r => r ? { ...r, selfScore, status: "manager_review" } : r);
      toast.success("Self-review submitted successfully");
      setReviewModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const onTrack = kpis.filter(k => k.status === "on_track" || k.status === "exceeded").length;
  const atRisk = kpis.filter(k => k.status === "at_risk").length;
  const behind = kpis.filter(k => k.status === "behind").length;
  const avgAchievement = kpis.length > 0
    ? Math.round(kpis.reduce((sum, k) => sum + (k.actual / k.target) * 100, 0) / kpis.length)
    : 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Performance"
        description="Track your KPIs, review cycles, and overall performance rating"
        actions={
          review?.status === "self_review" && (
            <Button variant="primary" size="sm" icon={<Star size={14} />} onClick={() => setReviewModalOpen(true)}>
              Submit Self-Review
            </Button>
          )
        }
      />

      {/* Review banner */}
      {review && (
        <Card className={cn(
          "mb-6 !p-4",
          review.status === "self_review" ? "border-status-warning/30 bg-status-warning50" :
          review.status === "manager_review" ? "border-status-info/30 bg-status-info50" :
          review.status === "completed" ? "border-status-success/30 bg-status-success50" : ""
        )}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award size={18} className={
                review.status === "self_review" ? "text-status-warning" :
                review.status === "manager_review" ? "text-status-info" :
                "text-status-success"
              } />
              <div>
                <div className="font-semibold text-sm text-foreground">
                  {review.period} Performance Review
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Due {new Date(review.dueDate).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                  {review.selfScore && ` · Self-score: ${review.selfScore}/5`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={REVIEW_STATUS[review.status]?.v ?? "default"}>
                {REVIEW_STATUS[review.status]?.label ?? review.status}
              </Badge>
              {review.status === "self_review" && (
                <Button size="sm" variant="primary" onClick={() => setReviewModalOpen(true)}>
                  Begin Review
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Overall Achievement" value={`${avgAchievement}%`} icon={Target} />
        <StatCard label="On Track / Exceeded" value={onTrack} icon={TrendingUp} iconBg="bg-status-success100" />
        <StatCard label="At Risk" value={atRisk} icon={Minus} iconBg={atRisk > 0 ? "bg-status-warning100" : "bg-muted"} />
        <StatCard label="Behind" value={behind} icon={TrendingDown} iconBg={behind > 0 ? "bg-status-error100" : "bg-muted"} />
      </div>

      <UnderlineTabs
        tabs={[
          { label: "My KPIs", value: "overview" },
          { label: "Review History", value: "history" },
          { label: "Competencies", value: "competencies" },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-6"
      />

      {tab === "overview" && (
        <div className="flex flex-col gap-4">
          {kpis.map(kpi => {
            const cfg = KPI_STATUS[kpi.status] ?? KPI_STATUS.on_track;
            const pct = Math.min(150, Math.round((kpi.actual / kpi.target) * 100));
            const StatusIcon = cfg.icon;

            return (
              <Card key={kpi.id}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm text-foreground">{kpi.title}</h3>
                      <Badge variant={cfg.badgeV}>
                        <StatusIcon size={10} />
                        {cfg.label}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{kpi.period}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-foreground">
                      {kpi.actual}{kpi.unit} <span className="text-muted-foreground font-normal">/ {kpi.target}{kpi.unit}</span>
                    </div>
                    <div className={cn("text-xs font-semibold mt-0.5", cfg.color)}>{pct}% of target</div>
                  </div>
                </div>

                <ProgressBar
                  value={kpi.actual}
                  max={kpi.target}
                  color={kpi.status === "exceeded" ? "#440F7C" : kpi.status === "on_track" ? "#14532d" : kpi.status === "at_risk" ? "#78350f" : "#7f1d1d"}
                  showLabel
                />
              </Card>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div className="flex flex-col gap-4">
          {[
            { period: "H1 2024", overall: 4.2, status: "completed", completedDate: "2024-07-15" },
            { period: "H2 2023", overall: 4.0, status: "completed", completedDate: "2024-01-20" },
            { period: "H1 2023", overall: 3.8, status: "completed", completedDate: "2023-07-18" },
          ].map(r => (
            <Card key={r.period} className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-foreground">{r.period} Performance Review</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Completed {new Date(r.completedDate).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-lg font-bold text-[#440F7C]">{r.overall}/5</div>
                  <div className="text-xs text-muted-foreground">Overall</div>
                </div>
                <Badge variant="success">Completed</Badge>
                <Button size="xs" variant="ghost" iconRight={<ChevronRight size={12} />}>View</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "competencies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Leadership & People Management", score: 4.2, max: 5 },
            { name: "Strategic Thinking", score: 3.8, max: 5 },
            { name: "Communication", score: 4.5, max: 5 },
            { name: "Innovation & Problem Solving", score: 4.0, max: 5 },
            { name: "Execution & Delivery", score: 4.3, max: 5 },
            { name: "Collaboration", score: 4.6, max: 5 },
          ].map(comp => (
            <Card key={comp.name}>
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-sm font-medium text-foreground">{comp.name}</div>
                <div className="text-sm font-bold text-[#440F7C]">{comp.score}/{comp.max}</div>
              </div>
              <ProgressBar value={comp.score} max={comp.max} color="#440F7C" showLabel />
              <div className="flex gap-1 mt-2">
                {Array.from({ length: comp.max }).map((_, i) => (
                  <Star key={i} size={13} className={i < Math.round(comp.score) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Self-review Modal */}
      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Self-Review — ${review?.period ?? ""}`}
        description="Rate your overall performance and provide notes for your manager"
        size="md"
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-foreground block mb-3">Overall Self-Rating</label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setSelfScore(n)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all",
                    selfScore === n ? "border-[#440F7C] bg-[#440F7C]/5" : "border-border hover:border-[#440F7C]/30"
                  )}
                >
                  <Star size={20} className={selfScore >= n ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"} />
                  <span className="text-xs font-bold text-foreground">{n}</span>
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {["", "Needs Improvement", "Below Expectations", "Meets Expectations", "Exceeds Expectations", "Outstanding"][selfScore]}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Notes & Achievements <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <textarea
              value={selfNotes}
              onChange={e => setSelfNotes(e.target.value)}
              rows={4}
              placeholder="Summarise your key achievements, challenges, and areas for growth…"
              className="w-full bg-input-background border border-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setReviewModalOpen(false)}>Cancel</Button>
            <Button variant="primary" loading={submitting} onClick={() => void handleSubmitReview()}>
              Submit Self-Review
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
