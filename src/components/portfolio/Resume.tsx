'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { GlassCard } from "@/components/ui/card";

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'downloads/resume.pdf';
    link.download = 'Anuththara_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto py-16 px-4 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <GlassCard className="p-8 flex flex-col items-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Resume
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Ready to bring your ideas to life? Download my resume to learn more about my experience and skills.
        </motion.p>
        
        <motion.button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Download className="w-5 h-5" />
          Download Resume
        </motion.button>
      </GlassCard>
    </motion.section>
  );
} 