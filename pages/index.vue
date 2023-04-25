<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
	name: 'IndexPage',
	components: {},
	setup() {
		const { t } = useI18n()
		return { t}
	},
	data: function() {
		return {
			visibleSignRegister: true
		}
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
	<div class="home">
		<FormsSignInRegister
			v-if="visibleSignRegister"
			@close="() => {
				visibleSignRegister = false
			}" />
	</div>
</template>
