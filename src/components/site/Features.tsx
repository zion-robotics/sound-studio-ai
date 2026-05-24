import { Mic2, Sliders, Headphones, FileText, Video, Music2, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ParallaxBg, ParallaxLayer } from "./ParallaxBg";

const features = [
  { icon: Mic2, title: "Enhance Speech", desc: "Strip noise and echo. Voice instantly sounds like a $5k mic in a treated room.", tag: "Free" },
  { icon: Sliders, title: "Studio Recording", desc: "Record solo or with remote guests via link. Each speaker on its own 48kHz track.", tag: "BETA" },
  { icon: FileText, title: "Transcription & Editing", desc: "Edit audio by deleting words. 7 languages, speaker labels, filler-word removal.", tag: "AI" },
  { icon: Headphones, title: "Mic Check", desc: "AI inspects your mic, room and gain in 10 seconds before you hit record.", tag: "Free" },
  { icon: Video, title: "Video Support", desc: "Import MP4 / MOV / WEBM up to 4K. Edit video by editing the transcript.", tag: "New" },
  { icon: Music2, title: "Audiograms & Captions", desc: "Auto-captions for socials and gorgeous 1080p audiograms with custom themes.", tag: "New" },
];

export function Features() {
  return (
    <section className="relative py-28">
      <ParallaxBg speed={0.5} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">The toolkit</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Six tools. <span className="text-gradient">One workflow.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Everything Adobe Podcast does — and the things they still haven't shipped.</p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {features.map((f, i) => {
            // alternate floating depth across the grid
            const speed = [1, 0.95, 0.9, 0.95, 1, 0.9][i] ?? 1;
            return (
              <ParallaxLayer key={f.title} speed={speed} range={60}>
                <Reveal delay={(i % 3) * 0.08}>
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
              </ParallaxLayer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
