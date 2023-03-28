// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import eslintPlugin from 'vite-plugin-eslint';

export default defineNuxtConfig({
	vite: {
		plugins: [
			eslintPlugin()
		]
	},
	modules: [
		'@nuxtjs/tailwindcss',
	],
	buildModules: [
		['@nuxtjs/eslint-module', {
			fix: true
		}]
	],
	intlify: {
		localeDir: 'lang',
		vueI18n: {
			locale: 'en',
			fallbackLocale: 'en'
		}
	}
})
