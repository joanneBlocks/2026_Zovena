/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zovena: {
          indigo: '#4F46E5',
          teal: '#14B8A6',
          amber: '#F59E0B',
          coral: '#FB7185',
          bg: '#F9FAFB',
          card: '#FFFFFF',
          textPrimary: '#111827',
          textSecondary: '#6B7280',
          border: '#E5E7EB',
          darkBg: '#0F172A',
          darkCard: '#020617',
          darkTextPrimary: '#E5E7EB',
          darkTextSecondary: '#9CA3AF',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
}