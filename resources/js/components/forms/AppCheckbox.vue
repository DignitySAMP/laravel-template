<template>
	<div class="flex items-center gap-2">
		<CheckboxRoot
			:id="getElementId"
			:name="props.name"
			:tabindex="props.tabindex"
			v-model:checked="checked"
			:disabled="props.disabled"
			class="flex size-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-black data-[state=checked]:bg-black"
		>
			<CheckboxIndicator class="text-white">
				<Check class="size-4" />
			</CheckboxIndicator>
		</CheckboxRoot>
		<label
			v-if="props.label"
			class="cursor-pointer text-sm text-gray-700 select-none"
			:for="getElementId"
		>
			{{ props.label }}
		</label>
	</div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
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
