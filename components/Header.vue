<script lang="ts">
import { useCookie } from 'nuxt/app'

export default {
	name: 'HeaderComponent',
	setup() {
		const user = useCookie<{ email: string; token: string }>('user')
		console.log('yahooooooo')
		return { user }
	},
}
</script>

<template>
    <div>Component: Header</div>
</template>
