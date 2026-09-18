import { findUser } from '../../support/artisan'
import { expect, test } from '../../support/fixtures'

test.describe('delete account', () => {
	test('opens the confirmation modal', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await page.locator('#btn_show_delete').click()

		await expect(page.getByText('Are you sure you want to delete your account?')).toBeVisible()
		await expect(page.locator('#password')).toBeVisible()
	})

	test('can be cancelled', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await page.locator('#btn_show_delete').click()
		await page.locator('#btn_cancel_delete_account').click()

		await expect(page.getByText('Are you sure you want to delete your account?')).toHaveCount(0)
		expect(findUser(asUser.email).exists).toBe(true)
	})

	test('deletes the account and signs the user out', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await page.locator('#btn_show_delete').click()
		await page.locator('#password').fill(asUser.password)
		await page.locator('#btn_delete_account').click()

		await expect(page).toHaveURL('/')
		await expect.poll(() => findUser(asUser.email).exists).toBe(false)

		await page.goto('/dashboard')
		await expect(page).toHaveURL('/login')
	})

	test('rejects an incorrect password', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await page.locator('#btn_show_delete').click()
		await page.locator('#password').fill('not-my-password')
		await page.locator('#btn_delete_account').click()

		await expect(page.getByText('The password is incorrect.')).toBeVisible()
		expect(findUser(asUser.email).exists).toBe(true)
	})
})
