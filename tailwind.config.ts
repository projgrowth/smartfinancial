import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				xs: '360px'
			},
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
				charcoal: {
					DEFAULT: 'hsl(var(--charcoal))',
					light: 'hsl(var(--charcoal-light))',
					dark: 'hsl(var(--charcoal-dark))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					light: 'hsl(var(--gold-light))',
					dark: 'hsl(var(--gold-dark))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['"Space Grotesk"', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					from: { opacity: '1', transform: 'translateY(0)' },
					to: { opacity: '0', transform: 'translateY(8px)' }
				},
				'slide-in': {
					from: { opacity: '0', transform: 'translateX(-15px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					from: { opacity: '0', transform: 'translateX(15px)' },
					to: { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(15px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.97)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'scale-out': {
					from: { opacity: '1', transform: 'scale(1)' },
					to: { opacity: '0', transform: 'scale(0.97)' }
				},
				'typing': {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'blink': {
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'currentColor' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-fade': {
					'0%': { opacity: '0', transform: 'scale(0.8) translateY(8px)' },
					'70%': { opacity: '1', transform: 'scale(1.03) translateY(-3px)' },
					'100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
				'bg-pulse': {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '0.8' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'border-pulse': {
					'0%, 100%': { borderColor: 'hsl(var(--accent) / 0.3)' },
					'50%': { borderColor: 'hsl(var(--accent) / 0.8)' },
				},
				'soft-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'glow-pulse': {
					'0%': { boxShadow: '0 0 20px rgba(var(--primary), 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(var(--primary), 0.6), 0 0 60px rgba(var(--primary), 0.4)' },
					'100%': { boxShadow: '0 0 20px rgba(var(--primary), 0.3)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out forwards',
				'fade-out': 'fade-out 0.4s ease-out forwards',
				'slide-in': 'slide-in 0.5s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'scale-out': 'scale-out 0.3s ease-out forwards',
				'typing': 'typing 2s steps(25, end)',
				'blink': 'blink 0.75s step-end infinite',
				'float': 'float 6s ease-in-out infinite',
				'bounce-fade': 'bounce-fade 0.5s ease-out forwards',
				'fadeIn': 'fade-in 0.5s ease-out forwards',
				'fadeInSlow': 'fade-in 0.8s ease-out forwards',
				'slideInRight': 'slide-in-right 0.5s ease-out forwards',
				'slideInLeft': 'slide-in 0.5s ease-out forwards',
				'scaleIn': 'scale-in 0.3s ease-out forwards',
				'bounceFade': 'bounce-fade 0.5s ease-out forwards',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'bg-pulse': 'bg-pulse 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'border-pulse': 'border-pulse 2s ease-in-out infinite',
				'soft-spin': 'soft-spin 15s linear infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
