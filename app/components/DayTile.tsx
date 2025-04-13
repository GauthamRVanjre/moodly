"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Mood = {
  emoji: string;
  name: string;
};

const moods: Mood[] = [
  { emoji: "😊", name: "happy" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
  { emoji: "😐", name: "neutral" },
  { emoji: "🤩", name: "excited" },
  { emoji: "❤️", name: "love" },
  { emoji: "😴", name: "tired" },
];

// Mock data for habits by date
const mockHabitsByDate: Record<
  string,
  { id: string; name: string; completed: boolean }[]
> = {
  "2023-6-15": [
    { id: "1", name: "Drink 2L of water", completed: true },
    { id: "2", name: "Meditate for 10 minutes", completed: false },
    { id: "3", name: "Read for 30 minutes", completed: true },
  ],
  "2023-6-16": [
    { id: "1", name: "Drink 2L of water", completed: true },
    { id: "2", name: "Meditate for 10 minutes", completed: true },
    { id: "3", name: "Read for 30 minutes", completed: true },
  ],
  // Add more dates as needed
};

type DayTileProps = {
  day: number;
  month: number;
  year: number;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
};

export default function DayTile({
  day,
  month,
  year,
  isCurrentDay,
  isCurrentMonth,
}: DayTileProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showHabits, setShowHabits] = useState(false);

  const dateString = `${year}-${month + 1}-${day}`;
  // Use mock data or default to an empty array
  const dayHabits = mockHabitsByDate[dateString] || [];
  const completedCount = dayHabits.filter((h) => h.completed).length;
  const totalHabits = dayHabits.length;
  const completionPercentage =
    totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;

  const handleSelectMood = (mood: Mood) => {
    setSelectedMood(mood);
    setShowMoodPicker(false);
  };

  const moodClass = selectedMood ? `mood-${selectedMood.name}` : "";

  const handleDayClick = () => {
    if (isCurrentMonth) {
      if (dayHabits.length > 0) {
        setShowHabits(true);
      } else {
        setShowMoodPicker(true);
      }
    }
  };

  return (
    <motion.div
      className={`relative aspect-square rounded-lg shadow-sm overflow-hidden cursor-pointer hover:scale-150 transition-all duration-300
        ${
          isCurrentMonth
            ? "bg-white dark:bg-gray-800"
            : "bg-gray-100 dark:bg-gray-900"
        } 
        ${isCurrentDay ? "ring-2 ring-primary" : ""} 
        ${moodClass} mood-transition`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleDayClick}
    >
      <div className="p-2 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span
            className={`text-sm font-medium ${
              isCurrentMonth ? "text-foreground" : "text-gray-400"
            }`}
          >
            {day}
          </span>

          {totalHabits > 0 && isCurrentMonth && (
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  completionPercentage >= 100
                    ? "var(--primary)"
                    : completionPercentage > 0
                    ? "var(--primary-light)"
                    : "var(--neutral)",
              }}
            ></div>
          )}
        </div>

        {totalHabits > 0 && isCurrentMonth && (
          <div className="mt-auto">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <motion.div
                className="bg-primary h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        )}

        {selectedMood && (
          <div
            className="text-center text-lg mt-auto"
            aria-label={`Mood: ${selectedMood.name}`}
          >
            {selectedMood.emoji}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showMoodPicker && (
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-800 z-10 p-2 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoodPicker(false);
                }}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close mood picker"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1 mt-1">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectMood(mood);
                  }}
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-xl`}
                  aria-label={`Select mood: ${mood.name}`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showHabits && (
          <motion.div
            className="absolute inset-0 bg-white dark:bg-gray-800 z-10 p-2 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold">
                {new Date(year, month, day).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHabits(false);
                }}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close habits"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs max-h-[80px] overflow-y-auto">
              {dayHabits.map((habit) => (
                <div key={habit.id} className="flex items-center space-x-1">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      habit.completed ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`${
                      habit.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {habit.name}
                  </span>
                </div>
              ))}
              {dayHabits.length === 0 && (
                <div className="text-gray-400 text-center">
                  No habits recorded
                </div>
              )}
            </div>

            <div className="mt-2 flex justify-center pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHabits(false);
                  setShowMoodPicker(true);
                }}
                className="text-xs text-primary hover:underline"
              >
                Set mood for this day
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
