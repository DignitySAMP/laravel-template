import { usePage } from '@inertiajs/vue3'
import { Component } from 'vue'

import { dashboard, home, login, logout, register } from '@/routes'
import { edit } from '@/routes/profile'
import { type Method } from '@inertiajs/core'

import { Gauge, House, LogIn, LogOut, ScanFace, UserPlus } from 'lucide-vue-next'

export interface NavigationItems {
	title: string
	href: string
	method?: Method
	icon?: Component
	auth: boolean | null
}

export const authNavItems = (): NavigationItems[] => [
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

export const getNavigationItemsForUser = (): NavigationItems[] => {
	const isAuthenticated = Boolean(usePage().props.auth.user)

	return authNavItems().filter(
		(navItem) => navItem.auth === null || navItem.auth === isAuthenticated
	)
}
