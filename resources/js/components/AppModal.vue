<template>
	<DialogRoot v-model:open="isOpen">
		<DialogPortal>
			<Transition
				enter-active-class="transition duration-300"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="transition duration-300"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<DialogOverlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
			</Transition>
			<Transition
				enter-active-class="transition transform duration-300"
				enter-from-class="opacity-0 scale-95"
				enter-to-class="opacity-100 scale-100"
				leave-active-class="transition transform duration-300"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-95"
			>
				<DialogContent
					class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 mx-4 w-full rounded-md bg-white dark:bg-stone-800 p-6 overflow-y-auto focus:outline-none"
					:class="[props.height, props.width]"
				>
					<DialogClose
						class="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none"
					>
						<X
							class="size-5 hover:scale-125 transition-transform"
						/>
						<span class="sr-only">Close</span>
					</DialogClose>

					<DialogTitle
						v-if="props.title"
						class="text-lg font-semibold mb-4"
					>
						{{ props.title }}
					</DialogTitle>

					<DialogDescription
						v-if="props.description"
						class="text-sm text-gray-600 dark:text-gray-400 mb-4"
					>
						{{ props.description }}
					</DialogDescription>

					<slot />
				</DialogContent>
			</Transition>
		</DialogPortal>
	</DialogRoot>
</template>

<script setup lang="ts">
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTitle,
} from 'reka-ui'

import { X } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
	show?: boolean
	width?: string
	height?: string
	title?: string
	description?: string
}

const props = withDefaults(defineProps<Props>(), {
	show: false,
	width: 'max-w-5xl',
	height: 'max-h-[225px] h-fit',
})

const emit = defineEmits<{
	close: []
	'update:show': [value: boolean]
}>()

// two-way binding for v-model:show
const isOpen = computed({
	get: () => props.show,
	set: (value) => {
		emit('update:show', value)
		if (!value) {
			emit('close')
		}
	},
})
</script>
