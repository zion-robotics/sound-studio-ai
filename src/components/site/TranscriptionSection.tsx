import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Users, Wand2, Download } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

type Word = { t: string; speaker: "A" | "B"; filler?: boolean; deleted?: boolean };

const baseScript: Word[] = [
  { t: "So", speaker: "A" },
  { t: "um", speaker: "A", filler: true },
  { t: "today", speaker: "A" },
  { t: "we're", speaker: "A" },
  { t: "talking", speaker: "A" },
  { t: "about", speaker: "A" },
  { t: "AI", speaker: "A" },
  { t: "audio.", speaker: "A" },
  { t: "Yeah,", speaker: "B" },
  { t: "uh", speaker: "B", filler: true },
  { t: "it's", speaker: "B" },
  { t: "honestly", speaker: "B" },
  { t: "kind", speaker: "B" },
  { t: "of", speaker: "B" },
  { t: "magic.", speaker: "B" },
];

const langs = ["English", "Français", "Deutsch", "हिन्दी", "Italiano", "Português", "Español"];

export function TranscriptionSection() {
  const [script, setScript] = useState(baseScript);
  const [langIdx, setLangIdx] = useState(0);

  // auto demo: cycle deleting fillers, then restore
  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step++;
      setScript((s) => {
        if (step % 6 === 0) return baseScript;
        const next = [...s];
        const i = next.findIndex((w) => w.filler && !w.deleted);
        if (i >= 0) next[i] = { ...next[i], deleted: true };
        return next;
      });
    }, 1400);
    const lid = setInterval(() => setLangIdx((i) => (i + 1) % langs.length), 1800);
    return () => {
      clearInterval(id);
      clearInterval(lid);
    };
  }, []);

  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,oklch(0.72_0.22_295/0.22),transparent_60%)]" />
      </ParallaxBg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Transcription · Text-based editing</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Edit audio by <span className="text-gradient">deleting words.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-lg">
            Delete a word in the transcript and the audio (and video) cuts to match. Speaker labels, filler removal, and 7 languages — all automatic.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Languages, label: "7 languages auto-detected" },
              { icon: Users, label: "Speaker diarization" },
              { icon: Wand2, label: "Remove ums & ahs in 1 click" },
              { icon: Download, label: "Export TXT · PDF · DOCX" },
            ].map((p) => (
              <li key={p.label} className="flex items-start gap-3 glass rounded-2xl p-3">
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary/15 text-primary-glow shrink-0">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="text-sm self-center">{p.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">Transcript editor</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={langs[langIdx]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted-foreground"
                  >
                    Language · {langs[langIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-xs text-muted-foreground">2 speakers</span>
            </div>

            <div className="rounded-2xl bg-black/30 p-5 leading-relaxed text-lg">
              <AnimatePresence initial={false}>
                {script.map((w, i) => (
                  <motion.span
                    key={i}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: w.deleted ? 0 : 1,
                      width: w.deleted ? 0 : "auto",
                      marginRight: w.deleted ? 0 : 6,
                    }}
                    transition={{ duration: 0.45 }}
                    className={`inline-block ${
                      w.deleted
                        ? "line-through text-destructive/80"
                        : w.speaker === "A"
                        ? "text-foreground"
                        : "text-primary-glow"
                    }`}
                    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    {w.filler && !w.deleted ? (
                      <span className="bg-destructive/20 text-destructive rounded px-1">{w.t}</span>
                    ) : (
                      w.t
                    )}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center gap-[2px] h-10 rounded-2xl bg-black/30 p-3 overflow-hidden">
              {Array.from({ length: 80 }).map((_, j) => {
                const cut = script.filter((w) => w.deleted).length;
                const visible = j > cut * 4;
                return (
                  <motion.span
                    key={j}
                    className="flex-1 rounded-full bg-gradient-primary"
                    animate={{
                      height: visible ? `${30 + Math.sin(j * 0.5) * 30 + Math.random() * 20}%` : "10%",
                      opacity: visible ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Audio re-cuts in real time</span>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">{script.filter((w) => w.deleted).length} edits</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
