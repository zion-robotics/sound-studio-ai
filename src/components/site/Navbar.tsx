import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";


export function Navbar({ onAuth }: { onAuth: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggle } = useTheme();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; dropdown?: string[] }[] = [
    { label: "Tools", dropdown: ["Enhance Speech", "Studio", "Mic Check", "AI Voice Coach", "Smart Clip Generator"] },
    { label: "Plans" },
    { label: "Community" },
    { label: "What's New" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition">
            <Mic className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-lg font-semibold tracking-tight">SoundAI</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.label} className="relative group">
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1">
                {l.label}
                {l.dropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition" />}
              </button>
              {l.dropdown && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all">
                  <div className="glass-strong rounded-2xl p-2 min-w-[220px] shadow-card">
                    {l.dropdown.map((d) => (
                      <a key={d} className="block px-3 py-2 text-sm rounded-lg hover:bg-primary/15 hover:text-primary-foreground transition cursor-pointer">
                        {d}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-full glass border border-border hover:border-primary/60 transition"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <button onClick={() => signOut()} className="text-sm text-muted-foreground hover:text-foreground">Log out</button>
              <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-sm font-semibold">
                {(user.email ?? "U")[0].toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <button onClick={onAuth} className="text-sm text-muted-foreground hover:text-foreground">Log in</button>
              <button
                onClick={onAuth}
                className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground hover:scale-105 active:scale-95 transition shadow-glow"
              >
                Get started free
              </button>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="p-2" onClick={() => setOpen((o) => !o)} aria-label="menu">

          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
          </button>
        </div>

      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.label} className="py-2 text-sm">{l.label}</a>
              ))}
              {user ? (
                <Link to="/dashboard" className="py-2 text-sm">Dashboard</Link>
              ) : (
                <button onClick={onAuth} className="mt-2 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium">
                  Get started free
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
