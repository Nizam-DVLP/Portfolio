"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderAnimationProps {
  onComplete?: () => void;
}

const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Artificial progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 800); // Increased delay for smoother transition
          return 100;
        }
        
        // Natural progress: starts fast, slows down near the end
        let increment = 1;
        if (prev < 30) increment = Math.floor(Math.random() * 4) + 2;
        else if (prev < 70) increment = Math.floor(Math.random() * 3) + 1;
        else if (prev < 90) increment = Math.floor(Math.random() * 2) + 1;
        else increment = Math.random() > 0.7 ? 1 : 0; // Slow down a lot at the end

        return Math.min(prev + increment, 100);
      });
    }, 40); // Slightly slower interval for "natural" feel

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f2f2f2] text-black overflow-hidden"
          style={{ height: "100vh", width: "100vw" }}
        >
          {/* Left Yellow Bar */}
          <motion.div
            className="absolute left-0 bottom-0 w-2 bg-[#f5b400]"
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          />

          {/* Center Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center px-6"
          >
            <p className="text-sm md:text-base font-medium tracking-tight opacity-70">
              Lets Inspect my journey in your views
            </p>
          </motion.div>

          {/* Percentage Counter (Bottom Left) */}
          <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 select-none">
            <motion.div
              animate={{ 
                scale: 1 + (progress / 500), // Grows up to 1.2x at 100%
                y: -(progress / 10) // Subtle upward movement
              }}
              transition={{ ease: "linear", duration: 0.1 }}
              className="flex items-start"
            >
              <span className="text-[100px] md:text-[150px] font-bold leading-none tracking-tighter tabular-nums">
                {Math.round(progress)}
              </span>
              <span className="text-2xl md:text-4xl font-bold mt-4 md:mt-8 ml-1">%</span>
            </motion.div>
          </div>

          {/* Bottom Right Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-10 right-10 md:bottom-16 md:right-16"
          >
            <p className="text-xs md:text-sm font-medium tracking-widest uppercase">
              Lets goooooooo
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderAnimation;
