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

  const depth = (d: number) => ({
    x: useTransform(sx, (v) => v * d * 40),
    y: useTransform(sy, (v) => v * d * 40),
  });
  const particleL = depth(0.1);
  const headlineL = depth(0.15);
  const ctaL = depth(0.05);
  const waveL = depth(0.3);
  const mockupL = depth(0.5);
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
      className="relative pt-32 pb-24 overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0 -z-10">
        <motion.div style={{ x: particleL.x, y: particleL.y, willChange: "transform" }} className="absolute inset-0">
          <Particles count={40} />
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT — text content */}
        <div>
          <motion.div
            style={{ x: headlineL.x, y: headlineL.y, willChange: "transform" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
              Next-gen AI audio studio
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Your Voice. <span className="text-gradient">Studio Quality.</span>
              <br />Instantly.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Record, enhance, transcribe, edit by text, and export — studio-grade audio and video, all in your browser.
            </p>
          </motion.div>

          <motion.div
            style={{ x: ctaL.x, y: ctaL.y, willChange: "transform" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={onCta}
              className="pulse-glow px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:scale-105 active:scale-95 transition shadow-glow"
            >
              Get started free
            </button>
            <button className="px-7 py-3.5 rounded-full glass border border-border hover:border-primary/60 transition flex items-center justify-center gap-2">
              <Upload className="h-4 w-4" /> Enhance a file
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
                <img key={i} src={src} alt="Creator" loading="lazy" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">4.3M+ creators</span> already on board
            </p>
          </motion.div>
        </div>

        {/* RIGHT — mockup */}
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
          {/* Real studio photo behind */}
          <div className="absolute -top-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden shadow-card hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop"
              alt="Studio microphone"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-card relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="text-xs text-muted-foreground">interview-take-3.wav · enhancing</span>
            </div>
            <motion.div style={{ x: waveL.x, willChange: "transform" }}>
              <Waveform bars={48} />
            </motion.div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground gap-2">
              <span>00:02:14</span>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary-glow whitespace-nowrap">+12dB clarity</span>
              <span>00:18:42</span>
            </div>
          </div>

          {/* Floating headphones photo */}
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-2xl overflow-hidden shadow-card hidden md:block float">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
              alt="Headphones"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-16 text-muted-foreground flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}
