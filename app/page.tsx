"use client";

import { useState } from "react";
import HabitDashboard from "./components/HabitDashboard";
import Header from "./components/Header";
import MonthGrid from "./components/MonthGrid";
import MoodSummary from "./components/MoodSummary";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const year =
        prevMonth.getMonth() === 0
          ? prevMonth.getFullYear() - 1
          : prevMonth.getFullYear();
      const month = prevMonth.getMonth() === 0 ? 11 : prevMonth.getMonth() - 1;
      return new Date(year, month, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const year =
        prevMonth.getMonth() === 11
          ? prevMonth.getFullYear() + 1
          : prevMonth.getFullYear();
      const month = prevMonth.getMonth() === 11 ? 0 : prevMonth.getMonth() + 1;
      return new Date(year, month, 1);
    });
  };

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <Header
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1">
          <HabitDashboard />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Monthly Calendar</h2>
            <MonthGrid currentMonth={currentMonth} />
          </div>

          <MoodSummary />
        </div>
      </div>
    </main>
  );
}
