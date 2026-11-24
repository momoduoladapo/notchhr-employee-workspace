import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Building2, CheckCircle, Loader2 } from "lucide-react";
import { Badge, Alert } from "../../components/ui";
import { useAuth } from "../../store/AuthContext";

const PLAN_VARIANT: Record<string, "purple" | "magenta" | "info" | "default"> = {
  enterprise: "purple",
  business:   "magenta",
  starter:    "info",
  free:       "default",
};

export default function OrgSelectPage() {
  const { organizations, loadOrganizations, selectOrganization, loginStep, status, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStep !== "org") { navigate("/login"); return; }
    loadOrganizations();
  }, [loginStep, navigate, loadOrganizations]);

  useEffect(() => {
    if (loginStep === "done") navigate("/dashboard");
  }, [loginStep, navigate]);

  async function handleSelect(orgId: string) {
    await selectOrganization(orgId);
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-[#D62196] items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Select organisation</h1>
        <p className="text-sm text-white/60 mt-1">Choose the workspace you want to access</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-2xl">
        {error && <div className="mb-4"><Alert variant="error">{error}</Alert></div>}

        {status === "loading" && organizations.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 size={24} className="animate-spin text-[#440F7C]" />
          </div>
        ) : (
          <div className="space-y-2">
            {organizations.map(org => (
              <button
                key={org.id}
                onClick={() => handleSelect(org.id)}
                disabled={status === "loading"}
                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-[#440F7C] hover:bg-[#440F7C]/3 transition-all group text-left disabled:opacity-50"
              >
                <div className="w-10 h-10 rounded-xl bg-[#440F7C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#440F7C]/15">
                  <Building2 size={20} className="text-[#440F7C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{org.name}</div>
                  <div className="text-xs text-gray-400 truncate">{org.slug}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={PLAN_VARIANT[org.plan] ?? "default"}>
                    {org.plan.charAt(0).toUpperCase() + org.plan.slice(1)}
                  </Badge>
                  <CheckCircle size={16} className="text-[#440F7C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          Contact your administrator if you don't see your organisation.
        </p>
      </div>
    </div>
  );
}
