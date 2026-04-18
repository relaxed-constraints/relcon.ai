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
        // Theme-aware surfaces (swap via CSS custom properties)
        'dark': 'var(--c-bg)',
        'dark-surface': 'var(--c-surface)',
        'dark-border': 'var(--c-border)',
        'off-white': 'var(--c-text)',

        // Accents
        'accent': 'var(--c-accent)',
        'accent-light': 'var(--c-accent-light)',
        'accent-dark': 'var(--c-accent-dark)',

        // Neutrals — theme-aware ink tiers
        'white': '#ffffff',
        'gray-100': 'var(--c-gray-200)',
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
      fontFamily: {
        'mono': ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
