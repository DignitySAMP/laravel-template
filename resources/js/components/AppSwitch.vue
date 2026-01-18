<template>
	<div class="flex items-center gap-2">
		<SwitchRoot
			v-model:checked="model"
			:id="getElementId"
			:name="props.name"
			:disabled="props.disabled"
			class="w-11 h-6 bg-gray-300 rounded-full relative shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 data-[state=checked]:bg-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
		>
			<SwitchThumb
				class="block size-5 bg-white rounded-full shadow-lg transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
			/>
		</SwitchRoot>
		<Label
			v-if="props.label"
			:for="getElementId"
			class="text-sm text-gray-700 cursor-pointer select-none"
		>
			{{ props.label }}
		</Label>
	</div>
</template>

<script setup lang="ts">
import { Label, SwitchRoot, SwitchThumb } from 'reka-ui'
import { computed } from 'vue'

const model = defineModel<boolean>()

interface Props {
	name?: string
	id?: string
	label?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
})

const getElementId = computed((): string | undefined => props.id ?? props.name)
</script>
