<template>
	<div class="w-full">
		<Label
			v-if="props.label"
			class="block text-sm font-medium text-slate-700 mb-1"
		>
			{{ props.label }}
		</Label>
		<SelectRoot
			v-model="model"
			:disabled="props.disabled"
		>
			<SelectTrigger
				class="w-full px-4 py-2 flex justify-between items-center border rounded-lg transition duration-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
				:class="
					props.error
						? 'border-red-300 focus:ring-red-600'
						: 'border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent'
				"
			>
				<SelectValue :placeholder="props.placeholder || 'Select an option'" />
				<SelectIcon>
					<ChevronDownIcon class="size-5" />
				</SelectIcon>
			</SelectTrigger>

			<SelectPortal>
				<SelectContent
					class="mt-1 overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg"
					:side-offset="5"
				>
					<SelectScrollUpButton
						v-if="props.search"
						class="flex items-center justify-center h-6 bg-white cursor-default"
					>
						<ChevronUpIcon class="size-4" />
					</SelectScrollUpButton>

					<SelectViewport class="p-2">
						<div
							v-if="props.search"
							class="mb-2"
						>
							<input
								id="select_search"
								name="select_search"
								placeholder="Search..."
								type="text"
								class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none border-gray-300 focus:ring-black text-sm"
								v-model="searchQuery"
								@click.stop
							/>
						</div>

						<SelectItem
							v-for="item in filteredItems"
							:key="item.value"
							:value="item.value"
							class="relative flex items-center px-8 py-2 rounded-lg cursor-pointer select-none outline-none hover:bg-gray-100 focus:bg-gray-100 data-highlighted:bg-gray-100"
						>
							<SelectItemIndicator class="absolute left-2 inline-flex items-center">
								<CheckIcon class="size-4" />
							</SelectItemIndicator>
							<SelectItemText>{{ item.label }}</SelectItemText>
						</SelectItem>
					</SelectViewport>

					<SelectScrollDownButton
						class="flex items-center justify-center h-6 bg-white cursor-default"
					>
						<ChevronDownIcon class="size-4" />
					</SelectScrollDownButton>
				</SelectContent>
			</SelectPortal>
		</SelectRoot>
		<span
			v-if="props.error"
			class="text-sm text-red-500 mt-1 block"
		>
			{{ props.error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import {
	Label,
	SelectContent,
	SelectIcon,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectPortal,
	SelectRoot,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
	SelectViewport,
} from 'reka-ui'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

export interface SelectItem {
	label: string
	value: string
}

const model = defineModel<string>()

interface Props {
	label?: string
	items: SelectItem[]
	placeholder?: string
	error?: string
	search?: boolean
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	search: false,
	disabled: false,
})

const searchQuery = ref<string>('')

const filteredItems = computed(() => {
	const search = searchQuery.value?.toLowerCase().trim()

	if (!search) {
		return props.items
	}

	return props.items.filter((item) => item.label.toLowerCase().includes(search))
})
</script>
