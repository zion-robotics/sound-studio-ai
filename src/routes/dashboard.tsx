import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mic2, Sliders, Headphones, Bot, Scissors, Music4, Globe2, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Waveform } from "@/components/site/Waveform";
import { AuthModal } from "@/components/site/AuthModal";
import { ChatWidget } from "@/components/site/ChatWidget";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const tools = [
  { icon: Mic2, name: "Enhance Speech", desc: "Clean any recording" },
  { icon: Sliders, name: "Studio", desc: "Record & edit in browser" },
  { icon: Headphones, name: "Mic Check", desc: "Test your setup" },
  { icon: Bot, name: "Voice Coach", desc: "Real-time feedback" },
  { icon: Scissors, name: "Smart Clips", desc: "Auto social cuts" },
  { icon: Music4, name: "Music Composer", desc: "AI background tracks" },
  { icon: Globe2, name: "Auto Dub", desc: "20+ languages" },
  { icon: BarChart3, name: "Analytics", desc: "Audience insights" },
];

function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "creator";

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 glass-strong sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="font-semibold">SoundAI Studio</a>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <button onClick={() => signOut()} className="p-2 rounded-full glass hover:border-primary/40 transition" aria-label="sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, <span className="text-gradient">{name}</span>.
          </h1>
          <p className="mt-2 text-muted-foreground">Pick a tool below to start a new session.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 glass-strong rounded-3xl p-8 shadow-card"
        >
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Live preview</span>
            <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow text-xs">Ready to record</span>
          </div>
          <Waveform bars={64} />
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="text-left glass rounded-2xl p-5 hover:bg-primary/10 hover:border-primary/40 transition group"
            >
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary/15 text-primary-glow group-hover:bg-gradient-primary group-hover:text-primary-foreground transition">
                <t.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
            </motion.button>
          ))}
        </div>
      </main>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <ChatWidget onRequireAuth={() => setAuthOpen(true)} />
    </div>
  );
}
