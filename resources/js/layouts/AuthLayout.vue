<template>
	<AppWrapper>
		<div class="flex min-h-screen items-center justify-center px-4 py-12">
			<div class="w-full max-w-md">
				<div class="mb-4 flex w-full items-center justify-center">
					<AppLogo size="large" />
				</div>

				<div class="mb-8 text-center">
					<h1 class="text-2xl font-bold">{{ title }}</h1>
					<p class="mt-2 text-gray-600">{{ description }}</p>
				</div>

				<div class="rounded-xl bg-white p-8 shadow-sm">
					<slot />
				</div>
			</div>
		</div>
	</AppWrapper>
</template>
<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppWrapper from '@/layouts/AppWrapper.vue'

defineProps<{
	title?: string
	description?: string
}>()
</script>
