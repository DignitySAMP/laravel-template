import { expect, login, logout, test } from '../../support/fixtures'

test.describe('login', () => {
	test('renders the login form', async ({ page }) => {
		await page.goto('/login')

		await expect(page.locator('#email')).toBeVisible()
		await expect(page.locator('#password')).toBeVisible()
		await expect(page.locator('#login-button')).toBeVisible()
	})

	test('authenticates a user with valid credentials', async ({ page, user }) => {
		await login(page, user)

		await expect(page).toHaveURL('/dashboard')
	})

	test('rejects an invalid password', async ({ page, user }) => {
		await page.goto('/login')
		await page.locator('#email').fill(user.email)
		await page.locator('#password').fill('not-the-password')
		await page.locator('#login-button').click()

		await expect(page.getByText('These credentials do not match our records.')).toBeVisible()
		await expect(page).toHaveURL('/login')
	})

	test('rejects an unknown email', async ({ page }) => {
		await page.goto('/login')
		await page.locator('#email').fill('nobody@example.com')
		await page.locator('#password').fill('password')
		await page.locator('#login-button').click()

		await expect(page.getByText('These credentials do not match our records.')).toBeVisible()
	})

	test('keeps the user signed in across navigations', async ({ page, asUser }) => {
		await page.goto('/settings/profile')

		await expect(page).toHaveURL('/settings/profile')
		await expect(page.locator('#name')).toHaveValue(asUser.name)
	})

	test('logs the user out', async ({ page, asUser }) => {
		await logout(page)

		await expect(page).toHaveURL('/')

		await page.goto('/dashboard')
		await expect(page).toHaveURL('/login')
	})

	test('redirects an authenticated user away from login', async ({ page, asUser }) => {
		await page.goto('/login')

		await expect(page).toHaveURL('/dashboard')
	})
})
