import { Reveal } from "./Reveal";

const testimonials = [
  {
    name: "Maya Okafor",
    role: "Host, The Long Cut",
    quote: "I cut my edit time in half. The enhancement is genuinely indistinguishable from a real studio booth.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Daniel Reyes",
    role: "Indie podcaster",
    quote: "The smart clip generator gave me three viral TikToks last week. This is the unfair advantage.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Priya Shankar",
    role: "Audio producer, Verve FM",
    quote: "Auto-dub into Hindi and Spanish opened up an audience I'd been trying to reach for two years.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
];


export function SocialProof() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient">4.36 million+</span> creators
            <br />trust AI audio tools.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div className="glass-strong rounded-3xl p-8 h-full shadow-card">
                <div className="text-5xl text-primary-glow leading-none">"</div>
                <p className="mt-2 text-foreground/90">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover border border-border"
                  />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>

            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
