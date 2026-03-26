"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop transforms
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [1, 2]);
  
  // Opacity for content
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const finalContentOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // We must always render the element that containerRef is attached to 
  // to avoid the "Target ref is defined but not hydrated" error from Framer Motion.
  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loader/Skeleton state during hydration */}
        {!mounted && <div className="absolute inset-0 bg-black z-[100]" />}

        {/* Desktop View (Standard) */}
        <div className="hidden md:flex h-full w-full">
          {/* Left Panel - White */}
          <motion.div
            style={{ x: translateX }}
            className="relative w-1/2 h-full bg-white z-10 will-change-transform flex items-center justify-center"
          >
             <motion.div style={{ opacity }} className="text-black/10 text-xs tracking-[2em] uppercase -rotate-90 whitespace-nowrap">
              Scroll Down
            </motion.div>
          </motion.div>

          {/* Right Panel - Black */}
          <motion.div
            style={{ 
              scaleX: scaleX,
              transformOrigin: "left"
            }}
            className="relative w-1/2 h-full bg-black z-20 will-change-transform flex items-center"
          >
            {/* Initial Center Content (Fades out) */}
            <motion.div 
              style={{ opacity }}
              className="absolute left-0 w-full flex flex-col gap-4 pl-24"
            >
              <h1 className="text-white text-7xl font-extralight tracking-tighter">
              <span className="font-medium"></span>
              </h1>
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
              
              </p>
            </motion.div>

            {/* Final "Takeover" Content (Fades in at the end) */}
            <motion.div 
               style={{ opacity: finalContentOpacity }}
               className="absolute inset-0 flex flex-col items-center justify-center text-center p-24"
            >
               <h2 className="text-white text-5xl font-extralight tracking-tight max-w-2xl leading-tight">
                  Crafting minimal interfaces for <span className="italic font-serif">extraordinary</span> brands.
               </h2>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Hero (Fallback) */}
        <div className="md:hidden h-full w-full bg-black flex items-center justify-center p-8">
          <div className="flex flex-col gap-4 text-center">
             <h1 className="text-white text-4xl font-extralight tracking-tighter">
                Nizam <span className="font-medium">Portfolio</span>
              </h1>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
                Digital Experience Designer
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}


