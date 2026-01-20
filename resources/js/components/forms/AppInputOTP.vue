<template>
	<div class="w-full">
		<Label
			v-if="props.label"
			:for="props.name"
			class="mb-2 block text-sm font-medium text-slate-700"
		>
			{{ props.label }}
		</Label>
		<PinInputRoot
			v-model="internalModel"
			:id="props.name"
			:name="props.name"
			:placeholder="props.placeholder"
			:disabled="props.disabled"
			:otp="true"
			:type="props.type"
			class="flex items-center gap-2"
			@update:model-value="onValueChange"
		>
			<PinInputInput
				v-for="(id, index) in props.length"
				:key="id"
				:index="index"
				class="size-12 rounded-lg border-2 border-gray-300 text-center text-lg font-medium focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				:class="props.error ? 'border-red-300 focus:ring-red-600' : ''"
			/>
		</PinInputRoot>
		<span
			v-if="props.error"
			class="mt-1 block text-sm text-red-500"
		>
			{{ props.error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { Label, PinInputInput, PinInputRoot } from 'reka-ui'
import { ref, watch } from 'vue'

const model = defineModel<string>()

interface Props {
	name: string
	label?: string
	length?: number
	placeholder?: string
	disabled?: boolean
	error?: string
	type?: 'text' | 'number'
}

const props = withDefaults(defineProps<Props>(), {
	length: 6,
	placeholder: '○',
	disabled: false,
	type: 'text',
})

const internalModel = ref<string[]>([])

// PinInput returns an array, convert it to a string for Laravel
watch(
	() => model.value,
	(newVal) => {
		if (newVal && typeof newVal === 'string') {
			internalModel.value = newVal.split('')
		} else if (!newVal) {
			internalModel.value = []
		}
	},
	{ immediate: true }
)
const onValueChange = (value: string[]) => (model.value = value.join(''))
</script>
