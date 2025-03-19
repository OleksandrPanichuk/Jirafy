import { heroui } from '@heroui/react'
import fluid, { extract, fontSize, screens } from 'fluid-tailwind'
import { Config } from 'tailwindcss'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
	// content: [
	// 	'./src/**/*.{js,ts,jsx,tsx,mdx}',
	// 	'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	// ],
	content: {
		files: [
			'./src/**/*.{js,ts,jsx,tsx,mdx}',
			'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
		],
		extract
	},
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				xs: '27.5rem',
				...screens
			},
			fontSize,
			colors: {
				'tw-dark': 'var(--dark)',
				'tw-gray': 'var(--gray)',
				'tw-blue': 'var(--blue)',
				'tw-bg-100': 'var(--bg-100)',
				'tw-bg-90': 'var(--bg-90)',
				'tw-bg-80': 'var(--bg-80)',
				'tw-border-100': 'var(--border-100)',
				'tw-border-200': 'var(--border-200)',
				'tw-border-300': 'var(--border-300)',
				'tw-border-400': 'var(--border-400)',
				'tw-primary-10': 'var(--primary-10)',
				'tw-primary-20': 'var(--primary-20)',
				'tw-primary-30': 'var(--primary-30)',
				'tw-primary-40': 'var(--primary-40)',
				'tw-primary-50': 'var(--primary-50)',
				'tw-primary-60': 'var(--primary-60)',
				'tw-primary-70': 'var(--primary-70)',
				'tw-primary-80': 'var(--primary-80)',
				'tw-primary-90': 'var(--primary-90)',
				'tw-primary-100': 'var(--primary-100)',
				'tw-primary-200': 'var(--primary-200)',
				'tw-primary-300': 'var(--primary-300)',
				'tw-primary-400': 'var(--primary-400)',
				'tw-primary-500': 'var(--primary-500)',
				'tw-primary-600': 'var(--primary-600)',
				'tw-primary-700': 'var(--primary-700)',
				'tw-primary-800': 'var(--primary-800)',
				'tw-primary-900': 'var(--primary-900)',
				'tw-text-100': 'var(--text-100)',
				'tw-text-200': 'var(--text-200)',
				'tw-text-300': 'var(--text-300)',
				'tw-text-350': 'var(--text-350)',
				'tw-text-400': 'var(--text-400)',
				'tw-scrollbar': 'var(--scrollbar)'
			},
			boxShadow: {
				input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`
			}
		}
	},
	plugins: [
		addVariablesForColors,
		fluid,
		heroui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#3f76ff',
							foreground: '#ffffff'
						},
						content1: {
							DEFAULT: 'rgb(25, 25, 25)'
						}
					}
				}
			}
		})
	]
}

function addVariablesForColors({ addBase, theme }: PluginAPI) {
	const allColors = flattenColorPalette(theme('colors'))
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	) as unknown as string[]

	addBase({
		':root': newVars
	})
}

export default config
