<template>
	<span
		class="rounded-lg px-2 py-0.5 text-xs tracking-wider select-none"
		:class="{
			'bg-black text-white': props.theme === 'primary',
			'bg-gray-300 text-gray-800': props.theme === 'secondary',
			'bg-red-500 text-white': props.theme === 'danger',
		}"
	>
		<slot />
	</span>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		theme?: 'primary' | 'secondary' | 'danger'
	}>(),
	{
		theme: 'primary',
	}
)
</script>
