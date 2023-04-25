<script lang="ts">
import { useI18n } from 'vue-i18n'

export default {
	name: 'ModalWrapper',
	emits: ['close'],
	setup() {
		const { t } = useI18n()
		return { t }
	}
}
</script>

<template>
	<div
		class="modal-wrapper flex justify-center md:items-center w-screen h-screen fixed top-0 left-0 p-5 bg-[rgba(255,255,255,0.1)] overflow-y-auto"
	>
		<div class="flex flex-col md:flex-row relative m-0 p-5 md:p-10 w-full h-fit max-w-screen-sm lg:max-w-screen-md bg-white border border-solid border-gray-5 shadow-[2px_2px_6px_rgba(0,0,0,0.1)] rounded-lg">
			<button
				class="appearance-none outline-none text-base text-black transition-colors hover:text-green-5 absolute top-5 right-5"
				:title="t('close')"
				@click="$emit('close')"
			>
				<nuxt-icon
					class="block w-full h-full"
					name="close"
				/>
			</button>
			<slot />
		</div>
	</div>
</template>
