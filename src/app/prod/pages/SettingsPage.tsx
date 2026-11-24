import { useState } from "react";
import { User, Bell, Shield, Moon, Sun, Globe, Save, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../store/AuthContext";
import { useApp } from "../store/AppContext";
import {
  PageHeader, Card, Button, Input, UnderlineTabs, Badge, cn,
} from "../components/ui";

type Tab = "profile" | "notifications" | "security" | "appearance" | "language";

interface NotifSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const INITIAL_NOTIFS: NotifSetting[] = [
  { id: "leave", label: "Leave Requests", description: "Approvals, rejections, and team calendar updates", email: true, push: true, sms: false },
  { id: "payroll", label: "Payroll & Payslip", description: "Payslip availability and salary on demand updates", email: true, push: true, sms: true },
  { id: "announcements", label: "Company Announcements", description: "Important updates from HR and management", email: true, push: false, sms: false },
  { id: "performance", label: "Performance Reviews", description: "Review cycle reminders and score notifications", email: true, push: true, sms: false },
  { id: "learning", label: "Learning & Training", description: "Course deadlines and completion reminders", email: true, push: true, sms: false },
  { id: "recruitment", label: "Recruitment", description: "Application status changes and interview invites", email: false, push: false, sms: false },
];

export function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useApp();
  const [tab, setTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);

  // Profile form
  const [profile, setProfile] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    jobTitle: user?.jobTitle ?? "",
    department: user?.department ?? "",
  });

  // Notification settings
  const [notifs, setNotifs] = useState<NotifSetting[]>(INITIAL_NOTIFS);

  // Security
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    toast.success("Profile updated successfully");
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    if (!currentPin) { setPinError("Enter your current PIN"); return; }
    if (newPin.length < 4) { setPinError("New PIN must be at least 4 digits"); return; }
    if (newPin !== confirmPin) { setPinError("PINs do not match"); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setCurrentPin(""); setNewPin(""); setConfirmPin("");
    toast.success("PIN changed successfully");
  };

  const toggleNotif = (id: string, channel: "email" | "push" | "sms") => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, [channel]: !n[channel] } : n));
  };

  const TABS: { label: string; value: Tab; icon: React.ElementType }[] = [
    { label: "Profile", value: "profile", icon: User },
    { label: "Notifications", value: "notifications", icon: Bell },
    { label: "Security", value: "security", icon: Shield },
    { label: "Appearance", value: "appearance", icon: theme === "dark" ? Moon : Sun },
    { label: "Language", value: "language", icon: Globe },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader title="Settings" description="Manage your profile, preferences, and account settings" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="lg:w-52 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1">
            {TABS.map(t => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left",
                  tab === t.value
                    ? "bg-[#440F7C] text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <t.icon size={15} className="flex-shrink-0" />
                <span className="hidden sm:block">{t.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Profile */}
          {tab === "profile" && (
            <Card>
              <h3 className="font-semibold mb-5">Personal Information</h3>
              <div className="flex flex-col gap-4">
                {/* Avatar */}
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl bg-[#440F7C] flex items-center justify-center text-xl font-bold text-white">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WebP · Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={profile.firstName}
                    onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                  />
                  <Input
                    label="Last Name"
                    value={profile.lastName}
                    onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                  <Input label="Job Title" value={profile.jobTitle} readOnly className="opacity-60 cursor-not-allowed" hint="Contact HR to update" />
                  <Input label="Department" value={profile.department} readOnly className="opacity-60 cursor-not-allowed" hint="Contact HR to update" />
                  <Input label="Employee ID" value={user?.employeeId ?? ""} readOnly className="opacity-60 cursor-not-allowed" />
                  <Input label="Organisation" value={user?.organization.name ?? ""} readOnly className="opacity-60 cursor-not-allowed" />
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="primary" icon={<Save size={14} />} loading={saving} onClick={() => void handleSaveProfile()}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <Card>
              <h3 className="font-semibold mb-1">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground mb-5">Choose how you want to be notified about activity in NotchHR.</p>

              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-1 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center w-12">Email</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center w-12">Push</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center w-12">SMS</span>
              </div>

              <div className="flex flex-col divide-y divide-border">
                {notifs.map(n => (
                  <div key={n.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center py-3 px-1">
                    <div>
                      <div className="text-sm font-medium text-foreground">{n.label}</div>
                      <div className="text-xs text-muted-foreground">{n.description}</div>
                    </div>
                    {(["email", "push", "sms"] as const).map(ch => (
                      <div key={ch} className="flex justify-center w-12">
                        <button
                          onClick={() => toggleNotif(n.id, ch)}
                          className={cn(
                            "w-9 h-5 rounded-full transition-all relative flex-shrink-0",
                            n[ch] ? "bg-[#440F7C]" : "bg-muted"
                          )}
                        >
                          <div className={cn(
                            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
                            n[ch] ? "left-4" : "left-0.5"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-border mt-2">
                <Button variant="primary" icon={<Save size={14} />} onClick={() => toast.success("Notification preferences saved")}>
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Security */}
          {tab === "security" && (
            <div className="flex flex-col gap-5">
              <Card>
                <h3 className="font-semibold mb-1">Change PIN</h3>
                <p className="text-sm text-muted-foreground mb-4">Update your login PIN. Minimum 4 digits.</p>
                <form onSubmit={e => void handleChangePin(e)} className="flex flex-col gap-4">
                  <Input label="Current PIN" type="password" inputMode="numeric" value={currentPin} onChange={e => setCurrentPin(e.target.value.replace(/\D/g, ""))} maxLength={6} placeholder="Enter current PIN" />
                  <Input label="New PIN" type="password" inputMode="numeric" value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, ""))} maxLength={6} placeholder="At least 4 digits" />
                  <Input label="Confirm New PIN" type="password" inputMode="numeric" value={confirmPin} onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ""))} maxLength={6} placeholder="Repeat new PIN" error={pinError} />
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={saving}>Update PIN</Button>
                  </div>
                </form>
              </Card>

              <Card>
                <h3 className="font-semibold mb-4">Active Sessions</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { device: "Chrome on macOS", location: "Lagos, Nigeria", time: "Active now", current: true },
                    { device: "Safari on iPhone", location: "Lagos, Nigeria", time: "2 hours ago", current: false },
                  ].map(s => (
                    <div key={s.device} className="flex items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl">
                      <div>
                        <div className="text-sm font-medium text-foreground flex items-center gap-1.5">
                          {s.device}
                          {s.current && <Badge variant="success">Current</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground">{s.location} · {s.time}</div>
                      </div>
                      {!s.current && (
                        <Button size="xs" variant="danger" onClick={() => toast.success("Session revoked")}>Revoke</Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Appearance */}
          {tab === "appearance" && (
            <Card>
              <h3 className="font-semibold mb-1">Appearance</h3>
              <p className="text-sm text-muted-foreground mb-5">Customise how NotchHR looks for you.</p>

              <div className="flex flex-col gap-5">
                <div>
                  <div className="text-sm font-medium text-foreground mb-3">Theme</div>
                  <div className="flex gap-3">
                    {[
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                    ].map(t => (
                      <button
                        key={t.value}
                        onClick={() => { if (theme !== t.value) toggleTheme(); }}
                        className={cn(
                          "flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                          theme === t.value ? "border-[#440F7C] bg-[#440F7C]/5" : "border-border hover:border-[#440F7C]/30"
                        )}
                      >
                        <t.icon size={20} className={theme === t.value ? "text-[#440F7C]" : "text-muted-foreground"} />
                        <span className={cn("text-sm font-medium", theme === t.value ? "text-[#440F7C]" : "text-foreground")}>{t.label}</span>
                        {theme === t.value && <Badge variant="purple">Active</Badge>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="text-sm font-medium text-foreground mb-1">Density</div>
                  <p className="text-xs text-muted-foreground mb-3">Control how compact the interface appears</p>
                  <div className="flex gap-2">
                    {["Comfortable", "Compact"].map(d => (
                      <button key={d} className={cn("px-4 py-2 rounded-xl border text-sm font-medium transition-all", d === "Comfortable" ? "border-[#440F7C] bg-[#440F7C]/5 text-[#440F7C]" : "border-border text-muted-foreground hover:border-[#440F7C]/30")}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Language */}
          {tab === "language" && (
            <Card>
              <h3 className="font-semibold mb-1">Language & Region</h3>
              <p className="text-sm text-muted-foreground mb-5">Set your preferred language and date format.</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Display Language</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { code: "en-NG", label: "English (Nigeria)", active: true },
                      { code: "ha", label: "Hausa", active: false },
                      { code: "yo", label: "Yorùbá", active: false },
                      { code: "ig", label: "Igbo", active: false },
                    ].map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { if (!lang.active) toast.info(`${lang.label} coming soon`); }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left",
                          lang.active ? "border-[#440F7C] bg-[#440F7C]/5" : "border-border hover:border-[#440F7C]/30"
                        )}
                      >
                        <span className={cn("text-sm font-medium", lang.active ? "text-[#440F7C]" : "text-foreground")}>{lang.label}</span>
                        {lang.active ? <Badge variant="purple">Active</Badge> : <span className="text-xs text-muted-foreground">Coming soon</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-1.5">Date Format</div>
                  <select className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50">
                    <option>DD/MM/YYYY (e.g. 14/11/2024)</option>
                    <option>MM/DD/YYYY (e.g. 11/14/2024)</option>
                    <option>YYYY-MM-DD (e.g. 2024-11-14)</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
