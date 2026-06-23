import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Heart,
  TrendingUp,
  X,
  Loader2,
  CheckCircle2,
  Search,
  WifiOff,
  BadgeDollarSign,
  Sprout,
  Globe,
  Users,
  Filter,
  ArrowRight,
  ExternalLink,
  Smartphone,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RouteError, RouteNotFound } from "@/components/route-boundaries";
import { organizationsQuery } from "@/lib/data";
import { CLIMATE_FINANCE_OPPORTUNITIES, type ClimateOpportunity } from "@/lib/climateData";
import { FundingSkeleton } from "@/components/Skeletons";
import { donateMpesa } from "@/lib/funding.functions";

export const Route = createFileRoute("/funding")({
  head: () => ({
    meta: [
      { title: "Climate Finance Marketplace — HopeBridge" },
      {
        name: "description",
        content:
          "Browse emergency cash transfers, climate adaptation grants, NGO rebuilding programs, and government assistance you qualify for. Accessible online and offline via USSD.",
      },
      { property: "og:title", content: "Climate Finance Marketplace — HopeBridge" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(organizationsQuery());
  },
  pendingComponent: FundingSkeleton,
  component: Funding,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

const campaigns = [
  {
    id: "c1",
    title: "Budalangi Community Hall Rebuild",
    location: "Busia County",
    raised: 580000,
    goal: 900000,
    donors: 312,
  },
  {
    id: "c2",
    title: "Emergency Roofing for Nyando Flood Families",
    location: "Kisumu County",
    raised: 350000,
    goal: 500000,
    donors: 245,
  },
  {
    id: "c3",
    title: "Clean Water & Boreholes for Turkana",
    location: "Turkana County",
    raised: 820000,
    goal: 1200000,
    donors: 589,
  },
];

const currency = (n: number) =>
  n.toLocaleString("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 });

const fundingTypeStyles: Record<string, string> = {
  "Cash Transfer": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "Rebuilding Grant": "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  "Adaptation Subsidy": "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "Livelihood Recovery": "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "Emergency Aid": "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "Equity Finance": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

const typeFilters = [
  { value: "all", label: "All Types" },
  { value: "Cash Transfer", label: "Cash Transfers" },
  { value: "Rebuilding Grant", label: "Rebuilding Grants" },
  { value: "Adaptation Subsidy", label: "Adaptation" },
  { value: "Livelihood Recovery", label: "Livelihood" },
  { value: "Emergency Aid", label: "Emergency Aid" },
];

function DonateModal({ campaign, onClose }: { campaign: any; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const callDonate = useServerFn(donateMpesa);
  const mutation = useMutation({
    mutationFn: (args: { phone: string; amount: string; paybill: string; account: string }) =>
      callDonate({ data: args }),
  });

  useEffect(() => {
    const handleSuccess = () => {
      mutation.mutate({
        phone: phone.trim(),
        amount: amount.trim(),
        paybill: "222911",
        account: campaign.title.substring(0, 20).toUpperCase(),
      });
      setIsProcessing(false);
    };

    window.addEventListener("demo:stk-success", handleSuccess);
    return () => window.removeEventListener("demo:stk-success", handleSuccess);
  }, [phone, amount, campaign.title]);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !amount.trim()) return;
    setIsProcessing(true);
    window.dispatchEvent(
      new CustomEvent("demo:stk", {
        detail: {
          amount: Number(amount),
          account: campaign.title.substring(0, 20).toUpperCase(),
        },
      }),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="size-5" />
        </button>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-1">
          Donate with M-Pesa
        </h2>
        <p className="text-sm text-muted-foreground mb-6">Supporting {campaign.title}</p>

        {mutation.isSuccess ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
            <CheckCircle2 className="size-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
              {mutation.data.message}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Receipt: {mutation.data.receipt}</p>
            <Button onClick={onClose} className="mt-4 w-full" variant="outline">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-4">
            <div className="rounded-xl bg-muted/50 p-4 mb-6 border border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Paybill Number:</span>
                <span className="font-bold text-foreground">222911</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-bold text-foreground">
                  {campaign.title.substring(0, 20).toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                M-Pesa Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="e.g. 0700 000 000"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isProcessing || mutation.isPending}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">
                Amount (KES)
              </label>
              <input
                id="amount"
                type="number"
                required
                placeholder="Amount in KES"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing || mutation.isPending}
              />
            </div>
            {mutation.isError && (
              <p className="text-xs text-destructive mb-2">{(mutation.error as Error).message}</p>
            )}
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isProcessing || mutation.isPending}
            >
              {isProcessing || mutation.isPending ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <Heart className="size-4 mr-2" />
              )}
              {isProcessing
                ? "Waiting for PIN entry..."
                : mutation.isPending
                  ? "Processing..."
                  : "Donate via STK Push"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function GrantApplyModal({
  opportunity,
  onClose,
}: {
  opportunity: ClimateOpportunity;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Trigger simulated SMS confirmation
      window.dispatchEvent(
        new CustomEvent("demo:sms", {
          detail: {
            title: opportunity.provider,
            body: `Your application for "${opportunity.title}" has been received. Reference: HB-${Math.floor(Math.random() * 90000) + 10000}. Verification within 5-7 business days.`,
          },
        }),
      );
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="size-5" />
        </button>

        {submitted ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="size-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              Application Received
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              Your application for <strong>{opportunity.title}</strong> is under review.
            </p>
            <p className="text-xs text-muted-foreground">
              Check your dashboard for status updates. An SMS confirmation has been sent.
            </p>
            <Button onClick={onClose} className="mt-6 w-full rounded-full">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${fundingTypeStyles[opportunity.type] ?? "bg-muted text-muted-foreground"}`}
              >
                {opportunity.type}
              </span>
              <h2 className="font-serif text-xl font-semibold text-foreground mt-2">
                {opportunity.title}
              </h2>
              <p className="text-sm text-muted-foreground">By {opportunity.provider}</p>
              <p className="mt-3 font-semibold text-accent text-lg">{opportunity.amount}</p>
            </div>

            <form onSubmit={handleApply} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">County</label>
                <input
                  required
                  placeholder="e.g. Kisumu, Turkana, Mombasa"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  M-Pesa / Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 p-3 text-xs text-amber-800 dark:text-amber-300">
                <WifiOff className="size-3 inline mr-1" />
                Also accessible offline: dial <code className="font-mono">*483*111#</code> → Option
                3 (Climate Grants)
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight className="size-4 ml-1" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Funding() {
  const { data: orgs } = useSuspenseQuery(organizationsQuery());
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ClimateOpportunity | null>(null);
  const [activeTab, setActiveTab] = useState<"marketplace" | "campaigns">("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredOpportunities = CLIMATE_FINANCE_OPPORTUNITIES.filter((op) => {
    const matchesType = typeFilter === "all" || op.type === typeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      op.title.toLowerCase().includes(q) ||
      op.provider.toLowerCase().includes(q) ||
      op.type.toLowerCase().includes(q) ||
      op.tags.some((t) => t.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <header className="max-w-3xl mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <BadgeDollarSign className="size-3.5" />
            Climate Finance & Aid Marketplace
          </div>
          <h1 className="font-serif text-4xl font-semibold text-foreground">
            Find the funding you qualify for
          </h1>
          <p className="mt-3 text-muted-foreground">
            Climate finance exists. HopeBridge helps communities find it. Browse verified grants,
            cash transfers, and adaptation programs — and apply in minutes.
          </p>
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-2.5 dark:bg-amber-950/30 dark:border-amber-800/40">
            <Smartphone className="size-4 shrink-0 text-amber-700 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              All programs accessible offline — dial{" "}
              <code className="font-mono font-bold">*483*111#</code> → option{" "}
              <strong>3. Climate Grants</strong>
            </p>
          </div>
        </header>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
          <button
            id="tab-marketplace"
            onClick={() => setActiveTab("marketplace")}
            className={`pb-3 px-1 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "marketplace"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BadgeDollarSign className="size-4 inline mr-1.5" />
            Resilience & Adaptation Grants
          </button>
          <button
            id="tab-campaigns"
            onClick={() => setActiveTab("campaigns")}
            className={`pb-3 px-1 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "campaigns"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className="size-4 inline mr-1.5" />
            Community Aid Campaigns
          </button>
        </div>

        {/* ── TAB 1: MARKETPLACE ───────────────────────────────── */}
        {activeTab === "marketplace" && (
          <div>
            {/* Search + filter */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grants, cash transfers, providers..."
                  className="pl-9"
                  aria-label="Search climate finance programs"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((f) => (
                  <Button
                    key={f.value}
                    variant={typeFilter === f.value ? "default" : "outline"}
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() => setTypeFilter(f.value)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats bar */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="size-4" />
                <span className="font-semibold text-foreground">
                  {filteredOpportunities.length}
                </span>{" "}
                programs found
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="size-4" />
                Covering <span className="font-semibold text-foreground mx-1">47</span> Kenyan
                counties
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WifiOff className="size-4" />
                USSD-accessible
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((op) => (
                <article
                  key={op.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${fundingTypeStyles[op.type] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {op.type}
                    </span>
                    {op.ussd && (
                      <span
                        title="Accessible via USSD"
                        className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400"
                      >
                        <WifiOff className="size-3" /> USSD
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-foreground leading-snug">
                      {op.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{op.provider}</p>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {op.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {op.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="font-semibold text-accent text-sm">{op.amount}</p>
                      <p className="text-[10px] text-muted-foreground">{op.coverage}</p>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => setSelectedOpportunity(op)}
                    >
                      Apply
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {filteredOpportunities.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                No programs match your search. Try a different term or filter.
              </p>
            )}
          </div>
        )}

        {/* ── TAB 2: COMMUNITY CAMPAIGNS ───────────────────────── */}
        {activeTab === "campaigns" && (
          <div>
            <div className="mb-8 flex items-center gap-2">
              <TrendingUp className="size-5 text-accent" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Active community campaigns
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {campaigns.map((c) => {
                const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
                return (
                  <article
                    key={c.id}
                    className="flex flex-col rounded-2xl border border-border bg-card p-6"
                  >
                    <span className="text-xs font-medium text-muted-foreground">{c.location}</span>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                      {c.title}
                    </h3>
                    <div className="mt-5 flex-1">
                      <Progress value={pct} className="h-2" />
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="font-semibold text-foreground">{currency(c.raised)}</span>
                        <span className="text-sm text-muted-foreground">of {currency(c.goal)}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {pct}% funded • {c.donors} donors
                      </p>
                    </div>
                    <Button onClick={() => setSelectedCampaign(c)} className="mt-6 rounded-full">
                      <Heart className="size-4" /> Donate via M-Pesa
                    </Button>
                  </article>
                );
              })}
            </div>

            {/* Financial assistance from orgs */}
            <section className="mt-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
                Financial assistance you may qualify for
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {orgs
                  .filter((o) => o.amount_label)
                  .slice(0, 4)
                  .map((o) => (
                    <article
                      key={o.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground">{o.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="block font-semibold text-accent">{o.amount_label}</span>
                        {o.deadline && (
                          <span className="text-xs text-muted-foreground">{o.deadline}</span>
                        )}
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {selectedCampaign && (
        <DonateModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
      {selectedOpportunity && (
        <GrantApplyModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </PageShell>
  );
}
