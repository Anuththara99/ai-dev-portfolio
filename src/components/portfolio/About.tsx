'use client';

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const profileImg = "/assets/about/profile.jpeg"; // Replace with your image path

export function About() {
  const { resolvedTheme } = useTheme();
  return (
    <motion.section
      className="w-full max-w-4xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="flex-shrink-0">
        <img
          src={profileImg}
          alt="Anuththara profile"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg object-cover border-4 border-primary/30 dark:border-primary/60"
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Hi! I'm Anuththara, a passionate full stack developer who loves building modern web apps.
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>🚀 5+ years experience in web development</li>
          <li>💡 Focused on clean code & great UX</li>
          <li>🌱 Always learning new tech and tools</li>
        </ul>
      </div>
    </motion.section>
  );
}

export default About; 