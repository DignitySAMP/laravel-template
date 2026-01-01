<template>
	<div>
		<div class="flex gap-2">
			<label
				v-if="props.label || $slots.label"
				:for="getElementId"
				class="block text-sm font-medium w-full"
				:class="props.error ? 'text-red-600' : 'text-slate-700'"
			>
				<slot name="label">
					<div>
						<span v-html="props.label" />
						<span
							v-if="props.required"
							class="ml-1 text-xs text-gray-500"
							v-html="'*'"
						/>
					</div>
				</slot>
			</label>
		</div>
		<div class="mt-1">
			<div class="flex gap-2">
				<input
					v-for="(digit, index) in props.length"
					:key="index"
					:ref="(el) => setInputRef(el, index)"
					type="text"
					inputmode="numeric"
					maxlength="1"
					:value="otpDigits[index]"
					@input="handleInput($event, index)"
					@keydown="handleKeyDown($event, index)"
					@focus="updateFocus(index)"
					:disabled="props.disabled"
					:autofocus="index === 0 && props.autofocus"
					class="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:border-transparent outline-none"
					:class="
						props.error
							? 'border-red-300 focus:ring-red-600'
							: 'border-gray-300 focus:ring-black'
					"
				/>
			</div>
			<span
				v-if="props.error"
				v-html="props.error"
				class="text-sm text-red-500 block mt-1"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const model = defineModel<string>()

interface Props {
	id?: string
	name: string
	label?: string
	length?: number
	placeholder?: string
	disabled?: boolean
	error?: string
	required?: boolean
	autofocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	length: 6,
	disabled: false,
	required: false,
	autofocus: false,
})

const otpDigits = ref<string[]>(Array(props.length).fill(''))
const inputRefs = ref<(HTMLInputElement | null)[]>([])

const setInputRef = (el: unknown, index: number) => {
	if (el instanceof HTMLInputElement) {
		inputRefs.value[index] = el
	}
}

const getElementId = computed((): string => props.id ?? props.name)
const updateModel = () => (model.value = otpDigits.value.join(''))
const updateFocus = (index: number) => inputRefs.value[index]?.select()

const handleInput = (event: Event, index: number) => {
	const target = event.target as HTMLInputElement
	const value = target.value.replace(/[^0-9]/g, '')

	if (value.length > 0) {
		otpDigits.value[index] = value[0]
		updateModel()

		if (index < props.length - 1) {
			// jump to next input
			inputRefs.value[index + 1]?.focus()
		}
	} else {
		otpDigits.value[index] = ''
		updateModel()
	}
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
	if (event.key === 'Backspace') {
		// handle backspace (delete)
		event.preventDefault()

		if (otpDigits.value[index]) {
			otpDigits.value[index] = ''
			updateModel()
		} else if (index > 0) {
			otpDigits.value[index - 1] = ''
			updateModel()
			inputRefs.value[index - 1]?.focus()
		}
	}

	if (event.key === 'ArrowLeft' && index > 0) {
		// handle arrow left
		event.preventDefault()
		inputRefs.value[index - 1]?.focus()
	}

	if (event.key === 'ArrowRight' && index < props.length - 1) {
		// handle arrow right
		event.preventDefault()
		inputRefs.value[index + 1]?.focus()
	}

	// prevent non-numeric input
	if (
		!/^[0-9]$/.test(event.key) &&
		!['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)
	) {
		event.preventDefault()
	}
}
</script>
