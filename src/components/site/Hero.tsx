import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Play, Sparkles } from "lucide-react";
import { Particles } from "./Particles";
import { Waveform } from "./Waveform";
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero({ onCta }: { onCta: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  const useDepth = (d: number) => ({
    x: useTransform(sx, (v) => v * d * 120),
    y: useTransform(sy, (v) => v * d * 120),
  });
  const particleL = useDepth(0.1);
  const headlineL = useDepth(0.15);
  const ctaL = useDepth(0.05);
  const waveL = useDepth(0.3);
  const mockupL = useDepth(0.5);
  const mockupRotX = useTransform(sy, [-1, 1], [10, 2]);
  const mockupRotY = useTransform(sx, [-1, 1], [-10, 10]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 300]);

  function onMove(e: React.MouseEvent) {
    if (isMobile) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background parallax */}
      <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.21 280 / 0.18) 0%, transparent 60%)",
          }}
        />
        <motion.div
          style={{ x: particleL.x, y: particleL.y, willChange: "transform" }}
          className="absolute inset-0"
        >
          <Particles count={40} />
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div>
          <motion.div
            style={{ x: headlineL.x, y: headlineL.y, willChange: "transform" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary-glow" />
              New: AI Voice Coach is live
            </span>

            <h1 className="mt-6 mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Your voice.
              <br />
              <span className="text-gradient">Studio quality.</span>
              <br />
              Instantly.
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              AI-powered audio tools that make every recording sound like it was made in a
              professional studio, right in your browser.
            </p>
          </motion.div>

          <motion.div
            style={{ x: ctaL.x, y: ctaL.y, willChange: "transform" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={onCta}
              className="flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition hover:scale-[1.04] active:scale-[.97]"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onCta}
              className="flex items-center gap-2 rounded-lg glass px-6 py-3 font-medium transition hover:bg-white/10"
            >
              <Play className="h-3.5 w-3.5" /> Enhance a file
            </button>
          </motion.div>

          {/* trust strip with real avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Creator"
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">4.3M+ creators</span> already on board
            </p>
          </motion.div>
        </div>

        {/* Audio workspace mockup */}
        <motion.div
          style={{
            x: mockupL.x,
            y: mockupL.y,
            rotateX: mockupRotX,
            rotateY: mockupRotY,
            transformPerspective: 1500,
            willChange: "transform",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="glass-strong relative rounded-2xl p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="ml-2 text-xs text-muted-foreground">interview_final.wav</span>
            </div>
            <motion.div
              style={{ x: waveL.x, willChange: "transform" }}
              className="mb-3 rounded-xl border border-white/5 bg-black/40 p-5"
            >
              <Waveform bars={40} />
            </motion.div>
            <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>00:02:14</span>
              <span className="text-primary-glow">Enhancing...</span>
              <span>00:24:08</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Remove noise", "Strip echo", "Boost voice"].map((label) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-xs"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
