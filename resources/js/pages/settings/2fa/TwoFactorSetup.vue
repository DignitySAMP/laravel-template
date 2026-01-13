<template>
	<AppModal
		:show="props.show"
		width="sm:max-w-md"
	>
		<div class="flex items-center justify-center">
			<div class="mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm">
				<div
					class="relative overflow-hidden rounded-full border border-border bg-muted p-2.5"
				>
					<div class="absolute inset-0 grid grid-cols-5 opacity-50">
						<div
							v-for="i in 5"
							:key="`col-${i}`"
							class="border-r border-border last:border-r-0"
						/>
					</div>
					<div class="absolute inset-0 grid grid-rows-5 opacity-50">
						<div
							v-for="i in 5"
							:key="`row-${i}`"
							class="border-b border-border last:border-b-0"
						/>
					</div>
					<ArrowsPointingOutIcon class="relative z-20 size-6 text-gray-500" />
				</div>
				<h1 class="text-lg leading-none font-semibold">
					{{ modalConfig.title }}
				</h1>
				<span class="text-gray-500 text-sm">
					{{ modalConfig.description }}
				</span>
			</div>

			<div class="relative flex w-auto flex-col items-center justify-center space-y-5">
				<template v-if="!showVerificationStep">
					<AppAlert
						v-if="errors?.length"
						theme="danger"
					>
						{{ errors }}
					</AppAlert>
					<template v-else>
						<div class="relative mx-auto flex max-w-md items-center overflow-hidden">
							<div
								class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border"
							>
								<div
									v-if="!qrCodeSvg"
									class="absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background"
								>
									<ArrowPathIcon class="animate-spin size-6" />
								</div>
								<div
									v-else
									class="relative z-10 overflow-hidden border p-5"
								>
									<div
										v-html="qrCodeSvg"
										class="aspect-square w-full justify-center rounded-lg bg-white p-2 [&_svg]:size-full"
									/>
								</div>
							</div>
						</div>

						<div class="flex w-full items-center space-x-5">
							<Button
								class="w-full"
								@click="handleModalNextStep"
							>
								{{ modalConfig.buttonText }}
							</Button>
						</div>

						<div class="relative flex w-full items-center justify-center">
							<div class="absolute inset-0 top-1/2 h-px w-full bg-border" />
							<span class="relative bg-card px-2 py-1">
								or, enter the code manually
							</span>
						</div>

						<div class="flex w-full items-center justify-center space-x-2">
							<div
								class="flex w-full items-stretch overflow-hidden rounded-xl border border-border"
							>
								<div
									v-if="!manualSetupKey"
									class="flex h-full w-full items-center justify-center bg-muted p-3"
								>
									<ArrowPathIcon class="animate-spin size-6" />
								</div>
								<template v-else>
									<input
										type="text"
										readonly
										:value="manualSetupKey"
										class="h-full w-full bg-background p-3 text-foreground"
									/>
									<button
										@click="copy(manualSetupKey || '')"
										class="relative block h-auto border-l border-border px-3 hover:bg-muted"
									>
										<CheckIcon
											v-if="copied"
											class="w-4 text-green-500"
										/>
										<ClipboardDocumentIcon
											v-else
											class="w-4"
										/>
									</button>
								</template>
							</div>
						</div>
					</template>
				</template>

				<template v-else>
					<Form
						v-bind="confirm.form()"
						reset-on-error
						@finish="code = ''"
						@success="isOpen = false"
						v-slot="{ errors, processing }"
					>
						<input
							type="hidden"
							name="code"
							:value="code"
						/>
						<div
							ref="pinInputContainerRef"
							class="relative w-full space-y-3"
						>
							<div
								class="flex w-full flex-col items-center justify-center space-y-3 py-2"
							>
								<AppInputOTP
									name="otp"
									v-model="code"
									:length="6"
									:disabled="processing"
									:error="errors?.confirmTwoFactorAuthentication"
								/>
								<!--
                                    FIXME: type error:
                                    errors?.confirmTwoFactorAuthentication?.code
                                -->
							</div>

							<div class="flex w-full items-center space-x-5">
								<Button
									type="button"
									variant="outline"
									class="w-auto flex-1"
									@click="showVerificationStep = false"
									:disabled="processing"
								>
									Back
								</Button>
								<Button
									type="submit"
									class="w-auto flex-1"
									:disabled="processing || code.length < 6"
								>
									Confirm
								</Button>
							</div>
						</div>
					</Form>
				</template>
			</div>
		</div>
	</AppModal>
</template>
<script setup lang="ts">
// TODO: FIXME: untested, to be tested and adjusted
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

import { confirm } from '@/routes/two-factor'
import { Form } from '@inertiajs/vue3'
import { useClipboard } from '@vueuse/core'
import {
	ArrowsPointingOutIcon,
	ArrowPathIcon,
	CheckIcon,
	ClipboardDocumentIcon,
} from '@heroicons/vue/24/outline'

import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth'

import AppModal from '@/components/AppModal.vue'
import AppAlert from '@/components/AppAlert.vue'
import AppInputOTP from '@/components/AppInputOTP.vue'

const props = defineProps<{
	show: boolean
	requiresConfirmation: boolean
	twoFactorEnabled: boolean
}>()

const showVerificationStep = ref<boolean>(false)
const modalConfig = computed<{
	title: string
	description: string
	buttonText: string
}>(() => {
	if (props.twoFactorEnabled) {
		return {
			title: 'Two-Factor Authentication Enabled',
			description:
				'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
			buttonText: 'Close',
		}
	}

	if (showVerificationStep.value) {
		return {
			title: 'Verify Authentication Code',
			description: 'Enter the 6-digit code from your authenticator app',
			buttonText: 'Continue',
		}
	}

	return {
		title: 'Enable Two-Factor Authentication',
		description:
			'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
		buttonText: 'Continue',
	}
})

const isOpen = defineModel<boolean>('isOpen')

const { copy, copied } = useClipboard()
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } = useTwoFactorAuth()
const code = ref<string>('')

const pinInputContainerRef = useTemplateRef('pinInputContainerRef')

const handleModalNextStep = () => {
	if (props.requiresConfirmation) {
		showVerificationStep.value = true

		nextTick(() => {
			pinInputContainerRef.value?.querySelector('input')?.focus()
		})

		return
	}

	clearSetupData()
	isOpen.value = false
}

const resetModalState = () => {
	if (props.twoFactorEnabled) {
		clearSetupData()
	}

	showVerificationStep.value = false
	code.value = ''
}

watch(
	() => isOpen.value,
	async (isOpen) => {
		if (!isOpen) {
			resetModalState()
			return
		}

		if (!qrCodeSvg.value) {
			await fetchSetupData()
		}
	}
)
</script>
