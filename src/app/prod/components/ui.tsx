// ─── NotchHR UI Primitives ────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { ChevronDown, X, Check, AlertCircle, CheckCircle, Info, AlertTriangle, Loader2 } from "lucide-react";

export function cn(...inputs: ClassValue[]) { return clsx(inputs); }

// ── Button ────────────────────────────────────────────────────────────────────
type BtnVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type BtnSize = "xs" | "sm" | "md" | "lg";

const BTN_V: Record<BtnVariant, string> = {
  primary:   "bg-[#440F7C] text-white hover:bg-[#360b63] disabled:opacity-50",
  secondary: "bg-[#440F7C]/10 text-[#440F7C] hover:bg-[#440F7C]/15 disabled:opacity-50",
  ghost:     "bg-transparent text-foreground hover:bg-muted disabled:opacity-50",
  danger:    "bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50",
  outline:   "bg-transparent border border-border text-foreground hover:bg-muted disabled:opacity-50",
};
const BTN_S: Record<BtnSize, string> = {
  xs: "text-xs px-2.5 py-1 gap-1.5 rounded-md",
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2 gap-2 rounded-lg",
  lg: "text-sm px-5 py-2.5 gap-2 rounded-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant; size?: BtnSize; loading?: boolean;
  icon?: React.ReactNode; iconRight?: React.ReactNode;
}
export function Button({ children, variant = "primary", size = "md", loading, icon, iconRight, className, disabled, ...p }: ButtonProps) {
  return (
    <button disabled={disabled || loading} className={cn("inline-flex items-center justify-center font-medium transition-all select-none", BTN_V[variant], BTN_S[size], className)} {...p}>
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; hint?: string;
  icon?: React.ReactNode; iconRight?: React.ReactNode;
}
export function Input({ label, error, hint, icon, iconRight, className, id, ...p }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}{p.required && <span className="text-[#D62196] ml-0.5">*</span>}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input id={inputId} className={cn("w-full bg-input-background border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10", error ? "border-destructive" : "border-border", icon && "pl-9", iconRight && "pr-9", className)} {...p} />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{iconRight}</span>}
      </div>
      {error && <span className="text-xs text-destructive flex items-center gap-1"><AlertCircle size={12} />{error}</span>}
      {hint && !error && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string; error?: string; options: { label: string; value: string }[];
}
export function Select({ label, error, options, className, id, ...p }: SelectProps) {
  const sid = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={sid} className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <select id={sid} className={cn("w-full bg-input-background border rounded-lg px-3 py-2 text-sm text-foreground appearance-none pr-8 transition-all focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10", error ? "border-destructive" : "border-border", className)} {...p}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple" | "magenta";
const BADGE_V: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-[#f0fdf4] text-[#14532d] dark:bg-[#1e3d28] dark:text-[#4ade80]",
  warning: "bg-[#fffbeb] text-[#78350f] dark:bg-[#3d2810] dark:text-[#fcd34d]",
  error:   "bg-[#fef2f2] text-[#7f1d1d] dark:bg-[#3d1e1e] dark:text-[#f87171]",
  info:    "bg-[#eff6ff] text-[#1e3a8a] dark:bg-[#1e2840] dark:text-[#60a5fa]",
  purple:  "bg-[#440F7C]/10 text-[#440F7C]",
  magenta: "bg-[#D62196]/10 text-[#D62196]",
};
interface BadgeProps { children: React.ReactNode; variant?: BadgeVariant; className?: string; dot?: boolean; }
export function Badge({ children, variant = "default", className, dot }: BadgeProps) {
  return <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full", BADGE_V[variant], className)}>{dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}{children}</span>;
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className, noPadding }: { children: React.ReactNode; className?: string; noPadding?: boolean }) {
  return <div className={cn("bg-card border border-border rounded-xl shadow-sm", !noPadding && "p-5", className)}>{children}</div>;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps { open: boolean; onClose: () => void; title?: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg" | "xl"; }
const MODAL_S = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };
export function Modal({ open, onClose, title, description, children, footer, size = "md" }: ModalProps) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full bg-card rounded-2xl shadow-2xl border border-border", MODAL_S[size])}>
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-border">
            <div>{title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}{description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}</div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-4"><X size={16} className="text-muted-foreground" /></button>
          </div>
        )}
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 px-5 pb-5">{footer}</div>}
      </div>
    </div>
  );
}

// ── Confirm Dialog ────────────────────────────────────────────────────────────
interface ConfirmProps { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description: string; confirmLabel?: string; cancelLabel?: string; destructive?: boolean; loading?: boolean; }
export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", destructive, loading }: ConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex gap-2 justify-end mt-5">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
        <Button variant={destructive ? "danger" : "primary"} size="sm" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
interface TabsProps { tabs: { label: string; value: string; count?: number }[]; active: string; onChange: (v: string) => void; className?: string; }
export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-0.5 p-0.5 bg-muted rounded-lg", className)}>
      {tabs.map(t => (
        <button key={t.value} onClick={() => onChange(t.value)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all", active === t.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
          {t.label}{t.count !== undefined && <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", active === t.value ? "bg-primary/10 text-primary" : "bg-muted-foreground/15 text-muted-foreground")}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function UnderlineTabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-0 border-b border-border", className)}>
      {tabs.map(t => (
        <button key={t.value} onClick={() => onChange(t.value)} className={cn("flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px", active === t.value ? "border-[#440F7C] text-[#440F7C]" : "border-transparent text-muted-foreground hover:text-foreground")}>
          {t.label}{t.count !== undefined && <Badge variant={active === t.value ? "purple" : "default"}>{t.count}</Badge>}
        </button>
      ))}
    </div>
  );
}

// ── Alert ─────────────────────────────────────────────────────────────────────
const ALERT_S: Record<string, { bg: string; Icon: React.ElementType; ic: string }> = {
  info:    { bg: "bg-[#eff6ff] border-[#1e3a8a]/20", Icon: Info,          ic: "text-[#1e3a8a]" },
  success: { bg: "bg-[#f0fdf4] border-[#14532d]/20", Icon: CheckCircle,   ic: "text-[#14532d]" },
  warning: { bg: "bg-[#fffbeb] border-[#78350f]/20", Icon: AlertTriangle, ic: "text-[#78350f]" },
  error:   { bg: "bg-[#fef2f2] border-[#7f1d1d]/20", Icon: AlertCircle,  ic: "text-[#7f1d1d]" },
};
interface AlertProps { variant?: "info" | "success" | "warning" | "error"; title?: string; children: React.ReactNode; className?: string; onClose?: () => void; }
export function Alert({ variant = "info", title, children, className, onClose }: AlertProps) {
  const { bg, Icon, ic } = ALERT_S[variant];
  return (
    <div className={cn("flex gap-3 p-3.5 rounded-xl border", bg, className)}>
      <Icon size={16} className={cn("flex-shrink-0 mt-0.5", ic)} />
      <div className="flex-1 min-w-0">{title && <div className="text-sm font-semibold text-foreground mb-0.5">{title}</div>}<div className="text-sm text-muted-foreground">{children}</div></div>
      {onClose && <button onClick={onClose} className="flex-shrink-0 text-muted-foreground hover:text-foreground"><X size={14} /></button>}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
interface EmptyProps { icon?: React.ElementType; title: string; description?: string; action?: React.ReactNode; className?: string; }
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {Icon && <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4"><Icon size={24} className="text-muted-foreground" /></div>}
      <div className="text-base font-semibold text-foreground mb-1">{title}</div>
      {description && <div className="text-sm text-muted-foreground max-w-xs">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── Loading ───────────────────────────────────────────────────────────────────
export function LoadingSpinner({ className }: { className?: string }) {
  return <div className={cn("flex items-center justify-center py-16", className)}><Loader2 size={28} className="animate-spin text-[#440F7C]" /></div>;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps { label: string; value: string | number; sub?: string; icon?: React.ElementType; iconBg?: string; trend?: { value: number; positive?: boolean }; className?: string; }
export function StatCard({ label, value, sub, icon: Icon, iconBg = "bg-primary/10", trend, className }: StatCardProps) {
  return (
    <Card className={cn("flex items-start gap-4", className)}>
      {Icon && <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}><Icon size={20} className="text-[#440F7C]" /></div>}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-1 font-medium">{label}</div>
        <div className="text-2xl font-bold text-foreground leading-tight">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
        {trend && <div className={cn("text-xs font-medium mt-1", trend.positive !== false ? "text-[#14532d]" : "text-[#7f1d1d]")}>{trend.positive !== false ? "↑" : "↓"} {Math.abs(trend.value)}% from last month</div>}
      </div>
    </Card>
  );
}

// ── Search Bar ────────────────────────────────────────────────────────────────
interface SearchBarProps { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; }
export function SearchBar({ value, onChange, placeholder = "Search…", className }: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-9 pr-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60" />
      {value && <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X size={14} /></button>}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps { page: number; pageSize: number; total: number; onPageChange: (p: number) => void; }
export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const pages = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-muted-foreground">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-30"><ChevronDown size={14} className="rotate-90" /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1).reduce<(number | "...")[]>((acc, p, i, arr) => { if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("..."); acc.push(p); return acc; }, []).map((p, i) =>
          p === "..." ? <span key={`e${i}`} className="px-1 text-xs text-muted-foreground">…</span> :
          <button key={p} onClick={() => onPageChange(p as number)} className={cn("w-7 h-7 rounded-md text-xs font-medium transition-all", page === p ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground")}>{p}</button>
        )}
        <button onClick={() => onPageChange(page + 1)} disabled={page >= pages} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground disabled:opacity-30"><ChevronDown size={14} className="-rotate-90" /></button>
      </div>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
const AV_S = { xs: "w-6 h-6 text-[9px]", sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };
interface AvatarProps { name: string; src?: string; size?: "xs" | "sm" | "md" | "lg"; className?: string; }
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  if (src) return <img src={src} alt={name} className={cn("rounded-full object-cover flex-shrink-0", AV_S[size], className)} />;
  return <div className={cn("rounded-full bg-[#440F7C] text-white font-bold flex items-center justify-center flex-shrink-0", AV_S[size], className)}>{initials}</div>;
}

// ── Page Header ───────────────────────────────────────────────────────────────
interface PageHeaderProps { title: string; description?: string; actions?: React.ReactNode; className?: string; }
export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div><h2 className="text-xl font-bold text-foreground">{title}</h2>{description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}</div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────
interface DrawerProps { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; footer?: React.ReactNode; side?: "right" | "left"; width?: string; }
export function Drawer({ open, onClose, title, children, footer, side = "right", width = "w-96" }: DrawerProps) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <div className={cn("fixed inset-0 z-50 flex", side === "right" && "justify-end", !open && "pointer-events-none")}>
      <div className={cn("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")} onClick={onClose} />
      <div className={cn("relative bg-card h-full flex flex-col shadow-2xl transition-transform duration-300", width, side === "right" ? open ? "translate-x-0" : "translate-x-full" : open ? "translate-x-0" : "-translate-x-full")}>
        {title && <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0"><h3 className="text-base font-semibold text-foreground">{title}</h3><button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X size={16} className="text-muted-foreground" /></button></div>}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-border flex gap-2 justify-end flex-shrink-0">{footer}</div>}
      </div>
    </div>
  );
}

// ── Dropdown Menu ─────────────────────────────────────────────────────────────
interface DropdownItem { label: string; icon?: React.ElementType; onClick: () => void; destructive?: boolean; divider?: boolean; }
interface DropdownMenuProps { trigger: React.ReactNode; items: DropdownItem[]; align?: "left" | "right"; }
export function DropdownMenu({ trigger, items, align = "right" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(o => !o)}>{trigger}</div>
      {open && (
        <div className={cn("absolute top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-xl py-1 min-w-[160px]", align === "right" ? "right-0" : "left-0")}>
          {items.map((item, i) => (
            <div key={i}>
              {item.divider && <div className="border-t border-border my-1" />}
              <button onClick={() => { item.onClick(); setOpen(false); }} className={cn("flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors", item.destructive ? "text-destructive hover:bg-destructive/5" : "text-foreground hover:bg-muted")}>
                {item.icon && <item.icon size={14} className="flex-shrink-0 text-muted-foreground" />}{item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
interface ProgressBarProps { value: number; max?: number; className?: string; color?: string; showLabel?: boolean; }
export function ProgressBar({ value, max = 100, className, color = "#440F7C", showLabel }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} /></div>
      {showLabel && <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>}
    </div>
  );
}
