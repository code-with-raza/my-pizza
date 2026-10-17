/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F5B800',
          'yellow-light': '#FFD84D',
          'yellow-dark': '#C99600',
          red: '#C0392B',
          'red-light': '#E74C3C',
          'red-dark': '#922B21',
          green: '#1A4731',
          'green-light': '#2ECC71',
          black: '#0e0c0c',
          cream: '#FDF8F0',
          orange: '#E67E22',
          warm: '#1a1614',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.92)' }, to: { opacity: 1, transform: 'scale(1)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
        shimmer: { from: { backgroundPosition: '200% center' }, to: { backgroundPosition: '-200% center' } },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.7)',
        'glow-yellow': '0 0 24px rgba(245,184,0,0.35)',
        'glow-red': '0 0 24px rgba(192,57,43,0.4)',
        'glow-xl': '0 0 60px rgba(245,184,0,0.2)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'warm-dark': 'linear-gradient(135deg, #1a1614 0%, #0e0c0c 100%)',
        'hero-gradient': 'linear-gradient(105deg, #0e0c0c 0%, #1a0a08 40%, #2a0f0a 60%, #0e0c0c 100%)',
        'red-fade': 'linear-gradient(to right, #C0392B, #E67E22)',
        'yellow-fade': 'linear-gradient(to right, #F5B800, #E67E22)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
