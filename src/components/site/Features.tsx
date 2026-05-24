import { Mic2, Sliders, Headphones, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const features = [
  { icon: Mic2, title: "Enhance Speech", desc: "Remove noise and echo from any recording with a single click.", tag: "Free" },
  { icon: Sliders, title: "Studio", desc: "Record, edit, and transcribe full episodes right in your browser.", tag: "BETA" },
  { icon: Headphones, title: "Mic Check", desc: "AI inspects your mic setup before you hit record — no more bad takes.", tag: "Free" },
];

export function Features() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Core tools</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Three tools. <span className="text-gradient">Infinite possibilities.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <TiltCard>
                <div className="group glass-strong rounded-3xl p-8 h-full hover:shadow-glow transition shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-primary shadow-glow group-hover:scale-110 transition">
                      <f.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/20 text-primary-glow">{f.tag}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground">{f.desc}</p>
                  <a className="mt-6 inline-flex items-center gap-2 text-sm text-primary-glow group-hover:gap-3 transition-all cursor-pointer">
                    Try it free <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
