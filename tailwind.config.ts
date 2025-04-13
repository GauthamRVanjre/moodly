import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        happy: "var(--happy)",
        sad: "var(--sad)",
        angry: "var(--angry)",
        neutral: "var(--neutral)",
        excited: "var(--excited)",
        love: "var(--love)",
        tired: "var(--tired)",
      },
    },
  },
  plugins: [],
};
export default config;
