import { useState, useEffect } from "react";
import { BookOpen, Play, CheckCircle, AlertCircle, Clock, Filter } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../store/AuthContext";
import {
  PageHeader, Card, Badge, Button, UnderlineTabs, SearchBar,
  Select, LoadingSpinner, EmptyState, ProgressBar, StatCard, cn,
} from "../components/ui";
import { learningService } from "../services/api";
import type { Course } from "../types";

const STATUS_CONFIG: Record<string, { label: string; v: "success" | "error" | "warning" | "info" | "default"; icon: React.ElementType; iconColor: string }> = {
  completed: { label: "Completed", v: "success", icon: CheckCircle, iconColor: "text-status-success" },
  in_progress: { label: "In Progress", v: "info", icon: Play, iconColor: "text-status-info" },
  not_started: { label: "Not Started", v: "default", icon: BookOpen, iconColor: "text-muted-foreground" },
  overdue: { label: "Overdue", v: "error", icon: AlertCircle, iconColor: "text-status-error" },
};

export function LearningPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const data = await learningService.list(user.id);
      setCourses(data);
      setLoading(false);
    };
    void load();
  }, [user]);

  const categories = [...new Set(courses.map(c => c.category))];

  const filtered = courses.filter(c => {
    const matchTab =
      tab === "all" ? true :
      tab === "mandatory" ? c.mandatory :
      tab === "in_progress" ? c.status === "in_progress" :
      tab === "completed" ? c.status === "completed" :
      tab === "overdue" ? c.status === "overdue" : true;
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "" || c.category === categoryFilter;
    return matchTab && matchSearch && matchCat;
  });

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    try {
      await learningService.enroll(courseId);
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: "in_progress" as Course["status"], progress: 0 } : c));
      toast.success("Enrolled successfully. Good luck!");
    } finally {
      setEnrollingId(null);
    }
  };

  const handleContinue = (course: Course) => {
    toast.info(`Opening "${course.title}"…`);
  };

  if (loading) return <LoadingSpinner />;

  const completed = courses.filter(c => c.status === "completed").length;
  const inProgress = courses.filter(c => c.status === "in_progress").length;
  const overdue = courses.filter(c => c.status === "overdue").length;
  const mandatory = courses.filter(c => c.mandatory).length;
  const mandatoryCompleted = courses.filter(c => c.mandatory && c.status === "completed").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="E-Learning"
        description="Your assigned courses, mandatory training, and professional development"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Completed" value={completed} sub={`of ${courses.length} courses`} icon={CheckCircle} iconBg="bg-status-success100" />
        <StatCard label="In Progress" value={inProgress} icon={Play} iconBg="bg-status-info100" />
        <StatCard label="Overdue" value={overdue} icon={AlertCircle} iconBg={overdue > 0 ? "bg-status-error100" : "bg-muted"} />
        <StatCard label="Mandatory" value={`${mandatoryCompleted}/${mandatory}`} sub="completed" icon={BookOpen} iconBg="bg-[#440F7C]/10" />
      </div>

      {/* Mandatory completion bar */}
      {mandatory > 0 && (
        <Card className="mb-6 !p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Mandatory Training Completion</div>
            <span className="text-sm font-bold text-[#440F7C]">{Math.round((mandatoryCompleted / mandatory) * 100)}%</span>
          </div>
          <ProgressBar value={mandatoryCompleted} max={mandatory} showLabel={false} />
          <div className="text-xs text-muted-foreground mt-1">{mandatoryCompleted} of {mandatory} mandatory courses completed</div>
        </Card>
      )}

      {/* Tabs + Filters */}
      <UnderlineTabs
        tabs={[
          { label: "All", value: "all", count: courses.length },
          { label: "In Progress", value: "in_progress", count: inProgress },
          { label: "Mandatory", value: "mandatory", count: mandatory },
          { label: "Overdue", value: "overdue", count: overdue },
          { label: "Completed", value: "completed", count: completed },
        ]}
        active={tab}
        onChange={v => { setTab(v); setSearch(""); }}
        className="mb-5"
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses…" className="flex-1" />
        <Select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          options={[{ label: "All Categories", value: "" }, ...categories.map(c => ({ label: c, value: c }))]}
          className="sm:w-48"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No courses found" description="Try adjusting your filters" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(course => {
            const cfg = STATUS_CONFIG[course.status];
            const Icon = cfg.icon;
            const isOverdue = course.status === "overdue";
            const isCompleted = course.status === "completed";
            const canStart = course.status === "not_started";
            const inProg = course.status === "in_progress";

            return (
              <Card key={course.id} className={cn("flex flex-col", isOverdue && "border-status-error/30")}>
                {/* Header */}
                <div className={cn("flex items-start justify-between mb-3 pb-3 border-b border-border")}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      {course.mandatory && (
                        <Badge variant="magenta" className="flex-shrink-0 text-[10px]">Required</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground leading-snug">{course.title}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5">{course.category}</div>
                  </div>
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-2", isCompleted ? "bg-status-success100" : isOverdue ? "bg-status-error100" : "bg-muted")}>
                    <Icon size={14} className={cfg.iconColor} />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    <span>{course.duration}</span>
                  </div>
                  {course.instructor && (
                    <div className="text-xs text-muted-foreground">by {course.instructor}</div>
                  )}
                  <Badge variant={cfg.v} className="ml-auto">{cfg.label}</Badge>
                </div>

                {/* Due date warning */}
                {course.dueDate && !isCompleted && (
                  <div className={cn("text-xs px-2.5 py-1.5 rounded-lg mb-3 flex items-center gap-1.5", isOverdue ? "bg-status-error100 text-status-error" : "bg-status-warning100 text-status-warning")}>
                    <AlertCircle size={11} />
                    {isOverdue ? "Overdue — " : "Due "}
                    {new Date(course.dueDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                )}

                {/* Progress */}
                {(inProg || isOverdue) && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} color={isOverdue ? "#7f1d1d" : "#440F7C"} />
                  </div>
                )}

                {isCompleted && course.completedDate && (
                  <div className="text-xs text-status-success mb-3 flex items-center gap-1">
                    <CheckCircle size={11} />
                    Completed {new Date(course.completedDate).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                )}

                {/* Action */}
                <div className="mt-auto pt-3 border-t border-border">
                  {isCompleted ? (
                    <Button size="sm" variant="outline" className="w-full">View Certificate</Button>
                  ) : canStart ? (
                    <Button
                      size="sm"
                      variant="primary"
                      className="w-full"
                      loading={enrollingId === course.id}
                      onClick={() => void handleEnroll(course.id)}
                    >
                      Start Course
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant={isOverdue ? "danger" : "primary"}
                      className="w-full"
                      icon={<Play size={13} />}
                      onClick={() => handleContinue(course)}
                    >
                      {isOverdue ? "Complete Now" : "Continue"}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
