<template>
	<div class="w-full">
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
		<div class="relative mt-1">
			<input
				:id="getElementId"
				:name="props.name"
				:type="
					props.type === 'password' ? (togglePassword ? 'text' : 'password') : props.type
				"
				:placeholder="props.placeholder"
				:disabled="props.disabled"
				:autocomplete="props.autocomplete"
				:required="props.required"
				v-model="model"
				class="w-full px-2 py-1 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm"
				:class="
					props.error
						? 'border-red-300 focus:ring-red-600'
						: 'border-gray-300 focus:ring-black'
				"
				:autofocus="props.autofocus"
				:tabindex="props.tabindex"
			/>

			<div
				class="absolute top-1.5 right-1.5"
				:class="props.error ? 'text-red-300' : 'text-black'"
			>
				<EnvelopeIcon
					v-if="props.type === 'email'"
					class="size-5 opacity-50"
				/>
				<component
					:is="togglePassword ? EyeSlashIcon : EyeIcon"
					v-if="props.type === 'password'"
					@click="togglePassword = !togglePassword"
					:toggle="togglePassword"
					class="cursor-pointer size-5 opacity-50 hover:text-neutral-700"
				/>
			</div>
		</div>
		<span
			v-if="props.error"
			v-html="props.error"
			class="text-sm text-red-500"
		/>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const model = defineModel()
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
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	placeholder: '...',
	disabled: false,
	required: false,
	autofocus: false,
})

const togglePassword = ref<boolean>(false)

const getElementId = computed((): string => props.id ?? props.name)
</script>
