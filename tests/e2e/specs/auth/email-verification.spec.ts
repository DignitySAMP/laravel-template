import { findUser, verificationUrl } from '../../support/artisan'
import { expect, login, test } from '../../support/fixtures'

test.describe('email verification', () => {
	test('prompts an unverified user', async ({ page, makeUser }) => {
		const user = makeUser({ verified: false })
		await login(page, user)

		await expect(page).toHaveURL('/email/verify')
		await expect(page.locator('#btn-send-verification')).toBeVisible()
	})

	test('verifies the account through a signed link', async ({ page, makeUser }) => {
		const user = makeUser({ verified: false })
		await login(page, user)
		await page.goto(verificationUrl(user.email))

		await expect(page).toHaveURL(/\/dashboard/)
		expect(findUser(user.email).verified).toBe(true)
	})

	test('resends the verification email', async ({ page, makeUser }) => {
		const user = makeUser({ verified: false })
		await login(page, user)
		await page.locator('#btn-send-verification').click()

		await expect(
			page.getByText(
				'A new verification link has been sent to the email address you provided during registration.'
			)
		).toBeVisible()
	})

	test('lets an unverified user log out', async ({ page, makeUser }) => {
		const user = makeUser({ verified: false })
		await login(page, user)
		await page.getByText('Log out').click()

		await expect(page).toHaveURL('/')
	})

	test('sends an already verified user to the dashboard', async ({ page, asUser }) => {
		await page.goto('/email/verify')

		await expect(page).toHaveURL('/dashboard')
	})
})
