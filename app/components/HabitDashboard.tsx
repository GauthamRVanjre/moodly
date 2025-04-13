"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HABITS, HabitType, initialHabits } from "../constants/constant";
import Habit from "./Habit";

export default function HabitDashboard() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [habitName, setHabitName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const loadHabits = () => {
      const storedHabits = JSON.parse(localStorage.getItem("Habits") || "[]");
      if (storedHabits.length > 0) {
        setHabits(storedHabits);
      } else {
        // If no habits in localStorage, use initialHabits and save them
        setHabits(initialHabits);
        localStorage.setItem(HABITS, JSON.stringify(habits));
      }
      setIsLoading(false);
    };

    loadHabits();
  }, []);

  const handleHabitToggle = (id: string, completed: boolean) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const dateString = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // Find the habit
    console.log("habits", habits);
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      // Save habit completion status to localStorage for today
      console.log("save habits", habit);
      localStorage.setItem(HABITS, JSON.stringify(habits));

      if (!completed) {
        toast.success("Daily Habit challenge completed!", {
          duration: 4000,
          position: "top-center",
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
    }
  };

  const handleStreakUpdate = (id: string, newStreak: number) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id ? { ...habit, streakCount: newStreak } : habit
    );
    console.log("updated habits", updatedHabits);
    setHabits(updatedHabits);
    localStorage.setItem(HABITS, JSON.stringify(habits));
  };

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const newHabit = {
        id: `habit-${Date.now()}`,
        name: habitName,
        streakCount: 0,
      };
      const updatedHabits = [{ ...newHabit, completed: false }, ...habits];
      setHabits(updatedHabits);
      localStorage.setItem(HABITS, JSON.stringify(updatedHabits));
      setHabitName("");

      toast.success("Habit added successfully!", {
        duration: 4000,
        position: "top-center",
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

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex justify-center items-center h-40">
        <div className="animate-pulse text-primary font-medium">
          Loading habits...
        </div>
      </div>
    );
  }

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
                  onStreakUpdate={handleStreakUpdate}
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      </motion.div>
    </div>
  );
}
