import { useMemo } from "react";
import { motion } from "framer-motion";

export function Particles({ count = 40 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 3,
        d: 6 + Math.random() * 14,
        delay: Math.random() * 5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary-glow/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, filter: "blur(0.5px)" }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
