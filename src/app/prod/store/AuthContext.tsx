import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { User, AuthStatus, Organization } from "../types";
import { authService } from "../services/api";

interface AuthState {
  status: AuthStatus; user: User | null; token: string | null;
  organizations: Organization[]; selectedOrgId: string | null;
  error: string | null; loginStep: "phone" | "pin" | "otp" | "org" | "done";
  phoneNumber: string;
}

type AuthAction =
  | { type: "LOADING" } | { type: "AUTH_SUCCESS"; user: User; token: string }
  | { type: "AUTH_ERROR"; error: string } | { type: "LOGOUT" }
  | { type: "SET_STEP"; step: AuthState["loginStep"] }
  | { type: "SET_PHONE"; phone: string } | { type: "SET_ORGS"; orgs: Organization[] }
  | { type: "SELECT_ORG"; orgId: string } | { type: "CLEAR_ERROR" } | { type: "SESSION_EXPIRED" };

interface AuthContextValue extends AuthState {
  requestOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string) => Promise<boolean>;
  loadOrganizations: () => Promise<void>;
  selectOrganization: (orgId: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const initial: AuthState = {
  status: "idle", user: null, token: null, organizations: [],
  selectedOrgId: null, error: null, loginStep: "phone", phoneNumber: "",
};

function reducer(s: AuthState, a: AuthAction): AuthState {
  switch (a.type) {
    case "LOADING":       return { ...s, status: "loading", error: null };
    case "AUTH_SUCCESS":  return { ...s, status: "authenticated", user: a.user, token: a.token, loginStep: "done", error: null };
    case "AUTH_ERROR":    return { ...s, status: a.error ? "error" : s.status, error: a.error || null };
    case "LOGOUT":        return { ...initial, status: "unauthenticated" };
    case "SET_STEP":      return { ...s, loginStep: a.step };
    case "SET_PHONE":     return { ...s, phoneNumber: a.phone };
    case "SET_ORGS":      return { ...s, organizations: a.orgs, status: "idle" };
    case "SELECT_ORG":    return { ...s, selectedOrgId: a.orgId };
    case "CLEAR_ERROR":   return { ...s, error: null };
    case "SESSION_EXPIRED": return { ...s, status: "session_expired", user: null, token: null };
    default: return s;
  }
}

const Ctx = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const requestOTP = useCallback(async (phone: string) => {
    dispatch({ type: "LOADING" });
    try {
      const r = await authService.requestOTP(phone);
      if (r.success) { dispatch({ type: "SET_PHONE", phone }); dispatch({ type: "SET_STEP", step: "otp" }); return true; }
      dispatch({ type: "AUTH_ERROR", error: "Failed to send OTP. Try again." });
      return false;
    } catch { dispatch({ type: "AUTH_ERROR", error: "Network error. Check your connection." }); return false; }
  }, []);

  const verifyOTP = useCallback(async (phone: string, otp: string) => {
    dispatch({ type: "LOADING" });
    try {
      const r = await authService.verifyOTP(phone, otp);
      if (r.success && r.token) {
        sessionStorage.setItem("notch_token", r.token);
        dispatch({ type: "SET_STEP", step: "org" });
        return true;
      }
      dispatch({ type: "AUTH_ERROR", error: "Invalid OTP. Please try again." });
      return false;
    } catch { dispatch({ type: "AUTH_ERROR", error: "Network error. Check your connection." }); return false; }
  }, []);

  const loadOrganizations = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const orgs = await authService.getOrganizations();
      dispatch({ type: "SET_ORGS", orgs });
    } catch { dispatch({ type: "AUTH_ERROR", error: "Could not load organizations." }); }
  }, []);

  const selectOrganization = useCallback(async (orgId: string) => {
    dispatch({ type: "LOADING" });
    try {
      await authService.selectOrganization(orgId);
      const user = await authService.getMe();
      const token = sessionStorage.getItem("notch_token") ?? "mock-token";
      dispatch({ type: "AUTH_SUCCESS", user, token });
    } catch { dispatch({ type: "AUTH_ERROR", error: "Could not select organization." }); }
  }, []);

  const logout = useCallback(async () => {
    try { await authService.logout(); } finally {
      sessionStorage.removeItem("notch_token");
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

  return (
    <Ctx.Provider value={{ ...state, requestOTP, verifyOTP, loadOrganizations, selectOrganization, logout, clearError }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
