<template>
	<div
		class="grid grid-cols-[1fr_auto] items-center justify-center gap-4 rounded-lg border p-6"
		:class="{
			'border-gray-800 bg-black text-white': props.theme === 'primary',
			'border-gray-400 bg-gray-200 text-gray-800': props.theme === 'secondary',
			'border-red-500 bg-red-300 text-red-800': props.theme === 'danger',
		}"
	>
		<component
			:is="BellIcon"
			class="size-8 opacity-50"
		/>
		<span class="text-sm">
			<slot />
		</span>
	</div>
</template>
<script setup lang="ts">
import { BellIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(
	defineProps<{
		theme: 'primary' | 'secondary' | 'danger'
	}>(),
	{
		theme: 'primary',
	}
)
</script>
