/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Roboto, sans-serif',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
	daisyui: { themes: ['dark'] },
}
