"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import DayTile from "./DayTile";

type MonthGridProps = {
  currentMonth: Date;
};

// Helper function to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the day of the week (0-6, where 0 is Sunday)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function MonthGrid({ currentMonth }: MonthGridProps) {
  // Get current date for highlighting today
  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Calculate calendar grid
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Previous month days to show
    const daysFromPrevMonth = firstDayOfMonth;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    // Next month days to show
    const totalDaysToShow = 42; // 6 rows × 7 columns
    const daysFromNextMonth = totalDaysToShow - daysInMonth - daysFromPrevMonth;

    const days = [];

    // Add previous month days
    for (
      let i = daysInPrevMonth - daysFromPrevMonth + 1;
      i <= daysInPrevMonth;
      i++
    ) {
      days.push({
        day: i,
        isCurrentMonth: false,
        month: prevMonth,
        year: prevMonthYear,
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        month,
        year,
      });
    }

    // Add next month days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        month: nextMonth,
        year: nextMonthYear,
      });
    }

    return days;
  }, [currentMonth]);

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="mt-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-500 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <motion.div
          className="grid grid-cols-7 gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {calendarDays.map((day, index) => (
            <motion.div
              key={`${day.year}-${day.month}-${day.day}`}
              variants={itemVariants}
            >
              <DayTile
                day={day.day}
                month={day.month}
                year={day.year}
                isCurrentDay={isToday(day.day) && day.isCurrentMonth}
                isCurrentMonth={day.isCurrentMonth}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
