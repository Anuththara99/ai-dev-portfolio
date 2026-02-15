"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "glass";
  size?: "sm" | "md" | "lg";
  gradient?: "pink" | "blue" | "purple" | "green";
}

export function GradientButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md"
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-pink-500/25",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/25",
    glass: "backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/20 text-gray-800 dark:text-white"
  };

  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        "rounded-xl font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "hover:scale-105 active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.button>
  );
} 