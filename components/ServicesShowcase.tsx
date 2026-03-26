"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Esthetic Dentistry",
    description: "Our signature approach to dental beauty. We combine artistic vision with advanced technology to create smiles that are both natural and striking.",
    items: ["Veneers & Lumineers", "Teeth Whitening", "Gum Contouring", "Digital Smile Design"],
    image: "/images/services/service-1.png",
  },
  {
    title: "Restorative Dentistry",
    description: "Rebuilding function and confidence. Using bio-compatible materials, we restore your dental health with unmatched precision and durability.",
    items: ["Bridges & Crowns", "Implants", "Precision Fillings", "Inlays & Onlays"],
    image: "/images/services/service-2.png",
  },
  {
    title: "Preventive Care",
    description: "Luxury is longevity. Our specialized maintenance programs are designed to protect your investment and ensure your smile lasts a lifetime.",
    items: ["Specialized Cleaning", "Ozone Therapy", "Microbiome Testing", "Fluoride Treatments"],
    image: "/images/services/service-3.png",
  }
];

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image animations (Bottom to Top transition)
  const img1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.35], [1, 1.1]); 

  // Image 2 rises from 0.3 to 0.35, then stays until 0.65
  const img2Y = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], ["100%", "0%", "0%", "-100%"]);
  const img2Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], [1, 1, 1, 1]); // Keep solid during climb
  const img2Scale = useTransform(scrollYProgress, [0.35, 0.65], [1, 1.1]);

  // Image 3 rises from 0.65 to 0.7
  const img3Y = useTransform(scrollYProgress, [0.65, 0.7], ["100%", "0%"]);
  const img3Opacity = useTransform(scrollYProgress, [0.65, 0.7], [1, 1]);
  const img3Scale = useTransform(scrollYProgress, [0.7, 1], [1, 1.1]);

  // Content animations: Triggered as the image arrives at the top
  const content1Opacity = useTransform(scrollYProgress, [0.28, 0.32], [1, 0]);
  const content1Y = useTransform(scrollYProgress, [0.28, 0.32], [0, -100]);

  const content2Opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.62, 0.67], [0, 1, 1, 0]);
  const content2Y = useTransform(scrollYProgress, [0.3, 0.35, 0.62, 0.67], [100, 0, 0, -100]);

  const content3Opacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);
  const content3Y = useTransform(scrollYProgress, [0.65, 0.7], [100, 0]);


  // Smooth springs
  const smoothImg1Opacity = useSpring(img1Opacity, { damping: 30, stiffness: 100 });
  const smoothImg2Y = useSpring(img2Y, { damping: 30, stiffness: 80 });
  const smoothContent1Opacity = useSpring(content1Opacity);
  const smoothContent2Opacity = useSpring(content2Opacity);
  const smoothContent3Opacity = useSpring(content3Opacity);

  return (
    <section ref={containerRef} className="relative md:h-[1100vh] w-full bg-black">
      
      {/* MOBILE VIEW: Standard Stack */}
      <div className="md:hidden flex flex-col bg-black">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col border-b border-zinc-900 pb-20">
             <div className="relative w-full aspect-[4/5]">
               <Image src={service.image} alt={service.title} fill className="object-cover" />
               <div className="absolute inset-0 bg-black/40" />
               <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
             </div>
             <div className="px-8 pt-12">
                <ContentBlock index={index} isMobile={true} />
             </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Cinematic Scroll */}
      <div className="hidden md:flex sticky top-0 h-screen w-full flex-row overflow-hidden">
        
        {/* LEFT SIDE: Image Stack */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <motion.div 
            style={{ opacity: smoothImg1Opacity, scale: img1Scale }} 
            className="absolute inset-0 z-10 will-change-transform"
          >
            <Image src={services[0].image} alt="Service 1" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </motion.div>

          <motion.div 
            style={{ y: smoothImg2Y, opacity: img2Opacity, scale: img2Scale }} 
            className="absolute inset-0 z-20 will-change-transform"
          >
            <Image src={services[1].image} alt="Service 2" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </motion.div>

          <motion.div 
            style={{ y: img3Y, opacity: img3Opacity, scale: img3Scale }} 
            className="absolute inset-0 z-30 will-change-transform"
          >
            <Image src={services[2].image} alt="Service 3" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          </motion.div>
        </div>

        {/* RIGHT SIDE: Content Panel */}
        <div className="relative w-1/2 h-full bg-black flex items-center justify-center px-24">
          <motion.div style={{ opacity: smoothContent1Opacity, y: content1Y }} className="absolute inset-0 flex flex-col items-start justify-center px-24 pointer-events-none">
             <ContentBlock index={0} />
          </motion.div>
          <motion.div style={{ opacity: smoothContent2Opacity, y: content2Y }} className="absolute inset-0 flex flex-col items-start justify-center px-24 pointer-events-none">
             <ContentBlock index={1} />
          </motion.div>
          <motion.div style={{ opacity: smoothContent3Opacity, y: content3Y }} className="absolute inset-0 flex flex-col items-start justify-center px-24 pointer-events-none">
             <ContentBlock index={2} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContentBlock({ index, isMobile = false }: { index: number; isMobile?: boolean }) {
  const s = services[index];
  return (
    <div className={`max-w-md w-full ${!isMobile ? 'pointer-events-auto' : ''}`}>
      <span className="text-zinc-500 text-xs tracking-[0.5em] uppercase mb-8 block">
        Services / 0{index + 1}
      </span>
      <h2 className={`text-white font-extralight tracking-tight mb-8 font-serif italic ${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'}`}>
        {s.title}
      </h2>
      <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12">
        {s.description}
      </p>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {s.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            {item}
          </li>
        ))}
      </ul>

      <button className="group relative px-8 py-4 border border-zinc-800 text-zinc-300 text-xs tracking-[0.3em] uppercase transition-colors hover:bg-white hover:text-black">
        Explore Mastery
        <span className="absolute -bottom-px left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
      </button>
    </div>
  );
}

