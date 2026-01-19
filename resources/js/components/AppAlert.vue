<template>
	<Primitive
		:as="props.as"
		:as-child="props.asChild"
		role="alert"
		class="grid grid-cols-[auto_1fr] items-center gap-4 rounded-lg border p-6"
		:class="[
			{
				'border-gray-800 bg-black text-white': props.theme === 'primary',
				'border-gray-400 bg-gray-200 text-gray-800': props.theme === 'secondary',
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
		<Bell
			v-else
			class="size-8 opacity-50"
		/>
		<div class="text-sm">
			<slot />
		</div>
	</Primitive>
</template>

<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { Primitive } from 'reka-ui'
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
