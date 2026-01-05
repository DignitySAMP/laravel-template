<script setup lang="ts">
import { computed } from 'vue'
import { InertiaLinkProps, Link, usePage } from '@inertiajs/vue3'

import { getNavigationItemsForUser } from '@/composables/getNavigation'
const navigationItems = getNavigationItemsForUser();

import { urlIsActive } from '@/lib/utils'
const isCurrentRoute = computed(
	() => (url: NonNullable<InertiaLinkProps['href']>) => urlIsActive(url, usePage().url)
)

import AppLogo from '@/components/AppLogo.vue';

// TODO: Make InputSelect with optional search bar, use it for profile and logout links
// TODO: Make responsive
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<nav class="bg-white border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16 items-center">
					<AppLogo/>
					<div class="flex gap-4 items-center">
						<Link
							v-for="(item, index) in navigationItems"
							:key="index"
							:href="item.href"
							:method="item.method"
							:class="
								isCurrentRoute(item.href)
									? 'text-gray-900 font-medium'
									: 'text-gray-600 hover:text-gray-900 transition duration-300'
							"
							class="cursor-pointer"
						>
							{{ item.title }}
						</Link>
					</div>
				</div>
			</div>
		</nav>

		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full h-full grow">
			<slot />
		</div>
	</div>
</template>
