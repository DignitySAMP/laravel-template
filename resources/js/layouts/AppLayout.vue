<template>
	<AppWrapper>
		<div class="flex min-h-screen flex-col">
			<nav class="border-b bg-white">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="flex h-16 items-center justify-between">
						<AppLogo />
						<div class="flex items-center gap-4">
							<Link
								v-for="(item, index) in navigationItems"
								:key="index"
								:href="item.href"
								:method="item.method"
								:class="
									isCurrentRoute(item.href)
										? 'font-medium text-gray-900'
										: 'text-gray-600 transition duration-300 hover:text-gray-900'
								"
								class="flex cursor-pointer gap-2"
							>
								<component
									:is="item.icon"
									class="size-5"
									:class="
										isCurrentRoute(item.href)
											? 'font-medium text-gray-900'
											: 'text-gray-600 transition duration-300 hover:text-gray-900'
									"
								/>
								<span>{{ item.title }}</span>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<div class="mx-auto h-full w-full max-w-6xl grow px-4 py-12 sm:px-6 lg:px-8">
				<slot />
			</div>
		</div>
	</AppWrapper>
</template>
<script setup lang="ts">
import { InertiaLinkProps, Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

import { getNavigationItemsForUser } from '@/composables/getNavigation'
const navigationItems = getNavigationItemsForUser()

import { urlIsActive } from '@/lib/utils'
const isCurrentRoute = computed(
	() => (url: NonNullable<InertiaLinkProps['href']>) => urlIsActive(url, usePage().url)
)

import AppLogo from '@/components/AppLogo.vue'
import AppWrapper from '@/layouts/AppWrapper.vue'

// TODO: Make responsive
// TODO: add/fix dark mode
// https://github.com/laravel/vue-starter-kit/commit/43ecbc4f626005dd3681cf5926b5d64715411cb4
</script>
