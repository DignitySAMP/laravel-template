<template>
    <div class="px-4 py-6">
        <AppPageTitle
            title="Settings"
            description="Manage your profile and account settings"
        />
        <div class="flex flex-col lg:flex-row lg:space-x-12">
			<aside class="w-full max-w-xl lg:w-48">
                <nav class="flex flex-col space-y-1 space-x-0">

                    <Link 
                        :href="item.href"
                        v-for="item in sidebarNavItems"
                        :key="toUrl(item.href)"
                        class="w-full py-1.5 rounded-lg cursor-pointer transition-colors font-medium ps-2.5"
                        :class="(
                            urlIsActive(item.href, currentPath) ? 
                            'bg-gray-200 text-gray-800 hover:bg-gray-300' :
                            'bg-transparent text-gray-800 hover:bg-gray-200'
                        )"
                    >
                        <component
                            :is="item.icon"
                            class="size-4"
                        />
                        {{ item.title }}
                    </Link>
                
                </nav>
            </aside>
			<div class="flex-1 md:max-w-2xl">
				<section class="max-w-3xl space-y-12 bg-white rounded-lg shadow p-5">
					<slot />
				</section>
			</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toUrl, urlIsActive } from '@/lib/utils'
import { edit as editAppearance } from '@/routes/appearance'
import { edit as editProfile } from '@/routes/profile'
import { show } from '@/routes/two-factor'
import { edit as editPassword } from '@/routes/user-password'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/vue3'
import AppPageTitle from '@/components/AppPageTitle.vue'

const sidebarNavItems: NavItem[] = [
	{
		title: 'Profile',
		href: editProfile(),
	},
	{
		title: 'Password',
		href: editPassword(),
	},
	{
		title: 'Two-Factor Auth',
		href: show(),
	},
	{
		title: 'Appearance',
		href: editAppearance(),
	},
]

const currentPath = typeof window !== undefined ? window.location.pathname : ''
</script>