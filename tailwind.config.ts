import { Config } from 'tailwindcss';
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px',
				},
			},
			keyframes: {
				'text-marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(var(--x-axis))' },
				},
			},
			animation: {
				'text-marquee': 'text-marquee var(--duration,80s) infinite',
			},
		},
	},
	plugins: [],
} satisfies Config;
