import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        brutal: "4px 4px black",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
