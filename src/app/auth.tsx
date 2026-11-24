import React, { useState, useEffect, useRef } from "react";
import {
  Eye, EyeOff, ChevronRight, ChevronLeft, Check, X, Phone, CheckCircle,
  LogIn, ArrowRight, Lock, BadgeCheck, Timer, CalendarClock, LayoutGrid, Bell,
  FileText, GripVertical, HelpCircle, Pencil, Users, MessageCircle, Clock, Settings, Pin, GraduationCap,
  DollarSign, Calendar, BookOpen, TrendingUp,
} from "lucide-react";
import { C, S } from "./tokens";
import { ORG_ACCOUNTS, PLAN_META, APP_MODULES } from "./data";
import imgLogo from "@/imports/Header/1e98815916c2da691000efb84bd865b81ff2aff7.png";
import imgSlide2 from "@/imports/auth-slide-employee-workspace.png";
import imgSlide3 from "@/imports/auth-slide-attendance.png";
import imgSlide4 from "@/imports/auth-slide-leave.png";
import imgSlide5 from "@/imports/auth-slide-performance.png";
import imgSlide6 from "@/imports/auth-slide-learning.png";
import imgSlide7 from "@/imports/auth-slide-self-service.png";
import imgSlide8 from "@/imports/auth-slide-benefits.png";
import imgSlide9 from "@/imports/auth-slide-announcements.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ─── Weather icon helper ──────────────────────────────────────────────────────
const wIcon = (code: number) => {
  if (code === 0) return "☀️";
  if (code <= 1) return "🌤️";
  if (code <= 2) return "⛅";
  if (code <= 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
};

// ─── Auth Flow ────────────────────────────────────────────────────────────────
function AuthFlow({ onComplete, initialStep = "login" }: { onComplete: (orgId: string) => void; initialStep?: "login" | "org-select" }) {
  type AuthStep = "login" | "pin" | "otp" | "org-select" | "loading" |
                  "forgot-phone" | "forgot-otp" | "forgot-newpin" | "forgot-confirmpin" | "forgot-success";

  const [step, setStep] = useState<AuthStep>(initialStep);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("s.adeleke@notchhr.io");
  const [showPin, setShowPin] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [otpStatus, setOtpStatus] = useState<"idle" | "incorrect" | "expired">("idle");

  const [otp, setOtp] = useState(["","","","","",""]);
  const [pin, setPin] = useState(["","","",""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null,null,null]);
  const pinRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null]);

  // Forgot PIN flow
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotOtp, setForgotOtp] = useState(["","","","","",""]);
  const [forgotNewPin, setForgotNewPin] = useState(["","","",""]);
  const [forgotConfirmPin, setForgotConfirmPin] = useState(["","","",""]);
  const forgotOtpRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null,null,null]);
  const forgotNewPinRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null]);
  const forgotConfirmPinRefs = useRef<Array<HTMLInputElement | null>>([null,null,null,null]);

  // Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Weather (wttr.in — no key, CORS-friendly)
  type WeatherState = { temp: number; condition: string; location: string; icon: string } | "loading" | "unavailable";
  const [weather, setWeather] = useState<WeatherState>("loading");
  useEffect(() => {
    fetch("https://wttr.in/?format=j1")
      .then(r => r.json())
      .then((d: { current_condition?: Array<{ temp_C: string; weatherDesc?: Array<{ value: string }>; weatherCode: string }>; nearest_area?: Array<{ areaName?: Array<{ value: string }>; region?: Array<{ value: string }> }> }) => {
        const cur = d.current_condition?.[0];
        const area = d.nearest_area?.[0];
        if (cur) setWeather({
          temp: parseInt(cur.temp_C),
          condition: cur.weatherDesc?.[0]?.value ?? "",
          location: area?.areaName?.[0]?.value ?? area?.region?.[0]?.value ?? "",
          icon: wIcon(parseInt(cur.weatherCode)),
        });
        else setWeather("unavailable");
      })
      .catch(() => setWeather("unavailable"));
  }, []);

  // Org announcements carousel
  const ORG_ANNOUNCEMENTS = [
    { icon: "🎉", title: "Annual Company Retreat", detail: "August 20–22 · All Staff" },
    { icon: "📋", title: "Q3 Performance Reviews Open", detail: "Submission closes September 1" },
    { icon: "🏆", title: "Employee of the Month Nominations", detail: "Submit your nominations by August 18" },
  ];
  const [annIdx, setAnnIdx] = useState(0);

  // Walkthrough slider
  const [slide, setSlide] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  // ── Illustrated walkthrough compositions ──
  const card = (children: React.ReactNode) => (
    <div style={{ borderRadius: 12, overflow: "hidden", background: "var(--card)", border: `1px solid ${C.purple200}`, boxShadow: "0 8px 32px rgba(68,15,124,0.22), 0 2px 8px rgba(0,0,0,0.07)" }}>
      {children}
    </div>
  );

  const SLIDES = [
    /* ── SLIDES 2–9 — FEATURE STORIES ────────────────────────────────────── */
    {
      num: "02", total: "09",
      heading: "Your Money,", highlight: "Within Reach.",
      body: "Access your daily earnings, request future earnings, download payslips, and see your financial benefits, all in one place.",
      preview: (
        <ImageWithFallback
          src={imgSlide2}
          alt="Man checking smartphone screen"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "03", total: "09",
      heading: "Always Know", highlight: "Where You Stand.",
      body: "Track your attendance, work hours, shifts, and time records without having to ask HR.",
      preview: (
        <ImageWithFallback
          src={imgSlide3}
          alt="Man checking smartphone screen"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "04", total: "09",
      heading: "Time Off Without", highlight: "the Back-and-Forth.",
      body: "Request leave, check your balance, track approvals, and plan your time away from work with ease.",
      preview: (
        <ImageWithFallback
          src={imgSlide4}
          alt="Woman planning time off"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "05", total: "09",
      heading: "Your Goals.", highlight: "Your Progress.",
      body: "Keep track of your goals, performance, feedback, and achievements throughout the year.",
      preview: (
        <ImageWithFallback
          src={imgSlide5}
          alt="Woman focused on laptop screen"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "06", total: "09",
      heading: "There's Always More", highlight: "to Learn.",
      body: "Discover courses, build new skills, and keep growing with learning opportunities made available to you.",
      preview: (
        <ImageWithFallback
          src={imgSlide6}
          alt="Man looking at notebook"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "07", total: "09",
      heading: "Everything HR,", highlight: "Right at Your Fingertips",
      body: "Access your documents, update your information, view important records, and get things done yourself.",
      preview: (
        <ImageWithFallback
          src={imgSlide7}
          alt="Woman reviewing document at desk"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "08", total: "09",
      heading: "Know What Comes", highlight: "With Your Work.",
      body: "See your benefits, entitlements, and other employee perks, all in one place.",
      preview: (
        <ImageWithFallback
          src={imgSlide8}
          alt="Woman reviewing document in office"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
    {
      num: "09", total: "09",
      heading: "Stay in", highlight: "the Know.",
      body: "Get important company announcements, updates, and reminders right where you need them.",
      preview: (
        <ImageWithFallback
          src={imgSlide9}
          alt="Man checking smartphone notifications"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
        />
      ),
    },
  ];

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pausedRef = useRef(false);

  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setSlide(s => (s + 1) % SLIDES.length);
      setSlideKey(k => k + 1);
    }, 5000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, []);

  // Preload all slide images on mount so transitions are instant
  useEffect(() => {
    [imgSlide2, imgSlide3, imgSlide4, imgSlide5, imgSlide6, imgSlide7, imgSlide8, imgSlide9]
      .forEach(src => { const i = new Image(); i.src = src as string; });
  }, []);

  const pauseAutoplay  = () => { pausedRef.current = true; };
  const resumeAutoplay = () => { pausedRef.current = false; };

  const goSlide = (i: number) => {
    setSlide(i); setSlideKey(k => k + 1);
    resetAutoplay();
  };

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const startLoading = (then: () => void, delay = 1200) => {
    setStep("loading"); setTimeout(then, delay);
  };

  const handleLogin = () => {
    if (phone.replace(/\D/g, "").length < 7) { setError("Please enter a valid phone number."); return; }
    setError(null); startLoading(() => setStep("pin"));
  };
  const handlePin = () => {
    if (pin.join("").length < 4) { setError("Please enter your 4-digit PIN."); return; }
    setError(null); startLoading(() => { setStep("otp"); setCountdown(60); setOtp(["","","","","",""]); setOtpStatus("idle"); }, 1000);
  };
  const handleOtp = () => {
    if (otp.join("").length < 6) { setError("Please enter the 6-digit code."); return; }
    setError(null); startLoading(() => { setStep("org-select"); setSelectedOrgId(null); }, 1000);
  };
  const handleOtpChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...otp]; next[idx] = d; setOtp(next);
    setError(null); setOtpStatus("idle");
    if (d && idx < 5) { const el = otpRefs.current[idx+1]; el?.focus(); el?.select(); return; }
    if (d && idx === 5 && next.join("").length === 6) {
      startLoading(() => { setStep("org-select"); setSelectedOrgId(null); }, 1000);
    }
  };
  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx-1]?.focus();
  };
  const handlePinChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...pin]; next[idx] = d; setPin(next);
    setError(null);
    if (d && idx < 3) { pinRefs.current[idx+1]?.focus(); return; }
    if (d && idx === 3 && next.join("").length === 4) {
      startLoading(() => { setStep("otp"); setCountdown(60); setOtp(["","","","","",""]); setOtpStatus("idle"); }, 1000);
    }
  };
  const handlePinKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) pinRefs.current[idx-1]?.focus();
  };
  const handleForgotOtpChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...forgotOtp]; next[idx] = d; setForgotOtp(next);
    if (d && idx < 5) { const el = forgotOtpRefs.current[idx+1]; el?.focus(); el?.select(); return; }
    if (d && idx === 5 && next.join("").length === 6) {
      startLoading(() => { setStep("forgot-newpin"); setForgotNewPin(["","","",""]); }, 1000);
    }
  };
  const handleForgotOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !forgotOtp[idx] && idx > 0) forgotOtpRefs.current[idx-1]?.focus();
  };
  const handleForgotNewPinChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...forgotNewPin]; next[idx] = d; setForgotNewPin(next);
    if (d && idx < 3) { forgotNewPinRefs.current[idx+1]?.focus(); return; }
    if (d && idx === 3 && next.join("").length === 4) {
      setStep("forgot-confirmpin"); setForgotConfirmPin(["","","",""]);
    }
  };
  const handleForgotNewPinKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !forgotNewPin[idx] && idx > 0) forgotNewPinRefs.current[idx-1]?.focus();
  };
  const handleForgotConfirmPinChange = (idx: number, val: string) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...forgotConfirmPin]; next[idx] = d; setForgotConfirmPin(next);
    setError(null);
    if (d && idx < 3) { forgotConfirmPinRefs.current[idx+1]?.focus(); return; }
    if (d && idx === 3 && next.join("").length === 4) {
      startLoading(() => setStep("forgot-success"), 1000);
    }
  };
  const handleForgotConfirmPinKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !forgotConfirmPin[idx] && idx > 0) forgotConfirmPinRefs.current[idx-1]?.focus();
  };

  const sl = SLIDES[slide];

  const PhoneRow = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div className="flex gap-2">
      <div className="flex items-center gap-1.5 px-3 py-3 rounded-lg border flex-shrink-0 text-sm font-['Poppins']" style={{ borderColor: C.purple200, color: C.tertiary, background: C.purple100 }}>
        🇳🇬 <span className="font-medium">+234</span>
      </div>
      <input
        autoFocus
        className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none font-['Poppins'] transition-colors"
        style={{ borderColor: C.purple200, color: C.tertiary }}
        placeholder="801 234 5678"
        type="tel"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={e => (e.target.style.borderColor = C.purple300)}
        onBlur={e => (e.target.style.borderColor = C.purple200)}
      />
    </div>
  );

  const PinRow = ({
    values, refs, onChange, onKeyDown, focused = false,
  }: {
    values: string[]; refs: React.MutableRefObject<Array<HTMLInputElement | null>>;
    onChange: (i: number, v: string) => void; onKeyDown: (i: number, e: React.KeyboardEvent) => void;
    focused?: boolean;
  }) => (
    <div className="flex gap-2 sm:gap-3">
      {values.map((d, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          autoFocus={focused && i === 0}
          value={d ? "●" : ""}
          onChange={e => onChange(i, e.target.value.replace("●",""))}
          onKeyDown={e => onKeyDown(i, e)}
          maxLength={1} type="text" inputMode="numeric"
          className="flex-1 text-center rounded-lg border text-xl font-bold outline-none transition-colors font-['Poppins']"
          style={{ height: 56, minWidth: 0, borderColor: d ? C.purple : C.purple200, color: C.purple, background: d ? C.purple100 : "white" }}
        />
      ))}
    </div>
  );

  const OtpRow = ({
    values, refs, onChange, onKeyDown, status = "idle", focused = false,
  }: {
    values: string[]; refs: React.MutableRefObject<Array<HTMLInputElement | null>>;
    onChange: (i: number, v: string) => void; onKeyDown: (i: number, e: React.KeyboardEvent) => void;
    status?: "idle" | "incorrect" | "expired"; focused?: boolean;
  }) => (
    <div className="flex gap-1.5 sm:gap-2">
      {values.map((d, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el; }}
          autoFocus={focused && i === 0}
          value={d}
          onChange={e => onChange(i, e.target.value)}
          onKeyDown={e => onKeyDown(i, e)}
          maxLength={1} type="text" inputMode="numeric"
          className="flex-1 text-center rounded-lg border text-lg font-bold outline-none transition-colors font-['Poppins']"
          style={{
            height: 52, minWidth: 0,
            borderColor: status === "incorrect" ? S.error : (d ? C.purple : C.purple200),
            color: status === "incorrect" ? S.error : C.tertiary,
            background: d ? (status === "incorrect" ? S.error100 : C.purple100) : "white",
          }}
        />
      ))}
    </div>
  );

  const PrimaryBtn = ({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) => (
    <button onClick={onClick} disabled={disabled} className="w-full py-3.5 rounded-xl text-sm font-semibold text-white font-['Poppins'] transition-opacity hover:opacity-90 active:opacity-80" style={{ background: C.purple, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1 }}>
      {children}
    </button>
  );

  const BackBtn = ({ onClick, label = "Back" }: { onClick: () => void; label?: string }) => (
    <button onClick={onClick} className="flex items-center gap-1 mb-6 text-xs font-['Poppins'] hover:opacity-60 transition-opacity" style={{ color: C.tertiary400, background: "none", border: "none", cursor: "pointer" }}>
      <ChevronLeft size={13} /> {label}
    </button>
  );

  const ErrorMsg = ({ msg }: { msg: string | null }) =>
    msg ? <p className="text-xs mb-3 font-['Poppins']" style={{ color: S.error }}>{msg}</p> : null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--card)" }}>
      <style>{`
        @keyframes auth-spin{to{transform:rotate(360deg)}}
        @keyframes auth-pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes auth-slide-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .auth-step{animation:auth-slide-up 0.35s ease both}
        .auth-dot{transition:width 0.3s ease,background 0.3s ease}
      `}</style>

      {/* ══════ LEFT: Smart Workplace Pane ══════ */}
      <div
        className="hidden md:flex flex-col md:w-[44%] lg:w-[48%] h-screen sticky top-0 relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(160deg,#f8f4ff 0%,#ede8fe 55%,#e2d9fd 100%)" }}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
      >
        {/* ── 1. Logo + Time + Weather (inline) ── */}
        <div className="px-8 xl:px-12 pt-7 flex items-start justify-between flex-shrink-0">
          <img src={imgLogo} alt="NotchHR" className="h-8 object-contain" style={{ objectPosition: "left" }} />
          <div className="text-right flex-shrink-0 ml-4">
            <div className="font-bold font-['Poppins'] tabular-nums" style={{ fontSize: 14, color: C.purple, lineHeight: 1.1 }}>
              {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" })}
            </div>
            <div className="text-[11px] font-['Poppins'] mt-0.5" style={{ color: C.tertiary }}>
              {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "Africa/Lagos" })}
              {" · "}
              WAT
            </div>
            {weather !== "loading" && weather !== "unavailable" && (
              <div className="text-[11px] font-['Poppins'] mt-0.5" style={{ color: C.tertiary400 }}>
                {weather.icon} {weather.temp}°C · {weather.condition}{weather.location ? ` · ${weather.location}` : ""}
              </div>
            )}
          </div>
        </div>

        {/* ── 2. Walkthrough Slider (hero) ── */}
        <div className="flex-1 flex flex-col justify-center px-8 xl:px-12 py-10 min-h-0">
          {/* Animated text — remounts on slide change for the slide-up effect */}
          <div key={slideKey} className="auth-step flex-shrink-0">
            {/* Slide counter */}
            <div className="mb-5">
              <span className="font-['Poppins'] tabular-nums font-medium" style={{ fontSize: 11, letterSpacing: "0.12em", color: C.purple300 }}>
                {sl.num} <span style={{ color: C.purple200 }}>/</span> {sl.total}
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-bold leading-[1.08] font-['Poppins']" style={{ fontSize: "clamp(26px,3vw,48px)", color: C.purple }}>
              {sl.heading}<br />
              <span style={{ color: C.magenta }}>{sl.highlight}</span>
            </h2>

            {/* Body */}
            <p className="leading-relaxed font-['Poppins'] mt-3" style={{ fontSize: "clamp(12px,0.9vw,14px)", color: C.tertiary, maxWidth: 360 }}>
              {sl.body}
            </p>
          </div>

          {/* Image panel — stays mounted, crossfades between slides */}
          <div className="mt-4 flex-1 min-h-0 relative" style={{ borderRadius: 14, overflow: "hidden" }}>
            {SLIDES.map((s, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: i === slide ? 1 : 0,
                transition: "opacity 0.45s ease",
                pointerEvents: i === slide ? "auto" : "none",
              }}>
                {s.preview}
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center gap-3 mt-5 flex-shrink-0">
            <button
              onClick={() => goSlide((slide - 1 + SLIDES.length) % SLIDES.length)}
              className="flex items-center justify-center rounded-full border transition-all hover:border-opacity-60"
              style={{ width: 32, height: 32, borderColor: C.purple200, color: C.tertiary400, background: "var(--card)", cursor: "pointer" }}
            >
              <ChevronLeft size={13} />
            </button>
            <div className="flex gap-1.5 items-center">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goSlide(i)} className="auth-dot rounded-full" style={{ height: 6, width: i === slide ? 20 : 6, background: i === slide ? C.purple : C.purple200, border: "none", cursor: "pointer", padding: 0 }} />
              ))}
            </div>
            <button
              onClick={() => goSlide((slide + 1) % SLIDES.length)}
              className="flex items-center justify-center rounded-full transition-all hover:opacity-90"
              style={{ width: 32, height: 32, background: C.purple, color: "white", border: "none", cursor: "pointer" }}
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

      </div>

      {/* ══════ MOBILE: Compact top bar ══════ */}
      <div className="md:hidden flex-shrink-0" style={{ background: "#f5f2fe", borderBottom: `1px solid ${C.purple200}` }}>
        <div className="flex items-center justify-between px-5 py-3">
          <img src={imgLogo} alt="NotchHR" className="h-7 object-contain" style={{ objectPosition: "left" }} />
          <div className="flex items-center gap-3">
            {weather !== "loading" && weather !== "unavailable" && (
              <span className="text-xs font-['Poppins'] font-medium" style={{ color: C.purple }}>{weather.icon} {weather.temp}°C</span>
            )}
            <div className="text-right">
              <div className="text-xs font-bold font-['Poppins'] tabular-nums" style={{ color: C.purple }}>
                {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 pb-3">
          <div className="text-[10px] font-['Poppins']" style={{ color: C.tertiary }}>
            {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "Africa/Lagos" })}
          </div>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)} className="auth-dot rounded-full" style={{ height: 5, width: i === slide ? 14 : 5, background: i === slide ? C.purple : C.purple200, border: "none", cursor: "pointer", padding: 0 }} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════ RIGHT: Auth Panel ══════ */}
      <div className="flex-1 flex flex-col bg-card min-h-0 overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-10 md:px-8 lg:px-12">
          <div className="w-full" style={{ maxWidth: 420 }}>

            {/* ── Loading ── */}
            {step === "loading" && (
              <div className="flex flex-col items-center gap-4 py-16">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full" style={{ border: `3px solid ${C.purple200}` }} />
                  <div className="absolute rounded-full" style={{ inset: -3, border: `3px solid transparent`, borderTopColor: C.purple, animation: "auth-spin 1s linear infinite" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={imgLogo} alt="" className="w-8 h-8 object-contain" style={{ animation: "auth-pulse 2s ease-in-out infinite" }} />
                  </div>
                </div>
                <p className="text-sm font-['Poppins']" style={{ color: C.tertiary400 }}>Please wait…</p>
              </div>
            )}

            {/* ── Sign In ── */}
            {step === "login" && (
              <div className="auth-step">
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins'] leading-snug" style={{ color: C.tertiary800 }}>Welcome back! 👋</h1>
                  <p className="text-sm font-['Poppins']" style={{ color: C.tertiary }}>Sign in to access your Employee Workspace.</p>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold mb-2 font-['Poppins']" style={{ color: C.tertiary }}>Phone Number</label>
                  <PhoneRow value={phone} onChange={v => { setPhone(v); setError(null); }} />
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={handleLogin}>Continue</PrimaryBtn>

                {/* SSO divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                  <span className="text-xs font-['Poppins']" style={{ color: "#9ca3af" }}>or</span>
                  <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
                </div>

                {/* Continue with Google — visual placeholder only */}
                <button className="w-full flex items-center justify-center py-3 mb-3 rounded-xl font-['Poppins'] text-sm font-semibold transition-colors hover:bg-gray-50" style={{ gap: 18, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.621 0 3.063.556 4.21 1.647l3.149-3.148C14.463 2.09 11.926 1 9 1A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Continue with Microsoft — visual placeholder only */}
                <button className="w-full flex items-center justify-center py-3 rounded-xl font-['Poppins'] text-sm font-semibold transition-colors hover:bg-gray-50" style={{ gap: 18, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                    <rect x="11" y="1" width="9" height="9" fill="#00A4EF"/>
                    <rect x="1" y="11" width="9" height="9" fill="#7FBA00"/>
                    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                  </svg>
                  Continue with Microsoft
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-6 text-xs font-['Poppins']" style={{ color: C.tertiary400 }}>
                  <Lock size={11} /> Your data is secure with us
                </div>
              </div>
            )}

            {/* ── Enter PIN ── */}
            {step === "pin" && (
              <div className="auth-step">
                <BackBtn onClick={() => { setStep("login"); setError(null); setPin(["","","",""]); }} />
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Enter your PIN</h1>
                  <p className="text-sm font-['Poppins']" style={{ color: C.tertiary }}>Enter your 4-digit security PIN to continue.</p>
                </div>
                <div className="mb-1">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-semibold font-['Poppins']" style={{ color: C.tertiary }}>4-digit PIN</label>
                    <button onClick={() => setShowPin(v => !v)} className="flex items-center gap-1 text-xs font-['Poppins'] hover:opacity-60 transition-opacity" style={{ color: C.tertiary400, background: "none", border: "none", cursor: "pointer" }}>
                      {showPin ? <EyeOff size={12} /> : <Eye size={12} />}
                      {showPin ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    {pin.map((d, i) => (
                      <input
                        key={i}
                        ref={el => { pinRefs.current[i] = el; }}
                        autoFocus={i === 0}
                        value={showPin ? d : (d ? "●" : "")}
                        onChange={e => handlePinChange(i, e.target.value.replace("●",""))}
                        onKeyDown={e => handlePinKey(i, e)}
                        maxLength={1} type="text" inputMode="numeric"
                        className="flex-1 text-center rounded-xl border text-xl font-bold outline-none transition-colors font-['Poppins']"
                        style={{ height: 56, minWidth: 0, borderColor: d ? C.purple : C.purple200, color: C.purple, background: d ? C.purple100 : "white" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-3 mb-5">
                  <button onClick={() => { setStep("forgot-phone"); setError(null); }} className="text-xs font-semibold font-['Poppins'] hover:opacity-70 transition-opacity" style={{ color: C.purple, background: "none", border: "none", cursor: "pointer" }}>
                    Forgot PIN?
                  </button>
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={handlePin}>Sign In</PrimaryBtn>
              </div>
            )}

            {/* ── OTP Verification ── */}
            {step === "otp" && (
              <div className="auth-step">
                <BackBtn onClick={() => { setStep("pin"); setError(null); setOtp(["","","","","",""]); }} />
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Verify your email</h1>
                  <p className="text-sm font-['Poppins'] leading-relaxed" style={{ color: C.tertiary }}>
                    A 6-digit verification code was sent to{" "}
                    <span className="font-semibold" style={{ color: C.tertiary }}>{email}</span>
                  </p>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold mb-3 font-['Poppins']" style={{ color: C.tertiary }}>Verification Code</label>
                  <div className="flex gap-1.5 sm:gap-2">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={el => { otpRefs.current[i] = el; }}
                        autoFocus={i === 0}
                        value={d}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKey(i, e)}
                        maxLength={1} type="text" inputMode="numeric"
                        className="flex-1 text-center rounded-lg border text-lg font-bold outline-none transition-colors font-['Poppins']"
                        style={{
                          height: 52, minWidth: 0,
                          borderColor: otpStatus === "incorrect" ? S.error : (d ? C.purple : C.purple200),
                          color: otpStatus === "incorrect" ? S.error : C.tertiary,
                          background: d ? (otpStatus === "incorrect" ? S.error100 : C.purple100) : "white",
                        }}
                      />
                    ))}
                  </div>
                </div>
                {otpStatus === "incorrect" && <p className="text-xs mb-3 font-['Poppins']" style={{ color: S.error }}>Incorrect code. Please try again.</p>}
                {otpStatus === "expired" && <p className="text-xs mb-3 font-['Poppins']" style={{ color: S.warning }}>This code has expired. Please request a new one.</p>}
                {otpStatus === "idle" && <ErrorMsg msg={error} />}
                <PrimaryBtn onClick={handleOtp}>Verify</PrimaryBtn>
                <div className="text-center mt-4 text-xs font-['Poppins']" style={{ color: C.tertiary400 }}>
                  {countdown > 0
                    ? <span>Resend in <strong style={{ color: C.tertiary }}>{countdown}s</strong></span>
                    : <button onClick={() => { setCountdown(60); setOtp(["","","","","",""]); setOtpStatus("idle"); setError(null); }} style={{ color: C.purple, background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 }}>Resend OTP</button>
                  }
                </div>
              </div>
            )}

            {/* ── Select Organisation ── */}
            {step === "org-select" && (
              <div className="auth-step">
                <div className="mb-7">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Select an organisation</h1>
                  <p className="text-sm font-['Poppins'] leading-relaxed" style={{ color: C.tertiary }}>
                    You have access to multiple organisations. Choose the one you want to continue with for this session.
                  </p>
                </div>
                <div className="mb-7" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {ORG_ACCOUNTS.map(org => {
                    const active = selectedOrgId === org.id;
                    return (
                      <button
                        key={org.id}
                        onClick={() => setSelectedOrgId(org.id)}
                        className="flex flex-row items-center rounded-2xl transition-all text-left"
                        style={{
                          padding: "10px 12px",
                          border: `2px solid ${active ? C.purple : C.purple200}`,
                          background: active ? C.purple100 : "white",
                          outline: "none",
                          gap: 10,
                        }}
                      >
                        {/* Org logo */}
                        <div
                          className="flex items-center justify-center rounded-xl flex-shrink-0"
                          style={{
                            width: 44, height: 36,
                            background: active ? C.purple50 : "#f5f5f5",
                            padding: "5px 6px",
                            transition: "background 0.15s",
                          }}
                        >
                          <img src={org.logo} alt={org.name} style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block" }} />
                        </div>
                        {/* Org name + role + country */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold font-['Poppins'] leading-tight truncate" style={{ color: active ? C.purple800 : C.tertiary }}>
                            {org.name}
                          </div>
                          <div className="text-[9px] font-['Poppins'] mt-[2px] leading-tight truncate" style={{ color: active ? C.purple : C.tertiary300 }}>
                            {org.role}
                          </div>
                          <div className="text-[8px] font-['Poppins'] mt-[1px] leading-tight truncate" style={{ color: active ? C.purple300 : C.tertiary300, opacity: 0.75 }}>
                            {org.country}
                          </div>
                        </div>
                        {/* Selected dot */}
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            background: active ? C.purple : "transparent",
                            border: `2px solid ${active ? C.purple : C.purple200}`,
                          }}
                        >
                          {active && <Check size={9} style={{ color: "white" }} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <PrimaryBtn
                  onClick={() => { if (selectedOrgId) onComplete(selectedOrgId); }}
                  disabled={!selectedOrgId}
                >
                  Continue
                </PrimaryBtn>
                <div className="flex items-center justify-center gap-1.5 mt-5 text-xs font-['Poppins']" style={{ color: C.tertiary400 }}>
                  <Lock size={11} /> Session is encrypted and secure
                </div>
              </div>
            )}

            {/* ── Forgot PIN: Enter Phone ── */}
            {step === "forgot-phone" && (
              <div className="auth-step">
                <BackBtn onClick={() => { setStep("pin"); setError(null); }} label="Back to Sign In" />
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Forgot PIN?</h1>
                  <p className="text-sm font-['Poppins'] leading-relaxed" style={{ color: C.tertiary }}>Enter your registered phone number and we'll send a verification code to reset your PIN.</p>
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-semibold mb-2 font-['Poppins']" style={{ color: C.tertiary }}>Phone Number</label>
                  <PhoneRow value={forgotPhone} onChange={v => { setForgotPhone(v); setError(null); }} />
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={() => {
                  if (forgotPhone.replace(/\D/g,"").length < 7) { setError("Please enter a valid phone number."); return; }
                  setError(null); startLoading(() => { setStep("forgot-otp"); setCountdown(60); setForgotOtp(["","","","","",""]); }, 1200);
                }}>Send Verification Code</PrimaryBtn>
              </div>
            )}

            {/* ── Forgot PIN: OTP ── */}
            {step === "forgot-otp" && (
              <div className="auth-step">
                <BackBtn onClick={() => { setStep("forgot-phone"); setError(null); }} />
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Verify your email</h1>
                  <p className="text-sm font-['Poppins'] leading-relaxed" style={{ color: C.tertiary }}>
                    A 6-digit verification code was sent to{" "}
                    <span className="font-semibold" style={{ color: C.tertiary }}>{email}</span>
                  </p>
                </div>
                <div className="mb-5">
                  <div className="flex gap-1.5 sm:gap-2">
                    {forgotOtp.map((d, i) => (
                      <input
                        key={i}
                        ref={el => { forgotOtpRefs.current[i] = el; }}
                        autoFocus={i === 0}
                        value={d}
                        onChange={e => handleForgotOtpChange(i, e.target.value)}
                        onKeyDown={e => handleForgotOtpKey(i, e)}
                        maxLength={1} type="text" inputMode="numeric"
                        className="flex-1 text-center rounded-lg border text-lg font-bold outline-none transition-colors font-['Poppins']"
                        style={{
                          height: 52, minWidth: 0,
                          borderColor: d ? C.purple : C.purple200,
                          color: C.tertiary,
                          background: d ? C.purple100 : "white",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={() => {
                  if (forgotOtp.join("").length < 6) { setError("Please enter the 6-digit code."); return; }
                  setError(null); startLoading(() => { setStep("forgot-newpin"); setForgotNewPin(["","","",""]); }, 1000);
                }}>Verify</PrimaryBtn>
                <div className="text-center mt-4 text-xs font-['Poppins']" style={{ color: C.tertiary400 }}>
                  {countdown > 0
                    ? <span>Resend in <strong style={{ color: C.tertiary }}>{countdown}s</strong></span>
                    : <button onClick={() => { setCountdown(60); setForgotOtp(["","","","","",""]); setError(null); }} style={{ color: C.purple, background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 }}>Resend OTP</button>
                  }
                </div>
              </div>
            )}

            {/* ── Forgot PIN: Create New PIN ── */}
            {step === "forgot-newpin" && (
              <div className="auth-step">
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Create new PIN</h1>
                  <p className="text-sm font-['Poppins']" style={{ color: C.tertiary }}>Choose a new 4-digit PIN for your account.</p>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-semibold mb-3 font-['Poppins']" style={{ color: C.tertiary }}>New PIN</label>
                  <PinRow values={forgotNewPin} refs={forgotNewPinRefs} onChange={handleForgotNewPinChange} onKeyDown={handleForgotNewPinKey} focused />
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={() => {
                  if (forgotNewPin.join("").length < 4) { setError("Please enter a 4-digit PIN."); return; }
                  setError(null); setStep("forgot-confirmpin"); setForgotConfirmPin(["","","",""]);
                }}>Continue</PrimaryBtn>
              </div>
            )}

            {/* ── Forgot PIN: Confirm PIN ── */}
            {step === "forgot-confirmpin" && (
              <div className="auth-step">
                <BackBtn onClick={() => { setStep("forgot-newpin"); setError(null); }} />
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-[28px] font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>Confirm new PIN</h1>
                  <p className="text-sm font-['Poppins']" style={{ color: C.tertiary }}>Re-enter your new PIN to confirm.</p>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-semibold mb-3 font-['Poppins']" style={{ color: C.tertiary }}>Confirm PIN</label>
                  <PinRow values={forgotConfirmPin} refs={forgotConfirmPinRefs} onChange={handleForgotConfirmPinChange} onKeyDown={handleForgotConfirmPinKey} focused />
                </div>
                <ErrorMsg msg={error} />
                <PrimaryBtn onClick={() => {
                  if (forgotConfirmPin.join("").length < 4) { setError("Please enter your PIN again."); return; }
                  if (forgotConfirmPin.join("") !== forgotNewPin.join("")) { setError("PINs do not match. Please try again."); return; }
                  setError(null); startLoading(() => setStep("forgot-success"), 1000);
                }}>Update PIN</PrimaryBtn>
              </div>
            )}

            {/* ── PIN Updated ── */}
            {step === "forgot-success" && (
              <div className="auth-step text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: S.success50, border: `2px solid ${S.success100}` }}>
                  <CheckCircle size={28} style={{ color: S.success }} />
                </div>
                <h1 className="text-2xl font-bold mb-2 font-['Poppins']" style={{ color: C.tertiary800 }}>PIN Updated!</h1>
                <p className="text-sm mb-8 font-['Poppins'] leading-relaxed" style={{ color: C.tertiary }}>Your PIN has been updated successfully. You can now sign in with your new PIN.</p>
                <PrimaryBtn onClick={() => { setStep("login"); setPin(["","","",""]); setForgotPhone(""); setForgotNewPin(["","","",""]); setForgotConfirmPin(["","","",""]); setForgotOtp(["","","","","",""]); setError(null); }}>
                  Back to Sign In
                </PrimaryBtn>
              </div>
            )}

            {/* Footer */}
            {step !== "forgot-success" && (
              <p className="mt-8 text-center text-xs font-['Poppins']" style={{ color: C.tertiary400 }}>
                Need help?{" "}
                <button style={{ color: C.purple, background: "none", border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600 }}>Contact Support</button>
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export { AuthFlow };
