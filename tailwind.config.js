/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        'main-orange': '#ee4d2d',
        'main-black': '#555',
        'color-footer-1': 'rgba(0,0,0,.65)',
        'color-footer-2': 'rgba(0,0,0,.54)',
        footer: '#f5f5f5',
        'gray-1': '#ccc',
        'gray-text': 'rgba(0,0,0,.26)',
        'error-input': '#fff6f7',
        'error-box': '#ff424f',
        'contain-gray': '#f5f5f5'
      },
      boxShadow: {
        'img-footer': '0 1px 1px rgba(0,0,0,.2)'
      },
      backgroundImage: {
        'register-img': "url('assets/images/background-register.png')"
      },
      fontSize: {
        sm: '0.8125rem'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.6xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
