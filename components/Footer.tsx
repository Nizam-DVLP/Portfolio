"use client";

import React, { useState } from 'react';
import Grainient from './Grainient';
import { motion } from 'framer-motion';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer className="bg-black py-10 px-4 md:px-10">
      <div className="relative w-full overflow-hidden rounded-[40px] md:rounded-[60px] min-h-[600px]">
        {/* Background Animation - Inside Rounded Container */}
        <div className="absolute inset-0 z-0">
          <Grainient
            color1="#f6f1f6"
            color2="#03010c"
            color3="#97cf9e"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full min-h-[600px] flex flex-col items-center justify-center px-6 py-20 md:py-32">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* Left Side: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-7xl font-bold text-black mb-6 tracking-tight leading-[0.9]">
                Ready to start <br/>
                <span className="opacity-40">your next project?</span>
              </h2>
              <p className="text-lg text-black/60 max-w-sm mb-8 leading-relaxed">
                We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black border border-black/5 backdrop-blur-sm hover:bg-green transition-colors cursor-pointer">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white border border-white/5 backdrop-blur-sm hover:bg-green transition-colors cursor-pointer">
                  <span className="text-xs">TW</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white border border-white/5 backdrop-blur-sm hover:bg-green transition-colors cursor-pointer">
                  <span className="text-xs">LI</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/10 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white/40 mb-2 ml-1 uppercase tracking-widest">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-white/40 mb-2 ml-1 uppercase tracking-widest">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="99999"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-white/40 mb-2 ml-1 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-black font-bold py-5 rounded-2xl mt-4 hover:bg-zinc-200 transition-all shadow-xl"
                >
                  Get in Touch
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-10 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
            <p>© 2026 Artificial Garage</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
