// ─── Shared attendance state ──────────────────────────────────────────────────
// Every clock-in surface (workspace card, Attendance page, search) uses this hook,
// so there is one state and one set of handlers per organisation and employee.

import { useEffect, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { attendanceService } from "../services/api";
import {
  AttendanceError, formatDuration, formatInstant, sessionDuration, storageKey, toDateKey,
  totalDuration, type AttendanceState,
} from "../services/attendanceSimulation";
import type { AttendanceScope } from "../types";

/** Where an action was started, so its confirmation or error appears in the same place. */
export type AttendanceSurface = "card" | "page";
/** "idle" can clock in, whether or not there are earlier sessions that day. */
export type AttendancePhase = "no-schedule" | "idle" | "clocked-in";
export type AttendanceAction = "clock-in" | "clock-out";

/** An open clock-out confirmation, or the error from the last action. */
export interface AttendancePrompt {
  surface: AttendanceSurface;
  action: AttendanceAction;
  /** The session a clock-out applies to. */
  sessionId?: string;
  error?: { message: string; retryable: boolean };
}

export interface AttendanceSnapshot extends AttendanceState {
  phase: AttendancePhase;
  pending: AttendanceAction | null;
  prompt: AttendancePrompt | null;
}

function createStore(scope: AttendanceScope) {
  const key = storageKey(scope);
  const listeners = new Set<() => void>();

  const read = () => {
    const state = attendanceService.getState(scope);
    const phase: AttendancePhase = !state.schedule ? "no-schedule" : state.active ? "clocked-in" : "idle";
    return { ...state, phase };
  };

  let snapshot: AttendanceSnapshot = { ...read(), pending: null, prompt: null };

  const set = (patch: Partial<AttendanceSnapshot>) => {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach(l => l());
  };

  const reload = () => {
    const next = read();
    // Drop a clock-out confirmation once another tab has already ended that session.
    const obsolete = snapshot.prompt?.action === "clock-out" && !snapshot.pending && next.active?.id !== snapshot.prompt.sessionId;
    set(obsolete ? { ...next, prompt: null } : next);
  };

  // Another tab changed the sessions, or the day rolled over.
  const onStorage = (e: StorageEvent) => { if (e.key === null || e.key === key) reload(); };
  const onTick = () => { if (toDateKey(new Date()) !== snapshot.today) reload(); };
  let timer: ReturnType<typeof setInterval> | undefined;

  const run = async (action: AttendanceAction, surface: AttendanceSurface, sessionId?: string) => {
    if (snapshot.pending) return;
    set({ pending: action, prompt: action === "clock-out" ? { surface, action, sessionId } : null });
    try {
      if (action === "clock-in") {
        const s = await attendanceService.clockIn(scope);
        toast.success(`Clocked in at ${formatInstant(s.clockInAt)}`);
      } else {
        const s = await attendanceService.clockOut(scope, sessionId ?? "");
        const day = attendanceService.getState(scope).records.find(r => r.sessions.some(x => x.id === s.id))?.sessions ?? [];
        toast.success(`Clocked out — ${formatDuration(sessionDuration(s))} worked`, {
          description: day.length > 1 ? `${formatDuration(totalDuration(day))} across ${day.length} sessions.` : undefined,
        });
      }
      set({ ...read(), pending: null, prompt: null });
    } catch (e) {
      const error = e instanceof AttendanceError
        ? { message: e.message, retryable: e.retryable }
        : { message: "Something went wrong. Please try again.", retryable: true };
      set({ ...read(), pending: null, prompt: { surface, action, sessionId, error } });
    }
  };

  return {
    subscribe(listener: () => void) {
      if (listeners.size === 0) {
        reload(); // catch up on anything missed while nothing was subscribed
        window.addEventListener("storage", onStorage);
        timer = setInterval(onTick, 30_000);
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", onStorage);
          clearInterval(timer);
          if (!snapshot.pending) snapshot = { ...snapshot, prompt: null }; // nothing is showing it any more
        }
      };
    },
    getSnapshot: () => snapshot,
    actions: {
      clockIn: (surface: AttendanceSurface) => run("clock-in", surface),
      /** Asks for confirmation; `confirm` completes it. */
      requestClockOut: (surface: AttendanceSurface) => {
        if (snapshot.active && !snapshot.pending) set({ prompt: { surface, action: "clock-out", sessionId: snapshot.active.id } });
      },
      /** Runs the prompted action: a confirmed clock-out, or a retry after an error. */
      confirm: () => { if (snapshot.prompt) void run(snapshot.prompt.action, snapshot.prompt.surface, snapshot.prompt.sessionId); },
      dismissPrompt: () => { if (snapshot.prompt && !snapshot.pending) set({ prompt: null }); },
    },
  };
}

const stores = new Map<string, ReturnType<typeof createStore>>();
function storeFor(scope: AttendanceScope) {
  const key = storageKey(scope);
  let store = stores.get(key);
  if (!store) {
    store = createStore(scope);
    stores.set(key, store);
  }
  return store;
}

export function useAttendance(scope: AttendanceScope) {
  const store = storeFor(scope);
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return { ...snapshot, ...store.actions };
}

/** Current time, updated every second while `active`. */
export function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);
  return now;
}
