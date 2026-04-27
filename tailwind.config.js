/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        walnut: '#8f531d',
        caramel: '#c38842',
        honey: '#dfad68',
        wheat: '#f0c173',
        'cream-light': '#ffdba9',
        bg: '#fdf6ec',
        surface: '#f5e9d3',
        panel: '#c9a276',
        ink: '#3d2817',
        'ink-soft': '#5a4128',
        espresso: '#2a1a0d',
        'caramel-deep': '#a06832',
        'honey-deep': '#b8843e',
        'walnut-deep': '#7e5831',
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
