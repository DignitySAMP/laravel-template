<template>
	<Transition
		enter-active-class="transition transform duration-300"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition transform duration-300"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="props.show"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
			@click="emit('close')"
		>
			<div
				class="relative mx-4 w-full rounded-md bg-white dark:bg-stone-800 p-6 overflow-y-auto"
				:class="[props.height, props.width]"
				@click.stop
			>
				<div
					class="right-4 top-4 absolute cursor-pointer"
					@click="emit('close')"
				>
					<XMarkIcon class="size-5 text-red-500 hover:text-red-700 hover:scale-125" />
				</div>
				<slot />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

const props = withDefaults(
	defineProps<{
		show?: boolean
		width?: string
		height?: string
	}>(),
	{
		show: false,
		width: 'max-w-5xl',
		height: 'max-h-225 h-fit',
	}
)
const emit = defineEmits(['close'])
</script>