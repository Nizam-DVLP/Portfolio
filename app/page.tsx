"use client";

import Hero from "@/components/Hero";
import OverlayTransition from "@/components/OverlayTransition";
import ServicesShowcase from "@/components/ServicesShowcase";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import InfinityScroll from "@/components/InfinityScroll";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <main className="w-full relative bg-black">
      {/* 1. Hero Section (200vh) - Resulting in Black */}
      <Hero />

      {/* 2. Transition Overlay - Black to White Rising */}
      <OverlayTransition />

      {/* 3. Black Content Section - Starts after White Overlay */}
      <div className="bg-black text-white min-h-screen relative z-10 transition-colors duration-500">
        {/* Cinematic Services Section (1100vh) */}
        <ServicesShowcase />

        {/* Technology Showcase Section (1200vh + Intro) */}
        <TechnologyShowcase />
        <InfinityScroll />

        
    
      </div>

     
    </main>
  );
}

function ServiceItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="group border-b border-white/5 pb-12">
      <div className="flex items-baseline gap-6 mb-4">
        <span className="text-xs font-medium text-zinc-700 tabular-nums">{number}</span>
        <h4 className="text-3xl font-light tracking-tight">{title}</h4>
      </div>
      <p className="text-zinc-500 max-w-sm leading-relaxed ml-12">
        {description}
      </p>
    </div>
  );
}

function PortfolioItem({ title, category }: { title: string; category: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="w-full aspect-video bg-zinc-900 rounded-sm mb-6 transition-transform hover:scale-[1.02] duration-300 overflow-hidden relative">
        <div className="w-full h-full bg-white/5" />
      </div>
      <div className="flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-white transition-colors">
        <div className="text-left">
          <h4 className="text-xl font-medium tracking-tight group-hover:translate-x-2 transition-transform text-white">{title}</h4>
          <p className="text-xs tracking-widest uppercase opacity-40 mt-1 text-zinc-400">{category}</p>
        </div>
        <div className="text-xl font-light opacity-20 group-hover:opacity-100 transition-opacity text-white">→</div>
      </div>
    </div>
  );
}
