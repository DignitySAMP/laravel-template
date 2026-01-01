<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue'

import AuthBase from '@/layouts/AuthLayout.vue'
import { register } from '@/routes'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { Form, Head } from '@inertiajs/vue3'

const props = defineProps<{
	status?: string
	canResetPassword: boolean
	canRegister: boolean
}>()
</script>

<template>
	<AuthBase
		title="Log in to your account"
		description="Enter your email and password below to log in"
	>
		<Head title="Log in" />

		<div
			v-if="props.status"
			class="mb-4 text-center text-sm font-medium text-green-600"
		>
			{{ props.status }}
		</div>

		<Form
			v-bind="store.form()"
			:reset-on-success="['password']"
			v-slot="{ errors, processing }"
			class="flex flex-col gap-6"
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
					/>
				</div>

				<div class="grid gap-2">
					<AppInput
						name="password"
						type="password"
						placeholder="Password"
						:autofocus="true"
						autocomplete="current-password"
						:error="errors.password"
						:required="true"
					>
						<template #label>
							<div class="flex w-full justify-between">
								<span>Password</span>
								<AppLink
									v-if="props.canResetPassword"
									:href="request()"
								>
									Forgot password?
								</AppLink>
							</div>
						</template>
					</AppInput>
				</div>

				<div class="flex items-center justify-between">
					<AppCheckbox
						name="remember"
						label="Remember me?"
					/>
				</div>

				<AppButton
					name="login-button"
					:disabled="processing"
					type="submit"
					text="Log in"
				/>
			</div>

			<div
				class="text-center text-sm text-muted-foreground"
				v-if="props.canRegister"
			>
				Don't have an account?
				<AppLink
					:href="register()"
					:tabindex="5"
				>
					Sign up
				</AppLink>
			</div>
		</Form>
	</AuthBase>
</template>
