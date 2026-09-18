import { expect, test } from '../support/fixtures'

test.describe('welcome page', () => {
	test('renders for guests', async ({ page }) => {
		await page.goto('/')

		await expect(page).toHaveURL('/')
		await expect(page.locator('#app')).toBeVisible()
	})

	test('shows guest navigation links', async ({ page }) => {
		await page.goto('/')

		const nav = page.locator('nav')
		await expect(nav.getByText('Login')).toBeVisible()
		await expect(nav.getByText('Register')).toBeVisible()
		await expect(nav.getByText('Logout')).toHaveCount(0)
	})

	test('navigates to login without a full page reload', async ({ page }) => {
		await page.goto('/')
		await page.locator('nav').getByText('Login').click()

		await expect(page).toHaveURL('/login')
		await expect(page.locator('#email')).toBeVisible()
	})
})
