import { currentOtp, recoveryCodes } from '../../support/artisan'
import { expect, fillOtp, login, test } from '../../support/fixtures'

test.describe('two-factor challenge', () => {
	test('challenges a user who has two-factor enabled', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		await login(page, user)

		await expect(page).toHaveURL('/two-factor-challenge')
		await expect(page.getByRole('textbox', { name: 'pin input 1 of 6' })).toBeVisible()
	})

	test('signs in with a valid authentication code', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		await login(page, user)
		await expect(page).toHaveURL('/two-factor-challenge')

		await fillOtp(page, currentOtp(user.email))
		await page.locator('#btn_otp').click()

		await expect(page).toHaveURL('/dashboard')
	})

	test('rejects an invalid authentication code', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		await login(page, user)

		await fillOtp(page, '000000')
		await page.locator('#btn_otp').click()

		await expect(
			page.getByText('The provided two factor authentication code was invalid.')
		).toBeVisible()
		await expect(page).toHaveURL('/two-factor-challenge')
	})

	test('signs in with a recovery code', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		const [code] = recoveryCodes(user.email)

		await login(page, user)
		await page.getByText('login using a recovery code').click()
		await page.locator('#recovery_code').fill(code)
		await page.locator('#btn-recovery-code').click()

		await expect(page).toHaveURL('/dashboard')
	})

	test('consumes a recovery code after use', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		const [code] = recoveryCodes(user.email)

		await login(page, user)
		await page.getByText('login using a recovery code').click()
		await page.locator('#recovery_code').fill(code)
		await page.locator('#btn-recovery-code').click()
		await expect(page).toHaveURL('/dashboard')

		expect(recoveryCodes(user.email)).not.toContain(code)
	})

	test('rejects an invalid recovery code', async ({ page, makeUser }) => {
		const user = makeUser({ twoFactor: true })
		await login(page, user)
		await page.getByText('login using a recovery code').click()
		await page.locator('#recovery_code').fill('invalid-recovery-code')
		await page.locator('#btn-recovery-code').click()

		await expect(
			page.getByText('The provided two factor recovery code was invalid.')
		).toBeVisible()
	})

	test('does not challenge a user without two-factor enabled', async ({ page, user }) => {
		await login(page, user)

		await expect(page).toHaveURL('/dashboard')
	})
})
