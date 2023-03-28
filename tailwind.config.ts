// tailwind.config.ts
import { Config } from 'tailwindcss';

export default <Config> <unknown>{
	content: [
		'./components/**/*.{js,ts,jsx,tsx,vue}',
		'./pages/**/*.{js,ts,jsx,tsx,vue}',
	],
	theme: {
		container: false,
		extend: {},
	},
	plugins: [],
}