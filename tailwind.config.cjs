/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      backgroundImage: {
        'diagonal-lines':
          'repeating-linear-gradient(-45deg, hsl(var(--background)), hsl(var(--border)) 1px, hsl(var(--background)) 1px, hsl(var(--background)) 8px)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { 
            height: 0,
            opacity: 0,
            transform: 'translateY(-10px)'
          },
          to: { 
            height: 'var(--radix-accordion-content-height)',
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        'accordion-up': {
          from: { 
            height: 'var(--radix-accordion-content-height)',
            opacity: 1,
            transform: 'translateY(0)'
          },
          to: { 
            height: 0,
            opacity: 0,
            transform: 'translateY(-10px)'
          }
        },
        'pulse-slow-left': {
          '0%, 100%': { transform: 'translate(-10%, -10%) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translate(10%, 10%) scale(1.1)', opacity: '0.6' }
        },
        'pulse-slow-right': {
          '0%, 100%': { transform: 'translate(10%, 10%) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translate(-10%, -10%) scale(1.1)', opacity: '0.6' }
        },
        'pan': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1'
          },
          '20%,50%': {
            opacity: '0'
          }
        },
        'collapsible-down': {
          from: {
            height: '0',
            opacity: '0'
          },
          to: {
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1'
          }
        },
        'collapsible-up': {
          from: {
            height: 'var(--radix-collapsible-content-height)',
            opacity: '1'
          },
          to: {
            height: '0',
            opacity: '0'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-5px)'
          }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'accordion-up': 'accordion-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow-left': 'pulse-slow-left 15s infinite ease-in-out',
        'pulse-slow-right': 'pulse-slow-right 15s infinite ease-in-out',
        'pan': 'pan 2s ease-in-out infinite alternate',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'slideIn': 'slideIn 0.3s ease-in-out',
        'bounce': 'bounce 0.6s ease-in-out',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
