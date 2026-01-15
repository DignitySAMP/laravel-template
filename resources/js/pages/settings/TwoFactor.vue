<template>
	<AppLayout>
		<Head title="Two-Factor Authentication" />
		<SettingsLayout>
			<div class="space-y-6">
				<AppPageTitle
					title="Two-Factor Authentication"
					description="Manage your two-factor authentication settings"
					:small="true"
				/>

				<div
					v-if="!twoFactorEnabled"
					class="flex flex-col items-start justify-start space-y-4"
				>
					<AppBadge theme="danger">Disabled</AppBadge>

					<p class="text-muted-foreground">
						When you enable two-factor authentication, you will be prompted for a secure
						pin during login. This pin can be retrieved from a TOTP-supported
						application on your phone.
					</p>

					<div>
						<AppButton
							v-if="hasSetupData"
							@click="showSetupModal = true"
							type="submit"
							:icon="ShieldCheckIcon"
							text="Continue Setup"
							name="btn_enable_2fa"
						/>
						<Form
							v-else
							v-bind="enable.form()"
							@success="showSetupModal = true"
							#default="{ processing }"
						>
							<AppButton
								type="submit"
								:disabled="processing"
								:icon="ShieldCheckIcon"
								text="Enable 2FA"
								name="btn_enable_2fa"
							/>
						</Form>
					</div>
				</div>

				<div
					v-else
					class="flex flex-col items-start justify-start space-y-4"
				>
					<AppBadge theme="primary">Enabled</AppBadge>

					<p class="text-muted-foreground">
						With two-factor authentication enabled, you will be prompted for a secure,
						random pin during login, which you can retrieve from the TOTP-supported
						application on your phone.
					</p>

					<TwoFactorRecoveryCodes />

					<div class="relative inline">
						<Form
							v-bind="disable.form()"
							#default="{ processing }"
						>
							<AppButton
								type="submit"
								:icon="ShieldExclamationIcon"
								text="Disable 2FA"
								name="btn_disable_2fa"
								theme="danger"
								:disabled="processing"
							/>
						</Form>
					</div>
				</div>

				<TwoFactorSetupModal
					v-model:isOpen="showSetupModal"
					:requiresConfirmation="requiresConfirmation"
					:twoFactorEnabled="twoFactorEnabled"
				/>
			</div>
		</SettingsLayout>
	</AppLayout>
</template>
<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3'
import { onUnmounted, ref } from 'vue'

import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth'
import { disable, enable } from '@/routes/two-factor'
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/vue/24/outline'

import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'

import AppBadge from '@/components/AppBadge.vue'
import AppPageTitle from '@/components/AppPageTitle.vue'
import TwoFactorRecoveryCodes from '@/pages/settings/2fa/TwoFactorRecoveryCodes.vue'
import TwoFactorSetupModal from '@/pages/settings/2fa/TwoFactorSetupModal.vue'

import AppButton from '@/components/AppButton.vue'

interface Props {
	requiresConfirmation?: boolean
	twoFactorEnabled?: boolean
}

withDefaults(defineProps<Props>(), {
	requiresConfirmation: false,
	twoFactorEnabled: false,
})
const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth()
const showSetupModal = ref<boolean>(false)

onUnmounted(() => {
	clearTwoFactorAuthData()
})
</script>
