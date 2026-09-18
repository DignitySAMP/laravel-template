import { passwordMatches } from '../../support/artisan'
import { expect, login, logout, test } from '../../support/fixtures'

test.describe('password settings', () => {
	test('renders the password form', async ({ page, asUser }) => {
		await page.goto('/settings/password')

		await expect(page.locator('#current_password')).toBeVisible()
		await expect(page.locator('#password')).toBeVisible()
		await expect(page.locator('#password_confirmation')).toBeVisible()
	})

	test('updates the password', async ({ page, asUser }) => {
		const newPassword = 'an-entirely-new-password'

		await page.goto('/settings/password')
		await page.locator('#current_password').fill(asUser.password)
		await page.locator('#password').fill(newPassword)
		await page.locator('#password_confirmation').fill(newPassword)
		await page.locator('#update-password-button').click()

		await expect.poll(() => passwordMatches(asUser.email, newPassword)).toBe(true)
	})

	test('allows logging in with the updated password', async ({ page, asUser }) => {
		const newPassword = 'another-entirely-new-password'

		await page.goto('/settings/password')
		await page.locator('#current_password').fill(asUser.password)
		await page.locator('#password').fill(newPassword)
		await page.locator('#password_confirmation').fill(newPassword)
		await page.locator('#update-password-button').click()
		await expect.poll(() => passwordMatches(asUser.email, newPassword)).toBe(true)

		await logout(page)
		await login(page, { ...asUser, password: newPassword })

		await expect(page).toHaveURL('/dashboard')
	})

	test('rejects an incorrect current password', async ({ page, asUser }) => {
		await page.goto('/settings/password')
		await page.locator('#current_password').fill('definitely-wrong')
		await page.locator('#password').fill('a-valid-new-password')
		await page.locator('#password_confirmation').fill('a-valid-new-password')
		await page.locator('#update-password-button').click()

		await expect(page.getByText('The password is incorrect.')).toBeVisible()
		expect(passwordMatches(asUser.email, asUser.password)).toBe(true)
	})

	test('rejects a mismatched confirmation', async ({ page, asUser }) => {
		await page.goto('/settings/password')
		await page.locator('#current_password').fill(asUser.password)
		await page.locator('#password').fill('a-valid-new-password')
		await page.locator('#password_confirmation').fill('does-not-match')
		await page.locator('#update-password-button').click()

		await expect(
			page.getByText('The password field confirmation does not match.')
		).toBeVisible()
		expect(passwordMatches(asUser.email, asUser.password)).toBe(true)
	})

	test('requires authentication', async ({ page }) => {
		await page.goto('/settings/password')

		await expect(page).toHaveURL('/login')
	})
})
