"use client";

import { AnimatePresence, motion } from "framer-motion";
import Confetti from "./Confetti";

type StreakModalProps = {
  isOpen: boolean;
  onClose: () => void;
  habitName: string;
  streakCount: number;
};

export default function StreakModal({
  isOpen,
  onClose,
  habitName,
  streakCount,
}: StreakModalProps) {
  if (!isOpen) return null;

  // Different messages for different streak milestones
  const getMessage = () => {
    if (streakCount % 30 === 0) return "Amazing! A whole month of consistency!";
    if (streakCount % 7 === 0) return "Fantastic! A full week of dedication!";
    if (streakCount % 5 === 0)
      return "Impressive! You're building a strong habit!";
    if (streakCount === 1)
      return "Great job! You're on your way to a new habit!";
  };

  // Different emoji for different streak milestones
  const getEmoji = () => {
    if (streakCount >= 100) return "🏆";
    if (streakCount >= 30) return "🔥";
    if (streakCount >= 7) return "⭐";
    return "🎉";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Confetti />
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-primary/20 p-4 text-center">
              <div className="inline-block text-6xl mb-3">{getEmoji()}</div>
              <h2 className="text-xl font-bold text-primary">
                Congratulations!
              </h2>
            </div>

            <div className="p-6 text-center">
              <div className="mb-4">
                <p className="text-lg font-medium mb-2">{getMessage()}</p>
                <p>
                  <span className="font-bold">{habitName}</span> streak:{" "}
                  <span className="text-2xl font-bold text-primary">
                    {streakCount}
                  </span>{" "}
                  days
                </p>
              </div>

              <motion.div
                className="mt-6 text-center"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Keep Going!
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
