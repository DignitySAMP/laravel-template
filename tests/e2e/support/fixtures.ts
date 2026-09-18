import { test as base, expect, type Page } from '@playwright/test'
import { createUser, type CreateUserOptions, type TestUser } from './artisan'
import { E2E_BASE_URL } from './env'

export const login = async (page: Page, user: TestUser): Promise<void> => {
	await page.goto('/login')
	await page.locator('#email').fill(user.email)
	await page.locator('#password').fill(user.password)
	await page.locator('#login-button').click()
	await page.waitForURL((url) => !url.pathname.startsWith('/login'))
}

export const fillOtp = async (page: Page, code: string): Promise<void> => {
	const first = page.getByRole('textbox', { name: 'pin input 1 of 6' })

	await first.waitFor()
	await first.click()
	await page.keyboard.type(code, { delay: 20 })
}

export const disableNativeValidation = async (page: Page): Promise<void> => {
	await page
		.locator('form')
		.evaluateAll((forms) => forms.forEach((form) => form.setAttribute('novalidate', '')))
}

export const logout = async (page: Page): Promise<void> => {
	await page.locator('nav').getByText('Logout').click()
	await page.waitForURL('/')
}

interface Fixtures {
	user: TestUser
	makeUser: (options?: CreateUserOptions) => TestUser
	asUser: TestUser
}

export const test = base.extend<Fixtures>({
	context: async ({ context }, use) => {
		await context.addCookies([{ name: 'preference', value: 'accepted', url: E2E_BASE_URL }])

		await use(context)
	},

	makeUser: async ({}, use) => {
		await use((options: CreateUserOptions = {}) => createUser(options))
	},

	user: async ({}, use) => {
		await use(createUser())
	},

	asUser: async ({ page, user }, use) => {
		await login(page, user)
		await page.waitForURL('/dashboard')
		await use(user)
	},
})

export { expect }
