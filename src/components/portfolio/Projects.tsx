'use client';

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const projects = [
  {
    title: "Dev Portfolio",
    image: "/project1.jpg",
    description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    title: "E-Commerce Dashboard",
    image: "/project2.jpg",
    description: "Analytics dashboard for e-commerce, featuring charts, filters, and real-time updates.",
    tech: ["React", "TypeScript", "Recharts"],
  },
  {
    title: "AI Blog Writer",
    image: "/project3.jpg",
    description: "AI-powered blog writing tool with markdown support and instant previews.",
    tech: ["OpenAI", "Next.js", "Vercel"],
  },
];

export function Projects() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Featured Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 + i * 0.1, ease: 'easeOut' }}
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects; 