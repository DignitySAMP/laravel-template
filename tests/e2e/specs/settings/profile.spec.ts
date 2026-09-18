import { findUser, uniqueEmail } from '../../support/artisan'
import { disableNativeValidation, expect, test } from '../../support/fixtures'

test.describe('profile settings', () => {
	test('shows the current profile details', async ({ page, asUser }) => {
		await page.goto('/settings/profile')

		await expect(page.locator('#name')).toHaveValue(asUser.name)
		await expect(page.locator('#email')).toHaveValue(asUser.email)
	})

	test('redirects /settings to the profile page', async ({ page, asUser }) => {
		await page.goto('/settings')

		await expect(page).toHaveURL('/settings/profile')
	})

	test('updates the name', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await page.locator('#name').fill('Renamed User')
		await page.locator('#profile-button').click()

		await expect(page).toHaveURL('/settings/profile')
		await expect.poll(() => findUser(asUser.email).name).toBe('Renamed User')
	})

	test('resets verification when the email changes', async ({ page, asUser }) => {
		const newEmail = uniqueEmail('changed')

		await page.goto('/settings/profile')
		await page.locator('#email').fill(newEmail)
		await page.locator('#profile-button').click()

		await expect.poll(() => findUser(newEmail).exists).toBe(true)
		expect(findUser(newEmail).verified).toBe(false)
	})

	test('reports validation errors', async ({ page, asUser }) => {
		await page.goto('/settings/profile')
		await disableNativeValidation(page)
		await page.locator('#name').fill('')
		await page.locator('#email').fill('not-an-email')
		await page.locator('#profile-button').click()

		await expect(page.getByText('The name field is required.')).toBeVisible()
		await expect(page.getByText('The email field must be a valid email address.')).toBeVisible()
	})

	test('rejects an email already used by another account', async ({ page, asUser, makeUser }) => {
		const other = makeUser()

		await page.goto('/settings/profile')
		await page.locator('#email').fill(other.email)
		await page.locator('#profile-button').click()

		await expect(page.getByText('The email has already been taken.')).toBeVisible()
	})

	test('requires authentication', async ({ page }) => {
		await page.goto('/settings/profile')

		await expect(page).toHaveURL('/login')
	})
})
