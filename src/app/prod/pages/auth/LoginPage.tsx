import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Phone } from "lucide-react";
import { Button, Input, Alert } from "../../components/ui";
import { useAuth } from "../../store/AuthContext";

export default function LoginPage() {
  const { requestOTP, status, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function validatePhone(val: string) {
    const clean = val.replace(/\D/g, "");
    if (!clean) return "Phone number is required";
    if (clean.length < 10) return "Enter a valid phone number";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) { setPhoneError(err); return; }
    setPhoneError("");
    clearError();
    const ok = await requestOTP(phone);
    if (ok) navigate("/login/otp");
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-[#D62196] items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-white/60 mt-1">Sign in to your NotchHR account</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-2xl">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-[#D62196]">*</span>
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                placeholder="+234 800 000 0000"
                className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#440F7C]/20 focus:border-[#440F7C]/50 transition-all ${phoneError ? "border-red-400" : "border-gray-200"}`}
              />
            </div>
            {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
          </div>

          {error && (
            <div className="mb-4">
              <Alert variant="error">{error}</Alert>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" loading={status === "loading"} className="w-full">
            Send OTP
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          An OTP will be sent to your registered email address
        </p>
      </div>

      <p className="text-center text-xs text-white/40 mt-6">
        © {new Date().getFullYear()} NotchHR. All rights reserved.
      </p>
    </div>
  );
}
