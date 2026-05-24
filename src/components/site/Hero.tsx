import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown, Sparkles, Upload } from "lucide-react";
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

  // mouse-driven depth layers
  const depth = (d: number) => ({
    x: useTransform(sx, (v) => v * d * 40),
    y: useTransform(sy, (v) => v * d * 40),
  });
  const particleL = depth(0.1);
  const headlineL = depth(0.15);
  const ctaL = depth(0.05);
  const waveL = depth(0.3);
  const mockupL = depth(0.5);
  const mockupRotX = useTransform(sy, [-1, 1], [12, 4]);
  const mockupRotY = useTransform(sx, [-1, 1], [-8, 8]);

  // scroll parallax bg
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 400]);

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
      className="relative pt-32 pb-24 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY, willChange: "transform" }}
        className="absolute inset-0 -z-10"
      >
        <motion.div style={{ x: particleL.x, y: particleL.y, willChange: "transform" }} className="absolute inset-0">
          <Particles count={50} />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.21_280/0.35),transparent_60%)] pointer-events-none" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-wider"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
          Next-gen AI audio studio
        </motion.div>

        <motion.h1
          style={{ x: headlineL.x, y: headlineL.y, willChange: "transform" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          Your Voice. <span className="text-gradient">Studio Quality.</span>
          <br />Instantly.
        </motion.h1>

        <motion.p
          style={{ x: headlineL.x, y: headlineL.y, willChange: "transform" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Record, enhance, transcribe, edit by text, and export — studio-grade audio and video, all in your browser.
        </motion.p>

        <motion.div
          style={{ x: ctaL.x, y: ctaL.y, willChange: "transform" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onCta}
            className="pulse-glow px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:scale-105 active:scale-95 transition shadow-glow"
          >
            Get started free
          </button>
          <button className="px-7 py-3.5 rounded-full glass border border-white/15 hover:border-primary/60 transition flex items-center justify-center gap-2">
            <Upload className="h-4 w-4" /> Enhance a file
          </button>
        </motion.div>

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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative mx-auto max-w-4xl"
        >
          <div className="glass-strong rounded-3xl p-8 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="text-xs text-muted-foreground">interview-take-3.wav · enhancing</span>
            </div>
            <motion.div style={{ x: waveL.x, willChange: "transform" }}>
              <Waveform bars={56} />
            </motion.div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>00:02:14</span>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow">Noise removed · +12dB clarity</span>
              <span>00:18:42</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 text-muted-foreground flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
