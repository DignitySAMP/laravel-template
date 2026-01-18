<template>
	<Link
		:href="props.href"
		:tabindex="props.tabindex"
		:method="props.method"
		:as="props.as"
		class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500"
	>
		<slot />
	</Link>
</template>

<script setup lang="ts">
import { type LinkComponentBaseProps, type Method } from '@inertiajs/core'
import { Link } from '@inertiajs/vue3'

interface Props {
	href: LinkComponentBaseProps['href']
	tabindex?: number
	method?: Method
	as?: string
}

const props = defineProps<Props>()
</script>
