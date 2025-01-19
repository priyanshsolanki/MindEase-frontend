/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-blue": "#001f3f", // Dark navy blue
        "light-blue": "#4FC3F7", // Bright light blue for hover and active states
        "blue-600": "#1D4ED8",
        "red-500": "#DC2626",
        "yellow-500": "#FACC15",
        "green-500": "#16A34A",
      },
    },
  },
  plugins: [],
}

