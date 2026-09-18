import { expect, test } from '../../support/fixtures'

test.describe('appearance settings', () => {
	test('renders the appearance options', async ({ page, asUser }) => {
		await page.goto('/settings/appearance')

		await expect(page.getByRole('button', { name: 'Light' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Dark' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'System' })).toBeVisible()
	})

	test('applies the dark appearance', async ({ page, asUser }) => {
		await page.goto('/settings/appearance')
		await page.getByRole('button', { name: 'Dark' }).click()

		await expect(page.locator('html')).toHaveClass(/dark/)
	})

	test('applies the light appearance', async ({ page, asUser }) => {
		await page.goto('/settings/appearance')
		await page.getByRole('button', { name: 'Dark' }).click()
		await expect(page.locator('html')).toHaveClass(/dark/)

		await page.getByRole('button', { name: 'Light' }).click()
		await expect(page.locator('html')).not.toHaveClass(/dark/)
	})

	test('persists the appearance across a reload', async ({ page, asUser }) => {
		await page.goto('/settings/appearance')
		await page.getByRole('button', { name: 'Dark' }).click()
		await expect(page.locator('html')).toHaveClass(/dark/)

		await page.reload()

		await expect(page.locator('html')).toHaveClass(/dark/)
	})

	test('requires authentication', async ({ page }) => {
		await page.goto('/settings/appearance')

		await expect(page).toHaveURL('/login')
	})
})
