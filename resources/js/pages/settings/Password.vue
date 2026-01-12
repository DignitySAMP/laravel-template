<script setup lang="ts">
import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController'
import AppInput from '@/components/AppInput.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import { Form, Head } from '@inertiajs/vue3'
import AppPageTitle from '@/components/AppPageTitle.vue'
import AppButton from '@/components/AppButton.vue'


</script>

<template>
	<AppLayout>
		<Head title="Password settings" />

		<SettingsLayout>
			<div class="space-y-6">
				<AppPageTitle
					title="Update password"
					description="Ensure your account is using a long, random password to stay secure"
					:small="true"
				/>

				<Form
					v-bind="PasswordController.update.form()"
					:options="{
						preserveScroll: true,
					}"
					reset-on-success
					:reset-on-error="['password', 'password_confirmation', 'current_password']"
					class="space-y-6"
					v-slot="{ errors, processing, recentlySuccessful }"
				>
					<div class="grid gap-2">
						<AppInput
							label="Current Password"
							name="current_password"
							type="password"
							placeholder="Current password"
							:autofocus="true"
							autocomplete="current-password"
							:error="errors.current_password"
							:required="true"
						/>
					</div>

					<div class="grid gap-2">
						<AppInput
							label="New Password"
							name="password"
							type="password"
							placeholder="New password"
							:autofocus="true"
							autocomplete="new-password"
							:error="errors.password"
							:required="true"
						/>
					</div>

					<div class="grid gap-2">
						<AppInput
							label="Confirm New Password"
							name="password_confirmation"
							type="password"
							placeholder="Confirm password"
							:autofocus="true"
							autocomplete="new-password"
							:error="errors.password_confirmation"
							:required="true"
						/>
					</div>

					<div class="flex items-center gap-4">
						<AppButton
							:disabled="processing"
							data-test="update-password-button"
							text="Save Password"
							name="update-password-button"
						/>




						<Transition
							enter-active-class="transition ease-in-out"
							enter-from-class="opacity-0"
							leave-active-class="transition ease-in-out"
							leave-to-class="opacity-0"
						>
							<p
								v-show="recentlySuccessful"
								class="text-sm text-neutral-600"
							>
								Saved.
							</p>
						</Transition>
					</div>
				</Form>
			</div>
		</SettingsLayout>
	</AppLayout>
</template>
