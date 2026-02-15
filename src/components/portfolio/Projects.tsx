'use client';

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/card";
import { fetchGitHubProjects } from "@/lib/github";
import { GITHUB_CONFIG } from "@/config/github";
import { useState, useEffect } from "react";
import { ExternalLink, Github, Star, GitFork, Calendar, Loader2 } from "lucide-react";

// Define Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch projects from GitHub
    fetchGitHubProjects(GITHUB_CONFIG.username, {
      selectedProjects: [...GITHUB_CONFIG.selectedProjects],
      excludedProjects: [...GITHUB_CONFIG.excludedProjects],
      minStars: GITHUB_CONFIG.minStars,
      requireDescription: GITHUB_CONFIG.requireDescription,
      excludeForks: GITHUB_CONFIG.excludeForks,
    })
      .then((githubProjects) => {
        if (githubProjects.length > 0) {
          setProjects(githubProjects);
        } else {
          setError('No projects found. Please check your GitHub account or configuration.');
        }
      })
      .catch((err) => {
        console.error('Error fetching GitHub projects:', err);
        setError('Could not fetch projects. Please check your GitHub account or try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto py-16 px-4">
      <motion.h2 
        className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>

      {error && (
        <motion.div 
          className="text-center mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-800 dark:text-yellow-200 mb-3">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
          >
            Try Again
          </button>
        </motion.div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading projects from GitHub...
          </span>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 + i * 0.1, ease: 'easeOut' }}
            >
              <GlassCard className="flex flex-col overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide image if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        <GitFork className="w-3 h-3" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                      {project.language}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span 
                        key={topic} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(project.updatedAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </motion.a>
                      )}
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No projects found. Start coding on GitHub to see your projects here!
          </p>
          <motion.a
            href={GITHUB_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            Visit My GitHub Profile
          </motion.a>
        </div>
      ) : null}
      
      {projects.length > 0 && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href={GITHUB_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      )}
    </section>
  );
}

export default Projects; 