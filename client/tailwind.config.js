/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#1DA57A'
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}

