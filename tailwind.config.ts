import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "brutal-black": "3px 3px black",
        "brutal-white": "3px 3px white",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
