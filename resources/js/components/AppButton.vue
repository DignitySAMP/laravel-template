<template>
	<button
		:id="getElementId"
		:tabindex="props.tabindex"
		:name="props.name"
		class="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
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
	icon?: Component
	disabled?: boolean
	tabindex?: number
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	disabled: false,
})

const getElementId = computed((): string => props.id ?? props.name)
</script>
