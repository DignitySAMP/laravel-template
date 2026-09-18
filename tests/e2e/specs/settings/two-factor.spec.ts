import type { Page } from '@playwright/test'
import { currentOtp, findUser, recoveryCodes } from '../../support/artisan'
import { expect, fillOtp, test } from '../../support/fixtures'

const confirmPassword = async (page: Page, password: string): Promise<void> => {
	await page.goto('/settings/two-factor')

	if (page.url().includes('/user/confirm-password')) {
		await page.locator('#password').fill(password)
		await page.locator('#btn-confirm-password').click()
		await page.waitForURL('/settings/two-factor')
	}
}

test.describe('two-factor settings', () => {
	test('shows two-factor as disabled by default', async ({ page, asUser }) => {
		await confirmPassword(page, asUser.password)

		await expect(page.locator('#app').getByText('Disabled', { exact: true })).toBeVisible()
		await expect(page.locator('#btn_enable_2fa')).toBeVisible()
	})

	test('shows two-factor as enabled for a configured account', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })

		await page.goto('/login')
		await page.locator('#email').fill(user.email)
		await page.locator('#password').fill(user.password)
		await page.locator('#login-button').click()
		await fillOtp(page, currentOtp(user.email))
		await page.locator('#btn_otp').click()
		await page.waitForURL('/dashboard')

		await confirmPassword(page, user.password)

		await expect(page.locator('#app').getByText('Enabled', { exact: true })).toBeVisible()
		await expect(page.locator('#btn_disable_2fa')).toBeVisible()
	})

	test('enables and confirms two-factor authentication', async ({ page, asUser }) => {
		await confirmPassword(page, asUser.password)
		await page.locator('#btn_enable_2fa').click()

		await expect(page.locator('#btn_modal_next')).toBeVisible()
		await page.locator('#btn_modal_next').click()

		await expect(page.getByRole('textbox', { name: 'pin input 1 of 6' })).toBeVisible()
		await fillOtp(page, currentOtp(asUser.email))
		await page.locator('#btn_submit').click()

		await expect.poll(() => findUser(asUser.email).twoFactorConfirmed).toBe(true)
		await expect(page.locator('#app').getByText('Enabled', { exact: true })).toBeVisible()
	})

	test('rejects an invalid confirmation code', async ({ page, asUser }) => {
		await confirmPassword(page, asUser.password)
		await page.locator('#btn_enable_2fa').click()
		await page.locator('#btn_modal_next').click()
		await fillOtp(page, '000000')
		await page.locator('#btn_submit').click()

		await expect(
			page.getByText('The provided two factor authentication code was invalid.')
		).toBeVisible()
		expect(findUser(asUser.email).twoFactorConfirmed).toBe(false)
	})

	test('reveals and regenerates recovery codes', async ({ page, asUser }) => {
		await confirmPassword(page, asUser.password)
		await page.locator('#btn_enable_2fa').click()
		await page.locator('#btn_modal_next').click()
		await fillOtp(page, currentOtp(asUser.email))
		await page.locator('#btn_submit').click()
		await expect.poll(() => findUser(asUser.email).twoFactorConfirmed).toBe(true)

		const original = recoveryCodes(asUser.email)
		expect(original.length).toBeGreaterThan(0)

		await page.locator('#btn_toggle_code_visibility').click()
		await expect(page.getByText(original[0])).toBeVisible()

		await page.locator('#btn_regenerate_codes').click()

		await expect.poll(() => recoveryCodes(asUser.email)[0]).not.toBe(original[0])
	})

	test('disables two-factor authentication', async ({ page, asUser }) => {
		await confirmPassword(page, asUser.password)
		await page.locator('#btn_enable_2fa').click()
		await page.locator('#btn_modal_next').click()
		await fillOtp(page, currentOtp(asUser.email))
		await page.locator('#btn_submit').click()
		await expect.poll(() => findUser(asUser.email).twoFactorConfirmed).toBe(true)

		await page.locator('#btn_disable_2fa').click()

		await expect.poll(() => findUser(asUser.email).twoFactorConfirmed).toBe(false)
		await expect(page.locator('#app').getByText('Disabled', { exact: true })).toBeVisible()
	})
})
