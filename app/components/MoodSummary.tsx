"use client";

import { motion } from "framer-motion";

// For the UI-only version, we'll use hardcoded data
const moodCounts = [
  { emoji: "😊", name: "happy", count: 12 },
  { emoji: "😢", name: "sad", count: 4 },
  { emoji: "😡", name: "angry", count: 2 },
  { emoji: "😐", name: "neutral", count: 7 },
  { emoji: "🤩", name: "excited", count: 3 },
  { emoji: "❤️", name: "love", count: 1 },
  { emoji: "😴", name: "tired", count: 5 },
];

export default function MoodSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-4">Monthly Mood Summary</h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moodCounts.map((mood) => (
          <motion.div
            key={mood.name}
            className={`flex items-center space-x-2 p-2 rounded-lg mood-${mood.name} mood-transition`}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <div className="flex flex-col">
              <span className="text-xs font-medium capitalize">
                {mood.name}
              </span>
              <span className="text-sm font-bold">× {mood.count}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
