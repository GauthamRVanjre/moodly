"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

type HeaderProps = {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function Header({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: HeaderProps) {
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-6">
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Moodly
      </motion.h1>

      <div className="flex items-center space-x-4">
        <motion.div
          className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={onPrevMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>

          <span className="text-sm md:text-base font-medium">
            {monthName} {year}
          </span>

          <button
            onClick={onNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </motion.div>
      </div>
    </header>
  );
}
