import { Mic, Twitter, Github, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary shadow-glow">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-lg font-semibold">SoundAI</span>
          </div>
          <p className="mt-4 text-muted-foreground max-w-sm">
            Built with AI. Made for creators. Studio-quality audio in your browser, no plugin chain required.
          </p>
          <div className="mt-6 flex gap-3">
            {[Twitter, Github, Youtube, Instagram].map((Icon, i) => (
              <a key={i} className="h-9 w-9 rounded-full glass grid place-items-center hover:text-primary-glow hover:border-primary/40 transition cursor-pointer">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { h: "Product", l: ["Enhance Speech", "Studio", "Mic Check", "Voice Coach"] },
          { h: "Company", l: ["About", "Careers", "Press", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="text-sm font-semibold mb-4">{col.h}</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {col.l.map((x) => <li key={x} className="hover:text-foreground cursor-pointer transition">{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SoundAI. All rights reserved.
      </div>
    </footer>
  );
}
