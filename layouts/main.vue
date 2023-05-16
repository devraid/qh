<script lang="ts">
export default {
	name: 'MainComponent',
}
</script>
<template>
    <main class="flex flex-col px-5 bg-white md:bg-gray-2">
        <Header />
        <div class="container flex flex-1 min-h-full mx-auto px-5 bg-white">
            <slot />
        </div>
    </main>
</template>
