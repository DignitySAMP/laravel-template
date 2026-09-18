import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { migrateFresh } from './artisan'
import { ensureDatabaseFile, projectRoot } from './env'

export default function globalSetup(): void {
	ensureDatabaseFile()

	if (!existsSync(resolve(projectRoot, 'public/build/manifest.json'))) {
		execFileSync('npm', ['run', 'build'], { cwd: projectRoot, stdio: 'inherit' })
	}

	migrateFresh()
}
