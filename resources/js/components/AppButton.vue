<template>
	<button
		:id="getElementId"
		:tabindex="props.tabindex"
		:name="props.name"
		class="w-full py-2.5 rounded-lg cursor-pointer transition-colors font-medium"
		:class="{
			'bg-black text-white hover:bg-gray-800': props.theme === 'primary',
			'bg-gray-300 text-gray-800 hover:bg-gray-400': props.theme === 'secondary',
			'bg-red-500 text-white hover:bg-red-600': props.theme === 'danger',
		}"
	>
		<div
			class="flex w-full items-center gap-4 text-center"
			:class="props.icon !== undefined ? 'w-full justify-between' : 'justify-center'"
		>
			<component
				class="size-4"
				v-if="props.icon !== undefined"
				:is="props.icon"
			/>
			<span class="font-medium">
				{{ props.text }}
			</span>
		</div>
	</button>
</template>
<script setup lang="ts">
import { type Component, computed } from 'vue'

interface Props {
	name: string
	text: string
	id?: string
	type?: string
	theme?: 'primary' | 'secondary' | 'danger'
	icon?: Component
	disabled?: boolean
	tabindex?: number
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	theme: 'primary',
	disabled: false,
})

const getElementId = computed((): string => props.id ?? props.name)
</script>
