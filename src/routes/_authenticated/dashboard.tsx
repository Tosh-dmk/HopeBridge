import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FilePlus2,
  CheckCircle2,
  Clock3,
  Sparkles,
  ArrowRight,
  BadgeDollarSign,
  Smartphone,
  WifiOff,
  Sprout,
  Building2,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RouteError, RouteNotFound } from "@/components/route-boundaries";
import { useAuth } from "@/hooks/use-auth";
import { myReportsQuery, organizationsQuery, type DisasterReport } from "@/lib/data";
import { DashboardSkeleton } from "@/components/Skeletons";
import { CLIMATE_FINANCE_OPPORTUNITIES } from "@/lib/climateData";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Recovery Dashboard — HopeBridge" }],
  }),
  component: Dashboard,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

// ── Climate Recovery Blueprint builder ───────────────────────────────────────
const RECOVERY_BLUEPRINTS: Record<string, { steps: string[]; grantTags: string[] }> = {
  flood: {
    steps: [
      "Relocate to nearest shelter or relief center",
      "Document property damage with photos for verification",
      "Register with local chief or KRCS for emergency aid",
      "Apply for Ministry of Devolution iron sheet distribution",
      "Join Flood Survivors community chama for peer support",
    ],
    grantTags: ["flood", "housing", "emergency", "materials"],
  },
  drought: {
    steps: [
      "Register for NDMA HSNP cash transfer at local Huduma Centre",
      "Request emergency water trucking through county government",
      "Join Drought Resilience ASAL Network community group",
      "Apply for KENAFF seed recovery kit for next planting season",
      "Explore KCEP-CRAL adaptation subsidy for drought-resistant crops",
    ],
    grantTags: ["drought", "ASAL", "seeds", "M-Pesa"],
  },
  landslide: {
    steps: [
      "Evacuate to safer higher ground immediately",
      "Contact West Pokot/Muranga county disaster management",
      "Report damage via HopeBridge USSD: *483*111# → Option 1",
      "Apply for Plan International emergency shelter support",
      "File for government rebuilding materials assistance",
    ],
    grantTags: ["landslide", "shelter", "emergency", "housing"],
  },
  storm: {
    steps: [
      "Check for structural damage before re-entering buildings",
      "Report roof damage for iron sheet distribution eligibility",
      "Apply for Kenya Red Cross emergency cash assistance",
      "Claim MSME rebuild grant if business stock was damaged",
      "Join Nairobi Urban Flood Help group for peer support",
    ],
    grantTags: ["storm", "housing", "business", "emergency"],
  },
  earthquake: {
    steps: [
      "Do not re-enter buildings until structurally cleared",
      "Register with Red Cross for emergency shelter kit",
      "Document structural damage for insurance and aid eligibility",
      "Apply for emergency cash assistance for immediate needs",
      "Access community mental health support resources",
    ],
    grantTags: ["emergency", "shelter", "medical"],
  },
  wildfire: {
    steps: [
      "Ensure complete evacuation from affected zone",
      "Report fire damage to county fire brigade and NDMA",
      "Apply for livelihood recovery grant to restart farming",
      "Request seed recovery kits for next planting season",
      "Join community chama for shared land restoration effort",
    ],
    grantTags: ["agriculture", "seeds", "livelihood"],
  },
  other: {
    steps: [
      "Contact local chief or county disaster coordinator",
      "Submit a detailed damage report via HopeBridge",
      "Browse the Climate Finance Marketplace for matching grants",
      "Connect with a relevant community support group",
      "Access the AI Recovery Assistant for tailored guidance",
    ],
    grantTags: ["emergency", "grants"],
  },
};

const statusOrder: DisasterReport["status"][] = [
  "submitted",
  "under_review",
  "matched",
  "in_progress",
  "resolved",
];

const statusLabel: Record<DisasterReport["status"], string> = {
  submitted: "Submitted",
  under_review: "Under review",
  matched: "Matched with aid",
  in_progress: "In progress",
  resolved: "Resolved",
};

const disasterLabel: Record<string, string> = {
  flood: "Flood",
  earthquake: "Earthquake",
  drought: "Drought",
  landslide: "Landslide",
  storm: "Storm",
  wildfire: "Wildfire",
  other: "Other",
};

function progressFor(status: DisasterReport["status"]) {
  const idx = statusOrder.indexOf(status);
  return Math.round(((idx + 1) / statusOrder.length) * 100);
}

function Dashboard() {
  const { user } = useAuth();
  const { data: reports = [], isLoading } = useQuery(myReportsQuery(user?.id));
  const { data: orgs = [] } = useQuery(organizationsQuery());

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const firstName =
    (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  const recommended = orgs.slice(0, 3);
  const latest = reports[0];

  // Build recovery blueprint from latest report
  const blueprint = latest
    ? (RECOVERY_BLUEPRINTS[latest.disaster_type] ?? RECOVERY_BLUEPRINTS.other)
    : null;
  const matchedGrants = blueprint
    ? CLIMATE_FINANCE_OPPORTUNITIES.filter((op) =>
        blueprint.grantTags.some((tag) => op.tags.includes(tag)),
      ).slice(0, 3)
    : [];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Welcome, {firstName}
            </h1>
            <p className="mt-1 text-muted-foreground">Here's where your recovery stands today.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/funding">
                <BadgeDollarSign className="size-4" /> Find Funding
              </Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/report">
                <FilePlus2 className="size-4" /> New report
              </Link>
            </Button>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Let's start your recovery
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Report what happened and what you need. We'll match you with relevant aid and support
              right away.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/report">Report damage</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Reports + Blueprint */}
            <div className="space-y-6 lg:col-span-2">
              {/* Climate Recovery Blueprint */}
              {blueprint && latest && (
                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Sprout className="size-5 text-accent" />
                    <h2 className="font-serif text-lg font-semibold text-foreground">
                      Your Climate Recovery Blueprint
                    </h2>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Based on your {disasterLabel[latest.disaster_type].toLowerCase()} report in{" "}
                    {latest.location}, here are your recommended recovery steps:
                  </p>
                  <ol className="space-y-2">
                    {blueprint.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>

                  {/* USSD Offline note */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 px-3 py-2">
                    <WifiOff className="size-4 shrink-0 text-amber-600" />
                    <p className="text-xs text-amber-800 dark:text-amber-300">
                      Access these steps offline — dial{" "}
                      <code className="font-mono font-bold">*483*111#</code> from any phone.
                    </p>
                  </div>
                </div>
              )}

              {/* Matched Climate Grants */}
              {matchedGrants.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <BadgeDollarSign className="size-5 text-accent" />
                      <h2 className="font-serif text-lg font-semibold text-foreground">
                        Matched Climate Finance
                      </h2>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="text-accent">
                      <Link to="/funding">
                        See all <ArrowRight className="size-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {matchedGrants.map((grant) => (
                      <div
                        key={grant.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {grant.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{grant.provider}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-accent">{grant.amount}</p>
                          {grant.ussd && (
                            <span className="text-[10px] text-amber-600 flex items-center gap-0.5 justify-end">
                              <WifiOff className="size-2.5" /> USSD
                            </span>
                          )}
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="rounded-full shrink-0"
                          variant="outline"
                        >
                          <Link to="/funding">Apply</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {latest && (
                <div className="rounded-2xl border border-border bg-card p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-lg font-semibold text-foreground">
                        {disasterLabel[latest.disaster_type]} recovery — {latest.location}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {statusLabel[latest.status]}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-800">
                      {progressFor(latest.status)}%
                    </span>
                  </div>
                  <Progress value={progressFor(latest.status)} className="mt-6 h-3" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {latest.needs.map((n) => (
                      <span
                        key={n}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="font-serif text-xl font-semibold text-foreground">All reports</h3>
              <div className="space-y-3">
                {reports.map((r) => (
                  <article
                    key={r.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {r.status === "resolved" ? (
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                        ) : (
                          <Clock3 className="size-4 shrink-0 text-accent" />
                        )}
                        <h4 className="truncate font-semibold text-foreground">
                          {disasterLabel[r.disaster_type]} — {r.location}
                        </h4>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{r.description}</p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {statusLabel[r.status]}
                    </span>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="size-4" aria-hidden="true" /> Recovery Assistant
                </div>
                <p className="mt-2 text-sm text-primary-foreground/75">
                  Describe your situation to find specific programs you may qualify for.
                </p>
                <Button asChild variant="secondary" className="mt-4 w-full rounded-full">
                  <Link to="/assistant">Ask the assistant</Link>
                </Button>
              </div>

              {/* USSD Offline quick access */}
              <div className="rounded-2xl border border-amber-200/60 bg-amber-50 dark:bg-amber-950/30 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="size-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Offline USSD Access
                  </span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  No internet? Dial <code className="font-mono font-bold">*483*111#</code> from any
                  phone to report, request supplies, or apply for climate grants.
                </p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("demo:open-ussd"))}
                  className="mt-3 text-xs font-semibold text-amber-800 dark:text-amber-300 underline cursor-pointer"
                >
                  Open USSD Simulator →
                </button>
              </div>

              {/* Ops Portal CTA */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <Building2 className="size-5 text-accent mb-2" />
                <p className="text-sm font-semibold text-foreground">Are you an NGO coordinator?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Access the full operations dashboard to manage beneficiaries and coordinate
                  climate-finance disbursements.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-3 w-full rounded-full">
                  <Link to="/operations">View Ops Portal</Link>
                </Button>
              </div>

              <h3 className="px-1 pt-2 font-serif text-lg font-semibold text-foreground">
                Recommended programs
              </h3>
              {recommended.map((o) => (
                <Link
                  key={o.id}
                  to="/organizations"
                  className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{o.name}</h4>
                    <ArrowRight className="size-4 shrink-0 text-accent" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{o.description}</p>
                </Link>
              ))}
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}
