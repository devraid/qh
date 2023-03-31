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
	<main class="home flex flex-col px-5 bg-slate-200">
		<div class="container flex flex-1 justify-center min-h-full mx-auto px-5 bg-white">
			<div
				class="flex justify-center items-center w-full h-screen fixed top-0 left-0 p-5 bg-[rgba(255,255,255,0.1)]"
			>
				<div class="flex flex-col md:flex-row mx-5 p-5 w-full max-w-xl md:max-w-screen-sm bg-white border border-solid border-gray-5 shadow-[2px_2px_6px_rgba(0,0,0,0.1)] rounded-lg">
					<div class="flex-1 pb-3 md:pb-0 md:pr-3">
						<h4 class="font-avenir-next-heavy text-xl text-gray mb-3">
							{{ t('sign_in') }}
						</h4>
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="email"
							name="email"
							maxlength="100"
							:placeholder="t('email')"
							autocomplete="email">
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="password"
							name="password"
							maxlength="50"
							:placeholder="t('password')"
							autocomplete="password">
					</div>
					<div class="flex-1 md:pl-3">
						<h4 class="font-avenir-next-heavy text-xl mb-3">
							{{ t('register') }}
						</h4>
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="text"
							name="first_name"
							maxlength="100"
							:placeholder="t('first_name')"
							autocomplete="first_name">
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="text"
							name="last_name"
							maxlength="100"
							:placeholder="t('last_name')"
							autocomplete="last_name">
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="email"
							name="email"
							maxlength="100"
							:placeholder="t('email')"
							autocomplete="email">
						<input
							class="font-avenir-next-book text-base w-full px-3 py-2 mb-3 appearance-none outline-none border-solid border border-gray-5 transtion-all focus:border-green-5"
							type="password"
							name="new_password"
							maxlength="50"
							:placeholder="t('password')"
							autocomplete="off">
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
