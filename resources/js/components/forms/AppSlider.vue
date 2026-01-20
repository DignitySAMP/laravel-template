<template>
	<div class="w-full">
		<Label
			v-if="props.label"
			class="mb-2 block text-sm font-medium text-slate-700"
		>
			{{ props.label }}
		</Label>
		<SliderRoot
			v-model="modelValue"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			:disabled="props.disabled"
			class="relative flex h-5 w-full touch-none items-center select-none"
			@update:model-value="onValueChange"
		>
			<SliderTrack class="relative h-1 grow rounded-full bg-gray-200">
				<SliderRange class="absolute h-full rounded-full bg-black" />
			</SliderTrack>
			<SliderThumb
				class="block size-5 rounded-full border-2 border-black bg-white shadow hover:bg-gray-50 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			/>
		</SliderRoot>
		<div class="mt-2 flex items-center justify-between text-sm text-slate-600">
			<span>{{ formatValue(props.min) }}</span>

			<input
				v-if="props.showInput"
				type="number"
				:min="props.min"
				:max="props.max"
				:step="props.step"
				v-model.number="inputValue"
				@change="onInputChange"
				class="w-20 rounded border border-gray-300 px-2 py-1 text-center font-semibold text-black focus:ring-2 focus:ring-black focus:outline-none"
			/>

			<span>{{ formatValue(props.max) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Label, SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { computed, ref, watch } from 'vue'

const model = defineModel<number>()
const emit = defineEmits(['on-slider-change'])

interface Props {
	min: number
	max: number
	step?: number
	label?: string
	disabled?: boolean
	showInput?: boolean
	decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
	step: 1,
	disabled: false,
	showInput: true,
	decimals: 2,
})

// Reka UI Slider expects an array for v-model
const modelValue = computed({
	get: () => (model.value !== undefined && model.value !== null ? [model.value] : [props.min]),
	set: (val) => {
		if (val && val.length > 0) {
			model.value = val[0]
		}
	},
})

const inputValue = ref(model.value ?? props.min)

watch(model, (newVal) => (inputValue.value = newVal ?? props.min))

const formatValue = (value: number) => Number(value).toFixed(props.decimals)
const clampValue = (value: number) => Math.min(Math.max(value, props.min), props.max)

const onValueChange = () => {
	if (model.value !== undefined && model.value !== null) {
		model.value = clampValue(model.value)
	}
	emit('on-slider-change')
}

const onInputChange = () => {
	model.value = clampValue(inputValue.value)
	emit('on-slider-change')
}
</script>
