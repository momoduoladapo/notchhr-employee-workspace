import React from "react";
import { ArrowRight } from "lucide-react";
import { C, S, type PlanId } from "./tokens";
import { PHOTOS, CARD_SPAN_DEFAULT, CARD_SPAN_MIN, CARD_SPAN_MAX, CARD_SPAN_PLAN_OVERRIDE } from "./data";

export function Av({ name, color = C.purple, size = "md" }: { name: string; color?: string; size?: "xs" | "sm" | "md" | "lg" }) {
  const s = { xs: "w-5 h-5", sm: "w-7 h-7", md: "w-9 h-9", lg: "w-11 h-11" };
  const t = { xs: "text-[8px]", sm: "text-[10px]", md: "text-xs", lg: "text-sm" };
  const photo = PHOTOS[name];
  if (photo) return <img src={photo} alt={name} className={`${s[size]} rounded-full object-cover flex-shrink-0 border-2 border-white`} />;
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`${s[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`} style={{ backgroundColor: color }}>
      <span className={t[size]}>{initials}</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-card rounded-2xl p-4 shadow-sm border border-border h-full ${className}`}>{children}</div>;
}

export function SecHead({ title, count, link }: { title: string; count?: number; link?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold" style={{ color: C.tertiary }}>{title}</span>
        {count !== undefined && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: C.magenta100, color: C.magentaIcon }}>{count}</span>
        )}
      </div>
      {link && <button className="text-[11px] font-medium" style={{ color: C.magentaIcon }}>{link}</button>}
    </div>
  );
}

export function EmptyCard({ icon: Icon, title, body, cta }: { icon: React.ElementType; title: string; body: string; cta?: string }) {
  return (
    <div className="flex flex-col items-center text-center py-3">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 flex-shrink-0" style={{ background: C.purple100 }}>
        <Icon size={18} style={{ color: C.purpleIcon }} />
      </div>
      <div className="text-[12px] font-semibold mb-1" style={{ color: C.tertiary }}>{title}</div>
      <div className="text-[10px] leading-relaxed mb-3 max-w-[200px]" style={{ color: C.tertiary }}>{body}</div>
      {cta && (
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-white" style={{ background: C.purple }}>
          {cta} <ArrowRight size={10} />
        </button>
      )}
    </div>
  );
}

export function ProfileProgress({ pct }: { pct: number }) {
  return (
    <div className="mb-3 px-3 py-2.5 rounded-xl" style={{ background: S.warning50, border: `1px solid ${S.warning100}` }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-semibold" style={{ color: C.tertiary }}>Profile Completion</span>
        <span className="text-[10px] font-bold" style={{ color: C.tertiary }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: S.warning100 }}>
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: S.warning }} />
      </div>
      <div className="text-[9px] mt-1" style={{ color: C.tertiary }}>Complete your profile to unlock all features</div>
    </div>
  );
}

export function packLayout(cards: string[], plan: PlanId): Array<{ id: string; span: number }> {
  const COLS = 12;
  const po   = (id: string) => CARD_SPAN_PLAN_OVERRIDE[id]?.[plan];
  const def  = (id: string) => po(id)?.default ?? CARD_SPAN_DEFAULT[id] ?? 3;
  const min  = (id: string) => po(id)?.min     ?? CARD_SPAN_MIN[id]     ?? 3;
  const max  = (id: string) => po(id)?.max     ?? CARD_SPAN_MAX[id]     ?? 12;
  const clamp = (id: string, n: number) => Math.max(min(id), Math.min(max(id), n));

  const rows: string[][] = [];
  let row: string[] = [];
  let rowSpan = 0;

  for (const id of cards) {
    const d = clamp(id, def(id));
    const m = min(id);
    if (rowSpan + d <= COLS) {
      row.push(id); rowSpan += d;
      if (rowSpan === COLS) { rows.push(row); row = []; rowSpan = 0; }
    } else if (row.length > 0 && rowSpan + m <= COLS) {
      row.push(id); rowSpan += m;
      if (rowSpan === COLS) { rows.push(row); row = []; rowSpan = 0; }
    } else {
      if (row.length > 0) rows.push(row);
      row = [id]; rowSpan = d;
    }
  }
  if (row.length > 0) rows.push(row);

  const result: Array<{ id: string; span: number }> = [];

  for (const rowCards of rows) {
    const spans = rowCards.map(id => clamp(id, def(id)));
    let total   = spans.reduce((s, x) => s + x, 0);
    let budget  = COLS - total;

    if (budget > 0) {
      for (let i = 0; i < rowCards.length && budget > 0; i++) {
        const want  = clamp(rowCards[i], def(rowCards[i]));
        const grow  = Math.min(want - spans[i], budget);
        if (grow > 0) { spans[i] += grow; budget -= grow; }
      }
      const order = rowCards.map((_id, i) => i).sort((a, b) => max(rowCards[b]) - max(rowCards[a]));
      for (const i of order) {
        if (budget <= 0) break;
        const grow = Math.min(max(rowCards[i]) - spans[i], budget);
        if (grow > 0) { spans[i] += grow; budget -= grow; }
      }
    } else if (budget < 0) {
      let excess = -budget;
      for (let i = rowCards.length - 1; i >= 0 && excess > 0; i--) {
        const shrink = Math.min(spans[i] - min(rowCards[i]), excess);
        if (shrink > 0) { spans[i] -= shrink; excess -= shrink; }
      }
    }

    rowCards.forEach((id, i) => result.push({ id, span: spans[i] }));
  }

  return result;
}
