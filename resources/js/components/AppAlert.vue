<template>
	<Primitive
		:as="props.as"
		:as-child="props.asChild"
		role="alert"
		class="p-6 border rounded-lg grid grid-cols-[auto_1fr] gap-4 items-center"
		:class="[
			{
				'bg-black border-gray-800 text-white': props.theme === 'primary',
				'bg-gray-200 text-gray-800 border-gray-400': props.theme === 'secondary',
				'border-red-500 bg-red-300 text-red-800': props.theme === 'danger',
			},
			props.class,
		]"
	>
		<component
			v-if="props.icon"
			:is="props.icon"
			class="size-8 opacity-50"
		/>
		<BellIcon
			v-else
			class="size-8 opacity-50"
		/>
		<div class="text-sm">
			<slot />
		</div>
	</Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { BellIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

interface Props {
	theme?: 'primary' | 'secondary' | 'danger'
	icon?: Component
	as?: string
	asChild?: boolean
	class?: string
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'primary',
	as: 'div',
	asChild: false,
})
</script>
