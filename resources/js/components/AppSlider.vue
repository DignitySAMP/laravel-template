<template>
	<input
		v-model="model"
		type="range"
		@change="onCeilPriceSlider()"
		class="w-full accent-blue-600"
		:min="props.min"
		:max="props.max"
	/>
	<div class="flex justify-between text-sm text-slate-600">
		<span v-html="numberToFixed(model)" />

		<input
			class="w-16 text-center font-bold text-indigo-600"
			@change="onCeilPriceSlider()"
			type="number"
			:min="props.min"
			:max="props.max"
			v-model="model"
		/>

		<span v-html="numberToFixed(model)" />
	</div>
</template>
<script setup lang="ts">
const model = defineModel<number | undefined | null>()
const emit = defineEmits(['on-slider-change'])
const props = defineProps<{
	min: number
	max: number
}>()

// safely formats a number to have 2 decimals
const numberToFixed = (input: number | undefined | null) => {
	if (input !== null && input !== undefined) {
		return Number(input).toFixed(2)
	}
}

const onCeilPriceSlider = () => {
	if (model.value) {
		if (model.value <= props.min) {
			model.value = props.min
		}
		if (model.value >= props.max) {
			model.value = props.max
		}
	}

	emit('on-slider-change')
}
</script>
