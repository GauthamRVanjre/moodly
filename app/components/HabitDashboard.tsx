"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { initialHabits } from "../constants/constant";
import Habit from "./Habit";

export default function HabitDashboard() {
  const [habits, setHabits] = useState(initialHabits);
  const [habitName, setHabitName] = useState("");
  // const [activeTab, setActiveTab] = useState<"habits" | "reminders">("habits");

  const handleHabitToggle = (id: string, completed: boolean) => {
    if (!completed) {
      toast.success("Daily Habit challenge completed!", {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {
          backgroundColor: "#8b5cf6",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        },

        icon: "👏",
      });
    }
  };

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const newHabit = {
        id: `habit-${Date.now()}`,
        name: habitName,
        streakCount: 0,
      };
      setHabits([newHabit, ...habits]);
      setHabitName("");
      toast.success("Habit added successfully!", {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {
          backgroundColor: "#8b5cf6",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        },

        icon: "👏",
      });
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
        <>
          <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>

          <form onSubmit={addHabit} className="mb-6 flex">
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Add a new habit..."
              className="md:w-1/2 flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
      </motion.div>
    </div>
  );
}
