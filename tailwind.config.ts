
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
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Montserrat', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New custom color palette based on the image
				navy: {
					50: '#e6edf0',
					100: '#ccdbe1',
					200: '#99b8c3',
					300: '#6694a5',
					400: '#337086',
					500: '#004d68',
					600: '#003e53',
					700: '#002e3f',
					800: '#001f2a',
					900: '#001015',
				},
				lightblue: {
					50: '#f2faff',
					100: '#e6f4fe',
					200: '#cce9fd',
					300: '#9bd1f2',
					400: '#6bb9e8',
					500: '#3aa1de',
					600: '#2e81b1',
					700: '#226085',
					800: '#174058',
					900: '#0b202c',
				},
				orange: {
					50: '#fff8f0',
					100: '#fff1e0',
					200: '#ffe3c2',
					300: '#ffcf9a',
					400: '#ffb56b',
					500: '#ff9b3d',
					600: '#cc7c31',
					700: '#995d25',
					800: '#663e18',
					900: '#331f0c',
				},
				beige: {
					50: '#fffbf8',
					100: '#fef7f0',
					200: '#fdf0e3',
					300: '#faeee0',
					400: '#f6e3d1',
					500: '#f2d8c3',
					600: '#c2ad9c',
					700: '#918275',
					800: '#61574e',
					900: '#302b27',
				},
				// MedFlow specific colors (updated to match new palette)
				medflow: {
					50: '#e6edf0',
					100: '#ccdbe1',
					200: '#99b8c3',
					300: '#6694a5',
					400: '#337086',
					500: '#004d68',
					600: '#003e53',
					700: '#002e3f',
					800: '#001f2a',
					900: '#001015',
				},
				clinical: {
					light: '#9bd1f2',
					DEFAULT: '#3aa1de',
					dark: '#002e3f',
				},
				success: {
					light: '#e6faf0',
					DEFAULT: '#10b981',
					dark: '#065f46',
				},
				warning: {
					light: '#fff1e0',
					DEFAULT: '#ffb56b',
					dark: '#cc7c31',
				},
				danger: {
					light: '#fee2e2',
					DEFAULT: '#ef4444',
					dark: '#991b1b',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(58, 161, 222, 0.5)',
					},
					'50%': {
						boxShadow: '0 0 15px rgba(58, 161, 222, 0.8), 0 0 5px rgba(58, 161, 222, 0.3)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
