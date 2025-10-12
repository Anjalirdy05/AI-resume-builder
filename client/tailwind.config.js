
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { 500:'#3aa6ff', 600:'#1b86df' } },
      boxShadow: { glass: '0 10px 30px rgba(0,0,0,0.10)' },
    }
  },
  plugins: [],
}
