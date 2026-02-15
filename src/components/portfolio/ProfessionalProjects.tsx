"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

// Sample professional project data
interface ProfessionalProject {
  id: string;
  title: string;
  company: string;
  duration: string;
  techStack: string[];
  description: string;
  impact: string;
  contributions: string[];
  image?: string;
  details?: string;
  year: number;
}

const professionalProjects: ProfessionalProject[] = [
  {
    id: "rawbank",
    title: "Mobile Banking Platform (Congo)",
    company: "Major African Bank",
    duration: "Sept 2023 – Aug 2024",
    year: 2023,
    techStack: ["Java", "Spring Boot", "MariaDB", "Docker", "Keycloak", "Grafana"],
    description: "USSD-based mobile banking solution for a leading bank in Congo, enabling millions of users to access financial services via mobile.",
    impact: "Enabled secure, real-time mobile banking for unbanked populations, improving financial inclusion.",
    contributions: [
      "Designed and developed USSD-based mobile banking flows",
      "Integrated Keycloak authentication & real-time transaction analytics",
      "Developed core wallet APIs (balance inquiry, fund transfers, bill payments)",
      "Mentored interns and optimized performance through refactoring"
    ],
    image: "/professional/rawbank.jpg",
    details: "Worked closely with cross-functional teams to deliver a robust, scalable mobile banking platform. Led code reviews and implemented CI/CD pipelines for faster delivery."
  },
  {
    id: "hutch-ipg",
    title: "Telecom Payment Gateway",
    company: "Global Telecom Provider",
    duration: "Aug 2024 – Present",
    year: 2024,
    techStack: ["Java", "Maven", "MySQL", "JSP", "Ant", "Tomcat", "Hibernate"],
    description: "Developed and enhanced a high-volume payment gateway for a major telecom operator, supporting millions of daily transactions.",
    impact: "Improved transaction reliability and reporting, supporting business growth and compliance.",
    contributions: [
      "Implemented Bonus Transaction and Reverse Bonus Transaction flows",
      "Designed reporting features with CSV export",
      "Optimized database queries for performance"
    ],
    image: "/professional/hutch.jpg",
    details: "Collaborated with QA and DevOps to ensure smooth deployments. Provided production support and handled critical bug fixes."
  },
  {
    id: "m1-enum",
    title: "Enum Query System Upgrade",
    company: "Telecom Solutions",
    duration: "Nov 2024 – Present",
    year: 2024,
    techStack: ["Java", "Spring Boot", "MySQL", "Docker", "Keycloak"],
    description: "Upgraded a legacy enum query system to modern Java and Spring Boot stack, enhancing security and maintainability.",
    impact: "Reduced technical debt and improved system security with modern authentication and encryption.",
    contributions: [
      "Upgraded legacy system to JDK 21, Spring 6, MySQL 8",
      "Migrated authentication to Keycloak",
      "Enabled SSL/TLS for DB and APIs"
    ],
    image: "/professional/enum.jpg",
    details: "Led the migration effort, coordinated with stakeholders, and ensured zero downtime during the upgrade."
  },
  {
    id: "dialog-smsc",
    title: "SMSC Platform Upgrade",
    company: "Telecom Messaging",
    duration: "Jan 2025 – Present",
    year: 2025,
    techStack: ["Java", "Spring", "MongoDB", "Scala"],
    description: "Migrated and enhanced a large-scale SMSC platform, supporting critical telecom messaging services.",
    impact: "Ensured platform stability and compliance with latest database standards.",
    contributions: [
      "Migrated TokuMX to MongoDB 7",
      "Fixed bugs in Promo Message Filter and Adlive"
    ],
    image: "/professional/smsc.jpg",
    details: "Worked with DBAs and system architects to ensure data integrity and smooth migration."
  },
  {
    id: "seylan-cube",
    title: "Cube Banking App",
    company: "Leading Bank",
    duration: "Sept 2021 – Oct 2022",
    year: 2021,
    techStack: ["Java", "React", "TypeScript", "GraphQL", "Spring Boot", "HTML", "CSS"],
    description: "Developed modules for a next-gen digital banking app, focusing on data extraction and segmentation.",
    impact: "Enabled advanced analytics and personalized banking experiences for end-users.",
    contributions: [
      "Implemented extraction and segmentation modules",
      "Worked on backend and frontend integration"
    ],
    image: "/professional/seylan.jpg",
    details: "Collaborated with product managers and designers to deliver user-centric features."
  }
];

const techColors: Record<string, string> = {
  Java: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  "Spring Boot": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  MariaDB: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  Docker: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200",
  Keycloak: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
  Grafana: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  Maven: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200",
  MySQL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  JSP: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
  Ant: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  Tomcat: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  Hibernate: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Scala: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200",
  MongoDB: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  GraphQL: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
  HTML: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  CSS: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  Spring: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
};

const years = Array.from(new Set(professionalProjects.map(p => p.year))).sort((a, b) => b - a);

export default function ProfessionalProjects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const filteredProjects = selectedYear === "all"
    ? professionalProjects
    : professionalProjects.filter(p => p.year === selectedYear);

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4" id="professional-projects">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Briefcase className="inline-block w-8 h-8 mr-2 align-middle text-primary" />
        Professional Projects
      </motion.h2>

      {/* Timeline/Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedYear === "all" ? "bg-primary text-white border-primary shadow" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"}`}
          onClick={() => setSelectedYear("all")}
        >
          All
        </button>
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedYear === year ? "bg-primary text-white border-primary shadow" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 + idx * 0.1, ease: "easeOut" }}
          >
            <div className="flex flex-col h-full bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-200/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden">
              <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-blue-100 dark:from-gray-800/30 dark:to-blue-900/20 flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    onError={e => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <Briefcase className="w-16 h-16 text-primary/40" />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="ml-auto px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4 inline-block mr-1" />
                    {project.duration}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm line-clamp-2">
                  {project.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">
                  {project.impact}
                </p>
                <ul className="list-disc pl-5 mb-3 text-sm text-gray-800 dark:text-gray-200">
                  {project.contributions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${techColors[tech] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  className="flex items-center gap-1 text-primary hover:underline text-sm mt-auto"
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                  aria-expanded={expanded === project.id}
                >
                  {expanded === project.id ? (
                    <>
                      Hide Details <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
                <AnimatePresence>
                  {expanded === project.id && project.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow"
                    >
                      {project.details}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 