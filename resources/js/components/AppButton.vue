<template>
	<Primitive
		:as="props.as"
		:as-child="props.asChild"
		:id="getElementId"
		:tabindex="props.tabindex"
		:name="props.name"
		:type="props.type"
		:disabled="props.disabled"
		class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
		:class="[
			{
				'bg-black text-white hover:bg-gray-800':
					props.theme === 'primary' && !props.disabled,
				'bg-gray-300 text-gray-800 hover:bg-gray-400':
					props.theme === 'secondary' && !props.disabled,
				'bg-red-500 text-white hover:bg-red-600':
					props.theme === 'danger' && !props.disabled,
			},
			props.fullWidth ? 'w-full' : '',
		]"
	>
		<component
			v-if="props.iconLeft"
			:is="props.iconLeft"
			class="size-4"
		/>
		<span class="text-sm select-none">
			<slot>{{ props.text }}</slot>
		</span>
		<component
			v-if="props.iconRight"
			:is="props.iconRight"
			class="size-4"
		/>
	</Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed, type Component } from 'vue'

interface Props {
	name?: string
	text?: string
	id?: string
	type?: 'button' | 'submit' | 'reset'
	theme?: 'primary' | 'secondary' | 'danger'
	iconLeft?: Component
	iconRight?: Component
	disabled?: boolean
	tabindex?: number
	fullWidth?: boolean
	as?: string
	asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	theme: 'primary',
	disabled: false,
	fullWidth: true,
	as: 'button',
	asChild: false,
})

const getElementId = computed((): string | undefined => props.id ?? props.name)
</script>
