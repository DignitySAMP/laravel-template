import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor'
import { computed, getCurrentInstance, ref, type App } from 'vue'

const fetchJson = async <T>(url: string): Promise<T> => {
	const response = await fetch(url, {
		headers: { Accept: 'application/json' },
	})

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`)
	}

	return response.json()
}

const createTwoFactorAuth = () => {
	const errors = ref<string[]>([])
	const manualSetupKey = ref<string | null>(null)
	const qrCodeSvg = ref<string | null>(null)
	const recoveryCodesList = ref<string[]>([])

	const hasSetupData = computed<boolean>(
		() => qrCodeSvg.value !== null && manualSetupKey.value !== null
	)

	const fetchQrCode = async (): Promise<void> => {
		try {
			const { svg } = await fetchJson<{ svg: string; url: string }>(qrCode.url())

			qrCodeSvg.value = svg
		} catch {
			errors.value.push('Failed to fetch QR code')
			qrCodeSvg.value = null
		}
	}

	const fetchSetupKey = async (): Promise<void> => {
		try {
			const { secretKey: key } = await fetchJson<{ secretKey: string }>(secretKey.url())

			manualSetupKey.value = key
		} catch {
			errors.value.push('Failed to fetch a setup key')
			manualSetupKey.value = null
		}
	}

	const clearErrors = (): void => {
		errors.value = []
	}

	const clearSetupData = (): void => {
		manualSetupKey.value = null
		qrCodeSvg.value = null
		clearErrors()
	}

	const clearTwoFactorAuthData = (): void => {
		clearSetupData()
		clearErrors()
		recoveryCodesList.value = []
	}

	const fetchRecoveryCodes = async (): Promise<void> => {
		try {
			clearErrors()
			recoveryCodesList.value = await fetchJson<string[]>(recoveryCodes.url())
		} catch {
			errors.value.push('Failed to fetch recovery codes')
			recoveryCodesList.value = []
		}
	}

	const fetchSetupData = async (): Promise<void> => {
		try {
			clearErrors()
			await Promise.all([fetchQrCode(), fetchSetupKey()])
		} catch {
			qrCodeSvg.value = null
			manualSetupKey.value = null
		}
	}

	return {
		qrCodeSvg,
		manualSetupKey,
		recoveryCodesList,
		errors,
		hasSetupData,
		clearSetupData,
		clearErrors,
		clearTwoFactorAuthData,
		fetchQrCode,
		fetchSetupKey,
		fetchSetupData,
		fetchRecoveryCodes,
	}
}

const instances = new WeakMap<App, ReturnType<typeof createTwoFactorAuth>>()

export const useTwoFactorAuth = (): ReturnType<typeof createTwoFactorAuth> => {
	const app = getCurrentInstance()?.appContext.app

	if (!app) {
		return createTwoFactorAuth()
	}

	const existing = instances.get(app)

	if (existing) {
		return existing
	}

	const created = createTwoFactorAuth()
	instances.set(app, created)

	return created
}
