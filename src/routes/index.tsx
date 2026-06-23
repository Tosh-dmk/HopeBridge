import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  FileText,
  ShieldCheck,
  Users,
  ArrowRight,
  Navigation,
  Phone,
  Smartphone,
  Sprout,
  TrendingUp,
  Wifi,
  WifiOff,
  BadgeDollarSign,
  Building2,
  Handshake,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { AssistantPanel } from "@/components/AssistantPanel";
import { Button } from "@/components/ui/button";
import { RouteError, RouteNotFound } from "@/components/route-boundaries";
import { organizationsQuery, assistanceCentersQuery } from "@/lib/data";
import { InteractiveMap } from "@/components/InteractiveMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HopeBridge — Climate Finance & Community Resilience Platform" },
      {
        name: "description",
        content:
          "HopeBridge bridges the gap between climate-affected communities and the funding, aid, and recovery services designed to support them. Access climate grants, disaster relief, and resilience support online and offline via USSD.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(organizationsQuery());
    context.queryClient.ensureQueryData(assistanceCentersQuery());
  },
  component: Index,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

const categoryStyles: Record<string, string> = {
  government: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  non_profit: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  community: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  donor: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const categoryLabel: Record<string, string> = {
  government: "Government",
  non_profit: "Non-Profit",
  community: "Community",
  donor: "Donor",
};

const howItWorksSteps = [
  {
    n: "01",
    icon: FileText,
    title: "Report Your Impact",
    body: "Submit your situation via web or dial *483*111# from any feature phone — no internet needed.",
    accent: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950",
  },
  {
    n: "02",
    icon: BadgeDollarSign,
    title: "Match Climate Finance",
    body: "HopeBridge surfaces vetted emergency grants, cash transfers, and rebuilding funds you qualify for.",
    accent: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    n: "03",
    icon: Sprout,
    title: "Rebuild & Adapt",
    body: "Access mutual aid, step-by-step guides, and resilience programs to rebuild stronger than before.",
    accent: "text-accent",
    bg: "bg-brand-100 dark:bg-brand-100/20",
  },
];

const actions = [
  {
    n: "1",
    icon: FileText,
    title: "Report Damage",
    body: "Submit your situation and documentation for faster aid matching.",
    cta: "Start Report",
    to: "/report" as const,
  },
  {
    n: "2",
    icon: BadgeDollarSign,
    title: "Climate Finance",
    body: "Browse emergency grants, cash transfers & adaptation programs you qualify for.",
    cta: "Find Funding",
    to: "/funding" as const,
  },
  {
    n: "3",
    icon: Users,
    title: "Local Help",
    body: "Connect with nearby community groups offering meals, tools, and labor.",
    cta: "Join Group",
    to: "/community" as const,
  },
];

const impactStats = [
  { value: "KES 4.2B+", label: "Climate funds mobilized across Kenya", icon: TrendingUp },
  { value: "12,400+", label: "Families matched to verified programs", icon: Handshake },
  { value: "47 Counties", label: "Offline USSD access nationwide", icon: WifiOff },
  { value: "230+ NGOs", label: "Vetted partner organizations", icon: Building2 },
];

function Index() {
  const { data: orgs } = useSuspenseQuery(organizationsQuery());
  const { data: centers } = useSuspenseQuery(assistanceCentersQuery());
  const nearest = centers[0];
  const programs = orgs.slice(0, 3);

  const openUssd = () => {
    window.dispatchEvent(new CustomEvent("demo:open-ussd"));
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Climate Finance Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
                <Sprout className="size-3.5" />
                Climate Finance & Community Resilience Platform
              </div>

              <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-foreground md:text-6xl">
                Climate disasters happen.{" "}
                <span className="italic text-accent">Recovery funding exists.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                HopeBridge connects climate-affected communities with emergency grants, cash
                assistance, vetted aid organizations, and resilience programs — accessible online or
                offline via USSD.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/funding">Find Climate Finance</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2"
                  onClick={openUssd}
                  id="hero-ussd-btn"
                >
                  <Smartphone className="size-4" />
                  Offline USSD Demo
                </Button>
              </div>

              {/* Offline-first callout */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950">
                  <WifiOff className="size-4 text-emerald-700 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Works without internet.</span>{" "}
                  Dial{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                    *483*111#
                  </code>{" "}
                  from any feature phone to report damage and access grants.
                </p>
              </div>
            </div>

            {/* AI Assistant embedded in hero */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-brand-100 text-brand-800">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Recovery Assistant</p>
                  <p className="text-xs text-muted-foreground">
                    Describe your situation to find matching funds
                  </p>
                </div>
              </div>
              <AssistantPanel />
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS ────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {impactStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <s.icon className="mx-auto size-5 text-accent mb-2" />
                <p className="font-serif text-2xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              How HopeBridge works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three steps from disaster to recovery funding — with or without internet.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorksSteps.map((step) => (
              <div key={step.n} className="relative rounded-3xl border border-border bg-card p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${step.bg}`}
                  >
                    <step.icon className={`size-6 ${step.accent}`} />
                  </div>
                  <span className="font-serif text-4xl font-bold text-border">{step.n}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── USSD OFFLINE CALLOUT ─────────────────────────────────────── */}
        <section className="mb-20 overflow-hidden rounded-[2.5rem] border border-border bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text */}
            <div className="p-8 md:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <WifiOff className="size-3" /> Offline First
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                Climate finance, even without internet
              </h2>
              <p className="mt-4 text-muted-foreground">
                In rural and flood-affected areas, connectivity disappears when it's needed most.
                HopeBridge's USSD interface works on any feature phone, with no data required.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Report disaster damage from any phone",
                  "Request emergency supplies & shelter locations",
                  "Browse & apply for climate grants",
                  "Talk to local chiefs and coordinators",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full gap-2"
                  onClick={openUssd}
                  id="ussd-section-btn"
                >
                  <Smartphone className="size-4" />
                  Launch USSD Simulator
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/resources">Learn More</Link>
                </Button>
              </div>
            </div>
            {/* Phone illustration */}
            <div className="flex items-center justify-center bg-gradient-to-br from-brand-100/60 to-accent/10 p-8 md:p-12 dark:from-brand-100/10 dark:to-accent/5">
              <div className="w-48 rounded-2xl bg-neutral-800 p-2 border-2 border-neutral-700 shadow-xl">
                <div className="h-28 bg-[#8fa48c] border-2 border-[#788e75] rounded-md p-2 font-mono text-neutral-900 text-[9px] leading-tight flex flex-col gap-0.5">
                  <div className="text-right opacity-75">Safaricom</div>
                  <div className="text-center font-bold tracking-widest py-0.5 border-b border-neutral-700/20 mb-1 text-xs">
                    *483*111#
                  </div>
                  <div className="font-bold">HopeBridge Portal</div>
                  <div>1. Report Hazard</div>
                  <div>2. Request Supplies</div>
                  <div className="text-emerald-800 font-bold">3. Climate Grants ✓</div>
                  <div>4. Nearest Shelter</div>
                  <div>5. Talk to Chief</div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-0.5 w-full">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                    <div
                      key={k}
                      className="h-5 rounded bg-neutral-700 flex items-center justify-center text-neutral-300 text-[8px] font-bold"
                    >
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK ACTIONS ────────────────────────────────────────────── */}
        <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {actions.map((a) => (
            <div
              key={a.n}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-soft"
            >
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                <a.icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">{a.title}</h3>
              <p className="mt-3 text-muted-foreground">{a.body}</p>
              <Link to={a.to} className="mt-6 inline-flex items-center font-semibold text-accent">
                {a.cta}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </section>

        {/* ── MAP PREVIEW ──────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">
                Assistance Near You
              </h2>
              <p className="mt-2 text-muted-foreground">
                Temporary shelters, distribution centers, and aid hubs — updated in real time.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden shrink-0 text-accent sm:inline-flex">
              <Link to="/map">Expand map view</Link>
            </Button>
          </div>
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
            <InteractiveMap
              centers={centers}
              selectedId={nearest?.id}
              className="h-[320px] w-full rounded-3xl md:h-[420px]"
            />
            {nearest && (
              <div className="absolute z-[1000] bottom-4 left-4 right-4 max-w-sm rounded-2xl bg-card/95 p-6 shadow-soft backdrop-blur-sm sm:bottom-6 sm:left-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                    Nearest Center
                  </span>
                  {nearest.is_open && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      ● Active Now
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{nearest.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {nearest.address} • {nearest.services.slice(0, 3).join(", ")}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="size-4" aria-hidden="true" /> Get Directions
                    </a>
                  </Button>
                  {nearest.phone && (
                    <Button variant="outline" size="sm" aria-label="Call center" asChild>
                      <a href={`tel:${nearest.phone}`}>
                        <Phone className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── CURRENT RELIEF PROGRAMS ──────────────────────────────────── */}
        <section className="mb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">
                Active Climate Finance Programs
              </h2>
              <p className="mt-2 text-muted-foreground">
                Verified organizations currently accepting applications across Kenya.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden shrink-0 text-accent sm:inline-flex">
              <Link to="/funding">View all funding</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center rounded-xl bg-brand-100 font-serif font-bold text-brand-800">
                    {p.name.charAt(0)}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${categoryStyles[p.category]}`}
                  >
                    {categoryLabel[p.category]}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    {p.amount_label ?? p.deadline ?? "Available now"}
                  </span>
                  <Link to="/funding" className="text-sm font-semibold text-accent">
                    Apply →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLATFORM CTA ─────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Community */}
          <div className="rounded-[2.5rem] bg-primary p-8 text-primary-foreground md:p-10">
            <Users className="mb-4 size-8 text-primary-foreground/60" />
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              The heart of recovery is community.
            </h2>
            <p className="mt-4 text-sm text-primary-foreground/75">
              Connect with others who have faced similar challenges. Share resources, find
              volunteers, or talk with people who understand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="secondary" className="rounded-full">
                <Link to="/community">Browse support groups</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/community">Become a volunteer</Link>
              </Button>
            </div>
          </div>

          {/* Ops Portal */}
          <div className="rounded-[2.5rem] border border-border bg-card p-8 md:p-10">
            <Building2 className="mb-4 size-8 text-accent" />
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Are you an NGO or government agency?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              HopeBridge provides coordination dashboards, beneficiary tracking, and climate-finance
              analytics for organizations operating at scale.
            </p>
            <div className="mt-8">
              <Button asChild size="sm" className="rounded-full">
                <Link to="/operations">View Operations Portal</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
