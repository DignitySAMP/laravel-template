<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { login } from '@/routes'
import { email } from '@/routes/password'
import { Form, Head } from '@inertiajs/vue3'

const props = defineProps<{
	status?: string
}>()
</script>

<template>
	<AuthLayout
		title="Forgot password"
		description="Enter your email to receive a password reset link"
	>
		<Head title="Forgot password" />

		<div
			v-if="props.status"
			class="mb-4 text-center text-sm font-medium text-green-600"
		>
			{{ props.status }}
		</div>

		<div class="space-y-6">
			<Form
				v-bind="email.form()"
				v-slot="{ errors, processing }"
			>
				<div class="grid gap-2">
					<AppInput
						name="email"
						label="Email address"
						type="email"
						placeholder="email@example.com"
						:autofocus="true"
						autocomplete="off"
						:error="errors.email"
						:required="true"
					/>
				</div>

				<div class="my-6 flex items-center justify-start">
					<AppButton
						name="request-new-password"
						type="submit"
						:disabled="processing"
						text="Email password reset link"
					/>
				</div>
			</Form>

			<div class="space-x-1 text-center text-sm text-muted-foreground">
				<span>Or, return to</span>
				<AppLink :href="login()">log in</AppLink>
			</div>
		</div>
	</AuthLayout>
</template>
