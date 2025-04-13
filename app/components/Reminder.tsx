"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { XIcon } from "./Icons";

type Reminder = {
  id: string;
  habitId: string;
  habitName: string;
  time: string;
  active: boolean;
};

type ReminderProps = {
  habits: { id: string; name: string }[];
};

export default function Reminder({ habits }: ReminderProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedHabit, setSelectedHabit] = useState("");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [showForm, setShowForm] = useState(false);

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHabit) {
      const habit = habits.find((h) => h.id === selectedHabit);
      if (habit) {
        const newReminder = {
          id: `reminder-${Date.now()}`,
          habitId: selectedHabit,
          habitName: habit.name,
          time: reminderTime,
          active: true,
        };
        setReminders([...reminders, newReminder]);
        setSelectedHabit("");
        setReminderTime("08:00");
        setShowForm(false);
      }
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, active: !reminder.active }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hoursNum = parseInt(hours);
    return `${hoursNum % 12 || 12}:${minutes} ${hoursNum >= 12 ? "PM" : "AM"}`;
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daily Reminders</h2>
        <motion.button
          className="bg-primary text-white p-2 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕" : "+"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            className="mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
            onSubmit={addReminder}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Habit</label>
                <select
                  value={selectedHabit}
                  onChange={(e) => setSelectedHabit(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                  required
                >
                  <option value="">Select a habit</option>
                  {habits.map((habit) => (
                    <option key={habit.id} value={habit.id}>
                      {habit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  className="mr-2 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-primary text-white rounded-lg"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {reminders.length > 0 ? (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={reminder.active}
                  onChange={() => toggleReminder(reminder.id)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <div>
                  <p
                    className={`font-medium ${
                      !reminder.active ? "text-gray-400" : ""
                    }`}
                  >
                    {reminder.habitName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(reminder.time)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <XIcon />
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No reminders set. Add one to get started!
        </p>
      )}
    </motion.div>
  );
}
