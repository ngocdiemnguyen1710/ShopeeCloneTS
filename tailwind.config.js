/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-orange': '#ee4d2d',
        'color-footer-1': 'rgba(0,0,0,.65)',
        'color-footer-2': 'rgba(0,0,0,.54)',
        footer: '#f5f5f5',
        'gray-1': '#ccc',
        'gray-text': 'rgba(0,0,0,.26)'
      },
      boxShadow: {
        'img-footer': '0 1px 1px rgba(0,0,0,.2)'
      },
      backgroundImage: {
        'register-img': "url('assets/images/background-register.png')"
      }
    }
  },
  plugins: []
}
