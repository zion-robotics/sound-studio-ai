import { motion } from "framer-motion";
import { Users, Link2, FileVideo, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

const tracks = [
  { name: "You · Host", color: "from-primary to-primary-glow" },
  { name: "Maya · Remote guest", color: "from-fuchsia-400 to-primary-glow" },
  { name: "Jordan · Remote guest", color: "from-cyan-400 to-primary" },
];

const points = [
  { icon: Users, label: "Record solo or invite remote guests" },
  { icon: Link2, label: "Guests join via link — no download, no account" },
  { icon: FileVideo, label: "Each speaker on a separate 16-bit / 48kHz WAV track" },
];

export function StudioSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,oklch(0.62_0.21_280/0.22),transparent_60%)]" />
      </ParallaxBg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.05}>
          {/* Studio mockup */}
          <div className="glass-strong rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-medium">REC</span>
                <span className="text-muted-foreground">· episode-014.session</span>
              </div>
              <span className="text-xs text-muted-foreground">00:12:48 · 48kHz · WAV</span>
            </div>
            <div className="space-y-3">
              {tracks.map((t, i) => (
                <div key={t.name} className="rounded-2xl bg-black/30 p-3">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span>{t.name}</span>
                    <span className="text-muted-foreground">−6dB</span>
                  </div>
                  <div className="flex items-center gap-[2px] h-10">
                    {Array.from({ length: 60 }).map((_, j) => {
                      const h = 20 + Math.sin((j + i * 7) * 0.6) * 30 + Math.random() * 30;
                      return (
                        <motion.span
                          key={j}
                          className={`flex-1 rounded-full bg-gradient-to-t ${t.color}`}
                          animate={{ height: [`${h - 10}%`, `${h + 15}%`, `${h - 10}%`] }}
                          transition={{ duration: 1 + (i * 0.2), repeat: Infinity, delay: j * 0.02 + i * 0.1 }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>3 tracks · 1.2 GB</span>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">Cloud sync · Live</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Studio</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Browser studio. <span className="text-gradient">Real-mic quality.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-lg">
            Record full episodes solo or with remote co-hosts. Local 48kHz capture per speaker, automatic backup, no plugins to install.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.label} className="flex items-start gap-3">
                <span className="mt-0.5 grid place-items-center h-9 w-9 rounded-xl bg-primary/15 text-primary-glow shrink-0">
                  <p.icon className="h-4 w-4" />
                </span>
                <span>{p.label}</span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid place-items-center h-9 w-9 rounded-xl bg-primary/15 text-primary-glow shrink-0">
                <Check className="h-4 w-4" />
              </span>
              <span>Audio files up to 5GB · Video up to 4K (MP4, MOV, M4V, WEBM)</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
