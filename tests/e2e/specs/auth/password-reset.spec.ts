import { passwordMatches, passwordResetUrl } from '../../support/artisan'
import { expect, login, test } from '../../support/fixtures'

test.describe('password reset', () => {
	test('renders the forgot password form', async ({ page }) => {
		await page.goto('/forgot-password')

		await expect(page.locator('#email')).toBeVisible()
		await expect(page.locator('#request-new-password')).toBeVisible()
	})

	test('confirms that a reset link was requested', async ({ page, user }) => {
		await page.goto('/forgot-password')
		await page.locator('#email').fill(user.email)
		await page.locator('#request-new-password').click()

		await expect(page.getByText('We have emailed your password reset link.')).toBeVisible()
	})

	test('resets the password and allows logging in with it', async ({ page, user }) => {
		const newPassword = 'brand-new-password-42'

		await page.goto(passwordResetUrl(user.email))
		await expect(page.locator('#email')).toHaveValue(user.email)

		await page.locator('#password').fill(newPassword)
		await page.locator('#password_confirmation').fill(newPassword)
		await page.locator('#btn-reset-password').click()

		await expect(page).toHaveURL('/login')
		expect(passwordMatches(user.email, newPassword)).toBe(true)

		await login(page, { ...user, password: newPassword })
		await expect(page).toHaveURL('/dashboard')
	})

	test('rejects a mismatched confirmation', async ({ page, user }) => {
		await page.goto(passwordResetUrl(user.email))
		await page.locator('#password').fill('brand-new-password-42')
		await page.locator('#password_confirmation').fill('something-else')
		await page.locator('#btn-reset-password').click()

		await expect(
			page.getByText('The password field confirmation does not match.')
		).toBeVisible()
		expect(passwordMatches(user.email, user.password)).toBe(true)
	})

	test('rejects an invalid token', async ({ page, user }) => {
		await page.goto(`/reset-password/invalid-token?email=${encodeURIComponent(user.email)}`)
		await page.locator('#password').fill('brand-new-password-42')
		await page.locator('#password_confirmation').fill('brand-new-password-42')
		await page.locator('#btn-reset-password').click()

		await expect(page.getByText('This password reset token is invalid.')).toBeVisible()
		expect(passwordMatches(user.email, user.password)).toBe(true)
	})
})
