import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, Info, X, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { reliefUpdatesQuery } from "@/lib/data";

const DISMISS_KEY = "hopebridge_banner_dismissed_v2";
const ROTATION_INTERVAL = 7000; // ms between rotations

function getRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 2) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getAlertAction(update: { severity: string; title: string; region: string }): {
  label: string;
  to: "/map" | "/funding" | "/resources" | "/community";
} {
  const t = update.title.toLowerCase();
  if (t.includes("grant") || t.includes("cash") || t.includes("transfer") || t.includes("msme")) {
    return { label: "View funding", to: "/funding" };
  }
  if (update.severity === "high") {
    return { label: "View map", to: "/map" };
  }
  if (t.includes("guide") || t.includes("iron") || t.includes("distribution")) {
    return { label: "View resources", to: "/resources" };
  }
  return { label: "See updates", to: "/resources" };
}

export function EmergencyBanner() {
  const { data: updates } = useQuery(reliefUpdatesQuery());
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  // Only show high + medium severity items in the banner
  const alerts = updates?.filter((u) => u.severity === "high" || u.severity === "medium") ?? [];

  // Read dismiss from sessionStorage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "true") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage may be blocked in some environments
    }
  }, []);

  // Auto-rotate through alerts
  useEffect(() => {
    if (alerts.length <= 1 || paused) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % alerts.length);
        setVisible(true);
      }, 250);
    }, ROTATION_INTERVAL);
    return () => clearInterval(id);
  }, [alerts.length, paused]);

  if (dismissed || alerts.length === 0) return null;

  const current = alerts[activeIndex];
  const isHigh = current.severity === "high";
  const action = getAlertAction(current);
  const relTime = getRelativeTime(current.created_at);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
  }

  function navigate(dir: 1 | -1) {
    setVisible(false);
    setTimeout(() => {
      setActiveIndex((i) => (i + dir + alerts.length) % alerts.length);
      setVisible(true);
    }, 150);
    setPaused(true);
  }

  return (
    <div
      className={`relative flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-medium transition-all ${
        isHigh
          ? "bg-red-600 text-white"
          : "bg-amber-500 text-white"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left: icon + pulsing dot */}
      <div className="flex shrink-0 items-center gap-2">
        {isHigh ? (
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
        ) : (
          <Radio className="size-3.5 shrink-0" aria-hidden="true" />
        )}
        <span className="hidden font-bold uppercase tracking-widest text-[10px] opacity-80 sm:inline">
          {isHigh ? "Emergency" : "Update"}
        </span>
      </div>

      {/* Centre: alert text */}
      <div
        className={`flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {isHigh ? (
            <AlertTriangle className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Info className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          <span className="font-semibold">{current.title}</span>
        </span>

        <span className="hidden text-white/70 sm:inline">•</span>
        <span className="hidden text-white/80 sm:inline">{current.region}</span>
        <span className="hidden text-white/70 sm:inline">•</span>
        <span className="hidden text-white/70 sm:inline">{relTime}</span>

        <Link
          to={action.to}
          className="ml-1 underline underline-offset-2 hover:no-underline font-semibold"
        >
          {action.label} →
        </Link>
      </div>

      {/* Right: navigation + dismiss */}
      <div className="flex shrink-0 items-center gap-1">
        {alerts.length > 1 && (
          <>
            <span className="hidden text-white/70 text-[10px] sm:inline">
              {activeIndex + 1}/{alerts.length}
            </span>
            <button
              onClick={() => navigate(-1)}
              className="rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Previous alert"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Next alert"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </>
        )}
        <button
          onClick={handleDismiss}
          className="ml-1 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss alerts"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
