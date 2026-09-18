import { expect, login, test } from '../support/fixtures'

test.describe('dashboard', () => {
	test('redirects guests to login', async ({ page }) => {
		await page.goto('/dashboard')

		await expect(page).toHaveURL('/login')
	})

	test('is reachable by a verified user', async ({ page, asUser }) => {
		await expect(page).toHaveURL('/dashboard')
		await expect(page.locator('nav').getByText('Logout')).toBeVisible()
		expect(asUser.verified).toBe(true)
	})

	test('redirects unverified users to the verification notice', async ({ page, makeUser }) => {
		const user = makeUser({ verified: false })
		await login(page, user)

		await expect(page).toHaveURL('/email/verify')
	})

	test('shows authenticated navigation links', async ({ page, asUser }) => {
		const nav = page.locator('nav')

		await expect(nav.getByText('Dashboard')).toBeVisible()
		await expect(nav.getByText('Profile')).toBeVisible()
		await expect(nav.getByText('Login')).toHaveCount(0)
	})
})
