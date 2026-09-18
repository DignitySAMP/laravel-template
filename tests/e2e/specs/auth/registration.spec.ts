import { findUser, uniqueEmail } from '../../support/artisan'
import { disableNativeValidation, expect, test } from '../../support/fixtures'

test.describe('registration', () => {
	test('renders the registration form', async ({ page }) => {
		await page.goto('/register')

		await expect(page.locator('#name')).toBeVisible()
		await expect(page.locator('#email')).toBeVisible()
		await expect(page.locator('#password')).toBeVisible()
		await expect(page.locator('#password_confirmation')).toBeVisible()
	})

	test('registers a new user and sends them to verify their email', async ({ page }) => {
		const email = uniqueEmail('register')

		await page.goto('/register')
		await page.locator('#name').fill('Ada Lovelace')
		await page.locator('#email').fill(email)
		await page.locator('#password').fill('correct-horse-battery')
		await page.locator('#password_confirmation').fill('correct-horse-battery')
		await page.locator('#register-button').click()

		await expect(page).toHaveURL('/email/verify')

		const created = findUser(email)
		expect(created.exists).toBe(true)
		expect(created.name).toBe('Ada Lovelace')
		expect(created.verified).toBe(false)
	})

	test('reports validation errors for empty fields', async ({ page }) => {
		await page.goto('/register')
		await disableNativeValidation(page)
		await page.locator('#name').fill('')
		await page.locator('#email').fill('')
		await page.locator('#register-button').click()

		await expect(page.getByText('The name field is required.')).toBeVisible()
		await expect(page.getByText('The email field is required.')).toBeVisible()
		await expect(page).toHaveURL('/register')
	})

	test('rejects a mismatched password confirmation', async ({ page }) => {
		await page.goto('/register')
		await page.locator('#name').fill('Grace Hopper')
		await page.locator('#email').fill(uniqueEmail('mismatch'))
		await page.locator('#password').fill('correct-horse-battery')
		await page.locator('#password_confirmation').fill('different-password')
		await page.locator('#register-button').click()

		await expect(
			page.getByText('The password field confirmation does not match.')
		).toBeVisible()
	})

	test('rejects an email that is already registered', async ({ page, user }) => {
		await page.goto('/register')
		await page.locator('#name').fill('Duplicate')
		await page.locator('#email').fill(user.email)
		await page.locator('#password').fill('correct-horse-battery')
		await page.locator('#password_confirmation').fill('correct-horse-battery')
		await page.locator('#register-button').click()

		await expect(page.getByText('The email has already been taken.')).toBeVisible()
	})
})
