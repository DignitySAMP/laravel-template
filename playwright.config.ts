import { defineConfig, devices } from '@playwright/test'
import { E2E_BASE_URL, e2eEnv, ensureDatabaseFile } from './tests/e2e/support/env'

ensureDatabaseFile()

export default defineConfig({
	testDir: './tests/e2e/specs',
	globalSetup: './tests/e2e/support/global-setup.ts',
	outputDir: './tests/e2e/.results',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,
	reporter: process.env.CI
		? [['github'], ['html', { outputFolder: './tests/e2e/.report', open: 'never' }]]
		: [['list']],
	timeout: 30_000,
	expect: { timeout: 10_000 },
	use: {
		baseURL: E2E_BASE_URL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `php artisan migrate --force && php artisan serve --host=127.0.0.1 --port=${new URL(E2E_BASE_URL).port}`,
		url: E2E_BASE_URL,
		reuseExistingServer: !process.env.CI,
		timeout: 60_000,
		stdout: 'pipe',
		stderr: 'pipe',
		env: e2eEnv,
	},
})
