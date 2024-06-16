/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/src/**/*.{html,svelte}"],
  theme: {
    colors: {
      'transparent': 'transparent',
      'background': '#282828',
      'background2': '#343434',
      'background3': '#4D4D4D',
      'background4': '#3E3E3E',
      'blue': '#319CFF',
      'blue-btn': '#1D619F',
      'green': '#69FF66',
      'yellow': '#FAFF00',
      'red': '#ff3216',
      'font-color': '#E2E2E2',
      'font-color2': '#BDBDBD',
      'folder-color': '#dfc225'
    },
    extend: {
      spacing: {
        'notif-bottom': '24px',
        'notif-right': '42px'
      }
    },
  },
  plugins: [],
}

