// Mock data for habits
export type HabitType = {
  id: string;
  name: string;
  streakCount: number;
  completed: boolean;
};

export const HABITS = "Habits";

export const initialHabits: HabitType[] = [
  { id: "1", name: "Drink 2L of water", streakCount: 5, completed: false },
  {
    id: "2",
    name: "Meditate for 10 minutes",
    streakCount: 12,
    completed: false,
  },
  { id: "3", name: "Read for 30 minutes", streakCount: 3, completed: false },
  { id: "4", name: "Take a walk", streakCount: 0, completed: false },
  { id: "5", name: "Practice gratitude", streakCount: 7, completed: false },
];

export type Mood = {
  emoji: string;
  name: string;
};

export const moods: Mood[] = [
  { emoji: "😊", name: "happy" },
  { emoji: "😢", name: "sad" },
  { emoji: "😡", name: "angry" },
  { emoji: "😐", name: "neutral" },
  { emoji: "🤩", name: "excited" },
  { emoji: "❤️", name: "love" },
  { emoji: "😴", name: "tired" },
];

export type DayTileProps = {
  day: number;
  month: number;
  year: number;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
};
