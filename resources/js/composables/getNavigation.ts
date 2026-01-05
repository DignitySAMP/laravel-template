import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'


import { dashboard, login, logout, register } from '@/routes'
import { edit } from '@/routes/profile'
import { type Method } from '@inertiajs/core'


const page = usePage()
const auth = computed(() => page.props.auth.user)

export interface NavigationItems {
    title: string
    href: string
    method?: Method,
    auth: boolean
}

export const authNavItems: NavigationItems[] = [

    // auth
    {
        title: 'Dashboard',
        href: dashboard().url,
        auth: true
    },
    {
        title: 'Profile',
        href: edit().url,
        auth: true
    },
    {
        title: 'Logout',
        href: logout().url,
        method: 'post',
        auth: true
    },

    // guest
    {
        title: 'Register',
        href: register().url,
        auth: false,
    },
    {
        title: 'Login',
        href: login().url,
        auth: false,
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