const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      colors: {
        tremor: {
        // brand: {
        //   faint: colors.blue[50],
        //   muted: colors.blue[200],
        //   subtle: colors.blue[400],
        //   DEFAULT: colors.blue[500],
        //   emphasis: colors.blue[700],
        //   inverted: colors.white,
        // },
        background: {
          muted: "hsl(var(--background))",
          subtle: "hsl(var(--accent))",
          DEFAULT: "hsl(var(--muted-foreground))",
          emphasis: "hsl(var(--foreground))",
        },
        // content: {
        //   subtle: colors.gray[400],
        //   DEFAULT: colors.gray[500],
        //   emphasis: colors.gray[700],
        //   strong: colors.gray[900],
        //   inverted: colors.white,
        // },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          two: "hsl(var(--primary-foreground-2))",
          three: "hsl(var(--primary-foreground-3))"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontSize: {
        xs: ['.75rem', { lineHeight: "16px", letterSpacing: "0.0025em" }],
        sm: ['.875rem', { lineHeight: "20px", letterSpacing: "0em" }],
        base: ['1rem', { lineHeight: "24px", letterSpacing: "0em" }],
        lg: ['1.125rem', { lineHeight: "26px", letterSpacing: "-0.0025em" }],
        xl: ['1.25rem', { lineHeight: "28px", letterSpacing: "-0.005em" }],
        '2xl': ['1.5rem', { lineHeight: "30px", letterSpacing: "-0.00625em" }],
        '3xl': ['1.75rem', { lineHeight: "36px", letterSpacing: "-0.0075em" }],
        '4xl': ['2.1875rem', { lineHeight: "40px", letterSpacing: "-0.01em" }],
        '5xl': ['3.75rem', { lineHeight: "60px", letterSpacing: "-0.025em" }],
        "tremor-label": ['.75rem', { lineHeight: "16px", letterSpacing: "0.0025em" }],
        "tremor-default": ['.875rem', { lineHeight: "20px", letterSpacing: "0em" }],
        "tremor-title": ['1.125rem', { lineHeight: "26px", letterSpacing: "-0.0025em" }],
        "tremor-metric": ['1.75rem', { lineHeight: "36px", letterSpacing: "-0.0075em" }],
      },
      boxShadow: {
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("tailwindcss-animate"), require("@headlessui/tailwindcss")],
}