<template>
	<Primitive
		:as="props.as"
		:as-child="props.asChild"
		:id="getElementId"
		:tabindex="props.tabindex"
		:name="props.name"
		:type="props.type"
		:disabled="props.disabled"
		class="inline-flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
		:class="{
			'bg-black text-white hover:bg-gray-800': props.theme === 'primary' && !props.disabled,
			'bg-gray-300 text-gray-800 hover:bg-gray-400':
				props.theme === 'secondary' && !props.disabled,
			'bg-red-500 text-white hover:bg-red-600': props.theme === 'danger' && !props.disabled,
		}"
	>
		<component
			:is="props.icon"
			:class="props.size === 'sm' ? 'size-4' : props.size === 'md' ? 'size-5' : 'size-6'"
		/>
		<span
			v-if="props.srText"
			class="sr-only"
		>
			{{ props.srText }}
		</span>
	</Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, type Component } from 'vue'

interface Props {
	icon: Component
	name?: string
	id?: string
	type?: 'button' | 'submit' | 'reset'
	theme?: 'primary' | 'secondary' | 'danger'
	disabled?: boolean
	tabindex?: number
	size?: 'sm' | 'md' | 'lg'
	srText?: string // Screen reader text for accessibility
	as?: string
	asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	theme: 'primary',
	disabled: false,
	size: 'md',
	as: 'button',
	asChild: false,
})

const getElementId = computed((): string | undefined => props.id ?? props.name)
</script>
