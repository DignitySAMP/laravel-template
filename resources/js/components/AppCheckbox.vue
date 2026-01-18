<template>
	<div class="flex items-center gap-2">
		<CheckboxRoot
			:id="getElementId"
			:name="props.name"
			:tabindex="props.tabindex"
			v-model:checked="checked"
			:disabled="props.disabled"
			class="flex items-center justify-center size-5 border-2 border-gray-300 rounded bg-white data-[state=checked]:bg-black data-[state=checked]:border-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			<CheckboxIndicator class="text-white">
				<CheckIcon class="size-4" />
			</CheckboxIndicator>
		</CheckboxRoot>
		<label
			v-if="props.label"
			class="text-sm text-gray-700 cursor-pointer select-none"
			:for="getElementId"
		>
			{{ props.label }}
		</label>
	</div>
</template>

<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const checked = defineModel<boolean>()

interface Props {
	label?: string
	name: string
	id?: string
	tabindex?: number
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
})

const getElementId = computed((): string => props.id ?? props.name)
</script>
