import { useEffect } from "react";
import { X } from "lucide-react";
import { C, type ScenarioId } from "./tokens";
import { ATTENDANCE_EMPLOYEE_ID } from "./data";
import { AttendanceView } from "./prod/pages/AttendancePage";
import { useAttendance } from "./prod/store/useAttendance";

/** Opens the Attendance page over the workspace, without a route or layout change. */
export function AttendancePanel({ scenario, organisationId, isMobile, onClose }: { scenario: ScenarioId; organisationId: string; isMobile: boolean; onClose: () => void }) {
  const employeeId = ATTENDANCE_EMPLOYEE_ID[scenario];
  const { prompt, dismissPrompt } = useAttendance({ organisationId, employeeId });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (prompt) dismissPrompt(); else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prompt, dismissPrompt, onClose]);

  const close = () => { dismissPrompt(); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex justify-center" style={{ alignItems: isMobile ? "flex-end" : "center", background: "rgba(30,25,46,0.48)" }} onClick={close}>
      <div role="dialog" aria-modal="true" aria-label="Attendance"
        className="flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          ...(isMobile
            ? { width: "min(390px, 100%)", maxHeight: "92vh", borderRadius: "20px 20px 0 0" }
            : { width: "min(920px, calc(100vw - 48px))", maxHeight: "88vh", borderRadius: 20 }),
          background: "var(--card)", border: `1px solid ${C.purple200}`, boxShadow: "0 20px 60px rgba(68,15,124,0.22)",
        }}>
        <div className="flex justify-end flex-shrink-0 px-4 py-2" style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)`, borderBottom: `1px solid ${C.purple200}` }}>
          <button autoFocus onClick={close} aria-label="Close attendance" className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/60" style={{ color: C.tertiary }}>
            <X size={13} />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <AttendanceView organisationId={organisationId} employeeId={employeeId} />
        </div>
      </div>
    </div>
  );
}
