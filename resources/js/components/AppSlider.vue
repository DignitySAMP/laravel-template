<template>
	<div class="w-full">
		<Label
			v-if="props.label"
			class="block text-sm font-medium text-slate-700 mb-2"
		>
			{{ props.label }}
		</Label>
		<SliderRoot
			v-model="modelValue"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			:disabled="props.disabled"
			class="relative flex items-center select-none touch-none w-full h-5"
			@update:model-value="onValueChange"
		>
			<SliderTrack class="bg-gray-200 relative grow rounded-full h-1">
				<SliderRange class="absolute bg-black rounded-full h-full" />
			</SliderTrack>
			<SliderThumb
				class="block size-5 bg-white border-2 border-black rounded-full shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
			/>
		</SliderRoot>
		<div class="flex justify-between items-center mt-2 text-sm text-slate-600">
			<span>{{ formatValue(props.min) }}</span>

			<input
				v-if="props.showInput"
				type="number"
				:min="props.min"
				:max="props.max"
				:step="props.step"
				v-model.number="inputValue"
				@change="onInputChange"
				class="w-20 text-center px-2 py-1 border border-gray-300 rounded text-black font-semibold focus:outline-none focus:ring-2 focus:ring-black"
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
