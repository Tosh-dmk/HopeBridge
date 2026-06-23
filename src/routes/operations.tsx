import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  BadgeDollarSign,
  Smartphone,
  Globe,
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Send,
  MapPin,
  Loader2,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RouteError, RouteNotFound } from "@/components/route-boundaries";
import { toast } from "sonner";

export const Route = createFileRoute("/operations")({
  head: () => ({
    meta: [
      { title: "Disaster Operations Portal — HopeBridge" },
      {
        name: "description",
        content:
          "NGO and government operations dashboard for managing beneficiaries, coordinating climate-finance disbursements, tracking impact metrics, and accessing HopeBridge SaaS tools.",
      },
    ],
  }),
  component: OperationsPage,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

// ── Mock beneficiary data ─────────────────────────────────────────────────────
const MOCK_BENEFICIARIES = [
  {
    id: "b1",
    name: "Achieng Otieno",
    county: "Kisumu",
    disasterType: "flood",
    needs: ["Temporary housing", "Food & clean water"],
    status: "under_review" as const,
    severity: 4,
    submitted: "2 hours ago",
    phone: "0712 xxx xxx",
  },
  {
    id: "b2",
    name: "Kamau Njoroge",
    county: "Murang'a",
    disasterType: "landslide",
    needs: ["Rebuilding materials", "Medical aid"],
    status: "matched" as const,
    severity: 5,
    submitted: "5 hours ago",
    phone: "0722 xxx xxx",
  },
  {
    id: "b3",
    name: "Halima Abdi",
    county: "Turkana",
    disasterType: "drought",
    needs: ["M-Pesa cash assistance", "Food & clean water"],
    status: "submitted" as const,
    severity: 5,
    submitted: "8 hours ago",
    phone: "0733 xxx xxx",
  },
  {
    id: "b4",
    name: "Omondi Wafula",
    county: "Busia",
    disasterType: "flood",
    needs: ["Temporary housing", "Rebuilding materials"],
    status: "in_progress" as const,
    severity: 3,
    submitted: "1 day ago",
    phone: "0745 xxx xxx",
  },
  {
    id: "b5",
    name: "Fatuma Hassan",
    county: "Garissa",
    disasterType: "drought",
    needs: ["M-Pesa cash assistance"],
    status: "resolved" as const,
    severity: 4,
    submitted: "2 days ago",
    phone: "0754 xxx xxx",
  },
  {
    id: "b6",
    name: "Chebet Koech",
    county: "West Pokot",
    disasterType: "landslide",
    needs: ["Temporary housing", "Medical aid", "Food & clean water"],
    status: "under_review" as const,
    severity: 5,
    submitted: "3 hours ago",
    phone: "0768 xxx xxx",
  },
];

const statusConfig = {
  submitted: {
    label: "Submitted",
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    icon: Clock3,
  },
  under_review: {
    label: "Under Review",
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    icon: AlertTriangle,
  },
  matched: {
    label: "Aid Matched",
    color: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    icon: ShieldCheck,
  },
  in_progress: { label: "In Progress", color: "bg-brand-100 text-brand-800", icon: Zap },
  resolved: {
    label: "Resolved",
    color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    icon: CheckCircle2,
  },
};

const disasterLabel: Record<string, string> = {
  flood: "Flood",
  drought: "Drought",
  landslide: "Landslide",
  storm: "Storm",
  earthquake: "Earthquake",
  wildfire: "Wildfire",
  other: "Other",
};

const impactMetrics = [
  {
    label: "Total Climate Finance Mobilized",
    value: "KES 4.28B",
    change: "+12.4%",
    icon: BadgeDollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    label: "Families Matched to Programs",
    value: "12,847",
    change: "+834 this week",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    label: "USSD Offline Applications",
    value: "3,214",
    change: "Last 30 days",
    icon: Smartphone,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950",
  },
  {
    label: "Active Partner Organizations",
    value: "231",
    change: "Across 47 counties",
    icon: Globe,
    color: "text-accent",
    bg: "bg-brand-100 dark:bg-brand-100/20",
  },
];

const regionFinanceData = [
  { region: "Western (Busia/Kisumu)", disbursed: 820, goal: 1200, type: "Flood Recovery" },
  { region: "Northern Kenya (ASAL)", disbursed: 1480, goal: 2000, type: "Drought Relief" },
  { region: "Rift Valley", disbursed: 540, goal: 900, type: "Landslide Response" },
  { region: "Coastal Region", disbursed: 390, goal: 600, type: "Storm Recovery" },
  { region: "Nairobi Metro", disbursed: 280, goal: 400, type: "Urban Flooding" },
];

const saasPlans = [
  {
    name: "NGO Resilience Suite",
    price: "KES 25,000",
    period: "/month",
    description: "For NGOs managing 50–500 beneficiaries in disaster-hit areas.",
    features: [
      "Beneficiary pipeline management",
      "SMS dispatch & USSD tracking",
      "Climate finance matching engine",
      "Monthly impact reporting",
      "Priority verification queue",
    ],
    cta: "Start Free Trial",
    accent: false,
    tag: "Most Popular",
  },
  {
    name: "County Government License",
    price: "KES 150,000",
    period: "/month",
    description: "County-wide disaster coordination and government reporting tools.",
    features: [
      "County-level operations dashboard",
      "Multi-ward beneficiary tracking",
      "USSD analytics & NDMA API integration",
      "Emergency broadcast system",
      "Custom climate risk heat maps",
      "Dedicated support & SLA",
    ],
    cta: "Request Demo",
    accent: true,
    tag: "Enterprise",
  },
  {
    name: "Marketplace Listing",
    price: "1.5%",
    period: "coordination fee",
    description: "For NGOs and government programs promoting grant opportunities on HopeBridge.",
    features: [
      "Verified program badge",
      "Promoted placement in marketplace",
      "USSD Option 3 integration",
      "Application analytics dashboard",
      "Beneficiary reach reports",
    ],
    cta: "List Your Program",
    accent: false,
    tag: "",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function OperationsPage() {
  const [activeTab, setActiveTab] = useState<"beneficiaries" | "impact" | "saas">("beneficiaries");
  const [beneficiaries, setBeneficiaries] = useState(MOCK_BENEFICIARIES);
  const [disbursing, setDisbursing] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setVerifying(id);
    setTimeout(() => {
      setBeneficiaries((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "matched" as const } : b)),
      );
      setVerifying(null);
      toast.success("Damage verified. Beneficiary matched with aid programs.");
    }, 1400);
  };

  const handleDisburse = (b: (typeof MOCK_BENEFICIARIES)[0]) => {
    setDisbursing(b.id);
    // Trigger M-Pesa simulation
    window.dispatchEvent(
      new CustomEvent("demo:stk", {
        detail: {
          amount: 8500,
          account: `HB-${b.id.toUpperCase()}`,
        },
      }),
    );
    setTimeout(() => {
      setBeneficiaries((prev) =>
        prev.map((ben) => (ben.id === b.id ? { ...ben, status: "in_progress" as const } : ben)),
      );
      setDisbursing(null);
      toast.success(`Cash assistance dispatched to ${b.name} via M-Pesa.`);
      window.dispatchEvent(
        new CustomEvent("demo:sms", {
          detail: {
            title: "HopeBridge Disbursement",
            body: `KES 8,500 emergency cash assistance has been sent to ${b.name} (${b.county} County) via M-Pesa. Ref: HB-${b.id.toUpperCase()}-CASH.`,
          },
        }),
      );
    }, 2000);
  };

  const handleResolve = (id: string) => {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "resolved" as const } : b)),
    );
    toast.success("Case marked as resolved.");
  };

  const statusCounts = beneficiaries.reduce(
    (acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Building2 className="size-3.5" />
            Disaster Operations Portal
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                Coordinator Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Manage beneficiary pipelines, coordinate climate-finance disbursements, and track
                impact — for NGOs and government agencies coordinating climate recovery at scale.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" className="rounded-full">
                <BarChart3 className="size-4 mr-1.5" /> Export Report
              </Button>
              <Button size="sm" className="rounded-full">
                <Send className="size-4 mr-1.5" /> Broadcast Alert
              </Button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 border-b border-border">
          {[
            { key: "beneficiaries", label: "Beneficiary Pipeline", icon: Users },
            { key: "impact", label: "Impact & Finance", icon: TrendingUp },
            { key: "saas", label: "SaaS & Pricing", icon: BadgeDollarSign },
          ].map((tab) => (
            <button
              key={tab.key}
              id={`ops-tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key as "beneficiaries" | "impact" | "saas")}
              className={`flex items-center gap-1.5 pb-3 px-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: BENEFICIARY PIPELINE ──────────────────────────────── */}
        {activeTab === "beneficiaries" && (
          <div>
            {/* Status summary */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {Object.entries(statusConfig).map(([key, conf]) => (
                <div key={key} className="rounded-xl border border-border bg-card p-3 text-center">
                  <p className="text-xl font-serif font-semibold text-foreground">
                    {statusCounts[key] ?? 0}
                  </p>
                  <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                    {conf.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Beneficiary list */}
            <div className="space-y-3">
              {beneficiaries.map((b) => {
                const conf = statusConfig[b.status];
                const StatusIcon = conf.icon;
                const isDisbursingThis = disbursing === b.id;
                const isVerifyingThis = verifying === b.id;

                return (
                  <div
                    key={b.id}
                    className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-soft"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-foreground">{b.name}</h3>
                          <span
                            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${conf.color}`}
                          >
                            <StatusIcon className="size-3" />
                            {conf.label}
                          </span>
                          <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Severity {b.severity}/5
                          </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {b.county} County
                          </span>
                          <span>•</span>
                          <span>{disasterLabel[b.disasterType]}</span>
                          <span>•</span>
                          <span>{b.submitted}</span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {b.needs.map((n) => (
                            <span
                              key={n}
                              className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 shrink-0">
                        {b.status === "submitted" || b.status === "under_review" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full text-xs"
                            onClick={() => handleVerify(b.id)}
                            disabled={isVerifyingThis}
                          >
                            {isVerifyingThis ? (
                              <>
                                <Loader2 className="size-3 animate-spin mr-1" /> Verifying...
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="size-3 mr-1" /> Verify Damage
                              </>
                            )}
                          </Button>
                        ) : null}

                        {b.status === "matched" || b.status === "in_progress" ? (
                          <Button
                            size="sm"
                            className="rounded-full text-xs"
                            onClick={() => handleDisburse(b)}
                            disabled={isDisbursingThis || b.status === "in_progress"}
                          >
                            {isDisbursingThis ? (
                              <>
                                <Loader2 className="size-3 animate-spin mr-1" /> Sending M-Pesa...
                              </>
                            ) : b.status === "in_progress" ? (
                              <>
                                <Zap className="size-3 mr-1" /> Disbursed
                              </>
                            ) : (
                              <>
                                <BadgeDollarSign className="size-3 mr-1" /> Disburse Cash
                              </>
                            )}
                          </Button>
                        ) : null}

                        {b.status === "in_progress" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full text-xs"
                            onClick={() => handleResolve(b.id)}
                          >
                            <CheckCircle2 className="size-3 mr-1" /> Mark Resolved
                          </Button>
                        ) : null}

                        {b.status === "resolved" ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <CheckCircle2 className="size-4" /> Case Closed
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 2: IMPACT & FINANCE ───────────────────────────────────── */}
        {activeTab === "impact" && (
          <div className="space-y-8">
            {/* Top metrics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {impactMetrics.map((m) => (
                <div key={m.label} className="rounded-2xl border border-border bg-card p-5">
                  <div
                    className={`mb-3 flex size-10 items-center justify-center rounded-xl ${m.bg}`}
                  >
                    <m.icon className={`size-5 ${m.color}`} />
                  </div>
                  <p className="font-serif text-2xl font-semibold text-foreground">{m.value}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted-foreground">{m.label}</p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <ArrowUpRight className="size-3" />
                    {m.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Regional finance distribution */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 font-serif text-xl font-semibold text-foreground">
                Regional Climate Finance Distribution (KES Millions)
              </h2>
              <div className="space-y-4">
                {regionFinanceData.map((r) => {
                  const pct = Math.round((r.disbursed / r.goal) * 100);
                  return (
                    <div key={r.region}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-foreground">{r.region}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{r.type}</span>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">
                          KES {r.disbursed}M / {r.goal}M ({pct}%)
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* USSD vs Web */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <Smartphone className="size-8 mx-auto text-amber-500 mb-2" />
                <p className="font-serif text-3xl font-semibold text-foreground">38%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  of applications via USSD (offline)
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <Globe className="size-8 mx-auto text-accent mb-2" />
                <p className="font-serif text-3xl font-semibold text-foreground">62%</p>
                <p className="text-sm text-muted-foreground mt-1">via web platform</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center">
                <BadgeDollarSign className="size-8 mx-auto text-emerald-500 mb-2" />
                <p className="font-serif text-3xl font-semibold text-foreground">KES 8,200</p>
                <p className="text-sm text-muted-foreground mt-1">avg. grant per beneficiary</p>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: SAAS PLANS ────────────────────────────────────────── */}
        {activeTab === "saas" && (
          <div>
            <div className="mb-10 max-w-2xl">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                HopeBridge Sustainability Model
              </h2>
              <p className="mt-3 text-muted-foreground">
                HopeBridge generates revenue by providing tools, dashboards, and marketplace access
                to the NGOs, government agencies, and development partners who use the platform to
                coordinate climate-finance delivery at scale.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {saasPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border p-6 ${
                    plan.accent
                      ? "border-accent bg-primary text-primary-foreground"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.tag && (
                    <div
                      className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        plan.accent ? "bg-accent text-white" : "bg-brand-100 text-brand-800"
                      }`}
                    >
                      {plan.tag}
                    </div>
                  )}

                  <div className="mb-5">
                    <h3
                      className={`font-serif text-lg font-semibold ${plan.accent ? "text-primary-foreground" : "text-foreground"}`}
                    >
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span
                        className={`font-serif text-3xl font-bold ${plan.accent ? "text-primary-foreground" : "text-foreground"}`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ${plan.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {plan.period}
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-sm ${plan.accent ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm ${plan.accent ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                      >
                        <CheckCircle2
                          className={`size-4 shrink-0 mt-0.5 ${plan.accent ? "text-primary-foreground" : "text-accent"}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.accent ? "secondary" : "default"}
                    className="w-full rounded-full"
                    size="sm"
                    onClick={() =>
                      toast.success(
                        `${plan.cta} — HopeBridge sales team will reach out within 24 hours.`,
                      )
                    }
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>

            {/* Traction callout */}
            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Why organizations choose HopeBridge
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Last-mile access",
                    body: "USSD integration ensures programs reach communities even with zero internet connectivity.",
                  },
                  {
                    title: "Instant M-Pesa",
                    body: "Disburse emergency cash assistance directly to beneficiaries via M-Pesa in under 5 minutes.",
                  },
                  {
                    title: "Verified impact",
                    body: "Every disbursement logged with GPS, timestamp, and beneficiary confirmation for donor reporting.",
                  },
                ].map((c) => (
                  <div key={c.title} className="rounded-xl border border-border p-4">
                    <ShieldCheck className="size-5 text-accent mb-2" />
                    <p className="font-semibold text-foreground text-sm">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
