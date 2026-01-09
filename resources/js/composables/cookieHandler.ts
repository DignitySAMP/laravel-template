export enum CookieTypes {
	COOKIE_TYPE_NECESSARY,
	COOKIE_TYPE_FUNCTIONAL, // language preferences, dark mode, ...
	COOKIE_TYPE_ANALYTICS, // analytics
	COOKIE_TYPE_MARKETING, // browsing habits to show specific ads
}

export interface Cookie {
	name: string
	description: string
	type: CookieTypes
	lifetime: number // minutes
}

export const CookieContainer: Cookie[] = [
	{
		name: 'session',
		description:
			'Stores your current browser session. This allows us to persist your login state across sessions and HTTP requests',
		type: CookieTypes.COOKIE_TYPE_NECESSARY,
		lifetime: 120,
	},
	{
		name: 'XSRF-TOKEN',
		description:
			'A token that is sent with requests you make to the application to prevent unauthorized requests (to make sure it is you who is making the request).',
		type: CookieTypes.COOKIE_TYPE_NECESSARY,
		lifetime: 120,
	},
	{
		name: 'preference',
		description:
			'This remembers the choice you make after closing the cookie banner. If you configure your cookies in preferences, it will also remember the choice here.',
		type: CookieTypes.COOKIE_TYPE_NECESSARY,
		lifetime: 60 * 24 * 7,
	},

	{
		name: 'appearance',
		description:
			'This remembers the theme (light/dark/system) you select and persists it through sessions, applying it when you come back to the website.',
		type: CookieTypes.COOKIE_TYPE_FUNCTIONAL,
		lifetime: 60 * 24 * 7,
	},
]

export function getCookieTypeName(type: CookieTypes) {
	switch (type) {
		case CookieTypes.COOKIE_TYPE_NECESSARY: {
			return {
				name: 'Necessary',
				description:
					'These cookies are first party and necessary for the website to function. Think about remembering your log in state across sessions.',
			}
		}
		case CookieTypes.COOKIE_TYPE_FUNCTIONAL: {
			return {
				name: 'Functional',
				description:
					'These cookies are first party and provide function to the website, such as remembering your language preferences or website theme.',
			}
		}
		case CookieTypes.COOKIE_TYPE_ANALYTICS: {
			return {
				name: 'Analytics',
				description:
					'These cookies are third party and track how you use the website. We use this information to improve performance and make our website better.',
			}
		}
		case CookieTypes.COOKIE_TYPE_MARKETING: {
			return {
				name: 'Marketing',
				description:
					'These cookies are third party and use your browser preferences to show advertisements catered to your needs.',
			}
		}
	}
}

export function setCookie(name: string, value: string, days: number): void {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

	const expires = `expires=${date.toUTCString()}`
	document.cookie = `${name}=${value};${expires};path=/`
}

export function getCookie(cname: string): string {
	const name = `${cname}=`
	const cookies = document.cookie.split(';')

	for (let i = 0; i < cookies.length; i++) {
		const cookie: string = cookies[i].trim()

		if (cookie.startsWith(name)) {
			return cookie.substring(name.length)
		}
	}

	return ''
}

export function getCookiesForType(type: number) {
	return CookieContainer.filter((cookie) => cookie.type === type)
}

export function getCookieExpirationString(cookie: Cookie): string {
	const minutes = cookie.lifetime
	const hours = minutes / 60
	const days = hours / 24
	const weeks = days / 7
	const months = days / 30
	const years = days / 365

	if (years >= 1) {
		const count = Math.floor(years)
		return `Expires after ${count} year${count !== 1 ? 's' : ''}`
	}
	if (months >= 1) {
		const count = Math.floor(months)
		return `Expires after ${count} month${count !== 1 ? 's' : ''}`
	}
	if (weeks >= 1) {
		const count = Math.floor(weeks)
		return `Expires after ${count} week${count !== 1 ? 's' : ''}`
	}
	if (days >= 1) {
		const count = Math.floor(days)
		return `Expires after ${count} day${count !== 1 ? 's' : ''}`
	}
	if (hours >= 1) {
		const count = Math.floor(hours)
		return `Expires after ${count} hour${count !== 1 ? 's' : ''}`
	}

	const count = Math.floor(minutes)
	return `Expires after ${count} minute${count !== 1 ? 's' : ''}`
}
