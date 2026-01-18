<template>
	<div class="flex flex-col items-center justify-center gap-1">
		<PaginationRoot
			:total="props.total ?? 0"
			:items-per-page="perPage"
			:sibling-count="1"
			:show-edges="true"
			:page="props.current_page"
			:default-page="props.current_page"
			class="flex items-center justify-center gap-2"
		>
			<PaginationList class="flex items-center gap-2">
				<template
					v-for="(link, index) in props.links"
					:key="index"
				>
					<span
						v-if="!link.url"
						v-html="link.label"
						class="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-400 shadow-sm select-none"
					/>

					<PaginationListItem
						v-else
						:value="link.page"
						as-child
					>
						<Link
							:href="link.url"
							class="cursor-pointer rounded-md border px-4 py-2 shadow-sm select-none transition-colors"
							:class="
								link.active
									? 'border-blue-600 bg-blue-600 text-blue-100 hover:bg-blue-700'
									: 'border-gray-200 bg-white hover:bg-gray-100'
							"
						>
							<span v-html="link.label" />
						</Link>
					</PaginationListItem>
				</template>
			</PaginationList>
		</PaginationRoot>

		<div class="mt-4 text-sm text-gray-600">
			Showing {{ props.to ?? '0' }} of {{ props.total ?? '0' }} results
		</div>
	</div>
</template>

<script setup lang="ts">
import { PaginationList, PaginationListItem, PaginationRoot } from 'reka-ui'
import { Link } from '@inertiajs/vue3'
import type { Pagination } from '@/types/pagination'
import { computed } from 'vue'

const props = defineProps<Pagination>()

const perPage = computed(() => props.data?.length ?? 15)
</script>
