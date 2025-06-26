'use client';

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const gradientLight =
  "bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200";
const gradientDark =
  "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${
        isDark ? gradientDark : gradientLight
      }`}
    >
      {/* Animated Gradient Overlay */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.15), transparent 80%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          Hi, I'm <span className="text-primary">Anuththara</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-8 text-gray-700 dark:text-gray-300">
          Full Stack Developer
        </h2>
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition-colors text-lg"
        >
          View Projects
        </motion.a>
      </motion.div>
    </section>
  );
} 