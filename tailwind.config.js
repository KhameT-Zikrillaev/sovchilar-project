/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '50%': { transform: 'translate(-20px, -20px) rotate(180deg) scale(1.2)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg) scale(1)' }
        },
        'float-3d': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate3d(1, 1, 1, 0deg) scale3d(1, 1, 1)' },
          '50%': { transform: 'translate3d(-20px, -20px, 20px) rotate3d(1, 1, 1, 180deg) scale3d(1.2, 1.2, 1.2)' },
          '100%': { transform: 'translate3d(0, 0, 0) rotate3d(1, 1, 1, 360deg) scale3d(1, 1, 1)' }
        },
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.5)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' }
        },
        'scale-up': {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '75%, 100%': { transform: 'scale(2)', opacity: 0 }
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, -10px)' }
        },
        'float-gentle-reverse': {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, 10px)' }
        },
        'float-side': {
          '0%, 100%': { transform: 'translateY(-50%) translateX(0)' },
          '50%': { transform: 'translateY(-50%) translateX(10px)' }
        },
        'float-side-reverse': {
          '0%, 100%': { transform: 'translateY(-50%) translateX(0)' },
          '50%': { transform: 'translateY(-50%) translateX(-10px)' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-3d': 'float-3d 4s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'ping-slow': 'ping-slow 2s ease-in-out infinite',
        'float-gentle': 'float-gentle 3s ease-in-out infinite',
        'float-gentle-reverse': 'float-gentle-reverse 3s ease-in-out infinite',
        'float-side': 'float-side 3s ease-in-out infinite',
        'float-side-reverse': 'float-side-reverse 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
