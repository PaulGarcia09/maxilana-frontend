const plugin = require('tailwindcss/plugin');
const pluginLineClamp = require('@tailwindcss/line-clamp');
const pluginTypography = require('@tailwindcss/typography');
const pluginAspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['ui-serif', 'Georgia', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
    fontSize: {
      xxs: ['10px', '12px'],
      xs: ['12px', '20px'],
      sm: ['14px', '24px'],
      base: ['16px', '28px'],
      lg: ['20px', '28px'],
      xl: ['24px', '29px'],
      '2xl': ['34px', '41px'],
      '3xl': ['48px', '58px'],
      '4xl': ['60px', '72px'],
      '5xl': ['96px', '116px'],
    },
    textColor: {
      white: '#FFFFFF',
      primary: '#000F34',
      secondary: '#000F348A',
      disabled: '#0000003D',
      danger: '#EF3A3ADE',
      price: '#1E83E1',
      discount: '#C4C9CE',
      brand: {
        DEFAULT: '#005198',
        dark: '#0E5290',
        darker: '#0B477D',
      },
      accent: {
        light: '#FFF8D3',
        DEFAULT: '#FDDA2A',
        dark: '#F0CE21',
      },
    },
    borderRadius: {
      sm: '8px',
      DEFAULT: '24px',
      full: '9999px',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      textColor: {
        white: '#FFFFFF',
        primary: '#000F34',
        secondary: '#000F348A',
        disabled: '#0000003D',
        price: '#1E83E1',
        discount: '#C4C9CE',
        link: '#1E83E1',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fff',
        accent: {
          light: '#FFF8D3',
          DEFAULT: '#FDDA2A',
          dark: '#F0CE21',
        },
        brand: {
          DEFAULT: '#005198',
          dark: '#0E5290',
          darker: '#0B477D',
        },
        surface: {
          light: '#F0F6FB',
          DEFAULT: '#F4F5FB',
          dark: '#EBF1F6',
        },
        'action-primary': '#1E83E1',
        'action-primary-light': '#C9E5FF',
        'action-secondary': '#1978D0',
        'action-critical': '#EF3A3ADE',
        primary: {
          DEFAULT: '#1E83E1',
          light: '#C9E5FF',
        },
        secondary: '#1978D0',
        critical: '#EF3A3ADE',
        whatsapp: '#0BBF69',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    pluginLineClamp,
    pluginTypography,
    pluginAspectRatio,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
