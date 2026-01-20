<template>
	<div class="flex items-center gap-2">
		<SwitchRoot
			v-model:checked="model"
			:id="getElementId"
			:name="props.name"
			:disabled="props.disabled"
			class="relative h-6 w-11 cursor-pointer rounded-full bg-gray-300 shadow-sm transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black"
		>
			<SwitchThumb
				class="block size-5 rounded-full bg-white shadow-lg transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
			/>
		</SwitchRoot>
		<Label
			v-if="props.label"
			:for="getElementId"
			class="cursor-pointer text-sm text-gray-700 select-none"
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
