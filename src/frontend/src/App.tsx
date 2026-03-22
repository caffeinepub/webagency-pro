import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/HomePage";
import WatchPage from "@/pages/WatchPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

// ─── Layout ──────────────────────────────────────────────────────────────────
function Layout() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("vsi-theme");
    return stored ? stored === "dark" : true;
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    localStorage.setItem("vsi-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleToggleTheme = useCallback(() => setIsDark((p) => !p), []);
  const handleSearchChange = useCallback((q: string) => setSearchQuery(q), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
}

// ─── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (s: Record<string, unknown>) => ({
    q: (s.q as string) ?? "",
  }),
  component: function HomeWrapper() {
    const { q } = homeRoute.useSearch();
    return <HomePage searchQuery={q ?? ""} />;
  },
});

const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch",
  validateSearch: (s: Record<string, unknown>) => ({
    v: (s.v as string) ?? "v1",
  }),
  component: WatchPage,
});

const routeTree = rootRoute.addChildren([homeRoute, watchRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
