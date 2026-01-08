<template>
	<div class="flex items-center gap-2">
		<input
			type="checkbox"
			:name="props.name"
			:id="getElementId"
			:tabindex="props.tabindex"
			v-model="model"
			:autocomplete="props.autocomplete"
			class="size-5 checked:accent-black focus:ring-gray-500 focus:ring-2 transition duration-300"
		/>
		<label
			class="text-sm text-gray-700"
			:for="props.name"
		>
			{{ props.label }}
		</label>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel()
interface Props {
	label: string
	name: string
	id?: string
	autocomplete?: string
	tabindex?: number
}

const props = defineProps<Props>()

const getElementId = computed((): string => props.id ?? props.name)
</script>
