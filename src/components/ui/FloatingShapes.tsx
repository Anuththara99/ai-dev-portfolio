"use client";

import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated circles */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-sm"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-sm"
        animate={{
          y: [0, -10, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Animated squares */}
      <motion.div
        className="absolute top-1/2 right-10 w-8 h-8 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur-sm"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-sm"
        animate={{
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
      />
    </div>
  );
} 