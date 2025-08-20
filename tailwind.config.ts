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
				lunar: {
					primary: 'hsl(var(--lunar-primary))',
					glow: 'hsl(var(--lunar-glow))',
					surface: 'hsl(var(--lunar-surface))',
					shadow: 'hsl(var(--lunar-shadow))'
				},
				beauty: {
					cut: 'hsl(var(--beauty-cut))',
					color: 'hsl(var(--beauty-color))',
					wax: 'hsl(var(--beauty-wax))',
					treat: 'hsl(var(--beauty-treat))'
				},
				badge: {
					excellent: 'hsl(var(--badge-excellent))',
					good: 'hsl(var(--badge-good))',
					neutral: 'hsl(var(--badge-neutral))',
					'not-ideal': 'hsl(var(--badge-not-ideal))',
					avoid: 'hsl(var(--badge-avoid))'
				},
				advice: {
					excellent: 'hsl(var(--advice-excellent))',
					good: 'hsl(var(--advice-good))',
					neutral: 'hsl(var(--advice-neutral))',
					'not-ideal': 'hsl(var(--advice-not-ideal))',
					avoid: 'hsl(var(--advice-avoid))'
				}
			},
			backgroundImage: {
				'gradient-lunar': 'var(--gradient-lunar)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-beauty': 'var(--gradient-beauty)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'lunar': 'var(--shadow-lunar)',
				'glow': 'var(--shadow-glow)',
				'soft': 'var(--shadow-soft)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
