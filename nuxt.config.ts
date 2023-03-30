// nuxt.config.ts
import eslintPlugin from 'vite-plugin-eslint'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
	ssrLog: true,
	components: true,
	target: 'server',
	head: {
		title: 'QH',
		htmlAttrs: {
		  lang: 'en'
		},
		meta: [
		  { charset: 'utf-8' },
		  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
		  { hid: 'description', name: 'description', content: '' },
		  { name: 'format-detection', content: 'telephone=no' }
		]
	},
	css: [
		'@/scss/application.scss'
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
		}]
	],
	buildModules: ['@nuxt/typescript-build'],
	typescript: {
		typeCheck: true
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
	}
}

export default config