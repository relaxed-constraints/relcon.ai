/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./content/**/*.html",
    "./themes/relcon-theme/layouts/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Base dark palette
        'dark': '#080c14',
        'dark-surface': '#12121a',
        'dark-border': '#1e1e2e',

        // Accent — change these to retheme the whole site
        'accent': '#14b8a6',        // teal-500
        'accent-light': '#2dd4bf',  // teal-400
        'accent-dark': '#0d9488',   // teal-600

        // Secondary accents for gradients
        'cyan': '#06b6d4',
        'violet': '#8b5cf6',

        // Neutrals
        'white': '#ffffff',
        'off-white': '#d0d0dc',
        'gray-100': '#f0f0f5',
        'gray-200': '#d8d8e0',
        'gray-300': '#b0b0be',
        'gray-400': '#8888a0',
        'gray-500': '#606078',
        'gray-600': '#404058',
        'gray-700': '#2a2a3a',
        'gray-800': '#1a1a28',
        'gray-900': '#0f0f18',
      },
    },
  },
  plugins: [],
}
