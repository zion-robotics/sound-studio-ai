import { Mic, Wand2, Share2 } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: Mic, title: "Record or upload", desc: "Drop in any audio or video — or hit record directly in the browser." },
  { icon: Wand2, title: "AI enhances", desc: "Our models clean, balance and master your sound in seconds." },
  { icon: Share2, title: "Download & share", desc: "Export, publish, or send straight to your favourite podcast host." },
];

export function HowItWorks() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">How it works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">From raw to ready in <span className="text-gradient">three steps.</span></h2>
        </Reveal>

        <div className="mt-16 relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <div className="text-center">
                <div className="relative mx-auto h-24 w-24 rounded-3xl bg-gradient-primary grid place-items-center shadow-glow">
                  <s.icon className="h-8 w-8 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full glass-strong text-xs font-semibold grid place-items-center">{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
