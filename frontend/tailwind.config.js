/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f6",
          100: "#dcefeb",
          500: "#2b9c86",
          600: "#1f7f6d",
          700: "#196658",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
