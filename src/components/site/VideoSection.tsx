import { motion } from "framer-motion";
import { Film, Captions, Square, Download } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

const points = [
  { icon: Film, label: "Import MP4, MOV, M4V, WEBM" },
  { icon: Square, label: "Edit video by editing the transcript" },
  { icon: Captions, label: "Auto-captions optimised for socials" },
  { icon: Download, label: "Export 1080p / 720p H.264" },
];

export function VideoSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,oklch(0.55_0.2_260/0.3),transparent_55%)]" />
      </ParallaxBg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.05}>
          {/* Audiogram / video preview mockup */}
          <div className="relative">
            <div className="glass-strong rounded-3xl p-5 shadow-card">
              <div
                className="relative aspect-video rounded-2xl overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.62 0.21 280 / 0.5), oklch(0.55 0.2 260 / 0.5)), url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/30" />
                {/* circular waveform audiogram vibe */}
                <div className="absolute inset-0 flex items-end gap-[2px] px-6 pb-6">
                  {Array.from({ length: 60 }).map((_, j) => {
                    const h = 20 + Math.sin(j * 0.4) * 30 + Math.random() * 30;
                    return (
                      <motion.span
                        key={j}
                        className="flex-1 rounded-full bg-gradient-to-t from-primary-glow to-primary"
                        animate={{ height: [`${h}%`, `${h + 20}%`, `${h}%`] }}
                        transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: j * 0.02 }}
                      />
                    );
                  })}
                </div>
                {/* caption */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur text-sm font-semibold tracking-wide"
                >
                  "this is the part that goes viral"
                </motion.div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>audiogram-ep14.mp4 · 1080p · H.264</span>
                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">Theme · Nebula</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Video · Audiograms · Captions</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            One timeline. <span className="text-gradient">Every format.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-lg">
            Cut your video by editing the transcript. Export burned-in captions for Reels, TikTok and Shorts. Generate 1080p audiograms with custom themes in seconds.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <li key={p.label} className="flex items-start gap-3 glass rounded-2xl p-3">
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/15 text-primary-glow shrink-0">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="text-sm self-center">{p.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
