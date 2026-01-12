<template>
	<AuthLayout
		title="Reset password"
		description="Please enter your new password below"
	>
		<Head title="Reset password" />

		<Form
			v-bind="update.form()"
			:transform="(data) => ({ ...data, token, email })"
			:reset-on-success="['password', 'password_confirmation']"
			v-slot="{ errors, processing }"
		>
			<div class="grid gap-6">
				<div class="grid gap-2">
					<AppInput
						name="email"
						label="Email address"
						type="email"
						placeholder="email@example.com"
						:autofocus="true"
						autocomplete="email"
						:error="errors.email"
						:required="true"
						v-model="inputEmail"
					/>
				</div>

				<div class="grid gap-2">
					<AppInput
						name="password"
						type="password"
						placeholder="Password"
						label="Password"
						:autofocus="true"
						autocomplete="new-password"
						:error="errors.password"
						:required="true"
					/>
				</div>

				<div class="grid gap-2">
					<AppInput
						name="password_confirmation"
						type="password"
						placeholder="Password"
						label="Confirm password"
						:autofocus="true"
						autocomplete="new-password"
						:error="errors.password_confirmation"
						:required="true"
					/>
				</div>

				<AppButton
					name="btn-reset-password"
					type="submit"
					:disabled="processing"
					text="Reset password"
				/>
			</div>
		</Form>
	</AuthLayout>
</template>
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { update } from '@/routes/password'
import { Form, Head } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps<{
	token: string
	email: string
}>()

const inputEmail = ref(props.email)
</script>
