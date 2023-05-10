// .eslintrc.js
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		'vue/setup-compiler-macros': true,
	},
	extends: [
		'plugin:nuxt/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: 'vue-eslint-parser',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
		exclude: ['node_modules'],
	},
	plugins: ['vue', '@typescript-eslint', 'prettier'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'nuxt/no-cjs-in-config': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/html-closing-bracket-newline': 'off',
		indent: [2, 'tab'],
		'no-tabs': 'off',
	},
}
