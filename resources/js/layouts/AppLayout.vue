<script setup lang="ts">
	import { computed } from 'vue';
	import { dashboard, logout } from '@/routes';
	import { edit } from '@/routes/profile';
	import { InertiaLinkProps, Link, usePage } from '@inertiajs/vue3'
	import { type Method } from '@inertiajs/core';
	
	
	const page = usePage()
	const auth = computed(() => page.props.auth)

	import { getInitials } from '@/composables/useInitials'
	import { urlIsActive } from '@/lib/utils'
	const isCurrentRoute = computed(
		() => (url: NonNullable<InertiaLinkProps['href']>) => urlIsActive(url, page.url)
	)

	interface NavigationItems {
		title: string;
		href: string;
		method?: Method;
	}

	const navItems: NavigationItems[] = [
		{
			title: 'Dashboard',
			href: dashboard().url,
		},
		{
			title: 'Profile',
			href: edit().url,
		},
		{
			title: 'Logout',
			href: logout().url,
			method: 'post',
		}
	];
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<nav class="bg-white border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16 items-center">
					<div class="text-xl font-semibold">YourApp</div>
					<div class="flex gap-4 items-center">
						
						<Link v-for="item, index in navItems" :key="index"
							:href="item.href"
							:method="item.method"
							:class="isCurrentRoute(item.href) ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900 transition duration-300'"
						>
							{{ item.title }}
						</Link>
						
						<div class="flex size-8 items-center justify-center rounded-full bg-neutral-200 font-semibold text-black">
							{{ getInitials(auth.user?.name) }}
						</div>
					</div>
				</div>
			</div>
		</nav>

 		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full h-full grow">

			<slot />
		</div>
	</div>
</template>