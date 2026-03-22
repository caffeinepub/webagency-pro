/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background:  'oklch(var(--background) / <alpha-value>)',
        foreground:  'oklch(var(--foreground) / <alpha-value>)',
        card:        { DEFAULT: 'oklch(var(--card) / <alpha-value>)', foreground: 'oklch(var(--card-foreground) / <alpha-value>)' },
        popover:     { DEFAULT: 'oklch(var(--popover) / <alpha-value>)', foreground: 'oklch(var(--popover-foreground) / <alpha-value>)' },
        primary:     { DEFAULT: 'oklch(var(--primary) / <alpha-value>)', foreground: 'oklch(var(--primary-foreground) / <alpha-value>)' },
        secondary:   { DEFAULT: 'oklch(var(--secondary) / <alpha-value>)', foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)' },
        muted:       { DEFAULT: 'oklch(var(--muted) / <alpha-value>)', foreground: 'oklch(var(--muted-foreground) / <alpha-value>)' },
        accent:      { DEFAULT: 'oklch(var(--accent) / <alpha-value>)', foreground: 'oklch(var(--accent-foreground) / <alpha-value>)' },
        destructive: { DEFAULT: 'oklch(var(--destructive) / <alpha-value>)', foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)' },
        border:      'oklch(var(--border) / <alpha-value>)',
        input:       'oklch(var(--input) / <alpha-value>)',
        ring:        'oklch(var(--ring) / <alpha-value>)',
        'vsi-red':     'oklch(var(--vsi-red) / <alpha-value>)',
        'vsi-surface': 'oklch(var(--vsi-dark-surface) / <alpha-value>)',
        'vsi-card':    'oklch(var(--vsi-dark-card) / <alpha-value>)',
        'vsi-hover':   'oklch(var(--vsi-dark-hover) / <alpha-value>)',
        'vsi-muted':   'oklch(var(--vsi-text-muted) / <alpha-value>)',
        'vsi-subtle':  'oklch(var(--vsi-text-subtle) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        condensed: ['Roboto Condensed', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
