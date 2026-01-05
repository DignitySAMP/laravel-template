import { Component, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'


import { dashboard, login, logout, register } from '@/routes'
import { edit } from '@/routes/profile'
import { type Method } from '@inertiajs/core'

import { ClipboardDocumentIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon, KeyIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

const page = usePage()
const auth = computed(() => page.props.auth.user)

export interface NavigationItems {
    title: string
    href: string
    method?: Method,
    icon?: Component
    auth: boolean
}

export const authNavItems: NavigationItems[] = [
    // TODO: make 'home' accessible by both auth and guest

    // auth
    {
        title: 'Dashboard',
        href: dashboard().url,
        auth: true,
        icon: ClipboardDocumentIcon,
    },
    {
        title: 'Profile',
        href: edit().url,
        auth: true,
        icon: UserCircleIcon
    },
    {
        title: 'Logout',
        href: logout().url,
        method: 'post',
        auth: true,
        icon: ArrowRightStartOnRectangleIcon
    },

    // guest
    {
        title: 'Register',
        href: register().url,
        auth: false,
        icon: PlusCircleIcon
    },
    {
        title: 'Login',
        href: login().url,
        auth: false,
        icon: KeyIcon
    }
]

export const getNavigationItemsForUser = () => {
    const userNavItems: NavigationItems[] = [];

    authNavItems.forEach(navItem => {
        if (auth.value) {
            if (navItem.auth) {
                userNavItems.push(navItem);
            }
        }
        else {
            if (!navItem.auth) {
                userNavItems.push(navItem);
            }
        }
    });

    console.log(userNavItems, auth.value);
    return userNavItems;
}