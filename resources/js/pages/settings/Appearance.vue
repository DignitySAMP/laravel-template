<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

import AppearanceTabs from '@/components/AppearanceTabs.vue'
import AppPageTitle from '@/components/AppPageTitle.vue'
import { type BreadcrumbItem } from '@/types'

import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'
import { edit } from '@/routes/appearance'

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
				<AppearanceTabs />
			</div>
		</SettingsLayout>
	</AppLayout>
</template>
