import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

export const E2E_BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:8111'

export const projectRoot = resolve(import.meta.dirname, '../../..')

export const databasePath = resolve(projectRoot, 'database/e2e.sqlite')

export const e2eEnv: Record<string, string> = {
	APP_ENV: 'local',
	APP_DEBUG: 'true',
	APP_URL: E2E_BASE_URL,
	DB_CONNECTION: 'sqlite',
	DB_DATABASE: databasePath,
	DB_BUSY_TIMEOUT: '10000',
	DB_JOURNAL_MODE: 'WAL',
	DB_SYNCHRONOUS: 'NORMAL',
	MAIL_MAILER: 'array',
	INERTIA_SSR_ENABLED: 'false',
	QUEUE_CONNECTION: 'sync',
	CACHE_STORE: 'database',
	SESSION_DRIVER: 'database',
	BCRYPT_ROUNDS: '4',
	DEBUGBAR_ENABLED: 'false',
	PHP_CLI_SERVER_WORKERS: '16',
}

export const ensureDatabaseFile = (): void => {
	if (!existsSync(databasePath)) {
		mkdirSync(dirname(databasePath), { recursive: true })
		writeFileSync(databasePath, '')
	}
}
