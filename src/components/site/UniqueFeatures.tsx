import { Bot, Globe2, BarChart3, Scissors, Music4 } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Bot, title: "AI Voice Coach", desc: "Real-time feedback on pace, clarity, and filler words while you record." },
  { icon: Globe2, title: "Auto Translate & Dub", desc: "Translate and dub your podcast into 20+ languages with one click." },
  { icon: BarChart3, title: "Podcast Analytics", desc: "Track listens, audience location, and per-episode performance." },
  { icon: Scissors, title: "Smart Clip Generator", desc: "AI picks the best 60-second clips for TikTok, Reels, and Shorts." },
  { icon: Music4, title: "AI Music Composer", desc: "Generate royalty-free background music that matches your episode mood." },
];

export function UniqueFeatures() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Beyond the basics</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Everything Adobe Podcast has. <br />
            <span className="text-gradient">Plus everything they don't.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Five additional AI-powered tools built for creators who want to ship faster, sound better, and grow louder.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <div className="glass rounded-3xl p-7 h-full hover:bg-primary/10 hover:border-primary/40 transition group cursor-pointer">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary/15 text-primary-glow group-hover:bg-gradient-primary group-hover:text-primary-foreground transition">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
