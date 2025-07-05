/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#4B5563",
        accent: "#3B82F6",
        "accent-dark": "#2563EB",
        "atku-brand": "#3B82F6", // You can change this to your brand color
      },
    },
  },
  plugins: [],
}
