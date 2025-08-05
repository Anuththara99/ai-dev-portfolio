"use client";

import { motion } from "framer-motion";

const educationData = [
  {
    id: "university",
    institution: "Informatics Institute of Technology (IIT) – University of Westminster",
    degree: "BEng(Hons) Software Engineering – Upper Second Class Honors",
    period: "2019 – 2023 | Colombo, Sri Lanka",
    achievements: [
      "IEEE WIE, Rotaract Club, Cutting Edge 2023 speaker"
    ],
  },
  {
    id: "school",
    institution: "Bolawalana Ave Maria Convent",
    degree: "A/L Subjects: Combined Mathematics, Physics, ICT",
    period: "2005 – 2018 | Negombo, Sri Lanka",
    achievements: [
      "House Vice Captain, teamwork skills"
    ],
  },
];

export default function Education() {
  return (
    <section className="w-full max-w-3xl mx-auto py-16 px-4">
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Education
      </motion.h2>
      <div className="flex flex-col gap-8">
        {educationData.map((edu, idx) => (
          <motion.div
            key={edu.id}
            className="rounded-2xl shadow-md bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 p-6 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 + idx * 0.1, ease: 'easeOut' }}
          >
            <div className="font-semibold text-lg text-primary mb-1">{edu.institution}</div>
            <div className="text-gray-800 dark:text-gray-200 mb-1">{edu.degree}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.period}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Achievements:</span>
              <ul className="list-disc pl-5 mt-1">
                {edu.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 