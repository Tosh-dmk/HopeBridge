import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { RouteError, RouteNotFound } from "@/components/route-boundaries";
import { assistanceCentersQuery } from "@/lib/data";
import { InteractiveMap } from "@/components/InteractiveMap";
import { MapSkeleton } from "@/components/Skeletons";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Assistance Centers Near You — HopeBridge" },
      {
        name: "description",
        content:
          "Find nearby disaster assistance centers, emergency shelters, and distribution points with services, hours, and contact details.",
      },
      { property: "og:title", content: "Assistance Centers Map — HopeBridge" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(assistanceCentersQuery());
  },
  pendingComponent: MapSkeleton,
  component: MapPage,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

function MapPage() {
  const { data: centers } = useSuspenseQuery(assistanceCentersQuery());
  const [selectedId, setSelectedId] = useState(centers[0]?.id);
  const [showHazards, setShowHazards] = useState(false);
  const selected = centers.find((c) => c.id === selectedId) ?? centers[0];

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl font-semibold text-foreground">
              Assistance near you
            </h1>
            <p className="mt-3 text-muted-foreground">
              Shelters, supply points, and recovery hubs — with the services they offer right
              now.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center bg-card border border-border rounded-full px-4 py-2 shadow-sm shrink-0">
            <span className="text-xs font-bold text-red-500 animate-pulse">●</span>
            <label htmlFor="hazards-toggle" className="text-xs font-semibold text-muted-foreground uppercase cursor-pointer select-none">
              Show Hazard Alerts
            </label>
            <input
              id="hazards-toggle"
              type="checkbox"
              checked={showHazards}
              onChange={(e) => setShowHazards(e.target.checked)}
              className="size-4 text-brand-500 rounded border-border focus:ring-brand-500 cursor-pointer"
            />
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* List */}
          <div className="lg:col-span-2">
            <ul className="space-y-3" aria-label="Assistance centers">
              {centers.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                      selected?.id === c.id
                        ? "border-accent bg-card ring-1 ring-accent"
                        : "border-border bg-card hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-foreground">{c.name}</h2>
                      <span
                        className={`shrink-0 text-xs font-semibold ${
                          c.is_open ? "text-emerald-600" : "text-muted-foreground"
                        }`}
                      >
                        {c.is_open ? "● Open" : "Closed"}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                      {c.address}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Map + detail */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
              <InteractiveMap
                centers={centers}
                selectedId={selectedId}
                onSelectId={setSelectedId}
                showHazards={showHazards}
                className="h-[300px] w-full rounded-3xl md:h-[440px]"
              />
              {selected && (
                <div className="absolute z-[1000] bottom-4 left-4 right-4 rounded-2xl bg-card/95 p-6 shadow-soft backdrop-blur-sm sm:left-6 sm:right-auto sm:max-w-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                      {selected.region}
                    </span>
                    {selected.is_open && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <Clock className="size-3.5" aria-hidden="true" /> Active now
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-foreground">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selected.address}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="size-4" aria-hidden="true" /> Get Directions
                      </a>
                    </Button>
                    {selected.phone && (
                      <Button variant="outline" size="sm" aria-label="Call center" asChild>
                        <a href={`tel:${selected.phone}`}>
                          <Phone className="size-4" aria-hidden="true" /> Call
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
