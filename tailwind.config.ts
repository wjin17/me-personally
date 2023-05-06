import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "brutal-black": "4px 4px black",
        "brutal-white": "4px 4px white",
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
