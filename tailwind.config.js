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
      'font-color3': '#bdbdbdb1',
      'folder-color': '#dfc225'
    },
    extend: {
      spacing: {
        '100vh': '100vh',
        '90vh': '90vh',
        '80vh': '80vh',
        '75vh': '75vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '50vh': '50vh',
        '40vh': '40vh',
        '30vh': '30vh',
        '25vh': '25vh',
        '20vh': '20vh',
        '10vh': '10vh',
        'notif-height': 'calc(100vh - 100px)',
        'notif-bottom': '24px',
        'notif-right': '42px'
      }
    },
  },
  plugins: [],
}

