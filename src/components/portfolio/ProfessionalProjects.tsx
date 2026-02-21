"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface ProfessionalProject {
  id: string;
  title: string;
  company: string;
  duration: string;
  techStack: string[];
  description: string;
  impact: string;
  contributions: string[];
  details?: string;
  year: number;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
}

const professionalProjects: ProfessionalProject[] = [
  {
    id: "api-testing-platform",
    title: "API Testing Automation Platform",
    company: "Solo Architect & Developer",
    duration: "Jan 2025 – Present",
    year: 2025,
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "BullMQ", "Redis", "Playwright", "Loki", "Grafana", "Docker"],
    description:
      "Enterprise-grade API testing automation platform built independently from scratch, covering API response verification, database verification, and log verification across multi-server CPaaS environments.",
    impact:
      "Sole owner of the full SDLC — independently defined requirements, designed the system architecture, selected the entire technology stack, and implemented all components.",
    contributions: [
      "Architected distributed test execution engine using BullMQ and Redis with SSH-tunneled connections to remote servers (AWS and OpenStack)",
      "Designed three-pillar verification model: API response (Playwright), database (MySQL/MongoDB via SSH tunnel), and log verification (Loki + Grafana Alloy)",
      "Built React Admin frontend for test case management, cycle scheduling, and expected-vs-actual result comparison",
      "Containerized full stack with Docker Compose for a production-ready, CI/CD-friendly setup",
    ],
    details:
      "This platform was built to solve real testing challenges in CPaaS projects like Ideamart and Robi, where APIs, databases, and logs live on different servers. Every architectural decision — queue design, SSH tunneling strategy, verification model — was made independently.",
    gradientFrom: "from-violet-500/20",
    gradientTo: "to-indigo-500/20",
    icon: "🧪",
  },
  {
    id: "rawbank",
    title: "Mobile Banking Platform (Congo)",
    company: "RawBank",
    duration: "Sept 2023 – Aug 2024",
    year: 2023,
    techStack: ["Java", "Spring Boot", "MariaDB", "Docker", "Keycloak", "Grafana", "Nginx"],
    description:
      "USSD-based mobile banking platform for RawBank in Congo, built on top of an existing base module and extended into a full production system.",
    impact:
      "Lead developer — planned features, provided technical guidance and knowledge transfers to other developers, and drove delivery from inception to production.",
    contributions: [
      "Designed dynamic USSD menu workflows and implemented core wallet APIs: balance inquiry, fund transfers, mini-statements, airtime top-ups, and bill payments",
      "Integrated Keycloak for authentication and Grafana for real-time transaction analytics",
      "Resolved critical encryption and transaction logging issues in production",
      "Mentored junior developers and conducted knowledge transfer sessions",
    ],
    details:
      "Took ownership of the platform end-to-end — from planning features and estimating work through to resolving production issues. Built on a Spring Boot and Dockerized infrastructure stack with Keycloak handling auth.",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-cyan-500/20",
    icon: "🏦",
  },
  {
    id: "smsc-platform",
    title: "Teleco Signaling & SMSC Modernization",
    company: "Telecom Client",
    duration: "July 2023 – March 2025",
    year: 2023,
    techStack: ["Java", "Spring Boot", "MongoDB", "Keycloak", "React", "Docker", "Nginx", "Scala"],
    description:
      "Modernization of a large-scale SMSC and signaling platform — upgrading the full stack from legacy JDK and Spring versions to current standards.",
    impact:
      "Eliminated critical security vulnerabilities, resolved 10+ production bugs, and brought a legacy platform up to modern standards.",
    contributions: [
      "Upgraded JDK 1.7 to JDK 21 and Spring to 6.0.12 for SMPPGW and SMSC modules",
      "Migrated TokuMX to MongoDB 7, resolving clustering and dependency conflicts",
      "Replaced legacy CAS authentication with Keycloak 21 across 5+ modules",
      "Configured HTTPS with Nginx and Apache; resolved 10+ critical bugs in SMSC provisioning and customer care UI",
    ],
    details:
      "A complex legacy modernization involving multiple interconnected modules. Required careful coordination to upgrade JDK, Spring, and the database layer without breaking existing functionality.",
    gradientFrom: "from-green-500/20",
    gradientTo: "to-emerald-500/20",
    icon: "📡",
  },
  {
    id: "hutch-ipg",
    title: "Teleco Payment Gateway",
    company: "Telecom Client",
    duration: "Aug 2024 – Dec 2024",
    year: 2024,
    techStack: ["Java", "Hibernate", "MySQL", "JSP", "JavaScript", "Tomcat"],
    description:
      "Feature development and maintenance on a legacy telecom payment gateway handling bonus transactions, reverse flows, and financial reporting.",
    impact:
      "Delivered key change requests improving transaction reliability and reporting capabilities.",
    contributions: [
      "Implemented Bonus Transaction Flow and Reverse Bonus Transaction flows across frontend (JSP/JavaScript) and backend (Java/Hibernate)",
      "Built reporting features with CSV export functionality",
      "Performed bug fixing and optimized database queries for report performance",
      "Took on QA responsibilities during resource allocation periods due to in-depth platform knowledge",
    ],
    details:
      "Worked across the full stack of a high-volume legacy payment system. Due to deep familiarity with the platform, also covered QA duties when needed — running regression tests and validating transaction flows end-to-end.",
    gradientFrom: "from-orange-500/20",
    gradientTo: "to-yellow-500/20",
    icon: "💳",
  },
  {
    id: "m1-enum",
    title: "Teleco ENUM Query Platform Upgrade",
    company: "Telecom Client",
    duration: "Nov 2024 – Present",
    year: 2024,
    techStack: ["Java", "Spring Boot", "MySQL", "Docker", "Keycloak", "SSL/TLS"],
    description:
      "Full stack upgrade of a legacy ENUM query platform — from JDK 8 to JDK 21, Spring 3 to Spring 6, and MySQL 5 to MySQL 8.4.",
    impact:
      "Eliminated technical debt, closed security gaps with modern auth and encrypted connections.",
    contributions: [
      "Upgraded JDK 8 to JDK 21, Spring 3.2.3 to Spring 6, and MySQL 5 to MySQL 8.4",
      "Replaced CAS authentication with Keycloak",
      "Enabled SSL/TLS for all MySQL connections and internal APIs",
    ],
    details:
      "A focused modernization effort requiring careful dependency management across a multi-layer upgrade. Ensured backward compatibility at each step before moving to the next.",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-500/20",
    icon: "🔧",
  },
  {
    id: "seylan-cube",
    title: "Banking Analytics Platform",
    company: "Sri Lankan Bank",
    duration: "Sept 2021 – Oct 2022",
    year: 2021,
    techStack: ["Java", "React", "TypeScript", "GraphQL", "Spring Boot", "Tomcat"],
    description:
      "Full-stack development on a banking analytics platform, with sole ownership of the Extraction and Segmentation module.",
    impact:
      "Delivered advanced data extraction and segmentation capabilities enabling analytics on customer banking data.",
    contributions: [
      "Contributed as a full-stack developer covering backend GraphQL APIs, React frontend, and data warehouse integration",
      "Solely designed and implemented the Extraction and Segmentation module end-to-end — from requirements through to delivery",
    ],
    details:
      "Worked across the full stack while independently owning a critical module. The Extraction and Segmentation module was designed, built, and delivered without supervision.",
    gradientFrom: "from-teal-500/20",
    gradientTo: "to-blue-500/20",
    icon: "📊",
  },
];

const techColors: Record<string, string> = {
  Java: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  "Spring Boot": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  NestJS: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  PostgreSQL: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200",
  BullMQ: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
  Redis: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  Playwright: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Loki: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  MariaDB: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  Docker: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200",
  Keycloak: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
  Grafana: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  MySQL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  JSP: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
  Tomcat: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
  Hibernate: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  Scala: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200",
  MongoDB: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
  GraphQL: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200",
  JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  Nginx: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  "SSL/TLS": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200",
};

const years = Array.from(new Set(professionalProjects.map(p => p.year))).sort((a, b) => b - a);

export default function ProfessionalProjects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const filteredProjects =
    selectedYear === "all"
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

      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            selectedYear === "all"
              ? "bg-primary text-white border-primary shadow"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => setSelectedYear("all")}
        >
          All
        </button>
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              selectedYear === year
                ? "bg-primary text-white border-primary shadow"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
            }`}
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

              {/* ---- GRADIENT + ICON HEADER (replaces broken image) ---- */}
              <div
                className={`relative h-40 w-full bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} flex flex-col items-center justify-center gap-2`}
              >
                <span className="text-5xl">{project.icon}</span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/40 dark:bg-black/20 px-3 py-1 rounded-full">
                  {project.company}
                </span>
              </div>
              {/* ------------------------------------------------------- */}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <span className="ml-auto shrink-0 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.duration}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm line-clamp-2">
                  {project.description}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">
                  {project.impact}
                </p>

                <ul className="list-disc pl-5 mb-3 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                  {project.contributions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        techColors[tech] ||
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  className="flex items-center gap-1 text-primary hover:underline text-sm mt-auto"
                  onClick={() =>
                    setExpanded(expanded === project.id ? null : project.id)
                  }
                  aria-expanded={expanded === project.id}
                >
                  {expanded === project.id ? (
                    <>Hide Details <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read More <ChevronDown className="w-4 h-4" /></>
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