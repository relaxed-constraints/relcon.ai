/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./content/**/*.html",
    "./themes/relcon-theme/layouts/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors (swap via CSS custom properties)
        'dark': 'var(--c-bg)',
        'dark-surface': 'var(--c-surface)',
        'dark-border': 'var(--c-border)',
        'off-white': 'var(--c-text)',

        // Theme-aware accents (slightly darker in light mode for contrast)
        'accent': 'var(--c-accent)',
        'accent-light': 'var(--c-accent-light)',
        'accent-dark': 'var(--c-accent-dark)',

        // Secondary teal tones
        'teal-light': '#5eead4',
        'teal-muted': '#2dd4bf',

        // Neutrals — theme-aware
        'white': '#ffffff',
        'gray-100': '#f0f0f5',
        'gray-200': 'var(--c-gray-200)',
        'gray-300': 'var(--c-gray-300)',
        'gray-400': 'var(--c-gray-400)',
        'gray-500': 'var(--c-gray-500)',
        'gray-600': 'var(--c-gray-600)',

        // Static grays (used only in syntax highlighting CSS)
        'gray-700': '#2a2a3a',
        'gray-800': '#1a1a28',
        'gray-900': '#0f0f18',
      },
    },
  },
  plugins: [],
}
