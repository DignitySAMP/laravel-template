import { expect, test } from '../../support/fixtures'

test.describe('password confirmation', () => {
	test('guards the two-factor settings page', async ({ page, asUser }) => {
		await page.goto('/settings/two-factor')

		await expect(page).toHaveURL('/user/confirm-password')
		await expect(page.locator('#password')).toBeVisible()
	})

	test('grants access after confirming the password', async ({ page, asUser }) => {
		await page.goto('/settings/two-factor')
		await page.locator('#password').fill(asUser.password)
		await page.locator('#btn-confirm-password').click()

		await expect(page).toHaveURL('/settings/two-factor')
		await expect(page.getByText('Two-Factor Authentication').first()).toBeVisible()
	})

	test('rejects an incorrect password', async ({ page, asUser }) => {
		await page.goto('/settings/two-factor')
		await page.locator('#password').fill('wrong-password')
		await page.locator('#btn-confirm-password').click()

		await expect(page.getByText('The provided password was incorrect.')).toBeVisible()
		await expect(page).toHaveURL('/user/confirm-password')
	})

	test('remembers the confirmation for subsequent visits', async ({ page, asUser }) => {
		await page.goto('/settings/two-factor')
		await page.locator('#password').fill(asUser.password)
		await page.locator('#btn-confirm-password').click()
		await expect(page).toHaveURL('/settings/two-factor')

		await page.goto('/settings/profile')
		await page.goto('/settings/two-factor')

		await expect(page).toHaveURL('/settings/two-factor')
	})
})
