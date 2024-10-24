import { nextui } from '@nextui-org/react'
import { Config } from 'tailwindcss'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'tw-dark': 'var(--dark)',
				'tw-gray': 'var(--gray)',
				'tw-blue': 'var(--blue)',
			},
			boxShadow: {
				input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
			},
		},
	},
	plugins: [
		addVariablesForColors,
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#6b8afd',
							foreground: '#ffffff',
						},
						focus: '#7492fc',
					},
				},
			},
		}),
	],
}

function addVariablesForColors({ addBase, theme }: PluginAPI) {
	const allColors = flattenColorPalette(theme('colors'))
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	) as unknown as string[]

	addBase({
		':root': newVars,
	})
}

export default config
