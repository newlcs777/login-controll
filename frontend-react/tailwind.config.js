/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ⬅️ isso garante que TODAS as páginas recebam Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
