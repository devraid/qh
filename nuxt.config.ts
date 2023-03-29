// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import eslintPlugin from 'vite-plugin-eslint';

export default defineNuxtConfig({
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
		'@intlify/nuxt3'
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
