"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: "pink" | "blue" | "purple" | "green";
}

export function GlassCard({ children, className = "", hover = true, gradient = "pink" }: GlassCardProps) {
  const gradientClasses = {
    pink: "from-pink-500/20 to-purple-500/20",
    blue: "from-blue-500/20 to-cyan-500/20", 
    purple: "from-purple-500/20 to-indigo-500/20",
    green: "from-green-500/20 to-emerald-500/20"
  };

  return (
    <motion.div
      className={clsx(
        "backdrop-blur-md rounded-2xl border shadow-xl",
        "bg-white/60 dark:bg-black/40",
        "border-white/20 dark:border-white/10",
        "relative overflow-hidden",
        hover && "hover:scale-[1.02] hover:shadow-2xl transition-all duration-300",
        className
      )}
      whileHover={hover ? { 
        y: -5,
        transition: { duration: 0.2 }
      } : undefined}
    >
      {/* Gradient border overlay */}
      <div className={clsx(
        "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 hover:opacity-100 transition-opacity duration-300",
        gradientClasses[gradient]
      )} />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
} 