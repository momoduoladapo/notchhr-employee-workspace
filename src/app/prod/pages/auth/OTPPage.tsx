import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button, Alert } from "../../components/ui";
import { useAuth } from "../../store/AuthContext";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const { verifyOTP, requestOTP, phoneNumber, status, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [resendCountdown, setResendCountdown] = useState(60);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phoneNumber) { navigate("/login"); return; }
    const t = setInterval(() => setResendCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [phoneNumber, navigate]);

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < OTP_LENGTH - 1) inputs.current[i + 1]?.focus();
    clearError();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...digits];
    text.split("").forEach((c, i) => { next[i] = c; });
    setDigits(next);
    inputs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) return;
    clearError();
    const ok = await verifyOTP(phoneNumber, otp);
    if (ok) navigate("/login/org");
  }

  async function handleResend() {
    if (resendCountdown > 0) return;
    await requestOTP(phoneNumber);
    setResendCountdown(60);
    setDigits(Array(OTP_LENGTH).fill(""));
    inputs.current[0]?.focus();
  }

  const otp = digits.join("");

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-[#D62196] items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Check your email</h1>
        <p className="text-sm text-white/60 mt-1">
          We sent a 6-digit code to your registered email address
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 justify-center mb-5">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="w-10 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:border-[#440F7C] transition-all"
                style={{ borderColor: d ? "#440F7C" : undefined }}
              />
            ))}
          </div>

          {error && <div className="mb-4"><Alert variant="error">{error}</Alert></div>}

          <Button type="submit" variant="primary" size="lg" loading={status === "loading"} disabled={otp.length < OTP_LENGTH} className="w-full mb-4">
            Verify OTP
          </Button>

          <div className="text-center">
            {resendCountdown > 0 ? (
              <p className="text-sm text-gray-400">Resend code in {resendCountdown}s</p>
            ) : (
              <button type="button" onClick={handleResend} className="flex items-center gap-1.5 text-sm text-[#440F7C] font-medium hover:underline mx-auto">
                <RotateCcw size={14} />Resend OTP
              </button>
            )}
          </div>
        </form>

        <button onClick={() => navigate("/login")} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mt-4 mx-auto">
          <ArrowLeft size={14} />Back to sign in
        </button>
      </div>
    </div>
  );
}
