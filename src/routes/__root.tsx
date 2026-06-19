import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { UssdSimulator } from "../components/UssdSimulator";

import appCss from "../styles.css?url";
import { ThemeProvider } from "../hooks/use-theme";
import { AuthProvider } from "../hooks/use-auth";
import { Toaster } from "../components/ui/sonner";
import { DemoPanel } from "../components/DemoPanel";
import { NotificationToast } from "../components/NotificationToast";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HopeBridge — Recover After Disaster, Together" },
      {
        name: "description",
        content:
          "Find verified aid, financial grants, recovery resources, and community support after floods, earthquakes, storms, and other disasters — all in one place.",
      },
      { name: "author", content: "HopeBridge" },
      { property: "og:title", content: "HopeBridge" },
      {
        property: "og:description",
        content:
          "Connecting disaster-affected families with verified aid, community support, and the resources needed to rebuild.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouterState();
  const isNavigating = routerState.status === "pending";
  const [isUssdOpen, setIsUssdOpen] = useState(false);

  useEffect(() => {
    const handleOpenUssd = () => setIsUssdOpen(true);
    window.addEventListener("demo:open-ussd", handleOpenUssd);
    return () => window.removeEventListener("demo:open-ussd", handleOpenUssd);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {isNavigating && (
            <div 
              className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[9999] animate-pulse" 
              style={{
                boxShadow: "0 1px 8px var(--accent)",
              }}
              role="progressbar"
              aria-label="Loading page"
            />
          )}
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
          <Toaster position="top-center" />
          <NotificationToast />
          <DemoPanel />

          {/* Centered global USSD Phone simulator with blurred background */}
          {isUssdOpen && (
            <div 
              onClick={() => setIsUssdOpen(false)}
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="relative animate-in zoom-in-95 duration-200 cursor-default"
              >
                <UssdSimulator onClose={() => setIsUssdOpen(false)} />
              </div>
            </div>
          )}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
