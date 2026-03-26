"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const technologies = [
  { id: "01", title: "iTero Impressions", description: "Precision 3D digital impressions without the mess.", image: "/images/technology/tech-1.png" },
  { id: "02", title: "Solea Laser", description: "Needle-free, drill-free, virtually painless procedures.", image: "/images/technology/tech-2.png" },
  { id: "03", title: "Intra Oral Camera", description: "See what we see with crystal-clear visual clarity.", image: "/images/technology/tech-3.png" },
  { id: "04", title: "Digital Imaging", description: "Advanced diagnostic capability with minimal radiation.", image: "/images/technology/tech-4.png" },
  { id: "05", title: "CAD/CAM Restorations", description: "Same-day custom ceramic crowns and restorations.", image: "/images/technology/tech-5.png" },
  { id: "06", title: "3D CAT Scan", description: "Comprehensive 3D views for precise surgical planning.", image: "/images/technology/tech-6.png" }
];

export default function TechnologyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="bg-[#f5f5f5]">
      {/* Editorial Heading (Static) */}
      <div className="pt-48 pb-32 flex flex-col items-center justify-center px-12 md:px-24">
        <div className="flex flex-col items-center max-w-7xl w-full">
          <div className="w-full text-center mb-[-0.2em]">
             <h1 className="text-6xl md:text-9xl font-extralight tracking-tight font-serif uppercase leading-none text-black">
                Technology-Driven
             </h1>
          </div>
          
          <div className="w-full flex justify-between items-baseline md:px-20 mb-[-0.1em]">
             <span className="text-black text-6xl md:text-9xl font-extralight tracking-tight font-serif leading-none">
                Dentistry
             </span>
             <span className="text-black text-5xl md:text-8xl font-light tracking-tight font-serif italic leading-none ml-12">
                for Exceptional
             </span>
          </div>

          <div className="w-full text-center mt-[-0.1em]">
             <span className="text-black text-7xl md:text-[10rem] font-extralight tracking-tight font-serif leading-none">
                Results
             </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Section (1200vh for 6 items) */}

      <div ref={containerRef} className="relative md:h-[1200vh] w-full bg-[#f5f5f5]">
        
        {/* MOBILE VIEW */}
        <div className="md:hidden flex flex-col px-8 space-y-24 pb-32">
          {technologies.map((tech, index) => (
             <div key={index} className="flex flex-col border-b border-zinc-200 pb-12">
               <div className="aspect-square relative w-full mb-8 bg-black">
                 <Image src={tech.image} alt={tech.title} fill className="object-cover" />
               </div>
               <span className="text-zinc-400 text-xs mb-4">{tech.id} / 06</span>
               <h3 className="text-2xl font-serif mb-4 italic">{tech.title}</h3>
               <p className="text-zinc-500 text-sm leading-relaxed mb-6">{tech.description}</p>
               <span className="text-xs uppercase tracking-widest underline decoration-zinc-300 underline-offset-4">Learn More</span>
             </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Three-column layout [Counter] [Image] [List] */}
        <div className="hidden md:flex sticky top-0 h-screen w-full flex-row overflow-hidden px-12 md:px-24 items-center">
          
          {/* 1. COUNTER COLUMN (LEFT) */}
          <div className="w-[15%] flex justify-start">
             <TechCounter progress={scrollYProgress} />
          </div>

          {/* 2. IMAGE COLUMN (CENTER) */}
          <div className="w-[45%] flex items-center justify-center px-12">
             <div className="relative w-full max-w-[500px] aspect-square bg-black shadow-2xl overflow-hidden will-change-transform">
                {technologies.map((tech, index) => (
                    <TechImage key={index} src={tech.image} index={index} progress={scrollYProgress} />
                ))}
             </div>
          </div>

          {/* 3. LIST COLUMN (RIGHT) */}
          <div className="w-[40%] flex flex-col justify-center gap-0">
             <div className="mb-12">
                <span className="text-zinc-400 text-[10px] tracking-[0.6em] uppercase font-medium">Technology</span>
             </div>
             <div className="flex flex-col border-t border-zinc-200/60">
                {technologies.map((tech, index) => (
                    <TechListItem 
                      key={index}
                      tech={tech}
                      index={index}
                      progress={scrollYProgress}
                    />
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TechImage({ src, index, progress }: { src: string, index: number, progress: any }) {
  const step = 1 / 6;
  const start = index * step;
  const end = (index + 1) * step;

  const triggerIn = Math.max(0, start - 0.05);
  const triggerOut = Math.min(1, end + 0.05);

  const y = useTransform(progress, [triggerIn, start, end, triggerOut], ["100%", "0%", "0%", "-100%"]);
  const opacity = useTransform(progress, [triggerIn, start, end, triggerOut], [0, 1, 1, 0]);
  const smoothY = useSpring(y, { stiffness: 90, damping: 25 });

  return (
    <motion.div style={{ y: smoothY, opacity }} className="absolute inset-0">
      <Image src={src} alt="tech" fill className="object-cover" />
    </motion.div>
  );
}

function TechListItem({ tech, index, progress }: { tech: any, index: number, progress: any }) {
  const step = 1 / 6;
  const start = index * step;
  const end = (index + 1) * step;

  const triggerIn = Math.max(0, start - 0.05);
  const triggerOut = Math.min(1, end + 0.05);

  const isActive = useTransform(progress, [triggerIn, start, end, triggerOut], [0, 1, 1, 0]);
  const color = useTransform(progress, [triggerIn, start, end, triggerOut], ["#d4d4d8", "#000000", "#000000", "#d4d4d8"]);
  const scale = useTransform(progress, [triggerIn, start, end, triggerOut], [1, 1.05, 1.05, 1]);


  return (
    <motion.div style={{ color }} className="group relative py-8 border-b border-zinc-200/60 flex items-center justify-between">
       <div className="flex flex-col gap-1 transition-transform duration-500 ease-out group-hover:translate-x-2">
           <motion.h3 style={{ scale }} className="text-3xl lg:text-5xl font-serif italic tracking-tight origin-left">
              {tech.title}
           </motion.h3>
       </div>
       <motion.span 
          style={{ opacity: isActive }}
          className="text-[10px] uppercase tracking-widest text-zinc-900 border-b border-black/40 pb-0.5"
       >
          Learn More
       </motion.span>
    </motion.div>
  );
}

function TechCounter({ progress }: { progress: any }) {
  const count = useTransform(progress, [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1], [1, 1, 2, 3, 4, 5, 6]);
  
  return (
    <div className="flex items-center gap-6">
       <div className="flex flex-col items-center justify-center relative w-12 h-16 overflow-hidden">
          {[1,2,3,4,5,6].map((num) => (
             <motion.span 
                key={num}
                style={{ 
                  y: useTransform(count, (v) => `${(num - Math.round(v)) * 100}%`),
                  opacity: useTransform(count, (v) => Math.round(v) === num ? 1 : 0)
                }}
                className="absolute text-5xl font-serif italic text-black tabular-nums"
             >
               0{num}
             </motion.span>
          ))}
       </div>
       <div className="flex flex-col text-[10px] tracking-widest text-zinc-400 mt-2">
          <span>/</span>
          <span>06</span>
       </div>
    </div>
  );
}
