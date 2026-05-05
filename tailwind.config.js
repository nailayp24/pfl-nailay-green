/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DEE33E',    // S1
        secondary: '#9FA324',  // S2
        neutralDark: '#000000',// S3
        greyscale50: '#F9FAFB', // Warna fill input field
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'component': '8px', // Corner radius anatomi komponen
      }
    },
  },
  plugins: [],
}