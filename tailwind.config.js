/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-shift': 'gradientShift 10s ease-in-out infinite',
        'gradient-shift-reverse': 'gradientShiftReverse 12s ease-in-out infinite',
        'particle-float': 'particleFloat 6s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
        'spin-slow-reverse': 'spinSlowReverse 20s linear infinite',
        'wave': 'wave 10s ease-in-out infinite',
        'wave-reverse': 'waveReverse 12s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'scan-horizontal': 'scanHorizontal 6s ease-in-out infinite',
        'slide-down': 'slideDown 8s ease-in-out infinite',
        'flow-wave': 'flowWave 10s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'text-reveal': 'textReveal 1s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s ease-out forwards',
        'float-card': 'floatCard 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) translateX(10px) rotate(5deg)' },
          '66%': { transform: 'translateY(-10px) translateX(-10px) rotate(-5deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translate(20px, -20px) rotate(3deg)', opacity: '0.35' },
        },
        gradientShiftReverse: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translate(-20px, 20px) rotate(-3deg)', opacity: '0.35' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.4' },
          '50%': { transform: 'translateY(-25px) translateX(15px)', opacity: '0.7' },
        },
        orbit: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg) translateY(-120px)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg) translateY(-120px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinSlowReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.4' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)', opacity: '0.5' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)', opacity: '0.35' },
        },
        waveReverse: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.35' },
          '33%': { transform: 'translate(-40px, 30px) scale(1.08)', opacity: '0.45' },
          '66%': { transform: 'translate(25px, -25px) scale(0.92)', opacity: '0.3' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.2' },
          '50%': { transform: 'translateX(0)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0.2' },
        },
        scanHorizontal: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(50%)', opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' },
        },
        flowWave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)', opacity: '1' },
          '50%': { transform: 'translateX(-10px) translateY(-5px)', opacity: '0.7' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        textReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floatCard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      }
    },
  },
  plugins: [],
}