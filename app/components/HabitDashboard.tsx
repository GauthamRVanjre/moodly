"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { initialHabits } from "../constants/constant";
import Habit from "./Habit";
import Reminder from "./Reminder";

export default function HabitDashboard() {
  const [habits, setHabits] = useState(initialHabits);
  const [habitName, setHabitName] = useState("");
  const [activeTab, setActiveTab] = useState<"habits" | "reminders">("habits");

  const handleHabitToggle = (id: string, completed: boolean) => {
    // Show a toast notification when a habit is toggled
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50";
    toast.textContent = `${completed ? "Completed" : "Unmarked"}: ${
      habits.find((h) => h.id === id)?.name
    }`;

    // Add animation classes
    toast.style.animation = "fadeInOut 3s ease-in-out forwards";

    // Add the animation keyframes if they don't exist
    if (!document.getElementById("toast-animation")) {
      const style = document.createElement("style");
      style.id = "toast-animation";
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `;
      document.head.appendChild(style);
    }

    // Add to DOM and remove after animation completes
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
    console.log(`Habit ${id} toggled: ${completed}`);
  };

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const newHabit = {
        id: `habit-${Date.now()}`,
        name: habitName,
        streakCount: 0,
      };
      setHabits([...habits, newHabit]);
      setHabitName("");
    }
  };

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "habits"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("habits")}
          >
            Habits
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "reminders"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("reminders")}
          >
            Reminders
          </button>
        </div>

        {activeTab === "habits" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Today's Habits</h2>

            <form onSubmit={addHabit} className="mb-6 flex">
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Add a new habit..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors"
              >
                Add
              </button>
            </form>

            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {habits.map((habit) => (
                <motion.div key={habit.id} variants={itemVariants}>
                  <Habit
                    id={habit.id}
                    name={habit.name}
                    streakCount={habit.streakCount}
                    onToggle={handleHabitToggle}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {activeTab === "reminders" && <Reminder habits={habits} />}
      </motion.div>

      {activeTab === "habits" && (
        <div className="hidden md:block">
          <Reminder habits={habits} />
        </div>
      )}
    </div>
  );
}
