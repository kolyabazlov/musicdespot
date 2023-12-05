import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '360px',
      md: '600px',
      lg: '1200px',
      xl: '1440px'
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF'
    },
    extend: {
      zIndex: {
        100: '100'
      },
    }
  }
}
export default config
