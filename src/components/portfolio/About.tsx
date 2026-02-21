'use client';

import { motion } from "framer-motion";

const profileImg = "/assets/about/profile.jpeg"; // Replace with your image path

export function About() {
  return (
    <motion.section
      className="w-full max-w-3xl mx-auto py-16 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <img
        src={profileImg}
        alt="Anuththara profile"
        className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-lg object-cover border-4 border-primary/30 dark:border-primary/60 mb-6"
      />
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
        Hi! I&apos;m Anuththara, a full-stack software engineer with 3+ years building production
         systems across telecom, banking, and automation. I've worked with international
          clients, led projects end-to-end, and I'm always looking to pick up new 
          technologies and solve problems in different domains.
      </p>
      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base text-center">
        <li>🚀 3+ years industry experience</li>
        <li>🌍 Projects for 5+ international clients</li>
        <li>🌱 Always learning new tech and tools</li>
      </ul>
    </motion.section>
  );
}

export default About; 