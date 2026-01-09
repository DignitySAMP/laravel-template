<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppWrapper from '@/layouts/AppWrapper.vue'

defineProps<{
	title?: string
	description?: string
}>()
</script>

<template>
	<AppWrapper>
		<div class="min-h-screen flex items-center justify-center px-4 py-12">
			<div class="w-full max-w-md">
				<div class="w-full flex justify-center items-center mb-4">
					<AppLogo size="large" />
				</div>

				<div class="text-center mb-8">
					<h1 class="text-2xl font-bold">{{ title }}</h1>
					<p class="text-gray-600 mt-2">{{ description }}</p>
				</div>

				<div class="bg-white rounded-xl shadow-sm p-8">
					<slot />
				</div>
			</div>
		</div>
	</AppWrapper>
</template>
