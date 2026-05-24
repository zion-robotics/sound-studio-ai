import { useState } from "react";
import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { ParallaxBg } from "./ParallaxBg";

const freePerks = [
  "1 hour enhance per day",
  "Basic studio recording",
  "Mic Check tool",
  "Transcription (limited minutes)",
  "Audiograms (watermarked)",
  "MP3 export",
];

const proPerks = [
  "Unlimited enhance · up to 4hr / day",
  "Files up to 1GB · video support up to 4K",
  "Bulk upload & batch processing",
  "Audiograms — no watermark, custom themes",
  "Transcript export (TXT / PDF / DOCX)",
  "Speaker-separated track download",
  "Royalty-free music library",
  "All 7 transcription languages",
  "Auto-dub into 20+ languages",
  "Priority support",
];

export function Pricing({ onStart }: { onStart: () => void }) {
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 9.6 : 12;

  return (
    <section className="relative py-28 overflow-hidden">
      <ParallaxBg speed={0.5} />
      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary-glow mb-4">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Start free. <span className="text-gradient">Grow unlimited.</span></h2>

          <div className="mt-8 inline-flex glass rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 text-sm rounded-full transition ${!yearly ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 text-sm rounded-full transition flex items-center gap-2 ${yearly ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Yearly <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary-foreground/20">-20%</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 h-full shadow-card">
              <div className="text-sm uppercase tracking-wider text-muted-foreground">Free</div>
              <div className="mt-4 text-5xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <p className="mt-2 text-muted-foreground">For trying things out.</p>
              <ul className="mt-8 space-y-3 text-sm">
                {freePerks.map((p) => (
                  <li key={p} className="flex gap-2"><Check className="h-4 w-4 text-primary-glow mt-0.5 shrink-0" />{p}</li>
                ))}
                <li className="flex gap-2 text-muted-foreground"><X className="h-4 w-4 mt-0.5 shrink-0" />No video editing or 4K support</li>
                <li className="flex gap-2 text-muted-foreground"><X className="h-4 w-4 mt-0.5 shrink-0" />No bulk upload</li>
              </ul>
              <button onClick={onStart} className="mt-8 w-full py-3 rounded-full glass border border-white/15 hover:border-primary/60 transition">
                Start free
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative glass-strong rounded-3xl p-8 h-full border-2 border-primary/60 shadow-glow">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-gradient-primary text-primary-foreground font-semibold">
                Most Popular
              </span>
              <div className="text-sm uppercase tracking-wider text-primary-glow">Premium</div>
              <div className="mt-4 text-5xl font-bold">${price.toFixed(yearly ? 2 : 0)}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <p className="mt-2 text-muted-foreground">Everything, unlimited.</p>
              <ul className="mt-8 space-y-3 text-sm">
                {proPerks.map((p) => (
                  <li key={p} className="flex gap-2"><Check className="h-4 w-4 text-primary-glow mt-0.5 shrink-0" />{p}</li>
                ))}
              </ul>
              <button onClick={onStart} className="mt-8 w-full py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:scale-[1.02] active:scale-[0.98] transition shadow-glow">
                Go Premium
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
