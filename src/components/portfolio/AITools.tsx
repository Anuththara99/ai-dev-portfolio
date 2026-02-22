'use client';

import { motion } from "framer-motion";

const tools = [
  {
    name: "Cursor AI",
    icon: "/assets/ai/cursor.svg",
    use: "I use Cursor AI for UI generation and code suggestions.",
  },
  {
    name: "Grok",
    icon: "/assets/ai/grok.svg",
    use: "Grok helps me with research, code, and real-time information.",
  },
  {
    name: "ChatGPT",
    icon: "/assets/ai/chatgpt.svg",
    use: "I use ChatGPT for brainstorming, debugging, and explanations.",
  },
  {
    name: "Antigravity",
    icon: "/assets/ai/antigravity.svg",
    use: "Antigravity assists in generating creative visuals and assets.",
  },
  {
    name: "Claude",
    icon: "/assets/ai/claude.svg",
    use: "Claude helps in generating structured content, refining copy, and brainstorming ideas.",
  },
  {
    name: "DeepSeek",
    icon: "/assets/ai/deepseek.svg",
    use: "DeepSeek assists in coding, debugging, and providing context-aware code generation.",
  },
];

export function AITools() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">How I Use AI Tools</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">
        AI tools supercharge my workflow, from coding to design and ideation. Here are some of my favorites:
      </p>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.name}
            className="flex items-center gap-4 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.04 }}
          >
            <img src={tool.icon} alt={tool.name} className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{tool.use}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default AITools; 