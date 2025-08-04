'use client';

import { motion } from "framer-motion";
import { ExternalLink, Clock, Calendar, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/card";
import { fetchMediumPosts } from "@/lib/medium";
import { useState, useEffect } from "react";
import { MEDIUM_CONFIG } from "@/config/medium";

// Define BlogPost interface locally
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  mediumUrl: string;
  tags: string[];
  featuredImage?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch posts from your Medium account
    fetchMediumPosts(MEDIUM_CONFIG.username)
      .then((mediumPosts) => {
        if (mediumPosts.length > 0) {
          setPosts(mediumPosts);
        } else {
          setError('No blog posts found. Please check your Medium account or try again later.');
        }
      })
      .catch((err) => {
        console.error('Error fetching Medium posts:', err);
        setError('Could not fetch blog posts. Please check your Medium account or try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <motion.h2 
        className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Latest Blog Posts
      </motion.h2>

      {error && (
        <motion.div 
          className="text-center mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
          >
            Try Again
          </button>
        </motion.div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Loading posts from Medium...
          </span>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 + index * 0.1, ease: 'easeOut' }}
            >
              <GlassCard className="flex flex-col h-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                {post.featuredImage && (
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read on Medium
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No blog posts found. Start writing on Medium to see your posts here!
          </p>
          <motion.a
            href={MEDIUM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5" />
            Visit My Medium Profile
          </motion.a>
        </div>
      ) : null}
      
      {posts.length > 0 && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href={MEDIUM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5" />
            View All Posts on Medium
          </motion.a>
        </motion.div>
      )}
    </section>
  );
} 