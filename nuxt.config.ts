// nuxt.config.ts
import eslintPlugin from 'vite-plugin-eslint'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
	ssr: true,
	components: true,
	target: 'server',
	app: {
		rootId: '__app',
		head: {
			title: 'QH',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: '' },
				{ name: 'format-detection', content: 'telephone=no' },
			],
		},
	},
	css: ['@/assets/scss/application.scss'],
	vite: {
		plugins: [eslintPlugin()],
	},
	modules: [
		'@nuxtjs/i18n',
		'@nuxtjs/tailwindcss',
		[
			'@nuxtjs/eslint-module',
			{
				fix: true,
				lintOnStart: false,
			},
		],
		'nuxt-icons',
	],
	buildModules: ['@nuxt/typescript-build'],
	nuxtIcon: {
		size: '24px', // default <Icon> size applied
		class: 'nux-icon', // default <Icon> class applied
		aliases: {
			nuxt: 'logos:nuxt-icon',
		},
	},
	typescript: {
		typeCheck: true,
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	imports: {
		autoImport: true,
	},
	i18n: {
		vueI18n: './i18n.config.ts', // if you are using custom path, default
	},
}

export default config
