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
				navy: {
					DEFAULT: '#112240',
					light: '#233554',
					dark: '#0a192f',
					50: '#E7ECF2',
					100: '#C3D0E1',
					200: '#9CB1CB',
					300: '#7491B5',
					400: '#557AA5',
					500: '#3A659A'
				},
				slate: {
					DEFAULT: '#8892B0',
					light: '#a8b2d1',
					lightest: '#ccd6f6',
					50: '#F8F9FC',
					100: '#EEF1F8',
					200: '#DCE0EE',
					300: '#C6CCE3',
					400: '#B1B9D8'
				},
				blue: {
					DEFAULT: '#3B82F6',
					light: '#60A5FA',
					dark: '#2563EB',
					50: '#EFF6FF',
					100: '#DBEAFE',
					200: '#BFDBFE',
					300: '#93C5FD',
					400: '#60A5FA',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8',
					800: '#1E40AF',
					900: '#1E3A8A'
				},
				charcoal: {
					DEFAULT: '#1F2937',
					light: '#374151',
					dark: '#111827',
					50: '#E5E7EB',
					100: '#D1D5DB',
					200: '#9CA3AF',
					300: '#6B7280',
					400: '#4B5563'
				},
				offwhite: {
					DEFAULT: '#f8f8f8',
					50: '#FFFFFF',
					100: '#FAFAFA',
					200: '#F3F3F3',
					300: '#EBEBEB',
					400: '#E1E1E1'
				},
				amber: {
					light: '#FEF3C7',
					DEFAULT: '#F59E0B',
					dark: '#D97706',
					50: '#FFFBEB',
					100: '#FEF3C7',
					200: '#FDE68A',
					300: '#FCD34D',
					400: '#FBBF24'
				},
				gold: {
					DEFAULT: 'hsl(45 90% 57%)',
					light: 'hsl(45 92% 72%)',
					dark: 'hsl(45 90% 48%)',
					50: 'hsl(45 100% 96%)',
					100: 'hsl(45 95% 90%)',
					200: 'hsl(45 95% 80%)',
					300: 'hsl(45 92% 70%)',
					400: 'hsl(45 92% 62%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				neue: ['"Neue Haas Grotesk"', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
				heading: ['"Space Grotesk"', 'sans-serif'],
				work: ['"Work Sans"', 'sans-serif']
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
					'0%, 100%': { borderColor: 'rgba(230, 198, 131, 0.3)' },
					'50%': { borderColor: 'rgba(230, 198, 131, 0.8)' },
				},
				'soft-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
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
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
