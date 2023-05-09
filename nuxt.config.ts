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
		  lang: 'en'
			},
			meta: [
		  { charset: 'utf-8' },
		  { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1' },
		  { hid: 'description', name: 'description', content: '' },
		  { name: 'format-detection', content: 'telephone=no' }
			]
		}
	},
	css: [
		'@/assets/scss/application.scss'
	],
	vite: {
		plugins: [
			eslintPlugin()
		]
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@intlify/nuxt3',
		['@nuxtjs/eslint-module', {
			fix: true,
			lintOnStart: false
		}],
		'nuxt-icons'
	],
	buildModules: ['@nuxt/typescript-build'],
	nuxtIcon: {
		size: '24px', // default <Icon> size applied
		class: 'nux-icon', // default <Icon> class applied
		aliases: {
		  'nuxt': 'logos:nuxt-icon',
		}
	  },
	typescript: {
		typeCheck: true,
	},
	intlify: {
		localeDir: 'lang',
		vueI18n: {
			legacy: false,
			globalInjection: true,
			locale: 'en',
			fallbackLocale: 'en',
			fallbackWarn: false
		}
	},
	postcss: {
		plugins: {
		  tailwindcss: {},
		  autoprefixer: {},
		},
	},
	imports: {
		autoImport: true
	}
}

export default config