import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Wand2, Share2 } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: Mic, title: "Record or upload", desc: "Drop in any audio or video — or hit record directly in the browser.", from: { x: -120, y: 0 } },
  { icon: Wand2, title: "AI enhances", desc: "Our models clean, balance and master your sound in seconds.", from: { x: 0, y: 120 } },
  { icon: Share2, title: "Download & share", desc: "Export, publish, or send straight to your favourite podcast host.", from: { x: 120, y: 0 } },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">How it works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From raw to ready in <span className="text-gradient">three steps.</span></h2>
        </Reveal>

        <div ref={ref} className="mt-16 relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-white/5" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: "0% 50%", willChange: "transform" }}
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary via-primary-glow to-primary shadow-glow"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: s.from.x, y: s.from.y }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="relative mx-auto h-24 w-24 rounded-3xl bg-gradient-primary grid place-items-center shadow-glow">
                <s.icon className="h-8 w-8 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full glass-strong text-xs font-semibold grid place-items-center">{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
