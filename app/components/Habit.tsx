"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckIcon } from "./Icons";
import StreakModal from "./StreakModal";

type HabitProps = {
  id: string;
  name: string;
  streakCount?: number;
  onToggle?: (id: string, completed: boolean) => void;
};

export default function Habit({
  id,
  name,
  streakCount = 0,
  onToggle,
}: HabitProps) {
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(streakCount);
  const [showModal, setShowModal] = useState(false);
  const [lastCompletedTime, setLastCompletedTime] = useState<number | null>(
    null
  );

  const handleToggle = () => {
    const newCompletedState = !completed;
    setCompleted(newCompletedState);

    if (newCompletedState) {
      // Check if this is a new day compared to the last completion
      const now = Date.now();
      const isNewDay =
        !lastCompletedTime || now - lastCompletedTime > 12 * 60 * 60 * 1000; // Check if more than 12 hours have passed

      if (isNewDay) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastCompletedTime(now);

        setShowModal(true);
      }
    }

    if (onToggle) {
      onToggle(id, completed);
    }
  };

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            className={`rounded-full p-2 ${
              completed
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <CheckIcon />
          </motion.button>
          <span
            className={`font-medium ${
              completed ? "line-through text-gray-400" : ""
            }`}
          >
            {name}
          </span>
        </div>

        {streak > 0 && (
          <motion.div
            className="flex items-center bg-primary-light/20 px-3 py-1 rounded-full"
            animate={{
              scale: streak > streakCount ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-primary">
              {streak} day{streak !== 1 ? "s" : ""} streak
            </span>
          </motion.div>
        )}
      </motion.div>

      <StreakModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        habitName={name}
        streakCount={streak}
      />
    </>
  );
}
