import { motion } from "framer-motion";
import { Play, Music2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

const tracks = [
  { title: "Neon Drift", mood: "Cinematic · Intro", time: "0:42" },
  { title: "Soft Pulse", mood: "Lo-fi · Background", time: "2:14" },
  { title: "Skyline Walk", mood: "Upbeat · Transition", time: "0:18" },
  { title: "Quiet Embers", mood: "Ambient · Outro", time: "1:05" },
];

export function MusicSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,oklch(0.72_0.22_295/0.2),transparent_55%)]" />
      </ParallaxBg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Music library</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Royalty-free score. <span className="text-gradient">Built in.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-lg">
            A curated library of intros, outros, transitions and bed music — fully cleared for podcasts, YouTube and socials. Drag, drop, done.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Intros", "Outros", "Transitions", "Beds", "Cinematic", "Lo-fi", "Upbeat"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full glass text-sm">{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music2 className="h-4 w-4 text-primary-glow" />
                <span className="text-sm font-medium">Browse music</span>
              </div>
              <span className="text-xs text-muted-foreground">412 tracks · royalty-free</span>
            </div>
            <ul className="space-y-2">
              {tracks.map((t, i) => (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-2xl bg-black/30 hover:bg-primary/10 transition p-3 group cursor-pointer"
                >
                  <button className="grid place-items-center h-10 w-10 rounded-full bg-gradient-primary shadow-glow group-hover:scale-110 transition">
                    <Play className="h-4 w-4 text-primary-foreground" fill="currentColor" />
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.mood}</div>
                  </div>
                  <div className="flex items-center gap-[2px] h-6 w-24">
                    {Array.from({ length: 24 }).map((_, j) => {
                      const h = 20 + Math.sin((j + i) * 0.7) * 40 + Math.random() * 20;
                      return (
                        <motion.span
                          key={j}
                          className="flex-1 rounded-full bg-primary-glow/70"
                          animate={{ height: [`${h - 10}%`, `${h + 15}%`, `${h - 10}%`] }}
                          transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: j * 0.03 }}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">{t.time}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
