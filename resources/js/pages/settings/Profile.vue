<template>
	<AppLayout>
		<Head title="Profile settings" />

		<SettingsLayout>
			<div class="flex flex-col space-y-6">
				<AppPageTitle
					title="Profile information"
					description="Update your name and email address"
					:small="true"
				/>

				<form
					@submit.prevent
					class="space-y-6"
				>
					<div class="grid gap-2">
						<AppInput
							name="name"
							label="Name"
							type="text"
							placeholder="Full name"
							:autofocus="true"
							autocomplete="name"
							:error="form.errors.name"
							v-model="form.name"
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
							v-model="form.email"
							:error="form.errors.email"
							:required="true"
						/>
					</div>

					<div v-if="mustVerifyEmail && !user.email_verified_at">
						<p class="-mt-4 text-sm text-muted-foreground">
							Your email address is unverified.
							<AppLink
								:href="send()"
								as="button"
								class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
							>
								Click here to resend the verification email.
							</AppLink>
						</p>

						<div
							v-if="status === 'verification-link-sent'"
							class="mt-2 text-sm font-medium text-green-600"
						>
							A new verification link has been sent to your email address.
						</div>
					</div>

					<div class="flex items-center gap-4">
						<AppButton
							@click="submit"
							name="profile-button"
							type="submit"
							text="Save"
							:disabled="form.processing"
							data-test="update-profile-button"
						/>

						<Transition
							enter-active-class="transition ease-in-out"
							enter-from-class="opacity-0"
							leave-active-class="transition ease-in-out"
							leave-to-class="opacity-0"
						>
							<p
								v-show="form.recentlySuccessful"
								class="text-sm text-neutral-600"
							>
								Saved.
							</p>
						</Transition>
					</div>
				</form>
			</div>

			<DeleteAccount />
		</SettingsLayout>
	</AppLayout>
</template>
<script setup lang="ts">
import { update } from '@/actions/App/Http/Controllers/Settings/ProfileController'
import { send } from '@/routes/verification'
import { Head, useForm, usePage } from '@inertiajs/vue3'

import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppLink from '@/components/AppLink.vue'
import AppPageTitle from '@/components/AppPageTitle.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'

import DeleteAccount from '@/pages/settings/DeleteAccount.vue'

interface Props {
	mustVerifyEmail: boolean
	status?: string
}

defineProps<Props>()

const user = usePage().props.auth.user
const form = useForm({
	name: user?.name,
	email: user?.email,
})

const submit = () => {
	if (form.processing) return
	form.submit(update(), {
		preserveScroll: true,
		onFinish: () => form.reset(),
	})
}
</script>
