<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
	name: 'IndexPage',
	components: {},
	setup() {
		const { t } = useI18n()
		return { t }
	},
	mounted () {
		this.$nextTick(function () {
			let everythingLoaded = setInterval(function (scope) {
				if (/loaded|complete/.test(document.readyState)) {
					clearInterval(everythingLoaded)
					console.log('Fonts and images are loaded, let\'s start the show!')
					scope.init()
				}
			}, 10, this)
		})
	},
	methods: {
		init () {
			console.log('Fully loaded.')
		}
	}
}
</script>

<template>
	<main class="home bg-slate-200">
		<div class="container mx-auto px-5 bg-slate-200">
			<h1>{{ t('nuxt3_boilerplate') }}</h1>
			{{ t('description') }}
		</div>
	</main>
</template>
