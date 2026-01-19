<template>
	<Primitive
		:as="props.as"
		:as-child="props.asChild"
		class="inline-flex items-center rounded-lg px-2 py-0.5 text-xs tracking-wider select-none"
		:class="[
			{
				'bg-black text-white': props.theme === 'primary',
				'bg-gray-300 text-gray-800': props.theme === 'secondary',
				'bg-red-500 text-white': props.theme === 'danger',
			},
			props.class,
		]"
	>
		<slot />
	</Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

interface Props {
	theme?: 'primary' | 'secondary' | 'danger'
	as?: string
	asChild?: boolean
	class?: string
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'primary',
	as: 'span',
	asChild: false,
})
</script>
