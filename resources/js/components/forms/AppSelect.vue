<template>
	<div class="w-full">
		<Label
			v-if="props.label"
			class="mb-1 block text-sm font-medium text-slate-700"
		>
			{{ props.label }}
		</Label>
		<SelectRoot
			v-model="model"
			:disabled="props.disabled"
		>
			<SelectTrigger
				class="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
				:class="
					props.error
						? 'border-red-300 focus:ring-red-600'
						: 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-black'
				"
			>
				<SelectValue :placeholder="props.placeholder || 'Select an option'" />
				<SelectIcon>
					<ChevronDown class="size-5" />
				</SelectIcon>
			</SelectTrigger>

			<SelectPortal>
				<SelectContent
					class="mt-1 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
					:side-offset="5"
				>
					<SelectScrollUpButton
						v-if="props.search"
						class="flex h-6 cursor-default items-center justify-center bg-white"
					>
						<ChevronUp class="size-4" />
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
								class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-black"
								v-model="searchQuery"
								@click.stop
							/>
						</div>

						<SelectItem
							v-for="item in filteredItems"
							:key="item.value"
							:value="item.value"
							class="relative flex cursor-pointer items-center rounded-lg px-8 py-2 outline-none select-none hover:bg-gray-100 focus:bg-gray-100 data-highlighted:bg-gray-100"
						>
							<SelectItemIndicator class="absolute left-2 inline-flex items-center">
								<Check class="size-4" />
							</SelectItemIndicator>
							<SelectItemText>{{ item.label }}</SelectItemText>
						</SelectItem>
					</SelectViewport>

					<SelectScrollDownButton
						class="flex h-6 cursor-default items-center justify-center bg-white"
					>
						<ChevronDown class="size-4" />
					</SelectScrollDownButton>
				</SelectContent>
			</SelectPortal>
		</SelectRoot>
		<span
			v-if="props.error"
			class="mt-1 block text-sm text-red-500"
		>
			{{ props.error }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { Check, ChevronDown, ChevronUp } from 'lucide-vue-next'
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
