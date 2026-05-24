import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Scroll-linked background layer at 0.5x scroll speed. */
export function ParallaxBg({
  children,
  speed = 0.5,
  className = "",
}: {
  children?: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 50}%`, `${speed * 50}%`]);
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div style={{ y, willChange: "transform" }} className="absolute inset-0">
        {children ?? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.62_0.21_280/0.18),transparent_70%)]" />
        )}
      </motion.div>
    </div>
  );
}

/** Wraps children with a scroll-driven y offset (used for floating cards). */
export function ParallaxLayer({
  children,
  speed = 1,
  range = 80,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const offset = (1 - speed) * range;
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}
