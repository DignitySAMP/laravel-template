<template>
	<div class="w-full p-6 shadow-md rounded-lg border border-gray-200">
		<div class="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 pt-4 px-4">
			<span class="flex gap-3 leading-none font-semibold">
				<LockClosedIcon class="size-4" />
				2FA Recovery Codes
			</span>
			<span class="text-sm text-gray-600">
				Recovery codes let you regain access if you lose your 2FA device. Store them in a
				secure password manager.
			</span>
		</div>
		<div class="p-4">
			<div
				class="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between"
			>
				<AppButton
					type="submit"
					name="btn_toggle_code_visibility"
					@click="toggleRecoveryCodesVisibility"
					:text="isRecoveryCodesVisible ? 'Hide' : 'View' + ' Recovery Codes'"
					:icon="isRecoveryCodesVisible ? EyeSlashIcon : EyeIcon"
					class="max-w-52"
				/>

				<Form
					v-if="isRecoveryCodesVisible && recoveryCodesList.length"
					v-bind="regenerateRecoveryCodes.form()"
					method="post"
					:options="{ preserveScroll: true }"
					@success="fetchRecoveryCodes"
					#default="{ processing }"
				>
					<AppButton
						type="submit"
						theme="secondary"
						name="btn_toggle_code_visibility"
						@click="toggleRecoveryCodesVisibility"
						text="Regenerate Codes"
						:icon="ArrowPathIcon"
						class="max-w-52"
						:disabled="processing"
					/>
				</Form>
			</div>
			<div
				:class="[
					'relative overflow-hidden transition-all duration-300',
					isRecoveryCodesVisible ? 'h-auto opacity-100' : 'h-0 opacity-0',
				]"
			>
				<div
					v-if="errors?.length"
					class="mt-6"
				>
					<AppAlert theme="danger">
						{{ errors }}
					</AppAlert>
				</div>
				<div
					v-else
					class="mt-3 space-y-3"
				>
					<div
						ref="recoveryCodeSectionRef"
						class="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"
					>
						<div
							v-if="!recoveryCodesList.length"
							class="space-y-2"
						>
							<div
								v-for="n in 8"
								:key="n"
								class="h-4 animate-pulse rounded bg-muted-foreground/20"
							></div>
						</div>
						<div
							v-else
							v-for="(code, index) in recoveryCodesList"
							:key="index"
						>
							{{ code }}
						</div>
					</div>
					<p class="text-xs text-muted-foreground select-none">
						Each recovery code can be used once to access your account and will be
						removed after use. If you need more, click
						<span class="font-bold">Regenerate Codes</span>
						above.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import { Form } from '@inertiajs/vue3'

import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth'
import { regenerateRecoveryCodes } from '@/routes/two-factor'
import { EyeIcon, EyeSlashIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

import AppButton from '@/components/AppButton.vue'
import AppAlert from '@/components/AppAlert.vue'

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth()
const isRecoveryCodesVisible = ref<boolean>(false)
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef')

const toggleRecoveryCodesVisibility = async () => {
	if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
		await fetchRecoveryCodes()
	}

	isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value

	if (isRecoveryCodesVisible.value) {
		await nextTick()
		recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
	}
}

onMounted(async () => {
	if (!recoveryCodesList.value.length) {
		await fetchRecoveryCodes()
	}
})
</script>
