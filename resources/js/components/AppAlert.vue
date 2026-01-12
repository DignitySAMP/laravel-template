<template>
	<div
		class="p-6 border rounded-lg grid grid-cols-[1fr_auto] gap-4 justify-center items-center"
		:class="{
			'bg-black border-gray-800 text-white ': props.theme === 'primary',
			'bg-gray-200 text-gray-800 border-gray-400': props.theme === 'secondary',
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

interface Props {
	theme: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'primary',
})
</script>
