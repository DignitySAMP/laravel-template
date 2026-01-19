import { Component, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

import { dashboard, home, login, logout, register } from '@/routes'
import { edit } from '@/routes/profile'
import { type Method } from '@inertiajs/core'

import { LogIn, UserPlus, House, Gauge, LogOut, ScanFace } from 'lucide-vue-next'

const page = usePage()
const auth = computed(() => page.props.auth.user)

export interface NavigationItems {
	title: string
	href: string
	method?: Method
	icon?: Component
	auth: boolean | null
}

export const authNavItems: NavigationItems[] = [
	// all
	{
		title: 'Home',
		href: home().url,
		auth: null,
		icon: House,
	},

	// auth
	{
		title: 'Dashboard',
		href: dashboard().url,
		auth: true,
		icon: Gauge,
	},
	{
		title: 'Profile',
		href: edit().url,
		auth: true,
		icon: ScanFace,
	},
	{
		title: 'Logout',
		href: logout().url,
		method: 'post',
		auth: true,
		icon: LogOut,
	},

	// guest
	{
		title: 'Register',
		href: register().url,
		auth: false,
		icon: UserPlus,
	},
	{
		title: 'Login',
		href: login().url,
		auth: false,
		icon: LogIn,
	},
]

export const getNavigationItemsForUser = () => {
	const userNavItems: NavigationItems[] = []

	authNavItems.forEach((navItem) => {
		if (navItem.auth === null) {
			userNavItems.push(navItem)
		} else {
			if (auth.value) {
				if (navItem.auth) {
					userNavItems.push(navItem)
				}
			} else {
				if (!navItem.auth) {
					userNavItems.push(navItem)
				}
			}
		}
	})

	console.log(userNavItems, auth.value)
	return userNavItems
}
