<template>
	<div
		ref="selectBoxRef"
		class="relative text-black"
	>
		<div
			class="flex w-full items-center justify-between rounded-lg border px-4 py-2 transition duration-300"
			:class="[
				props.error
					? 'border-red-300 focus:ring-red-600'
					: 'border-gray-300 focus:ring-black',
				showSelectItems ? 'border-transparent ring-2 outline-none' : '',
			]"
			@click="onClickSelect()"
		>
			<span>
				{{ model?.label ?? props.label }}
			</span>
			<ChevronDownIcon class="size-5" />
		</div>

		<div
			v-if="showSelectItems"
			class="mt-1 flex w-full flex-col rounded-lg border border-gray-300 px-4 py-2"
		>
			<input
				v-if="search"
				id="input_search"
				name="input_search"
				placeholder="Search for query"
				:disabled="disabled"
				type="text"
				class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-black"
				v-model="searchModel"
			/>
			<p
				@click="onSelectItem(item)"
				v-for="(item, key) in filteredItems"
				:key="key"
				class="mt-2 cursor-pointer rounded-lg p-2 transition duration-300 hover:bg-white hover:shadow"
			>
				{{ item.label }}
			</p>
		</div>
	</div>
</template>
<script setup lang="ts">
import { type FormSelectItem } from '@/types/index'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const model = defineModel<FormSelectItem>()
interface Props {
	label: string
	items: FormSelectItem[]
	error?: string
	search?: boolean
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	search: false,
	disabled: false,
})

const showSelectItems = ref<boolean>(false)
const onClickSelect = () => {
	if (props.disabled) {
		return
	}
	showSelectItems.value = !showSelectItems.value
}

const selectBoxRef = ref<HTMLElement | null>(null)
onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const handleClickOutside = (event: MouseEvent) => {
	if (selectBoxRef.value && !selectBoxRef.value.contains(event.target as Node)) {
		showSelectItems.value = false
	}
}

const onSelectItem = (item: FormSelectItem) => {
	if (props.disabled) {
		return
	}

	model.value = item
	showSelectItems.value = false
}

const searchModel = ref<string>()

const filteredItems = computed(() => {
	const search = searchModel.value

	if (!search) {
		return props.items
	}

	const lower = search.toLowerCase()
	return props.items.filter((item) => item.label.toLowerCase().includes(lower))
})
</script>
