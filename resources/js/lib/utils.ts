import { InertiaLinkProps } from '@inertiajs/vue3'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function urlIsActive(urlToCheck: NonNullable<InertiaLinkProps['href']>, currentUrl: string) {
	return toUrl(urlToCheck) === currentUrl
}

export function toUrl(href: NonNullable<InertiaLinkProps['href']>) {
	return typeof href === 'string' ? href : href?.url
}

export function enumKeys<T extends object>(e: T) {
	const keys = Object.keys(e)
	const isStringEnum = isNaN(Number(keys[0]))
	return isStringEnum ? keys : keys.slice(keys.length / 2)
}
