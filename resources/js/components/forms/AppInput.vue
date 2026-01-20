<template>
	<Primitive
		:as="props.wrapper"
		:as-child="props.wrapperAsChild"
		class="w-full"
	>
		<div class="flex gap-2">
			<Label
				v-if="props.label || $slots.label"
				:for="getElementId"
				class="block w-full text-sm font-medium"
				:class="props.error ? 'text-red-600' : 'text-slate-700'"
			>
				<slot name="label">
					<div>
						<span v-html="props.label" />
						<span
							v-if="props.required"
							class="ml-1 text-xs text-gray-500"
						>
							*
						</span>
					</div>
				</slot>
			</Label>
		</div>
		<div
			class="relative"
			:class="props.label ? 'mt-1' : ''"
		>
			<Primitive
				:as="props.as"
				:as-child="props.asChild"
				:id="getElementId"
				:name="props.name"
				:type="computedType"
				:placeholder="props.placeholder"
				:disabled="props.disabled"
				:autocomplete="props.autocomplete"
				:required="props.required"
				v-model="model"
				class="w-full rounded-lg border px-2 py-1 text-sm outline-none focus:border-transparent focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
				:class="
					props.error
						? 'border-red-300 focus:ring-red-600'
						: 'border-gray-300 focus:ring-black'
				"
				:autofocus="props.autofocus"
				:tabindex="props.tabindex"
			/>

			<div
				v-if="props.type === 'email' || props.type === 'password'"
				class="absolute top-1.5 right-1.5"
				:class="props.error ? 'text-red-300' : 'text-black'"
			>
				<Mail
					v-if="props.type === 'email'"
					class="size-5 opacity-50"
				/>
				<component
					:is="togglePassword ? EyeOff : Eye"
					v-if="props.type === 'password'"
					@click="togglePassword = !togglePassword"
					class="size-5 cursor-pointer opacity-50 transition-colors hover:text-neutral-700"
				/>
			</div>
		</div>
		<span
			v-if="props.error"
			class="mt-1 block text-sm text-red-500"
		>
			{{ props.error }}
		</span>
	</Primitive>
</template>

<script setup lang="ts">
import { Eye, EyeOff, Mail } from 'lucide-vue-next'
import { Label, Primitive } from 'reka-ui'
import { computed, ref } from 'vue'

const model = defineModel<string | number>()

interface Props {
	id?: string
	name: string
	label?: string
	type?: 'text' | 'email' | 'password' | 'number'
	placeholder?: string
	autocomplete?: string
	disabled?: boolean
	error?: string
	required?: boolean
	autofocus?: boolean
	tabindex?: number
	as?: string
	asChild?: boolean
	wrapper?: string
	wrapperAsChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	placeholder: '...',
	disabled: false,
	required: false,
	autofocus: false,
	as: 'input',
	asChild: false,
	wrapper: 'div',
	wrapperAsChild: false,
})

const togglePassword = ref<boolean>(false)
const getElementId = computed((): string => props.id ?? props.name)
const computedType = computed(() => {
	if (props.type === 'password') {
		return togglePassword.value ? 'text' : 'password'
	}
	return props.type
})
</script>
