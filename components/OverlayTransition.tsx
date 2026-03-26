"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function OverlayTransition() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress: activeProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Animation mapping: Expand to 0.95 to ensure it reaches full screen 
  // and stays there for a moment before the section un-sticks.
  const y = useTransform(activeProgress, [0.1, 0.55], ["100%", "0%"], { clamp: true });
  const scale = useTransform(activeProgress, [0.1, 0.55], [0.98, 1], { clamp: true });
  const opacity = useTransform(activeProgress, [0.1, 0.55], [0.9, 1], { clamp: true });

  // Smooth springs for premium feel
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={targetRef} className="relative h-[1200vh] w-full bg-black z-30">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Guard for hydration */}
        {!mounted && <div className="absolute inset-0 bg-black z-[100]" />}

        {/* Mobile View */}
        <div className="md:hidden h-full w-full bg-white" />

        {/* Desktop View (Rising Overlay) */}
        <motion.div
          style={{ 
            y: smoothY,
            scale: smoothScale,
            opacity: smoothOpacity
          }}
          className="hidden md:block absolute top-0 left-0 w-full h-[105vh] bg-white will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>
    </section>
  );
}


