import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        yinmn_blue: { DEFAULT: '#3d5a80', '100': '#0c1219', '200': '#192433', '300': '#25364c', '400': '#314866', '500': '#3d5a80', '600': '#5279ab', '700': '#7d9ac0', '800': '#a8bcd5', '900': '#d4ddea' },
        powder_blue: { DEFAULT: '#98c1d9', '100': '#142936', '200': '#28526b', '300': '#3b7ca1', '400': '#61a0c5', '500': '#98c1d9', '600': '#accde0', '700': '#c0d9e8', '800': '#d5e6f0', '900': '#eaf2f7' },
        light_cyan: { DEFAULT: '#e0fbfc', '100': '#095456', '200': '#11a7ad', '300': '#32e5eb', '400': '#88f0f3', '500': '#e0fbfc', '600': '#e5fcfc', '700': '#ecfcfd', '800': '#f2fdfe', '900': '#f9fefe' },
        burnt_sienna: { DEFAULT: '#ee6c4d', '100': '#3a1005', '200': '#74200b', '300': '#ae3010', '400': '#e73f16', '500': '#ee6c4d', '600': '#f28b71', '700': '#f5a895', '800': '#f8c5b8', '900': '#fce2dc' },
        gunmetal: { DEFAULT: '#293241', '100': '#080a0d', '200': '#10141a', '300': '#191e28', '400': '#212835', '500': '#293241', '600': '#485873', '700': '#6a7fa2', '800': '#9ca9c1', '900': '#cdd4e0' },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
