import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import ServicesPage from "./pages/ServicesPage";
import AdminPage from "./pages/admin/AdminPage";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-navy-900 text-white">
      <Outlet />
      <Toaster position="top-right" theme="dark" />
    </div>
  ),
});

const mainLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  component: () => (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => mainLayout,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => mainLayout,
  path: "/about",
  component: AboutPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => mainLayout,
  path: "/services",
  component: ServicesPage,
});

const portfolioRoute = createRoute({
  getParentRoute: () => mainLayout,
  path: "/portfolio",
  component: PortfolioPage,
});

const contactRoute = createRoute({
  getParentRoute: () => mainLayout,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  mainLayout.addChildren([
    indexRoute,
    aboutRoute,
    servicesRoute,
    portfolioRoute,
    contactRoute,
  ]),
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
