import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const PERSONA = "Shola Adeleke";
const BASE = "https://test.notchhr.io/assets/images/";

const GRAD = "linear-gradient(135deg,#440f7c 0%,#d62196 100%)";

interface Slide {
  id: string;
  category: string | null;
  image: string;
  isCover?: boolean;
  isClose?: boolean;
  content: React.ReactNode;
}

const txt = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: "'Poppins',sans-serif",
  fontSize: 13.5,
  fontWeight: 400,
  color: "var(--foreground)",
  lineHeight: 1.7,
  margin: 0,
  ...extra,
});

const stat = (value: string, label: string) => (
  <div key={label} style={{
    display: "flex", flexDirection: "column", gap: 2,
    background: "var(--muted)", borderRadius: 12,
    padding: "12px 16px", border: "1px solid var(--border)", flex: 1,
  }}>
    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 22, fontWeight: 800, color: "var(--brand-purple-icon)", lineHeight: 1 }}>{value}</span>
    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500, color: "var(--muted-foreground)", lineHeight: 1.4 }}>{label}</span>
  </div>
);

const SLIDES: Slide[] = [
  {
    id: "cover",
    category: null,
    image: `${BASE}wrapped-cover-img.png`,
    isCover: true,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt({ fontSize: 20, fontWeight: 800, color: "var(--brand-purple-icon)", lineHeight: 1.25 })}>
          Your 2025 Year in Review with NotchHR
        </p>
        <p style={txt()}>
          Hello {PERSONA.split(" ")[0]} 👋 — as the curtain falls on 2025, it's time to look back at the year your team thrived, excelled, and made every moment count.
        </p>
        <p style={txt({ color: "var(--muted-foreground)" })}>
          Here's your unique journey, as seen through the NotchHR lens. 🧐
        </p>
      </div>
    ),
  },
  {
    id: "leave",
    category: "Leave Management",
    image: `${BASE}slide-2-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>
          No leave data recorded this cycle — but not to worry! Activate your leave module and your data will shine in the next NotchHR Rewind. 🏖️
        </p>
      </div>
    ),
  },
  {
    id: "payroll",
    category: "Payroll, Payments & Remittances",
    image: `${BASE}slide-3-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>Efficiency was the name of the game in 2025:</p>
        <div style={{ display: "flex", gap: 10 }}>
          {stat("80", "Payroll cycles processed seamlessly")}
          {stat("₦19.2M+", "Managed in combined payouts")}
        </div>
      </div>
    ),
  },
  {
    id: "headcount",
    category: "Employee Count",
    image: `${BASE}slide-5-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>Your workforce evolved significantly this year:</p>
        <div style={{ display: "flex", gap: 10 }}>
          {stat("76", "New employees joined ⚡")}
          {stat("239", "Total headcount by year-end")}
        </div>
        <p style={txt({ color: "var(--muted-foreground)", fontSize: 12 })}>
          A 469% increase from last year 💪
        </p>
      </div>
    ),
  },
  {
    id: "learning",
    category: "E-Learning",
    image: `${BASE}slide-6-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>Upskilling took center stage in 2025:</p>
        <div style={{ display: "flex", gap: 10 }}>
          {stat("1", "Enrollments in top course")}
          {stat("0.07 hrs", "Total training hours logged")}
        </div>
        <p style={txt({ color: "var(--muted-foreground)", fontSize: 12 })}>
          Most popular: <strong style={{ color: "var(--foreground)" }}>"TEsting HR FOrties"</strong> — completed by 1 team member.
        </p>
      </div>
    ),
  },
  {
    id: "performance",
    category: "Performance",
    image: `${BASE}slide-7-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>Your team's dedication to excellence shone through:</p>
        <div style={{ display: "flex", gap: 10 }}>
          {stat("2", "Performance reviews conducted 🚀")}
          {stat("0.38%", "Company-wide goals achieved 🏆")}
        </div>
      </div>
    ),
  },
  {
    id: "attendance",
    category: "Attendance",
    image: `${BASE}slide-5-wrap.png`,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt()}>Your team showed remarkable commitment this year:</p>
        <div style={{ display: "flex", gap: 10 }}>
          {stat("68%", "Top attendance score 🤗")}
          {stat("Apr 8", "Busiest single day")}
        </div>
        <p style={txt({ color: "var(--muted-foreground)", fontSize: 12 })}>
          Most punctual: <strong style={{ color: "var(--foreground)" }}>LIFE IPSALES</strong>
        </p>
      </div>
    ),
  },
  {
    id: "close",
    category: null,
    image: `${BASE}slide-3-wrap.png`,
    isClose: true,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={txt({ fontSize: 15, fontWeight: 700, color: "var(--brand-purple-icon)" })}>
          Here's to an even greater 2026, {PERSONA.split(" ")[0]}! 🎉
        </p>
        <p style={txt()}>
          From onboarding new talent to fostering growth through learning and development, your 2025 was nothing short of inspiring. As we gear up for 2026, let's aim for even greater milestones together. 💪
        </p>
        <p style={txt({ color: "var(--muted-foreground)", fontSize: 12 })}>
          Here's to your continued success ✨ — powered by NotchHR!<br />
          Warm regards, 🙏 The NotchHR Team
        </p>
      </div>
    ),
  },
];

// ── Modal ────────────────────────────────────────────────────────────────────
export function RewindModal({ onClose }: { onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [busy, setBusy] = useState(false);
  const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set());
  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const pct = Math.round(((idx + 1) / total) * 100);
  const imgLoaded = loadedSet.has(slide.image);

  // Preload every slide image the moment the modal opens
  useEffect(() => {
    SLIDES.forEach(s => {
      const img = new Image();
      img.onload = () => setLoadedSet(prev => new Set(prev).add(s.image));
      img.src = s.image;
    });
  }, []);

  const go = (d: "next" | "prev") => {
    if (busy) return;
    const next = d === "next" ? idx + 1 : idx - 1;
    if (next < 0 || next >= total) return;
    setDir(d);
    setBusy(true);
    setTimeout(() => { setIdx(next); setBusy(false); }, 280);
  };

  return (
    <>
      <style>{`
        @keyframes rw-in-next { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:none; } }
        @keyframes rw-in-prev { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:none; } }
        @keyframes rw-shimmer  { from { background-position:200% 0; } to { background-position:-200% 0; } }
        .rw-next { animation: rw-in-next 0.28s ease both; }
        .rw-prev { animation: rw-in-prev 0.28s ease both; }
      `}</style>

      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(10,5,20,0.7)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}>
        {/* Shell */}
        <div onClick={e => e.stopPropagation()} style={{
          width: "100%", maxWidth: 880,
          maxHeight: "calc(100vh - 40px)",
          background: "var(--card)",
          borderRadius: 24,
          boxShadow: "0 32px 80px rgba(68,15,124,0.32),0 8px 24px rgba(0,0,0,0.14)",
          border: "1px solid var(--border)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}>

          {/* ── Header bar ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 20px 12px",
            borderBottom: "1px solid var(--border)", flexShrink: 0,
            background: "var(--card)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={15} style={{ color: "white" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 700, color: "var(--brand-purple-icon)", lineHeight: 1.2 }}>NotchHR Rewind</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, color: "var(--muted-foreground)", fontWeight: 500 }}>2025 Year in Review</div>
              </div>
            </div>
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 10,
              background: "var(--muted)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <X size={15} style={{ color: "var(--muted-foreground)" }} />
            </button>
          </div>

          {/* ── Progress strip ── */}
          <div style={{ height: 3, background: "var(--border)", flexShrink: 0 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: GRAD, transition: "width 0.35s ease" }} />
          </div>

          {/* ── Slide body (two-column on wide screens) ── */}
          <div
            key={idx}
            className={dir === "next" ? "rw-next" : "rw-prev"}
            style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}
          >
            {/* Category label */}
            {slide.category && (
              <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
                <span style={{
                  display: "inline-block", padding: "4px 14px", borderRadius: 20,
                  background: GRAD,
                  fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 700,
                  color: "white", letterSpacing: "0.07em", textTransform: "uppercase",
                }}>
                  {slide.category}
                </span>
              </div>
            )}

            {/* Image — shimmer until loaded, then fade in */}
            <div style={{ padding: slide.category ? "14px 24px 0" : "20px 24px 0", flexShrink: 0 }}>
              <div style={{
                borderRadius: 16, overflow: "hidden",
                height: 260, background: "var(--muted)",
                position: "relative",
              }}>
                {/* Shimmer skeleton */}
                {!imgLoaded && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 16,
                    background: "linear-gradient(90deg,var(--muted) 25%,var(--border) 50%,var(--muted) 75%)",
                    backgroundSize: "200% 100%",
                    animation: "rw-shimmer 1.4s ease infinite",
                  }} />
                )}
                <img
                  src={slide.image}
                  alt={slide.category ?? "NotchHR Rewind"}
                  style={{
                    width: "100%", height: "100%", objectFit: "contain", display: "block",
                    opacity: imgLoaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 24px 24px", flexShrink: 0 }}>
              {slide.content}
            </div>
          </div>

          {/* ── Footer nav ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 20px 16px",
            borderTop: "1px solid var(--border)", flexShrink: 0, gap: 12,
          }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {SLIDES.map((_, i) => (
                <button key={i}
                  onClick={() => { setDir(i > idx ? "next" : "prev"); setIdx(i); }}
                  style={{
                    width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                    background: i === idx ? "var(--brand-purple)" : "var(--border)",
                    border: "none", cursor: "pointer", padding: 0,
                    transition: "all 0.25s ease",
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => go("prev")} disabled={idx === 0} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 16px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--muted)",
                fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 500,
                color: "var(--foreground)",
                cursor: idx === 0 ? "not-allowed" : "pointer",
                opacity: idx === 0 ? 0.35 : 1, transition: "opacity 0.2s",
              }}>
                <ChevronLeft size={14} /> Back
              </button>

              {idx < total - 1 ? (
                <button onClick={() => go("next")} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "8px 20px", borderRadius: 10,
                  border: "none", background: GRAD,
                  fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600,
                  color: "white", cursor: "pointer",
                }}>
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button onClick={onClose} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 20px", borderRadius: 10,
                  border: "none", background: GRAD,
                  fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 700,
                  color: "white", cursor: "pointer",
                }}>
                  Done 🎉
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Reminder widget ──────────────────────────────────────────────────────────
export function RewindReminder() {
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snooze = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    timer.current = setTimeout(() => setVisible(true), 240_000);
  };

  const open = () => { setVisible(false); setModalOpen(true); };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <>
      {visible && (
        <div onClick={open} style={{
          position: "absolute", bottom: 24, right: 24, zIndex: 250,
          width: 272, cursor: "pointer",
          background: "var(--card)",
          borderRadius: 18, overflow: "hidden",
          boxShadow: "0 10px 36px rgba(68,15,124,0.24),0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid var(--border)",
          fontFamily: "'Poppins',sans-serif",
        }}>
          {/* Top gradient strip */}
          <div style={{ height: 4, background: GRAD }} />

          <div style={{ padding: "12px 14px 14px" }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: GRAD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={16} style={{ color: "white" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-purple-icon)", lineHeight: 1.2 }}>NotchHR Rewind</div>
                  <div style={{ fontSize: 10, color: "var(--muted-foreground)", fontWeight: 500, marginTop: 1 }}>2025 Year in Review</div>
                </div>
              </div>
              <button onClick={snooze} style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 2,
                background: "var(--muted)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <X size={11} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>

            <p style={{ fontSize: 11, color: "var(--foreground)", lineHeight: 1.6, margin: "0 0 12px", fontWeight: 400 }}>
              Your 2025 highlights are ready, <strong>{PERSONA.split(" ")[0]}</strong>! See how your team performed across payroll, attendance, and more.
            </p>

            {/* CTA */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 12px", borderRadius: 10,
              background: "linear-gradient(135deg,rgba(68,15,124,0.08),rgba(214,33,150,0.06))",
              border: "1px solid rgba(68,15,124,0.14)",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-magenta-icon)" }}>View your Rewind</span>
              <ArrowRight size={13} style={{ color: "var(--brand-magenta-icon)" }} />
            </div>
          </div>
        </div>
      )}

      {modalOpen && <RewindModal onClose={() => { setModalOpen(false); timer.current = setTimeout(() => setVisible(true), 240_000); }} />}
    </>
  );
}
