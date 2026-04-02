/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — dark premium palette
        bg: {
          primary: '#0a0a0f',
          secondary: '#0f0f1a',
          card: '#12121f',
          elevated: '#1a1a2e',
        },
        accent: {
          blue: '#4f8ef7',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          glow: 'rgba(79, 142, 247, 0.15)',
        },
        text: {
          primary: '#f0f0ff',
          secondary: '#9494b8',
          muted: '#5a5a7a',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          active: 'rgba(79,142,247,0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient':
          'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.08) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(262, 96%, 67%, 0.08) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(196, 90%, 49%, 0.06) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,142,247,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(79,142,247,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(79, 142, 247, 0.2)',
        'glow-lg': '0 0 60px rgba(79, 142, 247, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
