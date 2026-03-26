"use client";

import Hero from "@/components/Hero";
import OverlayTransition from "@/components/OverlayTransition";
import ServicesShowcase from "@/components/ServicesShowcase";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <main className="w-full relative bg-black">
      {/* 1. Hero Section (200vh) - Resulting in Black */}
      <Hero />

      {/* 2. Transition Overlay - Black to White Rising */}
      <OverlayTransition />

      {/* 3. Black Content Section - Starts after White Overlay */}
      <div className="bg-black text-white min-h-screen relative z-10 transition-colors duration-1000">
        {/* Cinematic Services Section (1100vh) */}
        <ServicesShowcase />

        {/* Technology Showcase Section (1200vh + Intro) */}
        <TechnologyShowcase />
        {/* Portfolio Showcase section */}
        <section className="min-h-screen py-32 px-12 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <PortfolioItem title="Eclipse Agency" category="Visual Design / 2024" />
              <PortfolioItem title="Aether Studio" category="Art Direction / 2024" />
            </div>
        </section>

        {/* Capabilities section */}
        <section className="min-h-screen py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-start px-12 md:px-24">
          <div className="sticky top-32">
            <h2 className="text-sm uppercase tracking-[0.5em] text-zinc-500 mb-8">Capabilities</h2>
            <h3 className="text-5xl font-light tracking-tight leading-tight">I help brands tell their story through digital excellence.</h3>
          </div>
          <div className="space-y-24">
            <ServiceItem number="01" title="Visual Design" description="Crafting unique visual identities that resonate with your audience and stand the test of time." />
            <ServiceItem number="02" title="Web Experience" description="Building high-performance, responsive websites with state-of-the-art animations and interaction." />
            <ServiceItem number="03" title="Art Direction" description="Conceptualizing and executing creative strategies that define the soul of a brand." />
          </div>
        </section>
      </div>

      <footer className="py-20 bg-black border-t border-white/5 px-12 text-center text-zinc-600 text-xs tracking-[0.2em] uppercase">
        © 2026 Godwin Portfolio. All rights reserved.
      </footer>
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
      <div className="w-full aspect-video bg-zinc-900 rounded-sm mb-6 transition-transform hover:scale-[1.02] duration-500 overflow-hidden relative">
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
