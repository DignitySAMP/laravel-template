import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { e2eEnv, projectRoot } from './env'

const consolePath = resolve(projectRoot, 'tests/e2e/support/console.php')

const run = <T>(command: string, input: Record<string, unknown> = {}): T => {
	const stdout = execFileSync('php', [consolePath, command, JSON.stringify(input)], {
		cwd: projectRoot,
		env: { ...process.env, ...e2eEnv },
		encoding: 'utf-8',
	})

	try {
		return JSON.parse(stdout) as T
	} catch {
		throw new Error(`Console command [${command}] returned invalid JSON:\n${stdout}`)
	}
}

export interface TestUser {
	id: number
	name: string
	email: string
	password: string
	verified: boolean
	twoFactorConfirmed: boolean
	recoveryCodes?: string[]
}

export interface CreateUserOptions {
	name?: string
	email?: string
	password?: string
	verified?: boolean
	twoFactor?: boolean
}

let sequence = 0

export const uniqueEmail = (prefix = 'user'): string =>
	`${prefix}-${process.pid}-${Date.now().toString(36)}-${sequence++}@example.com`

export const migrateFresh = (): void => {
	run('migrate')
}

export const createUser = (options: CreateUserOptions = {}): TestUser =>
	run<TestUser>('user:create', { email: uniqueEmail(), ...options })

export const findUser = (email: string) =>
	run<{ exists: boolean } & Partial<TestUser>>('user:get', { email })

export const currentOtp = (email: string): string =>
	run<{ code: string }>('user:otp', { email }).code

export const recoveryCodes = (email: string): string[] =>
	run<{ codes: string[] }>('user:recovery-codes', { email }).codes

export const passwordMatches = (email: string, password: string): boolean =>
	run<{ valid: boolean }>('user:check-password', { email, password }).valid

export const verificationUrl = (email: string): string =>
	run<{ url: string }>('url:verify', { email }).url

export const passwordResetUrl = (email: string): string =>
	run<{ url: string }>('url:reset', { email }).url
