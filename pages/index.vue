<script lang="ts" setup></script>
<script>
export default {
	name: 'IndexPage'
}
</script>

<template>
	<main class="home bg-slate-200">
		<div class="container mx-auto p-5 bg-slate-200">
			<h1>{{ $t('nuxt3_boilerplate') }}</h1>
			{{ $t('description') }}
		</div>
	</main>
</template>

<style scoped></style>
