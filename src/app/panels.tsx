import { useState } from "react";
import {
  Bell, Clock, FileText, DollarSign, Calendar, TrendingUp, GraduationCap,
  LayoutGrid, Globe, HelpCircle, Settings, LogOut, Sliders,
  Command, Info, Building2, Shield, Check, X, ChevronRight, ExternalLink,
  ArrowRight, Sparkles,
} from "lucide-react";
import { RewindModal } from "./rewind";
import { toast } from "sonner";
import { C, S, type PlanId, type ScenarioId } from "./tokens";
import {
  APP_MODULES, has, PLAN_META, EMPLOYEE, PHOTOS,
  RECENT_SEARCHES, SEARCH_DATA, LANGUAGES, NOTIFS, PROFILE_GROUPS,
} from "./data";
import { Av } from "./shared";
import svgPaths from "@/imports/Header/svg-dsmq9ulj5k";

export function AppLauncher({ plan, isOpen, onToggle, nudge = false }: { plan: PlanId; isOpen: boolean; onToggle: () => void; nudge?: boolean }) {
  return (
    <div id="tour-launcher" style={{ position: "relative", flexShrink: 0 }}>
      {nudge && (
        <div style={{
          position: "absolute", inset: -3, borderRadius: "50%", zIndex: 0, pointerEvents: "none",
          background: `conic-gradient(${C.purple}, ${C.magenta}, #f97316, ${C.purple})`,
          animation: "spin 2s linear infinite",
        }} />
      )}
      {nudge && (
        <div style={{ position: "absolute", inset: -1, borderRadius: "50%", zIndex: 1, background: "var(--card)", pointerEvents: "none" }} />
      )}
      <button onClick={onToggle}
        className="flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors"
        style={{ background: isOpen ? C.purple100 : "var(--brand-tertiary100)", position: "relative", zIndex: 2 }}
        title="App Launcher">
        <LayoutGrid size={17} style={{ color: isOpen ? C.purpleIcon : nudge ? C.purpleIcon : C.tertiary }} />
      </button>
    </div>
  );
}

export function AppLauncherPanel({ plan, onClose }: { plan: PlanId; onClose: () => void }) {
  const tiles = APP_MODULES.filter(m => m.module === null || has(plan, m.module));
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(68,15,124,0.16), 0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="px-5 py-4 border-b border-border" style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)` }}>
        <div className="text-[13px] font-bold" style={{ color: C.tertiary }}>My Workspace</div>
      </div>
      <div className="p-4 grid grid-cols-4 gap-1.5 max-h-[360px] overflow-y-auto">
        {tiles.map(m => (
          <button key={m.id} onClick={onClose}
            className="flex flex-col items-center gap-1.5 px-1 py-3 rounded-xl transition-colors hover:bg-muted">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: m.iconBg }}>
              <m.icon size={20} style={{ color: m.iconFg }} />
            </div>
            <span className="text-[10px] font-medium text-center leading-tight" style={{ color: C.tertiary }}>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;
  const filtered = hasQuery
    ? SEARCH_DATA.employees.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.role.toLowerCase().includes(query.toLowerCase()))
    : SEARCH_DATA.employees;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" style={{ background: "rgba(45,38,64,0.38)" }} onClick={onClose} />
      <div className="absolute left-0 right-0 top-full z-50 bg-card"
        style={{ borderRadius: "0 0 20px 20px", boxShadow: "0 16px 48px rgba(68,15,124,0.18)", display: "flex", flexDirection: "column", maxHeight: "74vh", overflow: "hidden" }}>

        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
          <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p32697080} stroke={C.tertiary400} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Escape" && onClose()}
            placeholder="Search employees, documents, modules, actions…"
            className="flex-1 text-[13px] outline-none bg-transparent"
            style={{ color: C.tertiary, caretColor: C.purple, fontFamily: "'Poppins', sans-serif" }}
          />
          {hasQuery && (
            <button onClick={() => setQuery("")}
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-muted transition-colors">
              <X size={12} style={{ color: C.tertiary }} />
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1">
          {!hasQuery ? (
            <div className="flex divide-x divide-border">
              <div className="flex-1 px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: C.tertiary400 }}>Recent Searches</div>
                <div className="space-y-0.5">
                  {RECENT_SEARCHES.map(s => (
                    <button key={s} onClick={() => setQuery(s)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-muted text-left transition-colors">
                      <Clock size={12} style={{ color: C.tertiary400, flexShrink: 0 }} />
                      <span className="text-[12px]" style={{ color: C.tertiary }}>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: C.tertiary400 }}>Quick Actions</div>
                <div className="space-y-0.5">
                  {SEARCH_DATA.quickActions.map(a => (
                    <button key={a.label} onClick={onClose}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-muted text-left transition-colors">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
                        <a.icon size={12} style={{ color: C.purpleIcon }} />
                      </div>
                      <span className="text-[12px]" style={{ color: C.tertiary }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <div className="px-5 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: C.tertiary400 }}>Employees</div>
              {filtered.length > 0 ? filtered.map(emp => (
                <button key={emp.name} onClick={onClose}
                  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-muted text-left transition-colors">
                  <Av name={emp.name} color={emp.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{emp.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary }}>{emp.role} · {emp.dept}</div>
                  </div>
                  <ArrowRight size={13} style={{ color: C.tertiary400, flexShrink: 0 }} />
                </button>
              )) : (
                <div className="px-5 py-2 text-[12px]" style={{ color: C.tertiary400 }}>No employees match "{query}"</div>
              )}

              <div className="px-5 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: C.tertiary400 }}>Documents</div>
              {SEARCH_DATA.documents.map(doc => (
                <button key={doc.name} onClick={onClose}
                  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-muted text-left transition-colors">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
                    <FileText size={13} style={{ color: C.purpleIcon }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold" style={{ color: C.tertiary }}>{doc.name}</div>
                    <div className="text-[10px]" style={{ color: C.tertiary }}>{doc.type} · {doc.date}</div>
                  </div>
                  <ArrowRight size={13} style={{ color: C.tertiary400, flexShrink: 0 }} />
                </button>
              ))}

              <div className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: C.tertiary400 }}>Modules</div>
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {SEARCH_DATA.modules.map(mod => (
                  <button key={mod.name} onClick={onClose}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border hover:opacity-80 transition-opacity"
                    style={{ background: C.purple100 }}>
                    <mod.icon size={13} style={{ color: C.purpleIcon }} />
                    <span className="text-[11px] font-semibold" style={{ color: C.tertiary }}>{mod.name}</span>
                  </button>
                ))}
              </div>

              <div className="px-5 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: C.tertiary400 }}>Quick Actions</div>
              {SEARCH_DATA.quickActions.map(a => (
                <button key={a.label} onClick={onClose}
                  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-muted text-left transition-colors">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.purple100 }}>
                    <a.icon size={13} style={{ color: C.purpleIcon }} />
                  </div>
                  <span className="text-[12px]" style={{ color: C.tertiary }}>{a.label}</span>
                  <ArrowRight size={13} className="ml-auto" style={{ color: C.tertiary400, flexShrink: 0 }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end px-5 py-2.5 border-t border-border" style={{ background: C.tertiary50 }}>
        </div>
      </div>
    </>
  );
}

export function LanguageTrigger({ selectedCode, isOpen, onToggle }: { selectedCode: string; isOpen: boolean; onToggle: () => void }) {
  const current = LANGUAGES.find(l => l.code === selectedCode)!;
  return (
    <button onClick={onToggle}
      className="flex items-center gap-1 h-[32px] px-[9px] rounded-full border transition-all flex-shrink-0"
      style={{ borderColor: isOpen ? C.purple300 : "var(--border)", background: isOpen ? C.purple100 : "var(--card)" }}>
      <span className="text-base leading-none">{current.flag}</span>
      <span className="text-[12px] font-semibold" style={{ color: isOpen ? C.tertiary800 : C.tertiary }}>{current.code.toUpperCase()}</span>
    </button>
  );
}

export function LanguageSelectorPanel({ selectedCode, onSelect }: { selectedCode: string; onSelect: (code: string) => void }) {
  const current = LANGUAGES.find(l => l.code === selectedCode)!;
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(68,15,124,0.14)" }}>
      <div className="px-4 py-3 border-b border-border" style={{ background: C.tertiary50 }}>
        <div className="text-[12px] font-bold" style={{ color: C.tertiary }}>Language & Region</div>
        <div className="text-[10px] mt-0.5" style={{ color: C.tertiary }}>Currently: {current.label}</div>
      </div>
      <div className="py-1.5 max-h-[320px] overflow-y-auto">
        {LANGUAGES.map(lang => {
          const active = selectedCode === lang.code;
          return (
            <button key={lang.code} onClick={() => onSelect(lang.code)}
              className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-muted"
              style={{ background: active ? C.purple100 : "transparent" }}>
              <span className="text-xl leading-none flex-shrink-0">{lang.flag}</span>
              <div className="flex-1 text-left min-w-0">
                <div className="text-[12px] font-medium" style={{ color: C.tertiary }}>{lang.label}</div>
                <div className="text-[10px]" style={{ color: C.tertiary, direction: lang.code === "ar" ? "rtl" : "ltr" }}>{lang.native}</div>
              </div>
              {active && <Check size={14} style={{ color: C.purpleIcon, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NotifTrigger({ unreadCount, isOpen, onToggle }: { unreadCount: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className="relative flex items-center justify-center w-[36px] h-[36px] rounded-full transition-colors flex-shrink-0"
      style={{ background: isOpen ? C.purple100 : "var(--brand-tertiary100)" }}>
      <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 17 17">
        <path d={svgPaths.p11013580} stroke={isOpen ? C.purpleIcon : C.tertiary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        <path d={svgPaths.p12c36f00} stroke={isOpen ? C.purpleIcon : C.tertiary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold text-white leading-none"
          style={{ background: C.magenta }}>{unreadCount}</span>
      )}
    </button>
  );
}

export function NotificationPanel({ markedAll, onMarkAll, onClose }: { markedAll: boolean; onMarkAll: () => void; onClose: () => void }) {
  const unreadCount = markedAll ? 0 : NOTIFS.filter(n => !n.read).length;
  const groups = ["Today", "Yesterday", "Earlier"] as const;
  return (
    <div className="bg-card rounded-2xl border border-border"
      style={{ maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(68,15,124,0.16)" }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold" style={{ color: C.tertiary }}>Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.magenta }}>{unreadCount} new</span>
          )}
        </div>
        <button onClick={onMarkAll}
          className="text-[11px] font-semibold transition-opacity"
          style={{ color: unreadCount > 0 ? C.purple : C.tertiary400, opacity: unreadCount > 0 ? 1 : 0.5 }}
          disabled={unreadCount === 0}>
          Mark all as read
        </button>
      </div>
      <div className="overflow-y-auto flex-1 py-1">
        {groups.map(group => {
          const items = NOTIFS.filter(n => n.group === group);
          if (!items.length) return null;
          return (
            <div key={group}>
              <div className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest sticky top-0 bg-card border-b border-border"
                style={{ color: C.tertiary400 }}>{group}</div>
              {items.map(n => {
                const unread = !markedAll && !n.read;
                return (
                  <button key={n.id} onClick={onClose}
                    className="w-full flex items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-muted relative"
                    style={{ background: unread ? "rgba(68,15,124,0.03)" : "transparent" }}>
                    {unread && (
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.purple }} />
                    )}
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: n.iconBg }}>
                      <n.icon size={16} style={{ color: n.iconFg }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{n.title}</span>
                        {n.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: n.badgeBg, color: n.badgeFg }}>{n.badge}</span>
                        )}
                      </div>
                      <div className="text-[11px] leading-snug mb-1 line-clamp-2" style={{ color: C.tertiary }}>{n.desc}</div>
                      <div className="text-[10px]" style={{ color: C.tertiary400 }}>{n.time}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="border-t border-border px-5 py-3 flex items-center justify-between flex-shrink-0" style={{ background: C.tertiary50 }}>
        <button onClick={onClose} className="flex items-center gap-1.5 text-[11px] font-medium hover:opacity-80 transition-opacity"
          style={{ color: C.tertiary }}>
          <Settings size={12} /> Notification Settings
        </button>
        <button onClick={onClose} className="text-[11px] font-semibold hover:opacity-80 transition-opacity"
          style={{ color: C.tertiary }}>View All →</button>
      </div>
    </div>
  );
}

export function ProfileTrigger({ scenario, isOpen, onToggle }: { scenario: ScenarioId; isOpen: boolean; onToggle: () => void }) {
  const emp = EMPLOYEE[scenario];
  const photo = PHOTOS[emp.name];
  const profileColor = scenario === 2 ? C.magenta : "#f97316";
  const initials = emp.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <button onClick={onToggle}
      className="flex items-center gap-1.5 rounded-full transition-all p-0.5 flex-shrink-0"
      style={{ outline: isOpen ? `2px solid ${C.purple300}` : "2px solid transparent", outlineOffset: 1 }}>
      {photo
        ? <img src={photo} alt={emp.name} className="w-[34px] h-[34px] rounded-full object-cover border border-border" />
        : <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center font-bold text-white text-xs border border-border" style={{ background: profileColor }}>{initials}</div>
      }
      <svg className="w-[14px] h-[14px] hidden sm:block" fill="none" viewBox="0 0 14 14">
        <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke={C.tertiary} strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      </svg>
    </button>
  );
}

const HELP_ARTICLES = [
  { icon: "🚀", category: "Getting Started", title: "Setting up your workspace", time: "3 min read" },
  { icon: "📅", category: "Leave",            title: "How to apply for leave",            time: "2 min read" },
  { icon: "💳", category: "Payroll",          title: "Understanding your payslip",        time: "4 min read" },
  { icon: "✅", category: "Approvals",        title: "Submitting and tracking approvals", time: "3 min read" },
  { icon: "🔔", category: "Notifications",   title: "Managing notification preferences",  time: "2 min read" },
  { icon: "👥", category: "Team",             title: "Collaborating with your team",      time: "3 min read" },
];

const HELP_FAQS = [
  { q: "How do I reset my password?",         a: "Go to the login page and click 'Forgot Password'. A reset link will be sent to your registered email." },
  { q: "Who do I contact for payroll issues?", a: "Reach out to the HR or Finance team directly via the directory, or submit a grievance ticket." },
  { q: "Can I access NotchHR on mobile?",      a: "Yes — download the NotchHR mobile app on iOS or Android for full access." },
];

export function HelpSupportPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"guides" | "faq" | "contact">("guides");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl border border-border flex flex-col"
      style={{ maxHeight: "80vh", boxShadow: "0 8px 40px rgba(68,15,124,0.16)" }}>

      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)` }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.purple200 }}>
            <HelpCircle size={15} style={{ color: C.purpleIcon }} />
          </div>
          <div>
            <div className="text-[14px] font-bold" style={{ color: C.tertiary }}>Help & Support</div>
            <div className="text-[10px]" style={{ color: C.tertiary300 }}>Find answers and get in touch</div>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/60 transition-colors" style={{ color: C.tertiary }}>
          <X size={13} />
        </button>
      </div>

      <div className="flex border-b border-border flex-shrink-0 px-5">
        {(["guides", "faq", "contact"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="pb-2.5 pt-2.5 mr-5 text-[12px] font-medium capitalize transition-colors whitespace-nowrap"
            style={{ color: tab === t ? C.purple : C.tertiary300, borderBottom: tab === t ? `2px solid ${C.purple}` : "2px solid transparent" }}>
            {t === "guides" ? "Guides" : t === "faq" ? "FAQ" : "Contact Us"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "guides" && (
          <div className="p-4 space-y-2">
            <p className="text-[11px] mb-3" style={{ color: C.tertiary300 }}>Step-by-step guides to help you get the most out of NotchHR.</p>
            {HELP_ARTICLES.map(a => (
              <button key={a.title}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left border border-border hover:border-purple-200 transition-colors group"
                style={{ background: "#faf9ff" }}
                onClick={() => toast(`Opening: ${a.title}`, { duration: 2000 })}>
                <span className="text-xl flex-shrink-0">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: C.tertiary400 }}>{a.category}</div>
                  <div className="text-[12px] font-semibold truncate" style={{ color: C.tertiary }}>{a.title}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.tertiary400 }}>{a.time}</div>
                </div>
                <ExternalLink size={12} style={{ color: C.tertiary400 }} className="flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {tab === "faq" && (
          <div className="p-4 space-y-2">
            <p className="text-[11px] mb-3" style={{ color: C.tertiary300 }}>Answers to the most common questions.</p>
            {HELP_FAQS.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{ background: openFaq === i ? C.purple100 : "var(--card)" }}>
                  <span className="flex-1 text-[12px] font-semibold" style={{ color: C.tertiary }}>{faq.q}</span>
                  <ChevronRight size={13} style={{ color: C.tertiary300, transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3 pt-1 text-[11px] leading-relaxed" style={{ color: C.tertiary, background: C.purple100 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "contact" && (
          <div className="p-4 space-y-3">
            <p className="text-[11px] mb-1" style={{ color: C.tertiary300 }}>Can't find what you need? Reach out and we'll help.</p>
            {[
              { icon: "💬", label: "Live Chat", sub: "Typically replies in minutes", action: "Start Chat", color: C.purple },
              { icon: "📧", label: "Email Support", sub: "support@notchhr.io", action: "Send Email", color: C.magenta },
              { icon: "📚", label: "Knowledge Base", sub: "Browse 200+ articles", action: "Open Docs", color: "#f97316" },
            ].map(item => (
              <button key={item.label}
                onClick={() => toast(`${item.action} coming soon`, { duration: 2000 })}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`, border: `1px solid ${item.color}25` }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold" style={{ color: C.tertiary }}>{item.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: C.tertiary300 }}>{item.sub}</div>
                </div>
                <span className="text-[10px] font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 text-white" style={{ background: item.color }}>{item.action}</span>
              </button>
            ))}
            <div className="mt-4 px-4 py-3 rounded-xl text-center" style={{ background: C.purple100, border: `1px solid ${C.purple200}` }}>
              <div className="text-[11px] font-semibold mb-0.5" style={{ color: C.tertiary }}>Support hours</div>
              <div className="text-[10px]" style={{ color: C.tertiary300 }}>Mon – Fri, 8 AM – 6 PM (WAT)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileMenuPanel({ scenario, activeOrgId, onClose, onLogout, onSwitchOrg }: { scenario: ScenarioId; activeOrgId: string; onClose: () => void; onLogout: () => void; onSwitchOrg: () => void }) {
  const [rewindOpen, setRewindOpen] = useState(false);
  const emp = EMPLOYEE[scenario];
  const photo = PHOTOS[emp.name];
  const profileColor = scenario === 2 ? C.magenta : "#f97316";
  const initials = emp.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (<>
    <div className="bg-card rounded-2xl border border-border overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(68,15,124,0.16)" }}>
      <div className="p-4 border-b border-border" style={{ background: `linear-gradient(135deg, ${C.purple100} 0%, ${C.magenta100} 100%)` }}>
        <div className="flex items-center gap-3 mb-3">
          {photo
            ? <img src={photo} className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-sm flex-shrink-0" />
            : <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white border-2 border-white shadow-sm flex-shrink-0" style={{ background: profileColor }}>{initials}</div>
          }
          <div className="min-w-0">
            <div className="text-[13px] font-bold truncate" style={{ color: C.tertiary }}>{emp.name}</div>
            <div className="text-[11px] truncate" style={{ color: C.tertiary }}>{emp.role}</div>
            <div className="text-[10px] truncate" style={{ color: C.tertiary }}>{emp.dept} · {emp.id}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: S.success }} />
          <span className="text-[10px] font-medium" style={{ color: C.tertiary }}>Active — Online</span>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "55vh" }}>
        {PROFILE_GROUPS.map((group, gi) => (
          <div key={group.label}>
            {gi > 0 && <div className="mx-4 my-0.5 border-t border-border" />}
            <div className="py-1">
              {group.items.map(item => (
                <button key={item.id} onClick={() => { if (item.id === "signout") { onClose(); onLogout(); } else if (item.id === "switchorg") { onClose(); onSwitchOrg(); } else if (item.id === "rewind") { onClose(); setRewindOpen(true); } else { onClose(); } }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.id === "rewind" ? "linear-gradient(135deg,#440f7c,#d62196)" : item.danger ? S.error50 : C.tertiary100 }}>
                    <item.icon size={14} style={{ color: item.id === "rewind" ? "white" : item.danger ? S.error : C.tertiary }} />
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: item.danger ? S.error : C.tertiary800 }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    {rewindOpen && <RewindModal onClose={() => setRewindOpen(false)} />}
  </> );
}

// Re-export unused named imports to satisfy TypeScript if needed
export { Bell, Globe, LogOut, Sliders, Command, Info, Building2, Shield, DollarSign, TrendingUp, GraduationCap, Calendar };
