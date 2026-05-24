import { motion } from "framer-motion";

export function Waveform({ bars = 48, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[3px] h-32 ${className}`} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[4px] rounded-full bg-gradient-primary"
          initial={{ height: 8 }}
          animate={{ height: [8, 20 + Math.random() * 80, 8] }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
