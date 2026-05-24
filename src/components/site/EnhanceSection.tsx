import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

const points = [
  "Removes background noise instantly",
  "Removes room echo & reverb",
  "Enhances voice clarity and presence",
  "Supports MP3, WAV, M4A & MP4 video",
];

export function EnhanceSection() {
  const [pos, setPos] = useState(50);
  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,oklch(0.62_0.21_280/0.18),transparent_55%)]" />
      </ParallaxBg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Enhance Speech</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Make any recording sound <span className="text-gradient">studio-grade.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-lg">
            Drop in any voice file — Zoom calls, phone memos, raw interviews. Our AI strips noise and echo, then sculpts the voice until it sounds like a pro mic.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid place-items-center h-6 w-6 rounded-full bg-primary/20 text-primary-glow">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-strong rounded-3xl p-6 shadow-card">
            <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground mb-3">
              <span>Before · Noisy</span>
              <span>After · Clean</span>
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden bg-black/40">
              <div className="absolute inset-0 flex items-center gap-[2px] px-4">
                {Array.from({ length: 80 }).map((_, i) => (
                  <span key={i} className="flex-1 bg-muted-foreground/40 rounded-full" style={{ height: `${20 + Math.random() * 70}%` }} />
                ))}
              </div>
              <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
                <div className="absolute inset-0 flex items-center gap-[2px] px-4">
                  {Array.from({ length: 80 }).map((_, i) => {
                    const t = i / 80;
                    const h = 30 + Math.sin(t * Math.PI * 4) * 30 + Math.sin(t * Math.PI * 12) * 15;
                    return (
                      <motion.span
                        key={i}
                        className="flex-1 bg-gradient-primary rounded-full"
                        animate={{ height: [`${h - 5}%`, `${h + 8}%`, `${h - 5}%`] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.02 }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="absolute top-0 bottom-0 w-px bg-primary-glow shadow-glow" style={{ left: `${pos}%` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
                  <span className="text-xs">⇆</span>
                </div>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="w-full mt-4 accent-primary"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">A/B compare</span>
              <span>0:42</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
