<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { store } from '@/routes/password/confirm'
import { Form, Head } from '@inertiajs/vue3'
</script>

<template>
	<AuthLayout
		title="Confirm your password"
		description="This is a secure area of the application. Please confirm your password before continuing."
	>
		<Head title="Confirm password" />

		<Form
			v-bind="store.form()"
			reset-on-success
			v-slot="{ errors, processing }"
		>
			<div class="space-y-6">
				<div class="grid gap-2">
					<AppInput
						name="password"
						type="password"
						placeholder="Password"
						label="Password"
						:autofocus="true"
						autocomplete="current-password"
						:error="errors.password"
						:required="true"
					/>
				</div>

				<div class="flex items-center">
					<AppButton
						name="btn-confirm-password"
						type="submit"
						:disabled="processing"
						text="Confirm Password"
					/>
				</div>

			</div>
		</Form>
	</AuthLayout>
</template>
