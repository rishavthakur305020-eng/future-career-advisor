import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-transparent border-b border-white/60 dark:border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[hsl(258_90%_66%)] to-[hsl(190_95%_40%)] grid place-items-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Future Career Advisor
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="/#features"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="/#advisor"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Advisor
            </a>
            <Link
              to="/community"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <a href="/#advisor" className="hidden sm:inline-flex">
              <Button className="shadow-[0_0_0_1px_hsl(var(--ring)/.2),0_8px_30px_hsl(258_90%_66%/.25)]">
                Get started
              </Button>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/60 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="container px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[hsl(258_90%_66%)] to-[hsl(190_95%_40%)] grid place-items-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">
                Future Career Advisor
              </span>
            </Link>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Future Career Advisor. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LanguageSelect() {
  const [lang, setLang] = useState<string>(
    () => localStorage.getItem("lang") || "en",
  );
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <select
      aria-label="Language"
      className="h-9 rounded-md border border-slate-200/70 bg-white/60 px-2 text-sm dark:border-white/10 dark:bg-white/10"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="hi">HI</option>
    </select>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200/70 bg-white/60 px-3 text-sm shadow-sm transition hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
    >
      {dark ? "Dark" : "Light"}
    </button>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portal/:type" element={<Placeholder />} />
            <Route path="/resume" element={<Placeholder />} />
            <Route path="/mock-interview" element={<Placeholder />} />
            <Route path="/ar-vr" element={<Placeholder />} />
            <Route path="/wellbeing" element={<Placeholder />} />
            <Route path="/colleges" element={<Placeholder />} />
            <Route path="/community" element={<Placeholder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

declare global {
  interface Window {
    __appRoot?: Root;
  }
}

const root = window.__appRoot ?? createRoot(container);
window.__appRoot = root;
root.render(<App />);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.__appRoot?.unmount();
    delete window.__appRoot;
  });
}
