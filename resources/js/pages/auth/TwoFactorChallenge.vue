<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue'
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import TwoFactorOTP from './2fa/TwoFactorOTP.vue'
import TwoFactorRecovery from './2fa/TwoFactorRecovery.vue'

interface AuthConfigContent {
	title: string
	description: string
	toggleText: string
}

const authConfigContent = computed<AuthConfigContent>(() => {
	return showRecoveryInput.value
		? {
				title: 'Recovery Code',
				description:
					'Please confirm access to your account by entering one of your emergency recovery codes.',
				toggleText: 'login using an authentication code',
			}
		: {
				title: 'Authentication Code',
				description:
					'Enter the authentication code provided by your authenticator application.',
				toggleText: 'login using a recovery code',
			}
})

const showRecoveryInput = ref<boolean>(false)
const toggleRecoveryMode = (): void => {
	showRecoveryInput.value = !showRecoveryInput.value
	code.value = ''
}

const code = ref<string>('')
</script>

<template>
	<AuthLayout
		:title="authConfigContent.title"
		:description="authConfigContent.description"
	>
		<Head title="Two-Factor Authentication" />

		<div class="space-y-6">
			<TwoFactorOTP v-if="!showRecoveryInput" />
			<TwoFactorRecovery v-else />
		</div>
		<div class="text-center text-sm mt-4">
			<span>or you can</span>
			<button
				type="button"
				class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
				@click="() => toggleRecoveryMode()"
			>
				{{ authConfigContent.toggleText }}
			</button>
		</div>
	</AuthLayout>
</template>
