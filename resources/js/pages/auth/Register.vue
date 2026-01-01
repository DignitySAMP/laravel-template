<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue'
import AuthBase from '@/layouts/AuthLayout.vue'
import { login } from '@/routes'
import { store } from '@/routes/register'
import { Form, Head } from '@inertiajs/vue3'
</script>

<template>
	<AuthBase
		title="Create an account"
		description="Enter your details below to create your account"
	>
		<Head title="Register" />

		<Form
			v-bind="store.form()"
			:reset-on-success="['password', 'password_confirmation']"
			v-slot="{ errors, processing }"
			class="flex flex-col gap-6"
		>
			<div class="grid gap-6">
				<div class="grid gap-2">
					<AppInput
						name="name"
						label="Name"
						type="text"
						placeholder="Full name"
						:autofocus="true"
						autocomplete="name"
						:error="errors.name"
						:required="true"
					/>
				</div>

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
					/>
				</div>

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
					name="register-button"
					type="submit"
					:disabled="processing"
					text="Create account"
				/>
			</div>

			<div class="text-center text-sm text-muted-foreground">
				Already have an account?
				<AppLink
					:href="login()"
					class="underline underline-offset-4"
					:tabindex="6"
				>
					Log in
				</AppLink>
			</div>
		</Form>
	</AuthBase>
</template>
