<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

import { type BreadcrumbItem } from '@/types'
import { edit } from '@/routes/appearance'
import { useAppearance } from '@/composables/useAppearance'

import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import AppPageTitle from '@/components/AppPageTitle.vue'

const { appearance, updateAppearance } = useAppearance();

const tabs = [
	{ value: 'light', Icon: SunIcon, label: 'Light' },
	{ value: 'dark', Icon: MoonIcon, label: 'Dark' },
	{ value: 'system', Icon: ComputerDesktopIcon, label: 'System' },
] as const;

const breadcrumbItems: BreadcrumbItem[] = [
	{
		title: 'Appearance settings',
		href: edit().url,
	},
]
</script>

<template>
	<AppLayout :breadcrumbs="breadcrumbItems">
		<Head title="Appearance settings" />

		<SettingsLayout>
			<div class="space-y-6">
				<AppPageTitle
					title="Appearance settings"
					description="Update your account's appearance settings"
					:small="true"
				/>
				<div class="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
					<button
						v-for="{ value, Icon, label } in tabs"
						:key="value"
						@click="updateAppearance(value)"
						:class="[
							'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
							appearance === value
								? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
								: 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
						]"
					>
						<component
							:is="Icon"
							class="-ml-1 h-4 w-4"
						/>
						<span class="ml-1.5 text-sm">{{ label }}</span>
					</button>
				</div>
			</div>
		</SettingsLayout>
	</AppLayout>
</template>
