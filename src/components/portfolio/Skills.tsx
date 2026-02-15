'use client';

import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "/assets/skills/react.svg", top: true },
  { name: "TypeScript", icon: "/assets/skills/typescript.svg", top: true },
  { name: "Tailwind CSS", icon: "/assets/skills/tailwind-css.svg", top: true },
  { name: "Next.js", icon: "/assets/skills/nextjs.svg", top: false },
  { name: "Node.js", icon: "/assets/skills/nodejs.svg", top: false },
  { name: "Framer Motion", icon: "/assets/skills/framer-motion.svg", top: false },
  { name: "GraphQl", icon: "/assets/skills/graphql.svg", top: false },
  { name: "Prisma", icon: "/assets/skills/prisma.svg", top: false },
];

export function Skills() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">Skills</h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 shadow-sm bg-white dark:bg-gray-900 ${
              skill.top
                ? "border-primary scale-105 shadow-lg"
                : "border-gray-200 dark:border-gray-800"
            }`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills; 